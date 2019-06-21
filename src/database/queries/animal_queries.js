const dbConnect = require('../db_connect');

const displayAnimals = (cb) => {
  dbConnect.query(`SELECT animal_name FROM animals;`, (e, res) => {
    // humm...
    if (e) return cb(e);
    console.log('This is the res.rows', res.rows);
    return cb(null, res.rows);
  });
};

const fetchSingleAnimal = (animal_name, cb) => {
  // humm...
  dbConnect.query(`SELECT * FROM animals WHERE animal_name = ($1)`, [animal_name], (e, res) => {
    if (e) return cb(e);
    console.log('This is the res.rows', res.rows);
    return cb(null, res.rows);
  });
};

const insertAnimal = (data, cb) => {
    dbConnect.query(`INSERT INTO animals(animal_name, img_link, habitat, origin, facts, myths) VALUES($1, $2, $3, $4, $5, $6)`,
  [data], (e, res) => {
    // hum...
    if (e) return cb(e);
    // return success;
    console.log('animal been added to animals table');
    cb(null, true);
  });
};

module.exports = {
  displayAnimals,
  fetchSingleAnimal,
  insertAnimal
}
