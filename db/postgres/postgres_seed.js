const faker = require('faker');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const bodyParser = require('body-parser');
// const rdm = require('../mongo/mongo_seed.js');
// const zeroPadR = require('../mongo/mongo_seed.js');
// const zeroPadUP = require('../mongo/mongo_seed.js');

// below is to write records into csv file
  // below is a random number generator
  const rdm = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  };
  // below is to add 0 before review id till the review id reaches 7 digits
  const zeroPadR = (num) => {
    return num.toString().padStart(7, "0");
  };
  // below is to add 0 before id till the id reaches 6 digits
  const zeroPadUP = (num) => {
    return num.toString().padStart(6, "0");
  };


const seedPropertyData = (num) => {
  // const Property = mongoose.model('Property', propertySchema);
  // const User = mongoose.model('User', userSchema);
  var propertyArray = [];
  for (var i = 0; i < num; i++) {
    var numOfReviews = rdm(1, 3)
    var property = {
      propertyId: zeroPadUP(i),
      propertyName: faker.address.streetAddress(),
      propertyOwner: faker.name.firstName(),
      numOfReviews: numOfReviews,
      rating: ((Math.random() * 5) + 3).toFixed(2),
    };
    propertyArray.push(property);
  }
  return propertyArray;
}

const seedUserData = (num) => {
  var userArray = [];
  for (var i = 0; i < num; i++) {
    var user = {
      userId: zeroPadUP(i),
      userName: faker.name.firstName(),
      profileImg: faker.image.imageUrl(),
    }
    userArray.push(user);
  }
  return userArray;
}

const seedReviewData = (num) => {
  var reviewArray = [];
  for (var i = 0; i < num; i++) {
    var review = {
      reviewId: zeroPadR(i),
      propertyId: zeroPadUP(rdm(0, 10)),
      userId: zeroPadUP(rdm(0, 10)),
      reviewDate: faker.date.past(),
      reviewComment: faker.lorem.sentences()
    }
    reviewArray.push(review);
    console.log(review)
  }
  return reviewArray;
}

// below is to seed 2 records

var propertyArray = seedPropertyData(2);
var userArray = seedUserData(2);
var reviewArray = seedReviewData(2);

const csvWriterProperty = createCsvWriter({
  path: '/Users/berryblu/Desktop/assignment/exercise/sdcapi/db/postgres/postgrespropertydata.csv',
  header: [
      {id: 'propertyId', title: 'propertyId'},
      {id: 'propertyName', title: 'propertyName'},
      {id: 'propertyOwner', title: 'propertyOwner'},
      {id: 'rating', title: 'rating'},
      {id: 'numOfReviews', title: 'numOfReviews'},
  ]
});
csvWriterProperty.writeRecords(propertyArray)       // returns a promise
  .then(() => {console.log('success')})
  .catch(() => {console.log('error', err)})

const csvWriterUser = createCsvWriter({
  path: '/Users/berryblu/Desktop/assignment/exercise/sdcapi/db/postgres/postgresuserdata.csv',
  header: [
      {id: 'userId', title: 'userId'},
      {id: 'userName', title: 'userName'},
      {id: 'profileImg', title: 'profileImg'},
  ]
});
csvWriterUser.writeRecords(userArray)       // returns a promise
  .then(() => {console.log('success')})
  .catch(() => {console.log('error', err)})

const csvWriterReview = createCsvWriter({
  path: '/Users/berryblu/Desktop/assignment/exercise/sdcapi/db/postgres/postgresreviewdata.csv',
  header: [
      {id: 'reviewId', title: 'reviewId'},
      {id: 'propertyId', title: 'propertyId'},
      {id: 'userId', title: 'userId'},
      {id: 'reviewDate', title: 'reviewDate'},
      {id: 'reviewComment', title: 'reviewComment'},
  ]
});
csvWriterReview.writeRecords(reviewArray)       // returns a promise
  .then(() => {console.log('success')})
  .catch(() => {console.log('error', err)})

// below is to seed 10M records

// write down the speed