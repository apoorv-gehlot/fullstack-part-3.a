# Exercises 3.1.-3.6.

## 3.1: Phonebook backend step1
Implement a Node application that returns a hardcoded list of phonebook entries from the address http://localhost:3001/api/persons.

## 3.2: Phonebook backend step2
Implement a page at the address http://localhost:3001/info

## 3.3: Phonebook backend step3
Implement the functionality for displaying the information for a single phonebook entry. The url for getting the data for a person with the id 5 should be http://localhost:3001/api/persons/5

If an entry for the given id is not found, the server has to respond with the appropriate status code.

## 3.4: Phonebook backend step4
Implement functionality that makes it possible to delete a single phonebook entry by making an HTTP DELETE request to the unique URL of that phonebook entry.

## 3.5: Phonebook backend step5
Expand the backend so that new phonebook entries can be added by making HTTP POST requests to the address http://localhost:3001/api/persons.

Generate a new id for the phonebook entry with the Math.random function. Use a big enough range for your random values so that the likelihood of creating duplicate ids is small.

## 3.6: Phonebook backend step6
Implement error handling for creating new entries. The request is not allowed to succeed, if:

The name or number is missing
The name already exists in the phonebook
Respond to requests like these with the appropriate status code, and also send back information that explains the reason for the error

# Exercises 3.7.-3.8.

## 3.7: Phonebook backend step7
Add the morgan middleware to your application for logging. Configure it to log messages to your console based on the tiny configuration.

## 3.8*: Phonebook backend step8
Configure morgan so that it also shows the data sent in HTTP POST requests

# Exercises 3.9.-3.11.

## 3.9 phonebook backend step9
Make the backend work with the frontend from the previous part.
Added Cross Origin Resource Sharing (CORS) middleware in backend.

## 3.10 phonebook backend step10
Deploy the backend to the internet, for example to Heroku.

## 3.11 phonebook full stack
Generate a production build of your frontend, and add it to the internet application using the method introduced in this part.

## 3.12: Command-line database
Create a cloud-based MongoDB database for the phonebook application with MongoDB Atlas.
Create a mongo.js file in the project directory, that can be used for adding entries to the phonebook, and for listing all of the existing entries in the phonebook.

# Exercises 3.13.-3.14.
The following exercises are pretty straightforward, but if your frontend stops working with the backend, then finding and fixing the bugs can be quite interesting.

## 3.13: Phonebook database, step1
Change the fetching of all phonebook entries so that the data is fetched from the database.

Verify that the frontend works after the changes have been made.

In the following exercises, write all Mongoose-specific code into its own module, just like we did in the chapter Database configuration into its own module.

## 3.14: Phonebook database, step2
Change the backend so that new numbers are saved to the database. Verify that your frontend still works after the changes.

At this point, you can choose to simply allow users to create all phonebook entries. At this stage, the phonebook can have multiple entries for a person with the same name.