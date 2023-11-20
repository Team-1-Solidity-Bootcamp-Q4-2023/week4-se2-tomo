import React, { useEffect, useState } from "react";

export default function TokenInformationFromApi() {
  const [addressData, setAddressData] = useState<{ result: string }>();
  const [addressLoading, setAddressLoading] = useState(true);

  const [nameData, setNameData] = useState<{ result: string }>();
  const [nameLoading, setNameLoading] = useState(true);

  useEffect(() => {
    // Fetch token address
    fetch("http://localhost:3001/contract-address")
      .then(res => res.json())
      .then(data => {
        setAddressData(data);
        setAddressLoading(false);
      });

    // Fetch token name
    fetch("http://localhost:3001/token-name")
      .then(res => res.json())
      .then(data => {
        setNameData(data);
        setNameLoading(false);
      });
  }, []); // Empty dependency array means this will run once when the component mounts

  if (addressLoading || nameLoading) {
    return <p>Loading token information from API...</p>;
  }

  if (!addressData || !nameData) {
    return <p>No token information found</p>;
  }

  return (
    <div>
      <p>Token Name: {nameData.result}</p>
      <p>Token Address from API: {addressData.result}</p>
    </div>
  );
}
