import { Navigate, useNavigate, useParams } from "react-router-dom";
import { blogList } from "./db/blog";
import { Button, Descriptions, Flex, Layout, Typography } from "antd";

export default function Post() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const post = blogList.find((item) => item.id === postId);

  if (!post) {
    return <Navigate to={"/"} replace />;
  }

  return (
    <Flex vertical gap={"large"} style={{ height: "100%" }}>
      <Typography.Title>{post.mainTitle}</Typography.Title>
      <Flex align="center" justify="space-between">
        <Typography.Title level={2}>{post.subTitle}</Typography.Title>
        <Button onClick={() => navigate(-1)}>목록</Button>
      </Flex>
      <Descriptions bordered>
        <Descriptions.Item label="Writer">{post.writer}</Descriptions.Item>
        <Descriptions.Item label="createdAt">
          {post.createdAt}
        </Descriptions.Item>
      </Descriptions>
      <Typography.Paragraph style={{ fontSize: "1.5rem", overflowY: "scroll" }}>
        {post.content}
      </Typography.Paragraph>
    </Flex>
  );
}
