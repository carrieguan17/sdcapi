## Server API

### Get all reviews for a specific room listing
  * GET `/api/reviews`

**Success Status Code:** `200`

**Returns:** JSON

```json
    {
      "reviewId": "Number",
      "roomName": "String",
      "userName": "String",
      "profileImg": "String url",
      "reviewDate": "month year",
      "reviewComment": "String",
      "response": {
        "userName": "String",
        "resDate": "month year",
        "resComment": "String"
      }
    }
```

### Report an issue with a user
  * POST `/api/report`

**Success Status Code:** `201`

**Request Body**: Expects JSON with the following keys.

```json
    {
      "userName": "String",
      "issueId": "Issue number"
    }
```

### Update a review comment
  * PATCH `/api/reviews`

**Success Status Code:** `204`

**Request Body**: Expects JSON with any of the following keys

```json
    {
      "reviewId": "Number",
      "reviewComment": "String"
    }
```

### Delete a review comment
  * DELETE `/api/reviews`

**Request Body**: Expects JSON with the following keys.

```json
    {
      "reviewId": "Number",
      "reviewComment": "String"
    }
```

**Success Status Code:** `204`

```