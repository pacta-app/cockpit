import React from 'react';
import './App.css';
import { useQuery } from '@apollo/react-hooks';
import { gql } from "apollo-boost";
// or you can use `import gql from 'graphql-tag';` instead

const EXCHANGE_RATES = gql`
{
  domains(first: 5) {
    id
    name
    labelName
    labelhash
  }
  transfers(first: 5) {
    id
    domain {
      id
    }
    blockNumber
    transactionID
  }
}
`;

function Ens() {
  const { loading, error, data } = useQuery(EXCHANGE_RATES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  console.log(data);
  return <p>Done</p>;
 /*
  return data.rates.map(({ currency, rate }) => (
    <div key={currency}>
      <p>
        {currency}: {rate}
      </p>
    </div>
  ));
  */
}



export default Ens;
