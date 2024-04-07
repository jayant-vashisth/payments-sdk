import { Module } from '@nestjs/common';
import { StripeModule } from './module/stripe/stripe.module';
import { PaymentsModule } from './module/payment/payments.module';

@Module({
  imports: [StripeModule, PaymentsModule],
})
export class AppModule {}
