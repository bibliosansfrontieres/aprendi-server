const html2png = require('html2png');

exports.takeWebScreenshot = (url) => {
  console.log("in take web screenshot")
  var screenshot = html2png({ width: 1280, height: 720, browser: 'phantomjs'});

  return new Promise((resolve, reject) => {
    screenshot.renderUrl(url, function (err, data) {
      if (err) {
        reject(err)
        return screenshot.error(err, cb);
      }
      resolve(data)

      // screenshot.close();
    })
  })
}
