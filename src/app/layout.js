import "./globals.css";
import ProtectedRoutes from "@/components/protectedRoute/ProtectedRoute"
import Cookies from "js-cookie"
import '../../public/styles/flashcard.css';

export const metadata = {
  title: "PhysioHub",
  description: "Your app description",
  icons: {
    icon: "/favicon.png", // path inside public/
  },
};

export default function RootLayout({ children }) {

  
  return (
    <html lang="en">
      <body>
        <ProtectedRoutes>
          {children}
        </ProtectedRoutes>
      </body>
    </html>
  );
}
