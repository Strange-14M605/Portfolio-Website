import projects from "@/../public/projects.json";

export default function ProjectsPage() {
  // Group projects by year
  const grouped = projects.reduce((acc, p) => {
    acc[p.year] = acc[p.year] || [];
    acc[p.year].push(p);
    return acc;
  }, {});

  // Sort years descending (optional)
  const sortedYears = Object.keys(grouped).sort((a, b) => b - a);

  return (
    <>
      <h2 className="project-heading">Projects</h2>
      <p>A showcase of things I’ve built — playful, technical, or both.</p>

      {sortedYears.map((year) => (
        <div key={year} className="year-group">
          <h3 className="year-heading">{year}</h3>

          {grouped[year].map((project) => (
            <div key={project.id} className="project-card">
              <a href={project.url}>
                <div className="project-grid">
                  <div className="left">
                    <p className="project-title">
                      <b>{project.name}</b>
                    </p>
                  </div>

                  <div className="right">
                    <p>{project.description}</p>
                    <p className="tags">
                      {project.tags.map((tag, index) => (
                        <span key={index} className="tag">
                          {tag}
                        </span>
                      ))}
                    </p>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      ))}
    </>
  );
}
