import { useLocation } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import { HomeOutlined, UserOutlined, TeamOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

const { Header } = Layout

const Navigation = () => {
  const location = useLocation()
  
  const menuItems = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: <Link to="/">Classes</Link>,
    },
    {
      key: '/teachers',
      icon: <UserOutlined />,
      label: <Link to="/teachers">Teachers</Link>,
    },
  ]

  return (
    <Header style={{ 
      display: 'flex', 
      alignItems: 'center', 
      background: '#fff',
      padding: '0 24px',
      borderBottom: '1px solid #f0f0f0'
    }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        marginRight: '40px',
        fontSize: '18px',
        fontWeight: 'bold',
        color: '#1890ff'
      }}>
        <TeamOutlined style={{ fontSize: '24px', marginRight: '8px' }} />
        School Portal
      </div>
      <Menu
        theme="light"
        mode="horizontal"
        selectedKeys={[location.pathname]}
        items={menuItems}
        style={{ flex: 1, minWidth: 0, border: 'none' }}
      />
    </Header>
  )
}

export default Navigation
