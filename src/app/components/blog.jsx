"use client";

import { useEffect, useState } from "react";

export default function Blog() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchNotionData() {
      const res = await fetch("/api/notion", { method: "POST" });
      const data = await res.json();
      setPosts(data);
    }

    fetchNotionData();
  }, []);

  return (
    <div>
      <ul>
        {posts.map((post, index) => (
          <li key={index} className="mb-6">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="text-gray-600 text-sm">Date: {post.date}</p>
            <div className="flex gap-2 mt-1">
              {post.tags.map((tag, i) => (
                <span key={i} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                  {tag}
                </span>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
