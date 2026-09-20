"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/supabase";

const buildShelfDisplayItem = (item) => {
  if (!item) return null;

  const title = item.title || item.name || "Untitled";
  const creator = item.author_or_creator || item.creator || "Unknown";

  return {
    title,
    creator,
    link: item.link || item.url || "#",
    type: item.type,
  };
};

const buildProjectDisplayItem = (project) => {
  if (!project) return null;

  return {
    title: project.title || project.name || "Untitled project",
    link: project.link || project.url || project.github_url || "#",
    description: project.description || "",
  };
};

const getProjectTimestamp = (project) => {
  const candidate = project?.created_at || project?.updated_at || project?.date || project?.published_at;
  if (!candidate) return 0;

  const time = new Date(candidate).getTime();
  return Number.isNaN(time) ? 0 : time;
};

export default function LatestLandingMeta() {
  const [latestItems, setLatestItems] = useState({
    project: null,
    reading: null,
    watching: null,
    loading: true,
  });

  useEffect(() => {
    let isMounted = true;

    const fetchLatestData = async () => {
      try {
        const [projectResult, shelfResult] = await Promise.all([
          supabase
            .from("projects")
            .select("*")
            .order("created_at", { ascending: false, nullsLast: true })
            .limit(10),
          supabase
            .from("shelf")
            .select("*")
            .eq("status", "currently")
            .order("updated_at", { ascending: false, nullsLast: true })
            .limit(10),
        ]);

        if (!isMounted) return;

        if (projectResult.error) {
          console.error("Error fetching project data:", projectResult.error);
        }

        if (shelfResult.error) {
          console.error("Error fetching shelf data:", shelfResult.error);
        }

        const projectItems = Array.isArray(projectResult.data) ? projectResult.data : [];
        const featuredProject =
          [...projectItems]
            .sort((a, b) => getProjectTimestamp(b) - getProjectTimestamp(a))
            .find((project) => project.is_featured || project.featured) ||
          [...projectItems].sort((a, b) => getProjectTimestamp(b) - getProjectTimestamp(a))[0] ||
          null;

        const shelfItems = Array.isArray(shelfResult.data) ? shelfResult.data : [];
        const reading = buildShelfDisplayItem(
          shelfItems.find((item) => item.type === "book" || item.type === "article") ||
            shelfItems.find((item) => !item.type)
        );
        const watching = buildShelfDisplayItem(
          shelfItems.find((item) => item.type === "show" || item.type === "movie")
        );

        setLatestItems({
          project: buildProjectDisplayItem(featuredProject),
          reading,
          watching,
          loading: false,
        });
      } catch (error) {
        console.error("Error loading landing metadata:", error);
        if (isMounted) {
          setLatestItems({ project: null, reading: null, watching: null, loading: false });
        }
      }
    };

    fetchLatestData();

    return () => {
      isMounted = false;
    };
  }, []);

  const featuredProject = latestItems.project;
  const reading = latestItems.reading;
  const watching = latestItems.watching;

  return (
    <div className="landing-meta">
      <p>
        <span> ★ Featured Projects:</span>{" "}
        {latestItems.loading ? (
          <span>Loading...</span>
        ) : featuredProject ? (
          <a href={featuredProject.link === "#" ? undefined : featuredProject.link} target={featuredProject.link !== "#" ? "_blank" : undefined} rel={featuredProject.link !== "#" ? "noopener noreferrer" : undefined}>
            {featuredProject.title}
          </a>
        ) : (
          <span>No featured project yet</span>
        )}
      </p>

      <p>
        <span> ★ Currently Reading:</span>{" "}
        {latestItems.loading ? (
          <span>Loading...</span>
        ) : reading ? (
          <a href={reading.link === "#" ? undefined : reading.link} target={reading.link !== "#" ? "_blank" : undefined} rel={reading.link !== "#" ? "noopener noreferrer" : undefined}>
            {reading.title}
          </a>
        ) : (
          <span>No featured project yet</span>
        )}
      </p>

            <p>
        <span> ★ Currently Watching:</span>{" "}
        {latestItems.loading ? (
          <span>Loading...</span>
        ) : watching ? (
          <a href={watching.link === "#" ? undefined : watching.link} target={watching.link !== "#" ? "_blank" : undefined} rel={watching.link !== "#" ? "noopener noreferrer" : undefined}>
            {watching.title}
          </a>
        ) : (
          <span>No featured project yet</span>
        )}
      </p>
    </div>
  );
}
