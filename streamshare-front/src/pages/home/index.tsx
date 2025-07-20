"use client";

import HomeLayout from "./layout";
import LiveNow from "./livenow/livenow";

export default function HomePage() {
  return (
    <HomeLayout>
      <LiveNow></LiveNow>
    </HomeLayout>
  );
}
