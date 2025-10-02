import React, { useState } from "react";

const Post = ({ post, addComment }) => {
  const [newComment, setNewComment] = useState("");

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      addComment(post.id, newComment);
      setNewComment("");
    }
  };

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "15px",
        marginBottom: "20px",
        borderRadius: "10px",
        backgroundColor: "#fafafa"
      }}
    >
      <h2>{post.title}</h2>
      <img
        src={post.image}
        alt={post.title}
        style={{ width: "100%", borderRadius: "10px" }}
      />
      <p>{post.summary}</p>

      
      <div style={{ marginTop: "10px" }}>
        <h4>Comentários:</h4>
        {post.comments.length === 0 ? (
          <p>Seja o primeiro a comentar!</p>
        ) : (
          <ul>
            {post.comments.map((comment, index) => (
              <li key={index}>{comment}</li>
            ))}
          </ul>
        )}
      </div>

      <form onSubmit={handleCommentSubmit} style={{ marginTop: "10px" }}>
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Digite um comentário..."
          style={{ padding: "8px", width: "80%", marginRight: "5px" }}
        />
        <button type="submit" style={{ padding: "8px 12px" }}>
          Enviar
        </button>
      </form>
    </div>
  );
};

export default Post;
