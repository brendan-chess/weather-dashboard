import Footer from "./Footer";
import Header from "./Header";
import CitiesProvider from "./citiesProvider";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Weather Dashboard",
  description: "Current Weather and Forecasts for US Cities",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-radial from-gray-950 to-gray-900 text-slate-200">
          <Header />
          <CitiesProvider>{children}</CitiesProvider>
          <Footer />
        </div>
      </body>
    </html>
  );
}
