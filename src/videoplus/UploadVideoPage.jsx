import React from 'react';
import Layout from '../layouts/layout';
import { baseURL, endpoints } from '../router/apis';
import { Button, Col, Container, FormControl, Row } from 'react-bootstrap';
import { getAuthData } from '../auth/token';

function UploadVideoPage({ children }) {

  const authdata = JSON.parse(getAuthData());

  if (authdata === null) {
    window.location.href = '/login';
  }

  function submitForm(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const url = new URL(form.action);

    const slug = formData.get('title').toLowerCase().replace(/ /g, '-') + '-' + Date.now()

    formData.set('slug', slug);
    formData.set('author', authdata.person);

    fetch(url, {
      method: 'POST',
      body: formData,
      headers: {
        'Authorization': authdata.token,
      }
    })
    .then(response => {
      if (response.ok) {
        return;
      } else {
        throw new Error('Error al subir el video ' + response.status + ' ' + response.statusText);
      }
    })
    .then(() => {
      window.location.href = `/videos/${slug}`;
    });
  }

  return (
    <Layout>
      <Container>
        <form action={baseURL + endpoints.videos.list} method="POST" encType="multipart/form-data" onSubmit={submitForm}>
          <Row>
            <Col xs={12} className="mb-4">
              <label className="h4">
                Título
              </label>
              <FormControl required as="input" name="title" />
            </Col>
            <Col xs={12} className="mb-4">
              <label className="h4">
                Video
              </label>
              <FormControl required as="input" type="file" name="file" accept="video/*" />
            </Col>
            <Col xs={12} className="mb-4">
              <label className="h4">
                Miniatura
              </label>
              <FormControl required as="input" type="file" name="thumbnail" accept="image/*" />
            </Col>
            <Col xs={12} className="mb-4">
              <label className="h4">
                Público
              </label>
              <br/>
              <input as="input" type="checkbox" defaultChecked={true} value="true" name="ispublic"/>
            </Col>
            <Col xs={12} className="mb-4">
              <Button type="submit">Subir video</Button>
            </Col>
          </Row>
        </form>
      </Container>
    </Layout>
  );
}


export default UploadVideoPage;
