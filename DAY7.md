# DAY7

### Version Control System 이란?

에디터를 종료한후 이전 코드로 돌아갈수 없을때, 이전에 작성으로 돌아가기위한 시스템.

### 구체적으로 왜 필요한거지?

매번 귀찮게 내가 바꾸고 날짜 체크해 주고 관리하는것을 자동으로 관리해줘서 편하기 때문이다.

이전 상태로 다시 되돌려야 할 경우 사용한다.

여러사람이 같은 파일로 동시에 작업해야할때 사용한다.

어떤 변경 사항이 발생했는지 알아보기도 쉽다.

협업하기도 좋고, 백업하기도 좋다.

### Git이란?

Distributed Version Control System

소스 코드 기록을 관리하고 추적할 수 있는 버전 관리 시스템

딱, 코드 기록관리와 과거 어떻게 썻는지 추적하는 시스템까지만 Git이라고함.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/3c2ce2f1-98c5-49d3-9ec5-60e06444792a/Untitled.png)

### Github란?

Git Repository를 관리 할 수 있는 클라우드 기반 서비스

Git과는 별개로, 그냥 클라우드로 Repository를 옮길수 있게함.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/1a9173b0-986e-42a9-a1ae-64debc6da616/Untitled.png)

### Git Repository란?

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/7833fac4-d9b5-4cab-aeec-a78d44e7bcb2/Untitled.png)

GIt으로 관리되는 폴더

- Remote Repository
    
    원격 온라인 서버상의 저장소
    
- Local Repository
    
    내 컴퓨터의 저장소 (Git 계정을 의미하는게 아니다.)
    

### Fork란?

Remote Repository 상에서 다른 사람의 Repository에 있는 내용을 나의 Repository로 가져오는 작업

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/b644eb84-2383-46d2-a0e3-f52d7add5765/Untitled.png)

### Clone이란?

나의 Remote Repository에서 나의 컴퓨터 즉, Local Repository로 가져오는 작업.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/e97d3311-2047-489e-b675-3dc4b1a36b47/Untitled.png)

### Push란?

Local Repository에서 Remote Repository로 올려주는 작업.

구체적으로는 Local Repository에 Commit을 해둔것을 Remote Repository에 올리는것이다.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/217f6763-d0b7-45d2-8331-8762b11d3d6f/Untitled.png)

### Pull이란?

Remote Repository에 변경사항이 있을때 Local Repository로 가져오는 작업.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/68cd4b0b-3c16-452d-b898-1ade105b6b46/Untitled.png)

의문점.

1. Clone과 Pull의 차이점은 뭐지?

Pull은 Clone과 다르게 다른사람의 Repo에서도 요청할 수 있다는점이다.

1. Pull은 어느시점에 일어나는거지?

 상대방이 수정을 해서 바로 Pull을 사용해 가지고오면 수정한 부분들 또한 덮어 씌어지는것아닐까?

### Git 환경설정

- 사용자 정보

```java
git config --global user.name "username"
git config --global user.email "my-email"
```

username과 my-email에 내 정보를 얻으면된다.

### -global 옵션을 설정하는 이유?

`git 설정을 계속 반복하지 않고, 처음에 한번만 하기 위해서 사용한다.`

나중에 이메일, 이름을 변경하고 싶다면 다시 명령어를 바꾸면된다.

## Git Workflow

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/b4aa9976-9e7c-402e-8ad9-d3601576bd6d/Untitled.png)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/3c31385f-9ce8-45bb-9a98-4c749ef90183/Untitled.png)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/7dfce41e-c657-4608-bfd9-b110d6b84ca7/Untitled.png)

anything 폴더에 git을 init하고 난후, 파일 hi.txt를 생성한다.

`이때 hi.txt는 “Untracked files” 이라고 정의되어 있다.`

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/49e69d89-92e5-4cd3-8286-2160e944470d/Untitled.png)

이후 add 명령어를 이용해서 Staging Area에 올려준다.

### Staging Area란?

내 컴퓨터 (Work Space)에서 git의 관리를 받는 상태로 올려주는 영역.

라고 표현하며, Staging area에 있는 파일들은 Staged File 되었다고 표현한다.

Unstaged File. 또는 Untracked File되었다.

쉽게 기억 :

Untracked File == Unstaged File : 그냥 컴퓨터에 나돌아다니는 파일

Staged File == git add로 git관리에 들어간 파일

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/340647ac-e555-4d1f-baa8-25824893d2f0/Untitled.png)

hi.txt파일의 내용을 “안녕하세요”로 수정한후 다시 git status로 상태를 확인한다.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/c2392bd1-ba28-48b1-a939-62816d116a25/Untitled.png)

