import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Home from './Pages/Home.jsx'
import AddJob from './Components/AddJob.jsx'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Home />
    {/* <AddJob /> */}
    </>
  )
}

export default App
