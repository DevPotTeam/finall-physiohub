"use client";
import { Button } from "@/components/ui/button.jsx";
import { Select, SelectItem } from "@/components/ui/select";
import { ArrowLeft, Search, Upload } from "lucide-react";

export default function PublishQuizHeader({ handleSubmit, loading }) {
  return (
    <div className=" hidden w-full mx-auto max-w-[80%] md:flex justify-between items-center p-4 rounded-lg">
      <div className="flex items-center gap-2">
        <ArrowLeft className="w-5 h-5 text-gray-700 cursor-pointer" />
        <h2 className="text-lg font-semibold">Create Quiz</h2>
      </div>
      <div className="flex items-center gap-4">
        <Button
          className=" border-2 border-purple-600 bg-transparent hover:bg-purple-700 text-purple-600 hover:text-white px-4 py-2 rounded-lg"
          onClick={(e) => handleSubmit(e, "draft")}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save as Draft"}
        </Button>
        <Button
          className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-lg"
          onClick={(e) => handleSubmit(e, "published")}
          disabled={loading}
        >
          {loading ? (
            "Publishing..."
          ) : (
            <>
              <Upload /> Publish
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
