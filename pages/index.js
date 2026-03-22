
import { useMemo, useState } from "react";

export default function Home() {
  const phone = "330661696080";
  const email = "shinedada.shop@gmail.com";

  const products = [
    { id: 1, name: "Nettoyant Multi-Usages 750 ml", price: 1.99, category: "Surfaces", badge: "Petit prix", description: "Nettoie cuisine, salle de bain et surfaces du quotidien.", emoji: "✨" },
    { id: 2, name: "Liquide Vaisselle Citron 500 ml", price: 1.49, category: "Vaisselle", badge: "Essentiel", description: "Dégraissant efficace pour une vaisselle propre chaque jour.", emoji: "🍋" },
    { id: 3, name: "Lessive Liquide Fraîcheur 1,5 L", price: 4.99, category: "Linge", badge: "Top vente", description: "Format économique pour le linge du quotidien.", emoji: "🧺" },
    { id: 4, name: "Nettoyant Sol Savon de Marseille 1 L", price: 2.49, category: "Sols", badge: "Maison", description: "Aide à garder des sols propres avec une note fraîche.", emoji: "🫧" },
    { id: 5, name: "Pack Éponges x6", price: 1.29, category: "Accessoires", badge: "Pratique", description: "Éponges résistantes pour la cuisine et le ménage.", emoji: "🧽" },
    { id: 6, name: "Spray Salle de Bain 750 ml", price: 2.29, category: "Salle de bain", badge: "Hygiène", description: "Aide à enlever les traces et à garder une salle de bain nette.", emoji: "🚿" }
  ];

  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");

  const filteredProducts = useMemo(() => {
    return products.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));
  }, [search]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const changeQty = (id, delta) => {
    setCart((prev) =>
      prev
        .map((item) => item.id === id ? { ...item, qty: Math.max(0, item.qty + delta) } : item)
        .filter((item) => item.qty > 0)
    );
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  const whatsappLink = useMemo(() => {
    const lines = [
      "Bonjour Shinedada, je souhaite commander :",
      "",
      ...cart.map((item) => `- ${item.name} x${item.qty} = ${(item.price * item.qty).toFixed(2)}€`),
      "",
      `Total estimé : ${total.toFixed(2)}€`,
      "",
      "Merci de me confirmer la disponibilité et la livraison.",
    ];
    return `https://wa.me/${phone}?text=${encodeURIComponent(lines.join("\n"))}`;
  }, [cart, total]);

  return (
    <div className="page">
      <header className="header">
        <div className="container nav">
          <div>
            <div className="brand">Shinedada</div>
            <div className="tagline">Produits de ménage à petit prix</div>
          </div>
          <a className="navButton" href="#panier">Panier ({cartCount})</a>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="container heroGrid">
            <div>
              <span className="pill">Commande simple par WhatsApp</span>
              <h1>Une boutique ménage simple, propre et efficace</h1>
              <p className="heroText">
                Les essentiels du quotidien à prix accessibles, avec commande rapide sur WhatsApp.
              </p>
              <div className="heroActions">
                <a className="primaryBtn" href="#produits">Voir les produits</a>
                <a className="secondaryBtn" href={`https://wa.me/${phone}`} target="_blank" rel="noreferrer">Commander</a>
              </div>

              <div className="stats">
                <div className="statCard"><strong>6</strong><span>produits clés</span></div>
                <div className="statCard"><strong>Prix</strong><span>compétitifs</span></div>
                <div className="statCard"><strong>24/7</strong><span>commande WhatsApp</span></div>
              </div>
            </div>

            <div className="heroCard">
              <div className="heroMini">Maison propre • Prix légers</div>
              <h3>Shinedada</h3>
              <p>Des produits simples à commander, sans paiement compliqué.</p>
              <div className="heroList">
                <div>✔ Livraison à confirmer par message</div>
                <div>✔ Contact direct sur WhatsApp</div>
                <div>✔ Email : {email}</div>
              </div>
            </div>
          </div>
        </section>

        <section className="container benefits">
          <div className="benefit">
            <h3>Petit prix</h3>
            <p>Des essentiels du ménage avec un positionnement accessible.</p>
          </div>
          <div className="benefit">
            <h3>Commande rapide</h3>
            <p>Le client ajoute au panier puis envoie la commande sur WhatsApp.</p>
          </div>
          <div className="benefit">
            <h3>Contact direct</h3>
            <p>WhatsApp et email visibles pour rassurer les clients.</p>
          </div>
        </section>

        <section id="produits" className="container productsSection">
          <div className="sectionTop">
            <div>
              <p className="sectionLabel">Catalogue</p>
              <h2>Nos produits</h2>
            </div>
            <input className="search" placeholder="Rechercher un produit" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>

          <div className="grid">
            {filteredProducts.map((product) => (
              <article className="card" key={product.id}>
                <div className="imageBox">{product.emoji}</div>
                <div className="cardTop">
                  <span className="badge">{product.badge}</span>
                  <span className="category">{product.category}</span>
                </div>
                <h3>{product.name}</h3>
                <p className="description">{product.description}</p>
                <div className="cardBottom">
                  <strong>{product.price.toFixed(2)}€</strong>
                  <button onClick={() => addToCart(product)}>Ajouter</button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="panier" className="container basketSection">
          <div className="basket">
            <div className="basketHeader">
              <div>
                <p className="sectionLabel">Panier</p>
                <h2>Votre commande</h2>
              </div>
              <span className="pill light">{cartCount} article(s)</span>
            </div>

            {cart.length === 0 ? (
              <div className="empty">Votre panier est vide pour le moment.</div>
            ) : (
              <div className="basketList">
                {cart.map((item) => (
                  <div className="basketItem" key={item.id}>
                    <div>
                      <strong>{item.name}</strong>
                      <div className="muted">{item.price.toFixed(2)}€ / unité</div>
                    </div>
                    <div className="qtyBox">
                      <button onClick={() => changeQty(item.id, -1)}>-</button>
                      <span>{item.qty}</span>
                      <button onClick={() => changeQty(item.id, 1)}>+</button>
                    </div>
                    <strong>{(item.qty * item.price).toFixed(2)}€</strong>
                  </div>
                ))}
              </div>
            )}
          </div>

          <aside className="summary">
            <p className="summaryLabel">Finaliser la commande</p>
            <h3>Commander sur WhatsApp</h3>
            <div className="summaryRow">
              <span>Articles</span>
              <strong>{cartCount}</strong>
            </div>
            <div className="summaryRow total">
              <span>Total estimé</span>
              <strong>{total.toFixed(2)}€</strong>
            </div>
            <a className="whatsappBtn" href={cart.length ? whatsappLink : `https://wa.me/${phone}`} target="_blank" rel="noreferrer">
              Envoyer la commande
            </a>
            <p className="summaryText">
              Contact WhatsApp : +33 06 61 69 60 80
              <br />
              Email : {email}
            </p>
          </aside>
        </section>
      </main>

      <footer className="footer">
        <div className="container footerWrap">
          <div>
            <strong>Shinedada</strong>
            <p>Boutique e-commerce de produits de ménage</p>
          </div>
          <div className="footerLinks">
            <a href={`https://wa.me/${phone}`} target="_blank" rel="noreferrer">WhatsApp</a>
            <a href={`mailto:${email}`}>{email}</a>
          </div>
        </div>
      </footer>

      <style jsx>{`
        :global(body) {
          margin: 0;
          font-family: Arial, Helvetica, sans-serif;
          background: #f7f8fa;
          color: #111827;
        }
        * { box-sizing: border-box; }
        .page { min-height: 100vh; }
        .container { width: 100%; max-width: 1180px; margin: 0 auto; padding: 0 20px; }
        .header { position: sticky; top: 0; z-index: 30; background: rgba(255,255,255,0.92); backdrop-filter: blur(10px); border-bottom: 1px solid #ececec; }
        .nav { display: flex; justify-content: space-between; align-items: center; padding-top: 18px; padding-bottom: 18px; }
        .brand { font-size: 30px; font-weight: 800; letter-spacing: -0.03em; }
        .tagline { color: #6b7280; font-size: 14px; margin-top: 4px; }
        .navButton, .primaryBtn, .secondaryBtn, .card button, .whatsappBtn { text-decoration: none; border: none; cursor: pointer; transition: 0.2s ease; }
        .navButton { background: #111827; color: white; padding: 12px 18px; border-radius: 14px; font-weight: 700; box-shadow: 0 10px 30px rgba(17,24,39,0.18); }
        .hero { padding: 54px 0 28px; }
        .heroGrid { display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 24px; align-items: center; }
        .pill { display: inline-block; background: #eef2ff; color: #3730a3; padding: 10px 14px; border-radius: 999px; font-size: 14px; font-weight: 700; }
        .pill.light { background: #f3f4f6; color: #111827; }
        h1 { font-size: 56px; line-height: 1.02; margin: 18px 0 14px; letter-spacing: -0.04em; }
        .heroText { font-size: 19px; color: #4b5563; max-width: 640px; line-height: 1.6; }
        .heroActions { display: flex; gap: 14px; margin-top: 28px; }
        .primaryBtn { background: #111827; color: white; padding: 15px 22px; border-radius: 16px; font-weight: 700; box-shadow: 0 14px 30px rgba(17,24,39,0.18); }
        .secondaryBtn { background: white; color: #111827; padding: 15px 22px; border-radius: 16px; font-weight: 700; border: 1px solid #d1d5db; }
        .stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin-top: 30px; }
        .statCard { background: white; border: 1px solid #ececec; border-radius: 22px; padding: 18px; box-shadow: 0 8px 25px rgba(17,24,39,0.04); }
        .statCard strong { display: block; font-size: 24px; margin-bottom: 6px; }
        .statCard span { color: #6b7280; font-size: 14px; }
        .heroCard { background: linear-gradient(180deg, #ffffff 0%, #f3f4f6 100%); border: 1px solid #ececec; border-radius: 28px; padding: 30px; box-shadow: 0 18px 50px rgba(17,24,39,0.08); }
        .heroMini { color: #6b7280; font-size: 14px; margin-bottom: 14px; }
        .heroCard h3 { font-size: 34px; margin: 0 0 12px; }
        .heroCard p { color: #4b5563; line-height: 1.6; }
        .heroList { display: grid; gap: 10px; margin-top: 18px; color: #111827; font-size: 15px; }
        .benefits { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; margin-top: 20px; margin-bottom: 26px; }
        .benefit { background: white; border: 1px solid #ececec; border-radius: 24px; padding: 24px; box-shadow: 0 8px 20px rgba(17,24,39,0.04); }
        .benefit h3 { margin: 0 0 10px; font-size: 22px; }
        .benefit p { margin: 0; color: #6b7280; line-height: 1.6; }
        .productsSection { padding: 34px 20px 10px; }
        .sectionTop { display: flex; justify-content: space-between; align-items: end; gap: 20px; margin-bottom: 22px; }
        .sectionLabel { color: #6b7280; margin: 0 0 4px; font-size: 14px; }
        h2 { margin: 0; font-size: 34px; letter-spacing: -0.03em; }
        .search { width: 320px; max-width: 100%; padding: 15px 16px; border-radius: 16px; border: 1px solid #d1d5db; background: white; font-size: 15px; }
        .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
        .card { background: white; border: 1px solid #ececec; border-radius: 26px; padding: 18px; box-shadow: 0 10px 26px rgba(17,24,39,0.05); }
        .imageBox { height: 180px; border-radius: 22px; background: linear-gradient(180deg, #f9fafb 0%, #eef2f7 100%); display: flex; align-items: center; justify-content: center; font-size: 58px; margin-bottom: 16px; }
        .cardTop { display: flex; justify-content: space-between; align-items: center; gap: 8px; margin-bottom: 8px; }
        .badge { background: #111827; color: white; border-radius: 999px; padding: 7px 10px; font-size: 12px; font-weight: 700; }
        .category { color: #6b7280; font-size: 13px; }
        .card h3 { margin: 0 0 10px; font-size: 20px; line-height: 1.35; }
        .description { color: #6b7280; line-height: 1.6; font-size: 14px; min-height: 66px; }
        .cardBottom { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-top: 18px; }
        .cardBottom strong { font-size: 28px; letter-spacing: -0.03em; }
        .card button { background: #111827; color: white; padding: 12px 16px; border-radius: 14px; font-weight: 700; }
        .basketSection { display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 18px; padding: 34px 20px 70px; align-items: start; }
        .basket, .summary { border-radius: 28px; border: 1px solid #ececec; box-shadow: 0 12px 30px rgba(17,24,39,0.05); }
        .basket { background: white; padding: 26px; }
        .summary { background: #111827; color: white; padding: 26px; position: sticky; top: 96px; }
        .basketHeader { display: flex; align-items: center; justify-content: space-between; gap: 16px; margin-bottom: 22px; }
        .empty { background: #f9fafb; border: 1px dashed #d1d5db; border-radius: 22px; padding: 22px; color: #6b7280; }
        .basketList { display: grid; gap: 12px; }
        .basketItem { display: grid; grid-template-columns: 1.5fr auto auto; gap: 14px; align-items: center; border: 1px solid #ececec; border-radius: 20px; padding: 16px; }
        .muted { color: #6b7280; font-size: 14px; margin-top: 4px; }
        .qtyBox { display: flex; align-items: center; gap: 10px; }
        .qtyBox button { width: 38px; height: 38px; border-radius: 12px; border: 1px solid #d1d5db; background: white; cursor: pointer; font-size: 18px; }
        .summaryLabel { color: #d1d5db; margin: 0 0 6px; font-size: 14px; }
        .summary h3 { margin: 0 0 22px; font-size: 30px; line-height: 1.15; }
        .summaryRow { display: flex; justify-content: space-between; gap: 12px; padding: 14px 0; border-bottom: 1px solid rgba(255,255,255,0.1); }
        .summaryRow.total { font-size: 22px; border-bottom: none; padding-bottom: 6px; }
        .whatsappBtn { display: block; width: 100%; text-align: center; background: white; color: #111827; padding: 15px 18px; border-radius: 16px; font-weight: 800; margin-top: 20px; }
        .summaryText { color: #d1d5db; font-size: 14px; line-height: 1.7; margin-top: 16px; }
        .footer { border-top: 1px solid #ececec; background: white; }
        .footerWrap { display: flex; justify-content: space-between; gap: 20px; align-items: center; padding-top: 22px; padding-bottom: 22px; }
        .footerWrap p { margin: 6px 0 0; color: #6b7280; }
        .footerLinks { display: flex; gap: 16px; flex-wrap: wrap; }
        .footerLinks a { color: #111827; text-decoration: none; font-weight: 700; }
        @media (max-width: 980px) {
          .heroGrid, .basketSection, .grid, .benefits { grid-template-columns: 1fr; }
          h1 { font-size: 42px; }
          .basketItem { grid-template-columns: 1fr; }
          .summary { position: static; }
          .sectionTop, .basketHeader, .footerWrap, .nav { flex-direction: column; align-items: flex-start; }
          .stats { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
