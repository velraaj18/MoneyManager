import DashboardLayout from "./layout/DashboardLayout"
import Dashboard from "./pages/Dashboard"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Transactions from "./pages/Transactions"
import { Accounts } from "./pages/Accounts"
import Categories from "./pages/Categories"
import Login from "./pages/Login"
import Register from "./pages/Register"

const App = () => {
  return(
    <>
     {/* BrowserRouter → enables routing
         Routes → defines routes
         Route → maps URL to component */}

      <BrowserRouter>
        <Routes>
          <Route element={<Login/>} path="/login"/>
          <Route element={<Register/>} path="/register"/>
          <Route element={<DashboardLayout/>}>
            <Route element={<Dashboard/>} path="/"/>
            <Route element={<Transactions/>} path="/transactions"/>
            <Route element= {<Accounts/>} path="/Accounts"/>
            <Route element= {<Categories/>} path="/Category"/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App