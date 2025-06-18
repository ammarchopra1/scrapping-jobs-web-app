import { Search } from "lucide-react"
import { useContext } from "react"
import { JobContext } from "../context/JobContext"

export default function SearchJob() {
    
    const {setSearchTerm}=useContext(JobContext);

    const handleSearch=(e)=>{

        setSearchTerm(e.target.value);
        console.log("the target value is",e.target.value);
    }

  return (
    <div className="w-screen p-7 flex justify-center bg-gray-50 ">
        <div className="border rounded-lg shadow-md p-4 bg-white h-40 w-[100%] flex flex-col items-center justify-center lg:w-[70%] md:w-[70%]">
        <h1 className="text-xl font-semibold text-gray-700 mb-4">Search Jobs</h1>

        <div className="relative w-[100%] md:w-[50%] lg:w-[50%]">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Enter Keywords or Location to Search Job"
            className="pl-10 h-14 w-full text-base border-2 border-blue-200 focus:border-purple-400 focus:ring-purple-200 rounded-xl shadow-sm text-[12px] md:pl-12 text-[15px] w-[100%]"
            onChange={handleSearch}
         />
        </div>
      </div>
    </div>
  )
}
