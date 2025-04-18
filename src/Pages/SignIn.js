import React from 'react';
import { Container, Form, Button } from 'react-bootstrap';

function SignIn() {
  return (
    <Container className="py-5 signin-wrapper">
      <div className="signin-form">
        <h2>Se connecter</h2>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Entrez votre email" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Mot de passe</Form.Label>
            <Form.Control type="password" placeholder="Mot de passe" />
          </Form.Group>

          <Button variant="dark" type="submit">Connexion</Button>
        </Form>
      </div>
    </Container>
  );
}

export default SignIn;