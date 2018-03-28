const request = require('request');
const fs = require('fs');

const usersUrl = "https://app.portadi.com/users"

const backupDir = process.env.PORTADI_DATA_DIR || "data";

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

  getAllUsersRecords = (cb) => {
    request(options, (error, response, body) => {
      if (error) {
        cb(error);
      }
      bodyObject = JSON.parse(body);
      bodyObject.activeUsers.forEach(element => {
        filename = backupDir + "/" + element.id + '-' + element.email.replace(/ /g, "-")
        fs.writeFileSync(filename, JSON.stringify(element, " ", 2));
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

