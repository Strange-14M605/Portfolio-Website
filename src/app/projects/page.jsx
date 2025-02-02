"use client";

import { useState, useEffect } from "react";
import ProjectCard from "../components/projectCard";

export default function Projects() {
  const [projects, setProjects] = useState([]); // All projects
  const [filteredProjects, setFilteredProjects] = useState([]); // Filtered projects
  const [selectedType, setSelectedType] = useState("tech"); // Default type
  const [selectedYear, setSelectedYear] = useState(""); // Selected Year

  // Fetch projects.json from public directory
  useEffect(() => {
    const fetchProjects = async () => {
      const response = await fetch("/projects.json");
      const data = await response.json();
      setProjects(data);
      setFilteredProjects(data.filter((project) => project.type === "tech")); // Default filter
    };

    fetchProjects();
  }, []);

  // Get unique years
  const allYears = [...new Set(projects.map((project) => project.year))];

  // Handle filtering based on type
  const handleFilterType = (type) => {
    setSelectedType(type);
    applyFilters(type, selectedYear);
  };

  // Handle filtering based on year
  const handleFilterYear = (year) => {
    const numericYear = year ? parseInt(year, 10) : ""; // Convert to number if a year is selected
    setSelectedYear(numericYear);
    applyFilters(selectedType, numericYear);
  };

  // Apply filtering logic
  const applyFilters = (type, year) => {
    let filtered = projects.filter((project) => project.type === type);

    if (year) {
      filtered = filtered.filter((project) => project.year === year);
    }

    setFilteredProjects(filtered);
  };

  return (
    <div className="projects-container">
      {/* Left - Project List */}
      <div className="content">
        <h1>My Projects</h1>

        {/* Sub-navbar for filtering by type */}
        <div className="sub-navbar">
          <button
            onClick={() => handleFilterType("tech")}
            className={selectedType === "tech" ? "active" : ""}
          >
            Tech
          </button>
          <button
            onClick={() => handleFilterType("design")}
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
          ))}
        </div>
      </div>

      {/* Right - Sidebar Filter (Year Only) */}
      <aside className="filter-sidebar">
        <h3>Filter by Year</h3>
        <select
          className="year-filter"
          value={selectedYear}
          onChange={(e) => handleFilterYear(e.target.value)}
        >
          <option value="">All</option>
          {allYears.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </aside>
    </div>
  );
}
