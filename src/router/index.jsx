import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../auth/Login';
import VideosPage from '../videoplus/VideosPage';
import PlayVideoPage from '../videoplus/PlayVideoPage';
import PersonProfile from '../persons/PersonProfile';
import EditPersonProfile from '../persons/EditPersonProfile';
import Register from '../auth/register';
import UploadVideoPage from '../videoplus/UploadVideoPage';
import EditVideoPage from '../videoplus/EditVideoPage';


function router() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<VideosPage />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/users/:slug" element={<PersonProfile />} />
      <Route path="/users/:slug/edit" element={<EditPersonProfile />} />

      <Route path="/videos" element={<VideosPage />} />
      <Route path="/videos/:slug" element={<PlayVideoPage />} />
      <Route path="/videos/create" element={<UploadVideoPage />} />
      <Route path="/videos/:slug/edit" element={<EditVideoPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default router;