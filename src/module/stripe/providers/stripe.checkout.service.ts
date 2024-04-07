import { Injectable } from '@nestjs/common';
import { StripeService } from './stripe.service';
import Stripe from 'stripe';

@Injectable()
export class StripeCheckoutService {
  private stripeInstance: Stripe;

  constructor(private readonly stripeSvc: StripeService) {
    this.stripeInstance = stripeSvc.getInstance();
  }

  async createStripeHostedCheckoutPaymentSession(
    amount: number,
    currency: string,
    productName: string,
    successUrl: string,
    cancelUrl: string,
  ): Promise<Stripe.Checkout.Session | void> {
    const paymentSession = await this.stripeInstance.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency,
            product_data: {
              name: productName,
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl,
    });

    return paymentSession;
  }
}
