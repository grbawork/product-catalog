# Product Catalog

A Single Page Application (SPA) built with React for browsing a product catalog with filtering, sorting, and pagination.

## Features

- **Product Grid**: Displays products with image, name, price, buttons and a truncated description.
- **Filtering**: Filter products by category and price range.
- **Sorting**: Sort products by:
  - Price (ascending and descending)
  - Name (alphabetical order)
- **Search**: Search for products by name.
- **Pagination**: Display products with 20 items per page.
- **Cart**:
  - Add products to the cart.
  - Persist cart items using local storage.
  - Differentiate between guest and logged-in users.
- **Authentication**:
  - User login with JWT token management.
  - Redirect users to their profile after login.

## Tech Stack

- **Frontend**: React
- **Styling**: SCSS
- **State Management**: React hooks (`useState`, `useEffect`)
- **API**: DummyJSON (mock API for products, categories, users, and authentication)
- **Local Storage**: Used to manage cart data for guest users.

## Project Structure

src/
├── components/
│   ├── Cart.js
│   ├── Modal.js
│   ├── Navbar.js
│   ├── Pagination.js
│   ├── ProductCard.js
│   └── SearchBar.js
├── hooks/
│   └── usePagination.js
├── pages/
│   ├── CartPage.js
│   ├── Home.js
│   ├── Login.js
│   ├── UserPage.js
│   └── Users.js
├── services/
│   └── api.js
├── styles/
│   └── main.scss
├── utils/
│   └── localStorage.js
├── App.js
├── App.test.js
├── index.css
├── index.js
├── reportWebVitals.js
└── setupTests.js

## Installation

1. Clone the repository:
    git clone https://github.com/grbawork/product-catalog

2. Navigate to the project directory:
    cd product-catalog

3. Install dependencies:
    npm install

4. Start the development server:
    npm start

## Deployment

1. Build the project for production:
    npm run build

## Contributing

    Feel free to fork this repository and submit pull requests for improvements.
