// This is to define the property schema
let propertySchema = new mongoose.Schema({
  propertyId: Number,
  propertyName: String,
  propertyOwner: String,
  propertyOwnerImg: String,
  rating: Number,
  numOfReviews: Number,
  reviews: [{
    reviewId: Number,
    userId: Number,
    reviewDate: Date,
    reviewComment: String,
    response: {
      resDate: Date,
      resComment: String
    }
  }]
});

// This is to define the user schema
let userSchema = new mongoose.Schema({
  userId: Number,
  userName: String,
  profileImg: String,
  reviewIds: []
});

