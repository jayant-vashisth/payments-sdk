import { Module } from '@nestjs/common';
import { StripeCheckoutService } from './providers/stripe.checkout.service';
import { StripeService } from './providers/stripe.service';
import { StripePaymentIntentService } from './providers/stripe.payment-intent.service';

const providers = [
  StripeCheckoutService,
  StripeService,
  StripePaymentIntentService,
];
@Module({
  imports: [],
  providers,
  exports: providers,
})
export class StripeModule {}
