import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [filteredJobsOld,setFilteredJobsOld]=useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading,setLoading]=useState(true);

  const fetchJobs = async () => {
    try {
    setLoading(true);
      const response = await axios.get("http://127.0.0.1:5000/jobs/get_all_jobs");

    const sortedJobslatest = [...response.data].sort((a, b) => {
  return new Date(b.posting_date) - new Date(a.posting_date); // latest first
});

const sortedJobsOldest = [...response.data].sort((a, b) => {
  return new Date(a.posting_date) - new Date(b.posting_date); // oldest first
});

setJobs(sortedJobslatest);              // for internal filtering/search
setFilteredJobs(sortedJobslatest);      // for displaying latest by default
setFilteredJobsOld(sortedJobsOldest);   // for dropdown "oldest"

    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
    finally{
        setLoading(false);
    }
  };


  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    const term = searchTerm.toLowerCase();
    const filtered = jobs.filter(job =>
      job.title.toLowerCase().includes(term) ||
      job.company.toLowerCase().includes(term) ||
      job.location.toLowerCase().includes(term) ||
      job.tags.toLowerCase().includes(term)
    );
    setFilteredJobs(filtered);
  }, [searchTerm, jobs]);

  return (
    <JobContext.Provider value={{ jobs, filteredJobs, setSearchTerm, fetchJobs,loading,filteredJobsOld }}>
      {children}
    </JobContext.Provider>
  );
};
