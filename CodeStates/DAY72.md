# DAY72

서비스가 규모가 복잡해지고 커질수록, 서비스를 배포하는 과정이 복잡해지고 소요되는 시간이 늘어난다.

서비스 변경사항이 생길때마다, 배포 과정을 매번 수동으로 진행하지 않고, 자동으로 진행되게 만드는법을 배운다.

- 학습목표

배포 자동화의 정의와 이점에 대해 설명할 수 있다.

배포 파이프라인이 무엇인지 정의할 수 있다.

파이프라인을 구성하는 단계(Stages)와 작업(Actions)에 대해 설명할 수 있다.

AWS 개발자 도구를 활용하여 파이프라인을 구축할 수 있다.

배포 자동화 파이프라인 구축과정에서 문제가 발생할 경우, log파일과 공식 문서를 통해 해결할 수 있다.

AWS에서 제공하는 IAM서비스를 이해하고 사용할 수 있다.

- 그룹, 사용자, 정책, 역할의 차이점과 특징에 대해서 이해할 수 있다.
- IAM 정책에 대해 이해하고 특정 주체에게 권한을 부여할 수 있다.
- IAM 보안 모범사례에 대해 찾아보고, 서비스를 이용하며 적용할 수 있다.

### 배포 자동화란?

한번의 클릭 혹은 명령어 입력을 통해 전체 배포과정을 자동으로 진행하는것을 뜻한다.

- 왜 필요한가?

수동적이고 반복적인 배포과정을 자동화함으로써 시간이 절약된다.

휴먼에러(Human Error)를 방지할 수 있다.

### 배포 자동화 파이프라인

