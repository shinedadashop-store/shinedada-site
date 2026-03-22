
import { useState } from "react";

export default function Home() {
  const phone = "330661696080";

  const products = [
    { id: 1, name: "Nettoyant Multi-Usages 750 ml", price: 1.99 },
    { id: 2, name: "Liquide Vaisselle Citron 500 ml", price: 1.49 },
    { id: 3, name: "Lessive Liquide Fraîcheur 1,5 L", price: 4.99 },
    { id: 4, name: "Nettoyant Sol Savon de Marseille 1 L", price: 2.49 },
    { id: 5, name: "Pack Éponges x6", price: 1.29 },
    { id: 6, name: "Spray Salle de Bain 750 ml", price: 2.29 }
  ];

  const [cart, setCart] = useState([]);

  const add = (p) => {
    const found = cart.find(i => i.id === p.id);
    if(found){
      setCart(cart.map(i => i.id === p.id ? {...i, qty: i.qty + 1} : i));
    } else {
      setCart([...cart, {...p, qty: 1}]);
    }
  };

  const total = cart.reduce((s,i)=> s + i.price * i.qty, 0);

  const message = encodeURIComponent(
    "Commande Shinedada:\n" +
    cart.map(i => `- ${i.name} x${i.qty}`).join("\n") +
    `\nTotal: ${total.toFixed(2)}€`
  );

  return (
    <div style={{fontFamily:"Arial", padding:20}}>
      <h1>Shinedada</h1>
      <p>Boutique de produits de ménage</p>

      <h2>Produits</h2>
      {products.map(p => (
        <div key={p.id} style={{border:"1px solid #ddd", padding:10, marginBottom:10}}>
          <b>{p.name}</b><br/>
          {p.price} €<br/>
          <button onClick={()=>add(p)}>Ajouter</button>
        </div>
      ))}

      <h2>Panier</h2>
      {cart.length === 0 ? <p>Vide</p> : cart.map(i => (
        <div key={i.id}>{i.name} x{i.qty}</div>
      ))}

      <h3>Total: {total.toFixed(2)} €</h3>

      <a href={`https://wa.me/${phone}?text=${message}`} target="_blank">
        Commander sur WhatsApp
      </a>
    </div>
  );
}
