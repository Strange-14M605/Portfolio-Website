const notionToken = process.env.NOTION_TOKEN;
const databaseId = process.env.NOTION_DATABASE_ID;
const pageId = process.env.PAGE_ID;

export async function POST() {
  
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
      const title = page.properties.Page.title[0]?.plain_text || "Untitled";  //returns a string
      const tags = page.properties.Tags.multi_select.map(tag => tag.name);  //returns an array of strings
      const lastEdited = new Date(page.properties["Last edited time"].last_edited_time); //returns a date object
      const date = `${lastEdited.getDate().toString().padStart(2, "0")}/${(lastEdited.getMonth() + 1).toString().padStart(2, "0")}/${lastEdited.getFullYear()}`;  //rewrite date as dd/mm/yyyy, processed as a string
  
      return {
        title,
        tags,
        date,
        pageId: page.id,  //fetch page ID too for future access
      };
    });
  
    return new Response(JSON.stringify(blogPosts), {
      headers: { "Content-Type": "application/json" },
    });
  }
  
  import { NextResponse } from 'next/server';

export async function GET() {

  const response = await fetch(`https://api.notion.com/v1/blocks/${pageId}/children?page_size=100`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${notionToken}`,
      "Notion-Version": "2022-06-28",
      "Content-Type": "application/json"
    }
  });

  const data = await response.json();
  const resources = [];

  for (const block of data.results) {
    const type = block.type;
    const contentItem = { type };

    const richText = block[type]?.rich_text;

    switch (type) {
      case "heading_1":
      case "heading_2":
      case "heading_3":
      case "callout":
      case "code":
      case "bulleted_list_item":
        if (richText?.length) {
          contentItem.content = richText.map(rt => rt.plain_text).join("");
        }
        break;

      case "paragraph":
        if (richText?.length) {
          contentItem.content = richText.map(rt => rt.plain_text).join("");
          const link = richText.find(rt => rt.text?.link?.url);
          if (link) {
            contentItem.link = link.text.link.url;
          }
        }
        break;

      case "image":
        if (block.image?.file?.url) {
          contentItem.url = block.image.file.url;
        }
        break;
    }

    if (Object.keys(contentItem).length > 1) {
      resources.push(contentItem);
    }
  }

  return NextResponse.json({ resources });
}

  