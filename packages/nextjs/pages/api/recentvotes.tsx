import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const recentVotes = await prisma.vote.findMany({
      take: 5,
      orderBy: {
        id: 'desc',
      },
    });

    const votes = recentVotes.map((vote) => ({
      ...vote,
      amount: vote.amount.toString(),
    }));
    res.status(200).json({ message: 'Success', votes });
  } catch (error) {
    console.error('Error fetching recent votes:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  } finally {
    await prisma.$disconnect();
  }
}
