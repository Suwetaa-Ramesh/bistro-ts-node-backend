cat <<EOF > README.md

# Bistro TS Node Backend 🍽️

Welcome to the Bistro TS Node Backend! This TypeScript-based API is designed for managing bistros and employees, providing robust functionality for CRUD operations and automatic employee ID incrementation. The backend is built with Node.js, Express, and MongoDB, and integrates seamlessly with the \`bistro-ts-react-app\` front-end application.

## 🚀 Features

- **Bistro Management**: Full CRUD capabilities for bistros.
- **Employee Management**: Full CRUD capabilities for employees.
- **Automatic Counters**: Automatically increments employee IDs.
- **Data Seeding**: Initializes the database with sample data.

## 🛠️ Getting Started

### Prerequisites

- Node.js (>= 14.x)
- MongoDB

### Installation

1. **Clone the Repository**

   ```bash
   git clone <repository-url>
   cd bistro-ts-node-backend
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Set Up Environment Variables**

   Create a `.env` file in the root directory and add:

   ```env
   MONGODB_URI=<your-mongodb-uri>
   ```

4. **Start the Server**

   ```bash
   npm start
   ```

   The server will be running at [http://localhost:3001](http://localhost:3001).

## 🛠️ API Endpoints

### 🍽️ Bistros

- `GET /bistros` - Retrieves all bistros
- `POST /bistros` - Create a new bistro
- `GET /bistros/:id` - Retrieve a single bistro by ID
- `PUT /bistros/:id` - Update a bistro by ID
- `DELETE /bistros/:id` - Delete a bistro by ID

### 🧑‍💼 Employees

- `GET /employees` - Retrieves all employees
- `POST /employees` - Create a new employee
- `GET /employees/:id` - Retrieves a single employee by ID
- `PUT /employees/:id` - Update an employee by ID
- `DELETE /employees/:id` - Delete an employee by ID

## 🌱 Data Seeding

To seed the database with initial data, run:

```bash
npm run seed
```

## 💻 Frontend

The front-end application for this backend is located in the \`bistro-ts-react-app\` directory. Follow the setup instructions in that repository to get the UI running and connected to this API.
