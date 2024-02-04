import React from 'react'

function Footer() {
  return (
    <footer className="bg-dark text-center p-1">
      <p className="pt-3">
        <small className="text-white me-3">
          &copy; 2024 Alejandro Carrasco Rodríguez
        </small>
        <a className="text-white btn btn-outline-secondary me-3" href="https://github.com/virtualitems" target="_blank" rel="noopener noreferrer">
          Github
        </a>
        <a className="text-white btn btn-outline-primary me-3" href="https://www.linkedin.com/in/alejandro-carrasco-rodr%C3%ADguez-a06a37175/" target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
        <a className="text-white btn btn-outline-info" href="https://www.alejandrocr.co/about/" target="_blank" rel="noopener noreferrer">
          Website
        </a>
      </p>
    </footer>
  );
}

export default Footer;