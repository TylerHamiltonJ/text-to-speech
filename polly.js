const AWS = require("aws-sdk");
const { aws } = require("./config.json");
const fs = require("fs");

const synthesizeSpeech = (text, voice, fileName) => {
  // Create the parameters
  const params = {
    OutputFormat: "mp3",
    Text: text,
    VoiceId: voice,
    Engine: "neural",
  };

  const Polly = new AWS.Polly({
    signatureVersion: "v4",
    region: "us-east-1",
    credentials: aws,
    region: aws.region,
  });

  Polly.synthesizeSpeech(params, (err, data) => {
    if (err) {
      console.log(err.code);
    } else if (data) {
      if (data.AudioStream instanceof Buffer) {
        fs.writeFile(`./output/${fileName}.mp3`, data.AudioStream, function (err) {
          if (err) {
            return console.log(err);
          }
          console.log("The file was saved!");
        });
      }
    }
  });
};

module.exports = { synthesizeSpeech };
