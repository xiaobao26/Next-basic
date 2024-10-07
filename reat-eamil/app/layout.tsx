import type { Metadata } from "next";
import localFont from "next/font/local";
// import { Roboto } from "next/font/google";
import "./globals.css"; 

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
const poppins = localFont({
  src:"./fonts/Poppins-Bold.woff",
  variable: "--font-poppins-bold",
})
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

// const roboto = Roboto({
//   subsets: ['latin'],
//   weight: ['400', '500']
// })



export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable}`}
      >
        
        {children}
      </body>
    </html>
  );
}
