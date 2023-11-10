
const JWT = require('jsonwebtoken')
const express = require('express');
const app = express();
const bodyParser = require("body-parser")

require("./coach");

const { PrismaClient } = require('@prisma/client');
const dotenv = require('dotenv');
const session = require('express-session');
const { check, validationResult } = require('express-validator');

const prisma = new PrismaClient()
app.use(express.json());
dotenv.config(); // Load environment variables from .env file


const router = express.Router();



// MongoDB connection


 

app.get('/', async (req, res) => {
    try {
      await prisma.$connect();
      console.log('Prisma connected to the database successfully');
      res.send('Prisma connected to the database successfully');
    } catch (error) {
      console.error('Prisma failed to connect:', error);
      res.status(500).send('Prisma failed to connect');
    }
  });
  
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
  

app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error1');
  });


  router.get('/register', async function(req, res, next) {
    navigation.navigate('Gymsc')
  });


  const decryptPassword = (message, key) =>{
    let decryptedMessage = "";
    for (let i = 0; i < message.length; i++) {
      let charCode = message.charCodeAt(i);
      if (charCode >= 65 && charCode <= 90) {
        decryptedMessage += String.fromCharCode((charCode - 65 - key + 26) % 26 + 65);
      } else if (charCode >= 97 && charCode <= 122) {
        decryptedMessage += String.fromCharCode((charCode - 97 - key + 26) % 26 + 97);
      } else {
        decryptedMessage += message.charAt(i);
      }
    }
    return decryptedMessage;
  }

  const encryptPassword = (message, key)=> {
  let encryptedMessage = "";
  for (let i = 0; i < message.length; i++) {
    let charCode = message.charCodeAt(i);
    if (charCode >= 65 && charCode <= 90) {
      encryptedMessage += String.fromCharCode((charCode - 65 + key) % 26 + 65);
    } else if (charCode >= 97 && charCode <= 122) {
      encryptedMessage += String.fromCharCode((charCode - 97 + key) % 26 + 97);
    } else {
      encryptedMessage += message.charAt(i);
    }
  }
  return encryptedMessage;
}


app.get('/recipeinformation', async(req, res)=> {
  try{
    const {recipeId} = req.body;
    const recipeinformation = await prisma.recipeinformation.findUnique({
      where:{
        id : recipeId
      }
     
    });
    console.log(recipeinformation,recipeId)
return res.status(200).send({recipeinformation});
  }
  catch(error){
    console.error('Error fetching recipes:', error);
    res.status(500).send({ error: 'Internal server error' });
  }
});

app.get('/recipesinformation', async (req, res) => {
  try {
    const recipeinformations = await prisma.Recipeinformation.findMany(); // Replace 'recipe' with your actual Prisma model name

   return res.status(200).send({recipeinformations});
  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.status(500).send({ error: 'Internal server error' });
  }
});

app.get('/recipes', async (req, res) => {
  try {
    const recipes = await prisma.recipes.findMany(); // Replace 'recipe' with your actual Prisma model name

   return res.status(200).send({ recipes });
  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.status(500).send({ error: 'Internal server error' });
  }
});

app.get('/exerciseinformation', async (req, res) => {
  try {
    const exerciseinformations = await prisma.exerciseinformation.findMany(); // Replace 'recipe' with your actual Prisma model name

   return res.status(200).send({exerciseinformations});
  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.status(500).send({ error: 'Internal server error' });
  }
});


app.get('/exercises', async (req, res) => {
  try {
    const exercises = await prisma.exercises.findMany(); // Replace 'recipe' with your actual Prisma model name

   return res.status(200).send({ exercises });
  } catch (error) {
    console.error('Error fetching exercises:', error);
    res.status(500).send({ error: 'Internal server error' });
  }
});

  app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const shift = 3; // Specify the number of positions to shift
  
    console.log('hi', username, password)
    try {
      const user = await prisma.User.findUnique({
        where: { email: username },
      });
  
      if (!user) {
        // User not found, display an error message
       
        return res.status(400).send({ success: false, message: 'Incorrect Email / Password.' });
      }
  
      const encryptedPass = user.password;
      const decryptedPassword = decryptPassword(encryptedPass, shift);
  
      if (decryptedPassword !== password) {
        const newAttempts = user.login_attempts + 1;
  
        if (newAttempts >= 4) {
          // The user is locked out
          const lockedUntil = new Date(Date.now() + 5 * 60000); // Lock for 5 minutes
          await prisma.User.update({
            where: { email: username },
            data: {
              login_attempts: 3,
              locked_until: lockedUntil,
            },
          });
          console.log('5', username, password)
          return res.status(400).send({
            success: false, message: `Your account is locked until ${lockedUntil.toLocaleString()}. Please try again later.`,
          });
        } else {
          await prisma.User.update({
            where: { email: username },
            data: {
              login_attempts: newAttempts,
            },
          });
  
          return res.status(400).send({ success: false, message: 'Wrong Password' });
        }
      } else if (user.locked_until > new Date()) {
        // Account is locked
        const minutesLeft = Math.ceil((user.locked_until - new Date()) / 60000);
        return res.status(403).json({
          errorMessage: `Your account is locked until ${user.locked_until.toLocaleString()}. Please try again in ${minutesLeft} Minutes.`,
        });
      } else {
        // Successful login

        const userId = user.id;
        const token = await JWT.sign({_id: user._id}, process.env.JWT_SECRET,{
          expiresIn:'7d'
        })
        const firstname = user.firstname
        
        await prisma.User.update({
          where: { email: username },
          data: { login_attempts: 0 },
        });
        user.password = undefined
        console.log('2', username, password)
        return res.status(200).send({ success: true, message: 'Login successful', userId: userId, firstname: firstname, token, user }); // Redirect to the homepage
      
      }
    
    } catch (err) {
      console.error(err);
      console.log('3', username, password)
      return res.status(500).json({ errorMessage: 'Something went wrong.' });
    }
  });

  app.post('/registering', [
    check('firstname').isLength({ min: 1 }).withMessage('First name is required'),
    check('lastname').isLength({ min: 1 }).withMessage('Last name is required'),
    check('email').isEmail().withMessage('Invalid email address'),
    check('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{6,}$/)
      .withMessage('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
  ], async (req, res) => {
    const { firstname, lastname, email, password } = req.body;
    const shift = 3; // Specify the number of positions to shift
    console.log('hi', firstname,lastname,email, password)
    try {
      const errors = validationResult(req);
  
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(error => error.msg);
        return res.status(400).send({ success: false, message: errorMessages });
      }
      const user = await prisma.User.findUnique({
        where: { email: email },
      });
      if (user) {
        return res.status(400).send({ success: false, message: 'Email already exists, please choose a different one' });
      } else {
        const encryptedPassword = await encryptPassword(password, shift);
        const login_attempts = 0;
        const locked_until = null;
        await prisma.User.create({
          data: {
            firstname,
            lastname,
            email,
            password: encryptedPassword,
            login_attempts,
            locked_until,
          }
        });
  
        return res.status(200).send({ success: true, message: 'Registration successful' });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: 'Something went wrong.' });
    }
  });
  
  app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: false,
  }));
  
  app.get("/",(req,res) =>{
    Coach.find({})
    .then(data =>{
        console.log(data)
        res.send(data)
    }).catch(err => {
            console.log(err)
        })
  })
module.exports = app;