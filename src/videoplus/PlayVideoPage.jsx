import React, { useEffect, useState } from 'react'
import Video from './models/videos';
import { Col, Container, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { baseURL, endpoints } from '../router/apis';
import Layout from '../layouts/layout';
import { getAuthToken } from '../auth/token';


function PlayVideoPage() {

  const { slug } = useParams();
  const [video, setVideo] = useState(null);

  useEffect(() => {
    const url = new URL(baseURL + endpoints.videos.model.replace(':slug', slug));

    fetch(url)
      .then(response => response.json())
      .then(video => new Video(video))
      .then(video => setVideo(video));

  }, [slug]);

  function submitForm(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const url = new URL(form.action);
    const authToken = getAuthToken();

    fetch(url, {
      method: 'PUT',
      body: formData,
      headers: {
        'Authorization': authToken || '',
      },
    })
    .finally(() => {
      window.location.reload();
    });
  }


  return (
    <Layout>
      <Container>
        {
          (video instanceof Video) ?  // if

          <section>
            <header className="mb-5">
              <h1>{video.title}</h1>
            </header>
            <div className="mb-5">
              <video controls autoPlay style={{ height: '60vh', maxWidth: '100%' }}>
                <source src={`${baseURL + video.file}`} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="mb-5">
              {video.interactions.comments.map((comment, index) => {
                return (
                  <div key={index} className="p-2 mb-3 border border-dark rounded">
                    <span className="h4">
                      {
                        comment.person === null ? 'Anónimo' :
                        <Link to={endpoints.persons.model.replace(':slug', comment.person.slug)}>
                          {comment.person.name}
                        </Link>
                      }
                    </span>
                    <p className="d-block">{comment.content}</p>
                  </div>
                );
              })}
            </div>

            <div>
              <form action={baseURL + endpoints.videos.interactions.replace(':slug', video.slug)} method="post" onSubmit={submitForm}>
                <Row>
                  <Col xs={12} className="mb-2">
                    <div className="form-group">
                      <textarea placeholder="escribe un comentario" className="form-control" id="comment" name="comment" rows="3"></textarea>
                    </div>
                  </Col>
                  <Col xs={12}>
                    <div className="form-group">
                      <button type="submit" className="btn btn-primary">Comentar</button>
                    </div>
                  </Col>
                </Row>
              </form>
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


export default PlayVideoPage;
