export interface ApiPricingTableDto {
  id: string;
  storeId: string;
  products: ApiProductDto[];
}

export interface ApiProductDto {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  billing_period: BillingPeriod;
  payment_type: string;
  payment_link: string;
  product_image_url?: string;
  featured: boolean;
  tax_behavior?: TaxBehavior | null;
  features: string[];
  created_at: Date;
  updated_at: Date;
}

export enum TaxBehavior {
  Exclusive = 'exclusive',
  Inclusive = 'inclusive',
  Unspecified = 'unspecified',
}

export enum BillingPeriod {
  oneMonth = 'one-m',
  threeMonths = 'three-m',
  sixMonths = 'six-m',
  oneYear = 'one-y',
}