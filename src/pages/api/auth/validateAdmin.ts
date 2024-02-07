import { NextApiHandler } from 'next';

const handler: NextApiHandler = (request, response) => {
    const { email } = request.body;

    if (email === process.env.ADMIN_USER) {
        response.json({ adminValido: true });
    }

    response.json({ adminValido: false });
};

export default handler;
