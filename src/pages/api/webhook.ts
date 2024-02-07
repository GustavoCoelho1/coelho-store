import { NextApiHandler } from 'next';
import { buffer } from 'micro';
import stripeClient from 'libs/stripe';
import prismaClient from 'libs/prisma';

export const config = {
    api: {
        bodyParser: false,
    },
};

const handler: NextApiHandler = async (req, res) => {
    const payload = await buffer(req);
    const signature = req.headers['stripe-signature'];
    const secret = process.env.STRIPE_SIGNING_SECRET;

    try {
        const event = stripeClient.webhooks.constructEvent(
            payload,
            signature,
            secret,
        );

        const stripeEventObject = event.data?.object as any;
        const orderId = stripeEventObject?.metadata?.orderId;

        if (event?.type === 'checkout.session.completed') {
            await prismaClient.pedido.update({
                where: {
                    ped_cod: orderId,
                },

                data: {
                    ped_status: 'OK',
                },
            });
        } else if (
            event?.type === 'charge.failed' ||
            event?.type === 'checkout.session.expired'
        ) {
            await prismaClient.pedido.update({
                where: {
                    ped_cod: orderId,
                },

                data: {
                    ped_status: 'DELETED',
                },
            });
        }

        res.status(200).json({
            ok: true,
        });
    } catch (err) {
        res.status(400).json({
            erro: err,
        });
    }
};

export default handler;
