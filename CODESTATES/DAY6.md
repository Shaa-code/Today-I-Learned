# DAY6

오늘은 Linux 운영체제의 사용법에 대해서 간단하게 배워보았다.

# Linux

CLI의 사용이유. → 상대적으로 높은 안정성과 빠른속도.

GUI의 사용이유. → 사용자가 쉽게 컴퓨터를 제어할수 있다는 장점.

GUI가 느린 구체적 이유는 그래픽에 컴퓨터 자원을 더 쓰기 때문에 CLI보다 상대적으로 느림.

입력을 담당하는 장치인 키보드나 마우스를 입력소스 (Input Source)로 정의.

출력을 담당하는 장치인 모니터나 스피커를 출력소스 (Output Source)로 정의.

<br/> 

### 프롬프트(Prompt)란?

키보드의 입력을 확인하고 편집할 수 있는 한줄의 공간.

<br/>

### pwd(print working directory)

![Untitled](https://user-images.githubusercontent.com/70310271/166243524-a5c716f1-da25-45f7-979b-da5dc52c52fc.png)

현재 내가 위치하는 working directory를 표시한다.

<br/>

### mkdir(make directories)

![Untitled 1](https://user-images.githubusercontent.com/70310271/166243533-6861fd13-2e5a-4ee9-9954-9b9a5f59a31b.png)

새 폴더를 만든다.


<br/>

### ls(list)

- ‘-’ (dash means option)

옵션의 순서는 기능에 영향을 미치지 않는다.

- ls -l (lists the contents in a long format)

폴더나 파일의 포맷을 전부 표현하라는 의미입니다.

![Untitled 2](https://user-images.githubusercontent.com/70310271/166243552-a8e51423-3de4-451b-8361-207e4e2ec380.png)

- ls -a (lists all the contents)

숨어있는 폴더나 파일을 포함한 모든 항목을 터미널에 출력.

![Untitled 3](https://user-images.githubusercontent.com/70310271/166243570-08858897-36ad-4b58-8930-e6cd06c59c22.png)

- ls-al (lists all the contents in a long format) // -la을 바꿔서 써도됨.

![Untitled 4](https://user-images.githubusercontent.com/70310271/166243587-a8708a30-ac0a-4e8e-b513-b766b0ae3b7b.png)

<br/>

### 앞에 쓰인 -rw의 의미는 무엇일까?

'd' : Directory로 이동이 가능함을 의미한다.

'-' : Non-Directory , No Permission

'r' : Read Permission

'w' : Write Permisson

'x' : Execute Permission

이 정도만 알자 뒤에서 깊게 파헤쳐본다.

<br/>

### 명령어로 GUI 탐색기를 실행시켜 폴더를 둘러보자!

우선 윈도우 환경에서 사용하는 설치받은 WSL2는 윈도우 운영체제와 메모리를 공유하는 구조가 아니다.
그렇기에, WSL2를 사용하더라도 Linux 내부에서 GUI를 지원하지 않는 CLI환경이라, GUI와 연결할 수 있는 인터페이스가 존재하지 않는다.
즉, 일반적으로는 nautilus 패키지는 사용할 수 없다.

따로 Linux에 서버를 설치해서 GUI환경을 내부에 만들어주는 방법이 있다.

[[WSL] (+ WSL 2) 윈도우에서 우분투 GUI 프로그램 실행](https://blog.nadekon.net/115)

하지만 윈도우를 GUI로 사용하고, Linux를 CLI로 활용하면 되므로 굳이 Linux에 또 한번의 GUI를 설치할 필요성을 느끼지 못했고
교육과정에서 중요한 내용이 아니라고 판단하여 그냥 넘어간다.

Mac이라면 open 명령어를 사용해보자.

<br/>

### cd (change directory)

![Untitled 5](https://user-images.githubusercontent.com/70310271/166243625-7c527e96-90be-4103-83d2-5ba64f65fc79.png)

<br/>

### touch (make a file)

![Untitled 6](https://user-images.githubusercontent.com/70310271/166243656-a0d8a8bd-2080-4c31-abe6-ba5661dd0255.png)

![Untitled 7](https://user-images.githubusercontent.com/70310271/166243664-5a771b91-f879-496d-9693-82b016b69418.png)

실제 폴더에 텍스트 파일이 생긴것을 확인하였다.

![Untitled 8](https://user-images.githubusercontent.com/70310271/166243921-454bc467-fb59-440f-abd0-8f64884703c9.png)

GUI상에서 파일속에 글을 저장해보자.

![Untitled 9](https://user-images.githubusercontent.com/70310271/166243925-95fdc12e-7f26-4720-9151-20c7621eb64c.png)

위 처럼 실제로 텍스트 내용이 변화되었다.

<br/>

### rm(remove)

![Untitled 10](https://user-images.githubusercontent.com/70310271/166243946-e187f3bc-5214-493a-85bf-8f53a4125abd.png)

![Untitled 11](https://user-images.githubusercontent.com/70310271/166243960-be5ebb13-f63e-4cf6-9cc7-8ff9be4b1c92.png)

폴더는 바로 지워지지 않음.

![Untitled 12](https://user-images.githubusercontent.com/70310271/166243982-9038c376-1162-4993-8b2f-842a5e93f9a6.png)

rm -r(recusive) // 재귀하며 폴더안으로 들어간다고 생각하면 편하다.

명령을 실행하면 터미널이 해당 폴더와 그 속의 서브 디렉터리를 포함한 모든 파일을 삭제한다. 

rm -f(force) // 강제로 삭제한다.

<br/>

### mv(move) // 이름을 변경할때도 사용한다.

![Untitled 13](https://user-images.githubusercontent.com/70310271/166244001-488a2ae4-a3cc-45f9-9bc8-d053f9b796ee.png)

![Untitled 14](https://user-images.githubusercontent.com/70310271/166244011-5e13cf96-d12d-4ed3-8d8a-282486803c66.png)

이름을 만드는 경우에는 파일을 새로 작성하지 않고, 이름만 변화한다.

<br/>

### cp(copy)

![Untitled 15](https://user-images.githubusercontent.com/70310271/166244033-71de58ba-c58d-47a8-848e-876e1de00c64.png)

CLI에서 .는 현재폴더 ..는 현재보다 앞에있는 폴더를 가르킨다.

![Untitled 16](https://user-images.githubusercontent.com/70310271/166244054-e711cc99-f4f2-4759-8bed-70be0f5f43cd.png)

폴더의 복사의 경우도 똑같다.

<br/>

## 관리자 권한과 경로

### 사용자와 관리자

컴퓨터의 운영체제에는 사용자(User)와 관리자(Administer)가 있다.

관리자는 사용자 보다 높은 권한을 갖는다.


### 상대경로 절대경로

![Untitled 17](https://user-images.githubusercontent.com/70310271/166244075-38fde532-568a-46fa-8dab-2dcfea0c761a.png)

<br/>

### 관리자(root) 권한

사용자와 관리자를 명확히 분리하여 `사용자의 실수로 발생할 수 있는 시스템에러로 부터 운영체제를 보호한다.`

절대 경로의 기준점인 루트폴더(/)는 Linux의 관리자 영역이다.

![Untitled 18](https://user-images.githubusercontent.com/70310271/166244093-c978f660-b483-413f-aa35-2284fbb18d30.png)

폴더를 생성할 수 없다.

물결표시는 루트폴더(’/’)로 부터 사용자 폴더(username)까지의 경로를 축약한 형태이다.

사용자 폴더의 경로(Path)는 ‘~/’로 표시된다.

<br/>

### sudo(**super user do)**

관리자 권한을 획득하는 명령어

![Untitled 19](https://user-images.githubusercontent.com/70310271/166244117-979882fa-eaf3-44fb-9049-85dd44f51d19.png)

상위 폴더로 옮기고 싶을때,

cp -rf you_are_the_best ../

cp -rf you_are_the_best ~/helloWorld/

하나만 썻었지만, 위처럼 물결표를 사용해서도 접근할 수 있다는걸 알고있자!

<br/>

### 텍스트 에디터 nano.

![Untitled 20](https://user-images.githubusercontent.com/70310271/166244140-81e3fddd-7ca4-45e0-892f-06e7025f1b62.png)

화면에 표시된 ^X와 같은 내용은 Ctrl + X 키 조합을 의미한다.

어차피 개발자라면 Vim이나 Emacs 같은 CLI 에디터를 하나쯤은 다뤄야하므로 시간이 난다면 Vim을 배워보도록해야겠다.

[완전 초보를 위한 Vim](https://nolboo.kim/blog/2016/11/15/vim-for-beginner/)

<br/>

## 패키지와 패키지 매니저

### 패키지

리눅스의 패키지는 여러파일을 모아 하나의 파일로 저장하고 있는 압축파일이다.

<br/>

- 패키지의 구성
    1. 프로그램 파일
    2. 프로그램에 대한 정보를 담은 파일
    3. 프로그램 설치파일
    4. 프로그램 설치 설명서
    
패키지 안에는 하나의 프로그램이 정상적으로 설치되고 동작하기 위한 모든 파일이 압축되어 있다.

프로그램에 대한 정보를 담은 파일은 프로그램 A를 설치하기위해 프로그램 B가 필요하다는 정보도 함께 담겨있다.

이때, 패키지를 이용해 프로그램을 설치하면 패키지에 포함된 정보를 이용해 프로그램 B를 먼저 설치하고 나서 프로그램 A를 설치한다.

<br/>

### 패키지 매니저 (apt ==  Advanced Package Tool)

프로그램을 독립적으로 설치하면, 각각의 프로그램이 저장된 위치를 모두 알아야한다.

프로그램이 많아지면, 업데이트를 하는일이 현실적으로 불가능함으로, 패키지 매니저가 이를 관리해 준다.

패키지 매니저는 모든 패키지의 저장소 위치를 저장하고 있다.

패키지 매니저에게 설치 요청시, 패키지 매니저는 저장된 위치에서 패키지를 다운로드해 설치프로그램을 실행한다.

![Untitled 21](https://user-images.githubusercontent.com/70310271/166244173-8b140a82-006c-46eb-bd6b-a36413ea5a60.png)

![Untitled 22](https://user-images.githubusercontent.com/70310271/166244181-987eaf7f-e56c-4d89-a52a-e8859931f314.png)

![Untitled 23](https://user-images.githubusercontent.com/70310271/166244194-d15c3286-0192-4b2c-a347-2ffa7e8da7ce.png)

<br/>

- wget 으로 URL을 통해 파일 다운로드 해보기

![Untitled 24](https://user-images.githubusercontent.com/70310271/166244227-8440dcab-8cd6-4f22-bf74-2e60239a48fb.png)

![Untitled 25](https://user-images.githubusercontent.com/70310271/166244248-aeb3d629-5c74-45b2-ac0d-4a9d07d7afe9.png)

![Untitled 26](https://user-images.githubusercontent.com/70310271/166244256-def03bce-210a-44ca-b547-1bb87aaea341.png)

<br/>

- neofetch으로 컴퓨터 정보 알아보기

![Untitled 27](https://user-images.githubusercontent.com/70310271/166244282-9be3b442-4639-4ed8-a210-5b9504eb3485.png)

![Untitled 28](https://user-images.githubusercontent.com/70310271/166244307-3eb6f199-ca72-4894-8d7e-5fa9067362f7.png)

<br/>

### 사용권한

![Untitled 29](https://user-images.githubusercontent.com/70310271/166244317-e5c77d09-5d08-429d-986e-f1d904be40fc.png)

<br/>

### 'drw-'의 정체가 뭘까?

![Untitled 30](https://user-images.githubusercontent.com/70310271/166244331-35adecd2-5735-4320-948f-3832938eacc2.png)

- Owner(User) : 파일의 소유자

기본적으로 파일을 만든사람이 소유자가 된다.

<br/>

- Group : 여러 User로 이루어진 집합

그룹에 속한 모든 User는 파일에 대한 동일한 Group 액세스 권한을 갖는다.

<br/>

- Other : 파일을 만들지 않은 다른 모든 User를 의미한다.

Other에게 권한을 설정한다는것은 전역설정을 한다는것을 의미한다.

<br/>

### chmod (change mode)

OS에 로그인한 사용자와 폴더나 파일의 소유자가 같을때, 파일의 권한을 변경할 수 있다.

소유자가 다른 경우에는 sudo 명령어로 권한을 변경할 수 있다.

chmod에 어떤 방법들을 사용해서 파일을 설정하는지 알아보자.

- Symbolic method

| Access class | Operator | Access Type |
| --- | --- | --- |
| u (user) | + (add access) | r (read) |
| g (group) | - (remove access) | w (write) |
| o (other) | = (set exact access) | x (execute) |
| a (all == u, g ,o) |  |  |

### Symbolic method의 단점

Access class, Access Type, Operator 세가지 모두 기억해야만 변경할 수 있다.

그에 대한 대안책으로 나온것이 Absolute form이다.

<br/>

- Absolute form

숫자 7까지 나타내는 3bits의 합으로 표기한다.

| Permission | Number |
| --- | --- |
| Read (r) | 4 |
| Write (w) | 2 |
| Execute (x) | 1 |

더하기 조합으로 표현하면 된다.

```java
chmod 421 hello.java

u = r--(4+0+0) , g = -w-(0+2+0) , o = --x(0+0+1)

-r---w---x
```

조금만 연습해보면 된다.

| # | Sum | rwx | Permission |
| --- | --- | --- | --- |
| 7 | 4(r) + 2(w) + 1(x) | rwx | read, write, execute |
| 6 | 4(r) + 2(w) + 0(-) | rw- | read, write |
| 5 | 4(r) + 0(-) + 1(x) | r-x | read and execute |
| 4 | 4(r) + 0(-) + 0(-) | r— | read only |
| 3 | 0(-) + 2(w) + 1(x) | -wx | write, execute |
| 2 | 0(-) + 2(w) + 0(-) | -w- | write only |
| 1 | 0(-) + 0(-) + 1(x) | —x | execute only |
| 0 | 0(-) + 0(-) + 0(-) | —- | none |

<br/>

### 환경변수

<br/>

환경변수란?

환경에 따라 프로그램의 동작에 영향을 줄 수 있는 값들을 환경변수라고 한다.

<br/>

- 지역 환경변수
    
    환경 변수를 생성한 특정 사용자만 사용할 수 있는 환경변수
    
![Untitled 31](https://user-images.githubusercontent.com/70310271/166244385-fb3a4e7d-4ba8-43c7-8dac-9b002721b73e.png)



- 전역 환경변수
    
    모든 사용자가 사용할 수 있는 환경 변수
    
![Untitled 32](https://user-images.githubusercontent.com/70310271/166244397-6c97a90a-560f-4636-82c1-3583a8fb08cd.png)


음.. 다른사람이 서버를 활용하게 할 수 있게끔 만들어줄 수 있는 용도로 사용할 수도 있겠구나!

<br/>

### Linux에서 지역 환경 변수 영구 적용

간단하다. .bashrc파일을 수정해 주면 된다.

![Untitled 34](https://user-images.githubusercontent.com/70310271/166244446-e2452f55-54ad-48bf-b2da-de286b0288fc.png)

.bashrc에 환경변수 설정하기.

![Untitled 34](https://user-images.githubusercontent.com/70310271/166244460-6c7e81fd-ec2a-4fac-ac2c-3bfd7f578562.png)

Prompt가 토끼 이미지로 수정된 것을 볼 수 있다.

<br/>

### Linux에서 전역 환경 변수 영구 적용

![Untitled 35](https://user-images.githubusercontent.com/70310271/166244482-37047d6e-69aa-4f9c-8013-1346e901c721.png)

간단하다. profile이란 파일을 수정해주면 된다!

root/etc/profile 는 읽기전용 이므로 권한을 전체로 바꿔준다.

![Untitled 36](https://user-images.githubusercontent.com/70310271/166244503-dde62892-04ae-482a-908c-868d86a7aa91.png)

nano로 profile을 연 뒤, Alt + /로 맨 마지막 줄로가서 위의 전역 환경 변수를 설정해주면 끝이다.

![제목_없음](https://user-images.githubusercontent.com/70310271/166244554-5a96fdaa-838f-44e5-9b62-227e5641e8ff.png)

<br/>

### export 키워드

![Untitled 37](https://user-images.githubusercontent.com/70310271/166244574-65658aab-b000-4e1c-87c7-732b71b03c2a.png)

export 키워드를 사용하면 환경변수의 이름과 값 목록을 확인할 수 있다.
