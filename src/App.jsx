import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Clients from './pages/Clients'
import Budgets from './pages/Budgets'
import Materials from './pages/Materials'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/budgets" element={<Budgets />} />
        <Route path="/materials" element={<Materials />} />
      </Routes>
    </Layout>
  )
}

export default App
