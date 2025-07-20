import dynamic from "next/dynamic";
import React from "react";

const RemotePage = dynamic(() => import("remoteApp/page"), {
  ssr: false,
  loading: () => <p>Carregando remoto...</p>,
});

export default function Home() {
  console.log("Home component loaded", RemotePage);
  return (
    <>
      <RemotePage />
      <h1 style={{ textAlign: "center", marginTop: "50px", color: "#FFFF" }}>
        Welcome to StreamShare LiveNow!
      </h1>
    </>
  );
}
