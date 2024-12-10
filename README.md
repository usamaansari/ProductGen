# Dynamic Product Information Generator

This is a **Next.js** project that generates dynamic product information using the **OpenAI API**. The application automates the creation of detailed and structured product data, including specifications, pricing, reviews, and more. It ensures accuracy and reliability through schema validation and provides this functionality via a REST API endpoint.

---

## Features

- **Dynamic Product Data Creation**: Automatically generates rich product details based on a query string.
- **OpenAI API Integration**: Uses OpenAI models to generate product information dynamically.
- **Data Validation**: Validates generated data using **Joi schemas** to ensure correctness and structure.
- **REST API**: Exposes an endpoint to fetch product data for integration into other applications.
- **Error Handling**: Provides detailed error messages when validation fails.

---

## Technologies Used

- **Next.js**: Framework for building server-rendered React applications.
- **OpenAI API**: To generate product-related data dynamically.
- **Joi**: For schema-based validation of the generated data.

---

## Getting Started

### Prerequisites

- **Node.js** (v14+)
- **npm** or **yarn**
- An OpenAI API key

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/usamaansari/ProductGen.git
   ```
2. Install dependencies

```bash
npm install
# or
yarn install
```

3. Set up environment variables:

- Create a .env file in the project root.
- Generate OpenAI API key acccording to https://platform.openai.com/docs/quickstart
- Add OPENAI_API_KEY in the .env file

```env
OPENAI_API_KEY=your_openai_api_key
```

4. Start the development server:

```bash
npm run dev
# or
yarn dev
```

The app will be available at http://localhost:3000

## Usage

### API Endpoint

GET /api/getProductInfo

Query Parameters
query (string): The product name or description to generate information for.
Example Request

```bash
GET /api/getProductInfo?query=Apple 16 pro max
```

## Data Validation

This project uses Joi to validate the generated product data against a predefined schema. This ensures:

- Data is structured as expected.
- All required fields (e.g., id, name, description, manufacturer, pricing) are present and - correctly formatted.
- Invalid data is caught early with detailed error messages for debugging.

## Future Enhancements

- Add more robust handling for invalid or incomplete user queries.
- Extend the schema for additional product attributes (e.g., images, customer FAQs).
- Support batch queries for multiple products.
