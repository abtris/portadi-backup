const request = require('request');
const fs = require('fs');

const usersUrl = "https://app.portadi.com/users/"

const backupDir = process.env.PORTADI_DATA_DIR || "users";

if (!process.env.PORTADI_API_KEY) {
  console.log("Missing env variable PORTADI_API_KEY");
  process.exit(1);
}

if (fs.existsSync(backupDir)) {
  const options = {
    url: usersUrl,
    headers: {
      'Authorization': 'Bearer ' + process.env.PORTADI_API_KEY
    }
  };

  getDetails = (id, cb) => {
    let opt = {
      url: usersUrl + id,
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
  getAllUsersRecords = (cb) => {
    request(options, (error, response, body) => {
      if (error) {
        cb(error);
      }
      bodyObject = JSON.parse(body);
      bodyObject.activeUsers.forEach(element => {
        getDetails(element.id, (err, details) => {
          if (err) {
            cb(err);
          }
          detailsObject = JSON.parse(details);
          filename = backupDir + "/" + detailsObject.id + '-' + detailsObject.email.replace(/ /g, "-")
          fs.writeFileSync(filename, JSON.stringify(detailsObject, " ", 2));
        });
      });
      cb();
    });

  }

  getAllUsersRecords((err) => {
    if (err) {
      console.error(err);
    }
    console.log("Done");
  });
} else {
  console.log("Directory" + backupDir + " doesn't exists.");
  process.exit(1);
}

