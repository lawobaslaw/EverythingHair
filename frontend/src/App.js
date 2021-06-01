
import React from 'react';
import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from './components/Header'
import Footer from './components/Footer'
import HomeView from './viewport/HomeView'
import ProductView from './viewport/ProductView'
const App = () => {


  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path='/' component={HomeView} exact />
          <Route path='/product/:id' component={ProductView} />
        </Container>
      </main>

      <Footer />
    </Router>
  );
}

export default App;
