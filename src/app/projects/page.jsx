"use client";

import { useState, useEffect } from "react";

//components
import ProjectCard from "../components/projectCard";

export default function Projects() {
  const [projects, setProjects] = useState([]); // All projects
  const [filteredProjects, setFilteredProjects] = useState([]); // Filtered projects
  const [selectedType, setSelectedType] = useState("tech"); // Default type

  // Fetch projects.json from public directory
  useEffect(() => {
    const fetchProjects = async () => {
      const response = await fetch("/projects.json");
      const data = await response.json();
      setProjects(data); // Set all projects
      setFilteredProjects(data.filter((project) => project.type === "tech")); // Default filter
    };

    fetchProjects();
  }, []);

  // Handle filtering based on selected type
  const handleFilter = (type) => {
    setSelectedType(type);
    setFilteredProjects(projects.filter((project) => project.type === type));
  };

  return (
    <div className="content">
      <h1>My Projects</h1>

      {/* Sub-navbar */}
      <div className="sub-navbar">
        <button
          onClick={() => handleFilter("tech")}
          className={selectedType === "tech" ? "active" : ""}
        >
          Tech
        </button>
        <button
          onClick={() => handleFilter("design")}
          className={selectedType === "design" ? "active" : ""}
        >
          Design
        </button>
      </div>

      {/* Display filtered projects */}
      <div className="project-list">
      {filteredProjects.map((project) => (
          <ProjectCard
            key={project.id}
            title={project.name}
            desc={project.description}
            contribution={project.contribution || ""}
            year={project.year}
            tags={project.tags}
            url={project.url}
            img={project.image}
          />
      ))}</div>

    </div>
  );
}
