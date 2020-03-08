# My Child (Front-End)

Welcome to My Child! This is the front-end for the My Child application. My Child allows you to share your child's updates, milestones, photos and videos with friends and loved ones of your choosing. 

## Getting Started

These instructions will get you a copy of the project up and running on your local machine.

### Prerequisites

In order to run this application, you must have the following: 
  1. A PostGres server running on port 5434
 
### Set Up

Runs the app in the development mode.<br />
Before you begin the following steps, please clone this repository along with [ChildApp-Backend](https://github.com/Janaehall/ChildApp-Backend)
  1. Navigate to ChildApp-backend and run the following commands to create the required databases and run the necessary migrations:
  ```
    rails db:create
    rails db:migrate
  ```
  2. Once all of the migrations are complete, enter ```rails s``` to run a rails server on port 3000

  3. Return to the main directory, then navigate to childapp-frontend and run ```npm start```
  4. Open your browser of choice (This application was built in and optimized for Google Chrome) and navigate to      http://localhost:3001/login to begin using the application.

