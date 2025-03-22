interface PostList {
  title: stirng;
  content: string;
  author: {
      id:number;
      name: string;
  };
}[];

function printAuthorInfo(author : id: number; name: string;){

} {
  console.log(`${author.name}-${author.id}`);
}

const post: Post = {
  title: "게시글 제목",
  content: "게시글 본문",
  author: {
      id: 1,
      name: "신승윤",
  }
}