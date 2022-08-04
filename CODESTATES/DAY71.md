# DAY71

학습목표

- 컨테이너 기술이 무엇인지, 도커가 왜 필요한지 알 수 있다.
- 컨테이너와 이미지, 레지스트리가 무엇인지 이해할 수 있다.
- 대표적인 레지스트리인 Docker Hub에서 이미지를 검색하고, 사용할 수 있다.
- 한 개의 이미지를 이용해서 컨테이너를 구축할 수 있다.
- 두 개 이상의 이미지를 이용해서 컨테이너를 구축하고 서로가 어떻게 연결되는지 알 수 있다.
- Docker CLI에서 명령어를 사용해서 이미지를 생성/수정/배포하고, 컨테이너를 생성/삭제 할 수 있다.

### 왜 Docker를 사용하는가?

의존성 충돌을 제거하기 위해서 시작한다.

- 개발과 배포환경을 일치시킨다.
- 수평확장을 쉽게해준다.
- 각 서버에 새로운 내용을 배포하기 쉽게 만들어준다.

### 컨테이너는 무엇을 격리하고, 어떤 자원들을 독립적으로 소유하는가?

1. 프로세스

특정 컨테이너에서 작동하는 프로세스는 기본적으로 그 컨테이너 안에서만 액세스 할 수 있다.

컨테이너 안에서 실행되는 프로세스는 다른 컨테이너의 프로세스에게 영향을 줄 수 없다.

1. 네트워크

기본으로 컨테이너 하나에 하나의 IP주소가 할당된다

1. 파일 시스템

컨테이너 안에서 사용되는 파일시스템은 구획화 되어있다.

해당 컨테이에서의 며령이나 액세르 제공할 수 있다.

서비시 제공자들은 트래픽 분산을 위해 프록시 서버를 운영하며, 프록시 서버는 여러대의동일한 검색 서버중 한군데를 이용하도록 돕는다.

(이러한 서버를 리버스 프록시의 한 종류인 ‘로드 밸런서’라고 부른다.)

![Untitled](https://user-images.githubusercontent.com/70310271/182889569-00ba10e4-56c8-40cc-b281-c000c3c832c5.png)

“동일한 서비스가 여러 컴퓨터에서 작동한다”라는 말에 도커의 필요성을 느낀다면, 도커를 이해한것이다.

![Untitled 1](https://user-images.githubusercontent.com/70310271/182889587-604a91ef-4772-4515-b5c2-3224ea8330d3.png)

쿠버네티스와 같이 “오케스트레이션 도구”라고 부르는것들이 이러한 일을 해주는 도구이다.

## 용어정리

### 컨테이너

애플리케이션이 의존성, 네트워크 환경, 파일 시스템에 구애받지 않고, 도커라는 기술위에 실행될 수 있도록 만든 애플리케이션 상자이다.

### 이미지

실행되는 모든 컨테이너는 이미지로부터 생성이된다. 이미지는 애플리케이션 및 애플리케이션 구성을 함께 담아놓은 템플릿으로 즉시 컨테이너를 생성할 수 있다.

이미지를 이용해 여러개의 컨테이너를 생성할 수 있다.

이를 이용해 애플리케이션의 수평확장이 가능하다.

이미지는 base image로 부터 변경사항을 추가/커밋해서 또다른 이미지를 만들수도 있다.

### 레지스트리

이미지는 레지스트리에 저장된다. 대표적인 레지스트리로는 Docker Hub, Amazon ECR이 있다. 도커 CLI에서 이미지를 이용해 컨테이너를 생성할 때, 호스트 컴퓨터에 이미지가 존재하지 않는다면, 기본 레지스트리로부터 다운로드 받게 된다.

### 도커의 이미지 구분

```java
Registry_Account/Repository_Name:Tag

ex)
docker/whalesay:latest
```

### Registry

도커 이미지를 관리하는 공간

특별히 지정하지 않으면, Docker Hub를 기본으로 설정

### Repositry

레지스트리 내에 도커 이미지가 저장되는 공간

이미지 이름이 사용되기도 한다.

Github의 레포지토리와 유사하게 생각하면 된다.

## Tag

같은 이미지라고 할지라도 버전 별로 안의 내용이 다를 수 있다.

해당 이미지를 설명하는 버전 정보를 주로 입력한다.

도커 이미지 설치

![Untitled 2](https://user-images.githubusercontent.com/70310271/182889617-bf765a0e-e4e4-4307-b546-987dd4433b91.png)

도커 컨테이너 실행

![Untitled 3](https://user-images.githubusercontent.com/70310271/182889629-dd8236f8-e993-407b-8734-2c6c4e464a0b.png)

![Untitled 4](https://user-images.githubusercontent.com/70310271/182889646-6839e5e9-a417-4a6b-a4d2-d8f280e84db6.png)

모든 컨테이너 리스트 출력

도커 컨테이너 삭제

![Untitled 5](https://user-images.githubusercontent.com/70310271/182889662-9dd3be5c-18eb-4079-b097-884ca4326bb0.png)

삭제된것 확인하기

![Untitled 6](https://user-images.githubusercontent.com/70310271/182889679-229adf88-89ab-4fcf-9adc-7be6c3239145.png)

docker 이미지 지우기

![Untitled 7](https://user-images.githubusercontent.com/70310271/182889695-a65894bf-79a9-4404-bc39-c3bc2b8451ea.png)

### Docker 컨테이너에 파일을 복사하기

로컬에 있는 파일과 도커 이미지를 연결하는 방법은 크게 CP(Copy)를 이용하는 방법과 Dockcer Volume 기능을 이용하는 방법으로 나뉜다.

CP(Copy) : 호스트와 컨테이너 사이에 파일을 복사(Copy)

Volume : 호스트와 컨테이너 사이에 공간을 마운트(Mount)

마운트는 저장 공간을 다른 장치에서 접근 할 수 있도록 경로를 허용해서, 마치 하나의 저장 공간을 이용하는것처럼 보이게 하는 작업을 말한다.

docker container cp 명령어를 사용해서 로컬호스트에 있는 파일을 컨테이너에 전달한다.

```java
//src/main/resource/template
docker container cp ./ 컨테이너_이름:/usr/local/apache2/htdocs/

//src/main/resource/static
docker container cp ./ 컨테이너_이름:/usr/local/apache2/htdocs/
```

### Docker 이미지 만들기

docker cotainer commit을 사용

```java
docker container commit 컨테이너_이름 my_pacman:1.0
```

### Docker Image 빌드를 위한 파일인 Dockerfile로 만드는 방법

실무에서는 Dockerfile을 많이 사용한다.

Dockerfile

```java
FROM httpd:2.4
COPY ./ /usr/local/apache2/htdocs/
```

이렇게 명령어들을 넣어주고

```java
docker build --tag 이미지이름 .
```

이후 생성된 이미지를 실행해보면 된다.

```java
docker run --name 컨테이너이름 -p 포트:80 이미지이름
```
