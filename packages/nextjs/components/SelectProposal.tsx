import React, { useState, useEffect } from 'react';

interface ApiResponse {
  message: string;
  proposals: string[];
}

interface SelectProposalProps {
  apiUrl: string;
  onSelectChange: (selectedProposal: string) => void;
}

const SelectProposal: React.FC<SelectProposalProps> = ({ apiUrl, onSelectChange }) => {
  const [proposals, setProposals] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        const data: ApiResponse = await response.json();
        setProposals(data.proposals);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [apiUrl]);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedProposal = event.target.value;
    onSelectChange(selectedProposal);
  };

  return (
    <div className='bg-white text-black'>
      <label>Select Proposal:</label>
      <select onChange={handleSelectChange}>
        <option value="">Select an option</option>
        {proposals.map((proposal, index) => (
          <option key={index} value={proposal}>
            {proposal}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectProposal;
