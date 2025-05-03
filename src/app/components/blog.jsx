import React, { useEffect, useState } from "react";

const Blog = () => {
  const [resources, setResources] = useState([]);

  useEffect(() => {  //called on page load or reload
    async function fetchNotionData() {
      const res = await fetch("/api/notion", { method: "GET" });
      const data = await res.json();
      setResources(data.resources);
    }

    fetchNotionData();
  }, []);

  const renderBlock = (block, index) => {
    switch (block.type) {
      case "heading_1":
        return (
          <h1 key={index} className="mb-4 text-2xl font-bold">
            {block.content}
          </h1>
        );
      case "heading_2":
        return (
          <h2 key={index} className="mb-4 text-xl font-semibold">
            {block.content}
          </h2>
        );
      case "heading_3":
        return (
          <h3 key={index} className="mb-4 text-lg font-semibold">
            {block.content}
          </h3>
        );
      case "callout":
        return (
          <div key={index} className="mb-4 p-4 bg-blue-100 rounded-lg">
            {block.content}
          </div>
        );
      case "code":
        return (
          <pre key={index} className="mb-4 p-4 bg-gray-100 rounded-lg">
            {block.content}
          </pre>
        );
      case "bulleted_list_item":
        return (
          <li key={index} className="mb-4 list-disc pl-5">
            {block.content}
          </li>
        );
      case "paragraph":
        return (
          <p key={index} className="mb-4">
            {block.content}
          </p>
        );

      case "image":
        return (
          <img
            key={index}
            src={block.url}
            alt=""
            className="mb-4 rounded-xl max-w-full"
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {resources.map((block, index) => renderBlock(block, index))}
    </div>
  );
};

export default Blog;
