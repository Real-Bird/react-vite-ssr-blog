import { Button, Flex, List, Pagination } from "antd";
import { blogList } from "./db/blog";
import { Link } from "react-router-dom";

export default function Home() {
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
      <Pagination
        defaultCurrent={1}
        total={blogList.length % 10}
        style={{ alignSelf: "center", marginTop: "auto" }}
      />
    </Flex>
  );
}
