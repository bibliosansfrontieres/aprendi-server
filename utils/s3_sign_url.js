const S3_BUCKET = process.env.AWS_S3_BUCKET
const aws = require('aws-sdk')

exports.signS3 = ({key, fileType, fileName}) => {
  console.log("in sign s3")
  const s3 = new aws.S3()

  const s3Params = {
    Bucket: S3_BUCKET,
    Key: key,
    Expires: 60,
    ContentType: fileType,
    ACL: 'public-read'
  }

  return new Promise((resolve, reject) => {
    s3.getSignedUrl('putObject', s3Params, (err, data) => {
      if(err){
        console.log(err)
        reject(err)
      }
      const returnData = {
        signedUrl: data,
        url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
      }
      resolve(returnData)
    })
  })
}
