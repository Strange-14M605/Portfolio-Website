"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/supabase";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase.from("projects").select("*");

      if (error) {
        console.error("Error fetching projects:", error);
        setProjects([]);
        setLoading(false);
        return;
      }

      const mappedProjects = (data ?? [])
        .map((project) => {
          const createdAt = project.created_at || project.updated_at;
          const year = createdAt ? new Date(createdAt).getFullYear() : new Date().getFullYear();

          return {
            ...project,
            id: project.id,
            name: project.title || "Untitled project",
            description: project.description || "",
            tags: Array.isArray(project.tags) ? project.tags : [],
            year,
            url: project.github_url || project.url || "#",
          };
        })
        .sort((a, b) => b.year - a.year);

      setProjects(mappedProjects);
      setLoading(false);
    };

    fetchProjects();
  }, []);

  const grouped = useMemo(() => {
    return projects.reduce((acc, project) => {
      if (!acc[project.year]) acc[project.year] = [];
      acc[project.year].push(project);
      return acc;
    }, {});
  }, [projects]);

  const sortedYears = Object.keys(grouped).sort((a, b) => b - a);

  if (loading) {
    return (
      <>
        <h2 className="page-title">Projects</h2>
        <p>Loading projects...</p>
      </>
    );
  }

  return (
    <>
      <h2 className="page-title">Projects</h2>
      {sortedYears.length === 0 ? (
        <p>No projects yet.</p>
      ) : (
        sortedYears.map((year) => (
          <div key={year} className="year-group">
            <h3 className="year-heading">{year}</h3>

            {grouped[year].map((project) => (
              <div key={project.id} className="project-card">
                {project.url && project.url !== "#" ? (
                  <a href={project.url} target="_blank" rel="noopener noreferrer">
                    <div className="project-grid">
                      <div className="left">
                        <p>
                          <b>{project.name}</b>
                        </p>
                      </div>

                      <div className="right">
                        <p>{project.description}</p>
                        <p className="tags">
                          {project.tags.map((tag, index) => (
                            <span key={`${project.id}-${tag}-${index}`} className="tag">
                              {tag}
                            </span>
                          ))}
                        </p>
                      </div>
                    </div>
                  </a>
                ) : (
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
                          <span key={`${project.id}-${tag}-${index}`} className="tag">
                            {tag}
                          </span>
                        ))}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ))
      )}
    </>
  );
}
