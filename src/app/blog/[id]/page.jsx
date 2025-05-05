"use client";

import { use } from 'react';
import { useSearchParams } from "next/navigation";

// components
import Blog from '@/app/blog/[id]/blog';

export default function BlogPost({ params }) {
  const { id } = use(params); 

  const searchParams = useSearchParams();
  const title = searchParams.get("title");
  const date = searchParams.get("date");

  return (
    <div>
        <Blog id={id} title={title} date={date} />
    </div>
  );
}