import React from 'react'
import Video from '../models/videos';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { endpoints } from '../../router/apis';
import { getAuthToken } from '../../auth/token';


/**
 * @param {Object} props
 * @param {Video} props.video
 * @returns {React.ReactElement}
 */
function VideoCard({ apiurl, video, editbtn, deletebtn }) {

  function deleteVideo(event) {
    event.preventDefault()
    fetch(apiurl + endpoints.videos.model.replace(':slug', video.slug), {
      method: 'DELETE',
      headers: {
        'Authorization': getAuthToken()
      }
    })
    .then(response => {
      if (response.ok) {
        window.location.reload()
      } else {
        console.error(response.statusText)
      }
    })
  }

  return (
    <Card style={{ width: '18rem' }}>
      <Link to={endpoints.videos.model.replace(':slug', video.slug)}>
        <Card.Img variant="top" src={apiurl + video.thumbnail} />
      </Link>
      <Card.Body>
        <Card.Title>{video.title}</Card.Title>
      </Card.Body>
      <Card.Footer>
        {
          editbtn && (
            <Link to={`/videos/${video.slug}/edit`} className="btn btn-primary text-light me-3">
              Editar
            </Link>
          )
        }
        {
          deletebtn && (
            <Link to="/" className="btn btn-danger text-light me-3" onClick={deleteVideo}>
              Eliminar
            </Link>
          )
        }
      </Card.Footer>
    </Card>
  );
}

export default VideoCard;
