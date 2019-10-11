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
    //read file && parse json && store object in database && read file async && save into contents
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
  async read(key, val) {
    // go through this.database array
    // if the object at this.database[indx] has a key
    // val pair that matches the parameter val
    // return that object
    let found = {};
    // this is optional, but recommended
    // in case you forgot to load, made some
    // change and didn't update this.database, etc
    await this.load();
    this.database.forEach(item => {
      if (item[key] === val) found = item;
    });
    return found;
  }

  // CRUD: update
  async update(original, updates) {
    // console.log('id in model: ', id);

    let data = await this.load();
    // console.log('model updates', Object.keys(updates));
    // console.log('model id', ids);
    console.log('updatesin model', updates);

    let keys = Object.keys(updates);
    let newDatabase = data.map(mapstuff=>{
      if(mapstuff.id === original.id){
        keys.forEach(key=>{
          // if(key === 'team'){
            
            
            
          // }
          
          this.read(key, original[key]);
    
    
          // console.log('items in model for id', stuff[key]);
          // console.log('items in model for updates', updates[key]);
          mapstuff[key]= updates[key];
        });

      }
      // console.log(mapstuff);
      return mapstuff;
    });
    
    

    
    await writeFile(this.file, JSON.stringify(newDatabase));
    // console.log(this.database);
    // console.log('model outcome',ids);
    // console.log('files', newDatabase);


  
    // console.log('thing to update', thingToUpdate);
    // await 
    // console.log(
    //   Object.keys(updates));



    // let isValid = this.sanitize(item);

    
   
 






  }

  // CRUD: delete
  async delete(id) {}

  // Validation
  sanitize(item) {
    //check against schema
    return true; //only for demo!!!!
  }
}

module.exports = Model;
