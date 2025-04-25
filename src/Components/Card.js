import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link, Links } from "react-router-dom";

function ProductCard() {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 300); // remove class after animation
  };

  return (
    <Card
      className={`product-card ${isClicked ? "clicked" : ""}`}
      style={{ width: "100%", margin: "1rem" }}
      onClick={handleClick}
    >
      <Card.Img variant="top" src="robe.jpg" alt="Robe élégante" />
      <Card.Body>
        <Card.Title>Robe Élégante</Card.Title>
        <Card.Text>
          Une robe chic et confortable, parfaite pour toutes les occasions.
        </Card.Text>
        <Card.Text>
        prix 79DT
        </Card.Text>
        <Link to="/cart">
          {" "}
          <Button variant="dark">Ajouter au panier 🛒</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}
 

export default ProductCard;
