const express = require('express');
const bodyParser = require('body-parser');
const postmark = require('postmark');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 6001;
const postmarkClient = new postmark.ServerClient(process.env.POSTMARK_SERVER_TOKEN);
app.use(express.static('dist/app'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false,
}));
app.listen(port, () => {
    console.log('listening on *:' + port);
});
// NOT SURE IF THIS IS NEEDED, BUT SAW IN TUTORIAL
// app.get('/todo', function (req, res) {
//   // 👇️ if your HTML file is in the root directory (next to package.json)
//   res.sendFile(__dirname + '/index.html');
// });
app.post('/', (request, result) => {
    const input = request.body.textArea;
    console.log(input);
    const tz = process.env.TIMEZONE || 'America/Los_Angeles';
    const now = new Date();
    const datePart = new Intl.DateTimeFormat('en-US', {
        timeZone: tz,
        weekday: 'short',
        month: 'short',
        day: '2-digit',
        year: 'numeric',
    }).format(now);
    const timePart = new Intl.DateTimeFormat('en-US', {
        timeZone: tz,
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    }).format(now);
    const dateString = `${datePart} - ${timePart}`;
    console.log(`Form Submitted: ${input}`);
    let error = null;
    postmarkClient
        .sendEmail({
        From: process.env.MY_EMAIL,
        To: process.env.THINGS_EMAIL,
        Subject: input,
        TextBody: `Kindle Note from ${dateString}`,
        MessageStream: 'outbound',
    })
        .then(() => {
        console.log('email sent...');
    })
        .catch((err) => {
        error = err;
        console.log(err.message || err);
    })
        .finally(() => {
        result.send(`
        <body style="background:#121212; color:#e0e0e0; font-family: sans-serif; padding: 2rem;">
          <h1 style="color:#ffffff;">Email Attempted</h1>
          <p>${error ? `Error: ${error.message || error}` : 'Todo Sent Successfully'}</p>
          <a href='/' style="color:#80b3ff; text-decoration:underline;">Send another?</a>
        </body>
      `);
    });
});
//# sourceMappingURL=server.js.map