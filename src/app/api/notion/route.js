// src/app/api/notion/route.js
export async function POST() {
    const notionToken = process.env.NOTION_TOKEN;
    const databaseId = process.env.NOTION_DATABASE_ID;
  
    const res = await fetch(`https://api.notion.com/v1/databases/${databaseId}/query`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${notionToken}`,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });
  
    const data = await res.json();
  
    const blogPosts = data.results.map((page) => {
      const title = page.properties.Page.title[0]?.plain_text || "Untitled";
      const tags = page.properties.Tags.multi_select.map(tag => tag.name);
      const lastEdited = new Date(page.properties["Last edited time"].last_edited_time);
      const date = `${lastEdited.getDate().toString().padStart(2, "0")}/${(lastEdited.getMonth() + 1).toString().padStart(2, "0")}/${lastEdited.getFullYear()}`;
  
      return {
        title,
        tags,
        date,
        pageId: page.created_by.id,
      };
    });
  
    return new Response(JSON.stringify(blogPosts), {
      headers: { "Content-Type": "application/json" },
    });
  }
  