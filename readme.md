## Server API

### Get all reviews for a specific property listing
  * GET `/api/reviews`

**Success Status Code:** `200`

**Returns:** JSON

```json
    {
      "propertyId": "Number",
      "propertyName": "String",
      "propertyOwner": "String",
      "rating": "Number",
      "numOfReviews": "Number",
      "reviews": [{
        "reviewId": "Number",
        "userName": "String",
        "profileImg": "String",
        "reviewDate": "Date",
        "reviewContent": "String",
        "response": {
          "propertyOwnerImg": "String",
          "resDate": "Date",
          "resContent": "String"
        }
      }]
    }
```

### Post a review
  * POST `/api/reviews`

**Success Status Code:** `201`

**Request Body**: Expects JSON with the following keys.

```json
    {
      "propertyId": "String",
      "userId": "String",
      "reviewId": "Number",
      "reviewDate": "month year",
      "reviewContent": "String",
    }
```

### Update a review comment
  * PUT `/api/reviews`

**Success Status Code:** `204`

**Request Body**: Expects JSON with any of the following keys

```json
    {
      "reviewId": "Number",
      "reviewContent": "String"
    }
```

### Delete a review comment
  * POST `/api/review`

**Request Body**: Expects JSON with the following keys.

```json
    {
      "reviewId": "Number",
    }
```

**Success Status Code:** `204`

```