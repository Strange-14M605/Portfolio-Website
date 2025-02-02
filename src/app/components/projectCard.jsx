export default function ProjectCard({ title, desc, contribution, year, tags, url, img }) {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="project-card">
      {/* Image */}
      {img && <img src={img} alt={title} className="project-image" />}

      {/* Title */}
      <h2 className="project-title">{title}</h2>
      <p className="project-desc">{desc}</p>

      {/* Contribution */}
      {contribution && (
        <p className="project-contribution">
          <strong>Contribution:</strong> {contribution}
        </p>
      )}

      {/* Year Tag */}
      <div className="project-year">
        <span className="tag year-tag">{year}</span>
      </div>

      {/* Tags */}
      <div className="project-tags">
        {tags.map((tag, index) => (
          <span key={index} className="tag">
            {tag}
          </span>
        ))}
      </div>
    </a>
  );
}
