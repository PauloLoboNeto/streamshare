"use client";
import LiveNow from "./livenow/livenow";
import Sidebar from "./sidebar/sidebar";
import "./styles-home.scss";

export default function HomePage() {
  return (
    <div id="home">
     <Sidebar></Sidebar>
     <LiveNow></LiveNow>
    </div>
  );
}
