require('dotenv').config();
require('mongodb');

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const Schema = mongoose.Schema;

const personSchema = new Schema({
  name: {type: String, required: true},
  age: {type: Number, required: true },
  favoriteFoods: [{type: String}]
});

const Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
  
  let stevanFreeborn = new Person({
    name: 'Stevan Freeborn',
    age: 29,
    favoriteFoods: ['thai', 'steak', 'rice']
  });

  stevanFreeborn.save((err, person) => {
    if(err) return console.error(err);
    done(null, person)
  });

};

const arrayOfPeople = [
  {name: 'Stevan Freeborn', age: 29, favoriteFoods: ['Thai', 'Beef Jerky']},
  {name: 'Kal Freeborn', age: 6, favoriteFoods: ['Hamburgers', 'Ice Cream']},
  {name: 'Kyler Freeborn', age: 4, favoriteFoods: ['Popcorn', 'Chocolate Milk']}
];

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, people) => {
    if(err) return console.error(err);
    done(null, people);
  })
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, (err, personFound) => {
    if(err) return console.error(err);
    done(null, personFound);
  })
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, (err, personFound) => {
    if(err) return console.error(err);
    done(null, personFound);
  })
};

const findPersonById = (personId, done) => {
  Person.findById(personId, (err, personFound) => {
    if(err) return console.error(err);
    done(null, personFound);
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, (err, personFound) => {
    if(err) return console.error(err);

    personFound.favoriteFoods.push(foodToAdd);

    personFound.save((err, updatedPerson) => {
      if(err) return console.error(err);
      done(null, updatedPerson);
    });
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (err, updatedPerson) => {
    if(err) return console.error(err);
    done(null, updatedPerson);
  });
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, removedPerson) => {
    if(err) return console.error(err);
    done(null, removedPerson);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;