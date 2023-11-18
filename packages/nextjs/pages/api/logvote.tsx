import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/*
curl -X POST -H "Content-Type: application/json" -d '{
  "voter": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
  "proposal": 0,
  "amount": 1234567890,
  "txHash": "0xtxHash"
}' http://localhost:3000/api/logvote
*/

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const { voter, proposal, amount, txHash } = req.body;

            const newVote = await prisma.vote.create({
                data: {
                    voter,
                    proposal,
                    amount,
                    txHash,
                },
            });

            res.status(201).json({ message: 'Vote created successfully', txHash: txHash });
        } catch (error) {
            console.error('Error creating vote:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        } finally {
            await prisma.$disconnect();
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
