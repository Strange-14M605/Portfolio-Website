"use client";

import { use } from 'react';

// components
import Blog from '@/app/components/blog';

export default function BlogPost({ params }) {
  const { id } = use(params); 

  return (
    <div>
      <h1>Blog Post ID: {id}</h1>

      <Blog id={id} />
    </div>
  );
}