# OnlineStore

**OnlineStore** is a full-stack web application designed to simulate an e-commerce platform. It allows users to browse products, manage their shopping cart, and complete purchases online. The application also includes administrative features for managing the store's inventory, orders, and user accounts.

## Features

- **Product Catalog**: Browse products organized by categories with search and filter options.
- **Shopping Cart**: Add, remove, and update quantities of products in the cart.
- **User Accounts**: Register, log in, and manage personal information and order history.
- **Admin Panel**: Manage products, categories, orders, and user accounts.

## Technologies Used

This project is built using the following technologies:

- **Frontend**: React.js, JavaScript
- **Backend**: Node.js with Express
- **Database**: MongoDB

## Installation

To set up the project locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Anthony-D11/OnlineStore.git
   ```

2. **Navigate to the project directory**:
   ```bash
   cd OnlineStore
   ```

3. **Install dependencies**:
   - Install dependencies for the server 
     ```bash
     cd server
     npm install
     ```
   - Install dependencies for the client 
     ```bash
     cd client
     npm install
     ```

5. **Set up environment variables**:
   - Add the required environment variables:
     ```env
     MONGODB_USERNAME=your_mongodb_database_username
     MONGODB_PASSWORD=your_mongodb_database_password
     ```

6. **Run the application**:
   - Run the server in advance
     ```bash
     cd server
     npm start
     ```
   - Run the client
     ```bash
     cd client
     npm start
     ```
