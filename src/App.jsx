import "./App.css";
import { Link, Routes, Route, useLocation } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import { Layout, Menu, Typography } from "antd";
import Post from "./Post";
import Write from "./Write";

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

const routes = [
  {
    path: "/",
    label: "Home",
  },
  {
    path: "/about",
    label: "About",
  },
];

function App() {
  const { pathname } = useLocation();
  return (
    <Layout style={{ height: "100%" }}>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Title>
          <Link to={"/"}>SSR with React</Link>
        </Title>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[pathname]}
          items={routes.map(({ path, label }) => {
            return {
              key: path,
              label: <Link to={path}>{label}</Link>,
            };
          })}
        />
      </Header>
      <Content style={{ padding: "1rem" }}>
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<Post />} path="/:postId" />
          <Route element={<Write />} path="/write" />
          <Route element={<About />} path="/about" />
        </Routes>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        SSR Blog with React & Vite & React Router & Ant Design
      </Footer>
    </Layout>
  );
}

export default App;
