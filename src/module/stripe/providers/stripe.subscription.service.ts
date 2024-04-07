import { Injectable } from '@nestjs/common';
import { StripeService } from './stripe.service';
import Stripe from 'stripe';

@Injectable()
export class StripeSubscriptionService {
  private stripeInstance: Stripe;

  constructor(private readonly stripeSvc: StripeService) {
    this.stripeInstance = stripeSvc.getInstance();
  }

  async createStripeSubscriptionPaymentSession(
    customerId: string | undefined,
    priceId: string | undefined,
    billingInterval: Stripe.PriceCreateParams.Recurring.Interval,
    email?: string,
    productName?: string,
    unitPrice?: number,
    currency?: string,
  ): Promise<Stripe.Subscription | void> {
    try {
      let customer: Stripe.Customer | Stripe.DeletedCustomer;

      if (customerId) {
        try {
          customer = await this.stripeInstance.customers.retrieve(customerId);
        } catch (error) {
          if (error.statusCode === 404) {
            throw new Error('Customer with the provided ID does not exist.');
          }
          throw error;
        }
      } else if (email) {
        const existingCustomers = await this.stripeInstance.customers.list({
          email,
        });

        if (existingCustomers.data.length > 0) {
          customer = existingCustomers.data[0];
        } else {
          customer = await this.stripeInstance.customers.create({
            email,
            payment_method: 'pm_card_visa',
          });
        }
      } else {
        throw new Error('Either customerId or email must be provided.');
      }

      let price: Stripe.Price;

      if (priceId) {
        price = await this.stripeInstance.prices.retrieve(priceId);
      } else {
        if (!productName || !unitPrice || !currency) {
          throw new Error(
            'productName, unitPrice, and currency are required to create a product and price.',
          );
        }

        const product = await this.stripeInstance.products.create({
          name: productName,
          type: 'service',
        });

        price = await this.stripeInstance.prices.create({
          product: product.id,
          unit_amount: unitPrice,
          currency: currency,
          recurring: { interval: billingInterval },
        });
      }

      const subscription = await this.stripeInstance.subscriptions.create({
        customer: customer.id,
        items: [{ price: price.id }],
      });

      return subscription;
    } catch (error) {
      console.error('Error creating subscription:', error);
      throw new Error('Error creating subscription');
    }
  }
}
