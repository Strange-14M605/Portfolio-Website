export default function ProjectCard({ title, desc, contribution, year, tags, url, img }) {
    return (
      <div className="project-card">
        {img && (
          <img
            src={img}
            alt={title}
            className="project-image"
            style={{ width: "100%", borderRadius: "8px", marginBottom: "1rem" }}
          />
        )}
        <h2 className="project-title">{title}</h2>
        <p className="project-desc">{desc}</p>
        {contribution && <p className="project-contribution"><strong>Contribution:</strong> {contribution}</p>}
        <p className="project-year"><strong>Year:</strong> {year}</p>
        <p className="project-tags"><strong>Tags:</strong> {tags.join(", ")}</p>
        {url && (
            <>
          <a href={url} target="_blank" rel="noopener noreferrer" className="project-link">
            <img src="/icons/go-to.svg" alt="Icon" width="24" height="24" />
            Visit Project
          </a>
          </>
        )}
      </div>
    );
  }
  