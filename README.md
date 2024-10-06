# Shopify Customer Management App

This is a **Shopify Customer Management** application built with **React** and **Polaris**, along with **Shopify's GraphQL API** for creating, reading, updating, and searching customer data.

## Features

- **Create** customers with custom metafields.
- **Read** and display customers in a searchable list.
- **Update** customer information (such as first name, last name, email, and metafields).
- **Search** customers dynamically by first name using Shopify’s GraphQL API.

## Tech Stack

- **React**: Frontend JavaScript library
- **Shopify Polaris**: UI components from Shopify
- **Shopify Admin API (GraphQL)**: Customer data management
- **Axios**: For making HTTP requests to the Shopify API
- **Context API**: For state management

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js (version 14 or higher)
- NPM or Yarn
- A Shopify store and an **Admin API Access Token**

### Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/shopify-customer-management.git
   cd shopify-customer-management

   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

### Configure environment variables:

Create a .env file at the root of your project and add the following variables:

SHOPIFY_DOMAIN=<your-shopify-store.myshopify.com>
SHOPIFY_ACCESS_TOKEN=<your-shopify-access-token>

**Start the development server:**

npm start

# or

yarn start
