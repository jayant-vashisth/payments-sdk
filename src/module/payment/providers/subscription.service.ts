import { Injectable } from '@nestjs/common';
import { StripeSubscriptionService } from 'src/module/stripe/providers/stripe.subscription.service';
import Stripe from 'stripe';

@Injectable()
export class SubscriptionService {
  constructor(
    private readonly stripeSubscriptionSvc: StripeSubscriptionService,
  ) {}

  async handleSubscription(
    customerId: string | undefined,
    priceId: string | undefined,
    billingInterval: Stripe.PriceCreateParams.Recurring.Interval,
    email?: string,
    productName?: string,
    unitPrice?: number,
    currency?: string,
  ) {
    return this.stripeSubscriptionSvc.createStripeSubscriptionPaymentSession(
      customerId,
      priceId,
      billingInterval,
      email,
      productName,
      unitPrice,
      currency,
    );
  }
}
