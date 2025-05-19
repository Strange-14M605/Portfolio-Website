import React, { useEffect, useState } from "react";

const Blog = ({ id, title }) => {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    async function fetchNotionData() {
      const res = await fetch(`/api/notion?id=${id}`);
      const data = await res.json();
      setResources(data.resources);
    }

    fetchNotionData();
  }, [id]);

  const renderBlocks = (blocks) => {
    const output = [];

    for (let i = 0; i < blocks.length; i++) {
      const block = blocks[i];

      if (block.type === "bulleted_list_item") {
        const listItems = [];

        while (i < blocks.length && blocks[i].type === "bulleted_list_item") {
          listItems.push(blocks[i]);
          i++;
        }
        i--;

        output.push(
          <ul className="blog-list" key={`list-${i}`}>
            {listItems.map((item, idx) => (
              <li key={idx} className="blog-list-item">
                {item.content}
                {item.children && (
                  <div className="blog-children">
                    {renderBlocks(item.children)}
                  </div>
                )}
              </li>
            ))}
          </ul>
        );
      } else {
  output.push(
    <div key={i} className="blog-block">
      {renderBlock(block)}
      {/* Only render children here if block type doesn't handle children internally */}
      {!["callout"].includes(block.type) && block.children && (
        <div className="blog-children">{renderBlocks(block.children)}</div>
      )}
    </div>
  );
      }
    }

    return output;
  };

  const renderBlock = (block) => {
    switch (block.type) {
      case "heading_1":
        return <h3 className="blog-heading1">{block.content}</h3>;
      case "heading_2":
        return <h4 className="blog-heading2">{block.content}</h4>;
      case "heading_3":
        return <h5 className="blog-heading3">{block.content}</h5>;
      case "callout":
        return (
          <div className="blog-callout">
            <div className="callout-content">{block.content}</div>
            {block.children && (
              <div className="blog-children">{renderBlocks(block.children)}</div>
            )}
          </div>
        );
      case "code":
        return (
          <div className="code-block-wrapper">
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
      case "paragraph":
        return (
          <p className="blog-paragraph">
            {block.link ? (
              <a
                href={block.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mention-link"
              >
                {block.icon && <img src={block.icon} alt="" />}
                {block.content}
              </a>
            ) : (
              block.content
            )}
          </p>
        );
      case "image":
        return <img src={block.url} alt="" className="blog-image" />;
      default:
        return null;
    }
  };

  return (
    <article className="blog-container">
      <header className="blog-header">
        <h1 className="blog-title">{title}</h1>
      </header>
      <section className="blog-content">{renderBlocks(resources)}</section>
    </article>
  );
};

export default Blog;
