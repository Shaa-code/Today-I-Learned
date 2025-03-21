const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(20);
  }, 3000);
});

promise.then((response) => {
  // response는 unknown으로 추론된다.
  //이때 타입을 typeof를 사용해서 좁혀서 사용하기에는 귀찮다.
  console.log(response * 20); // 20
});

const promise = new Promise<number>((resolve, reject) => {
  setTimeout(() => {
    //resolve(20);
    reject("~~때문에 실패");
  }, 3000);
});

promise.then((response) => {
  // response는 unknown으로 추론된다.
  //이때 타입을 typeof를 사용해서 좁혀서 사용하기에는 부족하다.
  //console.log(response * 20); // 20
});

promise.catch((err) => {
  //any로 들어옴.
  //number로 제네릭 클래스를 정의하더라도 에러는 any로 정의된다.
  //그래서 항상 typeof 연산자로 타입 좁히기를 해줘야한다.
  if (typeof err === "string") {
    console.log(err);
  }
});

// 프로미스를 반환하는 함수의 타입을 정의

interface Post {
  id: number;
  title: string;
  content: string;
}

function fetchPost(): Promise<Post> {
  //생성자 옆이 아니라 함수의 반환값으로 정의해도된다.
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        id: 1,
        title: "게시글 제목",
        content: "게시글 컨텐츠",
      }),
        3000;
    });
  });
}

const postRequest = fetchPost();

postRequest.then((post) => {
  post.id;
});
