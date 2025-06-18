import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { JobContext } from "../context/JobContext";

import TextField from "@mui/material/TextField"; // ✅ for input fields
import Button from "@mui/material/Button"; // ✅ for buttons
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

export default function AddJob({ closeBox, updateJob, title }) {
  const [pageTitle, setPageTitle] = useState("Add Job");
  const { fetchJobs } = useContext(JobContext);
  const [loading, setLoading] = useState(true);
  const [isSubmitted,setIsSubmitted]=useState(false);
  
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0]; // e.g., "2025-06-18"
  };
  
  useEffect(() => {
    setLoading(true);
    if (title) {
      setPageTitle(title);
    }
    if (updateJob) {
      setFormData(updateJob);
    }
    setLoading(false);
  }, [title, updateJob]);

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    posting_date: getTodayDate(),
    job_type: "",
    tags: "",
  });

  //function to add form data
  const handleChange = (event) => {};
  const handleData = async (e) => {
    e.preventDefault();

    const { title, company, posting_date, location, job_type, tags } = formData;

    if (
      !title ||
      !company ||
      !posting_date ||
      !location ||
      !job_type ||
      !tags
    ) {
      toast.error("Please enter all fields");
      return;
    }

    if(updateJob)
    {
      
     try{
    const response=await axios.put('http://127.0.0.1:5000/jobs/update_job',formData)
        console.log("the response for update job is",response);
        if(response.status===200)
        {
            toast.success("Data Updated Successfully");
            setTimeout(() => {
            closeBox();
            fetchJobs();
            toast.dismiss();
            }, 2000);
        }
        }
       catch(error)
       {
        console.log("the error is",error);
       }
       finally{
        setIsSubmitted(true)
       }
    }

    else
    {
      setIsSubmitted(false);
      try{
      const response = await axios.post(
        "http://127.0.0.1:5000/jobs/add_job",
        formData
      );
      toast.success("data added successfully");

      setTimeout(() => {
        closeBox();
        fetchJobs();
      }, 2000);
    } catch (error) {
      console.log("the error is", error.response.data.message);
      toast.error(error.response.data.message);
      //   console.log("the response error ",error.response.data.message)
    }
    finally{
      setIsSubmitted(true);
    }
    }
    
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center ">
      <Toaster></Toaster>
      <div className="h-[70%] w-[100%] border-1 bg-white grid grid-cols-1 lg:w-[40%]">
        <form onSubmit={handleData}>
          <div className="grid grid-cols-1 p-10 gap-5">
            <div className="flex justify-center">
              <label className="text-lg text-5xl">{pageTitle}</label>
            </div>
            <TextField
              className="border-radius:20px "
              placeholder="Enter Job Title"
              size="small"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
            <TextField
              className="border-radius:20px "
              placeholder="Enter Company Name"
              size="small"
              value={formData.company}
              onChange={(e) =>
                setFormData({ ...formData, company: e.target.value })
              }
            />
            <TextField
              type="date"
              size="small"
              value={formData.posting_date}
              onChange={(e) =>
                setFormData({ ...formData, posting_date: e.target.value })
              }
            />
            <TextField
              className="border-radius:20px "
              placeholder="Enter Job Type"
              size="small"
              value={formData.job_type}
              onChange={(e) =>
                setFormData({ ...formData, job_type: e.target.value })
              }
            />
            <TextField
              className="border-radius:20px "
              placeholder="Enter Location"
              size="small"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
            />
            <TextField
              className="border-radius:20px "
              placeholder="Enter Job Tags"
              size="small"
              value={formData.tags}
              onChange={(e) =>
                setFormData({ ...formData, tags: e.target.value })
              }
            />

            <div className="flex justify-center">
              <Button
                type="submit"
                className="w-[20%] !bg-blue-600 !text-white"
                disabled={isSubmitted}
              >
                Submit
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
