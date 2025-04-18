import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';


function About() {
  return (
    <Container className="about-page mt-5">
      <h2 className="text-center mb-4">À propos de nous</h2>
      <p className="about-text text-center">
        Bienvenue dans notre boutique en ligne dédiée aux femmes modernes. Nous vous proposons une sélection soigneusement choisie de produits de mode, beauté et bien-être pour illuminer votre journée. Soyez belle, soyez vous-même. 💖
      </p>

      {/* Carte */}
      <h4 className="text-center mt-5 mb-3">Notre emplacement</h4>
      <div className="map-wrapper d-flex justify-content-center">
        <div className="embed-map-responsive">
          <div className="embed-map-container">
            <iframe
              className="embed-map-frame"
              frameBorder="0"
              scrolling="no"
              marginHeight="0"
              marginWidth="0"
              src="https://maps.google.com/maps?width=400&height=400&hl=en&q=KAIROUAN&t=&z=14&ie=UTF8&iwloc=B&output=embed"
              title="Emplacement de Kairouan"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>

      {/* Rencontre avec l'équipe */}
      <h4 className="text-center mt-5 mb-3">Rencontrez l'équipe</h4>
      <Row className="text-center">
        <Col md={4}>
          <Card className="team-card">
            
            <Card.Body>
              <Card.Title>Lobna</Card.Title>
              <Card.Text>Fondatrice & CEO</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="team-card">
           
            <Card.Body>
              <Card.Title>Safa</Card.Title>
              <Card.Text>Directrice créative</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="team-card">
            
            <Card.Body>
              <Card.Title>Abir</Card.Title>
              <Card.Text>Responsable marketing</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Timeline */}
      <h4 className="text-center mt-5 mb-3">Notre parcours</h4>
      <ul className="timeline">
        <li><strong>2020 :</strong> Marque fondée par des femmes pour des femmes</li>
        <li><strong>2021 :</strong> Lancement de notre première collection de mode</li>
        <li><strong>2022 :</strong> Expansion dans les secteurs bien-être et beauté</li>
        <li><strong>2024 :</strong> Plus de 10 000 clientes heureuses !</li>
      </ul>

      {/* Témoignages */}
      <h4 className="text-center mt-5 mb-3">Ce que disent nos clientes</h4>
      <Row>
        <Col md={6}>
          <Card className="testimonial-card">
            <Card.Body>
              <Card.Text>
                “J'adore la qualité et le style des produits ! Livraison rapide et service exceptionnel.” — <em>Amira</em>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="testimonial-card">
            <Card.Body>
              <Card.Text>
                “Une boutique magnifique avec tout ce dont j'ai besoin. Toujours un plaisir de magasiner ici !” — <em>Selma</em>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default About;