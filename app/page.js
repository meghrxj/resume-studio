"use client";

import dynamic from "next/dynamic";

const Builder = dynamic(() => import("@/components/Builder"), {
  ssr: false,
  loading: () => (
    <div className="flex min-h-screen items-center justify-center text-sm text-muted">
      Loading your studio...
    </div>
  ),
});

export default function Home() {
  return <Builder />;
}
