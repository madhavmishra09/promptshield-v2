import { Quicksand } from "next/font/google";
import "./globals.css";

const quicksandFont = Quicksand({
  weight:'400',
  variable: "--font-quicksand",
  subsets: ["latin"],
});


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={quicksandFont.variable}>
      <body>{children}</body>
    </html>
  );
}
