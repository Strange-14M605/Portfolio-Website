"use client";

//components
import ListBlogs from "./components/listBlogs";
import Blog from "./components/blog";

export default function Home() {
  return (
    <>

    {/* introduction- video; text placeholder */}
    <h5>Welcome to my digital garden. I share the things I like and the way I grow.</h5>
    
    {/* blogs */}
    <ListBlogs />
    <Blog />

    {/* gallery - future scope*/}

    </>
  );
}
