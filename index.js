'use strict';

const Teams = require('./models/teams.js');
const People = require('./models/people.js');
const uuidValidate = require('uuid-validate');
const Validator = require('./validator.js');

let people = new People(process.argv.slice(2)[0]);
let teams = new Teams(process.argv.slice(3)[0]);

async function loadData(value) {
  let peopleData = await people.load(value);
  let teamData = await teams.load(value);
  // console.log('peeps in index', peopleData);
  // console.log('teams in index', teamData);
}

async function createPerson(person) {
  // In order to create a new person && check if their team exists && if not, create a new team && set this new person's team equal to the new && team id created && finaly, create this person
  let team = await findTeam(person.team);
  if (!team.id) {
    // should we first validate that: && person.team exists && person.team is NOT a uuid
    team = await teams.create({ name: person.team });
    // create the team || get that new id || create person
  }
  return await people.create({ ...person, team: team.id });

}
async function findTeam(value){
  //value can be id or string
  let results = {};
  if(Validator.isString(value)){
    results = teams.read('name', value);
  } if (Validator.isUUID(value)) {
    results = await teams.read('id', value);
  } 
  return results;
}

async function findPerson(value) {
  let result = {};
  if (Validator.isString(value)) result = await people.read('firstName', value);
  else if (Validator.isUUID(value)) result = await people.read('id', value);
  return result;
}
async function readPerson(value) {
  let person = await findPerson(value);
  let team = await findTeam(person.team);
  // console.log('readperson function First & Last ', person.firstName + ' ' + person.lastName);
  // console.log('readperson function team:', team.name);
  return person;
}

async function updatePerson(id, newData) {
  // console.log('id in update ', id);
  // let keys = Object.keys(newData);
  // console.log('newdata key', newData[key[0]]);
  let personToUpdate = await readPerson(id);
  let teamStuff = {};
  if(!newData.team){
    teamStuff = await findTeam(id.team);

  }

  if(newData.team){
    // console.log('find team',updateTeam);
    let updateTeam = await findTeam(newData.team);

    if (!updateTeam.id) {
      // should we first validate that: && person.team exists && person.team is NOT a uuid
      updateTeam = await teams.create({ name: newData.team });
      console.log('updateteams index', updateTeam);
      // create the team || get that new id || create person
      teamStuff = updateTeam;
    }
    
  }
  console.log('team?', teamStuff.id);


  // console.log('personToUpdate: ', personToUpdate);
  let updateThePerson = await people.update(personToUpdate, { ...newData, team: teamStuff.id });
  


  // console.log('function updateThePerson: ', updateThePerson);

  return updateThePerson;




}

async function deletePerson() {}

async function printTeams() {}

async function runOperations() {}

runOperations();



// ******************** Test Update Person *************

loadData().then(()=>{
  updatePerson('Morgan', {firstName: 'Morgan',
    team: 'cricket',
  });
});




// ******************** Test Read Person *****************


// loadData().then(()=>{
//   readPerson('Maria');
// });

// ********* Test Create Person *******************
// loadData().then(()=>{
//   createPerson({
//     firstName: 'Sarah',
//     lastName: 'Small',
//     team: 'yellow rhino',
//   });

// });
