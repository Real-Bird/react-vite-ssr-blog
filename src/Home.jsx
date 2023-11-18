import { Button, Flex, List } from "antd";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Home() {
  const [blogList, setBlogList] = useState([]);

  useEffect(() => {
    fetch("/api/blog", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setBlogList(data));
  }, []);
  return (
    <Flex vertical style={{ height: "100%" }}>
      <Link to="/write" style={{ alignSelf: "flex-end" }}>
        <Button>새 글 작성</Button>
      </Link>
      <List
        style={{ padding: "1rem" }}
        itemLayout="vertical"
        dataSource={blogList}
        renderItem={(item) => (
          <List.Item key={item.id} extra={<h3>{item.writer}</h3>}>
            <Link to={`/${item.id}`}>
              <List.Item.Meta
                title={item.mainTitle}
                description={item.content.slice(0, 120) + "..."}
              />
            </Link>
          </List.Item>
        )}
      />
    </Flex>
  );
}
