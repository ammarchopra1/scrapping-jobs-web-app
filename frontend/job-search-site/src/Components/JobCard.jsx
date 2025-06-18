import { useEffect, useState } from "react";
import { MapPin, Calendar, Building, Trash2, Pencil } from "lucide-react";

export default function JobCard({ jobdata, onDelete, onUpdate }) {
  return (
    <div className="max-w-md bg-white rounded-2xl overflow-hidden shadow-lg border border-blue-100 hover:shadow-xl transition duration-300">
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 px-6 py-4">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-1">
              {jobdata.title}
            </h2>
            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <Building className="w-4 h-4 text-blue-500" />
              <span>{jobdata.company}</span>
            </div>
          </div>
          <span className="px-3 py-1 text-sm font-semibold rounded-full bg-gradient-to-r from-green-100 to-blue-100 text-green-700 border border-green-200">
            {jobdata.job_type}
          </span>
        </div>
      </div>

      <div className="px-6 py-5 space-y-3">
        <div className="flex items-center gap-2 text-gray-600 text-sm">
          <MapPin className="w-4 h-4 text-purple-500" />
          <span>{jobdata.location}</span>
        </div>

        <div className="flex items-center gap-2 text-gray-600 text-sm">
          <Calendar className="w-4 h-4 text-orange-500" />
          <span>Posted on {jobdata.posting_date}</span>
        </div>

        <div className="flex flex-wrap gap-2 pt-2">
          {jobdata.tags.split("\n").map((tag, index) => (
            <span
              key={index}
              className="text-xs bg-blue-50 text-blue-700 border border-blue-200 px-2 py-1 rounded-full font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Buttons */}
        <div className="pt-4 flex justify-end gap-3">
          <button
            onClick={() => onUpdate()}
            className="flex items-center gap-1 px-3 py-1 text-sm text-white bg-purple-500 hover:bg-purple-600 rounded-md shadow-sm transition"
          >
            <Pencil className="w-4 h-4" />
            Update
          </button>
          <button
            onClick={() => onDelete()}
            className="flex items-center gap-1 px-3 py-1 text-sm text-white bg-red-500 hover:bg-red-600 rounded-md shadow-sm transition"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
