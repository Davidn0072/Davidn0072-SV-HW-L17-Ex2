const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); 

console.log('Bf-Get');//the get is WORK!!!
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

//app.use('/', express.static('html'));

console.log('Bf-POST');
app.post('/submit-register-data', (req, res) => {
    const { username, email, password, confirmPassword } = req.body;
    let errMsg = "";

    if (!(username.length >= 4)&&(username.length <= 8))
      errMsg = 'Invalid User len'+'('+username.length+')'
    else
    if (email.indexOf('@') == -1)
      errMsg = 'Invalid Email'
    else
    if (!(password.length >= 5)&&(password.length <= 10))
      errMsg = 'Invalid PW LEN'+'('+password.length+')'
    else
    if (password.indexOf('$') == -1)
      errMsg = 'pw not contain $'
    else
    if (password != confirmPassword)
    {
      //console.log(password,password.length,confirmPassword,confirmPassword.length);
        errMsg = 'Confirm password does not match password';
    }

    if (errMsg == "")
    {
        const userData = `Username: ${username}, Email: ${email}, Password: ${password}\n`;
        const fullpath = path.join(__dirname, 'users.txt');

      if (!fs.existsSync(fullpath))  
        fs.writeFile(fullpath, userData, (err) => {
          if (err) throw err;
            console.log('File has been written!');
      })
      else
      fs.appendFile(fullpath, userData, (err) => {
        if (err) throw err;
          console.log('File has been Append!');
      });
  
      return res.send(`<h2>Hello ${username}</h2><a href="/">חזרה</a>`);
    }
    else
    {   
      //console.log(101);
      return res.send('<h2>Error Registration</h2><BR>'+errMsg+'<BR><a href="/">חזרה</a>');
      //console.log(102);
    }
});

console.log('Bf-listen');
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
