const db = require('./config/db');
const app = require('./appServer');

const PORT = process.env.PORT || 3000;

db.authenticate()
  .then(() => {
    console.log('Database connected.');
    return db.sync();
  })
  .then(() => {
    console.log('Database synchronized.');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('Unable to connect to DB:', err);
  });
