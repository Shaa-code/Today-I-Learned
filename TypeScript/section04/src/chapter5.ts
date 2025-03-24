type Post = {
  title: string;
  author?: string;
};

let post: Post = {
  title: "게시글1",
  author: "신승윤",
};

const len: number = post.author!.length;
 