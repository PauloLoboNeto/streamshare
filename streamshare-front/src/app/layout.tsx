import "./../components/styles/global-styles.scss"; // Import global styles
import { ReactQueryProvider } from "./providers/reactquery";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <ReactQueryProvider>
          {children}
        </ReactQueryProvider>
      </body>
    </html>
  );
}