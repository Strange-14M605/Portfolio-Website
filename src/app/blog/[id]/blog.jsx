import React, { useEffect, useState } from "react";

const Blog = ({ id, title, date }) => {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    async function fetchNotionData() {
      const res = await fetch(`/api/notion?id=${id}`);
      const data = await res.json();
      setResources(data.resources);
    }

    fetchNotionData();
  }, [id]);

  const renderBlock = (block, index) => {
    switch (block.type) {
      case "heading_1":
        return <h3 key={index} className="blog-heading1">{block.content}</h3>;
      case "heading_2":
        return <h4 key={index} className="blog-heading2">{block.content}</h4>;
      case "heading_3":
        return <h5 key={index} className="blog-heading3">{block.content}</h5>;
      case "callout":
        return <div key={index} className="blog-callout">{block.content}</div>;
      case "code":
        return (
          <div key={index} className="code-block-wrapper">
            <button
              className="copy-button"
              onClick={() => navigator.clipboard.writeText(block.content)}
            >
              Copy
            </button>
            <pre className="blog-code">
              <code>{block.content}</code>
            </pre>
          </div>
        );
      case "bulleted_list_item":
        return <li key={index} className="blog-list-item">{block.content}</li>;
        case "paragraph":
          return (
            <p key={index} className="blog-paragraph">
              {block.link ? (
                <a href={block.link} target="_blank" rel="noopener noreferrer" className="mention-link">
                  {block.icon && (
                    <img src={block.icon}/>
                  )}
                  {block.content}
                </a>
              ) : (
                block.content
              )}
            </p>
          );        
        
      case "image":
        return <img key={index} src={block.url} alt="" className="blog-image" />;
      default:
        return null;
    }
  };

  return (
    <article className="blog-container">
      <header className="blog-header">
        <h1 className="blog-title">{title}</h1>
        <p className="blog-date">{date}</p>
      </header>
      <section className="blog-content">
        {resources.map((block, index) => renderBlock(block, index))}
      </section>
    </article>
  );
};

export default Blog;
