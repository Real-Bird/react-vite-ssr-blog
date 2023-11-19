import { Button, Flex, Form, Input, Typography } from "antd";
import { useNavigate } from "react-router-dom";
const { TextArea } = Input;

export default function Write() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const onSubmit = async () => {
    const { writer, content, mainTitle, subTitle } = form.getFieldsValue();
    const newData = {
      id: crypto.randomUUID(),
      writer,
      content,
      createdAt: new Date().toString(),
      mainTitle,
      subTitle,
    };
    await fetch("/api/blog", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    });
    navigate("/", { replace: true });
  };
  return (
    <Form
      form={form}
      onFinish={onSubmit}
      layout="horizontal"
      style={{
        maxWidth: "960px",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography.Title style={{ textAlign: "center" }}>
        새 글 작성
      </Typography.Title>
      <Form.Item name="mainTitle" label="제목">
        <Input />
      </Form.Item>
      <Flex justify="space-between" gap={"small"}>
        <Form.Item name="subTitle" label="부제목" style={{ flex: 1 }}>
          <Input />
        </Form.Item>
        <Form.Item
          name="writer"
          label="작성자"
          style={{ alignSelf: "flex-end" }}
        >
          <Input />
        </Form.Item>
      </Flex>
      <Form.Item name="content">
        <TextArea rows={24} style={{ resize: "none" }} />
      </Form.Item>
      <Form.Item wrapperCol={{ span: 4 }} style={{ alignSelf: "center" }}>
        <Button type="primary" htmlType="submit">
          작성 완료
        </Button>
      </Form.Item>
    </Form>
  );
}
