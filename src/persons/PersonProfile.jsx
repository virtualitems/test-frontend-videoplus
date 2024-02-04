import React, { useEffect, useState } from 'react'
import Person from './models/persons';
import Video from '../videoplus/models/videos';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { baseURL, endpoints } from '../router/apis';
import Layout from '../layouts/layout';
import VideoCard from '../videoplus/components/VideoCard';
import { deleteAuthToken, getAuthData } from '../auth/token';


function PersonProfile() {

  const { slug } = useParams();
  const [person, setPerson] = useState(null);
  const [videos, setVideos] = useState([]);

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

    const videosUrl = new URL(baseURL + endpoints.videos.list);
    videosUrl.searchParams.append('author', slug);
    videosUrl.searchParams.append('isactive', 'true');

    fetch(videosUrl)
      .then(response => response.json())
      .then(videos => videos.map(video => new Video(video)))
      .then(videos => setVideos(videos))

  }, [slug]);

  function deleteAccount(event) {
    event.preventDefault();
    const url = new URL(baseURL + endpoints.persons.model.replace(':slug', slug));
    fetch(url, {
      method: 'DELETE',
      headers: {
        'Authorization': authdata.token
      }
    })
    .then(response => {
      if (response.ok) {
        deleteAuthToken();
        window.location = '/';
      } else {
        throw new Error('No se pudo eliminar la cuenta');
      }
    });
  }

  return (
    <Layout>
      <Container>
        {
          (person instanceof Person) ?  // if

          <section>
            <header className="mb-5">
              <img className="mb-1"
                src={baseURL + person.avatar}
                alt={person.name}
                style={{ height: '60vh', maxWidth: '100%'}}
              />
              <h1>{person.name}</h1>
            </header>
            <div className="mb-5">
              {
                isOwner &&
                <div>
                  <Link to={`/users/${slug}/edit`}>
                    <Button variant="primary" className="me-3">Editar perfil</Button>
                  </Link>
                  <Link to="#" onClick={deleteAccount}>
                    <Button variant="danger">Eliminar cuenta</Button>
                  </Link>
                </div>
              }
            </div>
            <div className="mb-5">
              <h2>videos</h2>
              <Row>
                {videos.map(video => (
                  <Col key={video.id} lg={4} className="mb-4">
                    <VideoCard apiurl={baseURL} video={video} editbtn={isOwner} deletebtn={isOwner} />
                  </Col>
                ))}
              </Row>
            </div>
          </section>

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
