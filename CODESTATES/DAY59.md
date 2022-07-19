## 애플리케이션 빌드 / 실행 / 배포

### Intellij 를 이용한 빌드

![Untitled](https://user-images.githubusercontent.com/70310271/179764506-f428c59d-55c0-4177-952b-2d0493153aca.png)

1. build 테스크를 실행하면 :assemsble, : check와 같이 Gradle에서 빌드와 관련된 모든 task들을 실행시킨다. 이외에 plain Jar 파일 하나를 더 생성한다.

1. BootJar는 빌드와 관련된 모든 task들을 실행하는것이아니라, 애플리케이션의 실행가능한 Jar파일을 생성하기 위한 task만 실행한다. 단순히 Executable Jar파일만 필요하다면 BootJar task만 실행하면 된다.

![Untitled 1](https://user-images.githubusercontent.com/70310271/179764528-9148a557-ddaa-4667-bdfb-c91d29161609.png)

### Gradle Task를 이용한 빌드

1. Windows 터미널의 경우

![Untitled 2](https://user-images.githubusercontent.com/70310271/179764542-4a3f8af9-0b23-439d-8ab5-cf0092041075.png)

1. Git Bash를 활용한 경우

![Untitled 3](https://user-images.githubusercontent.com/70310271/179764557-76e6498a-5587-46eb-a22f-aeede46b3e99.png)

### 애플리케이션 실행

java -jar 파일명.jar

![Untitled 4](https://user-images.githubusercontent.com/70310271/179764587-79db5f39-14e1-4767-829c-f945adcb2567.png)

서버 환경에서 실행시킬 수 있음 !

### 프로파일 적용

![Untitled 5](https://user-images.githubusercontent.com/70310271/179764610-f1f172f7-913f-4d5d-8cca-3645aeebc1fa.png)

애플리케이션을 실행시키면, 프로파일을 적용하든 그렇지 않든 application.yml 파일에 설정된 정보는 항상 읽어온다.

그런데 현재 application.yml파일에 H2관련 설정들이 존재하지 않기 때문에 H2 콘솔이 정상적으로 작동하지 않는다.

프로파일을 어떻게 적용하는가?

### Intellij 환경에서의 실행

![Untitled 6](https://user-images.githubusercontent.com/70310271/179764635-24c6268d-acc3-4ebb-8fef-41425bcb5b4c.png)

![Untitled 7](https://user-images.githubusercontent.com/70310271/179764656-f4da31b2-6e9d-4443-9f26-44a19b4c814d.png)

### Gradle Task 환경에서의 실행

`$ java -jar section3-week4-build-0.0.1-SNAPSHOT.jar --spring.profiles.active=local`

![Untitled 8](https://user-images.githubusercontent.com/70310271/179764686-fe20b93f-882d-4663-a40d-bdf3574120fa.png)

The following 1 profile is active : local 로 작동한다.

## 애플리케이션 배포

### 전통적인 배포방법

scp, sftf 같은 표준 유닉스 툴을 이용해서 서버로 간단히 전송하는것

### 클라우드 서비스를 위한 배포방법

1. Pass(Platform as as Service)

ex) Cloud Foundry, Heroku

1. Iaas(Infrastructure as a Service)

ex) AWS Elastic Beanstalk, AWS Container Registry, AWS Code Deploy, Azure Spring Cloud, Azure App Service

1. CI/CD

ex)Github Actions, Circle CI

### MYSQL에 연동하기

1. MYSQL dependecies 추가해주자

![Untitled 9](https://user-images.githubusercontent.com/70310271/179764718-e5726fa2-2d3e-4c91-9f34-f40747dc450c.png)

```html
implementation ‘mysql:mysql-connector-java’
```

application.yml파일도 설정해주자!

서버와 로컬환경에서 따로 만들어서 application-server.yml 사용하게끔 한다.

![Untitled 10](https://user-images.githubusercontent.com/70310271/179764763-d1765308-0a7c-430c-b0d2-1be2605a6554.png)

datasource 아래의 내용을 추가해주고 빌드한다.

![Untitled 11](https://user-images.githubusercontent.com/70310271/179764792-a1a1901a-5c22-48b2-8259-8a1b9d62a03f.png)

Postman으로 POST API 요청 보내기

![Untitled 12](https://user-images.githubusercontent.com/70310271/179764819-eebe3d0a-ec1b-4d33-afff-5f24ba9ae6b5.png)

데이터베이스가 POST 요청을 받은것을 확인할 수 있다.

![Untitled 13](https://user-images.githubusercontent.com/70310271/179764848-7928eb59-39f5-4d75-be74-030971633a60.png)

데이터가 잘 들어가는것을 확인 할 수 있다.
