import { Module } from '@nestjs/common';
import { StripeModule } from '../stripe/stripe.module';
import { CheckoutService } from './providers/checkout.service';
import { PaymentController } from './controllers/payment.controller';
import { PaymentIntentService } from './providers/payment-intent.service';
import { SubscriptionService } from './providers/subscription.service';
import { SubscriptionController } from './controllers/subscription.controller';

const providers = [CheckoutService, PaymentIntentService, SubscriptionService];
const controllers = [PaymentController, SubscriptionController];
@Module({
  imports: [StripeModule],
  controllers,
  providers,
})
export class PaymentsModule {}
