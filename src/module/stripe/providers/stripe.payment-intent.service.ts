import { Injectable } from '@nestjs/common';
import { StripeService } from './stripe.service';
import Stripe from 'stripe';

@Injectable()
export class StripePaymentIntentService {
  private stripeInstance: Stripe;

  constructor(private readonly stripeSvc: StripeService) {
    this.stripeInstance = stripeSvc.getInstance();
  }

  async createPaymentIntentSession(   //modify controller for latest payload
    amount: number,
    currency: string,
    description: string,
    captureMethod?: 'automatic' | 'manual',
    statementDescriptor?: string,
    metadata?: Record<string, any>,
  ): Promise<Stripe.PaymentIntent> {
    try {
      const paymentIntent = await this.stripeInstance.paymentIntents.create({
        amount: amount,
        currency: currency,
        description: description,
        payment_method_types: ['card'],
        capture_method: captureMethod,
        statement_descriptor: statementDescriptor,
        metadata: metadata,
      });

      return paymentIntent;
    } catch (error) {
      console.error('Error creating payment intent:', error);
      throw new Error('Error creating payment intent');
    }
  }
}