![Untitled](https://user-images.githubusercontent.com/70310271/183131512-cee9da22-65e6-43b0-90b5-a634456a8390.png)

- 배포에서 파이프라인이란?

소스 코드의 관리부터 실제 서비스로의 배포과정을 연결하는 구조

1. Source단계

원격저장소에 관리되고 있는 소스코드에 변경사항이 일어날 경우, ㅇ를 감지하고 다음 단계로 전달하는 작업을 수행한다.

1. Build단계

Source 단계에서 전달받은 코드를 컴파일, 빌드, 테스트하여 가공한다.

또한 Build단계를 거쳐 생성된 결과물을 다음 단계로 전달하는 작업을 수행한다.

1. Deploy단계

Build 단계로부터 전달받은 결과물을 실제 서비스에 반영하는 작업을 한다.
파

중요!

파이프라인의 단계는 상황과 필요에 따라 더 세분화되거나 간소화될 수 있다.

### AWS 개발자 도구

### CodeCommit

Source단계를 구성할 때 사용하는 서비스

버전관리도구이다.

Github보다 보안이 강력하다. 소스코드의 유출이 크게 작용하는 기업에서 매우 중요하고 과금 가능성을 고려해야해서

사이드 프로젝트나 가볍게 작성한 소스코드를 저장해야할 경우 Github을 이용하는것이 효과적이다.

### CodeBuild

Build단계에서는 CodeBuild 서비스를 이용한다.

CodeBuild 서비스를 통해 유닛 테스트, 컴파일, 빌드와 같은 빌드 단계에서 필수적으로 실행되어야 할 작업들을 명령어를 통해 실행할 수 있다.

### CodeDeploy

CodeDeploy는 실행되고 있는 서버 애플리케이션에 실시간으로 변경 사항을 전달할 수 있다.

또한 S3 서비스의 버킷을 통해 업로드된 정적 웹 사이트에 변경사항을 실시간으로 전달하고 반영할 수 있다.

### EC2 인스턴스에 태그와 역할 부여

태그를 추가하는 이유는 후에 있을 파이프라인 구축 단계에서 인스턴스를 잘 식별하기 위함이다.

역할(Role)은 AWS의 개체(서비스, 사용자 등)가 다른 서비스에 접근하게 할 수 있도록 해주는 방법이다.

EC2 인스턴스에 역할을 부여함으로써 다른 AWS 서비스를 호출할 수 있는 권한을 가진다.

신뢰 관계를 편집해줍니다. 신뢰 관계란, 해당 역할을 취할 수 있는 서비스나 사용자를 명시하는 부분입니다.

앞서 access 정책 부여를 통해 역할을 생성해주었지만, access 할 수 있는 서비스를 신뢰 관계에서 명시함으로써 역할이 확실히 완성됩니다.

### EC2를 활용한 파이프라인 구축

![Untitled 1](https://user-images.githubusercontent.com/70310271/183131537-1bf7e684-9742-4909-bfa7-3123c88955d6.png)

appspec.yml은 배포 자동화를 도와주는 CodeDeploy-Agent가 인식하는 파일입니다.

![Untitled 2](https://user-images.githubusercontent.com/70310271/183131560-8f001149-751e-4520-b0a2-60f3b537b475.png)

buildspec.yml은 배포 자동화에서 빌드를 담당하는 CodeBuild-Agent가 인식하는 파일입니다.

![Untitled 3](https://user-images.githubusercontent.com/70310271/183131573-8e8f89cd-929d-4ae4-8d42-4632dbf5994e.png)

initalize.sh

![Untitled 4](https://user-images.githubusercontent.com/70310271/183131590-66a083b1-6d43-4313-879f-8aca1e0c329c.png)

server_clear

![Untitled 5](https://user-images.githubusercontent.com/70310271/183131608-adfb65ef-a401-4452-9cac-97daefe74fd3.png)

server_start

![Untitled 6](https://user-images.githubusercontent.com/70310271/183131624-c8b23793-f9f6-43c1-927f-eff04f789f41.png)

server_stop

각 파일은 appspec.yml 파일이 구성하고 있는 배포 수명 주기에 따라서 실행될 예정이다.

### Github Actions란?

GitHub Actions은 Github가 공식적으로 제공하는 빌드, 테스트 및 배포 파이프라인을 자동화 할 수 있는 CI/CD 플랫폼이다.

레포지토리에서 Pull Request나, Push 같은 이벤트를 트리거로 GitHub작업 워크플로를 구성할 수 있다.

워크 플로우는 하나 이상의 작업이 실행되는 자동화 프로세스로, 각 작업은 자체 가상 머신 또는 컨테이너 내부에서 실행된다.

### Github Actions Deploy Flow

![Untitled](https://user-images.githubusercontent.com/70310271/183465039-df21fb07-2fc4-4d5c-8ce4-7d5fd71efbc3.png)

### Github Actions

Github Actions은 설정 파일(.yml)에 따라 Github Repoisotry에 특정 변동사항을 트리거로 작동됩니다.

### S3

S3를 Github Actions를 통한 배포 자동화에서는 저장소로써 사용한다.

Github Actions에서 빌드한 결과물이 압축되어 S3으로 전송되고 버킷에 저장된다.

### Code Deploy

Github Actions에서 배포 명령을 받은 Code Deploy는 S3에 저장되어있는 빌드 결과물을 EC2 인스턴스로 이동한다.

프로젝트 최상단에 위치한 appspec.yml 설정 파일에 의해 쉘 스크립트등 단계에 따라 특정 동작을 한다.

Code Deploy가 S3 버킷에서 EC2인스턴스로 이동할수 있도록 EC2 인스턴스에 Code Deploy Agent의 설치가 필요하다.

### EC2

Code Deploy에 의해 빌드과정을 거친 프로젝트가 EC2 인스턴스로 전달되고 .yml파일과 .sh에 의해 각 배포 결과를 로그로 저장하며 .jar를 실행한다.

### Java with Gradle



AWS Session에서 확인

![Untitled 1](https://user-images.githubusercontent.com/70310271/183465075-7ad4a37e-091a-451f-a3a7-50ecd1b66f26.png)

![Untitled 2](https://user-images.githubusercontent.com/70310271/183465103-d51d0f41-e9fe-4363-aad0-72676f7b554f.png)

![Untitled 3](https://user-images.githubusercontent.com/70310271/183465118-06c97439-083e-41e8-b17a-26cb1152b4fe.png)

들어가지는것 까지 확인
