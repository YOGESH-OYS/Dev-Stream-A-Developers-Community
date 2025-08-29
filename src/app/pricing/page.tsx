// src/app/features/page.tsx
"use client"

import { useState } from "react";

export default function FeaturesPage() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white">
      <h1 className="text-3xl font-bold">Features Page (CSR)</h1>
      <p className="mt-4">Count: {count}</p>
      <button
        onClick={() => setCount(count + 1)}
        className="mt-2 px-4 py-2 bg-blue-500 rounded"
      >
        Increment
      </button>
    </div>
  );
}
