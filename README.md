# Foodie
Foodie is an web based application that allows the users to peruse various foods supplied by the Edamam Recipe Search API, which contains hundreds of thousands of recipes that can be accessed and filtered for select health avoidances or meal types through GET requests using AJAX calls. The application then stores the recipes sent by Edamam that can then allow them to access an inbox where they can type in the recipes they were interested in and use the autocomplete search bar to find certain recipes that they saved. We used the Google Firebase Console to store user information.  

Below is the link to our web app-
## https://foodie-8bb79.web.app/

## API Documentation 
This section describes the endpoints used (via ajax and firebase realtime database).

### Retrieve Recipe 
**Purpose:** Gets details about a specific recipe <br><br>
**Endpoint:** GET https://api.edamam.com/search?q=:letter&app_id=adbcf639&app_key=0cd1cb104aac62dfc529549fb2f16bf2<br>
	Note: The function "randomLetter()" generates a random letter from alphabet to put in ":letter"<br><br>
	*If users click on any **filters** then use the following:* <br>
	GET https://api.edamam.com/search?q=:letter&app_id=adbcf639&app_key=0cd1cb104aac62dfc529549fb2f16bf2&:category=:type<br>
	Note: Replace ":category" with the name of the category in which the user selects, and ":type" with the specific filters selected<br><br>
**Response:** Responds with details about recipe's field data in JSON format 

### Save Recipe 
**Purpose:** Saves liked recipe to user's recipe inbox <br><br>
**Endpoint:** UPDATE() https://foodie-8bb79.firebaseio.com/users/recipe/:recipe_object<br>
	Note: ":recipe_object" is created and added to array of recipes<br><br>
**Response:** If save is successful, responds with empty response body

### Remove Recipe
**Purpose:** Removes recipe from user's recipe inbox<br><br>
**Endpoint:** UPDATE() https://foodie-8bb79.firebaseio.com/users/recipe/:recipe_object<br>
	Note: ":recipe_object" refers to the recipe that the user clicks on<br><br>
**Response:** If removal is successful, responds with empty response body 

### Delete User 
**Purpose:** Deletes users account<br><br>
**Endpoint:** DELETE() https://foodie-8bb79.firebaseio.com/users/:email<br>
	Note: ":email" refers to user's email address used to sign up initially<br><br>
**Response:** If deletion is successful, responds with empty response body 

### Update Account Info
**Purpose:** Updates user's information if user changes first name, last name, and/or password<br><br>
**Endpoint:** UPDATE() https://foodie-8bb79.firebaseio.com/users/:field<br>
	Note: ":field" refers to first_name, last_name, password<br><br>
**Request Params:** first_name (string), last_name (string), password (string)<br><br>
**Response:** If updates are successful, responds with empty response body 

### Create Account
**Purpose:** Creates user account given the information inputted<br><br>
**Endpoint:** SET() https://foodie-8bb79.firebaseio.com/users/:id<br>
	Note: ":id" refers to unique user id<br><br>
**Request Params:** first_name (string), last_name (string), email (string), password (string)<br><br>
**Response:** If account creation successful, responds with empty response body 

## Authentication 
In order to use the application, users must be logged into their account
Use *authg.onAuthStateChanged()* to authenticate user 
