import React, { useState } from 'react';
import { Container, Table, Button } from 'react-bootstrap';

function Cart() {
  const [cartItems, setCartItems] = useState([
    {
      image: '/robe.jpg',
      name: 'Robe Fleurie',
      price: 79,
      quantity: 1
    },
    // Tu peux ajouter d'autres produits ici si tu veux
  ]);

  const handleDelete = (index) => {
    const newCart = [...cartItems];
    newCart.splice(index, 1); // supprime 1 élément à l'index donné
    setCartItems(newCart);
  };

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <Container className="py-5 cart-container">
      <h2 className="mb-4">Votre Panier</h2>
      {cartItems.length === 0 ? (
        <p className="text-center">Votre panier est vide.</p>
      ) : (
        <>
          <Table responsive bordered hover>
            <thead>
              <tr>
                <th>Image</th>
                <th>Produit</th>
                <th>Prix</th>
                <th>Quantité</th>
                <th>Total</th>
                <th>Supprimer</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, index) => (
                <tr key={index}>
                  <td><img src={item.image} alt="prod" width="70" /></td>
                  <td>{item.name}</td>
                  <td>{item.price}DT</td>
                  <td>
                    <input
                      type="number"
                      defaultValue={item.quantity}
                      className="form-control"
                      style={{ width: '80px' }}
                      min={1}
                      onChange={(e) => {
                        const newQuantity = parseInt(e.target.value);
                        const updatedCart = [...cartItems];
                        updatedCart[index].quantity = newQuantity;
                        setCartItems(updatedCart);
                      }}
                    />
                  </td>
                  <td>{item.price * item.quantity}DT</td>
                  <td>
                    <Button className="btn-delete" onClick={() => handleDelete(index)}>Supprimer</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <div className="text-end">
            <h4>Total: {total}DT</h4>
            <Button variant="dark" href="/order">Commander</Button>
          </div>
        </>
      )}
    </Container>
  );
}

export default Cart;