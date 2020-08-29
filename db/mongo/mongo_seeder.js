// references
const fs = require('fs');
const faker = require('faker');
const mongoose = require('mongoose');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

// create db connection
  // // below is to establishe DB:
  // const dbroom = mongoose.connection;
  // mongoose.connect('mongodb://localhost/property', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
  // // below is to verify whether it is connected to DB:
  // dbroom.on('error', console.error.bind(console, 'connection error:'));
  // dbroom.once('open', function() {
  //   console.log(`Connected to Room DB`)
  // });

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

const seedUserData = (num) => {
  var userArray = [];
  for (var i = 0; i < num; i++) {
    var user = {
      userId: zeroPadUP(i),
      userName: faker.name.firstName(),
      profileImg: faker.image.imageUrl(),
      reviewIds: []
    }
    userArray.push(user);
  }
  return userArray;
}

var userArray = seedUserData(2);

const seedPropertyData = (num) => {
  // const Property = mongoose.model('Property', propertySchema);
  // const User = mongoose.model('User', userSchema);
  var propertyArray = [];
  for (var i = 0; i < num; i++) {
    var reviewsArray = [];
    var numOfReviews = rdm(1, 3)
    for (var j = 0; j < numOfReviews; j++) {
      var review = {
        reviewId: zeroPadR(j + i * 50),
        userId: zeroPadUP(rdm(0, num)),
        reviewDate: faker.date.past(),
        reviewComment: faker.lorem.sentences()
      };
      reviewsArray.push(review);
      for (var k = 0; k < num; k++) {
        if (userArray[k].userId === review.userId) {
          userArray[k].reviewIds.push(review.reviewId)
        }
      }
    };
    var property = {
      propertyId: zeroPadUP(i),
      propertyName: faker.address.streetAddress(),
      propertyOwner: faker.name.firstName(),
      propertyOwnerImg: faker.image.imageUrl(),
      rating: ((Math.random() * 5) + 3).toFixed(2),
      numOfReviews: numOfReviews,
      reviews: reviewsArray
    };
    propertyArray.push(property);
  //   return new Promise((resolve,reject) => {
  //     console.log(property.prepertyName, (err, data) => {
  //       if(err) {
  //         reject(err)
  //       } else {
  //         resolve(data)
  //       }
  //     })
  //   })
  }
  return propertyArray;
}

// below is to seed 2 records
const csvWriterUser = createCsvWriter({
  path: '/Users/berryblu/Desktop/assignment/exercise/sdcapi/db/mongo/mongouserdata.csv',
  header: [
      {id: 'userId', title: 'userId'},
      {id: 'userName', title: 'userName'},
      {id: 'profileImg', title: 'profileImg'},
      {id: 'reviewIds', title: 'reviewIds'},
  ]
});
csvWriterUser.writeRecords(userArray)       // returns a promise
  .then(() => {console.log('success')})
  .catch(() => {console.log('error', err)})

const csvWriterProperty = createCsvWriter({
  path: '/Users/berryblu/Desktop/assignment/exercise/sdcapi/db/mongo/mongopropertydata.csv',
  header: [
      {id: 'propertyId', title: 'propertyId'},
      {id: 'propertyName', title: 'propertyName'},
      {id: 'propertyOwner', title: 'propertyOwner'},
      {id: 'propertyOwnerImg', title: 'propertyOwnerImg'},
      {id: 'rating', title: 'rating'},
      {id: 'numOfReviews', title: 'numOfReviews'},
      {id: 'reviews', title: 'reviews'}
  ]
});
var propertyArray = seedPropertyData(2);
csvWriterProperty.writeRecords(propertyArray)       // returns a promise
  .then(() => {console.log('success')})
  .catch(() => {console.log('error', err)})
// mongoose.disconnect();
// below is to seed 10M records

// write down the speed
