import { Quicksand } from "next/font/google";
import Script from "next/script";
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
    <html lang="en" className={quicksandFont.variable} suppressHydrationWarning>
      <body>
        {children}
        <Script id="theme-initialization" strategy="beforeInteractive">
          {`(function(){var key='promptshield_theme';var media=window.matchMedia('(prefers-color-scheme: dark)');function applyTheme(){var preference=localStorage.getItem(key);if(preference!=='light'&&preference!=='dark'&&preference!=='system'){preference='system';}document.documentElement.dataset.theme=preference==='system'?(media.matches?'dark':'light'):preference;}applyTheme();media.addEventListener('change',function(){if(localStorage.getItem(key)==='system'||!localStorage.getItem(key)){applyTheme();}});})();`}
        </Script>
      </body>
    </html>
  );
}
