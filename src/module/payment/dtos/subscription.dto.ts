import {
  IsOptional,
  IsString,
  IsNumber,
  IsEmail,
  IsEnum,
} from 'class-validator';
import { Stripe } from 'stripe';

enum BillingInterval {
  month = 'month',
  year = 'year',
}

export class SubscriptionDto {
  @IsOptional()
  @IsString()
  customerId: string;

  @IsOptional()
  @IsString()
  priceId: string;

  @IsEnum(BillingInterval)
  billingInterval: Stripe.PriceCreateParams.Recurring.Interval;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  productName: string;

  @IsOptional()
  @IsNumber()
  unitPrice: number;

  @IsOptional()
  @IsString()
  currency: string;
}
