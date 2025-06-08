export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{backgroundColor: '#000'}}>
      <body>
        {children}
      </body>
    </html>
  );
}
