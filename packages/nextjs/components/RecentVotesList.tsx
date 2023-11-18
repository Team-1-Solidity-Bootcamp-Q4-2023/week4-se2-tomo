// components/RecentVotesList.tsx
import React, { useState, useEffect } from 'react';

interface Vote {
  id: number;
  voter: string;
  proposal: number;
  amount: string;
  txHash?: string | null;
}

const RecentVotesList: React.FC = () => {
  const [recentVotes, setRecentVotes] = useState<Vote[]>([]);

  useEffect(() => {
    const fetchRecentVotes = async () => {
      try {
        const response = await fetch('/api/recentvotes');
        const data = await response.json();
        setRecentVotes(data.votes);
      } catch (error) {
        console.error('Error fetching recent votes:', error);
      }
    };

    fetchRecentVotes();
  }, []);
  if (!recentVotes) return <div>Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Recent Votes</h1>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border p-2">ID</th>
            <th className="border p-2">Voter</th>
            <th className="border p-2">Proposal</th>
            <th className="border p-2">Amount</th>
            <th className="border p-2">Transaction Hash</th>
          </tr>
        </thead>
        <tbody>
          {recentVotes.map((vote) => (
            <tr key={vote.id}>
              <td className="border p-2">{vote.id}</td>
              <td className="border p-2">{vote.voter}</td>
              <td className="border p-2">{vote.proposal}</td>
              <td className="border p-2">{vote.amount}</td>
              <td className="border p-2">{vote.txHash || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentVotesList;
