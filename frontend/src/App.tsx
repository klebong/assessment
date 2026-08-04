import { Layout } from 'antd'
import Navigation from './components/Navigation'
import ClassesPage from './pages/classes'
import TeachersPage from './pages/teachers'
import AddClassPage from './pages/addClass'
import AddTeacherPage from './pages/addTeacher'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

const { Content } = Layout

function App() {
  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Navigation />
        <Content style={{ padding: '24px', background: '#f5f5f5' }}>
          <Routes>
            <Route path="/" element={<ClassesPage />} />
            <Route path="/teachers" element={<TeachersPage />} />
            <Route path="/classes/add" element={<AddClassPage />} />
            <Route path="/teachers/add" element={<AddTeacherPage />} />
          </Routes>
        </Content>
      </Layout>
    </Router>
  )
}

export default App
