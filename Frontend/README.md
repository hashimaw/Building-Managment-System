# Building Management System

Welcome to the Building Management System! This project uses **React**, **Vite**, **Tailwind CSS**, and **MariaDB** to provide a seamless and efficient way to manage building operations.

## Introduction

The Building Management System is designed to help property managers, facility managers, and building owners streamline their operations. From tenant management to maintenance tracking, this system offers a comprehensive solution to manage buildings effectively.

## Features

- **Tenant Management**: Easily add, update, and remove tenant information.
- **Maintenance Tracking**: Log and monitor maintenance requests and their status.
- **Billing & Invoicing**: Generate and send invoices to tenants.
- **Reports & Analytics**: View detailed reports on building performance and operations.
- **User Authentication**: Secure login and registration for users.

## Installation

### Prerequisites

- Node.js
- Git
- MariaDB / HeidiSQL

### Steps

1. **Clone the repository**:

    ```bash
    git clone [https://github.com/yourusername/building-management-system.git](https://github.com/hashimaw/Building-Managment-System)
    ```

2. **Navigate to the project directory**:

    ```bash
    cd building-management-system
    ```

3. **Install dependencies**:

    ```bash
    npm install
    ```



4. **Run the development server**:

    ```bash
    npm run dev
    ```
    
5. **Install HeidiSQL**.

6. **Run and install the backend server**:
    - Navigate to the backend directory:

        ```bash
        cd backend
        ```

    - Run the `propertymanagement.sql` file found in the backend folder in HeidiSQL.

7. **Create a `.env` file in the root directory** and add your database credentials:

    ```plaintext
    DB_HOST=your_database_host
    DB_USER=your_database_user
    DB_PASSWORD=your_database_password
    DB_NAME=your_database_name
    DB_PORT=your_database_port
    ```

8. **Install backend dependencies**:

    ```bash
    npm install
    ```

9. **Start the backend server**:

    ```bash
    nodemon server
    ```

10. **Open your browser** and navigate to `http://localhost:4000`.

## Usage

Once the project is set up and running, you can manage your building operations through the intuitive user interface.

## Technologies Used

- **React**: Front-end library for building user interfaces.
- **Vite**: Next-generation front-end tooling for rapid development.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **MariaDB**: Open-source relational database management system.

## Contributing

Contributions are welcome! If you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a Pull Request.
