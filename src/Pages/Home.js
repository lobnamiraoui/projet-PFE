import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel  from '../Components/Carousel';
import Card from '../Components/Card';
import DetailProduct from './DetailProduct';
import Product from './Product';
function Home() {
  return (
    <div className="container mt-5">
      <h1>Bienvenue sur notre boutique en ligne</h1>

      {/* Carrousel Bootstrap */}
      <Carousel/>
        
      <h2 className="text-center">Nos Produits</h2>
      {/* Card Bootstrap */}
      <div className='card-grid'>
      <Card/>
      <Card/>
      <Card/>
      </div>
        
      <h2 className="text-center">Nos Categories</h2>
      {/* Card Bootstrap */}
      <div className='card-grid'>
      <Card/>
      <Card/>
      <Card/>
      </div>
      
    
      
   
    </div>
  );
}

export default Home;