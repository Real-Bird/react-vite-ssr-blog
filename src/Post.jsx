import { useNavigate, useParams } from "react-router-dom";
import { Button, Descriptions, Flex, Typography } from "antd";
import { useEffect, useState } from "react";

export default function Post() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(undefined);

  useEffect(() => {
    fetch(`/api/blog/${postId}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data) {
          return navigate(-1);
        }
        setPost(data);
      });
  }, []);

  return (
    <Flex vertical gap={"large"} style={{ height: "100%" }}>
      <Typography.Title>{post?.mainTitle}</Typography.Title>
      <Flex align="center" justify="space-between">
        <Typography.Title level={2}>{post?.subTitle}</Typography.Title>
        <Button onClick={() => navigate(-1)}>목록</Button>
      </Flex>
      <Descriptions bordered>
        <Descriptions.Item label="Writer">{post?.writer}</Descriptions.Item>
        <Descriptions.Item label="createdAt">
          {post?.createdAt}
        </Descriptions.Item>
      </Descriptions>
      <Typography.Paragraph style={{ fontSize: "1.5rem", overflowY: "scroll" }}>
        {post?.content}
      </Typography.Paragraph>
    </Flex>
  );
}
