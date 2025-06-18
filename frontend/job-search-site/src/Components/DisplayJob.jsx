import { useEffect, useState, useContext } from "react";
import axios from "axios";
import JobCard from "./JobCard";
import { JobContext } from "../context/JobContext";
import AddJob from "./AddJob";
import { Toaster, toast } from "react-hot-toast";

export default function DisplayJob() {
  const [currentPage, setCurrentPage] = useState(1);
  const [updateJob, setUpdateJob] = useState(null);
  const [form, setForm] = useState(null);
  const [sortOption, setSortOption] = useState("latest"); // NEW
  const jobsPerPage = 15;
  const [title, setTitle] = useState("Update Job");

  const { filteredJobs, filteredJobsOld, loading, fetchJobs } = useContext(JobContext);

  const jobsToDisplay = sortOption === "latest" ? filteredJobs : filteredJobsOld;

useEffect(() => {
  if (filteredJobs.length > 0 && filteredJobs[0].posting_date) {
    console.log("Latest jobs - posting date:", filteredJobs[0].posting_date);
  } else {
    console.log("filteredJobs is empty or missing posting_date");
  }

  if (filteredJobsOld.length > 0 && filteredJobsOld[0].posting_date) {
    console.log("Oldest jobs - posting date:", filteredJobsOld[0].posting_date);
  } else {
    console.log("filteredJobsOld is empty or missing posting_date");
  }
}, [filteredJobs, filteredJobsOld]);



  
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobsToDisplay.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(jobsToDisplay.length / jobsPerPage);

  async function delete_Job(deleteJob) {
    try {
      const response = await axios.delete("http://127.0.0.1:5000/jobs/delete-job", {
        data: { id: deleteJob.id },
        headers: {
          "Content-Type": "application/json",
        },
      });

      toast.success("Job deleted successfully");
      fetchJobs();
    } catch (error) {
      toast.error(error.message);
    }
  }

  function closeBox() {
    setForm(false);
  }

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
        <p className="mt-4 text-blue-700 text-lg font-medium">Loading Jobs...</p>
      </div>
    );
  }

  return (
    <>
      <Toaster />
      {/* Update form modal */}
      {form && (
        <div className="fixed inset-0 bg-gray bg-opacity-50 z-50">
          <div className="bg-transparent">
            <AddJob closeBox={closeBox} updateJob={updateJob} title={title} />
          </div>
        </div>
      )}

      {/* Sort Dropdown */}
      <div className="flex justify-end px-10 mt-4">
        <select
          className="p-2 border border-gray-300 rounded"
          value={sortOption}
          onChange={async (e) => {
            setSortOption(e.target.value);
            setCurrentPage(1); // Reset to page 1 on change

            await fetchJobs();
          }}
        >
          <option value="latest">Latest Jobs</option>
          <option value="oldest">Oldest Jobs</option>
        </select>
      </div>

      {/* Jobs Grid */}
      <div className="p-10 grid grid-cols-1 md:grid-cols-3 gap-4">
        {currentJobs.map((job, index) => (
          <JobCard
            key={index}
            jobdata={job}
            onUpdate={() => {
              setUpdateJob(job);
              setForm(true);
            }}
            onDelete={() => delete_Job(job)}
          />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 gap-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Previous
        </button>

        <span className="text-lg font-medium">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </>
  );
}
