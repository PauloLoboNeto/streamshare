import Sidebar from "./sidebar/sidebar";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div id="home">
      <Sidebar />
      {children}
    </div>
  );
}
