export const model = {
  blogList: [
    {
      id: "76ae21af-578e-4a8a-ba2e-e78d3ef73c90",
      mainTitle: "간단한 블로그를 SSR로 만들어 보자",
      subTitle: "with Vite, React, React Router, Ant Design",
      content:
        "Non est voluptate laboris id dolore cupidatat sint ea incididunt occaecat fugiat. Incididunt Lorem reprehenderit officia voluptate adipisicing excepteur occaecat duis. Velit dolore nisi aliqua dolore minim elit sit minim enim elit do veniam enim. Et veniam elit excepteur eu in magna qui mollit duis. Laborum incididunt irure officia aliquip qui culpa irure officia.\nDuis et aliqua fugiat voluptate dolor ut fugiat labore nisi qui dolor irure. Ut magna reprehenderit laborum dolor ad duis. Sunt laborum esse est sit et.\nAliqua consequat nisi qui ad. Eu qui proident elit voluptate sunt. Labore nostrud laboris labore sit qui irure veniam cillum anim. Fugiat culpa incididunt ad nulla qui proident incididunt sunt id ex labore minim excepteur. Voluptate voluptate voluptate non enim consectetur laboris minim Lorem cupidatat id id. Adipisicing cillum labore culpa elit sunt est duis sint est excepteur id quis quis aute.\nProident proident proident non pariatur velit nisi magna voluptate dolor elit. Amet fugiat ex irure anim nisi nulla ut pariatur aliquip eu. Nostrud magna fugiat enim in Lorem ut ut sit anim deserunt irure est ea. Labore ad eiusmod et pariatur occaecat Lorem laboris. Excepteur ea proident officia voluptate irure irure sunt. Quis commodo ea aliqua veniam. Irure est enim est mollit dolore.\nAd dolore do tempor incididunt Lorem ipsum irure sit laborum Lorem reprehenderit ullamco. Veniam do est commodo commodo esse irure magna nisi amet nisi consequat elit in cupidatat. Voluptate nisi occaecat aliquip cupidatat ad deserunt eu consectetur cillum. Cupidatat culpa est minim cupidatat ullamco aute.",
      writer: "Auth of This blog",
      createdAt: "2023-11-13T14:32:39.123Z",
    },
    {
      id: "591f572a-d64c-4c94-9f69-f4f78162509b",
      mainTitle: "React Router를 사용했다",
      subTitle: "StaticRouter",
      content:
        "Aliqua consequat nisi qui ad. Eu qui proident elit voluptate sunt. Labore nostrud laboris labore sit qui irure veniam cillum anim. Fugiat culpa incididunt ad nulla qui proident incididunt sunt id ex labore minim excepteur. Voluptate voluptate voluptate non enim consectetur laboris minim Lorem cupidatat id id. Adipisicing cillum labore culpa elit sunt est duis sint est excepteur id quis quis aute.\nProident proident proident non pariatur velit nisi magna voluptate dolor elit. Amet fugiat ex irure anim nisi nulla ut pariatur aliquip eu. Nostrud magna fugiat enim in Lorem ut ut sit anim deserunt irure est ea. Labore ad eiusmod et pariatur occaecat Lorem laboris. Excepteur ea proident officia voluptate irure irure sunt. Quis commodo ea aliqua veniam. Irure est enim est mollit dolore.\nAd dolore do tempor incididunt Lorem ipsum irure sit laborum Lorem reprehenderit ullamco. Veniam do est commodo commodo esse irure magna nisi amet nisi consequat elit in cupidatat. Voluptate nisi occaecat aliquip cupidatat ad deserunt eu consectetur cillum. Cupidatat culpa est minim cupidatat ullamco aute.",
      writer: "Auth of This blog",
      createdAt: "2023-11-14T14:32:39.123Z",
    },
    {
      id: "fc59c586-8d30-4f29-aeb6-9d68b59d8e78",
      mainTitle: "Ant Design을 사용했다",
      subTitle: "근데 잘 모르겠다",
      content:
        "Non est voluptate laboris id dolore cupidatat sint ea incididunt occaecat fugiat. Incididunt Lorem reprehenderit officia voluptate adipisicing excepteur occaecat duis. Velit dolore nisi aliqua dolore minim elit sit minim enim elit do veniam enim. Et veniam elit excepteur eu in magna qui mollit duis. Laborum incididunt irure officia aliquip qui culpa irure officia.",
      writer: "Auth of This blog",
      createdAt: "2023-11-15T14:32:39.123Z",
    },
  ],
  addNewBlog(newPost) {
    this.blogList.push(newPost);
  },
  init(initialModel) {
    this.blogList = initialModel;
  },
};
