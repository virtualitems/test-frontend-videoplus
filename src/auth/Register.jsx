import React from 'react';
import Layout from '../layouts/layout';
import { baseURL, endpoints } from '../router/apis';
import { Row, Col, FormControl, Button, Container } from 'react-bootstrap';


function Register({ children }) {

  function submitForm(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const url = new URL(form.action);

    const slug = formData.get('name').toLowerCase().replace(/ /g, '-') + '-' + Date.now()

    formData.append('slug', slug);

    fetch(url, {
      method: 'POST',
      body: formData,
    })
    .finally(() => {
      window.location.href = '/login';
    });
  }


  return (
    <Layout>
      <Container>
        <form action={baseURL + endpoints.persons.register}
          method="POST"
          encType="multipart/form-data"
          onSubmit={submitForm}>
          <Row>
            <Col xs={12} className="mb-4">
              <label className="h4">
                Nombre
              </label>
              <FormControl type="text" name="name" placeholder="Name" />
            </Col>
            <Col xs={12} className="mb-4">
              <label className="h4">
                Fecha de nacimiento
              </label>
              <FormControl type="date" name="birthdate" />
            </Col>
            <Col xs={12} className="mb-4">
              <label className="h4">
                Avatar
              </label>
              <FormControl type="file" name="avatar" />
            </Col>
            <Col xs={12} className="mb-4">
              <label className="h4">
                Correo electrónico
              </label>
              <FormControl type="email" name="email" placeholder="Email" />
            </Col>
            <Col xs={12} className="mb-4">
              <label className="h4">
                Contraseña
              </label>
              <FormControl type="password" name="password" placeholder="Password" />
            </Col>
            <Col xs={12} className="mb-4">
              <Button type="submit">
                Registrarse
              </Button>
            </Col>
          </Row>
        </form>
      </Container>
    </Layout>
  );
}


export default Register;
