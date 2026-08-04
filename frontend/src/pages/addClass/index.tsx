import { Card, Typography, Form, Select, Input, Button, Space, Spin, Alert, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useTeachers } from '../../hooks/useTeachers'
import { classesApi } from '../../api/classes'

const { Title, Link } = Typography
const { Option } = Select

const AddClassPage = () => {
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const { teachers, loading, error } = useTeachers()

  const onFinish = async (values: any) => {
    console.log('teachers', teachers)
    console.log('values', values)
    try {
      const teacher = teachers.find((t) => t.id == values.formTeacher)
      console.log('teacher', teacher)
      await classesApi.createClass(values.level, values.name, teacher!.email)
      message.success('Class created successfully')
      navigate('/')
    } catch (err) {
      message.error('Failed to create class')
    }
  }

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
      <Title level={4} style={{ marginBottom: '16px' }}>
        Add Class
      </Title>
      <Card>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          style={{ maxWidth: '600px' }}
        >
          <Form.Item
            label="Class Level"
            name="level"
            rules={[{ required: true, message: 'Please select a class level' }]}
          >
            <Select placeholder="Select a level">
              <Option value="Primary 1">Primary 1</Option>
              <Option value="Primary 2">Primary 2</Option>
              <Option value="Primary 3">Primary 3</Option>
              <Option value="Primary 4">Primary 4</Option>
              <Option value="Primary 5">Primary 5</Option>
              <Option value="Primary 6">Primary 6</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Class Name"
            name="name"
            rules={[{ required: true, message: 'Please enter class name' }]}
          >
            <Input placeholder="Class Name" />
          </Form.Item>

          <Form.Item
            label="Form Teacher"
            name="formTeacher"
            rules={[{ required: true, message: 'Please assign a form teacher' }]}
          >
            <Select
              placeholder="Assign a form teacher"
              dropdownRender={(menu) =>
                teachers.length === 0 ? (
                  <div style={{ padding: '8px 12px' }}>
                    <span style={{ marginRight: '8px' }}>No existing teachers.</span>
                    <Link onClick={() => navigate('/teachers/add')}>Add a teacher</Link>
                  </div>
                ) : (
                  menu
                )
              }
            >
              {teachers.map((teacher) => (
                <Option key={teacher.id} value={teacher.id}>
                  {teacher.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item style={{ marginBottom: 0, marginTop: '24px' }}>
            <Space style={{ float: 'right' }}>
              <Button onClick={() => navigate('/')}>
                Back
              </Button>
              <Button type="primary" htmlType="submit">
                Add Class
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default AddClassPage
