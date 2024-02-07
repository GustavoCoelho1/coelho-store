import Stripe from 'stripe';
import stripeConfig from '../config/stripe';

declare global {
    var stripeClient: Stripe | undefined;
}

const stripeClient =
    global.stripeClient ||
    new Stripe(stripeConfig.secretKey, { apiVersion: '2022-11-15' });

if (process.env.NODE_ENV !== 'production') {
    global.stripeClient = stripeClient;
}

export default stripeClient;
