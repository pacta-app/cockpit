import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import { useQuery } from '@apollo/react-hooks';
import { gql } from "apollo-boost";
import { Query } from "react-apollo";
import ApolloClient from 'apollo-boost';
// or you can use `import gql from 'graphql-tag';` instead


function Home() {

  const QUERY = gql`
    {
      domains(first: 5) {
        id
        name
        labelName
        labelhash
      }
    }
  `;
  const { loading, error, data } = useQuery(QUERY);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  // console.log( data.domains.map((item, index) => (index)));

  return (
    <div>
      <h2>ENS data</h2>
      {data.domains.map((item, index) => (
        <div key={index}>
            <p>
              {item.id}: {item.name}
            </p>
        
        </div>
      ))}
    </div>
  );
}

function Tokens() {
  const clientToken = new ApolloClient({
    uri: 'https://api.thegraph.com/subgraphs/name/protofire/token-registry',
  });
  const QUERY = gql`
  {
    tokens(first: 50) {
      address
      name
      symbol
      decimals
    }
  }
`;

  return (
    <Query query={QUERY} client={clientToken}>
    {({ error, loading, data }) => {
      if (error) return "Error!";
      if (loading) return "Loading!";

      if (data) {
        return (
          <div>
          <h2>Token data</h2>
          {data.tokens.map((item, index) => (
            <div key={index}>
              <p>
                {item.symbol}, {item.name}, {item.address}
              </p>
            </div>
          ))}
        </div>
        );
      }
    }}
  </Query>
  );  
}

function Orgs() {
  const client = new ApolloClient({
    uri: 'https://api.thegraph.com/subgraphs/name/pacta-app/pacta-ropsten',
  });
  const QUERY = gql`
  {
    organisations(first: 50) {
      id
      count
      name
      association
    }
  }  
`;

  return (
    <Query query={QUERY} client={client}>
    {({ error, loading, data }) => {
      if (error) return "Error!";
      if (loading) return "Loading!";

      if (data) {
        return (
          <div>
          <h2>Pacta organisations data</h2>
          {data.organisations.map((item, index) => (
            <div key={index}>
              <p>
                {item.name}, {item.id}, {item.count}, {item.association}
              </p>
            </div>
          ))}
        </div>
        );
      }
    }}
  </Query>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <h1>
          Some stats and stuff
          </h1>
          <p>
            Based on thegraph
          </p>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/tokens">Tokens</Link>
            </li>
            <li>
              <Link to="/orgs">Orgs</Link>
            </li>
          </ul>
        </header>
        <hr />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/tokens">
            <Tokens />
          </Route>
          <Route path="/orgs">
            <Orgs />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
