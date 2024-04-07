import { Injectable } from '@nestjs/common';
import { StripePaymentIntentService } from 'src/module/stripe/providers/stripe.payment-intent.service';

@Injectable()
export class PaymentIntentService {
  constructor(
    private readonly stripePaymentIntentSvc: StripePaymentIntentService,
  ) {}

  async handlePayment(amount: number, currency: string, description: string) {
    return this.stripePaymentIntentSvc.createPaymentIntentSession(
      amount,
      currency,
      description,
    );
  }
}
