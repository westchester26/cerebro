import "./globals.css";
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en" className="dark"><body className="h-screen flex overflow-hidden bg-[#191A1A] text-[#E3E5E5]">{children}</body></html>;
}
