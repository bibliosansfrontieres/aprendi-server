'use strict'

const express = require('express')
const app = express()
const jwt = require('express-jwt')
const jwks = require('jwks-rsa')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const aws = require('aws-sdk')
const fetch = require("node-fetch")
const S3_BUCKET = process.env.AWS_S3_BUCKET
const gm = require("gm")

const Resource = require('./models/Resource')
const Collection = require('./models/Collection')
const Subcollection = require('./models/Subcollection')
const User = require('./models/User')

const resource_controller = require('./controllers/Resource')
const collection_controller = require('./controllers/Collection')
const subcollection_controller = require('./controllers/Subcollection')
const team_controller = require('./controllers/Team')
const user_controller = require('./controllers/User')

const signS3 = require('./utils/s3_sign_url').signS3
const takeWebScreenshot = require('./utils/take_web_screenshot').takeWebScreenshot
const startPhantomJS = require('./utils/start_phantomjs').startPhantomJS

const dbUrl = process.env.MONGODB_URI

mongoose.connect(dbUrl)
// mongoose.connect("mongodb://localhost:27017/")

mongoose.Promise = global.Promise
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
  console.log("connected to db")
  // we're connected!
})

app.listen(process.env.PORT || 3333, function() {
  console.log('Listening on Port ' + (process.env.PORT || 3333))
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
  // Note: __dirname is directory that contains the JavaScript source code. Try logging it and see what you get!
  // Mine was '/Users/zellwk/Projects/demo-repos/crud-express-mongo' for this app.
})

// app.get('/resources', resource_controller.full_list)
//
// app.post('/resource/create', resource_controller.create)
//
// app.get('/resource/:id', resource_controller.find_by_id)
//
//
// app.get('/collections', collection_controller.full_list)
//
// app.post('/collection/create', collection_controller.create)
//
// app.get('/collection/:id', collection_controller.find_by_id)
//
//
app.get('/sign-s3', (req, res) => {
  const fileName = req.query['file-name']
  const fileType = req.query['file-type']
  const folder = req.query['folder']

  const key =  folder + '/' + fileName

  const onError = () => res.end()

  signS3({key: key, fileType: fileType, fileName: fileName})
    .then(returnData => {
      res.write(JSON.stringify(returnData))
      res.end()
    })
})

app.get('/take-web-screenshot', (req, res) => {
  console.log("taking screenshot")
  const url = req.query['url']

  takeWebScreenshot(url)
    .then(data => {
      console.log("screenshot successful")
      console.log(data)

      const fileName = "web-screenshot_" + +new Date() + ".png"

      const signS3Params = {
        key: "images/" + fileName,
        fileType: "image/png",
        fileName: fileName,
      }

      signS3(signS3Params)
        .then(({signedUrl, url}) => {
          console.log(signedUrl, url)

          fetch(signedUrl, { method: 'PUT', body: data })
            .then(() => {
              res.write(JSON.stringify(fileName))
              res.end()
            })
            .catch(error => console.log("error", error))
        })
        .catch(error => console.log("error", error))
    })
    .catch(error => console.log("error", error))

})

app.get('/take-web-screenshot', (req, res) => {
  console.log("taking screenshot")
  const url = req.query['url']

  takeWebScreenshot(url)
    .then(data => {
      console.log("screenshot successful")
      console.log(data)

      const fileName = "web-screenshot_" + +new Date() + ".png"

      const signS3Params = {
        key: "images/" + fileName,
        fileType: "image/png",
        fileName: fileName,
      }

      signS3(signS3Params)
        .then(({signedUrl, url}) => {
          console.log(signedUrl, url)

          fetch(signedUrl, { method: 'PUT', body: data })
            .then(() => {
              res.write(JSON.stringify(fileName))
              res.end()
            })
            .catch(error => console.log("error", error))
        })
        .catch(error => console.log("error", error))
    })
    .catch(error => console.log("error", error))

})

app.post('/team', team_controller.create)
app.delete('/team', team_controller.delete_by_id)
app.put('/team', team_controller.update_by_id)
app.get('/team', team_controller.find_by_url)
app.get('/teams', team_controller.get_full_list)
app.put('/team_add_user', team_controller.add_user)
app.put('/team_approve_user_request', team_controller.approve_user_request)
app.put('/team_deny_user_request', team_controller.deny_user_request)
app.put('/team_remove_user', team_controller.remove_user)


app.get('/users', user_controller.get_full_list)
app.put('/user-make-core-admin', user_controller.user_make_core_admin)
app.put('/user-find-by-auth0id', user_controller.find_by_auth0id)

app.post('/collection', collection_controller.create)
app.delete('/collection', collection_controller.delete_by_id)
app.put('/collection', collection_controller.update_by_id)
app.put('/collection-add-resource', collection_controller.add_resource)
app.put('/collection-remove-resource', collection_controller.remove_resource)
app.get('/collection', collection_controller.find_by_url)
app.get('/collections', collection_controller.get_full_list)
// app.get('/collection-is-path-taken', collection_controller.is_path_taken)

app.post('/subcollection', subcollection_controller.create)
app.delete('/subcollection', subcollection_controller.delete_by_id)
app.put('/subcollection', subcollection_controller.update_by_id)
app.put('/subcollection-add-resource', subcollection_controller.add_resource)
app.put('/subcollection-remove-resource', subcollection_controller.remove_resource)
app.get('/subcollection', subcollection_controller.find_by_url)
app.get('/subcollections', subcollection_controller.get_full_list)


app.post('/resource', resource_controller.create)
app.delete('/resource', resource_controller.delete_by_id)
app.put('/resource', resource_controller.update_by_id)
app.get('/resource', resource_controller.find_by_id)
app.get('/resources', resource_controller.get_full_list)




// Resource.find({ size: 'small' }).where('createdDate').gt(oneYearAgo).exec(callback)
// Resource.findOneAndUpdate({ name: 'borne' }, { name: 'jason bourne' }, options, callback)
// Resource.findByIdAndUpdate(id, { name: 'jason bourne' }, options, callback)
// Resource.remove({ size: 'large' }, function (err) {
//   if (err) return handleError(err)
//   // removed!
// })



// app.use('/resources', ResourceRoutes)
// app.use('/catalog', catalog)
// app.use('/resource', ResourceRoutes)

// app.use((req, res, next) => {
//   const err = new Error('Not Found')
//   err.status = 404
//   next(err)
// })
// app.use((err, req, res, next) => {
//   res.status(err.status || 500)
//   res.json({
//     error: {
//       message: err.message
//     }
//   })
// })


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
})
