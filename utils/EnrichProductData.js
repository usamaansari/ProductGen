import puppeteer from 'puppeteer';

export async function EnrichProductData(productData) {
  try {
    // Enrich with real market prices
    const priceData = await fetchMarketPrices(productData.product.name);
    
    // Enrich with real reviews
   // const reviews = await scrapeProductReviews(productData.product.name);
    
    return {
      ...productData,
      product: {
        ...productData.product,
        pricing: {
          ...productData.product.pricing,
          marketPrices: priceData
        },
      }
    };
  } catch (error) {
   console.log('Error enriching product data:', error);
    return productData; // Return original data if enrichment fails
  }
}

async function fetchMarketPrices(productName) {
  try {
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox']
    });
    const page = await browser.newPage();
    
    // Amazon price scraping
    await page.goto(`https://www.amazon.com/s?k=${encodeURIComponent(productName)}`);
    const amazonPrice = await page.$eval('.a-price-whole', el => parseFloat(el.textContent.replace(',', '')));
    
    // eBay price scraping
    await page.goto(`https://www.ebay.com/sch/i.html?_nkw=${encodeURIComponent(productName)}`);
    const ebayPrice = await page.$eval('.s-item__price', el => parseFloat(el.textContent.replace('$', '').replace(',', '')));
    
    await browser.close();
    
    return {
      amazon: { price: amazonPrice, currency: 'USD' },
      ebay: { price: ebayPrice, currency: 'USD' }
    };
  } catch (error) {
    console.log('Error fetching market prices:', error);
    return {};
  }
}

/*
async function scrapeProductReviews(productName) {
  try {
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox']
    });
    const page = await browser.newPage();
    
    // Amazon reviews
    await page.goto(`https://www.amazon.com/s?k=${encodeURIComponent(productName)}`);
    const amazonReviews = await page.$$eval('.review', reviews =>
      reviews.slice(0, 5).map(review => ({
        source: 'Amazon',
        rating: parseInt(review.querySelector('.rating').textContent),
        comment: review.querySelector('.review-text').textContent,
        user: review.querySelector('.user').textContent,
        date: new Date().toISOString()
      }))
    );
    
    await browser.close();
    
    return amazonReviews;
  } catch (error) {
   console.log(error);
    return [];
  }
}
  */