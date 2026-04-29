import React from 'react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">

        {/* Brand column */}
        <div className="footer__brand">
          <div className="footer__brand-title">🛒 MicroCommerce</div>
          <p className="footer__brand-desc">
            A production-grade microservices e-commerce platform built with
            Spring Boot, React.js, and PostgreSQL.
          </p>
        </div>

        {/* Tech stack */}
        <div className="footer__col">
          <h4 className="footer__col-title">Tech Stack</h4>
          <ul className="footer__list">
            <li>Java 17 + Spring Boot 3.2</li>
            <li>React 18 + Redux Toolkit</li>
            <li>PostgreSQL 15</li>
            <li>Spring Cloud Gateway</li>
            <li>Docker + Docker Compose</li>
          </ul>
        </div>

        {/* Architecture */}
        <div className="footer__col">
          <h4 className="footer__col-title">Microservices</h4>
          <ul className="footer__list">
            <li>API Gateway — :8080</li>
            <li>Order Service — :8081</li>
            <li>Inventory Service — :8082</li>
            <li>Payment Service — :8083</li>
            <li>Notification Service — :8084</li>
          </ul>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="footer__bottom">
        <div className="footer__bottom-inner">
          <p className="footer__author">
            Crafted with ♥ by{' '}
            <a
              href="https://www.linkedin.com/in/gangalovaraju/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__author-link"
            >
              Ganga Lova Raju Yerikireddy
            </a>
            {' '}— Java Full Stack Developer
          </p>
          <div className="footer__socials">
            <a
              href="https://github.com/Gangalovaraju"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social-btn"
              aria-label="GitHub"
            >
              <GithubIcon /> GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/gangalovaraju/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social-btn footer__social-btn--linkedin"
              aria-label="LinkedIn"
            >
              <LinkedInIcon /> LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function GithubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482
        0-.237-.009-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462
        -.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832
        .091-.647.349-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683
        -.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004
        1.705.114 2.504.336 1.909-1.294 2.748-1.025 2.748-1.025.546 1.377.202 2.394.1 2.647.64.699
        1.028 1.592 1.028 2.683 0 3.842-2.338 4.687-4.566 4.935.359.309.678.919.678 1.852 0
        1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853
        0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85
        3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0
        01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452z"/>
    </svg>
  );
}
