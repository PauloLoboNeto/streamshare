// "use client";

import dynamic from "next/dynamic";
import React from "react";

const RemotePage = dynamic(() => import("remoteApp/page"), {
  ssr: false,
  loading: () => <p>Carregando remoto...</p>,
});

export default function HomePage() {
  return (
    <>
      <RemotePage />
    </>
    // <HomeLayout>
    //   <LiveNow></LiveNow>
    // </HomeLayout>
  );
}
