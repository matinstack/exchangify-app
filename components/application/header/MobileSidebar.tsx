"use client";

import { useEffect, useState } from "react";
import { StretchHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import Sidebar from "@/components/application/sidebar/Sidebar";

const MobileSidebar = () => {
  const [open, setOpen] = useState(false);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close with Escape
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className="md:hidden"
        onClick={() => setOpen(true)}
      >
        <StretchHorizontal />
      </Button>

      <div
        onClick={() => setOpen(false)}
        className={`
          fixed inset-0 z-40 bg-black/40
          transition-opacity duration-300
          ${
            open
              ? "opacity-100 visible"
              : "opacity-0 invisible pointer-events-none"
          }
        `}
      />

      <aside
        className={`
          fixed left-0 top-0 z-50 h-screen w-72
          overflow-y-auto border-r bg-background shadow-xl
          transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <Sidebar onNavigate={() => setOpen(false)} />
      </aside>
    </>
  );
};

export default MobileSidebar;
