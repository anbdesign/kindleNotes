const express = require('express')
const bodyParser = require('body-parser');
const sgMail = require('@sendgrid/mail');

require('dotenv').config()


const app = express()
const port = process.env.PORT || 6001

sgMail.setApiKey(process.env.SENDGRID_API_KEY)


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

  const message = {
      to: process.env.THINGS_EMAIL,
      from: process.env.FROM_EMAIL,
      subject: input,
      text: `Kindle Note from ${dateString}`
  }

  sgMail.send(message)
  .then((response)=> console.log('email sent...'))
  .catch((error)=> {console.log(error.message)})


  result.send(`<h1>Todo Sent</h1>
  <a href='/'>Send another?</a>
  `)

})