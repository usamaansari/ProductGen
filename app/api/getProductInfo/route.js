import { EnrichProductData } from "@/utils/EnrichProductData";
import { ValidateProductData } from "@/utils/ValidateProductData";
import { NextResponse } from "next/server";
import OpenAI from "openai";

// Create an OpenAI object validating with the OPEN_API_KEY
const openai = new OpenAI(process.env.OPENAI_API_KEY);

/*
 * GET /api/getProductInfo
 *
 * This endpoint fetches product information based on the product name provided
 * in the query string. The product name should be passed as a query parameter
 * named `query`. For example:
 *
 * GET /api/getProductInfo?query=Apple 16 Pro Max
 *
 * The server responds with JSON containing product details if the product is found,
 * or an error message if it is not.
 *
 * Query Parameters:
 * - query (string): The name of the product to search for.
 *
 * Response:
 * - 200: JSON object with product details.
 * - 500: Error message if an internal server error occurs.
 */

export async function GET(req, res) {
  try {
    const productName = req.nextUrl.searchParams.get("query");
    const example1 = {
      product: {
        id: "12345",
        name: "RoboBuddy 3000",
        description:
          "An interactive robot toy with AI-powered responses and educational games.",
        category: "Toys & Games",
        manufacturer: {
          name: "FuturePlay Inc.",
          address: {
            street: "123 Innovation Way",
            city: "Playtown",
            state: "California",
            postalCode: "90210",
            country: "USA",
          },
          contact: {
            phone: "+1-800-123-4567",
            email: "support@futureplay.com",
            website: "https://www.futureplay.com",
          },
        },
        specifications: {
          dimensions: { width: "10 cm", height: "20 cm", depth: "8 cm" },
          weight: "1.2 kg",
          materials: ["ABS plastic", "Silicone"],
          battery: {
            type: "Rechargeable lithium-ion",
            capacity: "2000mAh",
            chargingTime: "2 hours",
            batteryLife: "6 hours of continuous use",
          },
          features: [
            "Voice recognition",
            "Interactive games",
            "AI learning mode",
            "LED display",
            "Bluetooth connectivity",
          ],
        },
        pricing: {
          currency: "USD",
          price: 79.99,
          discount: {
            isAvailable: true,
            percentage: 10,
            validUntil: "2024-12-31",
          },
        },
        availability: {
          inStock: true,
          stockCount: 150,
          warehouses: [
            {
              location: "Los Angeles, CA",
              stock: 100,
            },
            {
              location: "New York, NY",
              stock: 50,
            },
          ],
        },
        reviews: [
          {
            user: "johndoe",
            rating: 5,
            comment: "My kids love this toy! It's both fun and educational.",

            date: "2024-11-28",
          },
          {
            user: "janedoe",
            rating: 4,
            comment: "Great toy, but the battery could last longer.",
            date: "2024-11-25",
          },
        ],
        tags: ["robot", "educational", "AI", "kids", "interactive"],
        relatedProducts: [
          {
            id: "67890",
            name: "Coding Wizard Starter Kit",
            url: "https://www.futureplay.com/products/67890",
          },
          {
            id: "11223",
            name: "PuzzleBot Junior",
            url: "https://www.futureplay.com/products/11223",
          },
        ],
      },
    };

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a product information specialist. Generate detailed, realistic product information based on the given product name. Include specifications, pricing, and manufacturer details." },
        {
          role: "user",
          content: `Create the JSON Object with the information for the product ${productName}. This json object should also include the reviews of product. It should also follow the data schema of ${JSON.stringify(
            example1
          )} object`,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000
    });
    console.log(completion.choices[0].message.content);

    const outputText = completion.choices[0].message.content;
    // Extract JSON using a temporary variable
    const jsonStart = outputText.indexOf("{");
    const jsonEnd = outputText.lastIndexOf("}") + 1; // Include the closing brace
    const extractedJson = outputText.substring(jsonStart, jsonEnd);

    // Parse and log the JSON
    const parsedJson = JSON.parse(extractedJson);
const ValidatedData= await ValidateProductData(parsedJson)
console.log("Validate test", ValidatedData)

const EnrichedData = await EnrichProductData(ValidatedData)
console.log(EnrichedData)

/*
if(!isValidated.success){
    return NextResponse.json({msg:"Data schema is not valid"}, {status: 400})
}
*/

    return NextResponse.json(EnrichedData, { status: 200 }); 
  } catch (error) {
    return NextResponse.json(error.message, { status: 500 });
  }
}

