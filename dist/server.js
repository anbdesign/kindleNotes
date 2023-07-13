const express = require('express');
const bodyParser = require('body-parser');
const sgMail = require('@sendgrid/mail');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 3001;
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
app.use(express.static('dist/app'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false,
}));
// app.get('/', function (req, res) {
//   res.send('Hello World')
// })
app.listen(port, () => {
    console.log('listening on *:' + port);
});
// app.get('/todo', function (req, res) {
//   // 👇️ if your HTML file is in the root directory (next to package.json)
//   res.sendFile(__dirname + '/index.html');
// });
app.post('/', (request, result) => {
    const input = request.body.textArea;
    console.log(input);
    const dateString = new Date().toString();
    console.log(`Form Submitted: ${input}`);
    const message = {
        to: process.env.THINGS_EMAIL,
        from: process.env.FROM_EMAIL,
        subject: input,
        text: `Kindle Note from ${dateString}`
    };
    sgMail.send(message)
        .then((response) => console.log('email sent...'))
        .catch((error) => { console.log(error.message); });
    result.send(`<h1>Todo Sent</h1>
  <a href='/'>Send another?</a>
  `);
});
// POST method route
// app.get('/todo/:todoText', (req, res) => {
//   console.log(req.params.todoText);
// const dateString = new Date().toString()
// console.log(`Form Submitted: ${input}`);
// const message = {
//     to: process.env.THINGS_EMAIL,
//     from: process.env.FROM_EMAIL,
//     subject: input,
//     text: `Kindle Note from ${dateString}`
// }
// sgMail.send(message)
// .then((response)=> console.log('email sent...'))
// .catch((error)=> {console.log(error.message)})
//   res.send('POST request to the homepage')
// })
//# sourceMappingURL=server.js.map