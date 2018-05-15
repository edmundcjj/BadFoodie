const express = require('express');
const bodyParser = require('body-parser');
const cookierParser = require('cookie-parser');
const mongoose = require('mongoose');
const config = require('./config/config').get(process.env.NODE_ENV);
const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(config.DATABASE);

// Import models schema to be used in the routes section
const { User } = require('./models/user');
const { Review } = require('./models/restaurant_review');
const { auth } = require('./middleware/auth');

app.use(bodyParser.json());
app.use(cookierParser());

// --------------------------------Book Routes----------------------------------
// GET route for a single review
app.get('/api/getReview', (req,res)=>{
  let id = req.query.id;

  Review.findById(id, (err, doc)=>{
    if (err) return res.status(400).send(err);
    res.send(doc);
  })
})

// GET route for multiple reviews
app.get('/api/reviews', (req,res)=>{
  // localhost:3001/api/reviews?skip=3&limit=2&order=asc
  let skip = parseInt(req.query.skip);
  let limit = parseInt(req.query.limit);
  let order = req.query.order;

  // ORDER = asc || desc
  Review.find().skip(skip).sort({_id:order}).limit(limit).exec((err, doc)=>{
    if (err) return res.status(400).send(err);
    res.send(doc);
  })
})

// GET route for retrieving the reviewer particulars
app.get('/api/getReviewer', (req, res)=>{
  User.findById(req.query.id, (err, doc)=>{
    if (err) return res.status(400).send(err);
    res.json({
      name: doc.name,
      lastname: doc.lastname
    })
  })
})

// POST route to add a new review
app.post('/api/review', (req,res)=> {
  const review = new Review(req.body);

  review.save((err,doc)=>{
    if (err) return res.status(400).send(err);
    res.status(200).json({
      post: true,
      reviewId: doc._id
    })
  })
})

// UPDATE route to edit details of an existing review
app.post('/api/update_review', (req,res)=>{
  Review.findByIdAndUpdate(req.body._id, req.body, {new: true}, (err, doc)=>{
    if (err) return res.status(400).send(err);
    res.json({
      success: true,
      doc
    })
  })
})

// DELETE route to remove existing review
app.delete('/api/delete_review', (req,res)=>{
  let id = req.query.id;

  Review.findByIdAndRemove(id, (err, doc)=>{
    if (err) return res.status(400).send(err);
    res.json({
      success: true,
    })
  })
})

// --------------------------------User Routes----------------------------------
// POST route to register a new user
app.post('/api/register', (req,res)=> {
  const user = new User(req.body);

  user.save((err,doc)=>{
    if (err) return res.json({success: false});
    res.status(200).json({
      post: true,
      user: doc
    })
  })
})

// POST route to login an existing user
app.post('/api/login', (req,res)=> {
  User.findOne({'email': req.body.email},(err, user)=>{
    if (!user) return res.json({isAuth: false, message:'Authentication failed, email not found'});

    // Compare Password when user login
    user.comparePassword(req.body.password, (err, isMatch)=>{
      if(!isMatch) return res.json({
        isAuth: false,
        message: 'Wrong Password'
      });

      // Generate token and save it as a cookie
      user.generateToken((err, user)=>{
        if (err) return res.status(400).send(err);
        res.cookie('auth', user.token).json({
          isAuth: true,
          id: user._id,
          email: user.email
        })
      })
    })
  })
})

// GET route to retrieve all users
app.get('/api/users', (req, res)=>{
  User.find({}, (err, users)=>{
    if (err) return res.status(400).send(err);
    res.status(200).send(users);
  })
})

// GET route to retrieve all the reviews of a user
app.get('/api/user_posts', (req,res)=>{
  Review.find({ownerId: req.query.user}).exec((err, docs)=>{
    if (err) return res.status(400).send(err);
    res.send(docs);
  })
})

// GET route to logout the user
app.get('/api/logout', auth, (req,res)=>{
  req.user.deleteToken(req.token, (err, user)=>{
    if (err) return res.status(400).send(err);
    res.sendStatus(200);
  })
})

// GET route to determine whether a users is logged in or not
app.get('/api/auth', auth, (req,res)=>{
  res.json({
    isAuth: true,
    id: req.user._id,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname
  })
})


const port = process.env.PORT || 3001;
app.listen(port, ()=>{
  console.log('SERVER RUNNING...');
})
