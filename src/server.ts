const express = require('express')
const bodyParser = require('body-parser');
const postmark = require('postmark');

require('dotenv').config()


const app = express()
const port = process.env.PORT || 6001

const postmarkClient = new postmark.ServerClient(process.env.POSTMARK_SERVER_TOKEN);


app.use(express.static('dist/app'))

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
);


app.listen(port, () => {
  console.log('listening on *:' + port);
});


// NOT SURE IF THIS IS NEEDED, BUT SAW IN TUTORIAL
// app.get('/todo', function (req, res) {
//   // 👇️ if your HTML file is in the root directory (next to package.json)
//   res.sendFile(__dirname + '/index.html');
// });



app.post('/', (request, result) => {
  const input = request.body.textArea
  console.log(input);

  const dateString = new Date().toString()
  console.log(`Form Submitted: ${input}`);

  let error = null;

  postmarkClient
    .sendEmail({
      // From: process.env.FROM_EMAIL,
      From: "alex@anbdesign.com",
      // From: process.env.THINGS_EMAIL,
      To: process.env.THINGS_EMAIL,
      // To: "alex@anbdesign.com",
      Subject: input,
      TextBody: `Kindle Note from ${dateString}`,
      MessageStream: 'outbound',
    })
    .then(() => {
      console.log('email sent...');
    })
    .catch((err: any) => {
      error = err;
      console.log(err.message || err);
    })
    .finally(() => {
      result.send(`
        <h1>Email Attempted</h1>
        <p>${error ? `Error: ${error.message || error}` : 'Todo Sent Successfully'}</p>
        <a href='/'>Send another?</a>
      `);
    });

})