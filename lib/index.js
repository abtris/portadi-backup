const request = require('request');
const fs = require('fs');

const accountlistUrl = "https://app.portadi.com/accounts/all";
const accountUrl = "https://app.portadi.com/accounts/";
const backupDir = process.env.PORTADI_DATA_DIR || "data";

if (!process.env.PORTADI_API_KEY) {
  console.log("Missing env variable PORTADI_API_KEY");
  process.exit(1);
}

if (fs.existsSync(backupDir)) {
  const options = {
    url: accountlistUrl,
    headers: {
      'Authorization': 'Bearer ' + process.env.PORTADI_API_KEY
    }
  };

  getDetails = (id, cb) => {
    let opt = {
      url: accountUrl + id,
      headers: {
        'Authorization': 'Bearer ' + process.env.PORTADI_API_KEY
      }
    };
    request(opt, (error, res, detailBody) => {
      if (error) {
        console.error(error);
        cb(error);
      }
      cb(null, detailBody);
    });
  };  
  getAllRecords = (cb) => {
    request(options, (error, response, body) => {
      if (error) {
        cb(error);
      } 
      bodyObject = JSON.parse(body);
      console.log(bodyObject);
      bodyObject.forEach(element => {
        getDetails(element.id, (err, details) => {
          if (err) {
            cb(err);
          }
          detailsObject = JSON.parse(details);
          filename = backupDir + "/" + detailsObject.id + detailsObject.name.replace(/ /g, "-")
          fs.writeFileSync(filename, JSON.stringify(detailsObject, " ", 2));
        });
      });
      cb();
    });
  }
  getAllRecords((err) => {
    if (err) { 
      console.error(err); 
    }
    console.log("Done");
  });   
} else {
  console.log("Directory" + backupDir + " doesn't exists.");
  process.exit(1);
}

