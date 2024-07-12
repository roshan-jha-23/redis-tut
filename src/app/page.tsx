"use client";

import axios from "axios";
import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [text, setText] = useState("");
  const [tags, setTags] = useState({
    TypeScript: false,
    Java: false,
    JavaScript: false,
  });

  const comment = async () => {
    const selectedTags = Object.keys(tags).filter((tag) => tags[tag]);
    const data = await axios.post("/api/comment", {
      text,
      tags: selectedTags,
    });
    console.log(data);
  };

  const handleCheckboxChange = (e) => {
    setTags({
      ...tags,
      [e.target.name]: e.target.checked,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-950">
      <div className="bg-zinc-950 p-8 rounded-lg shadow-md space-y-6">
        <Link
          href="/comments"
          className="text-blue-500 hover:text-blue-700 text-lg font-semibold"
          prefetch={false}
        >
          See Comment
        </Link>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Enter your comment"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full p-2 border text-black border-gray-300 rounded-md"
          />
          <div className="space-y-2">
            {["TypeScript", "Java", "JavaScript"].map((tag) => (
              <div key={tag} className="flex items-center">
                <input
                  type="checkbox"
                  name={tag}
                  checked={tags[tag]}
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                <label>{tag}</label>
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={comment}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-all duration-200"
        >
          Make Comment
        </button>
      </div>
    </div>
  );
}
