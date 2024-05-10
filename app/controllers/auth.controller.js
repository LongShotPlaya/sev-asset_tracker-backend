const db = require("../models");
const authconfig = require("../config/auth.config");
const User = db.user;
const Person = db.person;
const Session = db.session;
const Op = db.Sequelize.Op;

const { google } = require("googleapis");
const { OAuth2Client } = require("google-auth-library");

const jwt = require("jsonwebtoken");

const google_id = process.env.CLIENT_ID;

exports.login = async (req, res) => {
  const googleUser = (await new OAuth2Client(google_id).verifyIdToken({
    idToken: req.body.credential,
    audience: google_id,
  }))?.getPayload();

  let email = googleUser?.email;
  let fName = googleUser?.given_name;
  let lName = googleUser?.family_name;

  // If we don't have their email or name, we need to make another request
  // This is solely for testing purposes
  if (!!req.body.accessToken && (!email || !fName || !lName)) {
    const oauth2Client = new OAuth2Client(google_id); // Create new auth client
    oauth2Client.setCredentials({ access_token: req.body.accessToken }); // Use the new auth client with the access_token
    const oauth2 = google.oauth2({
      auth: oauth2Client,
      version: "v2",
    });
    const { data } = await oauth2.userinfo.get(); // Get the user's info
    
    email = data?.email;
    fName = data?.given_name;
    lName = data?.family_name;
  }

  if (!email || !fName || !lName) return res.status(500).send({ message: "Error retrieving user data!" });

  // Find or create the person
  const person = (await Person.findOrCreate({
    where: { email },
    attributes: ["id", "fName", "lName", "email"],
    defaults: {
      fName,
      lName,
      email
    }
  }))?.[0]?.get({ plain: true });

  if (!person) return res.status(500).send({ message: "Error finding user in database!" });

  // Create a user for the person if they don't have one, or just get their current one if available
  person.user = (await User.findOrCreate({
    where: { personId: person.id },
    attributes: ["id", "groupId", "groupExpiration", "blocked"],
    defaults: { personId: person.id }
  }))?.[0]?.get({ plain: true });
  
  // Make sure that user could be registered if they haven't been already
  if (!person.user) return res.status(500).send({ message: "Error registering person as user!" });
  // If user is blocked, don't let them change anything
  else if (person.user.blocked) return res.status(401).send({ message: "Unauthorized! User is blocked." });
  
  // Update the person's name in the database if necessary
  if (person.fName !== fName || person.lName !== lName) await Person.update(person, { where: { id: person.id } })
  .catch((err) => { console.log("Error updating user's name to match!"); });

  // New expiration date if needed
  const sessionExpirationDate = new Date();
  sessionExpirationDate.setDate(sessionExpirationDate.getDate() + 1);

  // Try to find session first
  let session = {}
  // Limit amount of attempts to prevent stalling for too long
  let attempts = 0;
  do {
    session = (await Session.findOrCreate({
      where: {
        email,
        userId: person.user.id,
        token: { [Op.ne]: "" },
      },
      defaults: {
        token: jwt.sign({ id: email }, authconfig.secret, { expiresIn: 86400 }),
        email,
        expirationDate: sessionExpirationDate,
        userId: person.user.id,
      }
    }))?.[0]?.dataValues;

    if (!session) return res.status(500).send({ message: "Error retrieving session!" });

    // Check if session has expired
    if (session.expirationDate < Date.now()) {
      let errorOccurred = false;
      session.token = "";
      await Session.update(session, { where: { id: session.id } })
      .catch((err) => {
        console.log(err);
        errorOccurred = true;
      });

      if (errorOccurred) return res.status(500).send({ message: "Error logging out user." });
    }
  } while (session.expirationDate < Date.now() && ++attempts < 10);

  if (attempts >= 10) return res.status(500).send({ message: "Error retrieving session!" });

  // Send the response containing only the information we want the frontend to see
  const response = {
    email: person.email,
    fName: person.fName,
    lName: person.lName,
    personId: person.id,
    userId: person.user.id,
    token: session.token,
  };
  
  return res.send(response);
};

// exports.authorize = async (req, res) => {
//   // Authorize client
//   const oauth2Client = new google.auth.OAuth2(
//     process.env.CLIENT_ID,
//     process.env.CLIENT_SECRET,
//     "postmessage"
//   );

//   // Get access and refresh tokens (if access_type is offline)
//   let { tokens } = await oauth2Client.getToken(req.body.code);
//   oauth2Client.setCredentials(tokens);

//   const user = (await User.findOne({ where: { id: req.params.id } }))?.[0]?.dataValues
  
//   if (!user) return res.status(500).send({ message: "Error finding user!" });
  
//   console.log(user);
//   user.refresh_token = tokens.refresh_token;
//   const tempExpirationDate = new Date();
//   tempExpirationDate.setDate(tempExpirationDate.getDate() + 100);
//   user.expiration_date = tempExpirationDate;

//   await User.update(user, { where: { id: user.id } })
//   .then((num) => {
//     let userInfo = {
//       refresh_token: user.refresh_token,
//       expiration_date: user.expiration_date,
//     };
//     console.log(userInfo);
//     res.send(userInfo);
//   })
//   .catch((err) => {
//     res.status(500).send({ message: err.message });
//   });

//   console.log(tokens);
//   console.log(oauth2Client);
// };

exports.logout = async (req, res) => {
  if (!req.body) return res.send({ message: "User has already been successfully logged out!" });
  
  await Session.update({ token: null }, { where: { token: req.body.token } })
  .then((data) => {
    res.send({ message: "Successfully logged out!" });
  })
  .catch((err) => {
    res.status(500).send({
      message: err.message || "Error logging out user.",
    });
  });
};
