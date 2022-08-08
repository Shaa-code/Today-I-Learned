### Github Actions란?

GitHub Actions은 Github가 공식적으로 제공하는 빌드, 테스트 및 배포 파이프라인을 자동화 할 수 있는 CI/CD 플랫폼이다.

레포지토리에서 Pull Request나, Push 같은 이벤트를 트리거로 GitHub작업 워크플로를 구성할 수 있다.

워크 플로우는 하나 이상의 작업이 실행되는 자동화 프로세스로, 각 작업은 자체 가상 머신 또는 컨테이너 내부에서 실행된다.

### Github Actions Deploy Flow

![Untitled](https://user-images.githubusercontent.com/70310271/183462102-f9c62564-35ad-4ed9-9c29-97c6a5d8df95.png)

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

![Untitled 1](https://user-images.githubusercontent.com/70310271/183462118-c04bc018-1b93-4582-bf08-6037740092c6.png)

AWS Session에서 확인

![Untitled 2](https://user-images.githubusercontent.com/70310271/183462130-5097dea6-27a3-4d02-b356-c38f995b41de.png)

![Untitled 3](https://user-images.githubusercontent.com/70310271/183462147-38f6ca93-ccf1-4471-85d0-98678d5d55cd.png)

들어가지는것 까지 확인
