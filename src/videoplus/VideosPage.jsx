import React, { useEffect, useState } from 'react'
import { baseURL, endpoints } from '../router/apis';
import { Container, Row, Col } from 'react-bootstrap';
import Layout from '../layouts/layout';
import VideoCard from './components/VideoCard';
import Video from './models/videos';
import { getAuthToken } from '../auth/token';


function VideosPage({ children }) {
  const [videos, setVideos] = useState([]);

  useEffect(() => {

    const url = new URL(baseURL + endpoints.videos.list);
    url.searchParams.append('isactive', 'true');

    if (getAuthToken() === null) {
      url.searchParams.append('ispublic', 'true');
    }

    fetch(url)
      .then(response => response.json())
      .then(videos => videos.map(video => new Video(video)))
      .then(data => setVideos(data));

  }, []);

  return (
    <Layout>
      <Container>
        <header className="mb-5">
          <h1>Videos</h1>
        </header>
        <Row>
          {videos.map((video, index) => {
            return (
              <Col key={index} md={4}>
                <VideoCard apiurl={baseURL} video={video} />
              </Col>
            );
          })}
        </Row>
      </Container>
    </Layout>
  );
}


export default VideosPage;
