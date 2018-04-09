const html2png = require('html2png');
var jimp = require("jimp");

exports.takeWebScreenshot = (url) => {
  console.log("in take web screenshot")
  var screenshot = html2png({ width: 1050, height: 1050, browser: 'phantomjs'});

  return new Promise((resolve, reject) => {
    screenshot.renderUrl(url, function (err, data) {
      if (err) {
        reject(err)
        return screenshot.error(err);
      }

      console.log(data)

      jimp.read(data).then(image => {
        image.crop(0,0,1050,1050)
        image.getBuffer(image.getMIME(), (err, result) => {
          if (err) { reject(err) }

          resolve(result)
          screenshot.close();
        })
      }).catch((err) => {
        reject(err)
      });
    })
  })
}
