const express = require('express');
const { google } = require('googleapis');
const nodemailer = require('nodemailer');
const { exec } = require('child_process');
const fs = require('fs');



// Middleware to parse JSON bodies




const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI;

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

const SCOPES = ['https://www.googleapis.com/auth/calendar'];

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

app.use(express.json()); // Middleware to parse JSON bodies

app.post('/meetings', async (req, res) => {
  try {
    const { userA, userB, date, time, agenda, title, duration } = req.body;

    // Input validation
    if (!userA || !userB || !date || !time || !title) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const eventStartTime = new Date(`${date}T${time}`);
    const eventEndTime = new Date(eventStartTime);
    eventEndTime.setMinutes(eventEndTime.getMinutes() + (duration || 30));

    const event = {
      summary: title,
      description: agenda,
      start: { dateTime: eventStartTime.toISOString() },
      end: { dateTime: eventEndTime.toISOString() },
      attendees: [{ email: userA }, { email: userB }],
      conferenceData: {
        createRequest: {
          requestId: 'your-unique-request-id',
          conferenceSolutionKey: { type: 'hangoutsMeet' },
        },
      },
    };

    const calendarResponse = await calendar.events.insert({
      calendarId: 'primary',
      resource: event,
      conferenceDataVersion: 1,
    });

    const meetLink = calendarResponse.data.hangoutLink;

    const mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: [userA, userB],
      subject: 'Meeting Confirmation',
      text: `Meeting details:\n- Title: ${title}\n- Date & Time: ${date} ${time}\n- Join using Google Meet: ${meetLink}`,
      html: `<b>Meeting details:</b><br>- Title: ${title}<br>- Date & Time: ${date} ${time}<br>- Join using Google Meet: <a href="${meetLink}">${meetLink}</a>`,
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: 'Meeting created successfully', meetLink });
  } catch (error) {
    console.error('Error creating meeting:', error);
    res.status(500).json({ message: 'Error creating meeting', error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
