import DashboardLayout from "./layout/DashboardLayout"
import Dashboard from "./pages/Dashboard"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Transactions from "./pages/Transactions"

const App = () => {
  return(
    <>
     {/* BrowserRouter → enables routing
         Routes → defines routes
         Route → maps URL to component */}

      <BrowserRouter>
        <Routes>
          <Route element={<DashboardLayout/>}>
            <Route element={<Dashboard/>} path="/"/>
            <Route element={<Transactions/>} path="/transactions"/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App