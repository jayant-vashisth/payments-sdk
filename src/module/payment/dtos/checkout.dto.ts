import { IsCurrency, IsNotEmpty, IsNumber, IsPositive, IsString, IsUrl } from 'class-validator';

export class CheckoutDto {
  @IsNumber()
  @IsPositive()
  amount: number;

  @IsString()
  currency: string;

  @IsString()
  @IsNotEmpty()
  productName: string;

  @IsUrl()
  successUrl: string;

  @IsUrl()
  cancelUrl: string;
}
