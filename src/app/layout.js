
import "./globals.css";
import ProtectedRoutes from "@/components/protectedRoute/ProtectedRoute"
import Cookies from "js-cookie"

export const metadata = {
  title: "PhysioHub",
  description: "Your app description",
  icons: {
    icon: "/favicon.png", // path inside public/
  },
};

export default function RootLayout({ children }) {
  const user = Cookies.get("role")
  return (
    <html lang="en">
      <body>
        {/* <ProtectedRoutes user={user}> */}
        {children}
        {/* </ProtectedRoutes> */}
        
      </body>
    </html>
  );
}
