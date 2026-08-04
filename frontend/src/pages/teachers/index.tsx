import { Card, Typography, Table, Button, Spin, Alert } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { PlusOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useTeachers } from '../../hooks/useTeachers'
import { Teacher } from '../../types'

const { Title } = Typography

const TeachersPage = () => {
  const navigate = useNavigate()
  const { teachers, loading, error } = useTeachers()

  const columns: ColumnsType<Teacher> = [
    {
      title: '#',
      key: 'index',
      render: (_, __, index) => index + 1,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Subject',
      dataIndex: 'subject',
      key: 'subject',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Work Contact',
      dataIndex: 'contactNumber',
      key: 'contactNumber',
    },
  ]

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <Spin size="large" />
      </div>
    )
  }

  if (error) {
    return <Alert message="Error" description={error} type="error" showIcon />
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <Title level={4} style={{ margin: 0 }}>
          Teachers
        </Title>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => navigate('/teachers/add')}>
          Add Teacher
        </Button>
      </div>
      <Card>
        <Table
          columns={columns}
          dataSource={teachers}
          rowKey={(record) => record.id}
          pagination={false}
        />
      </Card>
    </div>
  )
}

export default TeachersPage
