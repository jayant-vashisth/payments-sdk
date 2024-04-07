import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { SubscriptionService } from '../providers/subscription.service';
import { SubscriptionDto } from '../dtos/subscription.dto';

@Controller('/subscription')
export class SubscriptionController {
  constructor(private readonly subscriptionSvc: SubscriptionService) {}

  @HttpCode(HttpStatus.OK)
  @Post('/create-subscription')
  async StripeSubscriptionService(
    @Body(new ValidationPipe()) data: SubscriptionDto,
  ) {
    return this.subscriptionSvc.handleSubscription(
      data.customerId,
      data.priceId,
      data.billingInterval,
      data.email,
      data.productName,
      data.unitPrice,
      data.currency,
    );
  }
}
