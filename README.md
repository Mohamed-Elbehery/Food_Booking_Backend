# Food Restaurant API

Welcome to the Food Restaurant API! This API is designed to manage restaurant operations, including handling menus, orders, user authentication, and more. Built with Node.js, Express.js, and TypeScript, this API leverages several technologies and libraries to ensure robustness and scalability.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Environment Variables](#environment-variables)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- User authentication and authorization using JWT
- Menu management (CRUD operations for dishes)
- Order processing
- Image upload with Cloudinary
- API documentation with Swagger
- Type safety with TypeScript

## Technologies Used

- Node.js
- Express.js
- TypeScript
- Swagger (API Documentation)
- OpenAI (Integration for advanced features)
- Cloudinary (Image Uploads)
- JWT (JSON Web Token for authentication)
- MongoDB (Database)
- Mongoose (ODM for MongoDB)
- Rimraf (Cross-platform file and folder removal)
- Concurrently (Running concurrent scripts during development and build phases)

## Getting Started

### Prerequisites

- Node.js (>=14.x)
- npm or yarn
- MongoDB (Local or Atlas)

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/Mohamed-Elbehery/Food_Booking_Backend.git
    cd Food_Booking_Backend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

    or

    ```bash
    yarn install
    ```

### Running the Application

1. Set up environment variables (see [Environment Variables](#environment-variables) for details).

2. Start the development server:
    ```bash
    npm run dev
    ```

    or

    ```bash
    yarn dev
    ```

3. For production build and start:
    ```bash
    npm run build
    npm start
    ```

    or

    ```bash
    yarn build
    yarn start
    ```

## API Documentation

The API documentation is available through Swagger. Once the server is running, navigate to:
```
http://localhost:3000/api-docs
```

## Environment Variables

Create a `.env` file in the root directory and add the following variables:

```
PORT=3000
DB_URI=your_mongodb_connection_string
JWT_SECRET_KEY=your_jwt_secret
CLOUDINARY_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

## Folder Structure

```
.
├── src
│   ├── index.ts
├── controllers
│   ├── auth.controllers.ts
│   ├── booking.controllers.ts
│   ├── menu.controllers.ts
├── models
│   ├── auth.model.ts
│   ├── booking.model.ts
│   ├── menu.model.ts
├── routes
│   ├── auth.routes.ts
│   ├── booking.routes.ts
│   ├── menu.routes.ts
├── utils
│   ├── cloudinary.ts
│   ├── swagger.ts
│   ├── validateToken.ts
├── lib
│   ├── createToken.ts
│   ├── db.ts
├── .env
├── .gitignore
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -am 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Happy coding!
