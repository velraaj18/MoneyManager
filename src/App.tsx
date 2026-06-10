import DashboardLayout from "./layout/DashboardLayout"
import Dashboard from "./pages/Dashboard"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Transactions from "./pages/Transactions"
import { Accounts } from "./pages/Accounts"
import Categories from "./pages/Categories"
import Login from "./pages/Login"
import Register from "./pages/Register"
import { ProtectedRoute } from "./auth/ProtectedRoute"
import Budgets from './pages/Budgets';
import Profile from "./pages/Profile"

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
          <Route element={<ProtectedRoute />}>
            <Route element={<DashboardLayout/>}>
              <Route element={<Dashboard/>} path="/"/>
              <Route element={<Transactions/>} path="/transactions"/>
              <Route element= {<Accounts/>} path="/accounts"/>
              <Route element= {<Categories/>} path="/categories"/>
              <Route element={<Budgets/>} path="/budgets"/>
              <Route element={<Profile/>} path="/profile"/>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
