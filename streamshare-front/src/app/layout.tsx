import "./../components/styles/global-styles.scss"; // Import global styles
import { ReactQueryProvider } from "./providers/reactquery";
import { UserProvider } from "./providers/user-data-provider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <UserProvider>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </UserProvider>
      </body>
    </html>
  );
}
