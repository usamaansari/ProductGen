# Dynamic Product Information Generator

This is a **Next.js** project that generates dynamic product information using the **OpenAI API**. The application automates the creation of detailed and structured product data, including specifications, pricing, reviews, and more. It ensures accuracy and reliability through schema validation and provides this functionality via a REST API endpoint.

---

## Features

- **Dynamic Product Data Creation**: Automatically generates rich product details based on a query string.
- **OpenAI API Integration**: Uses OpenAI models to generate product information dynamically.
- **Data Validation**: Validates generated data using **Zod schemas** to ensure correctness and structure.
- **REST API**: Exposes an endpoint to fetch product data for integration into other applications.
- **Error Handling**: Provides detailed error messages when validation fails.

---

## Technologies Used

- **Next.js**: Framework for building server-rendered React applications.
- **OpenAI API**: To generate product-related data dynamically.
- **Zod**: For schema-based validation of the generated data.
- **TypeScript**: Adds type safety to the codebase.

---

## Getting Started

### Prerequisites

- **Node.js** (v14+)
- **npm** or **yarn**
- An OpenAI API key

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/dynamic-product-info-generator.git
   cd dynamic-product-info-generator
   ```
2. Install dependencies

```bash
npm install
# or
yarn install
```

3. Set up environment variables:

Create a .env file in the project root.

```env
OPENAI_API_KEY=your_openai_api_key
```