수정된 파일이기 때문에 “modfied” 라고 표시 되어있다. 

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/b7727e15-66ba-41a3-9650-526fb7f38c6d/Untitled.png)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/61397daf-a310-4a7c-838d-98574247bfd7/Untitled.png)

실제로 해보니 이전상태 (commit하기 전의 상태로 돌아갔다.)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/1b8866ae-38c5-4227-968a-968f10a1253c/Untitled.png)

다시 git status를 해보니, 커밋할것이 없다고 나온다.

다시 “안녕하세요”로 파일을 수정하고 저장해주자.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/340647ac-e555-4d1f-baa8-25824893d2f0/Untitled.png)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/7b3aab42-0cc0-4eda-aa97-0f25e72ca93f/Untitled.png)

Github에 push하기 위해서 git remote add를 사용해 올릴 위치를 지정해주어야한다.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/775de638-96a3-4ecb-ac9e-448290f9016a/Untitled.png)

Repository는 넣을곳으로 미리 만들어두어야한다.

Test라는 예제를 하나 만들어 두었다.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/5d53777a-86f3-4756-908a-a81b709447b7/Untitled.png)

실제로 잘 보내지는것을 확인할 수 있다.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/ff2914bf-7a50-46f9-9cc0-cce2394d7e66/Untitled.png)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/e110c6eb-9a44-4d0b-a323-0075901f3f39/Untitled.png)

보다시피 Remote Repository에 잘 올라간것이 확인된다.

### Pull Request란?

Remote Repository에 Push 해놓은 변경사항에 대해서 함께 작업하는 다른 사람들에게 알리는것

### 스스로 질문하고 답해보자.

대답해 보자 commit이 뭐하는건데?

Staging Area에 있는 데이터를 Local Repository로 변경사항을 올려주는 행위를 의미한다.

push를 하면 repository에도 올라가는가?

그렇다. 왜? Local Repository에서 관리되던 버전들의 commit기록을 올리는 행위이기 때문이다.

commit 이전으로 되돌리고 싶을때는 restore을 쓰면 modified가 모두 날아가서 되는것이다.

reset은 커밋 없이 뒤로 돌릴때 사용한다. reset HEAD^ ← 꺽쇄의 개수당, 이전 몇번의 커밋.

status : 파일들의 untracked, unstaged, modified 와 같은 상태를 알려줌

restore : 커밋되기 이전에 modified상태에 있는 것을 다시 뒤로 되돌린다.

add : 일반 파일을 git의 관리 아래에 넣는다.

commit : 변경된 사항의 버전을 올려서 저장한다.

reset HEAD^ → 커밋 없이 뒤로 돌릴때, 한번만 한다.

log : 저장소의 커밋 히스토리를 시간순으로 보여준다.

pull : 변경사항이 있을때, Remote Repo에 있는 파일을 Local Repo로 가져온다. (remote가 포함됨.)

push : Local Repo에 있는 파일들을 Remote Repo로 가져간다.

init : 말그대로 폴더를 git repo로 초기화시켜주는 명령어다.

remote add : `원격 저장소의 위치를 추가하는 명령어이다.`

remote -v : view옵션은 설정한 위치들을 보여준다.

git reset HEAD^ : 커밋하기 한단계전으로 이동한다.

Commited 상태란? 커밋된 상태

modifed 상태란? Staged File이 Commit되기이전에 이전의 파일과는 내용이 다른 상태

staged 상태란? 깃의 관리를 받고있는 상태

### git push,pull 인자의 순서

영어의 4형식으로 생각하자.

~에게 ~을 이 순서로 기억하면 쉽다!

(S) git (V) push,pull (I.O) origin (D.O) main

git push origin main → origin에게 main을 push한다 

git pull pair main → pair에게 main을 pull한다.

에러가 나면 바뀌지 않는다.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/f1a1cbed-fdac-4d4d-810b-ba1105175c3e/Untitled.png)

 오타발견시 , 불필요한 커밋하지 않고 이전으로 돌리기

### 헷갈리고 있다.

### 왜 인지 반드시 이유를 적고 넘어 갈것.

git pull pair origin X→ git pull pair main O

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/6979f8e7-cdb8-427e-b8fc-841a99c64101/Untitled.png)

git pull 인자의 순서에서 헷갈렸고, 또한 origin과 main의 종속관계에 대한 이해가 부족했기 때문이다.

Remote Repo의 origin을 사용하는게 아니라, 그 속의 Branch인 main을 사용하고 있다면, main이 되어야한다.

git push pair main X → git push origin main O

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/3ee4df9f-ca5a-4740-b4e8-eb0bc29ea355/Untitled.png)

pair에게 올려주는 상황이 아닌 origin에게 올려주는 상황이 되어야하므로 pair가 아닌 origin이 되어야한다.
