CREATE TABLE properties(
   property_id INT GENERATED ALWAYS AS IDENTITY,
   property_name VARCHAR(255) NOT NULL,
   property_owner VARCHAR(255) NOT NULL,
   num_of_review INT,
   rating NUMERIC,
   PRIMARY KEY(property_id)
);

-- // One to many relationship
CREATE TABLE users(
   user_id INT GENERATED ALWAYS AS IDENTITY,
   user_name VARCHAR(255) NOT NULL,
   user_profileImg VARCHAR(500),
   PRIMARY KEY(user_id)
);

CREATE TABLE reviews(
   review_id INT GENERATED ALWAYS AS IDENTITY,
   property_id INT REFERENCES rooms (id) NOT NULL,
   user_id INT REFERENCES users (id) NOT NULL,
   review_date Date NOT NULL,
   review_comment VARCHAR(500),
   PRIMARY KEY(review_id)
);

CREATE TABLE responses(
   response_id INT GENERATED ALWAYS AS IDENTITY,
   review_id INT REFERENCES reviews (id) NOT NULL,
   response_date Date NOT NULL,
   response_comment VARCHAR(500),
   PRIMARY KEY(response_id)
);


-- x diagram, visual representation how data interact

-- x query to get all the reivews of a user
-- select * from reviews where reviews.user_id = users.user_id

-- x remove issues

-- wip primary item for 10M records (10M users with 50 reviews on avg)
