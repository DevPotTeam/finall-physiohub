"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

const ProtectedRoute = ({ user, children }) => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const isTeacherRoute = pathname.includes("teacher");

    if (isTeacherRoute && user?.role !== "teacher") {
      router.replace("/");
    }
  }, [pathname, user, router]);

  return children;
};

export default ProtectedRoute;
