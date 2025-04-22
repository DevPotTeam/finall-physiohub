"use client"
import "./globals.css";
// import Header from  "../components/header&footer/Header.jsx"
// import Footer from  "../components/header&footer/Footer.jsx"
const api_url = process.env.NEXT_PUBLIC_API_BASE_URL;


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        
      </body>
    </html>
  );
}
