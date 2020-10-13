import React from 'react';
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom';
import Layout from './containers/Layout';
import Landing from './screens/Landing.js';

function App() {
  return (
    <BrowserRouter basename="/">
      <Layout>
        <Route exact path="/" component={Landing} />
      </Layout>
    </BrowserRouter>
  );
}

export default App;
