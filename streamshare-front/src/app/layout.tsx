export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{backgroundColor: '#0e0b1d'}}>
      <body>
        {children}
      </body>
    </html>
  );
}
