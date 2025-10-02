import React, { useState } from "react";
import Post from "./Post";

import img1 from './imagens/img1.jpeg';
import img2 from './imagens/img2.jpeg';
import img3 from './imagens/img3.jpeg';
import img4 from './imagens/img4.jpeg';
import img5 from './imagens/img5.jpeg';
import img6 from './imagens/img6.jpeg';

const App = () => {
  const images = [img1, img2, img3, img4, img5, img6];

  const initialPosts = Array.from({ length: 500 }, (_, index) => ({
    id: index + 1,
    title: `Post #${index + 1}`,
    image: images[index % images.length],
    summary: `Resumo do post número ${index + 1}`,
    comments: []
  }));

  const [posts, setPosts] = useState(initialPosts);

  const addComment = (postId, comment) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? { ...post, comments: [...post.comments, comment] }
          : post
      )
    );
  };

  return (
    <div style={{ width: "600px", margin: "auto", fontFamily: "Arial" }}>
      <h1 style={{ textAlign: "center" }}>Minha Timeline</h1>
      {posts.map((post) => (
        <Post key={post.id} post={post} addComment={addComment} />
      ))}
    </div>
  );
};

export default App;
