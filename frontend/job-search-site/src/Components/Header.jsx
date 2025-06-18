"use client";

import { Plus } from "lucide-react";
import Button from "@mui/material/Button";
import AddJob from "./AddJob.jsx";
import React, { useState } from "react";

export default function Header() {
  const [showAddJob, setShowAddJob] = useState(false);

  function setAddJob() {
    setShowAddJob(true);
  }

  function closeBox(){
    setShowAddJob(false);
  }

  return (
    <header className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 shadow-lg md:pl-20 lg:pr-20">
      
      {showAddJob && (
        <div className="fixed inset-0 bg-gray bg-opacity-50  z-50">
          <div className="bg-transparent">
            <AddJob closeBox={closeBox} />
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">JobBoard</h1>
            <p className="text-blue-100 text-sm">Find your dream job today</p>
          </div>
          <Button
            className="flex items-center gap-2 bg-white !text-white hover:bg-blue-50 font-semibold px-6 py-2 shadow-md transition-all duration-200 hover:shadow-lg"
            onClick={() => setAddJob(true)}
          >
            <Plus className="h-4 w-4 text-white" />
            Add Job
          </Button>
        </div>
      </div>
    </header>
  );
}
