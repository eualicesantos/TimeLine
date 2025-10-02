import React, { useState, useEffect } from "react";
import Post from "./Post";


import img1 from './imagens/img1.jpeg';
import img2 from './imagens/img2.jpeg';
import img3 from './imagens/img3.jpeg';
import img4 from './imagens/img4.jpeg';
import img5 from './imagens/img5.jpeg';
import img6 from './imagens/img6.jpeg';

const App = () => {
  const imagens = [img1, img2, img3, img4, img5, img6];

  const inicial = Array.from({ length: 500 }, (_, i) => ({
    id: i + 1,
    title: `Post #${i + 1}`,
    image: imagens[i % imagens.length],
    summary: `Resumo do post ${i + 1}`,
    comments: []
  }));

  const [posts, setPosts] = useState(inicial);
  const [notificacao, setNotificacao] = useState("");

  const comentar = (id, texto) => {
    setPosts(posts.map(p => 
      p.id === id ? { ...p, comments: [...p.comments, texto] } : p
    ));
  };

  useEffect(() => {
    const aoRolar = () => {
      const alvo = document.getElementById("post-250");
      if (alvo) {
        const pos = alvo.getBoundingClientRect();
        if (pos.top < window.innerHeight && pos.bottom > 0) {

          const sorteado = Math.floor(Math.random() * 249) + 1;
          comentar(sorteado, "Comentário automático!");
          setNotificacao(`O Post #${sorteado} recebeu um comentário!`);

          window.removeEventListener("scroll", aoRolar);
        }
      }
    };
    window.addEventListener("scroll", aoRolar);
    return () => window.removeEventListener("scroll", aoRolar);
  }, [posts]);

  return (
    <div style={{ width: "600px", margin: "auto", fontFamily: "Arial" }}>
      <h1 style={{ textAlign: "center" }}>Minha Timeline</h1>

      {notificacao && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          background: "#ba0909ff",
          color: "#ffffffff",
          padding: "10px",
          textAlign: "center",
          fontWeight: "bold",
          zIndex: 1000
        }}>
          {notificacao}
          <button 
            onClick={() => setNotificacao("")}
            style={{
              marginLeft: "15px",
              background: "transparent",
              border: "none",
              fontSize: "20px",
              cursor: "pointer"
            }}
          >
            X
          </button>
        </div>
      )}

      {posts.map(post => (
        <div id={`post-${post.id}`} key={post.id}>
          <Post post={post} addComment={comentar} />
        </div>
      ))}
    </div>
  );
};

export default App;
