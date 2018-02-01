'use strict';

const express = require('express');
const app = express();
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dbUrl = process.env.MONGODB_URL;

const Resource = require('./models/Resource')
const Collection = require('./models/Collection')
const Subcollection = require('./models/Subcollection')
const User = require('./models/User')

const resource_controller = require('./controllers/Resource');
const collection_controller = require('./controllers/Collection');
const subcollection_controller = require('./controllers/Subcollection');

mongoose.connect(dbUrl);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connected to db")
  // we're connected!
});

app.listen(3333, function() {
  console.log('Listening on localhost:3333');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
  // Note: __dirname is directory that contains the JavaScript source code. Try logging it and see what you get!
  // Mine was '/Users/zellwk/Projects/demo-repos/crud-express-mongo' for this app.
})

app.get('/resources', resource_controller.full_list);

app.post('/resource/create', resource_controller.create);

app.get('/resource/:id', resource_controller.find_by_id);


app.get('/collections', collection_controller.full_list);

app.post('/collection/create', collection_controller.create);

app.get('/collection/:id', collection_controller.find_by_id);


// Resource.find({ size: 'small' }).where('createdDate').gt(oneYearAgo).exec(callback);
// Resource.findOneAndUpdate({ name: 'borne' }, { name: 'jason bourne' }, options, callback)
// Resource.findByIdAndUpdate(id, { name: 'jason bourne' }, options, callback)
// Resource.remove({ size: 'large' }, function (err) {
//   if (err) return handleError(err);
//   // removed!
// });



// app.use('/resources', ResourceRoutes);
// app.use('/catalog', catalog);
// app.use('/resource', ResourceRoutes);

// app.use((req, res, next) => {
//   const err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });
// app.use((err, req, res, next) => {
//   res.status(err.status || 500);
//   res.json({
//     error: {
//       message: err.message
//     }
//   });
// });


const authCheck = jwt({
  secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        // YOUR-AUTH0-DOMAIN name e.g https://prosper.auth0.com
        jwksUri: process.env.AUTH0_DOMAIN + "/.well-known/jwks.json"
    }),
    // This is the identifier we set when we created the API
    audience: process.env.API_AUDIENCE,
    issuer: process.env.AUTH0_DOMAIN,
    algorithms: ['RS256']
});



app.post('/quotes', (req, res) => {
  console.log(req.body)
})

app.get('/api/jokes/food', (req, res) => {
  let foodJokes = [
  {
    id: 99991,
    joke: "When Chuck Norris was a baby, he didn't suck his mother's breast. His mother served him whiskey, straight out of the bottle."
  },
  {
    id: 99992,
    joke: 'When Chuck Norris makes a burrito, its main ingredient is real toes.'
  },
  {
    id: 99993,
    joke: 'Chuck Norris eats steak for every single meal. Most times he forgets to kill the cow.'
  },
  {
    id: 99994,
    joke: "Chuck Norris doesn't believe in ravioli. He stuffs a live turtle with beef and smothers it in pig's blood."
  },
  {
    id: 99995,
    joke: "Chuck Norris recently had the idea to sell his urine as a canned beverage. We know this beverage as Red Bull."
  },
  {
    id: 99996,
    joke: 'When Chuck Norris goes to out to eat, he orders a whole chicken, but he only eats its soul.'
  }
  ];
  res.json(foodJokes);
})

app.get('/api/jokes/celebrity', authCheck, (req,res) => {
  let CelebrityJokes = [
  {
    id: 88881,
    joke: 'As President Roosevelt said: "We have nothing to fear but fear itself. And Chuck Norris."'
  },
  {
    id: 88882,
    joke: "Chuck Norris only let's Charlie Sheen think he is winning. Chuck won a long time ago."
  },
  {
    id: 88883,
    joke: 'Everything King Midas touches turnes to gold. Everything Chuck Norris touches turns up dead.'
  },
  {
    id: 88884,
    joke: 'Each time you rate this, Chuck Norris hits Obama with Charlie Sheen and says, "Who is winning now?!"'
  },
  {
    id: 88885,
    joke: "For Charlie Sheen winning is just wishful thinking. For Chuck Norris it's a way of life."
  },
  {
    id: 88886,
    joke: "Hellen Keller's favorite color is Chuck Norris."
  }
  ];
  res.json(CelebrityJokes);
})
