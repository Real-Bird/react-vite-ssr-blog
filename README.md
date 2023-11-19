# SSR React Blog with Vite

## 데모

https://78ccnl-5173.csb.app/

## 패키지

```
Vite, React, Express, React Router, Ant Design
```

## 개요

`Vite` 제공 SSR React 템플릿과 `React Router`, `Ant Design`을 이용해 만든 간단한 SSR Blog입니다. _React SSR은 어떻게 만들 수 있나_ 궁금하여 구현했습니다.

## create-extra-template

기본 템플릿으로 사용한 [`create-extra-template`](https://github.com/bluwy/create-vite-extra)에 대한 설명은 [여기](https://velog.io/@real-bird/React-Vite-공식-문서만-보고-Vite-React-SSR-예제-살펴보기)를 참고해주세요.

## React Router

`React Router`는 `SSR` 환경에서 `SPA`를 구현할 수 있도록 지원합니다. 두 가지 케이스로 나뉘는데, 하나는 데이터 로드가 필요한 라우트이고, 다른 하나는 데이터가 없는 라우트입니다. 여기서는 **데이터가 없는 라우트**로 구현했습니다.

클라이언트에서는 `SPA`에서 사용하는 대로 `<BrowserRouter>`로 라우트를 구성합니다.

```jsx
// client-entry.jsx
ReactDOM.hydrateRoot(
  document.getElementById("root"),
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// App.jsx
function App() {
  return (
    <Layout>
      {/* ... */}
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<About />} path="/about" />
      </Routes>
      {/* ... */}
    </Layout>
  );
}
```

서버에서는 `<StaticRouter>`를 이용해 사전 렌더링될 정적 라우트를 서버에 알려줍니다. 이때 로드되는 `url`을 `location` 프로퍼티에 주입해야 합니다. `location`이 없다면 해당 경로에서 새로고침을 했을 때 `base` 경로를 찍고 해당 경로를 렌더링합니다.

```jsx
export function render(url) {
  const html = ReactDOMServer.renderToString(
    <React.StrictMode>
      <StaticRouter location={"/" + url}>
        <App />
      </StaticRouter>
    </React.StrictMode>
  );
  return { html };
}
```

## Data

로컬에서 `model` 객체를 생성해 `export`합니다.

```js
// db/blog.js
export const model = {
  blogList: [
    {
      id: "76ae21af-578e-4a8a-ba2e-e78d3ef73c90",
      mainTitle: "간단한 블로그를 SSR로 만들어 보자",
      subTitle: "with Vite, React, React Router, Ant Design",
      content: "Non est voluptate ...",
      writer: "Auth of This blog",
      createdAt: "2023-11-13T14:32:39.123Z",
    },
    {
      id: "591f572a-d64c-4c94-9f69-f4f78162509b",
      mainTitle: "React Router를 사용했다",
      subTitle: "StaticRouter",
      content: "Aliqua consequat nisi qui ad. ...",
      writer: "Auth of This blog",
      createdAt: "2023-11-14T14:32:39.123Z",
    },
    {
      id: "fc59c586-8d30-4f29-aeb6-9d68b59d8e78",
      mainTitle: "Ant Design을 사용했다",
      subTitle: "근데 잘 모르겠다",
      content: "Non est voluptate laboris id dolore ...",
      writer: "Auth of This blog",
      createdAt: "2023-11-15T14:32:39.123Z",
    },
  ],
};
```

이렇게 생성한 모델을 클라이언트와 연결합니다.

```jsx
import { model } from "./db/blog";

export default function Home() {
  return (
    <Flex vertical style={{ height: "100%" }}>
      <Link to="/write" style={{ alignSelf: "flex-end" }}>
        <Button>새 글 작성</Button>
      </Link>
      <List
        style={{ padding: "1rem" }}
        itemLayout="vertical"
        dataSource={model.blogList}
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
```

`Write` 페이지를 생성하고, 게시글 추가 메서드를 만듭니다.

```jsx
// App.jsx
function App() {
  return (
    // ...
    <Routes>
      <Route element={<Home />} path="/" />
      <Route element={<Write />} path="/write" />
      <Route element={<About />} path="/about" />
    </Routes>
    // ...
  );
}

// db/blog.js
export const model = {
  blogList: [...],
  addNewBlog(newPost) {
    this.blogList.push(newPost);
  }
}

// Write.jsx
export default function Write() {
  // ...
  const onSubmit = async () => {
    // ...
    const newData = {
      id: crypto.randomUUID(),
      writer,
      content,
      createdAt: new Date().toString(),
      mainTitle,
      subTitle,
    };
    model.addNewBlog(newData);
    // ...
  };
  return (
    <Form {...} onFinish={onSubmit}>
      {/* ... */}
    </Form>
  );
}
```

게시글의 `id`를 통해 개별 게시물을 볼 수 있는 페이지를 구현합니다.

```jsx
// App.jsx
function App() {
  return (
    // ...
    <Routes>
      <Route element={<Home />} path="/" />
      <Route element={<Post />} path="/:postId" />
      <Route element={<Write />} path="/write" />
      <Route element={<About />} path="/about" />
    </Routes>
    // ...
  );
}

// Post.jsx
export default function Post() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const post = model.blogList.find((post) => post.id === postId);

  return (
    // ...
  );
}
```

새 게시글의 조회와 추가가 제대로 작동하지만, 새로고침하면 모델이 초기화됩니다. 클라이언트에서 모델 객체를 불러왔기 때문입니다.

## 모델과 클라이언트 분리

수정된 모델 데이터가 남도록 클라이언트와 분리하여 서버 api를 만듭니다.

```js
// server.js
const router = Router();
router.post("/blog", (req, res) => {
  let body = "";

  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    model.addNewBlog(JSON.parse(body));
    model.init(model.blogList);
    res.status(200).send(model.blogList);
  });
});
```

`body-parser` 미들웨어를 사용하지 않았기 때문에 클라이언트에서 보낸 `body`를 직접 받아 모델에 추가합니다.

```js
router.get("/blog", (req, res) => {
  res.status(200).send(model.blogList);
});

router.get("/blog/:id", (req, res) => {
  const { id: postId } = req.params;
  const foundPost = model.blogList.find((post) => post.id === postId);
  res.status(200).send(foundPost);
});

app.use("/api", router);
```

전체 리스트와 개별 게시글을 받아오는 api이고, 경로를 `express`에 등록합니다.

클라이언트에서는 api를 fetch하여 블로그 리스트와 개별 게시물을 불러옵니다.

```jsx
// Home.jsx
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
    // ...
  );
}

// Post.jsx
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
    // ...
  );
}
```

새 글 작성도 `post` 요청을 보내 추가합니다.

```jsx
// Write.jsx
// Write.jsx
export default function Write() {
  // ...
  const onSubmit = async () => {
    // ...
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
    // ...
  };
  return (
    // ...
  );
}
```

## And Design SSR

프로젝트에서 사용한 UI 라이브러리인 `Ant Design`을 클라이언트에서만 사용하면 css가 뒤늦게 적용되는 현상이 일어납니다. [Ant Design - Server Side Rendering](https://ant.design/docs/react/server-side-rendering)에서는 `renderToString` 시 inline으로 style을 주입하는 `inline mode`와 css 파일을 생성해 내보내는 `whole export`를 제공합니다.

여기서는 `inline mode`를 사용합니다. 쉽게 구현하고 고려할 게 없기 때문입니다.

```jsx
import { createCache, StyleProvider, extractStyle } from "@ant-design/cssinjs";

export function render(url) {
  const cache = createCache();
  const html = ReactDOMServer.renderToString(
    <React.StrictMode>
      <StaticRouter location={"/" + url}>
        <StyleProvider cache={cache}>
          <App />
        </StyleProvider>
      </StaticRouter>
    </React.StrictMode>
  );
  const styleText = extractStyle(cache);
  return {
    html,
    head: [styleText],
  };
}
```

`StyleProvider`를 통과한 `cache`는 사용한 스타일의 정보를 담고 있습니다. 이것을 다시 `head` 태그에 추가할 inline 문자열로 변환합니다. 다른 태그가 추가될 수도 있기 때문에 `head`에 배열로 담았습니다.

```js
// server.js
const html = template
  .replace(`<!--app-head-->`, rendered.head.join(" ") ?? "")
  .replace(`<!--app-html-->`, rendered.html ?? "");
```

`<!--app-head-->` 주석에 배열로 넘어온 `head`를 하나의 문자열로 합칩니다. 서버를 실행하면 새로고침해도 `And Design`의 css가 적용된 채로 렌더링됩니다.

## 전체 코드

전체 코드는 [codesandbox](https://codesandbox.io/p/sandbox/simple-ssr-react-blog-78ccnl) 혹은 [github](https://github.com/Real-Bird/react-vite-ssr-blog)에서 확인할 수 있습니다.
