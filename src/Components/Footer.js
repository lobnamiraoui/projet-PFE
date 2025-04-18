import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';

function Footer() {
 


  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col md={3}>
            <Image src="/logo.png" alt="Logo" width="100px" height="100px" className="mb-3" rounded />
            <h4>Contact</h4>
            <p><strong>Adresse :</strong> Kairouan</p>
            <p><strong>Téléphone :</strong> +21651220258</p>
            <p><strong>Heures :</strong> 10:00 - 18:00, Lun - Sam</p>
            <div className="mt-3">
              <h4>Suivez-nous</h4>
              <div className="d-flex align-items-center gap-2">
                <Image src="/facebook.png" alt="Facebook" width="30px" height="30px" className="social-icon" />
                <Image src="/whatsapp.png" alt="Whatsapp" width="30px" height="30px" className="social-icon" />
                <Image src="/twitter.png" alt="Twitter" width="40px" height="40px" className="social-icon" />
               
              </div>
            </div>
          </Col>

          <Col md={3}>
            <h4>À propos</h4>
            <ul className="list-unstyled">
              <li><a href="About" className="footer-link">À propos de nous</a></li>
              <li><a href="Contact" className="footer-link">Contactez-nous</a></li>
            </ul>
          </Col>

          <Col md={3}>
            <h4>Mon Compte</h4>
            <ul className="list-unstyled">
              <li><a href="SignIn" className="footer-link">Connexion</a></li>
              <li><a href="Cart" className="footer-link">Voir Panier</a></li>
              <li><a href="SignUp" className="footer-link">Inscription</a></li>
            </ul>
          </Col>

          <Col md={3}>
            <h4>Installer l'application</h4>
            <p>Depuis App Store ou Google Play</p>
            <div className="d-flex gap-2 mb-2">
              <Image src="/app store.png" alt="App Store" width="100px" height="50px" />
              <Image src="/play store.png" alt="Play Store" width="100px" height="50px" />
            </div>
            <p>Paiement sécurisé</p>
            <Image src="/bank.png" alt="Méthodes de paiement" width="200px" height="200px" fluid />
          </Col>
        </Row>
      </Container>
      <div className="text-center mt-4">
        <p className="copyright-text">&copy; 2025 Loby Store — Vente des produits pour femmes</p>
      </div>
    </footer>
  );
}

export default Footer;