"use client";

import { useParams } from "next/navigation";
import { usePathname } from "next/navigation";

export default function TestePageC() {
  const params = useParams();
  const slug = params.slug;
  const pathname = usePathname();

  return (
    <div className="teste-page">
      <h1 className="titulo">Teste Page C</h1>
      <p>Esta é uma página de teste.</p>
      <p>Slug: {slug}</p>
      <p>Pathname: {pathname}</p>
    </div>
  );
}
