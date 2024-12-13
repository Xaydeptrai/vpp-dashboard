"use client";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      router.push("/login");
    }
  }, [router]);

  return (
    <>
      <Navbar />
      <div className="grid grid-cols-[250px_1fr] h-screen w-full">
        <div className="bg-gray-100  h-full">
          <Sidebar />
        </div>
        <div className="flex-1 p-5 overflow-y-auto">{children}</div>
      </div>
    </>
  );
};

export default MainLayout;
