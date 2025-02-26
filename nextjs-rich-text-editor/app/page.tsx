"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import RichTextEditor from "./components/RichTextEditor";

export default function Home() {
  const [ToolBar, setToolBar] = useState(false);

  const handleClickForToolbar = () => {
    setToolBar(!ToolBar);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto p-4 flex flex-col items-center">
        {/* Floating Action Button */}
        <button
          className="fixed bottom-8 right-8 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all transform hover:scale-110"
          onClick={handleClickForToolbar}
        >
          <Plus className="w-6 h-6" />
        </button>

        {/* RichTextEditor */}
        {ToolBar && (
          <div className="w-full max-w-3xl mt-8 animate-fade-in">
            <RichTextEditor />
          </div>
        )}
      </div>
    </div>
  );
}
