const { synthesizeSpeech } = require("./polly");
const csv = require("csvtojson");

function generateFromCSV(voice) {
  csv()
    .fromFile("./content/suburbs.csv")
    .then(function (jsonArrayObj) {
      const suburbs = jsonArrayObj.map((m) => m.suburb_4th_order);
      suburbs.forEach((e) =>
        synthesizeSpeech(e, voice, `suburbs/${e.toLowerCase()}`)
      );
    });
}

generateFromCSV("Aria");

// Run Polly by passing through text, a voice, and an output file path.
// synthesizeSpeech("Hello, this is a test", "Aria", "suburbs/testfile");
// See https://docs.aws.amazon.com/polly/latest/dg/voicelist.html for list of voices.

// In the above example, we are calling a file of suburbs, and converting each suburb into a voice file.
// *NOTE*: You'll need to add AWS keys to the config file (config.json). See config.example.json
