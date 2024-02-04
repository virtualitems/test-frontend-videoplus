import React, { useEffect, useState } from 'react'
import Person from './models/persons';
import { Button, Col, Container, FormControl, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { baseURL, endpoints } from '../router/apis';
import Layout from '../layouts/layout';
import { deleteAuthToken, getAuthData } from '../auth/token';


function PersonProfile() {

  const { slug } = useParams();
  const [person, setPerson] = useState(null);

  let authdata = getAuthData();

  if (authdata) {
    authdata = JSON.parse(authdata);
  }

  const personSlug = authdata && authdata.person;

  const isOwner = personSlug === slug;

  useEffect(() => {
    const profileUrl = new URL(baseURL + endpoints.persons.model.replace(':slug', slug));

    fetch(profileUrl)
      .then(response => response.json())
      .then(person => new Person(person))
      .then(person => setPerson(person))

  }, [slug]);

  function submitForm(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData();
    const url = new URL(form.action);
    let logout = false;

    if (form.avatar.files.length > 0) {
      formData.append('avatar', form.avatar.files[0]);
    }

    if (form.name.value !== person.name) {
      formData.append('name', form.name.value);
      formData.append('slug', form.name.value.toLowerCase().replace(/ /g, '-') + '-' + Date.now());
      logout = true;
    }

    if (form.birthdate.value !== new Date(person.birthdate).toISOString().split('T')[0]) {
      formData.append('birthdate', form.birthdate.value);
    }

    if (form.email.value !== authdata.user) {
      formData.append('email', form.email.value);
      logout = true;
    }

    if (form.password.value) {
      formData.append('password', form.password.value);
      logout = true;
    }

    fetch(url, {
      method: 'PUT',
      body: formData,
      headers: {
        'Authorization': authdata.token
      }
    })
    .finally(() => {
      if (logout) {
        deleteAuthToken();
        window.location.href = '/login';
      } else {
        window.location.href = `/users/${slug}`;
      }
    });
  }

  return (
    <Layout>
      <Container>
        {
          (person instanceof Person) ?  // if

          <form action={baseURL + endpoints.persons.model.replace(':slug', slug)}
            method="POST"
            encType="multipart/form-data"
            onSubmit={submitForm}>
            <Row>
              <Col xs={12} className="mb-4">
                <label className="h4">
                  Nombre
                </label>
                <FormControl type="text" id="name" name="name" placeholder="Name" defaultValue={person.name} />
              </Col>
              <Col xs={12} className="mb-4">
                <label className="h4">
                  Fecha de nacimiento
                </label>
                <FormControl type="date" id="birthdate" name="birthdate" defaultValue={new Date(person.birthdate).toISOString().split('T')[0]} />
              </Col>
              <Col xs={12} className="mb-4">
                <label className="h4">
                  Avatar
                </label>
                <span className="d-block mb-2 text-primary">
                  <a href={baseURL + person.avatar} target="_blank" rel="noreferrer">
                    Ver avatar actual
                  </a>
                </span>
                <FormControl type="file" id="avatar" name="avatar" />
              </Col>
              <Col xs={12} className="mb-4">
                <label className="h4">
                  Correo electrónico
                </label>
                <FormControl type="email" id="email" name="email" placeholder="Email" defaultValue={authdata.user} />
              </Col>
              <Col xs={12} className="mb-4">
                <label className="h4">
                  Contraseña
                </label>
                <FormControl type="password" id="password" name="password" placeholder="Password" />
              </Col>
              <Col xs={12} className="mb-4">
                <Button type="submit">
                  Registrarse
                </Button>
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


export default PersonProfile;
