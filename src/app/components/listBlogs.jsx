"use client";

import { useEffect, useState } from "react";

export default function ListBlogs() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    //called on page load or reload
    async function fetchNotionData() {
      const res = await fetch("/api/notion", { method: "POST" });
      const data = await res.json();
      setPosts(data);
    }

    fetchNotionData();
  }, []);

  return (
    <div className="posts-container">
      <ul className="posts-list">
        {posts.map((post, index) => (
          <li key={index} className="post-item">
            <a
              href={`/blog/${post.pageId}?title=${post.title}&date=${post.date}`}
              className="post-link"
            >
              <div className="post-header">
                <h2 className="post-title">{post.title}</h2>
                <div className="post-header-inner">
                  <div>
                    {post.status === "1" ? (
                      <p>🌱</p>
                    ) : post.status === "2" ? (
                      <p>🌱🌱</p>
                    ) : post.status === "3" ? (
                      <p>🌱🌱🌱</p>
                    ) : null}
                  </div>
                  <p className="post-date">{post.date}</p>
                </div>
              </div>

              <div className="post-tags">
                {post.tags.map((tag, i) => (
                  <span key={i} className="post-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
