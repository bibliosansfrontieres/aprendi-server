const path = require('path')
const childProcess = require('child_process')
const phantomjs = require('phantomjs-prebuilt')

exports.startPhantomJS = () => {
  const binPath = phantomjs.path

  console.log(binPath)

  const childArgs = [
    path.join(__dirname, '../', 'phantomjs-script.js')
  ]

  return new Promise(function(resolve, reject) {
    childProcess.execFile(binPath, childArgs, function(err, stdout, stderr) {
      console.log("phantom js running")
      if (err) { reject(err) }
      resolve()
    })
  })
}
