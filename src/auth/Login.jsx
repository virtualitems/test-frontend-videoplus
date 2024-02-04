import React from 'react'
import Layout from '../layouts/layout';
import { Container, Row, Col, FormControl, Button, Alert } from 'react-bootstrap';
import { baseURL, endpoints } from '../router/apis';
import { setAuthToken } from './token';

function Login() {

  const [error, setError] = React.useState(null);

  function submitForm(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const url = new URL(form.action);

    fetch(url, {
      method: 'POST',
      body: formData,
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        setError('Usuario o contraseña incorrectos');
      }
    })
    .then(data => {
      if (data) {
        setAuthToken(data.token, JSON.stringify(data));
        window.location.href = '/';
      }
    });

  }

  return (
    <Layout>
      <Container>
        <h1>Login</h1>
        <div className="my-3">
          {
            error === null ? '\u00A0' :
            <Alert variant="danger">
              {error}
            </Alert>
          }
        </div>
        <form action={baseURL + endpoints.auth.login} method="POST" onSubmit={submitForm}>
          <Row>
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
              <Button type="submit">Iniciar sesión</Button>
            </Col>
          </Row>
        </form>
      </Container>
    </Layout>
  )
}

export default Login;
