import { NextResponse } from "next/server";
const notionToken = process.env.NOTION_TOKEN;
const databaseId = process.env.NOTION_DATABASE_ID;

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

  const blogPosts = data.results
    .map((page) => {
      if (!page.properties.Published.checkbox) return null;

      const title = page.properties.Page.title[0]?.plain_text || "Untitled";
      const tags = page.properties.Tags.multi_select.map(tag => tag.name);
      const createdDate = new Date(page.properties["Created Date"].date.start);
      const date = `${createdDate.getDate().toString().padStart(2, "0")}/${(lastEdited.getMonth() + 1).toString().padStart(2, "0")}/${lastEdited.getFullYear()}`;
      const status = page.properties.Status.status.name;

      return {
        title,
        tags,
        date,
        status,
        pageId: page.id,
      };
    })
    .filter(post => post !== null); // ✅ This removes nulls

  return new Response(JSON.stringify(blogPosts), {
    headers: { "Content-Type": "application/json" },
  });
}

  
  // ****************************************************************************************************
  
  async function getBlocks(pageId){
    const response = await fetch(`https://api.notion.com/v1/blocks/${pageId}/children?page_size=1000`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${notionToken}`,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json"
      }
    });
    const data =  await response.json();
    const resources = [];
    for (const block of data.results) {
      const type = block.type;
      const contentItem = { type };
      const has_children = block.has_children;
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
            let content = "";
            let link = null;
            let iconUrl = null;
        
            richText.forEach(rt => {
              if (rt.type === "mention" && rt.mention?.type === "link_mention") {
                const mention = rt.mention.link_mention;
                content += mention.title || mention.href;
                link = mention.href;
                iconUrl = mention.icon_url;
              } else {
                content += rt.plain_text;
                if (rt.text?.link?.url) {
                  link = rt.text.link.url;
                }
              }
            });
        
            contentItem.content = content;
            if (link) contentItem.link = link;
            if (iconUrl) contentItem.icon = iconUrl;
          }
          break;          
  
        case "image":
          if (block.image?.file?.url) {
            contentItem.url = block.image.file.url;
          }
          if (block.image?.external?.url) {
            contentItem.url = block.image.external.url;
          }
          break;
      }
  
      if (Object.keys(contentItem).length > 1) {
  if (has_children) {
    const childBlocks = await getBlocks(block.id);
    contentItem.children = childBlocks; // <— NEST instead of pushing flat
  }
  resources.push(contentItem);
}

    }
    return resources;
  }
  
  export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const pageId = searchParams.get("id"); 
    const resources = await getBlocks(pageId);
    console.log(resources);
    return NextResponse.json({ resources });
  }
  

  