import { Card, Typography, Form, Select, Input, Button, Space, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import { teachersApi } from '../../api/teachers'

const { Title } = Typography
const { Option } = Select

const AddTeacherPage = () => {
  const navigate = useNavigate()
  const [form] = Form.useForm()

  const onFinish = async (values: any) => {
    try {
      await teachersApi.createTeacher(values.name, values.subject, values.email, values.contactNumber)
      message.success('Teacher added successfully')
      navigate('/teachers')
    } catch (err) {
      message.error('Failed to add teacher')
    }
  }

  return (
    <div>
      <Title level={4} style={{ marginBottom: '16px' }}>
        Add Teacher
      </Title>
      <Card>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          style={{ maxWidth: '600px' }}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please enter name' }]}
          >
            <Input placeholder="Name" />
          </Form.Item>

          <Form.Item
            label="Subject"
            name="subject"
            rules={[{ required: true, message: 'Please select a subject' }]}
          >
            <Select placeholder="Select a subject">
              <Option value="Mathematics">Mathematics</Option>
              <Option value="English">English</Option>
              <Option value="Science">Science</Option>
              <Option value="Mother Tongue Language">Mother Tongue Language</Option>
              <Option value="Social Studies">Social Studies</Option>
              <Option value="Art">Art</Option>
              <Option value="Music">Music</Option>
              <Option value="Physical Education">Physical Education</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Email Address"
            name="email"
            rules={[
              { required: true, message: 'Please enter email address' },
              { type: 'email', message: 'Please enter a valid email' },
            ]}
          >
            <Input placeholder="Email address" />
          </Form.Item>

          <Form.Item
            label="Work Contact Number"
            name="contactNumber"
            rules={[
              { required: true, message: 'Please enter contact number' },
              { pattern: /^[0-9]+$/, message: 'Contact number must be numeric' },
            ]}
          >
            <Input placeholder="Work contact number" onInput={(e) => {
              e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, '')
            }} />
          </Form.Item>

          <Form.Item style={{ marginBottom: 0, marginTop: '24px' }}>
            <Space style={{ float: 'right' }}>
              <Button onClick={() => navigate('/teachers')}>
                Back
              </Button>
              <Button type="primary" htmlType="submit">
                Add Teacher
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default AddTeacherPage
