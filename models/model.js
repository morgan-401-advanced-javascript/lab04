'use strict';

const fs = require('fs');
const util = require('util');
const uuid = require('uuid/v4');
// const validator = require('../lib/validator.js');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

class Model {
  constructor(schema, file) {
    this.schema = schema;
    this.file = file;
    this.database = [];
  }

  // Initialize the database
  async load() {
    //read file
    // pase json
    //store object in database

    //read file async & save into contents
    let contents = await readFile(this.file);

    //.then
    this.database = JSON.parse(contents.toString().trim());
    return this.database;

  }

  // CRUD: create
  async create(item) {
    let isValid = this.sanitize(item);
    let record = {id: uuid(),...item};
    if (isValid){
      // adds to database obj
      this.database.push(record);
      //write to file
      await writeFile(this.file, JSON.stringify(this.database));

      return item;

    }
    return 'invalid schema';
  }

  // CRUD: read
  async read(key, val) {}

  // CRUD: update
  async update(id, item) {}

  // CRUD: delete
  async delete(id) {}

  // Validation
  sanitize(item) {
    //check against schema
    return true; //only for demo!!!!
  }
}

module.exports = Model;
