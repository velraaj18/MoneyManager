import DashboardLayout from "./layout/DashboardLayout"
import Dashboard from "./pages/Dashboard"

const App = () => {
  return(
    <>
      <DashboardLayout>
        <Dashboard/>
      </DashboardLayout>
    </>
  )
}

export default App