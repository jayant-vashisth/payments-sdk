import {
  IsCurrency,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUrl,
} from 'class-validator';

export class PaymentIntentDto {
  @IsNumber()
  @IsPositive()
  amount: number;

  @IsString()
  currency: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}
