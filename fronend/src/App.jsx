import { BrowserRouter, Route, Routes } from "react-router-dom"
import NN from "./components/pages/NN";





function App() {

  return (
    <BrowserRouter>
      {/*   <Sidebar /> */}
      <Routes>
        <Route path="/" element={<NN />} />


      </Routes>

    </BrowserRouter>
  )
}

export default App;
