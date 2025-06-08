import React from "react";
import { Navbar } from "../Uicomponents/Navbar";
import { Toaster } from "../components/ui/sonner";

export  function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-6">
        {children}
      </main>
      <footer className="border-t py-4">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} CompartMate. All rights reserved.
        </div>
      </footer>
      <Toaster position="top-right" />
    </div>
  );
}
