const fs = require('fs');


const logIndexPath = `${__dirname}/logIndex.json`;

const logIndex = JSON.parse(fs.readFileSync(logIndexPath));

const db = {};

db.insert = ([data, date]) => {
  
  // NEED TO UPDATE LOGINDEX!!!!!
  // if (!db.checkIndex(date)) 
  console.log('data to insert:', data)
console.log('date to insert:', date)
  try {
    const dataToUpdate = db.read(date);
console.log('dataToUpdate:', dataToUpdate)
    dataToUpdate[data.entries.time] = data;
    if (!dataToUpdate.entries.date) {
      dataToUpdate.entries.date = date;
    }
    db.write(dataToUpdate, date);
  }
  catch {
    return new Error('Error writing data')
  }
  return `File ${date} successfully updated`;
};


db.read = (logDate) => {
  if (db.checkIndex(logDate)) {
    const logDatePath = `${__dirname}/${logDate}.json`
    const data = JSON.parse(fs.readFileSync(logDatePath));
    return data;
  }
  return 'Date not found';
}

db.checkIndex = (logDate) => {
  for (const date of logIndex) {
    if (date === logDate) return true;
  }
  return false;
}

db.drop = () => {
  marketList = [];
  db.write(marketList);
};


db.write = (data, date) => {
  // fs.writeFileSync(writeLocation, JSON.stringify(data, null, 2));
  const logPath = `${__dirname}/${date}.json`
  console.log('writing ', data, ' to ', logPath);
  fs.writeFileSync(logPath, JSON.stringify(data));
};


// db.reset = (path) => {
// currentData = JSON.parse(fs.readFileSync(path));
// };


module.exports = db;


