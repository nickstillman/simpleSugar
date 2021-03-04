/* eslint no-unused-vars: 0 */
const path = require('path');
const express = require('express');
// const db = require('./db/markets');

const app = express();
// const port = process.env.PORT || 3000;
const port = 3000;


app.use('/build', express.static(path.join(__dirname, '../../build')));
app.use(express.json());

app.get('/', (req, res) => {
console.log('HIT THAT ROOT')
  return res.status(200).sendFile(path.join(__dirname, '../client/index.html'));

})

// app.put('/markets', (req, res, next) => {
//   const syncResult = db.sync(req.body);
//   if (syncResult instanceof Error) {
//     return next({ code: 400, error: syncResult });
//   }
//   res.json(syncResult);
// });

// app.get('/markets', (req, res) => {
//   res.json(db.find());
// });

// app.use(({ code, error }, req, res, next) => {
//   res.status(code).json({ error });
// });

module.exports = app.listen(port, () => console.log(`Listening on port ${port}`));
