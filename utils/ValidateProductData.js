import Joi from 'joi';

// Schema declaration and validation using Joi library
const ProductSchema = Joi.object({
    product: Joi.object({
      id: Joi.string().required(),
      name: Joi.string().required(),
      description: Joi.string().required(),
      category: Joi.string().required(),
      manufacturer: Joi.object({
        name: Joi.string().required(),
        address: Joi.object({
          street: Joi.string().required(),
          city: Joi.string().required(),
          state: Joi.string().required(),
          postalCode: Joi.string().required(),
          country: Joi.string().required()
        }),
        contact: Joi.object({
          phone: Joi.string().required(),
          email: Joi.string().email().required(),
          website: Joi.string().uri().required()
        })
      }).required(),
      specifications: Joi.object().required(),
      pricing: Joi.object({
        currency: Joi.string().required(),
        price: Joi.number().required(),
        discount: Joi.object()
      }).required(),
      availability: Joi.object().required(),
      reviews: Joi.array().items(Joi.object()),
      tags: Joi.array().items(Joi.string()),
      relatedProducts: Joi.array().items(Joi.object())
    }).required()
  });

export async function ValidateProductData(data) {
    const validatedData = await ProductSchema.validateAsync(data);
    return validatedData;
 
}