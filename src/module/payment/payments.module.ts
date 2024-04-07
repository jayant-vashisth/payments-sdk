import { Module } from '@nestjs/common';
import { StripeModule } from '../stripe/stripe.module';
import { CheckoutService } from './providers/checkout.service';
import { PaymentController } from './controllers/payment.controller';
import { PaymentIntentService } from './providers/payment-intent.service';

const providers = [CheckoutService, PaymentIntentService];
@Module({
  imports: [StripeModule],
  controllers: [PaymentController],
  providers,
})
export class PaymentsModule {}
