"use client";

//import json
import projects from "@/../public/projects.json";

export default function Projects() {
  return (
    <>
      <h2 className="project-heading">Projects</h2>
      {projects.map((project) => (
        <a key={project.id} className="project-card">
          <p className="project-title">
            <b>{project.name}</b>
          </p>
          <p className="year">{project.year}</p>
          <p>{project.description}</p>
          <p className="tags">
            {project.tags.map((tag, index) => (
              <span key={index} className="tag">
                {tag}
              </span>
            ))}
          </p>
        </a>
      ))}
    </>
  );
}
