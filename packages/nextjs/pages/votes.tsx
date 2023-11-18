// pages/votes.tsx
import { GetServerSideProps } from 'next';
import { PrismaClient, Vote } from '@prisma/client';

const prisma = new PrismaClient();

interface VotesProps {
    votes: Vote[];
}

const Votes: React.FC<VotesProps> = ({ votes }) => (
    <div>
        <h1>Votes</h1>
        <ul>
            {votes.map((vote) => (
                <li key={vote.id}>
                    <p>Voter: {vote.voter}</p>
                    <p>Proposal: {vote.proposal}</p>
                    <p>Amount: {vote.amount.toString()}</p>
                </li>
            ))}
        </ul>
    </div>
);

export const getServerSideProps: GetServerSideProps<VotesProps> = async () => {
    const votes = await prisma.vote.findMany();
    return {
        props: {
            votes,
        },
    };
};

export default Votes;
