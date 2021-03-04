const fs = require('fs');

const db = {};

db.insert = ([data, date]) => {
  
  try {
    const dataToUpdate = db.read(date);
    dataToUpdate.entries = {...dataToUpdate.entries, ...data}
    if (!dataToUpdate.entries.date) {
      dataToUpdate.entries.date = date;
    }
    console.log('dataToUpdate:', dataToUpdate)
    
    db.write(dataToUpdate, date);
    
    // update logIndex
    const logIndexPath = `${__dirname}/logIndex.json`;
    const logIndex = JSON.parse(fs.readFileSync(logIndexPath));
    if (!logIndex.includes(date)) {
      logIndex.push(date);
      db.write(logIndex, logIndexPath);
    }
    
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
  const logIndexPath = `${__dirname}/logIndex.json`;
  
  const logIndex = JSON.parse(fs.readFileSync(logIndexPath));
  
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


