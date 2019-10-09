'use strict';

const Teams = require('./models/teams.js');
const People = require('./models/people.js');
const uuidValidate = require('uuid-validate');

let people = new People(process.argv.slice(2)[0]);
let teams = new Teams(process.argv.slice(3)[0]);

async function loadData() {
  let peopleData = await people.load();
  let teamData = await teams.load();
  console.log('peeps in index', peopleData);
  console.log('teams in indes', teamData);
}

async function createPerson(person) {
  //chk if team exists
  //if not create new
  //set new persons team = to new
  //create team id
  let team = findTeam(person.team);




  people.create(person);


}
async function findTeam(value){
    //value can be id or string
    let results = {};
    if(validator.isString(value)){
        results = teams.read('name', value);
    } if (validator. ) {
        
    } else {
        return 'invalid team type';
    }
}
async function readPerson() {}

async function updatePerson() {}

async function deletePerson() {}

async function printTeams() {}

async function runOperations() {}

runOperations();

loadData().then(()=>{
  createPerson({
    firstName: 'Sarah',
    lastName: 'Small',
    team: 'yellow rhino',
  });

});
