import { StripeCheckoutService } from 'src/module/stripe/providers/stripe.checkout.service';
import Stripe from 'stripe';

export interface CheckoutSDK {
  createCheckoutSession(
    amount: number,
    currency: string,
  ): Promise<Stripe.Checkout.Session>;
}
