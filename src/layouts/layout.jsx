import React, { Fragment } from 'react'
import Navbar from '../router/components/Navbar';
import { Container } from 'react-bootstrap';
import Footer from '../router/components/Footer';

function Layout({ children }) {
  return (
    <Fragment>
      <div className="mb-5">
        <Navbar />
      </div>

      <Container as="main" fluid="true" className="mb-5">
        {children}
      </Container>

      <div className="mt-5 p-2">&nbsp;</div>
      <div className="position-absolute bottom-0 w-100">
        <Footer />
      </div>
    </Fragment>
  );
}

export default Layout;
