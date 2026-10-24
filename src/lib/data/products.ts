import type { StoreName } from '$lib/types';

export interface PriceEntry {
	storeId: string;
	store: StoreName;
	price: number;
	mrp: number;
	url: string;
	inStock: boolean;
	lastUpdated: string;
}

export interface Product {
	id: string;
	title: string;
	brand: string;
	category: string;
	imageUrl: string;
	description: string;
	storePrices: PriceEntry[];
	priceHistory: { date: string; price: number; store: StoreName }[];
	rating: number;
	reviewCount: number;
	popularity: number;
	tags: string[];
}

export const products: Product[] = [
  {
    "id": "prod-001",
    "title": "Samsung Galaxy S24 Ultra 5G (Titanium Black, 256GB)",
    "brand": "Samsung",
    "category": "Smartphones",
    "imageUrl": "https://images.unsplash.com/photo-1511707171634-5f897ff02560?auto=format&fit=crop&w=600&q=80",
    "description": "Samsung Galaxy S24 Ultra 5G (Titanium Black, 256GB). Premium quality smartphones by Samsung. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "amazon",
        "store": "Amazon",
        "price": 123100,
        "mrp": 144999,
        "url": "https://amazon.in/dp/samsung-galaxy-s24-ultra-5g-titaniu/prod-001",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "myntra",
        "store": "Myntra",
        "price": 135270,
        "mrp": 144999,
        "url": "https://myntra.com/product/samsung-galaxy-s24-ultra-5g-titaniu/p/prod-001",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "ajio",
        "store": "Ajio",
        "price": 128490,
        "mrp": 144999,
        "url": "https://ajio.com/product/samsung-galaxy-s24-ultra-5g-titaniu/p/prod-001",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "flipkart",
        "store": "Flipkart",
        "price": 130560,
        "mrp": 144999,
        "url": "https://flipkart.com/product/samsung-galaxy-s24-ultra-5g-titaniu/p/prod-001",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 134010,
        "store": "Amazon"
      },
      {
        "date": "2026-08-01",
        "price": 132420,
        "store": "Ajio"
      },
      {
        "date": "2026-08-15",
        "price": 132730,
        "store": "Amazon"
      },
      {
        "date": "2026-09-01",
        "price": 129650,
        "store": "Amazon"
      },
      {
        "date": "2026-09-15",
        "price": 128030,
        "store": "Amazon"
      },
      {
        "date": "2026-10-01",
        "price": 128160,
        "store": "Ajio"
      },
      {
        "date": "2026-10-15",
        "price": 132870,
        "store": "Ajio"
      },
      {
        "date": "2026-10-24",
        "price": 128020,
        "store": "Flipkart"
      }
    ],
    "rating": 4.4,
    "reviewCount": 4294,
    "popularity": 72,
    "tags": [
      "5g",
      "camera",
      "fast-charging",
      "smartphones",
      "smartphone",
      "samsung",
      "oled",
      "mobile"
    ]
  },
  {
    "id": "prod-002",
    "title": "Apple iPhone 16 Pro Max (Desert Titanium, 256GB)",
    "brand": "Apple",
    "category": "Smartphones",
    "imageUrl": "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=600&q=80",
    "description": "Apple iPhone 16 Pro Max (Desert Titanium, 256GB). Premium quality smartphones by Apple. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "croma",
        "store": "Croma",
        "price": 141830,
        "mrp": 149900,
        "url": "https://croma.com/product/apple-iphone-16-pro-max-desert-tita/p/prod-002",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "myntra",
        "store": "Myntra",
        "price": 139590,
        "mrp": 149900,
        "url": "https://myntra.com/product/apple-iphone-16-pro-max-desert-tita/p/prod-002",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "amazon",
        "store": "Amazon",
        "price": 146510,
        "mrp": 149900,
        "url": "https://amazon.in/dp/apple-iphone-16-pro-max-desert-tita/prod-002",
        "inStock": false,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "ajio",
        "store": "Ajio",
        "price": 136880,
        "mrp": 149900,
        "url": "https://ajio.com/product/apple-iphone-16-pro-max-desert-tita/p/prod-002",
        "inStock": false,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 146160,
        "store": "Myntra"
      },
      {
        "date": "2026-08-01",
        "price": 147070,
        "store": "Croma"
      },
      {
        "date": "2026-08-15",
        "price": 152360,
        "store": "Croma"
      },
      {
        "date": "2026-09-01",
        "price": 146120,
        "store": "Myntra"
      },
      {
        "date": "2026-09-15",
        "price": 144350,
        "store": "Ajio"
      },
      {
        "date": "2026-10-01",
        "price": 140040,
        "store": "Ajio"
      },
      {
        "date": "2026-10-15",
        "price": 142470,
        "store": "Amazon"
      },
      {
        "date": "2026-10-24",
        "price": 146290,
        "store": "Amazon"
      }
    ],
    "rating": 4.2,
    "reviewCount": 6563,
    "popularity": 89,
    "tags": [
      "apple",
      "5g",
      "camera",
      "fast-charging",
      "smartphones",
      "smartphone",
      "oled",
      "mobile"
    ]
  },
  {
    "id": "prod-003",
    "title": "Apple iPhone 16 (Ultramarine Blue, 128GB)",
    "brand": "Apple",
    "category": "Smartphones",
    "imageUrl": "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=600&q=80",
    "description": "Apple iPhone 16 (Ultramarine Blue, 128GB). Premium quality smartphones by Apple. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "ajio",
        "store": "Ajio",
        "price": 84000,
        "mrp": 84900,
        "url": "https://ajio.com/product/apple-iphone-16-ultramarine-blue-12/p/prod-003",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "amazon",
        "store": "Amazon",
        "price": 75780,
        "mrp": 84900,
        "url": "https://amazon.in/dp/apple-iphone-16-ultramarine-blue-12/prod-003",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "myntra",
        "store": "Myntra",
        "price": 75870,
        "mrp": 84900,
        "url": "https://myntra.com/product/apple-iphone-16-ultramarine-blue-12/p/prod-003",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 81880,
        "store": "Myntra"
      },
      {
        "date": "2026-08-01",
        "price": 80550,
        "store": "Myntra"
      },
      {
        "date": "2026-08-15",
        "price": 83930,
        "store": "Ajio"
      },
      {
        "date": "2026-09-01",
        "price": 82210,
        "store": "Myntra"
      },
      {
        "date": "2026-09-15",
        "price": 83630,
        "store": "Amazon"
      },
      {
        "date": "2026-10-01",
        "price": 81230,
        "store": "Ajio"
      },
      {
        "date": "2026-10-15",
        "price": 83680,
        "store": "Myntra"
      },
      {
        "date": "2026-10-24",
        "price": 84020,
        "store": "Ajio"
      }
    ],
    "rating": 4.9,
    "reviewCount": 8324,
    "popularity": 95,
    "tags": [
      "apple",
      "5g",
      "camera",
      "fast-charging",
      "smartphones",
      "smartphone",
      "oled",
      "mobile"
    ]
  },
  {
    "id": "prod-004",
    "title": "Apple iPhone 15 Pro Max (Blue Titanium, 256GB)",
    "brand": "Apple",
    "category": "Smartphones",
    "imageUrl": "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=600&q=80",
    "description": "Apple iPhone 15 Pro Max (Blue Titanium, 256GB). Premium quality smartphones by Apple. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "myntra",
        "store": "Myntra",
        "price": 137220,
        "mrp": 159900,
        "url": "https://myntra.com/product/apple-iphone-15-pro-max-blue-titani/p/prod-004",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "amazon",
        "store": "Amazon",
        "price": 126920,
        "mrp": 159900,
        "url": "https://amazon.in/dp/apple-iphone-15-pro-max-blue-titani/prod-004",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "flipkart",
        "store": "Flipkart",
        "price": 128790,
        "mrp": 159900,
        "url": "https://flipkart.com/product/apple-iphone-15-pro-max-blue-titani/p/prod-004",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "ajio",
        "store": "Ajio",
        "price": 141070,
        "mrp": 159900,
        "url": "https://ajio.com/product/apple-iphone-15-pro-max-blue-titani/p/prod-004",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 131290,
        "store": "Amazon"
      },
      {
        "date": "2026-08-01",
        "price": 125700,
        "store": "Flipkart"
      },
      {
        "date": "2026-08-15",
        "price": 123860,
        "store": "Flipkart"
      },
      {
        "date": "2026-09-01",
        "price": 118670,
        "store": "Amazon"
      },
      {
        "date": "2026-09-15",
        "price": 120020,
        "store": "Flipkart"
      },
      {
        "date": "2026-10-01",
        "price": 114970,
        "store": "Flipkart"
      },
      {
        "date": "2026-10-15",
        "price": 115710,
        "store": "Ajio"
      },
      {
        "date": "2026-10-24",
        "price": 116030,
        "store": "Myntra"
      }
    ],
    "rating": 4.9,
    "reviewCount": 288,
    "popularity": 72,
    "tags": [
      "apple",
      "5g",
      "camera",
      "fast-charging",
      "smartphones",
      "smartphone",
      "oled",
      "mobile"
    ]
  },
  {
    "id": "prod-005",
    "title": "Apple iPhone 15 (Black, 128GB)",
    "brand": "Apple",
    "category": "Smartphones",
    "imageUrl": "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?auto=format&fit=crop&w=600&q=80",
    "description": "Apple iPhone 15 (Black, 128GB). Premium quality smartphones by Apple. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "croma",
        "store": "Croma",
        "price": 66140,
        "mrp": 79900,
        "url": "https://croma.com/product/apple-iphone-15-black-128gb/p/prod-005",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "flipkart",
        "store": "Flipkart",
        "price": 65650,
        "mrp": 79900,
        "url": "https://flipkart.com/product/apple-iphone-15-black-128gb/p/prod-005",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "amazon",
        "store": "Amazon",
        "price": 65720,
        "mrp": 79900,
        "url": "https://amazon.in/dp/apple-iphone-15-black-128gb/prod-005",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "myntra",
        "store": "Myntra",
        "price": 62950,
        "mrp": 79900,
        "url": "https://myntra.com/product/apple-iphone-15-black-128gb/p/prod-005",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 66630,
        "store": "Croma"
      },
      {
        "date": "2026-08-01",
        "price": 67120,
        "store": "Flipkart"
      },
      {
        "date": "2026-08-15",
        "price": 65110,
        "store": "Amazon"
      },
      {
        "date": "2026-09-01",
        "price": 65910,
        "store": "Croma"
      },
      {
        "date": "2026-09-15",
        "price": 68790,
        "store": "Amazon"
      },
      {
        "date": "2026-10-01",
        "price": 69700,
        "store": "Flipkart"
      },
      {
        "date": "2026-10-15",
        "price": 67620,
        "store": "Croma"
      },
      {
        "date": "2026-10-24",
        "price": 70200,
        "store": "Amazon"
      }
    ],
    "rating": 4.8,
    "reviewCount": 14604,
    "popularity": 90,
    "tags": [
      "apple",
      "5g",
      "camera",
      "fast-charging",
      "smartphones",
      "smartphone",
      "oled",
      "mobile"
    ]
  },
  {
    "id": "prod-006",
    "title": "Samsung Galaxy S24 Plus (Onyx Black, 256GB)",
    "brand": "Samsung",
    "category": "Smartphones",
    "imageUrl": "https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&w=600&q=80",
    "description": "Samsung Galaxy S24 Plus (Onyx Black, 256GB). Premium quality smartphones by Samsung. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "croma",
        "store": "Croma",
        "price": 88020,
        "mrp": 99999,
        "url": "https://croma.com/product/samsung-galaxy-s24-plus-onyx-black-/p/prod-006",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "amazon",
        "store": "Amazon",
        "price": 85460,
        "mrp": 99999,
        "url": "https://amazon.in/dp/samsung-galaxy-s24-plus-onyx-black-/prod-006",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "myntra",
        "store": "Myntra",
        "price": 87400,
        "mrp": 99999,
        "url": "https://myntra.com/product/samsung-galaxy-s24-plus-onyx-black-/p/prod-006",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "ajio",
        "store": "Ajio",
        "price": 88510,
        "mrp": 99999,
        "url": "https://ajio.com/product/samsung-galaxy-s24-plus-onyx-black-/p/prod-006",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 86980,
        "store": "Myntra"
      },
      {
        "date": "2026-08-01",
        "price": 91180,
        "store": "Myntra"
      },
      {
        "date": "2026-08-15",
        "price": 92330,
        "store": "Amazon"
      },
      {
        "date": "2026-09-01",
        "price": 91790,
        "store": "Myntra"
      },
      {
        "date": "2026-09-15",
        "price": 93870,
        "store": "Myntra"
      },
      {
        "date": "2026-10-01",
        "price": 91780,
        "store": "Myntra"
      },
      {
        "date": "2026-10-15",
        "price": 92370,
        "store": "Amazon"
      },
      {
        "date": "2026-10-24",
        "price": 96810,
        "store": "Croma"
      }
    ],
    "rating": 4.0,
    "reviewCount": 16715,
    "popularity": 99,
    "tags": [
      "5g",
      "camera",
      "fast-charging",
      "smartphones",
      "smartphone",
      "samsung",
      "oled",
      "mobile"
    ]
  },
  {
    "id": "prod-007",
    "title": "Samsung Galaxy Z Fold 6 5G (Silver Shadow, 256GB)",
    "brand": "Samsung",
    "category": "Smartphones",
    "imageUrl": "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=600&q=80",
    "description": "Samsung Galaxy Z Fold 6 5G (Silver Shadow, 256GB). Premium quality smartphones by Samsung. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "ajio",
        "store": "Ajio",
        "price": 163490,
        "mrp": 179999,
        "url": "https://ajio.com/product/samsung-galaxy-z-fold-6-5g-silver-s/p/prod-007",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "croma",
        "store": "Croma",
        "price": 169150,
        "mrp": 179999,
        "url": "https://croma.com/product/samsung-galaxy-z-fold-6-5g-silver-s/p/prod-007",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "flipkart",
        "store": "Flipkart",
        "price": 160670,
        "mrp": 179999,
        "url": "https://flipkart.com/product/samsung-galaxy-z-fold-6-5g-silver-s/p/prod-007",
        "inStock": false,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 160790,
        "store": "Flipkart"
      },
      {
        "date": "2026-08-01",
        "price": 159800,
        "store": "Flipkart"
      },
      {
        "date": "2026-08-15",
        "price": 158360,
        "store": "Flipkart"
      },
      {
        "date": "2026-09-01",
        "price": 152570,
        "store": "Croma"
      },
      {
        "date": "2026-09-15",
        "price": 154360,
        "store": "Croma"
      },
      {
        "date": "2026-10-01",
        "price": 147880,
        "store": "Ajio"
      },
      {
        "date": "2026-10-15",
        "price": 148080,
        "store": "Croma"
      },
      {
        "date": "2026-10-24",
        "price": 152820,
        "store": "Ajio"
      }
    ],
    "rating": 4.7,
    "reviewCount": 7313,
    "popularity": 85,
    "tags": [
      "5g",
      "camera",
      "fast-charging",
      "smartphones",
      "smartphone",
      "samsung",
      "oled",
      "mobile"
    ]
  },
  {
    "id": "prod-008",
    "title": "Samsung Galaxy Z Flip 6 5G (Mint, 256GB)",
    "brand": "Samsung",
    "category": "Smartphones",
    "imageUrl": "https://images.unsplash.com/photo-1511707171634-5f897ff02560?auto=format&fit=crop&w=600&q=80",
    "description": "Samsung Galaxy Z Flip 6 5G (Mint, 256GB). Premium quality smartphones by Samsung. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "myntra",
        "store": "Myntra",
        "price": 110410,
        "mrp": 119999,
        "url": "https://myntra.com/product/samsung-galaxy-z-flip-6-5g-mint-256/p/prod-008",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "amazon",
        "store": "Amazon",
        "price": 113630,
        "mrp": 119999,
        "url": "https://amazon.in/dp/samsung-galaxy-z-flip-6-5g-mint-256/prod-008",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "flipkart",
        "store": "Flipkart",
        "price": 103770,
        "mrp": 119999,
        "url": "https://flipkart.com/product/samsung-galaxy-z-flip-6-5g-mint-256/p/prod-008",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 109320,
        "store": "Myntra"
      },
      {
        "date": "2026-08-01",
        "price": 108740,
        "store": "Flipkart"
      },
      {
        "date": "2026-08-15",
        "price": 103760,
        "store": "Flipkart"
      },
      {
        "date": "2026-09-01",
        "price": 106500,
        "store": "Amazon"
      },
      {
        "date": "2026-09-15",
        "price": 103640,
        "store": "Flipkart"
      },
      {
        "date": "2026-10-01",
        "price": 101120,
        "store": "Amazon"
      },
      {
        "date": "2026-10-15",
        "price": 97910,
        "store": "Amazon"
      },
      {
        "date": "2026-10-24",
        "price": 97140,
        "store": "Myntra"
      }
    ],
    "rating": 4.8,
    "reviewCount": 8070,
    "popularity": 76,
    "tags": [
      "5g",
      "camera",
      "fast-charging",
      "smartphones",
      "smartphone",
      "samsung",
      "oled",
      "mobile"
    ]
  },
  {
    "id": "prod-009",
    "title": "OnePlus 12 5G (Flowy Emerald, 256GB, 12GB RAM)",
    "brand": "OnePlus",
    "category": "Smartphones",
    "imageUrl": "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=600&q=80",
    "description": "OnePlus 12 5G (Flowy Emerald, 256GB, 12GB RAM). Premium quality smartphones by OnePlus. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "flipkart",
        "store": "Flipkart",
        "price": 66290,
        "mrp": 69999,
        "url": "https://flipkart.com/product/oneplus-12-5g-flowy-emerald-256gb-1/p/prod-009",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "croma",
        "store": "Croma",
        "price": 63670,
        "mrp": 69999,
        "url": "https://croma.com/product/oneplus-12-5g-flowy-emerald-256gb-1/p/prod-009",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "amazon",
        "store": "Amazon",
        "price": 64750,
        "mrp": 69999,
        "url": "https://amazon.in/dp/oneplus-12-5g-flowy-emerald-256gb-1/prod-009",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "ajio",
        "store": "Ajio",
        "price": 63500,
        "mrp": 69999,
        "url": "https://ajio.com/product/oneplus-12-5g-flowy-emerald-256gb-1/p/prod-009",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 65910,
        "store": "Flipkart"
      },
      {
        "date": "2026-08-01",
        "price": 65030,
        "store": "Amazon"
      },
      {
        "date": "2026-08-15",
        "price": 66190,
        "store": "Croma"
      },
      {
        "date": "2026-09-01",
        "price": 68690,
        "store": "Ajio"
      },
      {
        "date": "2026-09-15",
        "price": 71010,
        "store": "Ajio"
      },
      {
        "date": "2026-10-01",
        "price": 68890,
        "store": "Ajio"
      },
      {
        "date": "2026-10-15",
        "price": 68100,
        "store": "Flipkart"
      },
      {
        "date": "2026-10-24",
        "price": 68210,
        "store": "Ajio"
      }
    ],
    "rating": 4.3,
    "reviewCount": 7233,
    "popularity": 68,
    "tags": [
      "5g",
      "camera",
      "fast-charging",
      "smartphones",
      "oneplus",
      "smartphone",
      "oled",
      "mobile"
    ]
  },
  {
    "id": "prod-010",
    "title": "OnePlus 12R 5G (Cool Blue, 128GB, 8GB RAM)",
    "brand": "OnePlus",
    "category": "Smartphones",
    "imageUrl": "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=600&q=80",
    "description": "OnePlus 12R 5G (Cool Blue, 128GB, 8GB RAM). Premium quality smartphones by OnePlus. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "myntra",
        "store": "Myntra",
        "price": 40650,
        "mrp": 42999,
        "url": "https://myntra.com/product/oneplus-12r-5g-cool-blue-128gb-8gb-/p/prod-010",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "amazon",
        "store": "Amazon",
        "price": 39020,
        "mrp": 42999,
        "url": "https://amazon.in/dp/oneplus-12r-5g-cool-blue-128gb-8gb-/prod-010",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "ajio",
        "store": "Ajio",
        "price": 38990,
        "mrp": 42999,
        "url": "https://ajio.com/product/oneplus-12r-5g-cool-blue-128gb-8gb-/p/prod-010",
        "inStock": false,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 41430,
        "store": "Amazon"
      },
      {
        "date": "2026-08-01",
        "price": 41740,
        "store": "Myntra"
      },
      {
        "date": "2026-08-15",
        "price": 43140,
        "store": "Ajio"
      },
      {
        "date": "2026-09-01",
        "price": 44610,
        "store": "Ajio"
      },
      {
        "date": "2026-09-15",
        "price": 42410,
        "store": "Myntra"
      },
      {
        "date": "2026-10-01",
        "price": 42260,
        "store": "Myntra"
      },
      {
        "date": "2026-10-15",
        "price": 41870,
        "store": "Myntra"
      },
      {
        "date": "2026-10-24",
        "price": 42180,
        "store": "Amazon"
      }
    ],
    "rating": 4.7,
    "reviewCount": 9966,
    "popularity": 83,
    "tags": [
      "5g",
      "camera",
      "fast-charging",
      "smartphones",
      "oneplus",
      "smartphone",
      "oled",
      "mobile"
    ]
  },
  {
    "id": "prod-011",
    "title": "OnePlus Nord 4 5G (Mercurial Silver, 256GB)",
    "brand": "OnePlus",
    "category": "Smartphones",
    "imageUrl": "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=600&q=80",
    "description": "OnePlus Nord 4 5G (Mercurial Silver, 256GB). Premium quality smartphones by OnePlus. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "myntra",
        "store": "Myntra",
        "price": 33380,
        "mrp": 35999,
        "url": "https://myntra.com/product/oneplus-nord-4-5g-mercurial-silver-/p/prod-011",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "flipkart",
        "store": "Flipkart",
        "price": 32380,
        "mrp": 35999,
        "url": "https://flipkart.com/product/oneplus-nord-4-5g-mercurial-silver-/p/prod-011",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "ajio",
        "store": "Ajio",
        "price": 33060,
        "mrp": 35999,
        "url": "https://ajio.com/product/oneplus-nord-4-5g-mercurial-silver-/p/prod-011",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "amazon",
        "store": "Amazon",
        "price": 34870,
        "mrp": 35999,
        "url": "https://amazon.in/dp/oneplus-nord-4-5g-mercurial-silver-/prod-011",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 32140,
        "store": "Ajio"
      },
      {
        "date": "2026-08-01",
        "price": 32680,
        "store": "Flipkart"
      },
      {
        "date": "2026-08-15",
        "price": 31250,
        "store": "Amazon"
      },
      {
        "date": "2026-09-01",
        "price": 30500,
        "store": "Myntra"
      },
      {
        "date": "2026-09-15",
        "price": 29150,
        "store": "Ajio"
      },
      {
        "date": "2026-10-01",
        "price": 29860,
        "store": "Myntra"
      },
      {
        "date": "2026-10-15",
        "price": 29700,
        "store": "Flipkart"
      },
      {
        "date": "2026-10-24",
        "price": 29470,
        "store": "Ajio"
      }
    ],
    "rating": 4.3,
    "reviewCount": 7164,
    "popularity": 90,
    "tags": [
      "5g",
      "camera",
      "fast-charging",
      "smartphones",
      "oneplus",
      "smartphone",
      "oled",
      "mobile"
    ]
  },
  {
    "id": "prod-012",
    "title": "Google Pixel 9 Pro XL (Porcelain, 128GB)",
    "brand": "Google",
    "category": "Smartphones",
    "imageUrl": "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?auto=format&fit=crop&w=600&q=80",
    "description": "Google Pixel 9 Pro XL (Porcelain, 128GB). Premium quality smartphones by Google. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "myntra",
        "store": "Myntra",
        "price": 118650,
        "mrp": 134999,
        "url": "https://myntra.com/product/google-pixel-9-pro-xl-porcelain-128/p/prod-012",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "ajio",
        "store": "Ajio",
        "price": 124920,
        "mrp": 134999,
        "url": "https://ajio.com/product/google-pixel-9-pro-xl-porcelain-128/p/prod-012",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "flipkart",
        "store": "Flipkart",
        "price": 125760,
        "mrp": 134999,
        "url": "https://flipkart.com/product/google-pixel-9-pro-xl-porcelain-128/p/prod-012",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "croma",
        "store": "Croma",
        "price": 122020,
        "mrp": 134999,
        "url": "https://croma.com/product/google-pixel-9-pro-xl-porcelain-128/p/prod-012",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 123850,
        "store": "Flipkart"
      },
      {
        "date": "2026-08-01",
        "price": 125470,
        "store": "Myntra"
      },
      {
        "date": "2026-08-15",
        "price": 119810,
        "store": "Flipkart"
      },
      {
        "date": "2026-09-01",
        "price": 121700,
        "store": "Croma"
      },
      {
        "date": "2026-09-15",
        "price": 124490,
        "store": "Ajio"
      },
      {
        "date": "2026-10-01",
        "price": 128550,
        "store": "Flipkart"
      },
      {
        "date": "2026-10-15",
        "price": 123820,
        "store": "Croma"
      },
      {
        "date": "2026-10-24",
        "price": 124640,
        "store": "Flipkart"
      }
    ],
    "rating": 4.4,
    "reviewCount": 292,
    "popularity": 90,
    "tags": [
      "5g",
      "camera",
      "fast-charging",
      "smartphones",
      "google",
      "smartphone",
      "oled",
      "mobile"
    ]
  },
  {
    "id": "prod-013",
    "title": "Google Pixel 9 (Peony Pink, 128GB)",
    "brand": "Google",
    "category": "Smartphones",
    "imageUrl": "https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&w=600&q=80",
    "description": "Google Pixel 9 (Peony Pink, 128GB). Premium quality smartphones by Google. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "flipkart",
        "store": "Flipkart",
        "price": 80130,
        "mrp": 84999,
        "url": "https://flipkart.com/product/google-pixel-9-peony-pink-128gb/p/prod-013",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "ajio",
        "store": "Ajio",
        "price": 77460,
        "mrp": 84999,
        "url": "https://ajio.com/product/google-pixel-9-peony-pink-128gb/p/prod-013",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "amazon",
        "store": "Amazon",
        "price": 79910,
        "mrp": 84999,
        "url": "https://amazon.in/dp/google-pixel-9-peony-pink-128gb/prod-013",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 83810,
        "store": "Ajio"
      },
      {
        "date": "2026-08-01",
        "price": 87650,
        "store": "Amazon"
      },
      {
        "date": "2026-08-15",
        "price": 89610,
        "store": "Flipkart"
      },
      {
        "date": "2026-09-01",
        "price": 89250,
        "store": "Flipkart"
      },
      {
        "date": "2026-09-15",
        "price": 88220,
        "store": "Flipkart"
      },
      {
        "date": "2026-10-01",
        "price": 86830,
        "store": "Ajio"
      },
      {
        "date": "2026-10-15",
        "price": 90280,
        "store": "Flipkart"
      },
      {
        "date": "2026-10-24",
        "price": 92010,
        "store": "Amazon"
      }
    ],
    "rating": 4.7,
    "reviewCount": 4308,
    "popularity": 68,
    "tags": [
      "5g",
      "camera",
      "fast-charging",
      "smartphones",
      "google",
      "smartphone",
      "oled",
      "mobile"
    ]
  },
  {
    "id": "prod-014",
    "title": "Google Pixel 8a (Bay Blue, 128GB)",
    "brand": "Google",
    "category": "Smartphones",
    "imageUrl": "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=600&q=80",
    "description": "Google Pixel 8a (Bay Blue, 128GB). Premium quality smartphones by Google. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "amazon",
        "store": "Amazon",
        "price": 52720,
        "mrp": 52999,
        "url": "https://amazon.in/dp/google-pixel-8a-bay-blue-128gb/prod-014",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "myntra",
        "store": "Myntra",
        "price": 50970,
        "mrp": 52999,
        "url": "https://myntra.com/product/google-pixel-8a-bay-blue-128gb/p/prod-014",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "ajio",
        "store": "Ajio",
        "price": 48630,
        "mrp": 52999,
        "url": "https://ajio.com/product/google-pixel-8a-bay-blue-128gb/p/prod-014",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 52250,
        "store": "Ajio"
      },
      {
        "date": "2026-08-01",
        "price": 53080,
        "store": "Ajio"
      },
      {
        "date": "2026-08-15",
        "price": 52460,
        "store": "Ajio"
      },
      {
        "date": "2026-09-01",
        "price": 49940,
        "store": "Amazon"
      },
      {
        "date": "2026-09-15",
        "price": 49120,
        "store": "Amazon"
      },
      {
        "date": "2026-10-01",
        "price": 49690,
        "store": "Myntra"
      },
      {
        "date": "2026-10-15",
        "price": 50600,
        "store": "Myntra"
      },
      {
        "date": "2026-10-24",
        "price": 49740,
        "store": "Ajio"
      }
    ],
    "rating": 4.0,
    "reviewCount": 2003,
    "popularity": 66,
    "tags": [
      "5g",
      "camera",
      "fast-charging",
      "smartphones",
      "google",
      "smartphone",
      "oled",
      "mobile"
    ]
  },
  {
    "id": "prod-015",
    "title": "Xiaomi 14 Ultra (White, 512GB, Leica Quad Camera)",
    "brand": "Xiaomi",
    "category": "Smartphones",
    "imageUrl": "https://images.unsplash.com/photo-1511707171634-5f897ff02560?auto=format&fit=crop&w=600&q=80",
    "description": "Xiaomi 14 Ultra (White, 512GB, Leica Quad Camera). Premium quality smartphones by Xiaomi. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "ajio",
        "store": "Ajio",
        "price": 94940,
        "mrp": 109999,
        "url": "https://ajio.com/product/xiaomi-14-ultra-white-512gb-leica-q/p/prod-015",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "myntra",
        "store": "Myntra",
        "price": 98660,
        "mrp": 109999,
        "url": "https://myntra.com/product/xiaomi-14-ultra-white-512gb-leica-q/p/prod-015",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "croma",
        "store": "Croma",
        "price": 102560,
        "mrp": 109999,
        "url": "https://croma.com/product/xiaomi-14-ultra-white-512gb-leica-q/p/prod-015",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 97660,
        "store": "Ajio"
      },
      {
        "date": "2026-08-01",
        "price": 98670,
        "store": "Myntra"
      },
      {
        "date": "2026-08-15",
        "price": 94590,
        "store": "Ajio"
      },
      {
        "date": "2026-09-01",
        "price": 98250,
        "store": "Ajio"
      },
      {
        "date": "2026-09-15",
        "price": 98270,
        "store": "Myntra"
      },
      {
        "date": "2026-10-01",
        "price": 98590,
        "store": "Ajio"
      },
      {
        "date": "2026-10-15",
        "price": 95020,
        "store": "Croma"
      },
      {
        "date": "2026-10-24",
        "price": 99190,
        "store": "Croma"
      }
    ],
    "rating": 4.7,
    "reviewCount": 18413,
    "popularity": 77,
    "tags": [
      "5g",
      "camera",
      "fast-charging",
      "xiaomi",
      "smartphones",
      "smartphone",
      "oled",
      "mobile"
    ]
  },
  {
    "id": "prod-016",
    "title": "Redmi Note 13 Pro+ 5G (Fusion Purple, 256GB)",
    "brand": "Xiaomi",
    "category": "Smartphones",
    "imageUrl": "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=600&q=80",
    "description": "Redmi Note 13 Pro+ 5G (Fusion Purple, 256GB). Premium quality smartphones by Xiaomi. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "flipkart",
        "store": "Flipkart",
        "price": 31690,
        "mrp": 33999,
        "url": "https://flipkart.com/product/redmi-note-13-proplus-5g-fusion-pur/p/prod-016",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "amazon",
        "store": "Amazon",
        "price": 28690,
        "mrp": 33999,
        "url": "https://amazon.in/dp/redmi-note-13-proplus-5g-fusion-pur/prod-016",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "ajio",
        "store": "Ajio",
        "price": 30970,
        "mrp": 33999,
        "url": "https://ajio.com/product/redmi-note-13-proplus-5g-fusion-pur/p/prod-016",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 30620,
        "store": "Amazon"
      },
      {
        "date": "2026-08-01",
        "price": 29100,
        "store": "Amazon"
      },
      {
        "date": "2026-08-15",
        "price": 29550,
        "store": "Ajio"
      },
      {
        "date": "2026-09-01",
        "price": 29130,
        "store": "Flipkart"
      },
      {
        "date": "2026-09-15",
        "price": 28700,
        "store": "Amazon"
      },
      {
        "date": "2026-10-01",
        "price": 30020,
        "store": "Amazon"
      },
      {
        "date": "2026-10-15",
        "price": 30470,
        "store": "Ajio"
      },
      {
        "date": "2026-10-24",
        "price": 30780,
        "store": "Amazon"
      }
    ],
    "rating": 4.1,
    "reviewCount": 4619,
    "popularity": 94,
    "tags": [
      "5g",
      "camera",
      "fast-charging",
      "xiaomi",
      "smartphones",
      "smartphone",
      "oled",
      "mobile"
    ]
  },
  {
    "id": "prod-017",
    "title": "Realme GT 6 5G (Fluid Silver, 256GB)",
    "brand": "Realme",
    "category": "Smartphones",
    "imageUrl": "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=600&q=80",
    "description": "Realme GT 6 5G (Fluid Silver, 256GB). Premium quality smartphones by Realme. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "myntra",
        "store": "Myntra",
        "price": 41480,
        "mrp": 44999,
        "url": "https://myntra.com/product/realme-gt-6-5g-fluid-silver-256gb/p/prod-017",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "croma",
        "store": "Croma",
        "price": 41880,
        "mrp": 44999,
        "url": "https://croma.com/product/realme-gt-6-5g-fluid-silver-256gb/p/prod-017",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "flipkart",
        "store": "Flipkart",
        "price": 42960,
        "mrp": 44999,
        "url": "https://flipkart.com/product/realme-gt-6-5g-fluid-silver-256gb/p/prod-017",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 39720,
        "store": "Myntra"
      },
      {
        "date": "2026-08-01",
        "price": 37890,
        "store": "Myntra"
      },
      {
        "date": "2026-08-15",
        "price": 36960,
        "store": "Myntra"
      },
      {
        "date": "2026-09-01",
        "price": 38310,
        "store": "Flipkart"
      },
      {
        "date": "2026-09-15",
        "price": 38340,
        "store": "Croma"
      },
      {
        "date": "2026-10-01",
        "price": 39470,
        "store": "Flipkart"
      },
      {
        "date": "2026-10-15",
        "price": 40940,
        "store": "Flipkart"
      },
      {
        "date": "2026-10-24",
        "price": 42000,
        "store": "Myntra"
      }
    ],
    "rating": 4.7,
    "reviewCount": 1411,
    "popularity": 99,
    "tags": [
      "5g",
      "realme",
      "camera",
      "fast-charging",
      "smartphones",
      "smartphone",
      "oled",
      "mobile"
    ]
  },
  {
    "id": "prod-018",
    "title": "Motorola Edge 50 Ultra (Peach Fuzz, 512GB)",
    "brand": "Motorola",
    "category": "Smartphones",
    "imageUrl": "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=600&q=80",
    "description": "Motorola Edge 50 Ultra (Peach Fuzz, 512GB). Premium quality smartphones by Motorola. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "flipkart",
        "store": "Flipkart",
        "price": 54580,
        "mrp": 64999,
        "url": "https://flipkart.com/product/motorola-edge-50-ultra-peach-fuzz-5/p/prod-018",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "myntra",
        "store": "Myntra",
        "price": 54590,
        "mrp": 64999,
        "url": "https://myntra.com/product/motorola-edge-50-ultra-peach-fuzz-5/p/prod-018",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "amazon",
        "store": "Amazon",
        "price": 54370,
        "mrp": 64999,
        "url": "https://amazon.in/dp/motorola-edge-50-ultra-peach-fuzz-5/prod-018",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "croma",
        "store": "Croma",
        "price": 55060,
        "mrp": 64999,
        "url": "https://croma.com/product/motorola-edge-50-ultra-peach-fuzz-5/p/prod-018",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 57410,
        "store": "Croma"
      },
      {
        "date": "2026-08-01",
        "price": 57020,
        "store": "Amazon"
      },
      {
        "date": "2026-08-15",
        "price": 56920,
        "store": "Croma"
      },
      {
        "date": "2026-09-01",
        "price": 57550,
        "store": "Myntra"
      },
      {
        "date": "2026-09-15",
        "price": 58780,
        "store": "Flipkart"
      },
      {
        "date": "2026-10-01",
        "price": 60970,
        "store": "Flipkart"
      },
      {
        "date": "2026-10-15",
        "price": 59020,
        "store": "Myntra"
      },
      {
        "date": "2026-10-24",
        "price": 61370,
        "store": "Myntra"
      }
    ],
    "rating": 4.4,
    "reviewCount": 13091,
    "popularity": 76,
    "tags": [
      "5g",
      "camera",
      "motorola",
      "fast-charging",
      "smartphones",
      "smartphone",
      "oled",
      "mobile"
    ]
  },
  {
    "id": "prod-019",
    "title": "Vivo X100 Pro 5G (Asteroid Black, 512GB)",
    "brand": "Vivo",
    "category": "Smartphones",
    "imageUrl": "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?auto=format&fit=crop&w=600&q=80",
    "description": "Vivo X100 Pro 5G (Asteroid Black, 512GB). Premium quality smartphones by Vivo. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "flipkart",
        "store": "Flipkart",
        "price": 95050,
        "mrp": 94999,
        "url": "https://flipkart.com/product/vivo-x100-pro-5g-asteroid-black-512/p/prod-019",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "ajio",
        "store": "Ajio",
        "price": 89750,
        "mrp": 94999,
        "url": "https://ajio.com/product/vivo-x100-pro-5g-asteroid-black-512/p/prod-019",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "croma",
        "store": "Croma",
        "price": 89510,
        "mrp": 94999,
        "url": "https://croma.com/product/vivo-x100-pro-5g-asteroid-black-512/p/prod-019",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "amazon",
        "store": "Amazon",
        "price": 85700,
        "mrp": 94999,
        "url": "https://amazon.in/dp/vivo-x100-pro-5g-asteroid-black-512/prod-019",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 93420,
        "store": "Croma"
      },
      {
        "date": "2026-08-01",
        "price": 89230,
        "store": "Ajio"
      },
      {
        "date": "2026-08-15",
        "price": 90070,
        "store": "Croma"
      },
      {
        "date": "2026-09-01",
        "price": 92780,
        "store": "Croma"
      },
      {
        "date": "2026-09-15",
        "price": 97210,
        "store": "Ajio"
      },
      {
        "date": "2026-10-01",
        "price": 97250,
        "store": "Flipkart"
      },
      {
        "date": "2026-10-15",
        "price": 94330,
        "store": "Amazon"
      },
      {
        "date": "2026-10-24",
        "price": 90500,
        "store": "Croma"
      }
    ],
    "rating": 4.9,
    "reviewCount": 13519,
    "popularity": 78,
    "tags": [
      "5g",
      "camera",
      "fast-charging",
      "smartphones",
      "vivo",
      "smartphone",
      "oled",
      "mobile"
    ]
  },
  {
    "id": "prod-020",
    "title": "Nothing Phone (2) (Dark Grey, 256GB, Glyph Interface)",
    "brand": "Nothing",
    "category": "Smartphones",
    "imageUrl": "https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&w=600&q=80",
    "description": "Nothing Phone (2) (Dark Grey, 256GB, Glyph Interface). Premium quality smartphones by Nothing. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "amazon",
        "store": "Amazon",
        "price": 38040,
        "mrp": 44999,
        "url": "https://amazon.in/dp/nothing-phone-2-dark-grey-256gb-gly/prod-020",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "myntra",
        "store": "Myntra",
        "price": 38870,
        "mrp": 44999,
        "url": "https://myntra.com/product/nothing-phone-2-dark-grey-256gb-gly/p/prod-020",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "ajio",
        "store": "Ajio",
        "price": 38600,
        "mrp": 44999,
        "url": "https://ajio.com/product/nothing-phone-2-dark-grey-256gb-gly/p/prod-020",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "croma",
        "store": "Croma",
        "price": 36700,
        "mrp": 44999,
        "url": "https://croma.com/product/nothing-phone-2-dark-grey-256gb-gly/p/prod-020",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 36520,
        "store": "Amazon"
      },
      {
        "date": "2026-08-01",
        "price": 38190,
        "store": "Myntra"
      },
      {
        "date": "2026-08-15",
        "price": 37450,
        "store": "Ajio"
      },
      {
        "date": "2026-09-01",
        "price": 35740,
        "store": "Croma"
      },
      {
        "date": "2026-09-15",
        "price": 37170,
        "store": "Ajio"
      },
      {
        "date": "2026-10-01",
        "price": 38290,
        "store": "Amazon"
      },
      {
        "date": "2026-10-15",
        "price": 39340,
        "store": "Myntra"
      },
      {
        "date": "2026-10-24",
        "price": 39430,
        "store": "Croma"
      }
    ],
    "rating": 4.4,
    "reviewCount": 6822,
    "popularity": 80,
    "tags": [
      "5g",
      "nothing",
      "camera",
      "fast-charging",
      "smartphones",
      "smartphone",
      "oled",
      "mobile"
    ]
  },
  {
    "id": "prod-021",
    "title": "Apple MacBook Air M3 (15-inch, 16GB RAM, 512GB SSD, Midnight)",
    "brand": "Apple",
    "category": "Laptops",
    "imageUrl": "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=600&q=80",
    "description": "Apple MacBook Air M3 (15-inch, 16GB RAM, 512GB SSD, Midnight). Premium quality laptops by Apple. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "ajio",
        "store": "Ajio",
        "price": 152240,
        "mrp": 164900,
        "url": "https://ajio.com/product/apple-macbook-air-m3-15-inch-16gb-r/p/prod-021",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "myntra",
        "store": "Myntra",
        "price": 148650,
        "mrp": 164900,
        "url": "https://myntra.com/product/apple-macbook-air-m3-15-inch-16gb-r/p/prod-021",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "flipkart",
        "store": "Flipkart",
        "price": 151470,
        "mrp": 164900,
        "url": "https://flipkart.com/product/apple-macbook-air-m3-15-inch-16gb-r/p/prod-021",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 149860,
        "store": "Flipkart"
      },
      {
        "date": "2026-08-01",
        "price": 146550,
        "store": "Flipkart"
      },
      {
        "date": "2026-08-15",
        "price": 145080,
        "store": "Myntra"
      },
      {
        "date": "2026-09-01",
        "price": 148860,
        "store": "Ajio"
      },
      {
        "date": "2026-09-15",
        "price": 149490,
        "store": "Ajio"
      },
      {
        "date": "2026-10-01",
        "price": 151180,
        "store": "Flipkart"
      },
      {
        "date": "2026-10-15",
        "price": 151330,
        "store": "Flipkart"
      },
      {
        "date": "2026-10-24",
        "price": 150110,
        "store": "Ajio"
      }
    ],
    "rating": 4.3,
    "reviewCount": 12488,
    "popularity": 89,
    "tags": [
      "apple",
      "intel",
      "portable",
      "laptops",
      "laptop",
      "amd",
      "gaming",
      "computer"
    ]
  },
  {
    "id": "prod-022",
    "title": "Apple MacBook Air M3 (13-inch, 8GB RAM, 256GB SSD, Starlight)",
    "brand": "Apple",
    "category": "Laptops",
    "imageUrl": "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80",
    "description": "Apple MacBook Air M3 (13-inch, 8GB RAM, 256GB SSD, Starlight). Premium quality laptops by Apple. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "croma",
        "store": "Croma",
        "price": 104110,
        "mrp": 114900,
        "url": "https://croma.com/product/apple-macbook-air-m3-13-inch-8gb-ra/p/prod-022",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "flipkart",
        "store": "Flipkart",
        "price": 102910,
        "mrp": 114900,
        "url": "https://flipkart.com/product/apple-macbook-air-m3-13-inch-8gb-ra/p/prod-022",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "ajio",
        "store": "Ajio",
        "price": 98930,
        "mrp": 114900,
        "url": "https://ajio.com/product/apple-macbook-air-m3-13-inch-8gb-ra/p/prod-022",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "myntra",
        "store": "Myntra",
        "price": 99790,
        "mrp": 114900,
        "url": "https://myntra.com/product/apple-macbook-air-m3-13-inch-8gb-ra/p/prod-022",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 101980,
        "store": "Myntra"
      },
      {
        "date": "2026-08-01",
        "price": 106240,
        "store": "Flipkart"
      },
      {
        "date": "2026-08-15",
        "price": 103120,
        "store": "Myntra"
      },
      {
        "date": "2026-09-01",
        "price": 100760,
        "store": "Myntra"
      },
      {
        "date": "2026-09-15",
        "price": 97470,
        "store": "Flipkart"
      },
      {
        "date": "2026-10-01",
        "price": 101930,
        "store": "Myntra"
      },
      {
        "date": "2026-10-15",
        "price": 105120,
        "store": "Ajio"
      },
      {
        "date": "2026-10-24",
        "price": 101480,
        "store": "Ajio"
      }
    ],
    "rating": 4.8,
    "reviewCount": 17941,
    "popularity": 70,
    "tags": [
      "apple",
      "intel",
      "portable",
      "laptops",
      "laptop",
      "amd",
      "gaming",
      "computer"
    ]
  },
  {
    "id": "prod-023",
    "title": "Apple MacBook Pro 16 M3 Max (36GB RAM, 1TB SSD, Space Black)",
    "brand": "Apple",
    "category": "Laptops",
    "imageUrl": "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=600&q=80",
    "description": "Apple MacBook Pro 16 M3 Max (36GB RAM, 1TB SSD, Space Black). Premium quality laptops by Apple. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "amazon",
        "store": "Amazon",
        "price": 356520,
        "mrp": 399900,
        "url": "https://amazon.in/dp/apple-macbook-pro-16-m3-max-36gb-ra/prod-023",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "croma",
        "store": "Croma",
        "price": 358300,
        "mrp": 399900,
        "url": "https://croma.com/product/apple-macbook-pro-16-m3-max-36gb-ra/p/prod-023",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "flipkart",
        "store": "Flipkart",
        "price": 338020,
        "mrp": 399900,
        "url": "https://flipkart.com/product/apple-macbook-pro-16-m3-max-36gb-ra/p/prod-023",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "myntra",
        "store": "Myntra",
        "price": 345900,
        "mrp": 399900,
        "url": "https://myntra.com/product/apple-macbook-pro-16-m3-max-36gb-ra/p/prod-023",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 352130,
        "store": "Flipkart"
      },
      {
        "date": "2026-08-01",
        "price": 366740,
        "store": "Myntra"
      },
      {
        "date": "2026-08-15",
        "price": 354600,
        "store": "Croma"
      },
      {
        "date": "2026-09-01",
        "price": 341740,
        "store": "Flipkart"
      },
      {
        "date": "2026-09-15",
        "price": 339880,
        "store": "Flipkart"
      },
      {
        "date": "2026-10-01",
        "price": 328370,
        "store": "Croma"
      },
      {
        "date": "2026-10-15",
        "price": 319780,
        "store": "Croma"
      },
      {
        "date": "2026-10-24",
        "price": 330500,
        "store": "Myntra"
      }
    ],
    "rating": 4.2,
    "reviewCount": 2474,
    "popularity": 89,
    "tags": [
      "apple",
      "intel",
      "portable",
      "laptops",
      "laptop",
      "amd",
      "gaming",
      "computer"
    ]
  },
  {
    "id": "prod-024",
    "title": "Apple MacBook Pro 14 M3 Pro (18GB RAM, 512GB SSD)",
    "brand": "Apple",
    "category": "Laptops",
    "imageUrl": "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=600&q=80",
    "description": "Apple MacBook Pro 14 M3 Pro (18GB RAM, 512GB SSD). Premium quality laptops by Apple. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "croma",
        "store": "Croma",
        "price": 209500,
        "mrp": 219900,
        "url": "https://croma.com/product/apple-macbook-pro-14-m3-pro-18gb-ra/p/prod-024",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "myntra",
        "store": "Myntra",
        "price": 197760,
        "mrp": 219900,
        "url": "https://myntra.com/product/apple-macbook-pro-14-m3-pro-18gb-ra/p/prod-024",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "amazon",
        "store": "Amazon",
        "price": 193150,
        "mrp": 219900,
        "url": "https://amazon.in/dp/apple-macbook-pro-14-m3-pro-18gb-ra/prod-024",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "ajio",
        "store": "Ajio",
        "price": 201920,
        "mrp": 219900,
        "url": "https://ajio.com/product/apple-macbook-pro-14-m3-pro-18gb-ra/p/prod-024",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 190510,
        "store": "Amazon"
      },
      {
        "date": "2026-08-01",
        "price": 194660,
        "store": "Myntra"
      },
      {
        "date": "2026-08-15",
        "price": 197530,
        "store": "Amazon"
      },
      {
        "date": "2026-09-01",
        "price": 193900,
        "store": "Myntra"
      },
      {
        "date": "2026-09-15",
        "price": 194410,
        "store": "Croma"
      },
      {
        "date": "2026-10-01",
        "price": 196710,
        "store": "Ajio"
      },
      {
        "date": "2026-10-15",
        "price": 193360,
        "store": "Croma"
      },
      {
        "date": "2026-10-24",
        "price": 183820,
        "store": "Myntra"
      }
    ],
    "rating": 4.6,
    "reviewCount": 5851,
    "popularity": 83,
    "tags": [
      "apple",
      "intel",
      "portable",
      "laptops",
      "laptop",
      "amd",
      "gaming",
      "computer"
    ]
  },
  {
    "id": "prod-025",
    "title": "ASUS ROG Strix G16 (i7-13650HX, RTX 4060 8GB, 16GB RAM, 1TB)",
    "brand": "ASUS",
    "category": "Laptops",
    "imageUrl": "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=600&q=80",
    "description": "ASUS ROG Strix G16 (i7-13650HX, RTX 4060 8GB, 16GB RAM, 1TB). Premium quality laptops by ASUS. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "croma",
        "store": "Croma",
        "price": 115500,
        "mrp": 149990,
        "url": "https://croma.com/product/asus-rog-strix-g16-i7-13650hx-rtx-4/p/prod-025",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "ajio",
        "store": "Ajio",
        "price": 114200,
        "mrp": 149990,
        "url": "https://ajio.com/product/asus-rog-strix-g16-i7-13650hx-rtx-4/p/prod-025",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "amazon",
        "store": "Amazon",
        "price": 124260,
        "mrp": 149990,
        "url": "https://amazon.in/dp/asus-rog-strix-g16-i7-13650hx-rtx-4/prod-025",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "myntra",
        "store": "Myntra",
        "price": 122630,
        "mrp": 149990,
        "url": "https://myntra.com/product/asus-rog-strix-g16-i7-13650hx-rtx-4/p/prod-025",
        "inStock": false,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 118560,
        "store": "Amazon"
      },
      {
        "date": "2026-08-01",
        "price": 116910,
        "store": "Myntra"
      },
      {
        "date": "2026-08-15",
        "price": 115310,
        "store": "Ajio"
      },
      {
        "date": "2026-09-01",
        "price": 117020,
        "store": "Amazon"
      },
      {
        "date": "2026-09-15",
        "price": 118050,
        "store": "Ajio"
      },
      {
        "date": "2026-10-01",
        "price": 120700,
        "store": "Myntra"
      },
      {
        "date": "2026-10-15",
        "price": 118410,
        "store": "Croma"
      },
      {
        "date": "2026-10-24",
        "price": 120750,
        "store": "Ajio"
      }
    ],
    "rating": 4.3,
    "reviewCount": 15009,
    "popularity": 86,
    "tags": [
      "intel",
      "portable",
      "laptops",
      "laptop",
      "amd",
      "asus",
      "gaming",
      "computer"
    ]
  },
  {
    "id": "prod-026",
    "title": "ASUS Zenbook 14 OLED (Intel Core Ultra 7, 16GB, 1TB)",
    "brand": "ASUS",
    "category": "Laptops",
    "imageUrl": "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=600&q=80",
    "description": "ASUS Zenbook 14 OLED (Intel Core Ultra 7, 16GB, 1TB). Premium quality laptops by ASUS. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "ajio",
        "store": "Ajio",
        "price": 95130,
        "mrp": 124990,
        "url": "https://ajio.com/product/asus-zenbook-14-oled-intel-core-ult/p/prod-026",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "flipkart",
        "store": "Flipkart",
        "price": 94480,
        "mrp": 124990,
        "url": "https://flipkart.com/product/asus-zenbook-14-oled-intel-core-ult/p/prod-026",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "croma",
        "store": "Croma",
        "price": 95250,
        "mrp": 124990,
        "url": "https://croma.com/product/asus-zenbook-14-oled-intel-core-ult/p/prod-026",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "amazon",
        "store": "Amazon",
        "price": 100280,
        "mrp": 124990,
        "url": "https://amazon.in/dp/asus-zenbook-14-oled-intel-core-ult/prod-026",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 101840,
        "store": "Amazon"
      },
      {
        "date": "2026-08-01",
        "price": 104910,
        "store": "Flipkart"
      },
      {
        "date": "2026-08-15",
        "price": 102020,
        "store": "Ajio"
      },
      {
        "date": "2026-09-01",
        "price": 103030,
        "store": "Flipkart"
      },
      {
        "date": "2026-09-15",
        "price": 104500,
        "store": "Amazon"
      },
      {
        "date": "2026-10-01",
        "price": 106670,
        "store": "Flipkart"
      },
      {
        "date": "2026-10-15",
        "price": 102080,
        "store": "Ajio"
      },
      {
        "date": "2026-10-24",
        "price": 100010,
        "store": "Croma"
      }
    ],
    "rating": 4.3,
    "reviewCount": 433,
    "popularity": 72,
    "tags": [
      "intel",
      "portable",
      "laptops",
      "laptop",
      "amd",
      "asus",
      "gaming",
      "computer"
    ]
  },
  {
    "id": "prod-027",
    "title": "ASUS TUF Gaming A15 (Ryzen 7 7735HS, RTX 4050, 16GB)",
    "brand": "ASUS",
    "category": "Laptops",
    "imageUrl": "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80",
    "description": "ASUS TUF Gaming A15 (Ryzen 7 7735HS, RTX 4050, 16GB). Premium quality laptops by ASUS. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "flipkart",
        "store": "Flipkart",
        "price": 78550,
        "mrp": 94990,
        "url": "https://flipkart.com/product/asus-tuf-gaming-a15-ryzen-7-7735hs-/p/prod-027",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "ajio",
        "store": "Ajio",
        "price": 79430,
        "mrp": 94990,
        "url": "https://ajio.com/product/asus-tuf-gaming-a15-ryzen-7-7735hs-/p/prod-027",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "myntra",
        "store": "Myntra",
        "price": 79430,
        "mrp": 94990,
        "url": "https://myntra.com/product/asus-tuf-gaming-a15-ryzen-7-7735hs-/p/prod-027",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 71920,
        "store": "Flipkart"
      },
      {
        "date": "2026-08-01",
        "price": 69440,
        "store": "Ajio"
      },
      {
        "date": "2026-08-15",
        "price": 72300,
        "store": "Flipkart"
      },
      {
        "date": "2026-09-01",
        "price": 75570,
        "store": "Myntra"
      },
      {
        "date": "2026-09-15",
        "price": 72430,
        "store": "Myntra"
      },
      {
        "date": "2026-10-01",
        "price": 69040,
        "store": "Ajio"
      },
      {
        "date": "2026-10-15",
        "price": 72140,
        "store": "Ajio"
      },
      {
        "date": "2026-10-24",
        "price": 73180,
        "store": "Flipkart"
      }
    ],
    "rating": 4.8,
    "reviewCount": 18075,
    "popularity": 70,
    "tags": [
      "intel",
      "portable",
      "laptops",
      "laptop",
      "amd",
      "asus",
      "gaming",
      "computer"
    ]
  },
  {
    "id": "prod-028",
    "title": "Dell XPS 13 Plus (Intel Core i7 13th Gen, 16GB, 1TB SSD, 4K)",
    "brand": "Dell",
    "category": "Laptops",
    "imageUrl": "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=600&q=80",
    "description": "Dell XPS 13 Plus (Intel Core i7 13th Gen, 16GB, 1TB SSD, 4K). Premium quality laptops by Dell. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "myntra",
        "store": "Myntra",
        "price": 167480,
        "mrp": 199990,
        "url": "https://myntra.com/product/dell-xps-13-plus-intel-core-i7-13th/p/prod-028",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "flipkart",
        "store": "Flipkart",
        "price": 166450,
        "mrp": 199990,
        "url": "https://flipkart.com/product/dell-xps-13-plus-intel-core-i7-13th/p/prod-028",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "croma",
        "store": "Croma",
        "price": 178450,
        "mrp": 199990,
        "url": "https://croma.com/product/dell-xps-13-plus-intel-core-i7-13th/p/prod-028",
        "inStock": false,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 166200,
        "store": "Flipkart"
      },
      {
        "date": "2026-08-01",
        "price": 167030,
        "store": "Croma"
      },
      {
        "date": "2026-08-15",
        "price": 167910,
        "store": "Myntra"
      },
      {
        "date": "2026-09-01",
        "price": 174580,
        "store": "Croma"
      },
      {
        "date": "2026-09-15",
        "price": 168400,
        "store": "Myntra"
      },
      {
        "date": "2026-10-01",
        "price": 166080,
        "store": "Croma"
      },
      {
        "date": "2026-10-15",
        "price": 162700,
        "store": "Flipkart"
      },
      {
        "date": "2026-10-24",
        "price": 165370,
        "store": "Flipkart"
      }
    ],
    "rating": 4.5,
    "reviewCount": 6483,
    "popularity": 84,
    "tags": [
      "intel",
      "portable",
      "laptops",
      "laptop",
      "amd",
      "dell",
      "gaming",
      "computer"
    ]
  },
  {
    "id": "prod-029",
    "title": "Dell Inspiron 15 3520 (Intel Core i5 12th Gen, 16GB, 512GB)",
    "brand": "Dell",
    "category": "Laptops",
    "imageUrl": "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=600&q=80",
    "description": "Dell Inspiron 15 3520 (Intel Core i5 12th Gen, 16GB, 512GB). Premium quality laptops by Dell. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "flipkart",
        "store": "Flipkart",
        "price": 47660,
        "mrp": 62990,
        "url": "https://flipkart.com/product/dell-inspiron-15-3520-intel-core-i5/p/prod-029",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "croma",
        "store": "Croma",
        "price": 47410,
        "mrp": 62990,
        "url": "https://croma.com/product/dell-inspiron-15-3520-intel-core-i5/p/prod-029",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "amazon",
        "store": "Amazon",
        "price": 46370,
        "mrp": 62990,
        "url": "https://amazon.in/dp/dell-inspiron-15-3520-intel-core-i5/prod-029",
        "inStock": false,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 45760,
        "store": "Croma"
      },
      {
        "date": "2026-08-01",
        "price": 44710,
        "store": "Amazon"
      },
      {
        "date": "2026-08-15",
        "price": 44390,
        "store": "Flipkart"
      },
      {
        "date": "2026-09-01",
        "price": 45140,
        "store": "Flipkart"
      },
      {
        "date": "2026-09-15",
        "price": 44960,
        "store": "Flipkart"
      },
      {
        "date": "2026-10-01",
        "price": 43600,
        "store": "Croma"
      },
      {
        "date": "2026-10-15",
        "price": 41560,
        "store": "Flipkart"
      },
      {
        "date": "2026-10-24",
        "price": 39520,
        "store": "Flipkart"
      }
    ],
    "rating": 4.8,
    "reviewCount": 16419,
    "popularity": 83,
    "tags": [
      "intel",
      "portable",
      "laptops",
      "laptop",
      "amd",
      "dell",
      "gaming",
      "computer"
    ]
  },
  {
    "id": "prod-030",
    "title": "Dell Alienware m16 R2 (Intel Core Ultra 9, RTX 4070, 32GB)",
    "brand": "Dell",
    "category": "Laptops",
    "imageUrl": "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=600&q=80",
    "description": "Dell Alienware m16 R2 (Intel Core Ultra 9, RTX 4070, 32GB). Premium quality laptops by Dell. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "myntra",
        "store": "Myntra",
        "price": 219020,
        "mrp": 269990,
        "url": "https://myntra.com/product/dell-alienware-m16-r2-intel-core-ul/p/prod-030",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "amazon",
        "store": "Amazon",
        "price": 228950,
        "mrp": 269990,
        "url": "https://amazon.in/dp/dell-alienware-m16-r2-intel-core-ul/prod-030",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "flipkart",
        "store": "Flipkart",
        "price": 220720,
        "mrp": 269990,
        "url": "https://flipkart.com/product/dell-alienware-m16-r2-intel-core-ul/p/prod-030",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 229340,
        "store": "Amazon"
      },
      {
        "date": "2026-08-01",
        "price": 221460,
        "store": "Amazon"
      },
      {
        "date": "2026-08-15",
        "price": 220890,
        "store": "Flipkart"
      },
      {
        "date": "2026-09-01",
        "price": 223940,
        "store": "Flipkart"
      },
      {
        "date": "2026-09-15",
        "price": 215390,
        "store": "Flipkart"
      },
      {
        "date": "2026-10-01",
        "price": 212120,
        "store": "Amazon"
      },
      {
        "date": "2026-10-15",
        "price": 210880,
        "store": "Flipkart"
      },
      {
        "date": "2026-10-24",
        "price": 216520,
        "store": "Flipkart"
      }
    ],
    "rating": 4.8,
    "reviewCount": 1196,
    "popularity": 87,
    "tags": [
      "intel",
      "portable",
      "laptops",
      "laptop",
      "amd",
      "dell",
      "gaming",
      "computer"
    ]
  },
  {
    "id": "prod-031",
    "title": "HP Spectre x360 2-in-1 OLED (Intel Core Ultra 7, 32GB, 1TB)",
    "brand": "HP",
    "category": "Laptops",
    "imageUrl": "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=600&q=80",
    "description": "HP Spectre x360 2-in-1 OLED (Intel Core Ultra 7, 32GB, 1TB). Premium quality laptops by HP. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "myntra",
        "store": "Myntra",
        "price": 170490,
        "mrp": 189990,
        "url": "https://myntra.com/product/hp-spectre-x360-2-in-1-oled-intel-c/p/prod-031",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "amazon",
        "store": "Amazon",
        "price": 172840,
        "mrp": 189990,
        "url": "https://amazon.in/dp/hp-spectre-x360-2-in-1-oled-intel-c/prod-031",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "ajio",
        "store": "Ajio",
        "price": 155690,
        "mrp": 189990,
        "url": "https://ajio.com/product/hp-spectre-x360-2-in-1-oled-intel-c/p/prod-031",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 170480,
        "store": "Ajio"
      },
      {
        "date": "2026-08-01",
        "price": 172780,
        "store": "Ajio"
      },
      {
        "date": "2026-08-15",
        "price": 173900,
        "store": "Ajio"
      },
      {
        "date": "2026-09-01",
        "price": 175690,
        "store": "Amazon"
      },
      {
        "date": "2026-09-15",
        "price": 175070,
        "store": "Myntra"
      },
      {
        "date": "2026-10-01",
        "price": 178010,
        "store": "Ajio"
      },
      {
        "date": "2026-10-15",
        "price": 180310,
        "store": "Myntra"
      },
      {
        "date": "2026-10-24",
        "price": 179800,
        "store": "Myntra"
      }
    ],
    "rating": 4.6,
    "reviewCount": 13686,
    "popularity": 75,
    "tags": [
      "intel",
      "portable",
      "laptops",
      "laptop",
      "amd",
      "hp",
      "gaming",
      "computer"
    ]
  },
  {
    "id": "prod-032",
    "title": "HP Pavilion 15 (AMD Ryzen 5 7530U, 16GB, 512GB SSD)",
    "brand": "HP",
    "category": "Laptops",
    "imageUrl": "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80",
    "description": "HP Pavilion 15 (AMD Ryzen 5 7530U, 16GB, 512GB SSD). Premium quality laptops by HP. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "flipkart",
        "store": "Flipkart",
        "price": 55650,
        "mrp": 66990,
        "url": "https://flipkart.com/product/hp-pavilion-15-amd-ryzen-5-7530u-16/p/prod-032",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "croma",
        "store": "Croma",
        "price": 54140,
        "mrp": 66990,
        "url": "https://croma.com/product/hp-pavilion-15-amd-ryzen-5-7530u-16/p/prod-032",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "myntra",
        "store": "Myntra",
        "price": 54020,
        "mrp": 66990,
        "url": "https://myntra.com/product/hp-pavilion-15-amd-ryzen-5-7530u-16/p/prod-032",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "ajio",
        "store": "Ajio",
        "price": 50850,
        "mrp": 66990,
        "url": "https://ajio.com/product/hp-pavilion-15-amd-ryzen-5-7530u-16/p/prod-032",
        "inStock": false,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 51990,
        "store": "Ajio"
      },
      {
        "date": "2026-08-01",
        "price": 50050,
        "store": "Ajio"
      },
      {
        "date": "2026-08-15",
        "price": 51810,
        "store": "Myntra"
      },
      {
        "date": "2026-09-01",
        "price": 51110,
        "store": "Flipkart"
      },
      {
        "date": "2026-09-15",
        "price": 48600,
        "store": "Flipkart"
      },
      {
        "date": "2026-10-01",
        "price": 50020,
        "store": "Flipkart"
      },
      {
        "date": "2026-10-15",
        "price": 49160,
        "store": "Flipkart"
      },
      {
        "date": "2026-10-24",
        "price": 49750,
        "store": "Croma"
      }
    ],
    "rating": 4.4,
    "reviewCount": 9770,
    "popularity": 83,
    "tags": [
      "intel",
      "portable",
      "laptops",
      "laptop",
      "amd",
      "hp",
      "gaming",
      "computer"
    ]
  },
  {
    "id": "prod-033",
    "title": "HP Omen 16 Gaming (Intel Core i7 14th Gen, RTX 4070, 16GB)",
    "brand": "HP",
    "category": "Laptops",
    "imageUrl": "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=600&q=80",
    "description": "HP Omen 16 Gaming (Intel Core i7 14th Gen, RTX 4070, 16GB). Premium quality laptops by HP. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "myntra",
        "store": "Myntra",
        "price": 143060,
        "mrp": 179990,
        "url": "https://myntra.com/product/hp-omen-16-gaming-intel-core-i7-14t/p/prod-033",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "amazon",
        "store": "Amazon",
        "price": 147210,
        "mrp": 179990,
        "url": "https://amazon.in/dp/hp-omen-16-gaming-intel-core-i7-14t/prod-033",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "flipkart",
        "store": "Flipkart",
        "price": 144450,
        "mrp": 179990,
        "url": "https://flipkart.com/product/hp-omen-16-gaming-intel-core-i7-14t/p/prod-033",
        "inStock": false,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 155390,
        "store": "Myntra"
      },
      {
        "date": "2026-08-01",
        "price": 148600,
        "store": "Flipkart"
      },
      {
        "date": "2026-08-15",
        "price": 154170,
        "store": "Amazon"
      },
      {
        "date": "2026-09-01",
        "price": 161650,
        "store": "Amazon"
      },
      {
        "date": "2026-09-15",
        "price": 162890,
        "store": "Flipkart"
      },
      {
        "date": "2026-10-01",
        "price": 162620,
        "store": "Amazon"
      },
      {
        "date": "2026-10-15",
        "price": 163570,
        "store": "Myntra"
      },
      {
        "date": "2026-10-24",
        "price": 170590,
        "store": "Myntra"
      }
    ],
    "rating": 4.3,
    "reviewCount": 5906,
    "popularity": 96,
    "tags": [
      "intel",
      "portable",
      "laptops",
      "laptop",
      "amd",
      "hp",
      "gaming",
      "computer"
    ]
  },
  {
    "id": "prod-034",
    "title": "Lenovo ThinkPad X1 Carbon Gen 11 (Core i7, 16GB, 1TB)",
    "brand": "Lenovo",
    "category": "Laptops",
    "imageUrl": "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=600&q=80",
    "description": "Lenovo ThinkPad X1 Carbon Gen 11 (Core i7, 16GB, 1TB). Premium quality laptops by Lenovo. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "croma",
        "store": "Croma",
        "price": 174140,
        "mrp": 215990,
        "url": "https://croma.com/product/lenovo-thinkpad-x1-carbon-gen-11-co/p/prod-034",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "amazon",
        "store": "Amazon",
        "price": 175420,
        "mrp": 215990,
        "url": "https://amazon.in/dp/lenovo-thinkpad-x1-carbon-gen-11-co/prod-034",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "flipkart",
        "store": "Flipkart",
        "price": 178540,
        "mrp": 215990,
        "url": "https://flipkart.com/product/lenovo-thinkpad-x1-carbon-gen-11-co/p/prod-034",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 188570,
        "store": "Croma"
      },
      {
        "date": "2026-08-01",
        "price": 194680,
        "store": "Amazon"
      },
      {
        "date": "2026-08-15",
        "price": 185880,
        "store": "Amazon"
      },
      {
        "date": "2026-09-01",
        "price": 189770,
        "store": "Amazon"
      },
      {
        "date": "2026-09-15",
        "price": 193320,
        "store": "Croma"
      },
      {
        "date": "2026-10-01",
        "price": 200210,
        "store": "Amazon"
      },
      {
        "date": "2026-10-15",
        "price": 193250,
        "store": "Flipkart"
      },
      {
        "date": "2026-10-24",
        "price": 187060,
        "store": "Amazon"
      }
    ],
    "rating": 4.4,
    "reviewCount": 15484,
    "popularity": 72,
    "tags": [
      "intel",
      "portable",
      "laptops",
      "laptop",
      "amd",
      "gaming",
      "lenovo",
      "computer"
    ]
  },
  {
    "id": "prod-035",
    "title": "Lenovo Legion Pro 5i (Core i9 14th Gen, RTX 4070 8GB, 32GB)",
    "brand": "Lenovo",
    "category": "Laptops",
    "imageUrl": "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=600&q=80",
    "description": "Lenovo Legion Pro 5i (Core i9 14th Gen, RTX 4070 8GB, 32GB). Premium quality laptops by Lenovo. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "flipkart",
        "store": "Flipkart",
        "price": 180280,
        "mrp": 209990,
        "url": "https://flipkart.com/product/lenovo-legion-pro-5i-core-i9-14th-g/p/prod-035",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "ajio",
        "store": "Ajio",
        "price": 173830,
        "mrp": 209990,
        "url": "https://ajio.com/product/lenovo-legion-pro-5i-core-i9-14th-g/p/prod-035",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "amazon",
        "store": "Amazon",
        "price": 176120,
        "mrp": 209990,
        "url": "https://amazon.in/dp/lenovo-legion-pro-5i-core-i9-14th-g/prod-035",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "myntra",
        "store": "Myntra",
        "price": 173020,
        "mrp": 209990,
        "url": "https://myntra.com/product/lenovo-legion-pro-5i-core-i9-14th-g/p/prod-035",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 168640,
        "store": "Myntra"
      },
      {
        "date": "2026-08-01",
        "price": 167580,
        "store": "Myntra"
      },
      {
        "date": "2026-08-15",
        "price": 172840,
        "store": "Myntra"
      },
      {
        "date": "2026-09-01",
        "price": 172530,
        "store": "Amazon"
      },
      {
        "date": "2026-09-15",
        "price": 171690,
        "store": "Myntra"
      },
      {
        "date": "2026-10-01",
        "price": 168540,
        "store": "Amazon"
      },
      {
        "date": "2026-10-15",
        "price": 169450,
        "store": "Ajio"
      },
      {
        "date": "2026-10-24",
        "price": 169290,
        "store": "Amazon"
      }
    ],
    "rating": 4.8,
    "reviewCount": 18108,
    "popularity": 91,
    "tags": [
      "intel",
      "portable",
      "laptops",
      "laptop",
      "amd",
      "gaming",
      "lenovo",
      "computer"
    ]
  },
  {
    "id": "prod-036",
    "title": "Lenovo IdeaPad Slim 3 (Core i3 12th Gen, 8GB, 512GB SSD)",
    "brand": "Lenovo",
    "category": "Laptops",
    "imageUrl": "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=600&q=80",
    "description": "Lenovo IdeaPad Slim 3 (Core i3 12th Gen, 8GB, 512GB SSD). Premium quality laptops by Lenovo. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "ajio",
        "store": "Ajio",
        "price": 36870,
        "mrp": 46990,
        "url": "https://ajio.com/product/lenovo-ideapad-slim-3-core-i3-12th-/p/prod-036",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "flipkart",
        "store": "Flipkart",
        "price": 35240,
        "mrp": 46990,
        "url": "https://flipkart.com/product/lenovo-ideapad-slim-3-core-i3-12th-/p/prod-036",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "myntra",
        "store": "Myntra",
        "price": 34800,
        "mrp": 46990,
        "url": "https://myntra.com/product/lenovo-ideapad-slim-3-core-i3-12th-/p/prod-036",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "croma",
        "store": "Croma",
        "price": 36840,
        "mrp": 46990,
        "url": "https://croma.com/product/lenovo-ideapad-slim-3-core-i3-12th-/p/prod-036",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 35540,
        "store": "Croma"
      },
      {
        "date": "2026-08-01",
        "price": 35400,
        "store": "Croma"
      },
      {
        "date": "2026-08-15",
        "price": 35950,
        "store": "Flipkart"
      },
      {
        "date": "2026-09-01",
        "price": 37500,
        "store": "Croma"
      },
      {
        "date": "2026-09-15",
        "price": 38970,
        "store": "Ajio"
      },
      {
        "date": "2026-10-01",
        "price": 37600,
        "store": "Ajio"
      },
      {
        "date": "2026-10-15",
        "price": 38850,
        "store": "Croma"
      },
      {
        "date": "2026-10-24",
        "price": 40690,
        "store": "Myntra"
      }
    ],
    "rating": 4.3,
    "reviewCount": 7770,
    "popularity": 75,
    "tags": [
      "intel",
      "portable",
      "laptops",
      "laptop",
      "amd",
      "gaming",
      "lenovo",
      "computer"
    ]
  },
  {
    "id": "prod-037",
    "title": "Acer Predator Helios 16 (Core i9 13th Gen, RTX 4080, 32GB)",
    "brand": "Acer",
    "category": "Laptops",
    "imageUrl": "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80",
    "description": "Acer Predator Helios 16 (Core i9 13th Gen, RTX 4080, 32GB). Premium quality laptops by Acer. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "myntra",
        "store": "Myntra",
        "price": 211650,
        "mrp": 259990,
        "url": "https://myntra.com/product/acer-predator-helios-16-core-i9-13t/p/prod-037",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "ajio",
        "store": "Ajio",
        "price": 228990,
        "mrp": 259990,
        "url": "https://ajio.com/product/acer-predator-helios-16-core-i9-13t/p/prod-037",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "croma",
        "store": "Croma",
        "price": 208360,
        "mrp": 259990,
        "url": "https://croma.com/product/acer-predator-helios-16-core-i9-13t/p/prod-037",
        "inStock": false,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 220780,
        "store": "Myntra"
      },
      {
        "date": "2026-08-01",
        "price": 210340,
        "store": "Croma"
      },
      {
        "date": "2026-08-15",
        "price": 208230,
        "store": "Myntra"
      },
      {
        "date": "2026-09-01",
        "price": 208630,
        "store": "Croma"
      },
      {
        "date": "2026-09-15",
        "price": 218180,
        "store": "Myntra"
      },
      {
        "date": "2026-10-01",
        "price": 220390,
        "store": "Croma"
      },
      {
        "date": "2026-10-15",
        "price": 216980,
        "store": "Myntra"
      },
      {
        "date": "2026-10-24",
        "price": 215660,
        "store": "Myntra"
      }
    ],
    "rating": 4.7,
    "reviewCount": 1824,
    "popularity": 67,
    "tags": [
      "intel",
      "portable",
      "laptops",
      "laptop",
      "amd",
      "gaming",
      "computer",
      "acer"
    ]
  },
  {
    "id": "prod-038",
    "title": "MSI Katana 15 Gaming (Core i7 13th Gen, RTX 4050, 16GB)",
    "brand": "MSI",
    "category": "Laptops",
    "imageUrl": "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=600&q=80",
    "description": "MSI Katana 15 Gaming (Core i7 13th Gen, RTX 4050, 16GB). Premium quality laptops by MSI. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "amazon",
        "store": "Amazon",
        "price": 82320,
        "mrp": 99990,
        "url": "https://amazon.in/dp/msi-katana-15-gaming-core-i7-13th-g/prod-038",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "flipkart",
        "store": "Flipkart",
        "price": 78360,
        "mrp": 99990,
        "url": "https://flipkart.com/product/msi-katana-15-gaming-core-i7-13th-g/p/prod-038",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "myntra",
        "store": "Myntra",
        "price": 76400,
        "mrp": 99990,
        "url": "https://myntra.com/product/msi-katana-15-gaming-core-i7-13th-g/p/prod-038",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "ajio",
        "store": "Ajio",
        "price": 84230,
        "mrp": 99990,
        "url": "https://ajio.com/product/msi-katana-15-gaming-core-i7-13th-g/p/prod-038",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 76850,
        "store": "Amazon"
      },
      {
        "date": "2026-08-01",
        "price": 77800,
        "store": "Flipkart"
      },
      {
        "date": "2026-08-15",
        "price": 76950,
        "store": "Flipkart"
      },
      {
        "date": "2026-09-01",
        "price": 79880,
        "store": "Myntra"
      },
      {
        "date": "2026-09-15",
        "price": 83490,
        "store": "Amazon"
      },
      {
        "date": "2026-10-01",
        "price": 80050,
        "store": "Amazon"
      },
      {
        "date": "2026-10-15",
        "price": 79600,
        "store": "Amazon"
      },
      {
        "date": "2026-10-24",
        "price": 83330,
        "store": "Flipkart"
      }
    ],
    "rating": 4.3,
    "reviewCount": 17684,
    "popularity": 88,
    "tags": [
      "intel",
      "portable",
      "laptops",
      "laptop",
      "amd",
      "msi",
      "gaming",
      "computer"
    ]
  },
  {
    "id": "prod-039",
    "title": "Sony WH-1000XM5 Wireless Noise Cancelling Headphones (Black)",
    "brand": "Sony",
    "category": "Headphones",
    "imageUrl": "https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?auto=format&fit=crop&w=600&q=80",
    "description": "Sony WH-1000XM5 Wireless Noise Cancelling Headphones (Black). Premium quality headphones by Sony. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "amazon",
        "store": "Amazon",
        "price": 26400,
        "mrp": 34990,
        "url": "https://amazon.in/dp/sony-wh-1000xm5-wireless-noise-canc/prod-039",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "flipkart",
        "store": "Flipkart",
        "price": 25870,
        "mrp": 34990,
        "url": "https://flipkart.com/product/sony-wh-1000xm5-wireless-noise-canc/p/prod-039",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "ajio",
        "store": "Ajio",
        "price": 25670,
        "mrp": 34990,
        "url": "https://ajio.com/product/sony-wh-1000xm5-wireless-noise-canc/p/prod-039",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 28290,
        "store": "Flipkart"
      },
      {
        "date": "2026-08-01",
        "price": 28990,
        "store": "Amazon"
      },
      {
        "date": "2026-08-15",
        "price": 28730,
        "store": "Ajio"
      },
      {
        "date": "2026-09-01",
        "price": 29660,
        "store": "Ajio"
      },
      {
        "date": "2026-09-15",
        "price": 28190,
        "store": "Flipkart"
      },
      {
        "date": "2026-10-01",
        "price": 27410,
        "store": "Amazon"
      },
      {
        "date": "2026-10-15",
        "price": 27920,
        "store": "Ajio"
      },
      {
        "date": "2026-10-24",
        "price": 28040,
        "store": "Amazon"
      }
    ],
    "rating": 4.9,
    "reviewCount": 8056,
    "popularity": 82,
    "tags": [
      "earbuds",
      "headphones",
      "sony",
      "tws",
      "anc",
      "wireless",
      "audio",
      "bluetooth"
    ]
  },
  {
    "id": "prod-040",
    "title": "Sony WH-1000XM4 Industry Leading Wireless Noise Cancelling",
    "brand": "Sony",
    "category": "Headphones",
    "imageUrl": "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=600&q=80",
    "description": "Sony WH-1000XM4 Industry Leading Wireless Noise Cancelling. Premium quality headphones by Sony. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "myntra",
        "store": "Myntra",
        "price": 20720,
        "mrp": 29990,
        "url": "https://myntra.com/product/sony-wh-1000xm4-industry-leading-wi/p/prod-040",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "croma",
        "store": "Croma",
        "price": 19310,
        "mrp": 29990,
        "url": "https://croma.com/product/sony-wh-1000xm4-industry-leading-wi/p/prod-040",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "flipkart",
        "store": "Flipkart",
        "price": 20350,
        "mrp": 29990,
        "url": "https://flipkart.com/product/sony-wh-1000xm4-industry-leading-wi/p/prod-040",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "ajio",
        "store": "Ajio",
        "price": 20620,
        "mrp": 29990,
        "url": "https://ajio.com/product/sony-wh-1000xm4-industry-leading-wi/p/prod-040",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 20710,
        "store": "Ajio"
      },
      {
        "date": "2026-08-01",
        "price": 20370,
        "store": "Croma"
      },
      {
        "date": "2026-08-15",
        "price": 20330,
        "store": "Ajio"
      },
      {
        "date": "2026-09-01",
        "price": 20140,
        "store": "Flipkart"
      },
      {
        "date": "2026-09-15",
        "price": 20980,
        "store": "Flipkart"
      },
      {
        "date": "2026-10-01",
        "price": 21550,
        "store": "Flipkart"
      },
      {
        "date": "2026-10-15",
        "price": 20630,
        "store": "Croma"
      },
      {
        "date": "2026-10-24",
        "price": 19940,
        "store": "Myntra"
      }
    ],
    "rating": 4.1,
    "reviewCount": 9988,
    "popularity": 67,
    "tags": [
      "earbuds",
      "headphones",
      "sony",
      "tws",
      "anc",
      "wireless",
      "audio",
      "bluetooth"
    ]
  },
  {
    "id": "prod-041",
    "title": "Sony WF-1000XM5 True Wireless Noise Cancelling Earbuds",
    "brand": "Sony",
    "category": "Headphones",
    "imageUrl": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
    "description": "Sony WF-1000XM5 True Wireless Noise Cancelling Earbuds. Premium quality headphones by Sony. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "amazon",
        "store": "Amazon",
        "price": 20070,
        "mrp": 24990,
        "url": "https://amazon.in/dp/sony-wf-1000xm5-true-wireless-noise/prod-041",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "flipkart",
        "store": "Flipkart",
        "price": 20930,
        "mrp": 24990,
        "url": "https://flipkart.com/product/sony-wf-1000xm5-true-wireless-noise/p/prod-041",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "croma",
        "store": "Croma",
        "price": 19570,
        "mrp": 24990,
        "url": "https://croma.com/product/sony-wf-1000xm5-true-wireless-noise/p/prod-041",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 19340,
        "store": "Amazon"
      },
      {
        "date": "2026-08-01",
        "price": 19270,
        "store": "Flipkart"
      },
      {
        "date": "2026-08-15",
        "price": 19490,
        "store": "Amazon"
      },
      {
        "date": "2026-09-01",
        "price": 19440,
        "store": "Flipkart"
      },
      {
        "date": "2026-09-15",
        "price": 20330,
        "store": "Amazon"
      },
      {
        "date": "2026-10-01",
        "price": 20770,
        "store": "Amazon"
      },
      {
        "date": "2026-10-15",
        "price": 20090,
        "store": "Amazon"
      },
      {
        "date": "2026-10-24",
        "price": 20410,
        "store": "Flipkart"
      }
    ],
    "rating": 4.4,
    "reviewCount": 3604,
    "popularity": 89,
    "tags": [
      "earbuds",
      "headphones",
      "sony",
      "tws",
      "anc",
      "wireless",
      "audio",
      "bluetooth"
    ]
  },
  {
    "id": "prod-042",
    "title": "Apple AirPods Pro 2nd Gen (USB-C with Active Noise Cancellation)",
    "brand": "Apple",
    "category": "Headphones",
    "imageUrl": "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=600&q=80",
    "description": "Apple AirPods Pro 2nd Gen (USB-C with Active Noise Cancellation). Premium quality headphones by Apple. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "amazon",
        "store": "Amazon",
        "price": 20680,
        "mrp": 24900,
        "url": "https://amazon.in/dp/apple-airpods-pro-2nd-gen-usb-c-wit/prod-042",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "flipkart",
        "store": "Flipkart",
        "price": 20770,
        "mrp": 24900,
        "url": "https://flipkart.com/product/apple-airpods-pro-2nd-gen-usb-c-wit/p/prod-042",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "ajio",
        "store": "Ajio",
        "price": 21800,
        "mrp": 24900,
        "url": "https://ajio.com/product/apple-airpods-pro-2nd-gen-usb-c-wit/p/prod-042",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 20790,
        "store": "Flipkart"
      },
      {
        "date": "2026-08-01",
        "price": 21170,
        "store": "Flipkart"
      },
      {
        "date": "2026-08-15",
        "price": 22130,
        "store": "Amazon"
      },
      {
        "date": "2026-09-01",
        "price": 22290,
        "store": "Ajio"
      },
      {
        "date": "2026-09-15",
        "price": 21650,
        "store": "Ajio"
      },
      {
        "date": "2026-10-01",
        "price": 21930,
        "store": "Flipkart"
      },
      {
        "date": "2026-10-15",
        "price": 21230,
        "store": "Flipkart"
      },
      {
        "date": "2026-10-24",
        "price": 21930,
        "store": "Amazon"
      }
    ],
    "rating": 4.6,
    "reviewCount": 4250,
    "popularity": 90,
    "tags": [
      "apple",
      "earbuds",
      "headphones",
      "tws",
      "anc",
      "wireless",
      "audio",
      "bluetooth"
    ]
  },
  {
    "id": "prod-043",
    "title": "Apple AirPods 4 (Active Noise Cancellation, MagSafe Case)",
    "brand": "Apple",
    "category": "Headphones",
    "imageUrl": "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=600&q=80",
    "description": "Apple AirPods 4 (Active Noise Cancellation, MagSafe Case). Premium quality headphones by Apple. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "myntra",
        "store": "Myntra",
        "price": 18000,
        "mrp": 19900,
        "url": "https://myntra.com/product/apple-airpods-4-active-noise-cancel/p/prod-043",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "croma",
        "store": "Croma",
        "price": 18620,
        "mrp": 19900,
        "url": "https://croma.com/product/apple-airpods-4-active-noise-cancel/p/prod-043",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "ajio",
        "store": "Ajio",
        "price": 17100,
        "mrp": 19900,
        "url": "https://ajio.com/product/apple-airpods-4-active-noise-cancel/p/prod-043",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 18100,
        "store": "Ajio"
      },
      {
        "date": "2026-08-01",
        "price": 18890,
        "store": "Croma"
      },
      {
        "date": "2026-08-15",
        "price": 19650,
        "store": "Ajio"
      },
      {
        "date": "2026-09-01",
        "price": 18750,
        "store": "Myntra"
      },
      {
        "date": "2026-09-15",
        "price": 18410,
        "store": "Ajio"
      },
      {
        "date": "2026-10-01",
        "price": 18010,
        "store": "Myntra"
      },
      {
        "date": "2026-10-15",
        "price": 18760,
        "store": "Myntra"
      },
      {
        "date": "2026-10-24",
        "price": 19210,
        "store": "Myntra"
      }
    ],
    "rating": 4.2,
    "reviewCount": 10227,
    "popularity": 90,
    "tags": [
      "apple",
      "earbuds",
      "headphones",
      "tws",
      "anc",
      "wireless",
      "audio",
      "bluetooth"
    ]
  },
  {
    "id": "prod-044",
    "title": "Apple AirPods Max Wireless Over-Ear Headphones (Silver)",
    "brand": "Apple",
    "category": "Headphones",
    "imageUrl": "https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?auto=format&fit=crop&w=600&q=80",
    "description": "Apple AirPods Max Wireless Over-Ear Headphones (Silver). Premium quality headphones by Apple. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "amazon",
        "store": "Amazon",
        "price": 54710,
        "mrp": 59900,
        "url": "https://amazon.in/dp/apple-airpods-max-wireless-over-ear/prod-044",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "flipkart",
        "store": "Flipkart",
        "price": 57220,
        "mrp": 59900,
        "url": "https://flipkart.com/product/apple-airpods-max-wireless-over-ear/p/prod-044",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "myntra",
        "store": "Myntra",
        "price": 52670,
        "mrp": 59900,
        "url": "https://myntra.com/product/apple-airpods-max-wireless-over-ear/p/prod-044",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 54110,
        "store": "Flipkart"
      },
      {
        "date": "2026-08-01",
        "price": 52580,
        "store": "Myntra"
      },
      {
        "date": "2026-08-15",
        "price": 50170,
        "store": "Flipkart"
      },
      {
        "date": "2026-09-01",
        "price": 48230,
        "store": "Flipkart"
      },
      {
        "date": "2026-09-15",
        "price": 46210,
        "store": "Amazon"
      },
      {
        "date": "2026-10-01",
        "price": 46970,
        "store": "Flipkart"
      },
      {
        "date": "2026-10-15",
        "price": 45390,
        "store": "Amazon"
      },
      {
        "date": "2026-10-24",
        "price": 45580,
        "store": "Myntra"
      }
    ],
    "rating": 4.8,
    "reviewCount": 2967,
    "popularity": 83,
    "tags": [
      "apple",
      "earbuds",
      "headphones",
      "tws",
      "anc",
      "wireless",
      "audio",
      "bluetooth"
    ]
  },
  {
    "id": "prod-045",
    "title": "Bose QuietComfort Ultra Wireless Noise Cancelling Headphones",
    "brand": "Bose",
    "category": "Headphones",
    "imageUrl": "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=600&q=80",
    "description": "Bose QuietComfort Ultra Wireless Noise Cancelling Headphones. Premium quality headphones by Bose. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "flipkart",
        "store": "Flipkart",
        "price": 35830,
        "mrp": 39900,
        "url": "https://flipkart.com/product/bose-quietcomfort-ultra-wireless-no/p/prod-045",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "croma",
        "store": "Croma",
        "price": 35190,
        "mrp": 39900,
        "url": "https://croma.com/product/bose-quietcomfort-ultra-wireless-no/p/prod-045",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "ajio",
        "store": "Ajio",
        "price": 34480,
        "mrp": 39900,
        "url": "https://ajio.com/product/bose-quietcomfort-ultra-wireless-no/p/prod-045",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "amazon",
        "store": "Amazon",
        "price": 33990,
        "mrp": 39900,
        "url": "https://amazon.in/dp/bose-quietcomfort-ultra-wireless-no/prod-045",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 35700,
        "store": "Croma"
      },
      {
        "date": "2026-08-01",
        "price": 36560,
        "store": "Croma"
      },
      {
        "date": "2026-08-15",
        "price": 35050,
        "store": "Ajio"
      },
      {
        "date": "2026-09-01",
        "price": 34820,
        "store": "Flipkart"
      },
      {
        "date": "2026-09-15",
        "price": 33700,
        "store": "Croma"
      },
      {
        "date": "2026-10-01",
        "price": 33620,
        "store": "Flipkart"
      },
      {
        "date": "2026-10-15",
        "price": 34690,
        "store": "Croma"
      },
      {
        "date": "2026-10-24",
        "price": 34240,
        "store": "Flipkart"
      }
    ],
    "rating": 4.4,
    "reviewCount": 12210,
    "popularity": 97,
    "tags": [
      "earbuds",
      "headphones",
      "bose",
      "tws",
      "anc",
      "wireless",
      "audio",
      "bluetooth"
    ]
  },
  {
    "id": "prod-046",
    "title": "Bose QuietComfort Ultra Earbuds (Spatial Audio, Black)",
    "brand": "Bose",
    "category": "Headphones",
    "imageUrl": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
    "description": "Bose QuietComfort Ultra Earbuds (Spatial Audio, Black). Premium quality headphones by Bose. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "croma",
        "store": "Croma",
        "price": 25020,
        "mrp": 28900,
        "url": "https://croma.com/product/bose-quietcomfort-ultra-earbuds-spa/p/prod-046",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "ajio",
        "store": "Ajio",
        "price": 23700,
        "mrp": 28900,
        "url": "https://ajio.com/product/bose-quietcomfort-ultra-earbuds-spa/p/prod-046",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "amazon",
        "store": "Amazon",
        "price": 25400,
        "mrp": 28900,
        "url": "https://amazon.in/dp/bose-quietcomfort-ultra-earbuds-spa/prod-046",
        "inStock": false,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "flipkart",
        "store": "Flipkart",
        "price": 23680,
        "mrp": 28900,
        "url": "https://flipkart.com/product/bose-quietcomfort-ultra-earbuds-spa/p/prod-046",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 24270,
        "store": "Amazon"
      },
      {
        "date": "2026-08-01",
        "price": 25350,
        "store": "Amazon"
      },
      {
        "date": "2026-08-15",
        "price": 24590,
        "store": "Amazon"
      },
      {
        "date": "2026-09-01",
        "price": 25590,
        "store": "Ajio"
      },
      {
        "date": "2026-09-15",
        "price": 26640,
        "store": "Ajio"
      },
      {
        "date": "2026-10-01",
        "price": 27260,
        "store": "Flipkart"
      },
      {
        "date": "2026-10-15",
        "price": 26440,
        "store": "Flipkart"
      },
      {
        "date": "2026-10-24",
        "price": 26300,
        "store": "Amazon"
      }
    ],
    "rating": 4.5,
    "reviewCount": 3152,
    "popularity": 82,
    "tags": [
      "earbuds",
      "headphones",
      "bose",
      "tws",
      "anc",
      "wireless",
      "audio",
      "bluetooth"
    ]
  },
  {
    "id": "prod-047",
    "title": "Sennheiser Momentum 4 Wireless ANC Headphones (60H Battery)",
    "brand": "Sennheiser",
    "category": "Headphones",
    "imageUrl": "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=600&q=80",
    "description": "Sennheiser Momentum 4 Wireless ANC Headphones (60H Battery). Premium quality headphones by Sennheiser. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "amazon",
        "store": "Amazon",
        "price": 26320,
        "mrp": 34990,
        "url": "https://amazon.in/dp/sennheiser-momentum-4-wireless-anc-/prod-047",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "myntra",
        "store": "Myntra",
        "price": 26230,
        "mrp": 34990,
        "url": "https://myntra.com/product/sennheiser-momentum-4-wireless-anc-/p/prod-047",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "flipkart",
        "store": "Flipkart",
        "price": 25960,
        "mrp": 34990,
        "url": "https://flipkart.com/product/sennheiser-momentum-4-wireless-anc-/p/prod-047",
        "inStock": false,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "croma",
        "store": "Croma",
        "price": 24890,
        "mrp": 34990,
        "url": "https://croma.com/product/sennheiser-momentum-4-wireless-anc-/p/prod-047",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 24900,
        "store": "Myntra"
      },
      {
        "date": "2026-08-01",
        "price": 24920,
        "store": "Myntra"
      },
      {
        "date": "2026-08-15",
        "price": 24520,
        "store": "Croma"
      },
      {
        "date": "2026-09-01",
        "price": 23950,
        "store": "Amazon"
      },
      {
        "date": "2026-09-15",
        "price": 22970,
        "store": "Amazon"
      },
      {
        "date": "2026-10-01",
        "price": 23290,
        "store": "Amazon"
      },
      {
        "date": "2026-10-15",
        "price": 22380,
        "store": "Flipkart"
      },
      {
        "date": "2026-10-24",
        "price": 23350,
        "store": "Flipkart"
      }
    ],
    "rating": 4.7,
    "reviewCount": 7797,
    "popularity": 70,
    "tags": [
      "sennheiser",
      "earbuds",
      "headphones",
      "tws",
      "anc",
      "wireless",
      "audio",
      "bluetooth"
    ]
  },
  {
    "id": "prod-048",
    "title": "JBL Tour ONE M2 Adaptive Noise Cancelling Over-Ear",
    "brand": "JBL",
    "category": "Headphones",
    "imageUrl": "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=600&q=80",
    "description": "JBL Tour ONE M2 Adaptive Noise Cancelling Over-Ear. Premium quality headphones by JBL. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "amazon",
        "store": "Amazon",
        "price": 17300,
        "mrp": 24999,
        "url": "https://amazon.in/dp/jbl-tour-one-m2-adaptive-noise-canc/prod-048",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "myntra",
        "store": "Myntra",
        "price": 17410,
        "mrp": 24999,
        "url": "https://myntra.com/product/jbl-tour-one-m2-adaptive-noise-canc/p/prod-048",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "ajio",
        "store": "Ajio",
        "price": 18000,
        "mrp": 24999,
        "url": "https://ajio.com/product/jbl-tour-one-m2-adaptive-noise-canc/p/prod-048",
        "inStock": false,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 18490,
        "store": "Amazon"
      },
      {
        "date": "2026-08-01",
        "price": 19220,
        "store": "Myntra"
      },
      {
        "date": "2026-08-15",
        "price": 19050,
        "store": "Myntra"
      },
      {
        "date": "2026-09-01",
        "price": 18910,
        "store": "Myntra"
      },
      {
        "date": "2026-09-15",
        "price": 19820,
        "store": "Amazon"
      },
      {
        "date": "2026-10-01",
        "price": 19330,
        "store": "Myntra"
      },
      {
        "date": "2026-10-15",
        "price": 18970,
        "store": "Myntra"
      },
      {
        "date": "2026-10-24",
        "price": 19460,
        "store": "Ajio"
      }
    ],
    "rating": 4.5,
    "reviewCount": 703,
    "popularity": 69,
    "tags": [
      "earbuds",
      "headphones",
      "tws",
      "anc",
      "jbl",
      "wireless",
      "audio",
      "bluetooth"
    ]
  },
  {
    "id": "prod-049",
    "title": "JBL Live Pro 2 TWS Noise Cancelling Earbuds",
    "brand": "JBL",
    "category": "Headphones",
    "imageUrl": "https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?auto=format&fit=crop&w=600&q=80",
    "description": "JBL Live Pro 2 TWS Noise Cancelling Earbuds. Premium quality headphones by JBL. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "croma",
        "store": "Croma",
        "price": 8400,
        "mrp": 13999,
        "url": "https://croma.com/product/jbl-live-pro-2-tws-noise-cancelling/p/prod-049",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "ajio",
        "store": "Ajio",
        "price": 8470,
        "mrp": 13999,
        "url": "https://ajio.com/product/jbl-live-pro-2-tws-noise-cancelling/p/prod-049",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "flipkart",
        "store": "Flipkart",
        "price": 7600,
        "mrp": 13999,
        "url": "https://flipkart.com/product/jbl-live-pro-2-tws-noise-cancelling/p/prod-049",
        "inStock": false,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "myntra",
        "store": "Myntra",
        "price": 7560,
        "mrp": 13999,
        "url": "https://myntra.com/product/jbl-live-pro-2-tws-noise-cancelling/p/prod-049",
        "inStock": false,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 8020,
        "store": "Ajio"
      },
      {
        "date": "2026-08-01",
        "price": 8070,
        "store": "Ajio"
      },
      {
        "date": "2026-08-15",
        "price": 8470,
        "store": "Myntra"
      },
      {
        "date": "2026-09-01",
        "price": 8730,
        "store": "Ajio"
      },
      {
        "date": "2026-09-15",
        "price": 8890,
        "store": "Croma"
      },
      {
        "date": "2026-10-01",
        "price": 9200,
        "store": "Ajio"
      },
      {
        "date": "2026-10-15",
        "price": 8840,
        "store": "Ajio"
      },
      {
        "date": "2026-10-24",
        "price": 9090,
        "store": "Croma"
      }
    ],
    "rating": 4.6,
    "reviewCount": 13986,
    "popularity": 76,
    "tags": [
      "earbuds",
      "headphones",
      "tws",
      "anc",
      "jbl",
      "wireless",
      "audio",
      "bluetooth"
    ]
  },
  {
    "id": "prod-050",
    "title": "boAt Airdopes 141 TWS Earbuds (42H Playtime, ENx Tech)",
    "brand": "boAt",
    "category": "Headphones",
    "imageUrl": "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=600&q=80",
    "description": "boAt Airdopes 141 TWS Earbuds (42H Playtime, ENx Tech). Premium quality headphones by boAt. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "ajio",
        "store": "Ajio",
        "price": 1040,
        "mrp": 4490,
        "url": "https://ajio.com/product/boat-airdopes-141-tws-earbuds-42h-p/p/prod-050",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "croma",
        "store": "Croma",
        "price": 1080,
        "mrp": 4490,
        "url": "https://croma.com/product/boat-airdopes-141-tws-earbuds-42h-p/p/prod-050",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "myntra",
        "store": "Myntra",
        "price": 1140,
        "mrp": 4490,
        "url": "https://myntra.com/product/boat-airdopes-141-tws-earbuds-42h-p/p/prod-050",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "flipkart",
        "store": "Flipkart",
        "price": 1150,
        "mrp": 4490,
        "url": "https://flipkart.com/product/boat-airdopes-141-tws-earbuds-42h-p/p/prod-050",
        "inStock": false,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 1110,
        "store": "Ajio"
      },
      {
        "date": "2026-08-01",
        "price": 1110,
        "store": "Ajio"
      },
      {
        "date": "2026-08-15",
        "price": 1070,
        "store": "Ajio"
      },
      {
        "date": "2026-09-01",
        "price": 1060,
        "store": "Croma"
      },
      {
        "date": "2026-09-15",
        "price": 1030,
        "store": "Ajio"
      },
      {
        "date": "2026-10-01",
        "price": 1050,
        "store": "Flipkart"
      },
      {
        "date": "2026-10-15",
        "price": 1080,
        "store": "Myntra"
      },
      {
        "date": "2026-10-24",
        "price": 1090,
        "store": "Myntra"
      }
    ],
    "rating": 4.3,
    "reviewCount": 13671,
    "popularity": 88,
    "tags": [
      "boat",
      "earbuds",
      "headphones",
      "tws",
      "anc",
      "wireless",
      "audio",
      "bluetooth"
    ]
  },
  {
    "id": "prod-051",
    "title": "boAt Nirvana Ion ANC True Wireless Earbuds (120H Playtime)",
    "brand": "boAt",
    "category": "Headphones",
    "imageUrl": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
    "description": "boAt Nirvana Ion ANC True Wireless Earbuds (120H Playtime). Premium quality headphones by boAt. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "myntra",
        "store": "Myntra",
        "price": 2170,
        "mrp": 9990,
        "url": "https://myntra.com/product/boat-nirvana-ion-anc-true-wireless-/p/prod-051",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "ajio",
        "store": "Ajio",
        "price": 2340,
        "mrp": 9990,
        "url": "https://ajio.com/product/boat-nirvana-ion-anc-true-wireless-/p/prod-051",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "croma",
        "store": "Croma",
        "price": 2320,
        "mrp": 9990,
        "url": "https://croma.com/product/boat-nirvana-ion-anc-true-wireless-/p/prod-051",
        "inStock": false,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 2400,
        "store": "Myntra"
      },
      {
        "date": "2026-08-01",
        "price": 2430,
        "store": "Ajio"
      },
      {
        "date": "2026-08-15",
        "price": 2510,
        "store": "Ajio"
      },
      {
        "date": "2026-09-01",
        "price": 2400,
        "store": "Croma"
      },
      {
        "date": "2026-09-15",
        "price": 2520,
        "store": "Ajio"
      },
      {
        "date": "2026-10-01",
        "price": 2570,
        "store": "Croma"
      },
      {
        "date": "2026-10-15",
        "price": 2460,
        "store": "Ajio"
      },
      {
        "date": "2026-10-24",
        "price": 2410,
        "store": "Ajio"
      }
    ],
    "rating": 4.5,
    "reviewCount": 12286,
    "popularity": 88,
    "tags": [
      "boat",
      "earbuds",
      "headphones",
      "tws",
      "anc",
      "wireless",
      "audio",
      "bluetooth"
    ]
  },
  {
    "id": "prod-052",
    "title": "boAt Rockerz 550 Over-Ear Bluetooth Wireless Headphone",
    "brand": "boAt",
    "category": "Headphones",
    "imageUrl": "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=600&q=80",
    "description": "boAt Rockerz 550 Over-Ear Bluetooth Wireless Headphone. Premium quality headphones by boAt. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "myntra",
        "store": "Myntra",
        "price": 1880,
        "mrp": 4999,
        "url": "https://myntra.com/product/boat-rockerz-550-over-ear-bluetooth/p/prod-052",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "flipkart",
        "store": "Flipkart",
        "price": 1820,
        "mrp": 4999,
        "url": "https://flipkart.com/product/boat-rockerz-550-over-ear-bluetooth/p/prod-052",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "ajio",
        "store": "Ajio",
        "price": 1760,
        "mrp": 4999,
        "url": "https://ajio.com/product/boat-rockerz-550-over-ear-bluetooth/p/prod-052",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "amazon",
        "store": "Amazon",
        "price": 1870,
        "mrp": 4999,
        "url": "https://amazon.in/dp/boat-rockerz-550-over-ear-bluetooth/prod-052",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 1880,
        "store": "Myntra"
      },
      {
        "date": "2026-08-01",
        "price": 1950,
        "store": "Ajio"
      },
      {
        "date": "2026-08-15",
        "price": 2050,
        "store": "Ajio"
      },
      {
        "date": "2026-09-01",
        "price": 2020,
        "store": "Myntra"
      },
      {
        "date": "2026-09-15",
        "price": 2020,
        "store": "Ajio"
      },
      {
        "date": "2026-10-01",
        "price": 2110,
        "store": "Myntra"
      },
      {
        "date": "2026-10-15",
        "price": 2030,
        "store": "Myntra"
      },
      {
        "date": "2026-10-24",
        "price": 1950,
        "store": "Flipkart"
      }
    ],
    "rating": 4.1,
    "reviewCount": 12612,
    "popularity": 83,
    "tags": [
      "boat",
      "earbuds",
      "headphones",
      "tws",
      "anc",
      "wireless",
      "audio",
      "bluetooth"
    ]
  },
  {
    "id": "prod-053",
    "title": "Nothing Ear (Wireless Earbuds, Hi-Res Audio, Smart ANC)",
    "brand": "Nothing",
    "category": "Headphones",
    "imageUrl": "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=600&q=80",
    "description": "Nothing Ear (Wireless Earbuds, Hi-Res Audio, Smart ANC). Premium quality headphones by Nothing. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "flipkart",
        "store": "Flipkart",
        "price": 10450,
        "mrp": 14999,
        "url": "https://flipkart.com/product/nothing-ear-wireless-earbuds-hi-res/p/prod-053",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "ajio",
        "store": "Ajio",
        "price": 10110,
        "mrp": 14999,
        "url": "https://ajio.com/product/nothing-ear-wireless-earbuds-hi-res/p/prod-053",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "amazon",
        "store": "Amazon",
        "price": 9600,
        "mrp": 14999,
        "url": "https://amazon.in/dp/nothing-ear-wireless-earbuds-hi-res/prod-053",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "myntra",
        "store": "Myntra",
        "price": 9730,
        "mrp": 14999,
        "url": "https://myntra.com/product/nothing-ear-wireless-earbuds-hi-res/p/prod-053",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 10320,
        "store": "Amazon"
      },
      {
        "date": "2026-08-01",
        "price": 10640,
        "store": "Amazon"
      },
      {
        "date": "2026-08-15",
        "price": 10560,
        "store": "Ajio"
      },
      {
        "date": "2026-09-01",
        "price": 10300,
        "store": "Amazon"
      },
      {
        "date": "2026-09-15",
        "price": 10260,
        "store": "Amazon"
      },
      {
        "date": "2026-10-01",
        "price": 10740,
        "store": "Ajio"
      },
      {
        "date": "2026-10-15",
        "price": 10310,
        "store": "Ajio"
      },
      {
        "date": "2026-10-24",
        "price": 10030,
        "store": "Amazon"
      }
    ],
    "rating": 4.8,
    "reviewCount": 6730,
    "popularity": 92,
    "tags": [
      "nothing",
      "earbuds",
      "headphones",
      "tws",
      "anc",
      "wireless",
      "audio",
      "bluetooth"
    ]
  },
  {
    "id": "prod-054",
    "title": "Nothing Ear (a) (Yellow, 45dB Active Noise Cancellation)",
    "brand": "Nothing",
    "category": "Headphones",
    "imageUrl": "https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?auto=format&fit=crop&w=600&q=80",
    "description": "Nothing Ear (a) (Yellow, 45dB Active Noise Cancellation). Premium quality headphones by Nothing. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "flipkart",
        "store": "Flipkart",
        "price": 6930,
        "mrp": 9999,
        "url": "https://flipkart.com/product/nothing-ear-a-yellow-45db-active-no/p/prod-054",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "myntra",
        "store": "Myntra",
        "price": 6600,
        "mrp": 9999,
        "url": "https://myntra.com/product/nothing-ear-a-yellow-45db-active-no/p/prod-054",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "croma",
        "store": "Croma",
        "price": 7110,
        "mrp": 9999,
        "url": "https://croma.com/product/nothing-ear-a-yellow-45db-active-no/p/prod-054",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "ajio",
        "store": "Ajio",
        "price": 7340,
        "mrp": 9999,
        "url": "https://ajio.com/product/nothing-ear-a-yellow-45db-active-no/p/prod-054",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 6660,
        "store": "Ajio"
      },
      {
        "date": "2026-08-01",
        "price": 6990,
        "store": "Flipkart"
      },
      {
        "date": "2026-08-15",
        "price": 7320,
        "store": "Croma"
      },
      {
        "date": "2026-09-01",
        "price": 7110,
        "store": "Flipkart"
      },
      {
        "date": "2026-09-15",
        "price": 6970,
        "store": "Myntra"
      },
      {
        "date": "2026-10-01",
        "price": 6880,
        "store": "Flipkart"
      },
      {
        "date": "2026-10-15",
        "price": 6640,
        "store": "Croma"
      },
      {
        "date": "2026-10-24",
        "price": 6960,
        "store": "Flipkart"
      }
    ],
    "rating": 4.0,
    "reviewCount": 9118,
    "popularity": 81,
    "tags": [
      "nothing",
      "earbuds",
      "headphones",
      "tws",
      "anc",
      "wireless",
      "audio",
      "bluetooth"
    ]
  },
  {
    "id": "prod-055",
    "title": "Noise Buds VS104 Truly Wireless Earbuds (45H Playback)",
    "brand": "Noise",
    "category": "Headphones",
    "imageUrl": "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=600&q=80",
    "description": "Noise Buds VS104 Truly Wireless Earbuds (45H Playback). Premium quality headphones by Noise. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "croma",
        "store": "Croma",
        "price": 1320,
        "mrp": 3499,
        "url": "https://croma.com/product/noise-buds-vs104-truly-wireless-ear/p/prod-055",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "myntra",
        "store": "Myntra",
        "price": 1280,
        "mrp": 3499,
        "url": "https://myntra.com/product/noise-buds-vs104-truly-wireless-ear/p/prod-055",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "ajio",
        "store": "Ajio",
        "price": 1340,
        "mrp": 3499,
        "url": "https://ajio.com/product/noise-buds-vs104-truly-wireless-ear/p/prod-055",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 1260,
        "store": "Myntra"
      },
      {
        "date": "2026-08-01",
        "price": 1290,
        "store": "Myntra"
      },
      {
        "date": "2026-08-15",
        "price": 1350,
        "store": "Croma"
      },
      {
        "date": "2026-09-01",
        "price": 1330,
        "store": "Myntra"
      },
      {
        "date": "2026-09-15",
        "price": 1300,
        "store": "Myntra"
      },
      {
        "date": "2026-10-01",
        "price": 1250,
        "store": "Myntra"
      },
      {
        "date": "2026-10-15",
        "price": 1230,
        "store": "Ajio"
      },
      {
        "date": "2026-10-24",
        "price": 1230,
        "store": "Myntra"
      }
    ],
    "rating": 4.6,
    "reviewCount": 9577,
    "popularity": 96,
    "tags": [
      "earbuds",
      "headphones",
      "tws",
      "anc",
      "wireless",
      "noise",
      "audio",
      "bluetooth"
    ]
  },
  {
    "id": "prod-056",
    "title": "OnePlus Buds Pro 2 with Dynaudio Dual Drivers (Obsidian)",
    "brand": "OnePlus",
    "category": "Headphones",
    "imageUrl": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
    "description": "OnePlus Buds Pro 2 with Dynaudio Dual Drivers (Obsidian). Premium quality headphones by OnePlus. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "flipkart",
        "store": "Flipkart",
        "price": 8950,
        "mrp": 11999,
        "url": "https://flipkart.com/product/oneplus-buds-pro-2-with-dynaudio-du/p/prod-056",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "croma",
        "store": "Croma",
        "price": 8960,
        "mrp": 11999,
        "url": "https://croma.com/product/oneplus-buds-pro-2-with-dynaudio-du/p/prod-056",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "myntra",
        "store": "Myntra",
        "price": 9320,
        "mrp": 11999,
        "url": "https://myntra.com/product/oneplus-buds-pro-2-with-dynaudio-du/p/prod-056",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "ajio",
        "store": "Ajio",
        "price": 9360,
        "mrp": 11999,
        "url": "https://ajio.com/product/oneplus-buds-pro-2-with-dynaudio-du/p/prod-056",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 8880,
        "store": "Myntra"
      },
      {
        "date": "2026-08-01",
        "price": 9150,
        "store": "Croma"
      },
      {
        "date": "2026-08-15",
        "price": 9030,
        "store": "Ajio"
      },
      {
        "date": "2026-09-01",
        "price": 9170,
        "store": "Croma"
      },
      {
        "date": "2026-09-15",
        "price": 8870,
        "store": "Myntra"
      },
      {
        "date": "2026-10-01",
        "price": 9160,
        "store": "Myntra"
      },
      {
        "date": "2026-10-15",
        "price": 8890,
        "store": "Myntra"
      },
      {
        "date": "2026-10-24",
        "price": 8550,
        "store": "Ajio"
      }
    ],
    "rating": 4.5,
    "reviewCount": 5425,
    "popularity": 65,
    "tags": [
      "earbuds",
      "headphones",
      "tws",
      "anc",
      "oneplus",
      "wireless",
      "audio",
      "bluetooth"
    ]
  },
  {
    "id": "prod-057",
    "title": "Apple Watch Ultra 2 (GPS + Cellular, 49mm Titanium Case)",
    "brand": "Apple",
    "category": "Smartwatches",
    "imageUrl": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80",
    "description": "Apple Watch Ultra 2 (GPS + Cellular, 49mm Titanium Case). Premium quality smartwatches by Apple. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "ajio",
        "store": "Ajio",
        "price": 83910,
        "mrp": 89900,
        "url": "https://ajio.com/product/apple-watch-ultra-2-gps-plus-cellul/p/prod-057",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "flipkart",
        "store": "Flipkart",
        "price": 88860,
        "mrp": 89900,
        "url": "https://flipkart.com/product/apple-watch-ultra-2-gps-plus-cellul/p/prod-057",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "amazon",
        "store": "Amazon",
        "price": 89410,
        "mrp": 89900,
        "url": "https://amazon.in/dp/apple-watch-ultra-2-gps-plus-cellul/prod-057",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "croma",
        "store": "Croma",
        "price": 87540,
        "mrp": 89900,
        "url": "https://croma.com/product/apple-watch-ultra-2-gps-plus-cellul/p/prod-057",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 84680,
        "store": "Amazon"
      },
      {
        "date": "2026-08-01",
        "price": 84410,
        "store": "Croma"
      },
      {
        "date": "2026-08-15",
        "price": 87830,
        "store": "Croma"
      },
      {
        "date": "2026-09-01",
        "price": 86520,
        "store": "Croma"
      },
      {
        "date": "2026-09-15",
        "price": 86170,
        "store": "Amazon"
      },
      {
        "date": "2026-10-01",
        "price": 90160,
        "store": "Flipkart"
      },
      {
        "date": "2026-10-15",
        "price": 90750,
        "store": "Amazon"
      },
      {
        "date": "2026-10-24",
        "price": 92190,
        "store": "Ajio"
      }
    ],
    "rating": 4.6,
    "reviewCount": 2291,
    "popularity": 66,
    "tags": [
      "apple",
      "smartwatches",
      "amoled",
      "smartwatch",
      "fitness",
      "heart-rate",
      "wearable"
    ]
  },
  {
    "id": "prod-058",
    "title": "Apple Watch Series 10 (GPS, 46mm Jet Black Aluminum)",
    "brand": "Apple",
    "category": "Smartwatches",
    "imageUrl": "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=600&q=80",
    "description": "Apple Watch Series 10 (GPS, 46mm Jet Black Aluminum). Premium quality smartwatches by Apple. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "ajio",
        "store": "Ajio",
        "price": 48420,
        "mrp": 49900,
        "url": "https://ajio.com/product/apple-watch-series-10-gps-46mm-jet-/p/prod-058",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "amazon",
        "store": "Amazon",
        "price": 45540,
        "mrp": 49900,
        "url": "https://amazon.in/dp/apple-watch-series-10-gps-46mm-jet-/prod-058",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "croma",
        "store": "Croma",
        "price": 48080,
        "mrp": 49900,
        "url": "https://croma.com/product/apple-watch-series-10-gps-46mm-jet-/p/prod-058",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 47650,
        "store": "Ajio"
      },
      {
        "date": "2026-08-01",
        "price": 45770,
        "store": "Croma"
      },
      {
        "date": "2026-08-15",
        "price": 45600,
        "store": "Croma"
      },
      {
        "date": "2026-09-01",
        "price": 45720,
        "store": "Amazon"
      },
      {
        "date": "2026-09-15",
        "price": 47450,
        "store": "Croma"
      },
      {
        "date": "2026-10-01",
        "price": 49280,
        "store": "Amazon"
      },
      {
        "date": "2026-10-15",
        "price": 46900,
        "store": "Croma"
      },
      {
        "date": "2026-10-24",
        "price": 47940,
        "store": "Amazon"
      }
    ],
    "rating": 4.7,
    "reviewCount": 3690,
    "popularity": 84,
    "tags": [
      "apple",
      "smartwatches",
      "amoled",
      "smartwatch",
      "fitness",
      "heart-rate",
      "wearable"
    ]
  },
  {
    "id": "prod-059",
    "title": "Apple Watch SE 2nd Gen (GPS, 44mm Midnight Aluminum)",
    "brand": "Apple",
    "category": "Smartwatches",
    "imageUrl": "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=600&q=80",
    "description": "Apple Watch SE 2nd Gen (GPS, 44mm Midnight Aluminum). Premium quality smartwatches by Apple. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "flipkart",
        "store": "Flipkart",
        "price": 26780,
        "mrp": 29900,
        "url": "https://flipkart.com/product/apple-watch-se-2nd-gen-gps-44mm-mid/p/prod-059",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "ajio",
        "store": "Ajio",
        "price": 28550,
        "mrp": 29900,
        "url": "https://ajio.com/product/apple-watch-se-2nd-gen-gps-44mm-mid/p/prod-059",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "amazon",
        "store": "Amazon",
        "price": 28140,
        "mrp": 29900,
        "url": "https://amazon.in/dp/apple-watch-se-2nd-gen-gps-44mm-mid/prod-059",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "croma",
        "store": "Croma",
        "price": 28500,
        "mrp": 29900,
        "url": "https://croma.com/product/apple-watch-se-2nd-gen-gps-44mm-mid/p/prod-059",
        "inStock": false,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 26530,
        "store": "Croma"
      },
      {
        "date": "2026-08-01",
        "price": 25640,
        "store": "Amazon"
      },
      {
        "date": "2026-08-15",
        "price": 24860,
        "store": "Croma"
      },
      {
        "date": "2026-09-01",
        "price": 23970,
        "store": "Flipkart"
      },
      {
        "date": "2026-09-15",
        "price": 24980,
        "store": "Croma"
      },
      {
        "date": "2026-10-01",
        "price": 23760,
        "store": "Ajio"
      },
      {
        "date": "2026-10-15",
        "price": 23340,
        "store": "Ajio"
      },
      {
        "date": "2026-10-24",
        "price": 24040,
        "store": "Flipkart"
      }
    ],
    "rating": 4.2,
    "reviewCount": 16546,
    "popularity": 90,
    "tags": [
      "apple",
      "smartwatches",
      "amoled",
      "smartwatch",
      "fitness",
      "heart-rate",
      "wearable"
    ]
  },
  {
    "id": "prod-060",
    "title": "Samsung Galaxy Watch Ultra 47mm LTE (Titanium Gray)",
    "brand": "Samsung",
    "category": "Smartwatches",
    "imageUrl": "https://images.unsplash.com/photo-1544117519-31a4b719223d?auto=format&fit=crop&w=600&q=80",
    "description": "Samsung Galaxy Watch Ultra 47mm LTE (Titanium Gray). Premium quality smartwatches by Samsung. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "amazon",
        "store": "Amazon",
        "price": 61450,
        "mrp": 64999,
        "url": "https://amazon.in/dp/samsung-galaxy-watch-ultra-47mm-lte/prod-060",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "croma",
        "store": "Croma",
        "price": 56960,
        "mrp": 64999,
        "url": "https://croma.com/product/samsung-galaxy-watch-ultra-47mm-lte/p/prod-060",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "flipkart",
        "store": "Flipkart",
        "price": 63190,
        "mrp": 64999,
        "url": "https://flipkart.com/product/samsung-galaxy-watch-ultra-47mm-lte/p/prod-060",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 59140,
        "store": "Flipkart"
      },
      {
        "date": "2026-08-01",
        "price": 60300,
        "store": "Amazon"
      },
      {
        "date": "2026-08-15",
        "price": 62040,
        "store": "Flipkart"
      },
      {
        "date": "2026-09-01",
        "price": 64580,
        "store": "Amazon"
      },
      {
        "date": "2026-09-15",
        "price": 63130,
        "store": "Amazon"
      },
      {
        "date": "2026-10-01",
        "price": 66100,
        "store": "Amazon"
      },
      {
        "date": "2026-10-15",
        "price": 63750,
        "store": "Croma"
      },
      {
        "date": "2026-10-24",
        "price": 61360,
        "store": "Flipkart"
      }
    ],
    "rating": 4.8,
    "reviewCount": 7059,
    "popularity": 99,
    "tags": [
      "smartwatches",
      "amoled",
      "smartwatch",
      "fitness",
      "heart-rate",
      "samsung",
      "wearable"
    ]
  },
  {
    "id": "prod-061",
    "title": "Samsung Galaxy Watch 7 44mm Bluetooth (Green, BioActive)",
    "brand": "Samsung",
    "category": "Smartwatches",
    "imageUrl": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80",
    "description": "Samsung Galaxy Watch 7 44mm Bluetooth (Green, BioActive). Premium quality smartwatches by Samsung. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "croma",
        "store": "Croma",
        "price": 30920,
        "mrp": 32999,
        "url": "https://croma.com/product/samsung-galaxy-watch-7-44mm-bluetoo/p/prod-061",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "ajio",
        "store": "Ajio",
        "price": 28570,
        "mrp": 32999,
        "url": "https://ajio.com/product/samsung-galaxy-watch-7-44mm-bluetoo/p/prod-061",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "amazon",
        "store": "Amazon",
        "price": 30380,
        "mrp": 32999,
        "url": "https://amazon.in/dp/samsung-galaxy-watch-7-44mm-bluetoo/prod-061",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 29130,
        "store": "Croma"
      },
      {
        "date": "2026-08-01",
        "price": 29410,
        "store": "Amazon"
      },
      {
        "date": "2026-08-15",
        "price": 28600,
        "store": "Croma"
      },
      {
        "date": "2026-09-01",
        "price": 28410,
        "store": "Croma"
      },
      {
        "date": "2026-09-15",
        "price": 28870,
        "store": "Ajio"
      },
      {
        "date": "2026-10-01",
        "price": 30080,
        "store": "Ajio"
      },
      {
        "date": "2026-10-15",
        "price": 30040,
        "store": "Croma"
      },
      {
        "date": "2026-10-24",
        "price": 29230,
        "store": "Ajio"
      }
    ],
    "rating": 4.0,
    "reviewCount": 9552,
    "popularity": 66,
    "tags": [
      "smartwatches",
      "amoled",
      "smartwatch",
      "fitness",
      "heart-rate",
      "samsung",
      "wearable"
    ]
  },
  {
    "id": "prod-062",
    "title": "Samsung Galaxy Watch 6 Classic 47mm LTE (Rotating Bezel)",
    "brand": "Samsung",
    "category": "Smartwatches",
    "imageUrl": "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=600&q=80",
    "description": "Samsung Galaxy Watch 6 Classic 47mm LTE (Rotating Bezel). Premium quality smartwatches by Samsung. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "ajio",
        "store": "Ajio",
        "price": 34450,
        "mrp": 43999,
        "url": "https://ajio.com/product/samsung-galaxy-watch-6-classic-47mm/p/prod-062",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "amazon",
        "store": "Amazon",
        "price": 34500,
        "mrp": 43999,
        "url": "https://amazon.in/dp/samsung-galaxy-watch-6-classic-47mm/prod-062",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "flipkart",
        "store": "Flipkart",
        "price": 35580,
        "mrp": 43999,
        "url": "https://flipkart.com/product/samsung-galaxy-watch-6-classic-47mm/p/prod-062",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "myntra",
        "store": "Myntra",
        "price": 34070,
        "mrp": 43999,
        "url": "https://myntra.com/product/samsung-galaxy-watch-6-classic-47mm/p/prod-062",
        "inStock": false,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 36460,
        "store": "Myntra"
      },
      {
        "date": "2026-08-01",
        "price": 38140,
        "store": "Amazon"
      },
      {
        "date": "2026-08-15",
        "price": 39460,
        "store": "Flipkart"
      },
      {
        "date": "2026-09-01",
        "price": 37750,
        "store": "Flipkart"
      },
      {
        "date": "2026-09-15",
        "price": 38850,
        "store": "Ajio"
      },
      {
        "date": "2026-10-01",
        "price": 38710,
        "store": "Amazon"
      },
      {
        "date": "2026-10-15",
        "price": 38830,
        "store": "Amazon"
      },
      {
        "date": "2026-10-24",
        "price": 39900,
        "store": "Myntra"
      }
    ],
    "rating": 4.7,
    "reviewCount": 10965,
    "popularity": 93,
    "tags": [
      "smartwatches",
      "amoled",
      "smartwatch",
      "fitness",
      "heart-rate",
      "samsung",
      "wearable"
    ]
  },
  {
    "id": "prod-063",
    "title": "Garmin Forerunner 265 Running GPS Smartwatch (AMOLED)",
    "brand": "Garmin",
    "category": "Smartwatches",
    "imageUrl": "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=600&q=80",
    "description": "Garmin Forerunner 265 Running GPS Smartwatch (AMOLED). Premium quality smartwatches by Garmin. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "flipkart",
        "store": "Flipkart",
        "price": 45790,
        "mrp": 52490,
        "url": "https://flipkart.com/product/garmin-forerunner-265-running-gps-s/p/prod-063",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "croma",
        "store": "Croma",
        "price": 47030,
        "mrp": 52490,
        "url": "https://croma.com/product/garmin-forerunner-265-running-gps-s/p/prod-063",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "amazon",
        "store": "Amazon",
        "price": 45100,
        "mrp": 52490,
        "url": "https://amazon.in/dp/garmin-forerunner-265-running-gps-s/prod-063",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "myntra",
        "store": "Myntra",
        "price": 48750,
        "mrp": 52490,
        "url": "https://myntra.com/product/garmin-forerunner-265-running-gps-s/p/prod-063",
        "inStock": false,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 49170,
        "store": "Croma"
      },
      {
        "date": "2026-08-01",
        "price": 50580,
        "store": "Myntra"
      },
      {
        "date": "2026-08-15",
        "price": 49550,
        "store": "Myntra"
      },
      {
        "date": "2026-09-01",
        "price": 49350,
        "store": "Myntra"
      },
      {
        "date": "2026-09-15",
        "price": 50000,
        "store": "Croma"
      },
      {
        "date": "2026-10-01",
        "price": 48480,
        "store": "Amazon"
      },
      {
        "date": "2026-10-15",
        "price": 48660,
        "store": "Myntra"
      },
      {
        "date": "2026-10-24",
        "price": 47880,
        "store": "Croma"
      }
    ],
    "rating": 4.6,
    "reviewCount": 3078,
    "popularity": 94,
    "tags": [
      "garmin",
      "smartwatches",
      "amoled",
      "smartwatch",
      "fitness",
      "heart-rate",
      "wearable"
    ]
  },
  {
    "id": "prod-064",
    "title": "Garmin Fenix 7 Pro Sapphire Solar Multi-Sport GPS Watch",
    "brand": "Garmin",
    "category": "Smartwatches",
    "imageUrl": "https://images.unsplash.com/photo-1544117519-31a4b719223d?auto=format&fit=crop&w=600&q=80",
    "description": "Garmin Fenix 7 Pro Sapphire Solar Multi-Sport GPS Watch. Premium quality smartwatches by Garmin. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "croma",
        "store": "Croma",
        "price": 86340,
        "mrp": 104990,
        "url": "https://croma.com/product/garmin-fenix-7-pro-sapphire-solar-m/p/prod-064",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "myntra",
        "store": "Myntra",
        "price": 93100,
        "mrp": 104990,
        "url": "https://myntra.com/product/garmin-fenix-7-pro-sapphire-solar-m/p/prod-064",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "ajio",
        "store": "Ajio",
        "price": 93030,
        "mrp": 104990,
        "url": "https://ajio.com/product/garmin-fenix-7-pro-sapphire-solar-m/p/prod-064",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "flipkart",
        "store": "Flipkart",
        "price": 89730,
        "mrp": 104990,
        "url": "https://flipkart.com/product/garmin-fenix-7-pro-sapphire-solar-m/p/prod-064",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 93350,
        "store": "Croma"
      },
      {
        "date": "2026-08-01",
        "price": 97090,
        "store": "Myntra"
      },
      {
        "date": "2026-08-15",
        "price": 100710,
        "store": "Ajio"
      },
      {
        "date": "2026-09-01",
        "price": 99320,
        "store": "Croma"
      },
      {
        "date": "2026-09-15",
        "price": 97490,
        "store": "Ajio"
      },
      {
        "date": "2026-10-01",
        "price": 94090,
        "store": "Myntra"
      },
      {
        "date": "2026-10-15",
        "price": 93930,
        "store": "Ajio"
      },
      {
        "date": "2026-10-24",
        "price": 97270,
        "store": "Myntra"
      }
    ],
    "rating": 4.4,
    "reviewCount": 4826,
    "popularity": 88,
    "tags": [
      "garmin",
      "smartwatches",
      "amoled",
      "smartwatch",
      "fitness",
      "heart-rate",
      "wearable"
    ]
  },
  {
    "id": "prod-065",
    "title": "Noise ColorFit Pro 5 Max (1.96-inch AMOLED Display)",
    "brand": "Noise",
    "category": "Smartwatches",
    "imageUrl": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80",
    "description": "Noise ColorFit Pro 5 Max (1.96-inch AMOLED Display). Premium quality smartwatches by Noise. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "flipkart",
        "store": "Flipkart",
        "price": 3810,
        "mrp": 9999,
        "url": "https://flipkart.com/product/noise-colorfit-pro-5-max-1.96-inch-/p/prod-065",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "croma",
        "store": "Croma",
        "price": 3980,
        "mrp": 9999,
        "url": "https://croma.com/product/noise-colorfit-pro-5-max-1.96-inch-/p/prod-065",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "amazon",
        "store": "Amazon",
        "price": 3860,
        "mrp": 9999,
        "url": "https://amazon.in/dp/noise-colorfit-pro-5-max-1.96-inch-/prod-065",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "ajio",
        "store": "Ajio",
        "price": 4140,
        "mrp": 9999,
        "url": "https://ajio.com/product/noise-colorfit-pro-5-max-1.96-inch-/p/prod-065",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 3910,
        "store": "Ajio"
      },
      {
        "date": "2026-08-01",
        "price": 3860,
        "store": "Amazon"
      },
      {
        "date": "2026-08-15",
        "price": 3880,
        "store": "Croma"
      },
      {
        "date": "2026-09-01",
        "price": 3940,
        "store": "Amazon"
      },
      {
        "date": "2026-09-15",
        "price": 3980,
        "store": "Ajio"
      },
      {
        "date": "2026-10-01",
        "price": 4050,
        "store": "Croma"
      },
      {
        "date": "2026-10-15",
        "price": 4080,
        "store": "Croma"
      },
      {
        "date": "2026-10-24",
        "price": 4260,
        "store": "Amazon"
      }
    ],
    "rating": 4.0,
    "reviewCount": 4109,
    "popularity": 85,
    "tags": [
      "smartwatches",
      "amoled",
      "smartwatch",
      "fitness",
      "heart-rate",
      "noise",
      "wearable"
    ]
  },
  {
    "id": "prod-066",
    "title": "Noise Diva Smartwatch for Women with Metallic Strap",
    "brand": "Noise",
    "category": "Smartwatches",
    "imageUrl": "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=600&q=80",
    "description": "Noise Diva Smartwatch for Women with Metallic Strap. Premium quality smartwatches by Noise. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "amazon",
        "store": "Amazon",
        "price": 3120,
        "mrp": 6999,
        "url": "https://amazon.in/dp/noise-diva-smartwatch-for-women-wit/prod-066",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "myntra",
        "store": "Myntra",
        "price": 2840,
        "mrp": 6999,
        "url": "https://myntra.com/product/noise-diva-smartwatch-for-women-wit/p/prod-066",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "ajio",
        "store": "Ajio",
        "price": 3150,
        "mrp": 6999,
        "url": "https://ajio.com/product/noise-diva-smartwatch-for-women-wit/p/prod-066",
        "inStock": false,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 3120,
        "store": "Ajio"
      },
      {
        "date": "2026-08-01",
        "price": 3050,
        "store": "Amazon"
      },
      {
        "date": "2026-08-15",
        "price": 2990,
        "store": "Amazon"
      },
      {
        "date": "2026-09-01",
        "price": 3000,
        "store": "Amazon"
      },
      {
        "date": "2026-09-15",
        "price": 3080,
        "store": "Ajio"
      },
      {
        "date": "2026-10-01",
        "price": 2940,
        "store": "Amazon"
      },
      {
        "date": "2026-10-15",
        "price": 2870,
        "store": "Myntra"
      },
      {
        "date": "2026-10-24",
        "price": 2850,
        "store": "Amazon"
      }
    ],
    "rating": 4.1,
    "reviewCount": 9699,
    "popularity": 82,
    "tags": [
      "smartwatches",
      "amoled",
      "smartwatch",
      "fitness",
      "heart-rate",
      "noise",
      "wearable"
    ]
  },
  {
    "id": "prod-067",
    "title": "Fire-Boltt Invincible Plus 1.43-inch AMOLED Smartwatch",
    "brand": "Fire-Boltt",
    "category": "Smartwatches",
    "imageUrl": "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=600&q=80",
    "description": "Fire-Boltt Invincible Plus 1.43-inch AMOLED Smartwatch. Premium quality smartwatches by Fire-Boltt. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "flipkart",
        "store": "Flipkart",
        "price": 4040,
        "mrp": 21000,
        "url": "https://flipkart.com/product/fire-boltt-invincible-plus-1.43-inc/p/prod-067",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "amazon",
        "store": "Amazon",
        "price": 4030,
        "mrp": 21000,
        "url": "https://amazon.in/dp/fire-boltt-invincible-plus-1.43-inc/prod-067",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "croma",
        "store": "Croma",
        "price": 4210,
        "mrp": 21000,
        "url": "https://croma.com/product/fire-boltt-invincible-plus-1.43-inc/p/prod-067",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "myntra",
        "store": "Myntra",
        "price": 3820,
        "mrp": 21000,
        "url": "https://myntra.com/product/fire-boltt-invincible-plus-1.43-inc/p/prod-067",
        "inStock": false,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 4120,
        "store": "Croma"
      },
      {
        "date": "2026-08-01",
        "price": 4030,
        "store": "Myntra"
      },
      {
        "date": "2026-08-15",
        "price": 4080,
        "store": "Myntra"
      },
      {
        "date": "2026-09-01",
        "price": 3990,
        "store": "Flipkart"
      },
      {
        "date": "2026-09-15",
        "price": 3850,
        "store": "Croma"
      },
      {
        "date": "2026-10-01",
        "price": 3810,
        "store": "Myntra"
      },
      {
        "date": "2026-10-15",
        "price": 3870,
        "store": "Amazon"
      },
      {
        "date": "2026-10-24",
        "price": 4000,
        "store": "Myntra"
      }
    ],
    "rating": 4.2,
    "reviewCount": 6029,
    "popularity": 87,
    "tags": [
      "fire-boltt",
      "smartwatches",
      "amoled",
      "smartwatch",
      "fitness",
      "heart-rate",
      "wearable"
    ]
  },
  {
    "id": "prod-068",
    "title": "Fire-Boltt Ninja Call Pro Plus 1.83-inch Bluetooth Calling",
    "brand": "Fire-Boltt",
    "category": "Smartwatches",
    "imageUrl": "https://images.unsplash.com/photo-1544117519-31a4b719223d?auto=format&fit=crop&w=600&q=80",
    "description": "Fire-Boltt Ninja Call Pro Plus 1.83-inch Bluetooth Calling. Premium quality smartwatches by Fire-Boltt. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "myntra",
        "store": "Myntra",
        "price": 1250,
        "mrp": 9999,
        "url": "https://myntra.com/product/fire-boltt-ninja-call-pro-plus-1.83/p/prod-068",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "croma",
        "store": "Croma",
        "price": 1360,
        "mrp": 9999,
        "url": "https://croma.com/product/fire-boltt-ninja-call-pro-plus-1.83/p/prod-068",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "amazon",
        "store": "Amazon",
        "price": 1360,
        "mrp": 9999,
        "url": "https://amazon.in/dp/fire-boltt-ninja-call-pro-plus-1.83/prod-068",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 1250,
        "store": "Amazon"
      },
      {
        "date": "2026-08-01",
        "price": 1280,
        "store": "Myntra"
      },
      {
        "date": "2026-08-15",
        "price": 1290,
        "store": "Myntra"
      },
      {
        "date": "2026-09-01",
        "price": 1260,
        "store": "Croma"
      },
      {
        "date": "2026-09-15",
        "price": 1260,
        "store": "Croma"
      },
      {
        "date": "2026-10-01",
        "price": 1200,
        "store": "Croma"
      },
      {
        "date": "2026-10-15",
        "price": 1210,
        "store": "Amazon"
      },
      {
        "date": "2026-10-24",
        "price": 1150,
        "store": "Croma"
      }
    ],
    "rating": 4.7,
    "reviewCount": 6139,
    "popularity": 85,
    "tags": [
      "fire-boltt",
      "smartwatches",
      "amoled",
      "smartwatch",
      "fitness",
      "heart-rate",
      "wearable"
    ]
  },
  {
    "id": "prod-069",
    "title": "Amazfit GTR 4 Smart Watch with Dual-Band GPS (Brown)",
    "brand": "Amazfit",
    "category": "Smartwatches",
    "imageUrl": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80",
    "description": "Amazfit GTR 4 Smart Watch with Dual-Band GPS (Brown). Premium quality smartwatches by Amazfit. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "flipkart",
        "store": "Flipkart",
        "price": 14400,
        "mrp": 23999,
        "url": "https://flipkart.com/product/amazfit-gtr-4-smart-watch-with-dual/p/prod-069",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "croma",
        "store": "Croma",
        "price": 15150,
        "mrp": 23999,
        "url": "https://croma.com/product/amazfit-gtr-4-smart-watch-with-dual/p/prod-069",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "ajio",
        "store": "Ajio",
        "price": 15650,
        "mrp": 23999,
        "url": "https://ajio.com/product/amazfit-gtr-4-smart-watch-with-dual/p/prod-069",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "myntra",
        "store": "Myntra",
        "price": 14140,
        "mrp": 23999,
        "url": "https://myntra.com/product/amazfit-gtr-4-smart-watch-with-dual/p/prod-069",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 14910,
        "store": "Myntra"
      },
      {
        "date": "2026-08-01",
        "price": 15020,
        "store": "Myntra"
      },
      {
        "date": "2026-08-15",
        "price": 15150,
        "store": "Croma"
      },
      {
        "date": "2026-09-01",
        "price": 15100,
        "store": "Croma"
      },
      {
        "date": "2026-09-15",
        "price": 15330,
        "store": "Flipkart"
      },
      {
        "date": "2026-10-01",
        "price": 15980,
        "store": "Ajio"
      },
      {
        "date": "2026-10-15",
        "price": 15270,
        "store": "Ajio"
      },
      {
        "date": "2026-10-24",
        "price": 15490,
        "store": "Ajio"
      }
    ],
    "rating": 4.5,
    "reviewCount": 14405,
    "popularity": 78,
    "tags": [
      "amazfit",
      "smartwatches",
      "amoled",
      "smartwatch",
      "fitness",
      "heart-rate",
      "wearable"
    ]
  },
  {
    "id": "prod-070",
    "title": "Amazfit GTS 4 Mini Compact Smartwatch (15-Day Battery)",
    "brand": "Amazfit",
    "category": "Smartwatches",
    "imageUrl": "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=600&q=80",
    "description": "Amazfit GTS 4 Mini Compact Smartwatch (15-Day Battery). Premium quality smartwatches by Amazfit. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "flipkart",
        "store": "Flipkart",
        "price": 6790,
        "mrp": 9999,
        "url": "https://flipkart.com/product/amazfit-gts-4-mini-compact-smartwat/p/prod-070",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "ajio",
        "store": "Ajio",
        "price": 6980,
        "mrp": 9999,
        "url": "https://ajio.com/product/amazfit-gts-4-mini-compact-smartwat/p/prod-070",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "amazon",
        "store": "Amazon",
        "price": 7390,
        "mrp": 9999,
        "url": "https://amazon.in/dp/amazfit-gts-4-mini-compact-smartwat/prod-070",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 7040,
        "store": "Ajio"
      },
      {
        "date": "2026-08-01",
        "price": 6730,
        "store": "Flipkart"
      },
      {
        "date": "2026-08-15",
        "price": 6650,
        "store": "Ajio"
      },
      {
        "date": "2026-09-01",
        "price": 6560,
        "store": "Flipkart"
      },
      {
        "date": "2026-09-15",
        "price": 6580,
        "store": "Flipkart"
      },
      {
        "date": "2026-10-01",
        "price": 6310,
        "store": "Amazon"
      },
      {
        "date": "2026-10-15",
        "price": 6330,
        "store": "Ajio"
      },
      {
        "date": "2026-10-24",
        "price": 6500,
        "store": "Flipkart"
      }
    ],
    "rating": 4.0,
    "reviewCount": 1479,
    "popularity": 95,
    "tags": [
      "amazfit",
      "smartwatches",
      "amoled",
      "smartwatch",
      "fitness",
      "heart-rate",
      "wearable"
    ]
  },
  {
    "id": "prod-071",
    "title": "Fossil Gen 6 Smartwatch with Wear OS by Google (Smoke)",
    "brand": "Fossil",
    "category": "Smartwatches",
    "imageUrl": "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=600&q=80",
    "description": "Fossil Gen 6 Smartwatch with Wear OS by Google (Smoke). Premium quality smartwatches by Fossil. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "amazon",
        "store": "Amazon",
        "price": 16030,
        "mrp": 24995,
        "url": "https://amazon.in/dp/fossil-gen-6-smartwatch-with-wear-o/prod-071",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "myntra",
        "store": "Myntra",
        "price": 16600,
        "mrp": 24995,
        "url": "https://myntra.com/product/fossil-gen-6-smartwatch-with-wear-o/p/prod-071",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "croma",
        "store": "Croma",
        "price": 17880,
        "mrp": 24995,
        "url": "https://croma.com/product/fossil-gen-6-smartwatch-with-wear-o/p/prod-071",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 16490,
        "store": "Myntra"
      },
      {
        "date": "2026-08-01",
        "price": 15890,
        "store": "Croma"
      },
      {
        "date": "2026-08-15",
        "price": 16020,
        "store": "Myntra"
      },
      {
        "date": "2026-09-01",
        "price": 15750,
        "store": "Croma"
      },
      {
        "date": "2026-09-15",
        "price": 15600,
        "store": "Amazon"
      },
      {
        "date": "2026-10-01",
        "price": 15600,
        "store": "Amazon"
      },
      {
        "date": "2026-10-15",
        "price": 16350,
        "store": "Amazon"
      },
      {
        "date": "2026-10-24",
        "price": 15660,
        "store": "Myntra"
      }
    ],
    "rating": 4.4,
    "reviewCount": 7375,
    "popularity": 66,
    "tags": [
      "smartwatches",
      "amoled",
      "smartwatch",
      "fitness",
      "heart-rate",
      "fossil",
      "wearable"
    ]
  },
  {
    "id": "prod-072",
    "title": "LG 55-inch OLED C3 4K Smart TV (OLED55C3PSA)",
    "brand": "LG",
    "category": "Televisions",
    "imageUrl": "https://images.unsplash.com/photo-1577979749830-f1d742b96791?auto=format&fit=crop&w=600&q=80",
    "description": "LG 55-inch OLED C3 4K Smart TV (OLED55C3PSA). Premium quality televisions by LG. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "croma",
        "store": "Croma",
        "price": 107420,
        "mrp": 154990,
        "url": "https://croma.com/product/lg-55-inch-oled-c3-4k-smart-tv-oled/p/prod-072",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "myntra",
        "store": "Myntra",
        "price": 106080,
        "mrp": 154990,
        "url": "https://myntra.com/product/lg-55-inch-oled-c3-4k-smart-tv-oled/p/prod-072",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "ajio",
        "store": "Ajio",
        "price": 104970,
        "mrp": 154990,
        "url": "https://ajio.com/product/lg-55-inch-oled-c3-4k-smart-tv-oled/p/prod-072",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "flipkart",
        "store": "Flipkart",
        "price": 106620,
        "mrp": 154990,
        "url": "https://flipkart.com/product/lg-55-inch-oled-c3-4k-smart-tv-oled/p/prod-072",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 114960,
        "store": "Croma"
      },
      {
        "date": "2026-08-01",
        "price": 118920,
        "store": "Croma"
      },
      {
        "date": "2026-08-15",
        "price": 118240,
        "store": "Ajio"
      },
      {
        "date": "2026-09-01",
        "price": 120660,
        "store": "Croma"
      },
      {
        "date": "2026-09-15",
        "price": 124670,
        "store": "Ajio"
      },
      {
        "date": "2026-10-01",
        "price": 128190,
        "store": "Flipkart"
      },
      {
        "date": "2026-10-15",
        "price": 130550,
        "store": "Ajio"
      },
      {
        "date": "2026-10-24",
        "price": 135910,
        "store": "Croma"
      }
    ],
    "rating": 4.7,
    "reviewCount": 15955,
    "popularity": 69,
    "tags": [
      "dolby-vision",
      "smart-tv",
      "televisions",
      "entertainment",
      "lg",
      "4k",
      "oled"
    ]
  },
  {
    "id": "prod-073",
    "title": "LG 65-inch OLED G4 4K Smart TV (OLED65G4PSA, Gallery Design)",
    "brand": "LG",
    "category": "Televisions",
    "imageUrl": "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=600&q=80",
    "description": "LG 65-inch OLED G4 4K Smart TV (OLED65G4PSA, Gallery Design). Premium quality televisions by LG. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "myntra",
        "store": "Myntra",
        "price": 255390,
        "mrp": 319990,
        "url": "https://myntra.com/product/lg-65-inch-oled-g4-4k-smart-tv-oled/p/prod-073",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "amazon",
        "store": "Amazon",
        "price": 235030,
        "mrp": 319990,
        "url": "https://amazon.in/dp/lg-65-inch-oled-g4-4k-smart-tv-oled/prod-073",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "croma",
        "store": "Croma",
        "price": 252920,
        "mrp": 319990,
        "url": "https://croma.com/product/lg-65-inch-oled-g4-4k-smart-tv-oled/p/prod-073",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 256400,
        "store": "Myntra"
      },
      {
        "date": "2026-08-01",
        "price": 245980,
        "store": "Croma"
      },
      {
        "date": "2026-08-15",
        "price": 239150,
        "store": "Myntra"
      },
      {
        "date": "2026-09-01",
        "price": 232210,
        "store": "Croma"
      },
      {
        "date": "2026-09-15",
        "price": 226090,
        "store": "Amazon"
      },
      {
        "date": "2026-10-01",
        "price": 234770,
        "store": "Croma"
      },
      {
        "date": "2026-10-15",
        "price": 226360,
        "store": "Amazon"
      },
      {
        "date": "2026-10-24",
        "price": 233420,
        "store": "Myntra"
      }
    ],
    "rating": 4.7,
    "reviewCount": 1032,
    "popularity": 96,
    "tags": [
      "dolby-vision",
      "smart-tv",
      "televisions",
      "entertainment",
      "lg",
      "4k",
      "oled"
    ]
  },
  {
    "id": "prod-074",
    "title": "LG 43-inch 4K Ultra HD Smart LED TV (43UR7500PSC)",
    "brand": "LG",
    "category": "Televisions",
    "imageUrl": "https://images.unsplash.com/photo-1461151304267-38535e780c79?auto=format&fit=crop&w=600&q=80",
    "description": "LG 43-inch 4K Ultra HD Smart LED TV (43UR7500PSC). Premium quality televisions by LG. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "amazon",
        "store": "Amazon",
        "price": 28590,
        "mrp": 49990,
        "url": "https://amazon.in/dp/lg-43-inch-4k-ultra-hd-smart-led-tv/prod-074",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "ajio",
        "store": "Ajio",
        "price": 29510,
        "mrp": 49990,
        "url": "https://ajio.com/product/lg-43-inch-4k-ultra-hd-smart-led-tv/p/prod-074",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "flipkart",
        "store": "Flipkart",
        "price": 29500,
        "mrp": 49990,
        "url": "https://flipkart.com/product/lg-43-inch-4k-ultra-hd-smart-led-tv/p/prod-074",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 29980,
        "store": "Amazon"
      },
      {
        "date": "2026-08-01",
        "price": 28800,
        "store": "Ajio"
      },
      {
        "date": "2026-08-15",
        "price": 28930,
        "store": "Amazon"
      },
      {
        "date": "2026-09-01",
        "price": 29660,
        "store": "Flipkart"
      },
      {
        "date": "2026-09-15",
        "price": 28350,
        "store": "Ajio"
      },
      {
        "date": "2026-10-01",
        "price": 28290,
        "store": "Ajio"
      },
      {
        "date": "2026-10-15",
        "price": 29010,
        "store": "Ajio"
      },
      {
        "date": "2026-10-24",
        "price": 29250,
        "store": "Flipkart"
      }
    ],
    "rating": 4.4,
    "reviewCount": 14826,
    "popularity": 95,
    "tags": [
      "dolby-vision",
      "smart-tv",
      "televisions",
      "entertainment",
      "lg",
      "4k",
      "oled"
    ]
  },
  {
    "id": "prod-075",
    "title": "Samsung 55-inch Neo QLED 4K Smart TV (QA55QN85DBULXL)",
    "brand": "Samsung",
    "category": "Televisions",
    "imageUrl": "https://images.unsplash.com/photo-1577979749830-f1d742b96791?auto=format&fit=crop&w=600&q=80",
    "description": "Samsung 55-inch Neo QLED 4K Smart TV (QA55QN85DBULXL). Premium quality televisions by Samsung. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "amazon",
        "store": "Amazon",
        "price": 120490,
        "mrp": 159990,
        "url": "https://amazon.in/dp/samsung-55-inch-neo-qled-4k-smart-t/prod-075",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "croma",
        "store": "Croma",
        "price": 116470,
        "mrp": 159990,
        "url": "https://croma.com/product/samsung-55-inch-neo-qled-4k-smart-t/p/prod-075",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "myntra",
        "store": "Myntra",
        "price": 108110,
        "mrp": 159990,
        "url": "https://myntra.com/product/samsung-55-inch-neo-qled-4k-smart-t/p/prod-075",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "flipkart",
        "store": "Flipkart",
        "price": 115520,
        "mrp": 159990,
        "url": "https://flipkart.com/product/samsung-55-inch-neo-qled-4k-smart-t/p/prod-075",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 116510,
        "store": "Amazon"
      },
      {
        "date": "2026-08-01",
        "price": 115220,
        "store": "Myntra"
      },
      {
        "date": "2026-08-15",
        "price": 115000,
        "store": "Flipkart"
      },
      {
        "date": "2026-09-01",
        "price": 115600,
        "store": "Amazon"
      },
      {
        "date": "2026-09-15",
        "price": 118650,
        "store": "Flipkart"
      },
      {
        "date": "2026-10-01",
        "price": 122710,
        "store": "Croma"
      },
      {
        "date": "2026-10-15",
        "price": 118600,
        "store": "Myntra"
      },
      {
        "date": "2026-10-24",
        "price": 121630,
        "store": "Croma"
      }
    ],
    "rating": 4.6,
    "reviewCount": 16570,
    "popularity": 98,
    "tags": [
      "dolby-vision",
      "smart-tv",
      "televisions",
      "entertainment",
      "4k",
      "samsung",
      "oled"
    ]
  },
  {
    "id": "prod-076",
    "title": "Samsung 65-inch Crystal 4K Vivid Pro Ultra HD Smart TV",
    "brand": "Samsung",
    "category": "Televisions",
    "imageUrl": "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=600&q=80",
    "description": "Samsung 65-inch Crystal 4K Vivid Pro Ultra HD Smart TV. Premium quality televisions by Samsung. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "amazon",
        "store": "Amazon",
        "price": 62160,
        "mrp": 89900,
        "url": "https://amazon.in/dp/samsung-65-inch-crystal-4k-vivid-pr/prod-076",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "ajio",
        "store": "Ajio",
        "price": 62880,
        "mrp": 89900,
        "url": "https://ajio.com/product/samsung-65-inch-crystal-4k-vivid-pr/p/prod-076",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "croma",
        "store": "Croma",
        "price": 61870,
        "mrp": 89900,
        "url": "https://croma.com/product/samsung-65-inch-crystal-4k-vivid-pr/p/prod-076",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 60760,
        "store": "Ajio"
      },
      {
        "date": "2026-08-01",
        "price": 59600,
        "store": "Amazon"
      },
      {
        "date": "2026-08-15",
        "price": 61570,
        "store": "Ajio"
      },
      {
        "date": "2026-09-01",
        "price": 59940,
        "store": "Ajio"
      },
      {
        "date": "2026-09-15",
        "price": 62190,
        "store": "Amazon"
      },
      {
        "date": "2026-10-01",
        "price": 64100,
        "store": "Croma"
      },
      {
        "date": "2026-10-15",
        "price": 66290,
        "store": "Ajio"
      },
      {
        "date": "2026-10-24",
        "price": 69020,
        "store": "Amazon"
      }
    ],
    "rating": 4.2,
    "reviewCount": 1421,
    "popularity": 87,
    "tags": [
      "dolby-vision",
      "smart-tv",
      "televisions",
      "entertainment",
      "4k",
      "samsung",
      "oled"
    ]
  },
  {
    "id": "prod-077",
    "title": "Samsung The Frame 55-inch 4K QLED Smart TV with Art Mode",
    "brand": "Samsung",
    "category": "Televisions",
    "imageUrl": "https://images.unsplash.com/photo-1461151304267-38535e780c79?auto=format&fit=crop&w=600&q=80",
    "description": "Samsung The Frame 55-inch 4K QLED Smart TV with Art Mode. Premium quality televisions by Samsung. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "croma",
        "store": "Croma",
        "price": 81300,
        "mrp": 134900,
        "url": "https://croma.com/product/samsung-the-frame-55-inch-4k-qled-s/p/prod-077",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "myntra",
        "store": "Myntra",
        "price": 82190,
        "mrp": 134900,
        "url": "https://myntra.com/product/samsung-the-frame-55-inch-4k-qled-s/p/prod-077",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "amazon",
        "store": "Amazon",
        "price": 83590,
        "mrp": 134900,
        "url": "https://amazon.in/dp/samsung-the-frame-55-inch-4k-qled-s/prod-077",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "ajio",
        "store": "Ajio",
        "price": 80880,
        "mrp": 134900,
        "url": "https://ajio.com/product/samsung-the-frame-55-inch-4k-qled-s/p/prod-077",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 84230,
        "store": "Croma"
      },
      {
        "date": "2026-08-01",
        "price": 84510,
        "store": "Ajio"
      },
      {
        "date": "2026-08-15",
        "price": 81820,
        "store": "Myntra"
      },
      {
        "date": "2026-09-01",
        "price": 81290,
        "store": "Amazon"
      },
      {
        "date": "2026-09-15",
        "price": 80540,
        "store": "Ajio"
      },
      {
        "date": "2026-10-01",
        "price": 80190,
        "store": "Croma"
      },
      {
        "date": "2026-10-15",
        "price": 83660,
        "store": "Myntra"
      },
      {
        "date": "2026-10-24",
        "price": 87400,
        "store": "Croma"
      }
    ],
    "rating": 4.9,
    "reviewCount": 18384,
    "popularity": 67,
    "tags": [
      "dolby-vision",
      "smart-tv",
      "televisions",
      "entertainment",
      "4k",
      "samsung",
      "oled"
    ]
  },
  {
    "id": "prod-078",
    "title": "Sony Bravia 55-inch 4K Ultra HD Smart LED TV (KD-55X74L)",
    "brand": "Sony",
    "category": "Televisions",
    "imageUrl": "https://images.unsplash.com/photo-1577979749830-f1d742b96791?auto=format&fit=crop&w=600&q=80",
    "description": "Sony Bravia 55-inch 4K Ultra HD Smart LED TV (KD-55X74L). Premium quality televisions by Sony. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "myntra",
        "store": "Myntra",
        "price": 61200,
        "mrp": 99900,
        "url": "https://myntra.com/product/sony-bravia-55-inch-4k-ultra-hd-sma/p/prod-078",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "amazon",
        "store": "Amazon",
        "price": 61140,
        "mrp": 99900,
        "url": "https://amazon.in/dp/sony-bravia-55-inch-4k-ultra-hd-sma/prod-078",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "croma",
        "store": "Croma",
        "price": 54770,
        "mrp": 99900,
        "url": "https://croma.com/product/sony-bravia-55-inch-4k-ultra-hd-sma/p/prod-078",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "flipkart",
        "store": "Flipkart",
        "price": 55460,
        "mrp": 99900,
        "url": "https://flipkart.com/product/sony-bravia-55-inch-4k-ultra-hd-sma/p/prod-078",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 59710,
        "store": "Flipkart"
      },
      {
        "date": "2026-08-01",
        "price": 59060,
        "store": "Amazon"
      },
      {
        "date": "2026-08-15",
        "price": 60890,
        "store": "Myntra"
      },
      {
        "date": "2026-09-01",
        "price": 61420,
        "store": "Amazon"
      },
      {
        "date": "2026-09-15",
        "price": 59680,
        "store": "Flipkart"
      },
      {
        "date": "2026-10-01",
        "price": 60350,
        "store": "Myntra"
      },
      {
        "date": "2026-10-15",
        "price": 59640,
        "store": "Croma"
      },
      {
        "date": "2026-10-24",
        "price": 59820,
        "store": "Amazon"
      }
    ],
    "rating": 4.1,
    "reviewCount": 16206,
    "popularity": 81,
    "tags": [
      "dolby-vision",
      "smart-tv",
      "televisions",
      "sony",
      "entertainment",
      "4k",
      "oled"
    ]
  },
  {
    "id": "prod-079",
    "title": "Sony Bravia XR 65-inch OLED 4K Google TV (XR-65A80L)",
    "brand": "Sony",
    "category": "Televisions",
    "imageUrl": "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=600&q=80",
    "description": "Sony Bravia XR 65-inch OLED 4K Google TV (XR-65A80L). Premium quality televisions by Sony. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "myntra",
        "store": "Myntra",
        "price": 208860,
        "mrp": 279900,
        "url": "https://myntra.com/product/sony-bravia-xr-65-inch-oled-4k-goog/p/prod-079",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "amazon",
        "store": "Amazon",
        "price": 209550,
        "mrp": 279900,
        "url": "https://amazon.in/dp/sony-bravia-xr-65-inch-oled-4k-goog/prod-079",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "flipkart",
        "store": "Flipkart",
        "price": 207130,
        "mrp": 279900,
        "url": "https://flipkart.com/product/sony-bravia-xr-65-inch-oled-4k-goog/p/prod-079",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 214650,
        "store": "Myntra"
      },
      {
        "date": "2026-08-01",
        "price": 213600,
        "store": "Flipkart"
      },
      {
        "date": "2026-08-15",
        "price": 214540,
        "store": "Amazon"
      },
      {
        "date": "2026-09-01",
        "price": 212010,
        "store": "Amazon"
      },
      {
        "date": "2026-09-15",
        "price": 216760,
        "store": "Myntra"
      },
      {
        "date": "2026-10-01",
        "price": 213670,
        "store": "Myntra"
      },
      {
        "date": "2026-10-15",
        "price": 213590,
        "store": "Flipkart"
      },
      {
        "date": "2026-10-24",
        "price": 206980,
        "store": "Myntra"
      }
    ],
    "rating": 4.4,
    "reviewCount": 3434,
    "popularity": 69,
    "tags": [
      "dolby-vision",
      "smart-tv",
      "televisions",
      "sony",
      "entertainment",
      "4k",
      "oled"
    ]
  },
  {
    "id": "prod-080",
    "title": "TCL 55-inch 4K Ultra HD Smart QLED Google TV (55C655)",
    "brand": "TCL",
    "category": "Televisions",
    "imageUrl": "https://images.unsplash.com/photo-1461151304267-38535e780c79?auto=format&fit=crop&w=600&q=80",
    "description": "TCL 55-inch 4K Ultra HD Smart QLED Google TV (55C655). Premium quality televisions by TCL. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "amazon",
        "store": "Amazon",
        "price": 39900,
        "mrp": 69990,
        "url": "https://amazon.in/dp/tcl-55-inch-4k-ultra-hd-smart-qled-/prod-080",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "myntra",
        "store": "Myntra",
        "price": 39840,
        "mrp": 69990,
        "url": "https://myntra.com/product/tcl-55-inch-4k-ultra-hd-smart-qled-/p/prod-080",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "flipkart",
        "store": "Flipkart",
        "price": 37410,
        "mrp": 69990,
        "url": "https://flipkart.com/product/tcl-55-inch-4k-ultra-hd-smart-qled-/p/prod-080",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 40180,
        "store": "Amazon"
      },
      {
        "date": "2026-08-01",
        "price": 38970,
        "store": "Flipkart"
      },
      {
        "date": "2026-08-15",
        "price": 39460,
        "store": "Flipkart"
      },
      {
        "date": "2026-09-01",
        "price": 41150,
        "store": "Myntra"
      },
      {
        "date": "2026-09-15",
        "price": 40850,
        "store": "Myntra"
      },
      {
        "date": "2026-10-01",
        "price": 40210,
        "store": "Flipkart"
      },
      {
        "date": "2026-10-15",
        "price": 40150,
        "store": "Flipkart"
      },
      {
        "date": "2026-10-24",
        "price": 38670,
        "store": "Myntra"
      }
    ],
    "rating": 4.8,
    "reviewCount": 15962,
    "popularity": 76,
    "tags": [
      "dolby-vision",
      "smart-tv",
      "televisions",
      "entertainment",
      "4k",
      "tcl",
      "oled"
    ]
  },
  {
    "id": "prod-081",
    "title": "TCL 65-inch Mini-LED 4K 144Hz Gaming TV (65C755)",
    "brand": "TCL",
    "category": "Televisions",
    "imageUrl": "https://images.unsplash.com/photo-1577979749830-f1d742b96791?auto=format&fit=crop&w=600&q=80",
    "description": "TCL 65-inch Mini-LED 4K 144Hz Gaming TV (65C755). Premium quality televisions by TCL. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "amazon",
        "store": "Amazon",
        "price": 87760,
        "mrp": 149990,
        "url": "https://amazon.in/dp/tcl-65-inch-mini-led-4k-144hz-gamin/prod-081",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "flipkart",
        "store": "Flipkart",
        "price": 85100,
        "mrp": 149990,
        "url": "https://flipkart.com/product/tcl-65-inch-mini-led-4k-144hz-gamin/p/prod-081",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "croma",
        "store": "Croma",
        "price": 84640,
        "mrp": 149990,
        "url": "https://croma.com/product/tcl-65-inch-mini-led-4k-144hz-gamin/p/prod-081",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 94250,
        "store": "Croma"
      },
      {
        "date": "2026-08-01",
        "price": 96880,
        "store": "Amazon"
      },
      {
        "date": "2026-08-15",
        "price": 96350,
        "store": "Croma"
      },
      {
        "date": "2026-09-01",
        "price": 93230,
        "store": "Croma"
      },
      {
        "date": "2026-09-15",
        "price": 93170,
        "store": "Croma"
      },
      {
        "date": "2026-10-01",
        "price": 96180,
        "store": "Croma"
      },
      {
        "date": "2026-10-15",
        "price": 97630,
        "store": "Croma"
      },
      {
        "date": "2026-10-24",
        "price": 94080,
        "store": "Flipkart"
      }
    ],
    "rating": 4.6,
    "reviewCount": 18228,
    "popularity": 94,
    "tags": [
      "dolby-vision",
      "smart-tv",
      "televisions",
      "entertainment",
      "4k",
      "tcl",
      "oled"
    ]
  },
  {
    "id": "prod-082",
    "title": "Xiaomi 55-inch X Pro 4K Dolby Vision IQ Series TV",
    "brand": "Xiaomi",
    "category": "Televisions",
    "imageUrl": "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=600&q=80",
    "description": "Xiaomi 55-inch X Pro 4K Dolby Vision IQ Series TV. Premium quality televisions by Xiaomi. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "croma",
        "store": "Croma",
        "price": 41130,
        "mrp": 49999,
        "url": "https://croma.com/product/xiaomi-55-inch-x-pro-4k-dolby-visio/p/prod-082",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "ajio",
        "store": "Ajio",
        "price": 38360,
        "mrp": 49999,
        "url": "https://ajio.com/product/xiaomi-55-inch-x-pro-4k-dolby-visio/p/prod-082",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "flipkart",
        "store": "Flipkart",
        "price": 40280,
        "mrp": 49999,
        "url": "https://flipkart.com/product/xiaomi-55-inch-x-pro-4k-dolby-visio/p/prod-082",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 38610,
        "store": "Croma"
      },
      {
        "date": "2026-08-01",
        "price": 38040,
        "store": "Croma"
      },
      {
        "date": "2026-08-15",
        "price": 38650,
        "store": "Flipkart"
      },
      {
        "date": "2026-09-01",
        "price": 38240,
        "store": "Croma"
      },
      {
        "date": "2026-09-15",
        "price": 39150,
        "store": "Ajio"
      },
      {
        "date": "2026-10-01",
        "price": 39130,
        "store": "Flipkart"
      },
      {
        "date": "2026-10-15",
        "price": 38460,
        "store": "Flipkart"
      },
      {
        "date": "2026-10-24",
        "price": 38250,
        "store": "Ajio"
      }
    ],
    "rating": 4.5,
    "reviewCount": 1875,
    "popularity": 94,
    "tags": [
      "dolby-vision",
      "smart-tv",
      "televisions",
      "entertainment",
      "xiaomi",
      "4k",
      "oled"
    ]
  },
  {
    "id": "prod-083",
    "title": "Xiaomi 43-inch Smart TV A Series (Full HD, Dolby Audio)",
    "brand": "Xiaomi",
    "category": "Televisions",
    "imageUrl": "https://images.unsplash.com/photo-1461151304267-38535e780c79?auto=format&fit=crop&w=600&q=80",
    "description": "Xiaomi 43-inch Smart TV A Series (Full HD, Dolby Audio). Premium quality televisions by Xiaomi. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "myntra",
        "store": "Myntra",
        "price": 19170,
        "mrp": 29999,
        "url": "https://myntra.com/product/xiaomi-43-inch-smart-tv-a-series-fu/p/prod-083",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "ajio",
        "store": "Ajio",
        "price": 19810,
        "mrp": 29999,
        "url": "https://ajio.com/product/xiaomi-43-inch-smart-tv-a-series-fu/p/prod-083",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "flipkart",
        "store": "Flipkart",
        "price": 19380,
        "mrp": 29999,
        "url": "https://flipkart.com/product/xiaomi-43-inch-smart-tv-a-series-fu/p/prod-083",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "amazon",
        "store": "Amazon",
        "price": 20740,
        "mrp": 29999,
        "url": "https://amazon.in/dp/xiaomi-43-inch-smart-tv-a-series-fu/prod-083",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 19370,
        "store": "Amazon"
      },
      {
        "date": "2026-08-01",
        "price": 19900,
        "store": "Ajio"
      },
      {
        "date": "2026-08-15",
        "price": 19520,
        "store": "Amazon"
      },
      {
        "date": "2026-09-01",
        "price": 19330,
        "store": "Myntra"
      },
      {
        "date": "2026-09-15",
        "price": 20160,
        "store": "Flipkart"
      },
      {
        "date": "2026-10-01",
        "price": 21010,
        "store": "Flipkart"
      },
      {
        "date": "2026-10-15",
        "price": 20600,
        "store": "Myntra"
      },
      {
        "date": "2026-10-24",
        "price": 19650,
        "store": "Ajio"
      }
    ],
    "rating": 4.1,
    "reviewCount": 12548,
    "popularity": 93,
    "tags": [
      "dolby-vision",
      "smart-tv",
      "televisions",
      "entertainment",
      "xiaomi",
      "4k",
      "oled"
    ]
  },
  {
    "id": "prod-084",
    "title": "Vu 55-inch GloLED 4K Smart TV with 84W Soundbar",
    "brand": "Vu",
    "category": "Televisions",
    "imageUrl": "https://images.unsplash.com/photo-1577979749830-f1d742b96791?auto=format&fit=crop&w=600&q=80",
    "description": "Vu 55-inch GloLED 4K Smart TV with 84W Soundbar. Premium quality televisions by Vu. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "croma",
        "store": "Croma",
        "price": 37720,
        "mrp": 56000,
        "url": "https://croma.com/product/vu-55-inch-gloled-4k-smart-tv-with-/p/prod-084",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "ajio",
        "store": "Ajio",
        "price": 38150,
        "mrp": 56000,
        "url": "https://ajio.com/product/vu-55-inch-gloled-4k-smart-tv-with-/p/prod-084",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "myntra",
        "store": "Myntra",
        "price": 34920,
        "mrp": 56000,
        "url": "https://myntra.com/product/vu-55-inch-gloled-4k-smart-tv-with-/p/prod-084",
        "inStock": false,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "amazon",
        "store": "Amazon",
        "price": 38060,
        "mrp": 56000,
        "url": "https://amazon.in/dp/vu-55-inch-gloled-4k-smart-tv-with-/prod-084",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 37510,
        "store": "Myntra"
      },
      {
        "date": "2026-08-01",
        "price": 38680,
        "store": "Amazon"
      },
      {
        "date": "2026-08-15",
        "price": 38380,
        "store": "Amazon"
      },
      {
        "date": "2026-09-01",
        "price": 38240,
        "store": "Croma"
      },
      {
        "date": "2026-09-15",
        "price": 38960,
        "store": "Ajio"
      },
      {
        "date": "2026-10-01",
        "price": 37890,
        "store": "Ajio"
      },
      {
        "date": "2026-10-15",
        "price": 36410,
        "store": "Croma"
      },
      {
        "date": "2026-10-24",
        "price": 37130,
        "store": "Ajio"
      }
    ],
    "rating": 4.8,
    "reviewCount": 3812,
    "popularity": 70,
    "tags": [
      "dolby-vision",
      "smart-tv",
      "televisions",
      "entertainment",
      "4k",
      "vu",
      "oled"
    ]
  },
  {
    "id": "prod-085",
    "title": "Vu 65-inch Masterpiece Glo QLED 4K TV (Armani Gold)",
    "brand": "Vu",
    "category": "Televisions",
    "imageUrl": "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=600&q=80",
    "description": "Vu 65-inch Masterpiece Glo QLED 4K TV (Armani Gold). Premium quality televisions by Vu. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "flipkart",
        "store": "Flipkart",
        "price": 64850,
        "mrp": 100000,
        "url": "https://flipkart.com/product/vu-65-inch-masterpiece-glo-qled-4k-/p/prod-085",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "amazon",
        "store": "Amazon",
        "price": 61820,
        "mrp": 100000,
        "url": "https://amazon.in/dp/vu-65-inch-masterpiece-glo-qled-4k-/prod-085",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "myntra",
        "store": "Myntra",
        "price": 64180,
        "mrp": 100000,
        "url": "https://myntra.com/product/vu-65-inch-masterpiece-glo-qled-4k-/p/prod-085",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 68090,
        "store": "Flipkart"
      },
      {
        "date": "2026-08-01",
        "price": 71470,
        "store": "Myntra"
      },
      {
        "date": "2026-08-15",
        "price": 70040,
        "store": "Myntra"
      },
      {
        "date": "2026-09-01",
        "price": 71040,
        "store": "Flipkart"
      },
      {
        "date": "2026-09-15",
        "price": 67590,
        "store": "Flipkart"
      },
      {
        "date": "2026-10-01",
        "price": 64450,
        "store": "Amazon"
      },
      {
        "date": "2026-10-15",
        "price": 67370,
        "store": "Flipkart"
      },
      {
        "date": "2026-10-24",
        "price": 65460,
        "store": "Amazon"
      }
    ],
    "rating": 4.5,
    "reviewCount": 14302,
    "popularity": 86,
    "tags": [
      "dolby-vision",
      "smart-tv",
      "televisions",
      "entertainment",
      "4k",
      "vu",
      "oled"
    ]
  },
  {
    "id": "prod-086",
    "title": "Apple iPad Pro 13 M4 (Ultra Retina XDR, Wi-Fi 256GB, Black)",
    "brand": "Apple",
    "category": "Tablets",
    "imageUrl": "https://images.unsplash.com/photo-1561154464-82e9adf32764?auto=format&fit=crop&w=600&q=80",
    "description": "Apple iPad Pro 13 M4 (Ultra Retina XDR, Wi-Fi 256GB, Black). Premium quality tablets by Apple. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "croma",
        "store": "Croma",
        "price": 136730,
        "mrp": 139900,
        "url": "https://croma.com/product/apple-ipad-pro-13-m4-ultra-retina-x/p/prod-086",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "flipkart",
        "store": "Flipkart",
        "price": 123700,
        "mrp": 139900,
        "url": "https://flipkart.com/product/apple-ipad-pro-13-m4-ultra-retina-x/p/prod-086",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "myntra",
        "store": "Myntra",
        "price": 128390,
        "mrp": 139900,
        "url": "https://myntra.com/product/apple-ipad-pro-13-m4-ultra-retina-x/p/prod-086",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "ajio",
        "store": "Ajio",
        "price": 137180,
        "mrp": 139900,
        "url": "https://ajio.com/product/apple-ipad-pro-13-m4-ultra-retina-x/p/prod-086",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 125730,
        "store": "Myntra"
      },
      {
        "date": "2026-08-01",
        "price": 124040,
        "store": "Flipkart"
      },
      {
        "date": "2026-08-15",
        "price": 119910,
        "store": "Myntra"
      },
      {
        "date": "2026-09-01",
        "price": 124160,
        "store": "Croma"
      },
      {
        "date": "2026-09-15",
        "price": 125480,
        "store": "Flipkart"
      },
      {
        "date": "2026-10-01",
        "price": 119470,
        "store": "Ajio"
      },
      {
        "date": "2026-10-15",
        "price": 124350,
        "store": "Ajio"
      },
      {
        "date": "2026-10-24",
        "price": 119310,
        "store": "Flipkart"
      }
    ],
    "rating": 4.5,
    "reviewCount": 16727,
    "popularity": 88,
    "tags": [
      "apple",
      "portable",
      "tablet",
      "stylus",
      "tablets",
      "entertainment",
      "display"
    ]
  },
  {
    "id": "prod-087",
    "title": "Apple iPad Air M2 (11-inch, Wi-Fi, 128GB, Starlight)",
    "brand": "Apple",
    "category": "Tablets",
    "imageUrl": "https://images.unsplash.com/photo-1589739900243-4b52cd9b104e?auto=format&fit=crop&w=600&q=80",
    "description": "Apple iPad Air M2 (11-inch, Wi-Fi, 128GB, Starlight). Premium quality tablets by Apple. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "ajio",
        "store": "Ajio",
        "price": 55680,
        "mrp": 69900,
        "url": "https://ajio.com/product/apple-ipad-air-m2-11-inch-wi-fi-128/p/prod-087",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "amazon",
        "store": "Amazon",
        "price": 58050,
        "mrp": 69900,
        "url": "https://amazon.in/dp/apple-ipad-air-m2-11-inch-wi-fi-128/prod-087",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "flipkart",
        "store": "Flipkart",
        "price": 59500,
        "mrp": 69900,
        "url": "https://flipkart.com/product/apple-ipad-air-m2-11-inch-wi-fi-128/p/prod-087",
        "inStock": false,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 56760,
        "store": "Amazon"
      },
      {
        "date": "2026-08-01",
        "price": 56220,
        "store": "Ajio"
      },
      {
        "date": "2026-08-15",
        "price": 56770,
        "store": "Flipkart"
      },
      {
        "date": "2026-09-01",
        "price": 56870,
        "store": "Ajio"
      },
      {
        "date": "2026-09-15",
        "price": 56410,
        "store": "Ajio"
      },
      {
        "date": "2026-10-01",
        "price": 58470,
        "store": "Ajio"
      },
      {
        "date": "2026-10-15",
        "price": 59480,
        "store": "Flipkart"
      },
      {
        "date": "2026-10-24",
        "price": 58900,
        "store": "Flipkart"
      }
    ],
    "rating": 4.3,
    "reviewCount": 6647,
    "popularity": 77,
    "tags": [
      "apple",
      "portable",
      "tablet",
      "stylus",
      "tablets",
      "entertainment",
      "display"
    ]
  },
  {
    "id": "prod-088",
    "title": "Apple iPad 10th Gen (10.9-inch, Wi-Fi 64GB, Blue)",
    "brand": "Apple",
    "category": "Tablets",
    "imageUrl": "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=600&q=80",
    "description": "Apple iPad 10th Gen (10.9-inch, Wi-Fi 64GB, Blue). Premium quality tablets by Apple. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "flipkart",
        "store": "Flipkart",
        "price": 31970,
        "mrp": 39900,
        "url": "https://flipkart.com/product/apple-ipad-10th-gen-10.9-inch-wi-fi/p/prod-088",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "ajio",
        "store": "Ajio",
        "price": 32840,
        "mrp": 39900,
        "url": "https://ajio.com/product/apple-ipad-10th-gen-10.9-inch-wi-fi/p/prod-088",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "myntra",
        "store": "Myntra",
        "price": 33430,
        "mrp": 39900,
        "url": "https://myntra.com/product/apple-ipad-10th-gen-10.9-inch-wi-fi/p/prod-088",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "amazon",
        "store": "Amazon",
        "price": 33710,
        "mrp": 39900,
        "url": "https://amazon.in/dp/apple-ipad-10th-gen-10.9-inch-wi-fi/prod-088",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 32970,
        "store": "Amazon"
      },
      {
        "date": "2026-08-01",
        "price": 31400,
        "store": "Flipkart"
      },
      {
        "date": "2026-08-15",
        "price": 30930,
        "store": "Myntra"
      },
      {
        "date": "2026-09-01",
        "price": 29750,
        "store": "Myntra"
      },
      {
        "date": "2026-09-15",
        "price": 29170,
        "store": "Myntra"
      },
      {
        "date": "2026-10-01",
        "price": 28770,
        "store": "Ajio"
      },
      {
        "date": "2026-10-15",
        "price": 28750,
        "store": "Myntra"
      },
      {
        "date": "2026-10-24",
        "price": 29900,
        "store": "Amazon"
      }
    ],
    "rating": 4.0,
    "reviewCount": 16767,
    "popularity": 82,
    "tags": [
      "apple",
      "portable",
      "tablet",
      "stylus",
      "tablets",
      "entertainment",
      "display"
    ]
  },
  {
    "id": "prod-089",
    "title": "Apple iPad Mini 6th Gen (8.3-inch, Wi-Fi 64GB, Purple)",
    "brand": "Apple",
    "category": "Tablets",
    "imageUrl": "https://images.unsplash.com/photo-1561154464-82e9adf32764?auto=format&fit=crop&w=600&q=80",
    "description": "Apple iPad Mini 6th Gen (8.3-inch, Wi-Fi 64GB, Purple). Premium quality tablets by Apple. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "croma",
        "store": "Croma",
        "price": 45730,
        "mrp": 49900,
        "url": "https://croma.com/product/apple-ipad-mini-6th-gen-8.3-inch-wi/p/prod-089",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "amazon",
        "store": "Amazon",
        "price": 46080,
        "mrp": 49900,
        "url": "https://amazon.in/dp/apple-ipad-mini-6th-gen-8.3-inch-wi/prod-089",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "flipkart",
        "store": "Flipkart",
        "price": 44880,
        "mrp": 49900,
        "url": "https://flipkart.com/product/apple-ipad-mini-6th-gen-8.3-inch-wi/p/prod-089",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "ajio",
        "store": "Ajio",
        "price": 47630,
        "mrp": 49900,
        "url": "https://ajio.com/product/apple-ipad-mini-6th-gen-8.3-inch-wi/p/prod-089",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 46570,
        "store": "Croma"
      },
      {
        "date": "2026-08-01",
        "price": 46590,
        "store": "Amazon"
      },
      {
        "date": "2026-08-15",
        "price": 47150,
        "store": "Flipkart"
      },
      {
        "date": "2026-09-01",
        "price": 46110,
        "store": "Ajio"
      },
      {
        "date": "2026-09-15",
        "price": 43960,
        "store": "Ajio"
      },
      {
        "date": "2026-10-01",
        "price": 44100,
        "store": "Ajio"
      },
      {
        "date": "2026-10-15",
        "price": 41900,
        "store": "Amazon"
      },
      {
        "date": "2026-10-24",
        "price": 39830,
        "store": "Amazon"
      }
    ],
    "rating": 4.5,
    "reviewCount": 10918,
    "popularity": 98,
    "tags": [
      "apple",
      "portable",
      "tablet",
      "stylus",
      "tablets",
      "entertainment",
      "display"
    ]
  },
  {
    "id": "prod-090",
    "title": "Samsung Galaxy Tab S9 Ultra (14.6-inch AMOLED, S Pen, 256GB)",
    "brand": "Samsung",
    "category": "Tablets",
    "imageUrl": "https://images.unsplash.com/photo-1589739900243-4b52cd9b104e?auto=format&fit=crop&w=600&q=80",
    "description": "Samsung Galaxy Tab S9 Ultra (14.6-inch AMOLED, S Pen, 256GB). Premium quality tablets by Samsung. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "ajio",
        "store": "Ajio",
        "price": 105170,
        "mrp": 121999,
        "url": "https://ajio.com/product/samsung-galaxy-tab-s9-ultra-14.6-in/p/prod-090",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "croma",
        "store": "Croma",
        "price": 106460,
        "mrp": 121999,
        "url": "https://croma.com/product/samsung-galaxy-tab-s9-ultra-14.6-in/p/prod-090",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "amazon",
        "store": "Amazon",
        "price": 103400,
        "mrp": 121999,
        "url": "https://amazon.in/dp/samsung-galaxy-tab-s9-ultra-14.6-in/prod-090",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 106530,
        "store": "Ajio"
      },
      {
        "date": "2026-08-01",
        "price": 102390,
        "store": "Croma"
      },
      {
        "date": "2026-08-15",
        "price": 99190,
        "store": "Amazon"
      },
      {
        "date": "2026-09-01",
        "price": 101960,
        "store": "Ajio"
      },
      {
        "date": "2026-09-15",
        "price": 104890,
        "store": "Croma"
      },
      {
        "date": "2026-10-01",
        "price": 110090,
        "store": "Amazon"
      },
      {
        "date": "2026-10-15",
        "price": 112980,
        "store": "Amazon"
      },
      {
        "date": "2026-10-24",
        "price": 110800,
        "store": "Amazon"
      }
    ],
    "rating": 4.7,
    "reviewCount": 8085,
    "popularity": 89,
    "tags": [
      "portable",
      "tablet",
      "stylus",
      "tablets",
      "entertainment",
      "display",
      "samsung"
    ]
  },
  {
    "id": "prod-091",
    "title": "Samsung Galaxy Tab S9 FE (10.9-inch Display, S Pen, 128GB)",
    "brand": "Samsung",
    "category": "Tablets",
    "imageUrl": "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=600&q=80",
    "description": "Samsung Galaxy Tab S9 FE (10.9-inch Display, S Pen, 128GB). Premium quality tablets by Samsung. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "myntra",
        "store": "Myntra",
        "price": 36580,
        "mrp": 44999,
        "url": "https://myntra.com/product/samsung-galaxy-tab-s9-fe-10.9-inch-/p/prod-091",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "amazon",
        "store": "Amazon",
        "price": 36130,
        "mrp": 44999,
        "url": "https://amazon.in/dp/samsung-galaxy-tab-s9-fe-10.9-inch-/prod-091",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "flipkart",
        "store": "Flipkart",
        "price": 36770,
        "mrp": 44999,
        "url": "https://flipkart.com/product/samsung-galaxy-tab-s9-fe-10.9-inch-/p/prod-091",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "croma",
        "store": "Croma",
        "price": 34670,
        "mrp": 44999,
        "url": "https://croma.com/product/samsung-galaxy-tab-s9-fe-10.9-inch-/p/prod-091",
        "inStock": false,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 34920,
        "store": "Flipkart"
      },
      {
        "date": "2026-08-01",
        "price": 36080,
        "store": "Flipkart"
      },
      {
        "date": "2026-08-15",
        "price": 37040,
        "store": "Myntra"
      },
      {
        "date": "2026-09-01",
        "price": 38180,
        "store": "Amazon"
      },
      {
        "date": "2026-09-15",
        "price": 39800,
        "store": "Myntra"
      },
      {
        "date": "2026-10-01",
        "price": 41220,
        "store": "Flipkart"
      },
      {
        "date": "2026-10-15",
        "price": 42390,
        "store": "Croma"
      },
      {
        "date": "2026-10-24",
        "price": 41670,
        "store": "Myntra"
      }
    ],
    "rating": 4.9,
    "reviewCount": 5353,
    "popularity": 85,
    "tags": [
      "portable",
      "tablet",
      "stylus",
      "tablets",
      "entertainment",
      "display",
      "samsung"
    ]
  },
  {
    "id": "prod-092",
    "title": "Samsung Galaxy Tab A9 Plus (11-inch, 8GB RAM, 128GB, Wi-Fi)",
    "brand": "Samsung",
    "category": "Tablets",
    "imageUrl": "https://images.unsplash.com/photo-1561154464-82e9adf32764?auto=format&fit=crop&w=600&q=80",
    "description": "Samsung Galaxy Tab A9 Plus (11-inch, 8GB RAM, 128GB, Wi-Fi). Premium quality tablets by Samsung. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "ajio",
        "store": "Ajio",
        "price": 20550,
        "mrp": 25999,
        "url": "https://ajio.com/product/samsung-galaxy-tab-a9-plus-11-inch-/p/prod-092",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "amazon",
        "store": "Amazon",
        "price": 19820,
        "mrp": 25999,
        "url": "https://amazon.in/dp/samsung-galaxy-tab-a9-plus-11-inch-/prod-092",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "myntra",
        "store": "Myntra",
        "price": 20360,
        "mrp": 25999,
        "url": "https://myntra.com/product/samsung-galaxy-tab-a9-plus-11-inch-/p/prod-092",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "croma",
        "store": "Croma",
        "price": 20980,
        "mrp": 25999,
        "url": "https://croma.com/product/samsung-galaxy-tab-a9-plus-11-inch-/p/prod-092",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 20960,
        "store": "Amazon"
      },
      {
        "date": "2026-08-01",
        "price": 20570,
        "store": "Croma"
      },
      {
        "date": "2026-08-15",
        "price": 19810,
        "store": "Myntra"
      },
      {
        "date": "2026-09-01",
        "price": 20640,
        "store": "Croma"
      },
      {
        "date": "2026-09-15",
        "price": 20840,
        "store": "Amazon"
      },
      {
        "date": "2026-10-01",
        "price": 21470,
        "store": "Croma"
      },
      {
        "date": "2026-10-15",
        "price": 22370,
        "store": "Amazon"
      },
      {
        "date": "2026-10-24",
        "price": 23130,
        "store": "Croma"
      }
    ],
    "rating": 4.8,
    "reviewCount": 14333,
    "popularity": 90,
    "tags": [
      "portable",
      "tablet",
      "stylus",
      "tablets",
      "entertainment",
      "display",
      "samsung"
    ]
  },
  {
    "id": "prod-093",
    "title": "Xiaomi Pad 6 (11-inch 144Hz 2.8K Display, Snapdragon 870, 8GB)",
    "brand": "Xiaomi",
    "category": "Tablets",
    "imageUrl": "https://images.unsplash.com/photo-1589739900243-4b52cd9b104e?auto=format&fit=crop&w=600&q=80",
    "description": "Xiaomi Pad 6 (11-inch 144Hz 2.8K Display, Snapdragon 870, 8GB). Premium quality tablets by Xiaomi. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "ajio",
        "store": "Ajio",
        "price": 25990,
        "mrp": 31999,
        "url": "https://ajio.com/product/xiaomi-pad-6-11-inch-144hz-2.8k-dis/p/prod-093",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "flipkart",
        "store": "Flipkart",
        "price": 26090,
        "mrp": 31999,
        "url": "https://flipkart.com/product/xiaomi-pad-6-11-inch-144hz-2.8k-dis/p/prod-093",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "croma",
        "store": "Croma",
        "price": 25950,
        "mrp": 31999,
        "url": "https://croma.com/product/xiaomi-pad-6-11-inch-144hz-2.8k-dis/p/prod-093",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "amazon",
        "store": "Amazon",
        "price": 23970,
        "mrp": 31999,
        "url": "https://amazon.in/dp/xiaomi-pad-6-11-inch-144hz-2.8k-dis/prod-093",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 25460,
        "store": "Flipkart"
      },
      {
        "date": "2026-08-01",
        "price": 25270,
        "store": "Ajio"
      },
      {
        "date": "2026-08-15",
        "price": 24990,
        "store": "Amazon"
      },
      {
        "date": "2026-09-01",
        "price": 25570,
        "store": "Ajio"
      },
      {
        "date": "2026-09-15",
        "price": 24410,
        "store": "Ajio"
      },
      {
        "date": "2026-10-01",
        "price": 24680,
        "store": "Croma"
      },
      {
        "date": "2026-10-15",
        "price": 24500,
        "store": "Ajio"
      },
      {
        "date": "2026-10-24",
        "price": 24760,
        "store": "Amazon"
      }
    ],
    "rating": 4.8,
    "reviewCount": 645,
    "popularity": 67,
    "tags": [
      "portable",
      "tablet",
      "stylus",
      "tablets",
      "entertainment",
      "xiaomi",
      "display"
    ]
  },
  {
    "id": "prod-094",
    "title": "OnePlus Pad 2 (12.1-inch 3K Display, Snapdragon 8 Gen 3)",
    "brand": "OnePlus",
    "category": "Tablets",
    "imageUrl": "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=600&q=80",
    "description": "OnePlus Pad 2 (12.1-inch 3K Display, Snapdragon 8 Gen 3). Premium quality tablets by OnePlus. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "ajio",
        "store": "Ajio",
        "price": 41400,
        "mrp": 44999,
        "url": "https://ajio.com/product/oneplus-pad-2-12.1-inch-3k-display-/p/prod-094",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "myntra",
        "store": "Myntra",
        "price": 37850,
        "mrp": 44999,
        "url": "https://myntra.com/product/oneplus-pad-2-12.1-inch-3k-display-/p/prod-094",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "flipkart",
        "store": "Flipkart",
        "price": 40670,
        "mrp": 44999,
        "url": "https://flipkart.com/product/oneplus-pad-2-12.1-inch-3k-display-/p/prod-094",
        "inStock": false,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 38290,
        "store": "Ajio"
      },
      {
        "date": "2026-08-01",
        "price": 38920,
        "store": "Ajio"
      },
      {
        "date": "2026-08-15",
        "price": 37460,
        "store": "Flipkart"
      },
      {
        "date": "2026-09-01",
        "price": 38530,
        "store": "Myntra"
      },
      {
        "date": "2026-09-15",
        "price": 38870,
        "store": "Myntra"
      },
      {
        "date": "2026-10-01",
        "price": 38490,
        "store": "Ajio"
      },
      {
        "date": "2026-10-15",
        "price": 38040,
        "store": "Myntra"
      },
      {
        "date": "2026-10-24",
        "price": 36320,
        "store": "Flipkart"
      }
    ],
    "rating": 4.5,
    "reviewCount": 7364,
    "popularity": 66,
    "tags": [
      "portable",
      "tablet",
      "stylus",
      "tablets",
      "display",
      "entertainment",
      "oneplus"
    ]
  },
  {
    "id": "prod-095",
    "title": "OnePlus Pad Go (11.35-inch 2.4K Display, 8GB, 128GB LTE)",
    "brand": "OnePlus",
    "category": "Tablets",
    "imageUrl": "https://images.unsplash.com/photo-1561154464-82e9adf32764?auto=format&fit=crop&w=600&q=80",
    "description": "OnePlus Pad Go (11.35-inch 2.4K Display, 8GB, 128GB LTE). Premium quality tablets by OnePlus. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "myntra",
        "store": "Myntra",
        "price": 20200,
        "mrp": 23999,
        "url": "https://myntra.com/product/oneplus-pad-go-11.35-inch-2.4k-disp/p/prod-095",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "flipkart",
        "store": "Flipkart",
        "price": 20930,
        "mrp": 23999,
        "url": "https://flipkart.com/product/oneplus-pad-go-11.35-inch-2.4k-disp/p/prod-095",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "croma",
        "store": "Croma",
        "price": 20480,
        "mrp": 23999,
        "url": "https://croma.com/product/oneplus-pad-go-11.35-inch-2.4k-disp/p/prod-095",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "ajio",
        "store": "Ajio",
        "price": 20000,
        "mrp": 23999,
        "url": "https://ajio.com/product/oneplus-pad-go-11.35-inch-2.4k-disp/p/prod-095",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 19650,
        "store": "Myntra"
      },
      {
        "date": "2026-08-01",
        "price": 19450,
        "store": "Flipkart"
      },
      {
        "date": "2026-08-15",
        "price": 18690,
        "store": "Myntra"
      },
      {
        "date": "2026-09-01",
        "price": 19290,
        "store": "Ajio"
      },
      {
        "date": "2026-09-15",
        "price": 20250,
        "store": "Ajio"
      },
      {
        "date": "2026-10-01",
        "price": 19750,
        "store": "Flipkart"
      },
      {
        "date": "2026-10-15",
        "price": 20730,
        "store": "Ajio"
      },
      {
        "date": "2026-10-24",
        "price": 20710,
        "store": "Myntra"
      }
    ],
    "rating": 4.7,
    "reviewCount": 13598,
    "popularity": 72,
    "tags": [
      "portable",
      "tablet",
      "stylus",
      "tablets",
      "display",
      "entertainment",
      "oneplus"
    ]
  },
  {
    "id": "prod-096",
    "title": "Lenovo Tab P12 (12.7-inch 3K Display, JBL Quad Speakers)",
    "brand": "Lenovo",
    "category": "Tablets",
    "imageUrl": "https://images.unsplash.com/photo-1589739900243-4b52cd9b104e?auto=format&fit=crop&w=600&q=80",
    "description": "Lenovo Tab P12 (12.7-inch 3K Display, JBL Quad Speakers). Premium quality tablets by Lenovo. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "flipkart",
        "store": "Flipkart",
        "price": 26100,
        "mrp": 39000,
        "url": "https://flipkart.com/product/lenovo-tab-p12-12.7-inch-3k-display/p/prod-096",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "croma",
        "store": "Croma",
        "price": 25560,
        "mrp": 39000,
        "url": "https://croma.com/product/lenovo-tab-p12-12.7-inch-3k-display/p/prod-096",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "amazon",
        "store": "Amazon",
        "price": 25300,
        "mrp": 39000,
        "url": "https://amazon.in/dp/lenovo-tab-p12-12.7-inch-3k-display/prod-096",
        "inStock": false,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 25200,
        "store": "Flipkart"
      },
      {
        "date": "2026-08-01",
        "price": 25360,
        "store": "Flipkart"
      },
      {
        "date": "2026-08-15",
        "price": 26060,
        "store": "Croma"
      },
      {
        "date": "2026-09-01",
        "price": 25210,
        "store": "Amazon"
      },
      {
        "date": "2026-09-15",
        "price": 24790,
        "store": "Flipkart"
      },
      {
        "date": "2026-10-01",
        "price": 24320,
        "store": "Croma"
      },
      {
        "date": "2026-10-15",
        "price": 25060,
        "store": "Amazon"
      },
      {
        "date": "2026-10-24",
        "price": 24960,
        "store": "Flipkart"
      }
    ],
    "rating": 4.5,
    "reviewCount": 12572,
    "popularity": 80,
    "tags": [
      "portable",
      "tablet",
      "stylus",
      "tablets",
      "entertainment",
      "lenovo",
      "display"
    ]
  },
  {
    "id": "prod-097",
    "title": "Lenovo Tab M11 (11-inch FHD, Quad Speakers, 4GB, 128GB)",
    "brand": "Lenovo",
    "category": "Tablets",
    "imageUrl": "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=600&q=80",
    "description": "Lenovo Tab M11 (11-inch FHD, Quad Speakers, 4GB, 128GB). Premium quality tablets by Lenovo. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "flipkart",
        "store": "Flipkart",
        "price": 14800,
        "mrp": 22000,
        "url": "https://flipkart.com/product/lenovo-tab-m11-11-inch-fhd-quad-spe/p/prod-097",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "myntra",
        "store": "Myntra",
        "price": 15450,
        "mrp": 22000,
        "url": "https://myntra.com/product/lenovo-tab-m11-11-inch-fhd-quad-spe/p/prod-097",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "croma",
        "store": "Croma",
        "price": 14510,
        "mrp": 22000,
        "url": "https://croma.com/product/lenovo-tab-m11-11-inch-fhd-quad-spe/p/prod-097",
        "inStock": false,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "amazon",
        "store": "Amazon",
        "price": 15050,
        "mrp": 22000,
        "url": "https://amazon.in/dp/lenovo-tab-m11-11-inch-fhd-quad-spe/prod-097",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 14270,
        "store": "Amazon"
      },
      {
        "date": "2026-08-01",
        "price": 14130,
        "store": "Myntra"
      },
      {
        "date": "2026-08-15",
        "price": 14040,
        "store": "Flipkart"
      },
      {
        "date": "2026-09-01",
        "price": 14460,
        "store": "Flipkart"
      },
      {
        "date": "2026-09-15",
        "price": 15030,
        "store": "Myntra"
      },
      {
        "date": "2026-10-01",
        "price": 14520,
        "store": "Flipkart"
      },
      {
        "date": "2026-10-15",
        "price": 14530,
        "store": "Myntra"
      },
      {
        "date": "2026-10-24",
        "price": 15050,
        "store": "Flipkart"
      }
    ],
    "rating": 4.1,
    "reviewCount": 13318,
    "popularity": 86,
    "tags": [
      "portable",
      "tablet",
      "stylus",
      "tablets",
      "entertainment",
      "lenovo",
      "display"
    ]
  },
  {
    "id": "prod-098",
    "title": "Sony Alpha 7 IV Full-frame Mirrorless Camera Body (33MP)",
    "brand": "Sony",
    "category": "Cameras",
    "imageUrl": "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=600&q=80",
    "description": "Sony Alpha 7 IV Full-frame Mirrorless Camera Body (33MP). Premium quality cameras by Sony. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "myntra",
        "store": "Myntra",
        "price": 192620,
        "mrp": 242490,
        "url": "https://myntra.com/product/sony-alpha-7-iv-full-frame-mirrorle/p/prod-098",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "ajio",
        "store": "Ajio",
        "price": 191360,
        "mrp": 242490,
        "url": "https://ajio.com/product/sony-alpha-7-iv-full-frame-mirrorle/p/prod-098",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "amazon",
        "store": "Amazon",
        "price": 202180,
        "mrp": 242490,
        "url": "https://amazon.in/dp/sony-alpha-7-iv-full-frame-mirrorle/prod-098",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "flipkart",
        "store": "Flipkart",
        "price": 203340,
        "mrp": 242490,
        "url": "https://flipkart.com/product/sony-alpha-7-iv-full-frame-mirrorle/p/prod-098",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 205270,
        "store": "Ajio"
      },
      {
        "date": "2026-08-01",
        "price": 195430,
        "store": "Flipkart"
      },
      {
        "date": "2026-08-15",
        "price": 196490,
        "store": "Flipkart"
      },
      {
        "date": "2026-09-01",
        "price": 204320,
        "store": "Amazon"
      },
      {
        "date": "2026-09-15",
        "price": 214470,
        "store": "Myntra"
      },
      {
        "date": "2026-10-01",
        "price": 207040,
        "store": "Amazon"
      },
      {
        "date": "2026-10-15",
        "price": 209560,
        "store": "Amazon"
      },
      {
        "date": "2026-10-24",
        "price": 201110,
        "store": "Ajio"
      }
    ],
    "rating": 4.5,
    "reviewCount": 222,
    "popularity": 72,
    "tags": [
      "camera",
      "sony",
      "vlogging",
      "4k-video",
      "mirrorless",
      "cameras",
      "photography"
    ]
  },
  {
    "id": "prod-099",
    "title": "Sony Alpha 6700 APS-C Mirrorless Camera with 18-135mm Lens",
    "brand": "Sony",
    "category": "Cameras",
    "imageUrl": "https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?auto=format&fit=crop&w=600&q=80",
    "description": "Sony Alpha 6700 APS-C Mirrorless Camera with 18-135mm Lens. Premium quality cameras by Sony. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "flipkart",
        "store": "Flipkart",
        "price": 157250,
        "mrp": 172990,
        "url": "https://flipkart.com/product/sony-alpha-6700-aps-c-mirrorless-ca/p/prod-099",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "croma",
        "store": "Croma",
        "price": 149950,
        "mrp": 172990,
        "url": "https://croma.com/product/sony-alpha-6700-aps-c-mirrorless-ca/p/prod-099",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "ajio",
        "store": "Ajio",
        "price": 146320,
        "mrp": 172990,
        "url": "https://ajio.com/product/sony-alpha-6700-aps-c-mirrorless-ca/p/prod-099",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "amazon",
        "store": "Amazon",
        "price": 156400,
        "mrp": 172990,
        "url": "https://amazon.in/dp/sony-alpha-6700-aps-c-mirrorless-ca/prod-099",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 153060,
        "store": "Flipkart"
      },
      {
        "date": "2026-08-01",
        "price": 158470,
        "store": "Ajio"
      },
      {
        "date": "2026-08-15",
        "price": 153600,
        "store": "Amazon"
      },
      {
        "date": "2026-09-01",
        "price": 152140,
        "store": "Ajio"
      },
      {
        "date": "2026-09-15",
        "price": 152130,
        "store": "Ajio"
      },
      {
        "date": "2026-10-01",
        "price": 153110,
        "store": "Croma"
      },
      {
        "date": "2026-10-15",
        "price": 154750,
        "store": "Flipkart"
      },
      {
        "date": "2026-10-24",
        "price": 157580,
        "store": "Croma"
      }
    ],
    "rating": 4.2,
    "reviewCount": 8635,
    "popularity": 79,
    "tags": [
      "camera",
      "sony",
      "vlogging",
      "4k-video",
      "mirrorless",
      "cameras",
      "photography"
    ]
  },
  {
    "id": "prod-100",
    "title": "Sony ZV-E10 Vlogging Camera with 16-50mm Lens (Black)",
    "brand": "Sony",
    "category": "Cameras",
    "imageUrl": "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=80",
    "description": "Sony ZV-E10 Vlogging Camera with 16-50mm Lens (Black). Premium quality cameras by Sony. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "amazon",
        "store": "Amazon",
        "price": 58010,
        "mrp": 69990,
        "url": "https://amazon.in/dp/sony-zv-e10-vlogging-camera-with-16/prod-100",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "ajio",
        "store": "Ajio",
        "price": 57460,
        "mrp": 69990,
        "url": "https://ajio.com/product/sony-zv-e10-vlogging-camera-with-16/p/prod-100",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "myntra",
        "store": "Myntra",
        "price": 59280,
        "mrp": 69990,
        "url": "https://myntra.com/product/sony-zv-e10-vlogging-camera-with-16/p/prod-100",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "croma",
        "store": "Croma",
        "price": 62220,
        "mrp": 69990,
        "url": "https://croma.com/product/sony-zv-e10-vlogging-camera-with-16/p/prod-100",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 62380,
        "store": "Amazon"
      },
      {
        "date": "2026-08-01",
        "price": 62530,
        "store": "Myntra"
      },
      {
        "date": "2026-08-15",
        "price": 64060,
        "store": "Ajio"
      },
      {
        "date": "2026-09-01",
        "price": 67230,
        "store": "Ajio"
      },
      {
        "date": "2026-09-15",
        "price": 68060,
        "store": "Croma"
      },
      {
        "date": "2026-10-01",
        "price": 68520,
        "store": "Amazon"
      },
      {
        "date": "2026-10-15",
        "price": 69970,
        "store": "Ajio"
      },
      {
        "date": "2026-10-24",
        "price": 69770,
        "store": "Croma"
      }
    ],
    "rating": 4.2,
    "reviewCount": 3054,
    "popularity": 73,
    "tags": [
      "camera",
      "sony",
      "vlogging",
      "4k-video",
      "mirrorless",
      "cameras",
      "photography"
    ]
  },
  {
    "id": "prod-101",
    "title": "Canon EOS R6 Mark II Mirrorless Camera Body (24.2MP 4K60p)",
    "brand": "Canon",
    "category": "Cameras",
    "imageUrl": "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=600&q=80",
    "description": "Canon EOS R6 Mark II Mirrorless Camera Body (24.2MP 4K60p). Premium quality cameras by Canon. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "myntra",
        "store": "Myntra",
        "price": 187490,
        "mrp": 243995,
        "url": "https://myntra.com/product/canon-eos-r6-mark-ii-mirrorless-cam/p/prod-101",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "ajio",
        "store": "Ajio",
        "price": 204430,
        "mrp": 243995,
        "url": "https://ajio.com/product/canon-eos-r6-mark-ii-mirrorless-cam/p/prod-101",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "amazon",
        "store": "Amazon",
        "price": 199850,
        "mrp": 243995,
        "url": "https://amazon.in/dp/canon-eos-r6-mark-ii-mirrorless-cam/prod-101",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 203910,
        "store": "Ajio"
      },
      {
        "date": "2026-08-01",
        "price": 212370,
        "store": "Myntra"
      },
      {
        "date": "2026-08-15",
        "price": 218490,
        "store": "Amazon"
      },
      {
        "date": "2026-09-01",
        "price": 214380,
        "store": "Myntra"
      },
      {
        "date": "2026-09-15",
        "price": 221930,
        "store": "Myntra"
      },
      {
        "date": "2026-10-01",
        "price": 219640,
        "store": "Amazon"
      },
      {
        "date": "2026-10-15",
        "price": 229450,
        "store": "Myntra"
      },
      {
        "date": "2026-10-24",
        "price": 233760,
        "store": "Amazon"
      }
    ],
    "rating": 4.8,
    "reviewCount": 7734,
    "popularity": 81,
    "tags": [
      "canon",
      "camera",
      "vlogging",
      "4k-video",
      "mirrorless",
      "cameras",
      "photography"
    ]
  },
  {
    "id": "prod-102",
    "title": "Canon EOS R50 Mirrorless Camera with RF-S 18-45mm Lens",
    "brand": "Canon",
    "category": "Cameras",
    "imageUrl": "https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?auto=format&fit=crop&w=600&q=80",
    "description": "Canon EOS R50 Mirrorless Camera with RF-S 18-45mm Lens. Premium quality cameras by Canon. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "ajio",
        "store": "Ajio",
        "price": 55980,
        "mrp": 68995,
        "url": "https://ajio.com/product/canon-eos-r50-mirrorless-camera-wit/p/prod-102",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "croma",
        "store": "Croma",
        "price": 57910,
        "mrp": 68995,
        "url": "https://croma.com/product/canon-eos-r50-mirrorless-camera-wit/p/prod-102",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "flipkart",
        "store": "Flipkart",
        "price": 60090,
        "mrp": 68995,
        "url": "https://flipkart.com/product/canon-eos-r50-mirrorless-camera-wit/p/prod-102",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 56510,
        "store": "Flipkart"
      },
      {
        "date": "2026-08-01",
        "price": 57300,
        "store": "Flipkart"
      },
      {
        "date": "2026-08-15",
        "price": 54630,
        "store": "Flipkart"
      },
      {
        "date": "2026-09-01",
        "price": 56660,
        "store": "Ajio"
      },
      {
        "date": "2026-09-15",
        "price": 55440,
        "store": "Flipkart"
      },
      {
        "date": "2026-10-01",
        "price": 56250,
        "store": "Flipkart"
      },
      {
        "date": "2026-10-15",
        "price": 56370,
        "store": "Ajio"
      },
      {
        "date": "2026-10-24",
        "price": 57440,
        "store": "Ajio"
      }
    ],
    "rating": 4.9,
    "reviewCount": 2223,
    "popularity": 90,
    "tags": [
      "canon",
      "camera",
      "vlogging",
      "4k-video",
      "mirrorless",
      "cameras",
      "photography"
    ]
  },
  {
    "id": "prod-103",
    "title": "Canon EOS 1500D DSLR Camera with EF S18-55 Lens",
    "brand": "Canon",
    "category": "Cameras",
    "imageUrl": "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=80",
    "description": "Canon EOS 1500D DSLR Camera with EF S18-55 Lens. Premium quality cameras by Canon. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "myntra",
        "store": "Myntra",
        "price": 38340,
        "mrp": 47995,
        "url": "https://myntra.com/product/canon-eos-1500d-dslr-camera-with-ef/p/prod-103",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "flipkart",
        "store": "Flipkart",
        "price": 36700,
        "mrp": 47995,
        "url": "https://flipkart.com/product/canon-eos-1500d-dslr-camera-with-ef/p/prod-103",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "amazon",
        "store": "Amazon",
        "price": 40570,
        "mrp": 47995,
        "url": "https://amazon.in/dp/canon-eos-1500d-dslr-camera-with-ef/prod-103",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "ajio",
        "store": "Ajio",
        "price": 38870,
        "mrp": 47995,
        "url": "https://ajio.com/product/canon-eos-1500d-dslr-camera-with-ef/p/prod-103",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 40750,
        "store": "Myntra"
      },
      {
        "date": "2026-08-01",
        "price": 41790,
        "store": "Flipkart"
      },
      {
        "date": "2026-08-15",
        "price": 43270,
        "store": "Flipkart"
      },
      {
        "date": "2026-09-01",
        "price": 41140,
        "store": "Amazon"
      },
      {
        "date": "2026-09-15",
        "price": 39720,
        "store": "Ajio"
      },
      {
        "date": "2026-10-01",
        "price": 38290,
        "store": "Myntra"
      },
      {
        "date": "2026-10-15",
        "price": 36700,
        "store": "Ajio"
      },
      {
        "date": "2026-10-24",
        "price": 36260,
        "store": "Flipkart"
      }
    ],
    "rating": 4.8,
    "reviewCount": 9126,
    "popularity": 86,
    "tags": [
      "canon",
      "camera",
      "vlogging",
      "4k-video",
      "mirrorless",
      "cameras",
      "photography"
    ]
  },
  {
    "id": "prod-104",
    "title": "Nikon Z6 II Mirrorless Camera Body with 24.5MP Sensor",
    "brand": "Nikon",
    "category": "Cameras",
    "imageUrl": "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=600&q=80",
    "description": "Nikon Z6 II Mirrorless Camera Body with 24.5MP Sensor. Premium quality cameras by Nikon. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "flipkart",
        "store": "Flipkart",
        "price": 127410,
        "mrp": 164995,
        "url": "https://flipkart.com/product/nikon-z6-ii-mirrorless-camera-body-/p/prod-104",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "myntra",
        "store": "Myntra",
        "price": 135180,
        "mrp": 164995,
        "url": "https://myntra.com/product/nikon-z6-ii-mirrorless-camera-body-/p/prod-104",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "amazon",
        "store": "Amazon",
        "price": 136780,
        "mrp": 164995,
        "url": "https://amazon.in/dp/nikon-z6-ii-mirrorless-camera-body-/prod-104",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 134710,
        "store": "Myntra"
      },
      {
        "date": "2026-08-01",
        "price": 133210,
        "store": "Flipkart"
      },
      {
        "date": "2026-08-15",
        "price": 139510,
        "store": "Flipkart"
      },
      {
        "date": "2026-09-01",
        "price": 143100,
        "store": "Myntra"
      },
      {
        "date": "2026-09-15",
        "price": 140710,
        "store": "Amazon"
      },
      {
        "date": "2026-10-01",
        "price": 147170,
        "store": "Flipkart"
      },
      {
        "date": "2026-10-15",
        "price": 142210,
        "store": "Myntra"
      },
      {
        "date": "2026-10-24",
        "price": 147880,
        "store": "Flipkart"
      }
    ],
    "rating": 4.4,
    "reviewCount": 2131,
    "popularity": 84,
    "tags": [
      "camera",
      "vlogging",
      "nikon",
      "4k-video",
      "mirrorless",
      "cameras",
      "photography"
    ]
  },
  {
    "id": "prod-105",
    "title": "Nikon Z50 Mirrorless Camera with Z DX 16-50mm Lens",
    "brand": "Nikon",
    "category": "Cameras",
    "imageUrl": "https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?auto=format&fit=crop&w=600&q=80",
    "description": "Nikon Z50 Mirrorless Camera with Z DX 16-50mm Lens. Premium quality cameras by Nikon. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "amazon",
        "store": "Amazon",
        "price": 67830,
        "mrp": 85995,
        "url": "https://amazon.in/dp/nikon-z50-mirrorless-camera-with-z-/prod-105",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "ajio",
        "store": "Ajio",
        "price": 67880,
        "mrp": 85995,
        "url": "https://ajio.com/product/nikon-z50-mirrorless-camera-with-z-/p/prod-105",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "flipkart",
        "store": "Flipkart",
        "price": 72020,
        "mrp": 85995,
        "url": "https://flipkart.com/product/nikon-z50-mirrorless-camera-with-z-/p/prod-105",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "croma",
        "store": "Croma",
        "price": 66110,
        "mrp": 85995,
        "url": "https://croma.com/product/nikon-z50-mirrorless-camera-with-z-/p/prod-105",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 65640,
        "store": "Ajio"
      },
      {
        "date": "2026-08-01",
        "price": 67540,
        "store": "Amazon"
      },
      {
        "date": "2026-08-15",
        "price": 66170,
        "store": "Amazon"
      },
      {
        "date": "2026-09-01",
        "price": 65730,
        "store": "Ajio"
      },
      {
        "date": "2026-09-15",
        "price": 65180,
        "store": "Flipkart"
      },
      {
        "date": "2026-10-01",
        "price": 67170,
        "store": "Ajio"
      },
      {
        "date": "2026-10-15",
        "price": 69610,
        "store": "Amazon"
      },
      {
        "date": "2026-10-24",
        "price": 69630,
        "store": "Flipkart"
      }
    ],
    "rating": 4.9,
    "reviewCount": 5378,
    "popularity": 97,
    "tags": [
      "camera",
      "vlogging",
      "nikon",
      "4k-video",
      "mirrorless",
      "cameras",
      "photography"
    ]
  },
  {
    "id": "prod-106",
    "title": "Fujifilm X-T5 Mirrorless Camera Body (40.2MP X-Trans Sensor)",
    "brand": "Fujifilm",
    "category": "Cameras",
    "imageUrl": "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=80",
    "description": "Fujifilm X-T5 Mirrorless Camera Body (40.2MP X-Trans Sensor). Premium quality cameras by Fujifilm. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "ajio",
        "store": "Ajio",
        "price": 156930,
        "mrp": 169999,
        "url": "https://ajio.com/product/fujifilm-x-t5-mirrorless-camera-bod/p/prod-106",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "flipkart",
        "store": "Flipkart",
        "price": 156000,
        "mrp": 169999,
        "url": "https://flipkart.com/product/fujifilm-x-t5-mirrorless-camera-bod/p/prod-106",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "amazon",
        "store": "Amazon",
        "price": 149500,
        "mrp": 169999,
        "url": "https://amazon.in/dp/fujifilm-x-t5-mirrorless-camera-bod/prod-106",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "croma",
        "store": "Croma",
        "price": 161150,
        "mrp": 169999,
        "url": "https://croma.com/product/fujifilm-x-t5-mirrorless-camera-bod/p/prod-106",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 147710,
        "store": "Ajio"
      },
      {
        "date": "2026-08-01",
        "price": 146960,
        "store": "Amazon"
      },
      {
        "date": "2026-08-15",
        "price": 141270,
        "store": "Ajio"
      },
      {
        "date": "2026-09-01",
        "price": 138230,
        "store": "Ajio"
      },
      {
        "date": "2026-09-15",
        "price": 132190,
        "store": "Flipkart"
      },
      {
        "date": "2026-10-01",
        "price": 128610,
        "store": "Amazon"
      },
      {
        "date": "2026-10-15",
        "price": 128930,
        "store": "Croma"
      },
      {
        "date": "2026-10-24",
        "price": 122550,
        "store": "Ajio"
      }
    ],
    "rating": 4.8,
    "reviewCount": 5367,
    "popularity": 71,
    "tags": [
      "fujifilm",
      "camera",
      "vlogging",
      "4k-video",
      "mirrorless",
      "cameras",
      "photography"
    ]
  },
  {
    "id": "prod-107",
    "title": "Fujifilm Instax Mini 12 Instant Camera (Pastel Blue)",
    "brand": "Fujifilm",
    "category": "Cameras",
    "imageUrl": "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=600&q=80",
    "description": "Fujifilm Instax Mini 12 Instant Camera (Pastel Blue). Premium quality cameras by Fujifilm. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "amazon",
        "store": "Amazon",
        "price": 6320,
        "mrp": 7999,
        "url": "https://amazon.in/dp/fujifilm-instax-mini-12-instant-cam/prod-107",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "croma",
        "store": "Croma",
        "price": 6310,
        "mrp": 7999,
        "url": "https://croma.com/product/fujifilm-instax-mini-12-instant-cam/p/prod-107",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "flipkart",
        "store": "Flipkart",
        "price": 6120,
        "mrp": 7999,
        "url": "https://flipkart.com/product/fujifilm-instax-mini-12-instant-cam/p/prod-107",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 6770,
        "store": "Croma"
      },
      {
        "date": "2026-08-01",
        "price": 6750,
        "store": "Amazon"
      },
      {
        "date": "2026-08-15",
        "price": 6650,
        "store": "Croma"
      },
      {
        "date": "2026-09-01",
        "price": 6620,
        "store": "Flipkart"
      },
      {
        "date": "2026-09-15",
        "price": 6730,
        "store": "Flipkart"
      },
      {
        "date": "2026-10-01",
        "price": 6530,
        "store": "Croma"
      },
      {
        "date": "2026-10-15",
        "price": 6230,
        "store": "Amazon"
      },
      {
        "date": "2026-10-24",
        "price": 6070,
        "store": "Flipkart"
      }
    ],
    "rating": 4.1,
    "reviewCount": 1761,
    "popularity": 84,
    "tags": [
      "fujifilm",
      "camera",
      "vlogging",
      "4k-video",
      "mirrorless",
      "cameras",
      "photography"
    ]
  },
  {
    "id": "prod-108",
    "title": "GoPro HERO 13 Black 5.3K60 Waterproof Action Camera",
    "brand": "GoPro",
    "category": "Cameras",
    "imageUrl": "https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?auto=format&fit=crop&w=600&q=80",
    "description": "GoPro HERO 13 Black 5.3K60 Waterproof Action Camera. Premium quality cameras by GoPro. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "ajio",
        "store": "Ajio",
        "price": 46250,
        "mrp": 49990,
        "url": "https://ajio.com/product/gopro-hero-13-black-5.3k60-waterpro/p/prod-108",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "amazon",
        "store": "Amazon",
        "price": 46010,
        "mrp": 49990,
        "url": "https://amazon.in/dp/gopro-hero-13-black-5.3k60-waterpro/prod-108",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "croma",
        "store": "Croma",
        "price": 42810,
        "mrp": 49990,
        "url": "https://croma.com/product/gopro-hero-13-black-5.3k60-waterpro/p/prod-108",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "myntra",
        "store": "Myntra",
        "price": 47370,
        "mrp": 49990,
        "url": "https://myntra.com/product/gopro-hero-13-black-5.3k60-waterpro/p/prod-108",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 44680,
        "store": "Amazon"
      },
      {
        "date": "2026-08-01",
        "price": 46470,
        "store": "Myntra"
      },
      {
        "date": "2026-08-15",
        "price": 44290,
        "store": "Croma"
      },
      {
        "date": "2026-09-01",
        "price": 45470,
        "store": "Amazon"
      },
      {
        "date": "2026-09-15",
        "price": 44200,
        "store": "Amazon"
      },
      {
        "date": "2026-10-01",
        "price": 43330,
        "store": "Ajio"
      },
      {
        "date": "2026-10-15",
        "price": 45280,
        "store": "Amazon"
      },
      {
        "date": "2026-10-24",
        "price": 46550,
        "store": "Ajio"
      }
    ],
    "rating": 4.3,
    "reviewCount": 254,
    "popularity": 66,
    "tags": [
      "camera",
      "vlogging",
      "4k-video",
      "gopro",
      "mirrorless",
      "cameras",
      "photography"
    ]
  },
  {
    "id": "prod-109",
    "title": "DJI Osmo Pocket 3 4K Handheld Gimbal Camera (1-inch CMOS)",
    "brand": "DJI",
    "category": "Cameras",
    "imageUrl": "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=80",
    "description": "DJI Osmo Pocket 3 4K Handheld Gimbal Camera (1-inch CMOS). Premium quality cameras by DJI. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "myntra",
        "store": "Myntra",
        "price": 41820,
        "mrp": 48990,
        "url": "https://myntra.com/product/dji-osmo-pocket-3-4k-handheld-gimba/p/prod-109",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "flipkart",
        "store": "Flipkart",
        "price": 42210,
        "mrp": 48990,
        "url": "https://flipkart.com/product/dji-osmo-pocket-3-4k-handheld-gimba/p/prod-109",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "ajio",
        "store": "Ajio",
        "price": 44490,
        "mrp": 48990,
        "url": "https://ajio.com/product/dji-osmo-pocket-3-4k-handheld-gimba/p/prod-109",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "croma",
        "store": "Croma",
        "price": 40660,
        "mrp": 48990,
        "url": "https://croma.com/product/dji-osmo-pocket-3-4k-handheld-gimba/p/prod-109",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 43180,
        "store": "Ajio"
      },
      {
        "date": "2026-08-01",
        "price": 42330,
        "store": "Ajio"
      },
      {
        "date": "2026-08-15",
        "price": 43900,
        "store": "Ajio"
      },
      {
        "date": "2026-09-01",
        "price": 41870,
        "store": "Myntra"
      },
      {
        "date": "2026-09-15",
        "price": 41900,
        "store": "Croma"
      },
      {
        "date": "2026-10-01",
        "price": 43580,
        "store": "Croma"
      },
      {
        "date": "2026-10-15",
        "price": 43790,
        "store": "Myntra"
      },
      {
        "date": "2026-10-24",
        "price": 44390,
        "store": "Myntra"
      }
    ],
    "rating": 4.5,
    "reviewCount": 2106,
    "popularity": 66,
    "tags": [
      "camera",
      "vlogging",
      "4k-video",
      "dji",
      "mirrorless",
      "cameras",
      "photography"
    ]
  },
  {
    "id": "prod-110",
    "title": "Nike Air Jordan 1 Retro High OG (Chicago Lost & Found)",
    "brand": "Nike",
    "category": "Footwear",
    "imageUrl": "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&w=600&q=80",
    "description": "Nike Air Jordan 1 Retro High OG (Chicago Lost & Found). Premium quality footwear by Nike. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "ajio",
        "store": "Ajio",
        "price": 16940,
        "mrp": 19995,
        "url": "https://ajio.com/product/nike-air-jordan-1-retro-high-og-chi/p/prod-110",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "flipkart",
        "store": "Flipkart",
        "price": 17850,
        "mrp": 19995,
        "url": "https://flipkart.com/product/nike-air-jordan-1-retro-high-og-chi/p/prod-110",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "amazon",
        "store": "Amazon",
        "price": 16670,
        "mrp": 19995,
        "url": "https://amazon.in/dp/nike-air-jordan-1-retro-high-og-chi/prod-110",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 16510,
        "store": "Ajio"
      },
      {
        "date": "2026-08-01",
        "price": 16130,
        "store": "Flipkart"
      },
      {
        "date": "2026-08-15",
        "price": 16630,
        "store": "Ajio"
      },
      {
        "date": "2026-09-01",
        "price": 16020,
        "store": "Ajio"
      },
      {
        "date": "2026-09-15",
        "price": 16400,
        "store": "Flipkart"
      },
      {
        "date": "2026-10-01",
        "price": 15900,
        "store": "Ajio"
      },
      {
        "date": "2026-10-15",
        "price": 15780,
        "store": "Flipkart"
      },
      {
        "date": "2026-10-24",
        "price": 15560,
        "store": "Flipkart"
      }
    ],
    "rating": 4.6,
    "reviewCount": 3089,
    "popularity": 79,
    "tags": [
      "sports",
      "comfort",
      "running",
      "shoes",
      "sneakers",
      "footwear",
      "nike"
    ]
  },
  {
    "id": "prod-111",
    "title": "Nike Air Max 270 React Running Shoes (Triple Black)",
    "brand": "Nike",
    "category": "Footwear",
    "imageUrl": "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=600&q=80",
    "description": "Nike Air Max 270 React Running Shoes (Triple Black). Premium quality footwear by Nike. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "croma",
        "store": "Croma",
        "price": 11340,
        "mrp": 15995,
        "url": "https://croma.com/product/nike-air-max-270-react-running-shoe/p/prod-111",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "myntra",
        "store": "Myntra",
        "price": 12540,
        "mrp": 15995,
        "url": "https://myntra.com/product/nike-air-max-270-react-running-shoe/p/prod-111",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "flipkart",
        "store": "Flipkart",
        "price": 11910,
        "mrp": 15995,
        "url": "https://flipkart.com/product/nike-air-max-270-react-running-shoe/p/prod-111",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 12580,
        "store": "Croma"
      },
      {
        "date": "2026-08-01",
        "price": 12000,
        "store": "Flipkart"
      },
      {
        "date": "2026-08-15",
        "price": 11710,
        "store": "Flipkart"
      },
      {
        "date": "2026-09-01",
        "price": 12000,
        "store": "Flipkart"
      },
      {
        "date": "2026-09-15",
        "price": 11800,
        "store": "Flipkart"
      },
      {
        "date": "2026-10-01",
        "price": 11250,
        "store": "Flipkart"
      },
      {
        "date": "2026-10-15",
        "price": 11100,
        "store": "Croma"
      },
      {
        "date": "2026-10-24",
        "price": 10690,
        "store": "Myntra"
      }
    ],
    "rating": 4.2,
    "reviewCount": 17612,
    "popularity": 97,
    "tags": [
      "sports",
      "comfort",
      "running",
      "shoes",
      "sneakers",
      "footwear",
      "nike"
    ]
  },
  {
    "id": "prod-112",
    "title": "Nike Pegasus 41 Road Running Shoes (Volt/White)",
    "brand": "Nike",
    "category": "Footwear",
    "imageUrl": "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?auto=format&fit=crop&w=600&q=80",
    "description": "Nike Pegasus 41 Road Running Shoes (Volt/White). Premium quality footwear by Nike. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "amazon",
        "store": "Amazon",
        "price": 10200,
        "mrp": 12995,
        "url": "https://amazon.in/dp/nike-pegasus-41-road-running-shoes-/prod-112",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "ajio",
        "store": "Ajio",
        "price": 10710,
        "mrp": 12995,
        "url": "https://ajio.com/product/nike-pegasus-41-road-running-shoes-/p/prod-112",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "flipkart",
        "store": "Flipkart",
        "price": 11260,
        "mrp": 12995,
        "url": "https://flipkart.com/product/nike-pegasus-41-road-running-shoes-/p/prod-112",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "myntra",
        "store": "Myntra",
        "price": 10320,
        "mrp": 12995,
        "url": "https://myntra.com/product/nike-pegasus-41-road-running-shoes-/p/prod-112",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 11000,
        "store": "Myntra"
      },
      {
        "date": "2026-08-01",
        "price": 10540,
        "store": "Amazon"
      },
      {
        "date": "2026-08-15",
        "price": 10970,
        "store": "Myntra"
      },
      {
        "date": "2026-09-01",
        "price": 10820,
        "store": "Amazon"
      },
      {
        "date": "2026-09-15",
        "price": 10670,
        "store": "Ajio"
      },
      {
        "date": "2026-10-01",
        "price": 10580,
        "store": "Myntra"
      },
      {
        "date": "2026-10-15",
        "price": 10630,
        "store": "Ajio"
      },
      {
        "date": "2026-10-24",
        "price": 10840,
        "store": "Ajio"
      }
    ],
    "rating": 4.3,
    "reviewCount": 13396,
    "popularity": 90,
    "tags": [
      "sports",
      "comfort",
      "running",
      "shoes",
      "sneakers",
      "footwear",
      "nike"
    ]
  },
  {
    "id": "prod-113",
    "title": "Nike Dunk Low Retro Casual Sneakers (Panda Black/White)",
    "brand": "Nike",
    "category": "Footwear",
    "imageUrl": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80",
    "description": "Nike Dunk Low Retro Casual Sneakers (Panda Black/White). Premium quality footwear by Nike. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "amazon",
        "store": "Amazon",
        "price": 8480,
        "mrp": 9695,
        "url": "https://amazon.in/dp/nike-dunk-low-retro-casual-sneakers/prod-113",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "ajio",
        "store": "Ajio",
        "price": 8470,
        "mrp": 9695,
        "url": "https://ajio.com/product/nike-dunk-low-retro-casual-sneakers/p/prod-113",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "croma",
        "store": "Croma",
        "price": 8490,
        "mrp": 9695,
        "url": "https://croma.com/product/nike-dunk-low-retro-casual-sneakers/p/prod-113",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 8400,
        "store": "Ajio"
      },
      {
        "date": "2026-08-01",
        "price": 8580,
        "store": "Amazon"
      },
      {
        "date": "2026-08-15",
        "price": 8390,
        "store": "Amazon"
      },
      {
        "date": "2026-09-01",
        "price": 8130,
        "store": "Amazon"
      },
      {
        "date": "2026-09-15",
        "price": 8200,
        "store": "Amazon"
      },
      {
        "date": "2026-10-01",
        "price": 8280,
        "store": "Ajio"
      },
      {
        "date": "2026-10-15",
        "price": 8450,
        "store": "Amazon"
      },
      {
        "date": "2026-10-24",
        "price": 8360,
        "store": "Croma"
      }
    ],
    "rating": 4.8,
    "reviewCount": 16023,
    "popularity": 78,
    "tags": [
      "sports",
      "comfort",
      "running",
      "shoes",
      "sneakers",
      "footwear",
      "nike"
    ]
  },
  {
    "id": "prod-114",
    "title": "Adidas Ultraboost Light Running Shoes (Core Black)",
    "brand": "Adidas",
    "category": "Footwear",
    "imageUrl": "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&w=600&q=80",
    "description": "Adidas Ultraboost Light Running Shoes (Core Black). Premium quality footwear by Adidas. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "myntra",
        "store": "Myntra",
        "price": 13570,
        "mrp": 19999,
        "url": "https://myntra.com/product/adidas-ultraboost-light-running-sho/p/prod-114",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "flipkart",
        "store": "Flipkart",
        "price": 13950,
        "mrp": 19999,
        "url": "https://flipkart.com/product/adidas-ultraboost-light-running-sho/p/prod-114",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "amazon",
        "store": "Amazon",
        "price": 13680,
        "mrp": 19999,
        "url": "https://amazon.in/dp/adidas-ultraboost-light-running-sho/prod-114",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 14300,
        "store": "Myntra"
      },
      {
        "date": "2026-08-01",
        "price": 13670,
        "store": "Amazon"
      },
      {
        "date": "2026-08-15",
        "price": 14120,
        "store": "Amazon"
      },
      {
        "date": "2026-09-01",
        "price": 14350,
        "store": "Myntra"
      },
      {
        "date": "2026-09-15",
        "price": 13940,
        "store": "Myntra"
      },
      {
        "date": "2026-10-01",
        "price": 13670,
        "store": "Flipkart"
      },
      {
        "date": "2026-10-15",
        "price": 13840,
        "store": "Amazon"
      },
      {
        "date": "2026-10-24",
        "price": 14120,
        "store": "Amazon"
      }
    ],
    "rating": 4.7,
    "reviewCount": 7467,
    "popularity": 73,
    "tags": [
      "sports",
      "comfort",
      "running",
      "shoes",
      "sneakers",
      "adidas",
      "footwear"
    ]
  },
  {
    "id": "prod-115",
    "title": "Adidas Originals Samba Classic Indoor Sneakers (White/Black)",
    "brand": "Adidas",
    "category": "Footwear",
    "imageUrl": "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=600&q=80",
    "description": "Adidas Originals Samba Classic Indoor Sneakers (White/Black). Premium quality footwear by Adidas. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "flipkart",
        "store": "Flipkart",
        "price": 10110,
        "mrp": 11999,
        "url": "https://flipkart.com/product/adidas-originals-samba-classic-indo/p/prod-115",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "ajio",
        "store": "Ajio",
        "price": 10550,
        "mrp": 11999,
        "url": "https://ajio.com/product/adidas-originals-samba-classic-indo/p/prod-115",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "croma",
        "store": "Croma",
        "price": 9900,
        "mrp": 11999,
        "url": "https://croma.com/product/adidas-originals-samba-classic-indo/p/prod-115",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "amazon",
        "store": "Amazon",
        "price": 9990,
        "mrp": 11999,
        "url": "https://amazon.in/dp/adidas-originals-samba-classic-indo/prod-115",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 9830,
        "store": "Flipkart"
      },
      {
        "date": "2026-08-01",
        "price": 9410,
        "store": "Croma"
      },
      {
        "date": "2026-08-15",
        "price": 8950,
        "store": "Croma"
      },
      {
        "date": "2026-09-01",
        "price": 8910,
        "store": "Ajio"
      },
      {
        "date": "2026-09-15",
        "price": 9260,
        "store": "Amazon"
      },
      {
        "date": "2026-10-01",
        "price": 8820,
        "store": "Flipkart"
      },
      {
        "date": "2026-10-15",
        "price": 8870,
        "store": "Croma"
      },
      {
        "date": "2026-10-24",
        "price": 8640,
        "store": "Flipkart"
      }
    ],
    "rating": 4.7,
    "reviewCount": 1111,
    "popularity": 93,
    "tags": [
      "sports",
      "comfort",
      "running",
      "shoes",
      "sneakers",
      "adidas",
      "footwear"
    ]
  },
  {
    "id": "prod-116",
    "title": "Adidas Stan Smith Sustainable Leather Sneakers (White/Green)",
    "brand": "Adidas",
    "category": "Footwear",
    "imageUrl": "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?auto=format&fit=crop&w=600&q=80",
    "description": "Adidas Stan Smith Sustainable Leather Sneakers (White/Green). Premium quality footwear by Adidas. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "croma",
        "store": "Croma",
        "price": 6780,
        "mrp": 8999,
        "url": "https://croma.com/product/adidas-stan-smith-sustainable-leath/p/prod-116",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "flipkart",
        "store": "Flipkart",
        "price": 7100,
        "mrp": 8999,
        "url": "https://flipkart.com/product/adidas-stan-smith-sustainable-leath/p/prod-116",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "amazon",
        "store": "Amazon",
        "price": 6960,
        "mrp": 8999,
        "url": "https://amazon.in/dp/adidas-stan-smith-sustainable-leath/prod-116",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 6710,
        "store": "Amazon"
      },
      {
        "date": "2026-08-01",
        "price": 6860,
        "store": "Flipkart"
      },
      {
        "date": "2026-08-15",
        "price": 6870,
        "store": "Flipkart"
      },
      {
        "date": "2026-09-01",
        "price": 7080,
        "store": "Croma"
      },
      {
        "date": "2026-09-15",
        "price": 6750,
        "store": "Flipkart"
      },
      {
        "date": "2026-10-01",
        "price": 6500,
        "store": "Croma"
      },
      {
        "date": "2026-10-15",
        "price": 6410,
        "store": "Amazon"
      },
      {
        "date": "2026-10-24",
        "price": 6480,
        "store": "Amazon"
      }
    ],
    "rating": 4.9,
    "reviewCount": 11814,
    "popularity": 77,
    "tags": [
      "sports",
      "comfort",
      "running",
      "shoes",
      "sneakers",
      "adidas",
      "footwear"
    ]
  },
  {
    "id": "prod-117",
    "title": "Puma Deviate Nitro 2 Marathon Running Shoes (Fire)",
    "brand": "Puma",
    "category": "Footwear",
    "imageUrl": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80",
    "description": "Puma Deviate Nitro 2 Marathon Running Shoes (Fire). Premium quality footwear by Puma. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "ajio",
        "store": "Ajio",
        "price": 11550,
        "mrp": 15999,
        "url": "https://ajio.com/product/puma-deviate-nitro-2-marathon-runni/p/prod-117",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "flipkart",
        "store": "Flipkart",
        "price": 11610,
        "mrp": 15999,
        "url": "https://flipkart.com/product/puma-deviate-nitro-2-marathon-runni/p/prod-117",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "myntra",
        "store": "Myntra",
        "price": 11310,
        "mrp": 15999,
        "url": "https://myntra.com/product/puma-deviate-nitro-2-marathon-runni/p/prod-117",
        "inStock": false,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 12010,
        "store": "Flipkart"
      },
      {
        "date": "2026-08-01",
        "price": 11960,
        "store": "Flipkart"
      },
      {
        "date": "2026-08-15",
        "price": 12400,
        "store": "Myntra"
      },
      {
        "date": "2026-09-01",
        "price": 12330,
        "store": "Ajio"
      },
      {
        "date": "2026-09-15",
        "price": 11750,
        "store": "Ajio"
      },
      {
        "date": "2026-10-01",
        "price": 11320,
        "store": "Ajio"
      },
      {
        "date": "2026-10-15",
        "price": 11630,
        "store": "Ajio"
      },
      {
        "date": "2026-10-24",
        "price": 12070,
        "store": "Ajio"
      }
    ],
    "rating": 4.7,
    "reviewCount": 11277,
    "popularity": 98,
    "tags": [
      "puma",
      "sports",
      "comfort",
      "running",
      "shoes",
      "sneakers",
      "footwear"
    ]
  },
  {
    "id": "prod-118",
    "title": "Puma Suede Classic XXI Heritage Sneakers (Peacoat Blue)",
    "brand": "Puma",
    "category": "Footwear",
    "imageUrl": "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&w=600&q=80",
    "description": "Puma Suede Classic XXI Heritage Sneakers (Peacoat Blue). Premium quality footwear by Puma. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "myntra",
        "store": "Myntra",
        "price": 5190,
        "mrp": 6999,
        "url": "https://myntra.com/product/puma-suede-classic-xxi-heritage-sne/p/prod-118",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "ajio",
        "store": "Ajio",
        "price": 4970,
        "mrp": 6999,
        "url": "https://ajio.com/product/puma-suede-classic-xxi-heritage-sne/p/prod-118",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "amazon",
        "store": "Amazon",
        "price": 5060,
        "mrp": 6999,
        "url": "https://amazon.in/dp/puma-suede-classic-xxi-heritage-sne/prod-118",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "croma",
        "store": "Croma",
        "price": 4880,
        "mrp": 6999,
        "url": "https://croma.com/product/puma-suede-classic-xxi-heritage-sne/p/prod-118",
        "inStock": false,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 5120,
        "store": "Croma"
      },
      {
        "date": "2026-08-01",
        "price": 5240,
        "store": "Myntra"
      },
      {
        "date": "2026-08-15",
        "price": 5370,
        "store": "Ajio"
      },
      {
        "date": "2026-09-01",
        "price": 5440,
        "store": "Amazon"
      },
      {
        "date": "2026-09-15",
        "price": 5400,
        "store": "Croma"
      },
      {
        "date": "2026-10-01",
        "price": 5310,
        "store": "Myntra"
      },
      {
        "date": "2026-10-15",
        "price": 5130,
        "store": "Amazon"
      },
      {
        "date": "2026-10-24",
        "price": 5190,
        "store": "Ajio"
      }
    ],
    "rating": 4.7,
    "reviewCount": 17868,
    "popularity": 98,
    "tags": [
      "puma",
      "sports",
      "comfort",
      "running",
      "shoes",
      "sneakers",
      "footwear"
    ]
  },
  {
    "id": "prod-119",
    "title": "Asics Gel-Kayano 31 Stability Running Shoes (Black/Pure)",
    "brand": "Asics",
    "category": "Footwear",
    "imageUrl": "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=600&q=80",
    "description": "Asics Gel-Kayano 31 Stability Running Shoes (Black/Pure). Premium quality footwear by Asics. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "flipkart",
        "store": "Flipkart",
        "price": 14260,
        "mrp": 17999,
        "url": "https://flipkart.com/product/asics-gel-kayano-31-stability-runni/p/prod-119",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "ajio",
        "store": "Ajio",
        "price": 14280,
        "mrp": 17999,
        "url": "https://ajio.com/product/asics-gel-kayano-31-stability-runni/p/prod-119",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "croma",
        "store": "Croma",
        "price": 14970,
        "mrp": 17999,
        "url": "https://croma.com/product/asics-gel-kayano-31-stability-runni/p/prod-119",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 15640,
        "store": "Flipkart"
      },
      {
        "date": "2026-08-01",
        "price": 15620,
        "store": "Croma"
      },
      {
        "date": "2026-08-15",
        "price": 15880,
        "store": "Flipkart"
      },
      {
        "date": "2026-09-01",
        "price": 15190,
        "store": "Ajio"
      },
      {
        "date": "2026-09-15",
        "price": 14740,
        "store": "Croma"
      },
      {
        "date": "2026-10-01",
        "price": 15410,
        "store": "Ajio"
      },
      {
        "date": "2026-10-15",
        "price": 15330,
        "store": "Croma"
      },
      {
        "date": "2026-10-24",
        "price": 15020,
        "store": "Ajio"
      }
    ],
    "rating": 4.2,
    "reviewCount": 16715,
    "popularity": 99,
    "tags": [
      "sports",
      "comfort",
      "running",
      "shoes",
      "sneakers",
      "footwear",
      "asics"
    ]
  },
  {
    "id": "prod-120",
    "title": "Asics Gel-Nimbus 26 Neutral Cushioning Running Shoes",
    "brand": "Asics",
    "category": "Footwear",
    "imageUrl": "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?auto=format&fit=crop&w=600&q=80",
    "description": "Asics Gel-Nimbus 26 Neutral Cushioning Running Shoes. Premium quality footwear by Asics. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "croma",
        "store": "Croma",
        "price": 14630,
        "mrp": 16999,
        "url": "https://croma.com/product/asics-gel-nimbus-26-neutral-cushion/p/prod-120",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "ajio",
        "store": "Ajio",
        "price": 14430,
        "mrp": 16999,
        "url": "https://ajio.com/product/asics-gel-nimbus-26-neutral-cushion/p/prod-120",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "amazon",
        "store": "Amazon",
        "price": 14670,
        "mrp": 16999,
        "url": "https://amazon.in/dp/asics-gel-nimbus-26-neutral-cushion/prod-120",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 14510,
        "store": "Croma"
      },
      {
        "date": "2026-08-01",
        "price": 14220,
        "store": "Amazon"
      },
      {
        "date": "2026-08-15",
        "price": 14660,
        "store": "Amazon"
      },
      {
        "date": "2026-09-01",
        "price": 15180,
        "store": "Ajio"
      },
      {
        "date": "2026-09-15",
        "price": 15660,
        "store": "Ajio"
      },
      {
        "date": "2026-10-01",
        "price": 15430,
        "store": "Ajio"
      },
      {
        "date": "2026-10-15",
        "price": 16150,
        "store": "Ajio"
      },
      {
        "date": "2026-10-24",
        "price": 15800,
        "store": "Amazon"
      }
    ],
    "rating": 4.0,
    "reviewCount": 2452,
    "popularity": 67,
    "tags": [
      "sports",
      "comfort",
      "running",
      "shoes",
      "sneakers",
      "footwear",
      "asics"
    ]
  },
  {
    "id": "prod-121",
    "title": "New Balance 574 Core Heritage Lifestyle Sneakers (Grey)",
    "brand": "New Balance",
    "category": "Footwear",
    "imageUrl": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80",
    "description": "New Balance 574 Core Heritage Lifestyle Sneakers (Grey). Premium quality footwear by New Balance. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "flipkart",
        "store": "Flipkart",
        "price": 8390,
        "mrp": 9999,
        "url": "https://flipkart.com/product/new-balance-574-core-heritage-lifes/p/prod-121",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "croma",
        "store": "Croma",
        "price": 7810,
        "mrp": 9999,
        "url": "https://croma.com/product/new-balance-574-core-heritage-lifes/p/prod-121",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "amazon",
        "store": "Amazon",
        "price": 8050,
        "mrp": 9999,
        "url": "https://amazon.in/dp/new-balance-574-core-heritage-lifes/prod-121",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 8230,
        "store": "Amazon"
      },
      {
        "date": "2026-08-01",
        "price": 8090,
        "store": "Croma"
      },
      {
        "date": "2026-08-15",
        "price": 8260,
        "store": "Croma"
      },
      {
        "date": "2026-09-01",
        "price": 8090,
        "store": "Amazon"
      },
      {
        "date": "2026-09-15",
        "price": 8160,
        "store": "Amazon"
      },
      {
        "date": "2026-10-01",
        "price": 8470,
        "store": "Amazon"
      },
      {
        "date": "2026-10-15",
        "price": 8550,
        "store": "Croma"
      },
      {
        "date": "2026-10-24",
        "price": 8470,
        "store": "Flipkart"
      }
    ],
    "rating": 4.5,
    "reviewCount": 2461,
    "popularity": 83,
    "tags": [
      "sports",
      "new balance",
      "comfort",
      "running",
      "shoes",
      "sneakers",
      "footwear"
    ]
  },
  {
    "id": "prod-122",
    "title": "New Balance 990v6 Made in USA Running Shoes (Castlerock)",
    "brand": "New Balance",
    "category": "Footwear",
    "imageUrl": "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&w=600&q=80",
    "description": "New Balance 990v6 Made in USA Running Shoes (Castlerock). Premium quality footwear by New Balance. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "croma",
        "store": "Croma",
        "price": 22070,
        "mrp": 25999,
        "url": "https://croma.com/product/new-balance-990v6-made-in-usa-runni/p/prod-122",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "myntra",
        "store": "Myntra",
        "price": 23710,
        "mrp": 25999,
        "url": "https://myntra.com/product/new-balance-990v6-made-in-usa-runni/p/prod-122",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "amazon",
        "store": "Amazon",
        "price": 21980,
        "mrp": 25999,
        "url": "https://amazon.in/dp/new-balance-990v6-made-in-usa-runni/prod-122",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "flipkart",
        "store": "Flipkart",
        "price": 21870,
        "mrp": 25999,
        "url": "https://flipkart.com/product/new-balance-990v6-made-in-usa-runni/p/prod-122",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 23030,
        "store": "Amazon"
      },
      {
        "date": "2026-08-01",
        "price": 22890,
        "store": "Flipkart"
      },
      {
        "date": "2026-08-15",
        "price": 22050,
        "store": "Myntra"
      },
      {
        "date": "2026-09-01",
        "price": 22170,
        "store": "Flipkart"
      },
      {
        "date": "2026-09-15",
        "price": 21620,
        "store": "Myntra"
      },
      {
        "date": "2026-10-01",
        "price": 22330,
        "store": "Myntra"
      },
      {
        "date": "2026-10-15",
        "price": 22640,
        "store": "Flipkart"
      },
      {
        "date": "2026-10-24",
        "price": 21590,
        "store": "Amazon"
      }
    ],
    "rating": 4.5,
    "reviewCount": 7919,
    "popularity": 65,
    "tags": [
      "sports",
      "new balance",
      "comfort",
      "running",
      "shoes",
      "sneakers",
      "footwear"
    ]
  },
  {
    "id": "prod-123",
    "title": "Reebok Club C 85 Vintage Tennis Sneakers (Chalk/Green)",
    "brand": "Reebok",
    "category": "Footwear",
    "imageUrl": "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=600&q=80",
    "description": "Reebok Club C 85 Vintage Tennis Sneakers (Chalk/Green). Premium quality footwear by Reebok. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "flipkart",
        "store": "Flipkart",
        "price": 5660,
        "mrp": 7999,
        "url": "https://flipkart.com/product/reebok-club-c-85-vintage-tennis-sne/p/prod-123",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "ajio",
        "store": "Ajio",
        "price": 5480,
        "mrp": 7999,
        "url": "https://ajio.com/product/reebok-club-c-85-vintage-tennis-sne/p/prod-123",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "myntra",
        "store": "Myntra",
        "price": 5440,
        "mrp": 7999,
        "url": "https://myntra.com/product/reebok-club-c-85-vintage-tennis-sne/p/prod-123",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "amazon",
        "store": "Amazon",
        "price": 5650,
        "mrp": 7999,
        "url": "https://amazon.in/dp/reebok-club-c-85-vintage-tennis-sne/prod-123",
        "inStock": false,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 5520,
        "store": "Myntra"
      },
      {
        "date": "2026-08-01",
        "price": 5680,
        "store": "Myntra"
      },
      {
        "date": "2026-08-15",
        "price": 5660,
        "store": "Flipkart"
      },
      {
        "date": "2026-09-01",
        "price": 5730,
        "store": "Flipkart"
      },
      {
        "date": "2026-09-15",
        "price": 5560,
        "store": "Amazon"
      },
      {
        "date": "2026-10-01",
        "price": 5620,
        "store": "Myntra"
      },
      {
        "date": "2026-10-15",
        "price": 5380,
        "store": "Myntra"
      },
      {
        "date": "2026-10-24",
        "price": 5160,
        "store": "Amazon"
      }
    ],
    "rating": 4.5,
    "reviewCount": 17950,
    "popularity": 65,
    "tags": [
      "sports",
      "reebok",
      "comfort",
      "running",
      "shoes",
      "sneakers",
      "footwear"
    ]
  },
  {
    "id": "prod-124",
    "title": "Reebok Nano X4 Cross Training Shoes (Black/Gum)",
    "brand": "Reebok",
    "category": "Footwear",
    "imageUrl": "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?auto=format&fit=crop&w=600&q=80",
    "description": "Reebok Nano X4 Cross Training Shoes (Black/Gum). Premium quality footwear by Reebok. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "ajio",
        "store": "Ajio",
        "price": 9680,
        "mrp": 12999,
        "url": "https://ajio.com/product/reebok-nano-x4-cross-training-shoes/p/prod-124",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "flipkart",
        "store": "Flipkart",
        "price": 9710,
        "mrp": 12999,
        "url": "https://flipkart.com/product/reebok-nano-x4-cross-training-shoes/p/prod-124",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "myntra",
        "store": "Myntra",
        "price": 9840,
        "mrp": 12999,
        "url": "https://myntra.com/product/reebok-nano-x4-cross-training-shoes/p/prod-124",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "croma",
        "store": "Croma",
        "price": 10440,
        "mrp": 12999,
        "url": "https://croma.com/product/reebok-nano-x4-cross-training-shoes/p/prod-124",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 10420,
        "store": "Croma"
      },
      {
        "date": "2026-08-01",
        "price": 10090,
        "store": "Croma"
      },
      {
        "date": "2026-08-15",
        "price": 10150,
        "store": "Flipkart"
      },
      {
        "date": "2026-09-01",
        "price": 10190,
        "store": "Myntra"
      },
      {
        "date": "2026-09-15",
        "price": 10310,
        "store": "Ajio"
      },
      {
        "date": "2026-10-01",
        "price": 10160,
        "store": "Croma"
      },
      {
        "date": "2026-10-15",
        "price": 9690,
        "store": "Croma"
      },
      {
        "date": "2026-10-24",
        "price": 9290,
        "store": "Croma"
      }
    ],
    "rating": 4.1,
    "reviewCount": 3851,
    "popularity": 82,
    "tags": [
      "sports",
      "reebok",
      "comfort",
      "running",
      "shoes",
      "sneakers",
      "footwear"
    ]
  },
  {
    "id": "prod-125",
    "title": "Levi's Men 511 Slim Fit Jeans (Dark Indigo Stretch Denim)",
    "brand": "Levi's",
    "category": "Clothing",
    "imageUrl": "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=600&q=80",
    "description": "Levi's Men 511 Slim Fit Jeans (Dark Indigo Stretch Denim). Premium quality clothing by Levi's. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "flipkart",
        "store": "Flipkart",
        "price": 2170,
        "mrp": 3999,
        "url": "https://flipkart.com/product/levi's-men-511-slim-fit-jeans-dark-/p/prod-125",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "croma",
        "store": "Croma",
        "price": 2000,
        "mrp": 3999,
        "url": "https://croma.com/product/levi's-men-511-slim-fit-jeans-dark-/p/prod-125",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "amazon",
        "store": "Amazon",
        "price": 2000,
        "mrp": 3999,
        "url": "https://amazon.in/dp/levi's-men-511-slim-fit-jeans-dark-/prod-125",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 2130,
        "store": "Croma"
      },
      {
        "date": "2026-08-01",
        "price": 2200,
        "store": "Flipkart"
      },
      {
        "date": "2026-08-15",
        "price": 2290,
        "store": "Flipkart"
      },
      {
        "date": "2026-09-01",
        "price": 2240,
        "store": "Flipkart"
      },
      {
        "date": "2026-09-15",
        "price": 2300,
        "store": "Amazon"
      },
      {
        "date": "2026-10-01",
        "price": 2390,
        "store": "Croma"
      },
      {
        "date": "2026-10-15",
        "price": 2500,
        "store": "Amazon"
      },
      {
        "date": "2026-10-24",
        "price": 2620,
        "store": "Amazon"
      }
    ],
    "rating": 4.1,
    "reviewCount": 6517,
    "popularity": 76,
    "tags": [
      "levi's",
      "clothing",
      "cotton",
      "fashion",
      "casual",
      "denim",
      "apparel"
    ]
  },
  {
    "id": "prod-126",
    "title": "Levi's Men 501 Original Fit Straight Leg Jeans (Rinse)",
    "brand": "Levi's",
    "category": "Clothing",
    "imageUrl": "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=600&q=80",
    "description": "Levi's Men 501 Original Fit Straight Leg Jeans (Rinse). Premium quality clothing by Levi's. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "ajio",
        "store": "Ajio",
        "price": 3000,
        "mrp": 4599,
        "url": "https://ajio.com/product/levi's-men-501-original-fit-straigh/p/prod-126",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "amazon",
        "store": "Amazon",
        "price": 2740,
        "mrp": 4599,
        "url": "https://amazon.in/dp/levi's-men-501-original-fit-straigh/prod-126",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "croma",
        "store": "Croma",
        "price": 2810,
        "mrp": 4599,
        "url": "https://croma.com/product/levi's-men-501-original-fit-straigh/p/prod-126",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 2800,
        "store": "Croma"
      },
      {
        "date": "2026-08-01",
        "price": 2850,
        "store": "Amazon"
      },
      {
        "date": "2026-08-15",
        "price": 2930,
        "store": "Ajio"
      },
      {
        "date": "2026-09-01",
        "price": 3000,
        "store": "Croma"
      },
      {
        "date": "2026-09-15",
        "price": 3030,
        "store": "Ajio"
      },
      {
        "date": "2026-10-01",
        "price": 3030,
        "store": "Croma"
      },
      {
        "date": "2026-10-15",
        "price": 3080,
        "store": "Ajio"
      },
      {
        "date": "2026-10-24",
        "price": 3160,
        "store": "Croma"
      }
    ],
    "rating": 4.9,
    "reviewCount": 9072,
    "popularity": 93,
    "tags": [
      "levi's",
      "clothing",
      "cotton",
      "fashion",
      "casual",
      "denim",
      "apparel"
    ]
  },
  {
    "id": "prod-127",
    "title": "Levi's Vintage Fit Sherpa Lined Trucker Denim Jacket",
    "brand": "Levi's",
    "category": "Clothing",
    "imageUrl": "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80",
    "description": "Levi's Vintage Fit Sherpa Lined Trucker Denim Jacket. Premium quality clothing by Levi's. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "flipkart",
        "store": "Flipkart",
        "price": 5010,
        "mrp": 7999,
        "url": "https://flipkart.com/product/levi's-vintage-fit-sherpa-lined-tru/p/prod-127",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "croma",
        "store": "Croma",
        "price": 4930,
        "mrp": 7999,
        "url": "https://croma.com/product/levi's-vintage-fit-sherpa-lined-tru/p/prod-127",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "ajio",
        "store": "Ajio",
        "price": 5090,
        "mrp": 7999,
        "url": "https://ajio.com/product/levi's-vintage-fit-sherpa-lined-tru/p/prod-127",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "myntra",
        "store": "Myntra",
        "price": 5070,
        "mrp": 7999,
        "url": "https://myntra.com/product/levi's-vintage-fit-sherpa-lined-tru/p/prod-127",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 5100,
        "store": "Flipkart"
      },
      {
        "date": "2026-08-01",
        "price": 5020,
        "store": "Croma"
      },
      {
        "date": "2026-08-15",
        "price": 5210,
        "store": "Ajio"
      },
      {
        "date": "2026-09-01",
        "price": 5090,
        "store": "Myntra"
      },
      {
        "date": "2026-09-15",
        "price": 5130,
        "store": "Croma"
      },
      {
        "date": "2026-10-01",
        "price": 5040,
        "store": "Flipkart"
      },
      {
        "date": "2026-10-15",
        "price": 5260,
        "store": "Ajio"
      },
      {
        "date": "2026-10-24",
        "price": 5160,
        "store": "Flipkart"
      }
    ],
    "rating": 4.5,
    "reviewCount": 18131,
    "popularity": 77,
    "tags": [
      "levi's",
      "clothing",
      "cotton",
      "fashion",
      "casual",
      "denim",
      "apparel"
    ]
  },
  {
    "id": "prod-128",
    "title": "Zara Structured Suit Blazer for Men (Navy Blue Slim)",
    "brand": "Zara",
    "category": "Clothing",
    "imageUrl": "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=600&q=80",
    "description": "Zara Structured Suit Blazer for Men (Navy Blue Slim). Premium quality clothing by Zara. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "myntra",
        "store": "Myntra",
        "price": 6770,
        "mrp": 8990,
        "url": "https://myntra.com/product/zara-structured-suit-blazer-for-men/p/prod-128",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "flipkart",
        "store": "Flipkart",
        "price": 6780,
        "mrp": 8990,
        "url": "https://flipkart.com/product/zara-structured-suit-blazer-for-men/p/prod-128",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "amazon",
        "store": "Amazon",
        "price": 7080,
        "mrp": 8990,
        "url": "https://amazon.in/dp/zara-structured-suit-blazer-for-men/prod-128",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 6960,
        "store": "Flipkart"
      },
      {
        "date": "2026-08-01",
        "price": 7280,
        "store": "Amazon"
      },
      {
        "date": "2026-08-15",
        "price": 7100,
        "store": "Amazon"
      },
      {
        "date": "2026-09-01",
        "price": 6750,
        "store": "Flipkart"
      },
      {
        "date": "2026-09-15",
        "price": 6930,
        "store": "Flipkart"
      },
      {
        "date": "2026-10-01",
        "price": 6710,
        "store": "Flipkart"
      },
      {
        "date": "2026-10-15",
        "price": 6940,
        "store": "Myntra"
      },
      {
        "date": "2026-10-24",
        "price": 7250,
        "store": "Amazon"
      }
    ],
    "rating": 4.2,
    "reviewCount": 8186,
    "popularity": 74,
    "tags": [
      "clothing",
      "cotton",
      "fashion",
      "zara",
      "casual",
      "denim",
      "apparel"
    ]
  },
  {
    "id": "prod-129",
    "title": "Zara Relaxed Fit 100% Linen Long Sleeve Casual Shirt",
    "brand": "Zara",
    "category": "Clothing",
    "imageUrl": "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=600&q=80",
    "description": "Zara Relaxed Fit 100% Linen Long Sleeve Casual Shirt. Premium quality clothing by Zara. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "amazon",
        "store": "Amazon",
        "price": 2990,
        "mrp": 3990,
        "url": "https://amazon.in/dp/zara-relaxed-fit-100%-linen-long-sl/prod-129",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "myntra",
        "store": "Myntra",
        "price": 2930,
        "mrp": 3990,
        "url": "https://myntra.com/product/zara-relaxed-fit-100%-linen-long-sl/p/prod-129",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "ajio",
        "store": "Ajio",
        "price": 3080,
        "mrp": 3990,
        "url": "https://ajio.com/product/zara-relaxed-fit-100%-linen-long-sl/p/prod-129",
        "inStock": false,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 2950,
        "store": "Myntra"
      },
      {
        "date": "2026-08-01",
        "price": 3050,
        "store": "Ajio"
      },
      {
        "date": "2026-08-15",
        "price": 2940,
        "store": "Ajio"
      },
      {
        "date": "2026-09-01",
        "price": 2890,
        "store": "Myntra"
      },
      {
        "date": "2026-09-15",
        "price": 2850,
        "store": "Myntra"
      },
      {
        "date": "2026-10-01",
        "price": 2940,
        "store": "Myntra"
      },
      {
        "date": "2026-10-15",
        "price": 2860,
        "store": "Amazon"
      },
      {
        "date": "2026-10-24",
        "price": 2960,
        "store": "Amazon"
      }
    ],
    "rating": 4.3,
    "reviewCount": 11976,
    "popularity": 85,
    "tags": [
      "clothing",
      "cotton",
      "fashion",
      "zara",
      "casual",
      "denim",
      "apparel"
    ]
  },
  {
    "id": "prod-130",
    "title": "H&M Regular Fit Pullover Hoodie with Kangaroo Pocket",
    "brand": "H&M",
    "category": "Clothing",
    "imageUrl": "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80",
    "description": "H&M Regular Fit Pullover Hoodie with Kangaroo Pocket. Premium quality clothing by H&M. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "amazon",
        "store": "Amazon",
        "price": 1470,
        "mrp": 2299,
        "url": "https://amazon.in/dp/h&m-regular-fit-pullover-hoodie-wit/prod-130",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "ajio",
        "store": "Ajio",
        "price": 1570,
        "mrp": 2299,
        "url": "https://ajio.com/product/h&m-regular-fit-pullover-hoodie-wit/p/prod-130",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "flipkart",
        "store": "Flipkart",
        "price": 1450,
        "mrp": 2299,
        "url": "https://flipkart.com/product/h&m-regular-fit-pullover-hoodie-wit/p/prod-130",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 1480,
        "store": "Amazon"
      },
      {
        "date": "2026-08-01",
        "price": 1530,
        "store": "Ajio"
      },
      {
        "date": "2026-08-15",
        "price": 1490,
        "store": "Ajio"
      },
      {
        "date": "2026-09-01",
        "price": 1440,
        "store": "Ajio"
      },
      {
        "date": "2026-09-15",
        "price": 1420,
        "store": "Flipkart"
      },
      {
        "date": "2026-10-01",
        "price": 1420,
        "store": "Ajio"
      },
      {
        "date": "2026-10-15",
        "price": 1460,
        "store": "Flipkart"
      },
      {
        "date": "2026-10-24",
        "price": 1390,
        "store": "Ajio"
      }
    ],
    "rating": 4.1,
    "reviewCount": 2213,
    "popularity": 87,
    "tags": [
      "clothing",
      "cotton",
      "fashion",
      "casual",
      "denim",
      "apparel",
      "h&m"
    ]
  },
  {
    "id": "prod-131",
    "title": "H&M Oversized Denim Shacket with Chest Pockets",
    "brand": "H&M",
    "category": "Clothing",
    "imageUrl": "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=600&q=80",
    "description": "H&M Oversized Denim Shacket with Chest Pockets. Premium quality clothing by H&M. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "amazon",
        "store": "Amazon",
        "price": 2530,
        "mrp": 3499,
        "url": "https://amazon.in/dp/h&m-oversized-denim-shacket-with-ch/prod-131",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "croma",
        "store": "Croma",
        "price": 2540,
        "mrp": 3499,
        "url": "https://croma.com/product/h&m-oversized-denim-shacket-with-ch/p/prod-131",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "myntra",
        "store": "Myntra",
        "price": 2400,
        "mrp": 3499,
        "url": "https://myntra.com/product/h&m-oversized-denim-shacket-with-ch/p/prod-131",
        "inStock": false,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 2400,
        "store": "Myntra"
      },
      {
        "date": "2026-08-01",
        "price": 2440,
        "store": "Amazon"
      },
      {
        "date": "2026-08-15",
        "price": 2360,
        "store": "Amazon"
      },
      {
        "date": "2026-09-01",
        "price": 2420,
        "store": "Amazon"
      },
      {
        "date": "2026-09-15",
        "price": 2350,
        "store": "Myntra"
      },
      {
        "date": "2026-10-01",
        "price": 2440,
        "store": "Croma"
      },
      {
        "date": "2026-10-15",
        "price": 2420,
        "store": "Croma"
      },
      {
        "date": "2026-10-24",
        "price": 2310,
        "store": "Myntra"
      }
    ],
    "rating": 4.2,
    "reviewCount": 3574,
    "popularity": 96,
    "tags": [
      "clothing",
      "cotton",
      "fashion",
      "casual",
      "denim",
      "apparel",
      "h&m"
    ]
  },
  {
    "id": "prod-132",
    "title": "Tommy Hilfiger Classic Pique Polo T-Shirt with Flag Logo",
    "brand": "Tommy Hilfiger",
    "category": "Clothing",
    "imageUrl": "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=600&q=80",
    "description": "Tommy Hilfiger Classic Pique Polo T-Shirt with Flag Logo. Premium quality clothing by Tommy Hilfiger. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "ajio",
        "store": "Ajio",
        "price": 3410,
        "mrp": 4999,
        "url": "https://ajio.com/product/tommy-hilfiger-classic-pique-polo-t/p/prod-132",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "flipkart",
        "store": "Flipkart",
        "price": 3440,
        "mrp": 4999,
        "url": "https://flipkart.com/product/tommy-hilfiger-classic-pique-polo-t/p/prod-132",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "croma",
        "store": "Croma",
        "price": 3790,
        "mrp": 4999,
        "url": "https://croma.com/product/tommy-hilfiger-classic-pique-polo-t/p/prod-132",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "amazon",
        "store": "Amazon",
        "price": 3710,
        "mrp": 4999,
        "url": "https://amazon.in/dp/tommy-hilfiger-classic-pique-polo-t/prod-132",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 3620,
        "store": "Amazon"
      },
      {
        "date": "2026-08-01",
        "price": 3670,
        "store": "Croma"
      },
      {
        "date": "2026-08-15",
        "price": 3730,
        "store": "Croma"
      },
      {
        "date": "2026-09-01",
        "price": 3560,
        "store": "Croma"
      },
      {
        "date": "2026-09-15",
        "price": 3670,
        "store": "Amazon"
      },
      {
        "date": "2026-10-01",
        "price": 3610,
        "store": "Amazon"
      },
      {
        "date": "2026-10-15",
        "price": 3780,
        "store": "Flipkart"
      },
      {
        "date": "2026-10-24",
        "price": 3800,
        "store": "Ajio"
      }
    ],
    "rating": 4.4,
    "reviewCount": 14342,
    "popularity": 76,
    "tags": [
      "clothing",
      "cotton",
      "fashion",
      "casual",
      "denim",
      "apparel",
      "tommy hilfiger"
    ]
  },
  {
    "id": "prod-133",
    "title": "Tommy Hilfiger Colorblocked Lightweight Windbreaker Jacket",
    "brand": "Tommy Hilfiger",
    "category": "Clothing",
    "imageUrl": "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80",
    "description": "Tommy Hilfiger Colorblocked Lightweight Windbreaker Jacket. Premium quality clothing by Tommy Hilfiger. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "amazon",
        "store": "Amazon",
        "price": 8100,
        "mrp": 11999,
        "url": "https://amazon.in/dp/tommy-hilfiger-colorblocked-lightwe/prod-133",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "flipkart",
        "store": "Flipkart",
        "price": 8420,
        "mrp": 11999,
        "url": "https://flipkart.com/product/tommy-hilfiger-colorblocked-lightwe/p/prod-133",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "myntra",
        "store": "Myntra",
        "price": 7530,
        "mrp": 11999,
        "url": "https://myntra.com/product/tommy-hilfiger-colorblocked-lightwe/p/prod-133",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "croma",
        "store": "Croma",
        "price": 8440,
        "mrp": 11999,
        "url": "https://croma.com/product/tommy-hilfiger-colorblocked-lightwe/p/prod-133",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 8100,
        "store": "Flipkart"
      },
      {
        "date": "2026-08-01",
        "price": 8350,
        "store": "Myntra"
      },
      {
        "date": "2026-08-15",
        "price": 8580,
        "store": "Croma"
      },
      {
        "date": "2026-09-01",
        "price": 8580,
        "store": "Croma"
      },
      {
        "date": "2026-09-15",
        "price": 8480,
        "store": "Croma"
      },
      {
        "date": "2026-10-01",
        "price": 8210,
        "store": "Flipkart"
      },
      {
        "date": "2026-10-15",
        "price": 8090,
        "store": "Croma"
      },
      {
        "date": "2026-10-24",
        "price": 8350,
        "store": "Amazon"
      }
    ],
    "rating": 4.2,
    "reviewCount": 3227,
    "popularity": 70,
    "tags": [
      "clothing",
      "cotton",
      "fashion",
      "casual",
      "denim",
      "apparel",
      "tommy hilfiger"
    ]
  },
  {
    "id": "prod-134",
    "title": "Calvin Klein Monogram Crewneck Cotton T-Shirt (White)",
    "brand": "Calvin Klein",
    "category": "Clothing",
    "imageUrl": "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=600&q=80",
    "description": "Calvin Klein Monogram Crewneck Cotton T-Shirt (White). Premium quality clothing by Calvin Klein. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "amazon",
        "store": "Amazon",
        "price": 2490,
        "mrp": 3499,
        "url": "https://amazon.in/dp/calvin-klein-monogram-crewneck-cott/prod-134",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "flipkart",
        "store": "Flipkart",
        "price": 2390,
        "mrp": 3499,
        "url": "https://flipkart.com/product/calvin-klein-monogram-crewneck-cott/p/prod-134",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "ajio",
        "store": "Ajio",
        "price": 2640,
        "mrp": 3499,
        "url": "https://ajio.com/product/calvin-klein-monogram-crewneck-cott/p/prod-134",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "croma",
        "store": "Croma",
        "price": 2380,
        "mrp": 3499,
        "url": "https://croma.com/product/calvin-klein-monogram-crewneck-cott/p/prod-134",
        "inStock": false,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 2510,
        "store": "Ajio"
      },
      {
        "date": "2026-08-01",
        "price": 2580,
        "store": "Ajio"
      },
      {
        "date": "2026-08-15",
        "price": 2690,
        "store": "Amazon"
      },
      {
        "date": "2026-09-01",
        "price": 2710,
        "store": "Amazon"
      },
      {
        "date": "2026-09-15",
        "price": 2680,
        "store": "Flipkart"
      },
      {
        "date": "2026-10-01",
        "price": 2560,
        "store": "Ajio"
      },
      {
        "date": "2026-10-15",
        "price": 2540,
        "store": "Ajio"
      },
      {
        "date": "2026-10-24",
        "price": 2410,
        "store": "Flipkart"
      }
    ],
    "rating": 4.5,
    "reviewCount": 7684,
    "popularity": 93,
    "tags": [
      "clothing",
      "cotton",
      "fashion",
      "casual",
      "denim",
      "apparel",
      "calvin klein"
    ]
  },
  {
    "id": "prod-135",
    "title": "Calvin Klein Skinny Fit Mid-Rise Clean Stretch Jeans",
    "brand": "Calvin Klein",
    "category": "Clothing",
    "imageUrl": "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=600&q=80",
    "description": "Calvin Klein Skinny Fit Mid-Rise Clean Stretch Jeans. Premium quality clothing by Calvin Klein. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "amazon",
        "store": "Amazon",
        "price": 4550,
        "mrp": 7599,
        "url": "https://amazon.in/dp/calvin-klein-skinny-fit-mid-rise-cl/prod-135",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "flipkart",
        "store": "Flipkart",
        "price": 4610,
        "mrp": 7599,
        "url": "https://flipkart.com/product/calvin-klein-skinny-fit-mid-rise-cl/p/prod-135",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "croma",
        "store": "Croma",
        "price": 4650,
        "mrp": 7599,
        "url": "https://croma.com/product/calvin-klein-skinny-fit-mid-rise-cl/p/prod-135",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "ajio",
        "store": "Ajio",
        "price": 4840,
        "mrp": 7599,
        "url": "https://ajio.com/product/calvin-klein-skinny-fit-mid-rise-cl/p/prod-135",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 4740,
        "store": "Flipkart"
      },
      {
        "date": "2026-08-01",
        "price": 4780,
        "store": "Amazon"
      },
      {
        "date": "2026-08-15",
        "price": 4820,
        "store": "Flipkart"
      },
      {
        "date": "2026-09-01",
        "price": 4850,
        "store": "Ajio"
      },
      {
        "date": "2026-09-15",
        "price": 5020,
        "store": "Croma"
      },
      {
        "date": "2026-10-01",
        "price": 5200,
        "store": "Ajio"
      },
      {
        "date": "2026-10-15",
        "price": 5230,
        "store": "Flipkart"
      },
      {
        "date": "2026-10-24",
        "price": 5190,
        "store": "Ajio"
      }
    ],
    "rating": 4.5,
    "reviewCount": 9785,
    "popularity": 86,
    "tags": [
      "clothing",
      "cotton",
      "fashion",
      "casual",
      "denim",
      "apparel",
      "calvin klein"
    ]
  },
  {
    "id": "prod-136",
    "title": "Jack & Jones Slim Fit Chinos with Stretch (Beige)",
    "brand": "Jack & Jones",
    "category": "Clothing",
    "imageUrl": "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80",
    "description": "Jack & Jones Slim Fit Chinos with Stretch (Beige). Premium quality clothing by Jack & Jones. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "flipkart",
        "store": "Flipkart",
        "price": 1970,
        "mrp": 3299,
        "url": "https://flipkart.com/product/jack-&-jones-slim-fit-chinos-with-s/p/prod-136",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "ajio",
        "store": "Ajio",
        "price": 1910,
        "mrp": 3299,
        "url": "https://ajio.com/product/jack-&-jones-slim-fit-chinos-with-s/p/prod-136",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "croma",
        "store": "Croma",
        "price": 2050,
        "mrp": 3299,
        "url": "https://croma.com/product/jack-&-jones-slim-fit-chinos-with-s/p/prod-136",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "myntra",
        "store": "Myntra",
        "price": 1930,
        "mrp": 3299,
        "url": "https://myntra.com/product/jack-&-jones-slim-fit-chinos-with-s/p/prod-136",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 1910,
        "store": "Myntra"
      },
      {
        "date": "2026-08-01",
        "price": 1820,
        "store": "Croma"
      },
      {
        "date": "2026-08-15",
        "price": 1890,
        "store": "Ajio"
      },
      {
        "date": "2026-09-01",
        "price": 1890,
        "store": "Myntra"
      },
      {
        "date": "2026-09-15",
        "price": 1930,
        "store": "Flipkart"
      },
      {
        "date": "2026-10-01",
        "price": 1850,
        "store": "Flipkart"
      },
      {
        "date": "2026-10-15",
        "price": 1780,
        "store": "Flipkart"
      },
      {
        "date": "2026-10-24",
        "price": 1800,
        "store": "Myntra"
      }
    ],
    "rating": 4.1,
    "reviewCount": 4449,
    "popularity": 95,
    "tags": [
      "jack & jones",
      "clothing",
      "cotton",
      "fashion",
      "casual",
      "denim",
      "apparel"
    ]
  },
  {
    "id": "prod-137",
    "title": "Jack & Jones Heavyweight Flannel Checked Casual Shirt",
    "brand": "Jack & Jones",
    "category": "Clothing",
    "imageUrl": "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=600&q=80",
    "description": "Jack & Jones Heavyweight Flannel Checked Casual Shirt. Premium quality clothing by Jack & Jones. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "ajio",
        "store": "Ajio",
        "price": 1880,
        "mrp": 2999,
        "url": "https://ajio.com/product/jack-&-jones-heavyweight-flannel-ch/p/prod-137",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "myntra",
        "store": "Myntra",
        "price": 1720,
        "mrp": 2999,
        "url": "https://myntra.com/product/jack-&-jones-heavyweight-flannel-ch/p/prod-137",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "flipkart",
        "store": "Flipkart",
        "price": 1840,
        "mrp": 2999,
        "url": "https://flipkart.com/product/jack-&-jones-heavyweight-flannel-ch/p/prod-137",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "amazon",
        "store": "Amazon",
        "price": 1830,
        "mrp": 2999,
        "url": "https://amazon.in/dp/jack-&-jones-heavyweight-flannel-ch/prod-137",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 1790,
        "store": "Myntra"
      },
      {
        "date": "2026-08-01",
        "price": 1710,
        "store": "Myntra"
      },
      {
        "date": "2026-08-15",
        "price": 1760,
        "store": "Ajio"
      },
      {
        "date": "2026-09-01",
        "price": 1690,
        "store": "Myntra"
      },
      {
        "date": "2026-09-15",
        "price": 1730,
        "store": "Ajio"
      },
      {
        "date": "2026-10-01",
        "price": 1680,
        "store": "Myntra"
      },
      {
        "date": "2026-10-15",
        "price": 1700,
        "store": "Ajio"
      },
      {
        "date": "2026-10-24",
        "price": 1660,
        "store": "Amazon"
      }
    ],
    "rating": 4.7,
    "reviewCount": 140,
    "popularity": 74,
    "tags": [
      "jack & jones",
      "clothing",
      "cotton",
      "fashion",
      "casual",
      "denim",
      "apparel"
    ]
  },
  {
    "id": "prod-138",
    "title": "Nike Sportswear Club Fleece Graphic Crewneck Sweatshirt",
    "brand": "Nike",
    "category": "Clothing",
    "imageUrl": "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=600&q=80",
    "description": "Nike Sportswear Club Fleece Graphic Crewneck Sweatshirt. Premium quality clothing by Nike. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "myntra",
        "store": "Myntra",
        "price": 2980,
        "mrp": 3995,
        "url": "https://myntra.com/product/nike-sportswear-club-fleece-graphic/p/prod-138",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "flipkart",
        "store": "Flipkart",
        "price": 2860,
        "mrp": 3995,
        "url": "https://flipkart.com/product/nike-sportswear-club-fleece-graphic/p/prod-138",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "amazon",
        "store": "Amazon",
        "price": 2970,
        "mrp": 3995,
        "url": "https://amazon.in/dp/nike-sportswear-club-fleece-graphic/prod-138",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 2950,
        "store": "Myntra"
      },
      {
        "date": "2026-08-01",
        "price": 2900,
        "store": "Amazon"
      },
      {
        "date": "2026-08-15",
        "price": 2780,
        "store": "Amazon"
      },
      {
        "date": "2026-09-01",
        "price": 2700,
        "store": "Flipkart"
      },
      {
        "date": "2026-09-15",
        "price": 2780,
        "store": "Flipkart"
      },
      {
        "date": "2026-10-01",
        "price": 2700,
        "store": "Myntra"
      },
      {
        "date": "2026-10-15",
        "price": 2820,
        "store": "Flipkart"
      },
      {
        "date": "2026-10-24",
        "price": 2770,
        "store": "Flipkart"
      }
    ],
    "rating": 4.2,
    "reviewCount": 16389,
    "popularity": 83,
    "tags": [
      "clothing",
      "cotton",
      "fashion",
      "casual",
      "nike",
      "denim",
      "apparel"
    ]
  },
  {
    "id": "prod-139",
    "title": "Dyson V15 Detect Absolute Cordless Vacuum Cleaner",
    "brand": "Dyson",
    "category": "Home Appliances",
    "imageUrl": "https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&w=600&q=80",
    "description": "Dyson V15 Detect Absolute Cordless Vacuum Cleaner. Premium quality home appliances by Dyson. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "croma",
        "store": "Croma",
        "price": 50070,
        "mrp": 62900,
        "url": "https://croma.com/product/dyson-v15-detect-absolute-cordless-/p/prod-139",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "myntra",
        "store": "Myntra",
        "price": 55610,
        "mrp": 62900,
        "url": "https://myntra.com/product/dyson-v15-detect-absolute-cordless-/p/prod-139",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "amazon",
        "store": "Amazon",
        "price": 54560,
        "mrp": 62900,
        "url": "https://amazon.in/dp/dyson-v15-detect-absolute-cordless-/prod-139",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "flipkart",
        "store": "Flipkart",
        "price": 55850,
        "mrp": 62900,
        "url": "https://flipkart.com/product/dyson-v15-detect-absolute-cordless-/p/prod-139",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 51130,
        "store": "Myntra"
      },
      {
        "date": "2026-08-01",
        "price": 52420,
        "store": "Flipkart"
      },
      {
        "date": "2026-08-15",
        "price": 53650,
        "store": "Flipkart"
      },
      {
        "date": "2026-09-01",
        "price": 54760,
        "store": "Flipkart"
      },
      {
        "date": "2026-09-15",
        "price": 52570,
        "store": "Croma"
      },
      {
        "date": "2026-10-01",
        "price": 51850,
        "store": "Croma"
      },
      {
        "date": "2026-10-15",
        "price": 49370,
        "store": "Flipkart"
      },
      {
        "date": "2026-10-24",
        "price": 51360,
        "store": "Flipkart"
      }
    ],
    "rating": 4.4,
    "reviewCount": 2007,
    "popularity": 94,
    "tags": [
      "home appliances",
      "smart-home",
      "home",
      "appliances",
      "lifestyle",
      "kitchen",
      "dyson"
    ]
  },
  {
    "id": "prod-140",
    "title": "Dyson Airwrap Multi-Styler Complete Long (Nickel/Copper)",
    "brand": "Dyson",
    "category": "Home Appliances",
    "imageUrl": "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80",
    "description": "Dyson Airwrap Multi-Styler Complete Long (Nickel/Copper). Premium quality home appliances by Dyson. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "flipkart",
        "store": "Flipkart",
        "price": 46380,
        "mrp": 49900,
        "url": "https://flipkart.com/product/dyson-airwrap-multi-styler-complete/p/prod-140",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "myntra",
        "store": "Myntra",
        "price": 43460,
        "mrp": 49900,
        "url": "https://myntra.com/product/dyson-airwrap-multi-styler-complete/p/prod-140",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "ajio",
        "store": "Ajio",
        "price": 47090,
        "mrp": 49900,
        "url": "https://ajio.com/product/dyson-airwrap-multi-styler-complete/p/prod-140",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "amazon",
        "store": "Amazon",
        "price": 43650,
        "mrp": 49900,
        "url": "https://amazon.in/dp/dyson-airwrap-multi-styler-complete/prod-140",
        "inStock": false,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 43590,
        "store": "Flipkart"
      },
      {
        "date": "2026-08-01",
        "price": 44270,
        "store": "Amazon"
      },
      {
        "date": "2026-08-15",
        "price": 43990,
        "store": "Amazon"
      },
      {
        "date": "2026-09-01",
        "price": 45170,
        "store": "Myntra"
      },
      {
        "date": "2026-09-15",
        "price": 45430,
        "store": "Myntra"
      },
      {
        "date": "2026-10-01",
        "price": 44200,
        "store": "Flipkart"
      },
      {
        "date": "2026-10-15",
        "price": 46190,
        "store": "Ajio"
      },
      {
        "date": "2026-10-24",
        "price": 44930,
        "store": "Ajio"
      }
    ],
    "rating": 4.5,
    "reviewCount": 14934,
    "popularity": 91,
    "tags": [
      "home appliances",
      "smart-home",
      "home",
      "appliances",
      "lifestyle",
      "kitchen",
      "dyson"
    ]
  },
  {
    "id": "prod-141",
    "title": "Dyson Purifier Hot+Cool Formaldehyde Air Purifier (HP09)",
    "brand": "Dyson",
    "category": "Home Appliances",
    "imageUrl": "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80",
    "description": "Dyson Purifier Hot+Cool Formaldehyde Air Purifier (HP09). Premium quality home appliances by Dyson. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "amazon",
        "store": "Amazon",
        "price": 59600,
        "mrp": 66900,
        "url": "https://amazon.in/dp/dyson-purifier-hotpluscool-formalde/prod-141",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "myntra",
        "store": "Myntra",
        "price": 57120,
        "mrp": 66900,
        "url": "https://myntra.com/product/dyson-purifier-hotpluscool-formalde/p/prod-141",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "ajio",
        "store": "Ajio",
        "price": 57340,
        "mrp": 66900,
        "url": "https://ajio.com/product/dyson-purifier-hotpluscool-formalde/p/prod-141",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "croma",
        "store": "Croma",
        "price": 56760,
        "mrp": 66900,
        "url": "https://croma.com/product/dyson-purifier-hotpluscool-formalde/p/prod-141",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 55140,
        "store": "Croma"
      },
      {
        "date": "2026-08-01",
        "price": 55330,
        "store": "Amazon"
      },
      {
        "date": "2026-08-15",
        "price": 57190,
        "store": "Myntra"
      },
      {
        "date": "2026-09-01",
        "price": 54430,
        "store": "Amazon"
      },
      {
        "date": "2026-09-15",
        "price": 57080,
        "store": "Ajio"
      },
      {
        "date": "2026-10-01",
        "price": 57970,
        "store": "Croma"
      },
      {
        "date": "2026-10-15",
        "price": 58080,
        "store": "Myntra"
      },
      {
        "date": "2026-10-24",
        "price": 57840,
        "store": "Amazon"
      }
    ],
    "rating": 4.8,
    "reviewCount": 4042,
    "popularity": 86,
    "tags": [
      "home appliances",
      "smart-home",
      "home",
      "appliances",
      "lifestyle",
      "kitchen",
      "dyson"
    ]
  },
  {
    "id": "prod-142",
    "title": "Philips HD9252/90 Digital Air Fryer with Rapid Air Tech",
    "brand": "Philips",
    "category": "Home Appliances",
    "imageUrl": "https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&w=600&q=80",
    "description": "Philips HD9252/90 Digital Air Fryer with Rapid Air Tech. Premium quality home appliances by Philips. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "ajio",
        "store": "Ajio",
        "price": 7590,
        "mrp": 11995,
        "url": "https://ajio.com/product/philips-hd9252/90-digital-air-fryer/p/prod-142",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "flipkart",
        "store": "Flipkart",
        "price": 7250,
        "mrp": 11995,
        "url": "https://flipkart.com/product/philips-hd9252/90-digital-air-fryer/p/prod-142",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "croma",
        "store": "Croma",
        "price": 7450,
        "mrp": 11995,
        "url": "https://croma.com/product/philips-hd9252/90-digital-air-fryer/p/prod-142",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "myntra",
        "store": "Myntra",
        "price": 7550,
        "mrp": 11995,
        "url": "https://myntra.com/product/philips-hd9252/90-digital-air-fryer/p/prod-142",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 7650,
        "store": "Flipkart"
      },
      {
        "date": "2026-08-01",
        "price": 7820,
        "store": "Ajio"
      },
      {
        "date": "2026-08-15",
        "price": 8060,
        "store": "Myntra"
      },
      {
        "date": "2026-09-01",
        "price": 8390,
        "store": "Flipkart"
      },
      {
        "date": "2026-09-15",
        "price": 8490,
        "store": "Myntra"
      },
      {
        "date": "2026-10-01",
        "price": 8890,
        "store": "Ajio"
      },
      {
        "date": "2026-10-15",
        "price": 8660,
        "store": "Croma"
      },
      {
        "date": "2026-10-24",
        "price": 8910,
        "store": "Myntra"
      }
    ],
    "rating": 4.5,
    "reviewCount": 3171,
    "popularity": 69,
    "tags": [
      "home appliances",
      "smart-home",
      "home",
      "appliances",
      "philips",
      "lifestyle",
      "kitchen"
    ]
  },
  {
    "id": "prod-143",
    "title": "Philips Series 7000 Wet & Dry Electric Shaver with SkinIQ",
    "brand": "Philips",
    "category": "Home Appliances",
    "imageUrl": "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80",
    "description": "Philips Series 7000 Wet & Dry Electric Shaver with SkinIQ. Premium quality home appliances by Philips. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "flipkart",
        "store": "Flipkart",
        "price": 9090,
        "mrp": 12995,
        "url": "https://flipkart.com/product/philips-series-7000-wet-&-dry-elect/p/prod-143",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "ajio",
        "store": "Ajio",
        "price": 9480,
        "mrp": 12995,
        "url": "https://ajio.com/product/philips-series-7000-wet-&-dry-elect/p/prod-143",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "croma",
        "store": "Croma",
        "price": 9260,
        "mrp": 12995,
        "url": "https://croma.com/product/philips-series-7000-wet-&-dry-elect/p/prod-143",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 9130,
        "store": "Ajio"
      },
      {
        "date": "2026-08-01",
        "price": 9200,
        "store": "Ajio"
      },
      {
        "date": "2026-08-15",
        "price": 8910,
        "store": "Croma"
      },
      {
        "date": "2026-09-01",
        "price": 8480,
        "store": "Croma"
      },
      {
        "date": "2026-09-15",
        "price": 8770,
        "store": "Ajio"
      },
      {
        "date": "2026-10-01",
        "price": 9150,
        "store": "Croma"
      },
      {
        "date": "2026-10-15",
        "price": 9290,
        "store": "Croma"
      },
      {
        "date": "2026-10-24",
        "price": 9050,
        "store": "Flipkart"
      }
    ],
    "rating": 4.2,
    "reviewCount": 503,
    "popularity": 74,
    "tags": [
      "home appliances",
      "smart-home",
      "home",
      "appliances",
      "philips",
      "lifestyle",
      "kitchen"
    ]
  },
  {
    "id": "prod-144",
    "title": "iRobot Roomba j7+ Self-Emptying Robot Vacuum Cleaner",
    "brand": "iRobot",
    "category": "Home Appliances",
    "imageUrl": "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80",
    "description": "iRobot Roomba j7+ Self-Emptying Robot Vacuum Cleaner. Premium quality home appliances by iRobot. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "myntra",
        "store": "Myntra",
        "price": 60880,
        "mrp": 74900,
        "url": "https://myntra.com/product/irobot-roomba-j7plus-self-emptying-/p/prod-144",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "ajio",
        "store": "Ajio",
        "price": 60270,
        "mrp": 74900,
        "url": "https://ajio.com/product/irobot-roomba-j7plus-self-emptying-/p/prod-144",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "amazon",
        "store": "Amazon",
        "price": 61670,
        "mrp": 74900,
        "url": "https://amazon.in/dp/irobot-roomba-j7plus-self-emptying-/prod-144",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "croma",
        "store": "Croma",
        "price": 57730,
        "mrp": 74900,
        "url": "https://croma.com/product/irobot-roomba-j7plus-self-emptying-/p/prod-144",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 58430,
        "store": "Croma"
      },
      {
        "date": "2026-08-01",
        "price": 55910,
        "store": "Ajio"
      },
      {
        "date": "2026-08-15",
        "price": 55000,
        "store": "Myntra"
      },
      {
        "date": "2026-09-01",
        "price": 54150,
        "store": "Amazon"
      },
      {
        "date": "2026-09-15",
        "price": 51560,
        "store": "Myntra"
      },
      {
        "date": "2026-10-01",
        "price": 52470,
        "store": "Myntra"
      },
      {
        "date": "2026-10-15",
        "price": 50680,
        "store": "Amazon"
      },
      {
        "date": "2026-10-24",
        "price": 50940,
        "store": "Croma"
      }
    ],
    "rating": 4.1,
    "reviewCount": 6420,
    "popularity": 90,
    "tags": [
      "home appliances",
      "smart-home",
      "home",
      "appliances",
      "lifestyle",
      "kitchen",
      "irobot"
    ]
  },
  {
    "id": "prod-145",
    "title": "Instant Pot Duo Plus 9-in-1 Electric Pressure Cooker 6L",
    "brand": "Instant Pot",
    "category": "Home Appliances",
    "imageUrl": "https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&w=600&q=80",
    "description": "Instant Pot Duo Plus 9-in-1 Electric Pressure Cooker 6L. Premium quality home appliances by Instant Pot. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "amazon",
        "store": "Amazon",
        "price": 8990,
        "mrp": 13999,
        "url": "https://amazon.in/dp/instant-pot-duo-plus-9-in-1-electri/prod-145",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "croma",
        "store": "Croma",
        "price": 8970,
        "mrp": 13999,
        "url": "https://croma.com/product/instant-pot-duo-plus-9-in-1-electri/p/prod-145",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "flipkart",
        "store": "Flipkart",
        "price": 8840,
        "mrp": 13999,
        "url": "https://flipkart.com/product/instant-pot-duo-plus-9-in-1-electri/p/prod-145",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 8560,
        "store": "Amazon"
      },
      {
        "date": "2026-08-01",
        "price": 8930,
        "store": "Croma"
      },
      {
        "date": "2026-08-15",
        "price": 8930,
        "store": "Amazon"
      },
      {
        "date": "2026-09-01",
        "price": 8810,
        "store": "Flipkart"
      },
      {
        "date": "2026-09-15",
        "price": 8620,
        "store": "Amazon"
      },
      {
        "date": "2026-10-01",
        "price": 8900,
        "store": "Flipkart"
      },
      {
        "date": "2026-10-15",
        "price": 8540,
        "store": "Croma"
      },
      {
        "date": "2026-10-24",
        "price": 8490,
        "store": "Croma"
      }
    ],
    "rating": 4.6,
    "reviewCount": 18411,
    "popularity": 74,
    "tags": [
      "home appliances",
      "smart-home",
      "home",
      "appliances",
      "lifestyle",
      "kitchen",
      "instant pot"
    ]
  },
  {
    "id": "prod-146",
    "title": "Nespresso Vertuo Pop Coffee Machine with Aeroccino3 Bundle",
    "brand": "Nespresso",
    "category": "Home Appliances",
    "imageUrl": "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80",
    "description": "Nespresso Vertuo Pop Coffee Machine with Aeroccino3 Bundle. Premium quality home appliances by Nespresso. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "amazon",
        "store": "Amazon",
        "price": 17060,
        "mrp": 22999,
        "url": "https://amazon.in/dp/nespresso-vertuo-pop-coffee-machine/prod-146",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "croma",
        "store": "Croma",
        "price": 16390,
        "mrp": 22999,
        "url": "https://croma.com/product/nespresso-vertuo-pop-coffee-machine/p/prod-146",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "myntra",
        "store": "Myntra",
        "price": 16610,
        "mrp": 22999,
        "url": "https://myntra.com/product/nespresso-vertuo-pop-coffee-machine/p/prod-146",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 16690,
        "store": "Croma"
      },
      {
        "date": "2026-08-01",
        "price": 15980,
        "store": "Myntra"
      },
      {
        "date": "2026-08-15",
        "price": 15740,
        "store": "Croma"
      },
      {
        "date": "2026-09-01",
        "price": 15150,
        "store": "Amazon"
      },
      {
        "date": "2026-09-15",
        "price": 15600,
        "store": "Myntra"
      },
      {
        "date": "2026-10-01",
        "price": 15800,
        "store": "Amazon"
      },
      {
        "date": "2026-10-15",
        "price": 15840,
        "store": "Croma"
      },
      {
        "date": "2026-10-24",
        "price": 16040,
        "store": "Myntra"
      }
    ],
    "rating": 4.4,
    "reviewCount": 8054,
    "popularity": 93,
    "tags": [
      "home appliances",
      "smart-home",
      "home",
      "appliances",
      "nespresso",
      "kitchen",
      "lifestyle"
    ]
  },
  {
    "id": "prod-147",
    "title": "Panasonic 27L Convection Microwave Oven (NN-CT645BFDG)",
    "brand": "Panasonic",
    "category": "Home Appliances",
    "imageUrl": "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80",
    "description": "Panasonic 27L Convection Microwave Oven (NN-CT645BFDG). Premium quality home appliances by Panasonic. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "croma",
        "store": "Croma",
        "price": 12180,
        "mrp": 16990,
        "url": "https://croma.com/product/panasonic-27l-convection-microwave-/p/prod-147",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "amazon",
        "store": "Amazon",
        "price": 12390,
        "mrp": 16990,
        "url": "https://amazon.in/dp/panasonic-27l-convection-microwave-/prod-147",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "myntra",
        "store": "Myntra",
        "price": 12700,
        "mrp": 16990,
        "url": "https://myntra.com/product/panasonic-27l-convection-microwave-/p/prod-147",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "flipkart",
        "store": "Flipkart",
        "price": 12670,
        "mrp": 16990,
        "url": "https://flipkart.com/product/panasonic-27l-convection-microwave-/p/prod-147",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 12880,
        "store": "Croma"
      },
      {
        "date": "2026-08-01",
        "price": 13000,
        "store": "Amazon"
      },
      {
        "date": "2026-08-15",
        "price": 13380,
        "store": "Flipkart"
      },
      {
        "date": "2026-09-01",
        "price": 13810,
        "store": "Croma"
      },
      {
        "date": "2026-09-15",
        "price": 13950,
        "store": "Croma"
      },
      {
        "date": "2026-10-01",
        "price": 13640,
        "store": "Flipkart"
      },
      {
        "date": "2026-10-15",
        "price": 13490,
        "store": "Croma"
      },
      {
        "date": "2026-10-24",
        "price": 13250,
        "store": "Flipkart"
      }
    ],
    "rating": 4.5,
    "reviewCount": 5910,
    "popularity": 79,
    "tags": [
      "home appliances",
      "smart-home",
      "home",
      "appliances",
      "lifestyle",
      "kitchen",
      "panasonic"
    ]
  },
  {
    "id": "prod-148",
    "title": "Morphy Richards Europa 800W Espresso & Cappuccino Maker",
    "brand": "Morphy Richards",
    "category": "Home Appliances",
    "imageUrl": "https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&w=600&q=80",
    "description": "Morphy Richards Europa 800W Espresso & Cappuccino Maker. Premium quality home appliances by Morphy Richards. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "croma",
        "store": "Croma",
        "price": 4470,
        "mrp": 6999,
        "url": "https://croma.com/product/morphy-richards-europa-800w-espress/p/prod-148",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "myntra",
        "store": "Myntra",
        "price": 4280,
        "mrp": 6999,
        "url": "https://myntra.com/product/morphy-richards-europa-800w-espress/p/prod-148",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "ajio",
        "store": "Ajio",
        "price": 4450,
        "mrp": 6999,
        "url": "https://ajio.com/product/morphy-richards-europa-800w-espress/p/prod-148",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 4410,
        "store": "Croma"
      },
      {
        "date": "2026-08-01",
        "price": 4590,
        "store": "Ajio"
      },
      {
        "date": "2026-08-15",
        "price": 4610,
        "store": "Ajio"
      },
      {
        "date": "2026-09-01",
        "price": 4400,
        "store": "Myntra"
      },
      {
        "date": "2026-09-15",
        "price": 4440,
        "store": "Croma"
      },
      {
        "date": "2026-10-01",
        "price": 4580,
        "store": "Ajio"
      },
      {
        "date": "2026-10-15",
        "price": 4390,
        "store": "Ajio"
      },
      {
        "date": "2026-10-24",
        "price": 4430,
        "store": "Myntra"
      }
    ],
    "rating": 4.6,
    "reviewCount": 6276,
    "popularity": 98,
    "tags": [
      "home appliances",
      "smart-home",
      "home",
      "appliances",
      "lifestyle",
      "kitchen",
      "morphy richards"
    ]
  },
  {
    "id": "prod-149",
    "title": "Eureka Forbes AquaGuard Marvel NXT RO+UV+Taste Adjuster",
    "brand": "Eureka Forbes",
    "category": "Home Appliances",
    "imageUrl": "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80",
    "description": "Eureka Forbes AquaGuard Marvel NXT RO+UV+Taste Adjuster. Premium quality home appliances by Eureka Forbes. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "croma",
        "store": "Croma",
        "price": 13560,
        "mrp": 20000,
        "url": "https://croma.com/product/eureka-forbes-aquaguard-marvel-nxt-/p/prod-149",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "flipkart",
        "store": "Flipkart",
        "price": 13490,
        "mrp": 20000,
        "url": "https://flipkart.com/product/eureka-forbes-aquaguard-marvel-nxt-/p/prod-149",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "amazon",
        "store": "Amazon",
        "price": 13700,
        "mrp": 20000,
        "url": "https://amazon.in/dp/eureka-forbes-aquaguard-marvel-nxt-/prod-149",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "ajio",
        "store": "Ajio",
        "price": 12920,
        "mrp": 20000,
        "url": "https://ajio.com/product/eureka-forbes-aquaguard-marvel-nxt-/p/prod-149",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 13310,
        "store": "Flipkart"
      },
      {
        "date": "2026-08-01",
        "price": 13470,
        "store": "Flipkart"
      },
      {
        "date": "2026-08-15",
        "price": 13440,
        "store": "Flipkart"
      },
      {
        "date": "2026-09-01",
        "price": 13950,
        "store": "Croma"
      },
      {
        "date": "2026-09-15",
        "price": 13410,
        "store": "Ajio"
      },
      {
        "date": "2026-10-01",
        "price": 12870,
        "store": "Amazon"
      },
      {
        "date": "2026-10-15",
        "price": 13300,
        "store": "Amazon"
      },
      {
        "date": "2026-10-24",
        "price": 13960,
        "store": "Amazon"
      }
    ],
    "rating": 4.2,
    "reviewCount": 8161,
    "popularity": 89,
    "tags": [
      "home appliances",
      "eureka forbes",
      "smart-home",
      "home",
      "appliances",
      "lifestyle",
      "kitchen"
    ]
  },
  {
    "id": "prod-150",
    "title": "Havells Meditate AP 400 Air Purifier with SpaceTech TiO2",
    "brand": "Havells",
    "category": "Home Appliances",
    "imageUrl": "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80",
    "description": "Havells Meditate AP 400 Air Purifier with SpaceTech TiO2. Premium quality home appliances by Havells. Compare prices across major stores for maximum savings.",
    "storePrices": [
      {
        "storeId": "myntra",
        "store": "Myntra",
        "price": 19090,
        "mrp": 32990,
        "url": "https://myntra.com/product/havells-meditate-ap-400-air-purifie/p/prod-150",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "amazon",
        "store": "Amazon",
        "price": 20240,
        "mrp": 32990,
        "url": "https://amazon.in/dp/havells-meditate-ap-400-air-purifie/prod-150",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      },
      {
        "storeId": "flipkart",
        "store": "Flipkart",
        "price": 18980,
        "mrp": 32990,
        "url": "https://flipkart.com/product/havells-meditate-ap-400-air-purifie/p/prod-150",
        "inStock": true,
        "lastUpdated": "2026-10-24"
      }
    ],
    "priceHistory": [
      {
        "date": "2026-07-15",
        "price": 19060,
        "store": "Amazon"
      },
      {
        "date": "2026-08-01",
        "price": 18650,
        "store": "Flipkart"
      },
      {
        "date": "2026-08-15",
        "price": 19540,
        "store": "Flipkart"
      },
      {
        "date": "2026-09-01",
        "price": 18710,
        "store": "Amazon"
      },
      {
        "date": "2026-09-15",
        "price": 19480,
        "store": "Myntra"
      },
      {
        "date": "2026-10-01",
        "price": 19840,
        "store": "Myntra"
      },
      {
        "date": "2026-10-15",
        "price": 19300,
        "store": "Amazon"
      },
      {
        "date": "2026-10-24",
        "price": 20010,
        "store": "Flipkart"
      }
    ],
    "rating": 4.2,
    "reviewCount": 6334,
    "popularity": 97,
    "tags": [
      "home appliances",
      "smart-home",
      "home",
      "havells",
      "appliances",
      "lifestyle",
      "kitchen"
    ]
  }
];

