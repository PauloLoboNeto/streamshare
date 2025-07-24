import React, { useEffect, useState } from "react";

export function ClientOnly({ children }: { children: React.ReactNode }) {
  const [hidratado, setHidratado] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHidratado(true);
    }
  }, []);

  if (!hidratado) return null;

  return <>{children}</>;
}
