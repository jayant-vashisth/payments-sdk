import { Injectable } from '@nestjs/common';
import { StripeCheckoutService } from 'src/module/stripe/providers/stripe.checkout.service';

@Injectable()
export class CheckoutService {
  constructor(private readonly stripeCheckoutSvc: StripeCheckoutService) {}

  async handleCheckout(
    amount: number,
    currency: string,
    productName: string,
    successUrl: string,
    cancelUrl: string,
  ) {
    return this.stripeCheckoutSvc.createStripeHostedCheckoutPaymentSession(
      amount,
      currency,
      productName,
      successUrl,
      cancelUrl,
    );
  }
}