/** Return the lowest current price across all stores for a product. */
export function getLowestStorePrice(product: Product): PriceEntry | undefined {
	const inStock = product.storePrices.filter((p) => p.inStock);
	if (inStock.length === 0) return product.storePrices[0];
	return inStock.reduce((min, p) => (p.price < min.price ? p : min), inStock[0]);
}

/** Find a product by ID. */
export function getProductById(id: string): Product | undefined {
	return products.find((p) => p.id === id);
}

/** Resolve a retailer URL or product identifier to a product */
export function findProductByUrl(urlStr: string): Product | undefined {
	const trimmed = urlStr.trim().toLowerCase();
	for (const p of products) {
		for (const sp of p.storePrices) {
			if (
				sp.url.toLowerCase() === trimmed ||
				trimmed.includes(sp.url.toLowerCase()) ||
				sp.url.toLowerCase().includes(trimmed)
			) {
				return p;
			}
		}
	}
	for (const p of products) {
		for (const sp of p.storePrices) {
			const segments = sp.url.toLowerCase().split('/').filter(Boolean);
			for (const seg of segments) {
				if (seg.length >= 6 && trimmed.includes(seg)) {
					return p;
				}
			}
		}
	}
	for (const p of products) {
		const keywords = p.title.toLowerCase().split(/[\s,()/-]+/).filter((w) => w.length > 3);
		const matches = keywords.filter((k) => trimmed.includes(k));
		if (matches.length >= 2) {
			return p;
		}
	}
	return undefined;
}
