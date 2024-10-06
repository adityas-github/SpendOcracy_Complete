# SpendOcracy

## Description
SpendOcracy is a web application that allows users to track their spending habits and view their spending data in a variety of ways. Users can input their spending data and view their spending data in a variety of ways, including by category, by month, and by year. Users can also view their spending data in a variety of visualizations, including pie charts, bar charts, and line charts. SpendOcracy is a full-stack web application that uses a MongoDB database, a Express server, and a React front end.

## User Stories
- As a user, I want to be able to input my spending data so that I can track my spending habits.
- As a user, I want to be able to view my spending data by category so that I can see how much I am spending in each category.
- As a user, I want to be able to view my spending data by month so that I can see how much I am spending each month.
- As a user, I want to be able to view my spending data by year so that I can see how much I am spending each year.
- As a user, I want to be able to view my spending data in a pie chart so that I can see how much I am spending in each category.
- As a user, I want to be able to view my spending data in a bar chart so that I can see how much I am spending each month.

## Database Schema
The SpendOcracy database has two tables: the `categories` table and the `spending` table. The `categories` table has two columns: `id` and `name`. The `id` column is the primary key for the table, and the `name` column is the name of the category. The `spending` table has four columns: `id`, `category_id`, `amount`, and `date`. The `id` column is the primary key for the table, the `category_id` column is a foreign key that references the `id` column of the `categories` table, the `amount` column is the amount of money spent, and the `date` column is the date the money was spent.

## API Endpoints
- `GET /categories`: Get all categories
- `POST /categories`: Create a new category
- `GET /categories/:id`: Get a category by id
- `PUT /categories/:id`: Update a category by id
- `DELETE /categories/:id`: Delete a category by id
- `GET /spending`: Get all spending data
- `POST /spending`: Create a new spending entry
- `GET /spending/:id`: Get a spending entry by id
- `PUT /spending/:id`: Update a spending entry by id
- `DELETE /spending/:id`: Delete a spending entry by id

    
## Technologies Used
- React
- Express
- MongoDB
- Mongoose
- Chart.js


## Installation Instructions
1. Clone the repository
2. Install the dependencies
3. Start the server
4. Start the client
5. Open the application in your browser


