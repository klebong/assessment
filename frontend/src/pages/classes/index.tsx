import { Card, Typography, Table, Spin, Alert, Button, Empty } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useNavigate } from "react-router-dom";
import { useClasses } from "../../hooks/useClasses";
import { Class } from "../../types";
import { PlusOutlined } from "@ant-design/icons";

const { Title } = Typography;

const ClassesPage = () => {
  const navigate = useNavigate();
  const { classes, loading, error } = useClasses();

  const columns: ColumnsType<Class> = [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Class Level",
      dataIndex: "level",
      key: "level",
    },
    {
      title: "Class Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Form Teacher",
      dataIndex: ["formTeacher", "name"],
      key: "formTeacher",
    },
  ];

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "40px" }}>
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return <Alert message="Error" description={error} type="error" showIcon />;
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <Title level={4} style={{ margin: 0 }}>
          Classes
        </Title>
        {classes?.length > 0 && (
          <Button type="primary" icon={<PlusOutlined />} onClick={() => navigate('/classes/add')}>
            Add Class
          </Button>
        )}
      </div>
      <Card style={{ minHeight: '400px' }}>
        {classes?.length > 0 ? (
          <Table
            columns={columns}
            dataSource={classes}
            rowKey={(record) => `${record.level}-${record.name}`}
            pagination={false}
          />
        ) : (
          <Empty
            description="There are no existing classes yet."
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          >
            <Button type="primary" icon={<PlusOutlined />} onClick={() => navigate('/classes/add')}>
              Add Class
            </Button>
          </Empty>
        )}
      </Card>
    </div>
  );
};

export default ClassesPage;
