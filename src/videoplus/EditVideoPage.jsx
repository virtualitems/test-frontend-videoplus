import React, { useEffect, useState } from 'react';
import Layout from '../layouts/layout';
import { baseURL, endpoints } from '../router/apis';
import { Button, Col, Container, FormControl, Row } from 'react-bootstrap';
import { getAuthData } from '../auth/token';
import { useParams } from 'react-router-dom';
import Video from './models/videos';


function UploadVideoPage({ children }) {

  const authdata = JSON.parse(getAuthData());

  if (authdata === null) {
    window.location.href = '/login';
  }

  let { slug } = useParams();
  const [video, setVideo] = useState(null);

  useEffect(() => {
    const url = new URL(baseURL + endpoints.videos.model.replace(':slug', slug));

    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else if (response.status === 404) {
          window.location.href = `/users/${authdata.person}`;
        } else {
          throw new Error('Error al cargar el video ' + response.status + ' ' + response.statusText);
        }
      })
      .then(video => new Video(video))
      .then(video => setVideo(video));

  }, [slug]);

  function submitForm(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData();
    const url = new URL(form.action);
    let newSlug = null;

    if (form.file.files.length > 0) {
      formData.append('file', form.file.files[0]);
    }

    if (form.thumbnail.files.length > 0) {
      formData.append('thumbnail', form.thumbnail.files[0]);
    }

    if (form.title.value !== video.title) {
      formData.append('title', form.title.value);
      newSlug = formData.get('title').toLowerCase().replace(/ /g, '-') + '-' + Date.now();
      formData.append('slug', newSlug);
    }

    if (form.ispublic.checked !== video.isPublic) {
      formData.append('ispublic', form.ispublic.checked ? 'true' : 'false');
    }

    fetch(url, {
      method: 'PUT',
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
      window.location.href = `/videos/${newSlug || slug}`;
    });
  }

  return (
    <Layout>
      <Container>
        {
          (video instanceof Video) ?  // if
          <form action={baseURL + endpoints.videos.model.replace(':slug', slug)}
            method="POST"
            encType="multipart/form-data"
            onSubmit={submitForm}
            >
            <Row>
              <Col xs={12} className="mb-4">
                <label className="h4">
                  Título
                </label>
                <FormControl as="input" id="title" name="title" defaultValue={video.title} />
              </Col>
              <Col xs={12} className="mb-4">
                <label className="h4">
                  Video
                </label>
                <span className="d-block mb-2 text-primary">
                  <a href={baseURL + video.file} target="_blank" rel="noreferrer">
                    Ver video actual
                  </a>
                </span>
                <FormControl as="input" type="file" id="file" name="file" accept="video/*" />
              </Col>
              <Col xs={12} className="mb-4">
                <label className="h4">
                  Miniatura
                </label>
                <span className="d-block mb-2 text-primary">
                  <a href={baseURL + video.thumbnail} target="_blank" rel="noreferrer">
                    Ver miniatura actual
                  </a>
                </span>
                <FormControl as="input" type="file" id="thumbnail" name="thumbnail" accept="image/*" />
              </Col>
              <Col xs={12} className="mb-4">
                <label className="h4">
                  Público
                </label>
                <br/>
                <input as="input" type="checkbox" defaultChecked={video.isPublic} value="true" id="ispublic" name="ispublic"/>
              </Col>
              <Col xs={12} className="mb-4">
                <Button type="submit">Subir video</Button>
              </Col>
            </Row>
          </form>

          :  // else

          <section>
            <h1>Loading...</h1>
          </section>

        }
      </Container>
    </Layout>
  );
}


export default UploadVideoPage;
