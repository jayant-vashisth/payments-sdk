import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { PaymentIntentService } from '../providers/payment-intent.service';
import { PaymentIntentDto } from '../dtos/payment-intent.sto';
import { CheckoutService } from '../providers/checkout.service';
import { CheckoutDto } from '../dtos/checkout.dto';

@Controller('/payment')
export class PaymentController {
  constructor(
    private readonly checkoutSvc: CheckoutService,
    private readonly paymentIntentSvc: PaymentIntentService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('/create-payment-intent')
  async StripePaymentIntentService(
    @Body(new ValidationPipe()) data: PaymentIntentDto,
  ) {
    return this.paymentIntentSvc.handlePayment(
      data.amount,
      data.currency,
      data.description,
    );
  }

  @HttpCode(HttpStatus.OK)
  @Post('/create-checkout-session')
  async StripeCheckoutService(@Body(new ValidationPipe()) data: CheckoutDto) {
    //we will check whether it is for stripe or paypal
    return this.checkoutSvc.handleCheckout(
      data.amount,
      data.currency,
      data.productName,
      data.successUrl,
      data.cancelUrl,
    );
  }
}
