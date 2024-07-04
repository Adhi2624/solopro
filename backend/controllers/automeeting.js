const { google } = require('googleapis');
const nodemailer = require('nodemailer');
const OAuth2Data = require('../googlecredentials.json'); // Your OAuth credentials

const { client_id, client_secret, redirect_uris } = OAuth2Data.web;
const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

const createMeet = async (req, res) => {
  const { code } = req.body;

  if (code) {
    try {
      const { tokens } = await oAuth2Client.getToken(code);
      oAuth2Client.setCredentials(tokens);

      const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });

      const event = {
        summary: 'Google Meet Meeting',
        description: 'A meeting to discuss things.',
        start: {
          dateTime: '2024-07-10T09:00:00-07:00', // Replace with your date and time
          timeZone: 'America/Los_Angeles',
        },
        end: {
          dateTime: '2024-07-10T10:00:00-07:00', // Replace with your date and time
          timeZone: 'America/Los_Angeles',
        },
        conferenceData: {
          createRequest: {
            requestId: "randomString", // A unique string to identify the request
            conferenceSolutionKey: {
              type: "hangoutsMeet"
            }
          }
        },
        attendees: [
          { email: 'adhiadhithiyan2624@gmail.com' }, // Corrected email addresses
          { email: 'visv6812@gmail.com' }
        ],
      };

      const eventResponse = await calendar.events.insert({
        calendarId: 'primary',
        resource: event,
        conferenceDataVersion: 1,
        sendUpdates: 'all',
      });

      console.log('Event created:', eventResponse.data);

      // Send email
      sendEmail(eventResponse.data);

      res.send('Meet link created and email sent');
    } catch (err) {
      console.error('Error creating Meet event:', err);
      res.status(500).send('Error creating Meet event');
    }
  } else {
    res.status(400).send('Authorization code not provided');
  }
};

const sendEmail = (eventData) => {
  const transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com", // hostname
    auth: {
      user: 'vishalv.21it@sonatech.ac.in',
      pass: 'Poda#poda12'
    }
  });

  const mailOptions = {
    from: 'soloprobusiness@gmail.com',
    to: 'adhiadhithiyan2624@gmail.com, visv6812@gmail.com',
    subject: 'Google Meet Invitation',
    html: `<p>You have been invited to a Google Meet meeting. <a href="${eventData.hangoutLink}">Join the meeting</a></p>`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Email sent: ' + info.response);
  });
};

module.exports = { createMeet };
