## AWS EC2 (Ubuntu)로 SpringBoot 서버 배포하기

1. 상단에 EC2를 검색한다.

![Untitled](https://user-images.githubusercontent.com/70310271/188684637-6ea7caef-4631-4245-8e43-86bba1c30321.png)

2. 인스턴스 시작 버튼을 누른다.

![Untitled 1](https://user-images.githubusercontent.com/70310271/188684680-0b849fd5-ff41-45ec-a926-8be7de124f7a.png)

3. 운영체제를 선택한다.

![Untitled 2](https://user-images.githubusercontent.com/70310271/188684705-58c60714-de87-441c-8552-d49b158899d2.png)

Ubuntu 22.04 LTS(최신)으로 설정한다.

4. 인스턴스 유형 선택

![Untitled 3](https://user-images.githubusercontent.com/70310271/188684723-45a67121-3e0f-4a42-b06c-985f13a1c492.png)

프리티어를 사용하기위해서 t2.micro로 설정

5. 키페어 설정
    
![Untitled 4](https://user-images.githubusercontent.com/70310271/188684758-cf389fa1-09ba-4c91-b45a-fead760ba0a3.png)

키페어 이름에 이름을 넣는다 그리고 Putty를 사용할것이기 때문에 키페어 ppk로 설정한다.

6. 보안 그룹 규칙 추가

![Untitled 5](https://user-images.githubusercontent.com/70310271/188684831-0b8e5763-e5b3-4ee5-8ed8-6df626a9c9dd.png)

가장 아래에 있는 보안 그룹 규칙 버튼 누르기

![Untitled 6](https://user-images.githubusercontent.com/70310271/188684856-294dc399-8952-4751-b5c8-5769d069d975.png)

Putty SSH 사용을 위해 22포트, HTTP를 위해 80, HTTPS를 위해 443 , Tomcat을 위해 8080포트를 열어준다.

![Untitled 7](https://user-images.githubusercontent.com/70310271/188684877-da27ff03-0e9c-414d-a574-5bc05ae5f82b.png)

7. 설정을 끝마치고 인스턴스 시작 버튼을 누른다.

![Untitled 8](https://user-images.githubusercontent.com/70310271/188684897-3b1c2ebc-499a-4303-a91e-cf66182c7e19.png)

![Untitled 9](https://user-images.githubusercontent.com/70310271/188684923-871670ba-2fb5-4e71-b8e4-ede42caee3aa.png)

8. 새로 생긴 EC2 인스턴스 ID 클릭

![Untitled 10](https://user-images.githubusercontent.com/70310271/188684951-b7a1751c-d0e6-42c1-b1d5-9b78b8d9cc14.png)

![Untitled 11](https://user-images.githubusercontent.com/70310271/188684967-cf21327c-4fc7-4534-875a-bf6495c6e7f7.png)

연결을 눌러서 들어감 SSH 클라이언트를 눌러 그대로 따라하면된다.

9. Host Name에 EC2를 생성하며 부여받은 EC2 Public DNS 넣기

![Untitled 12](https://user-images.githubusercontent.com/70310271/188684983-73ae9210-e373-49e3-ae07-77dd3255a870.png)

10. Putty Category중 Connection - SSH - Auth에 있는 Private key file for authentication에 SSH아까 받아두었던 .ppk 파일을 삽입한다.

![Untitled 13](https://user-images.githubusercontent.com/70310271/188685004-c5cd3671-adc7-4f13-a868-a9741cb5ee41.png)

11. Open 클릭후 이 컴퓨터를 보증된 컴퓨터로 만들기 위해 Accept누른다.
    
![Untitled 14](https://user-images.githubusercontent.com/70310271/188685056-5fee0f3e-2657-4250-aea6-135ac508a9fc.png)

12. Putty로 AWS EC2에 잘 접속된 화면이다.
    
![Untitled 15](https://user-images.githubusercontent.com/70310271/188685093-f0a975eb-090b-402f-8bdc-b95f39b4e952.png)

13. 클론 해올때 Username for 문제 해결하기

![Untitled 16](https://user-images.githubusercontent.com/70310271/188685117-773fc642-c276-4429-b010-09c8e5d03756.png)

`중요!`

github의 아이디가 이메일이라면, Password 입력란에 이메일이 [http://{아이디}@{메일}@{메일](http://아이디@메일@메일)}.com 형태가 되어서 잘못 되었다고 생각할 수 있는데, 실제로 아이디가 이메일 이라면 아래와 같은 형태는 잘 입력한것이니 걱정하지말자.

![Untitled 17](https://user-images.githubusercontent.com/70310271/188685134-a02757f5-bece-4c40-8b31-3bffe487965f.png)

14. 클론 해올때 Password for 문제 해결하기

원인 ) 아이디의 비밀번호와 토큰 비밀 번호의 착각 비밀번호를 입력하는데 설명이 없어 꽤나 고생했다.

해결 ) 여기서 요구하는 비밀번호는 내 아이디의 비밀번호가 아니라 토큰 비밀번호이다.

![Untitled 18](https://user-images.githubusercontent.com/70310271/188685153-92f0c7de-738a-472c-a1f9-d9c1dc16a9ef.png)

![Untitled 19](https://user-images.githubusercontent.com/70310271/188685177-1047bf4b-790f-413b-8fc8-a2ec6cd3acb7.png)

![Untitled 20](https://user-images.githubusercontent.com/70310271/188685285-babbcd54-fea2-458a-a6c3-d9216c8c1f71.png)

Github의 Settings - Developer settings - Personal access tokens에 가서 토큰을 발행할 수 있는데 여기서 생성한 토큰값이 Password가 된다.

Clone을 잘 받아오는것을 확인할 수 있다.

![Untitled 21](https://user-images.githubusercontent.com/70310271/188685306-a8518511-ac34-4932-abf9-b300a74458a0.png)

15. Java SpringBoot 파일로 가서 build하기 

![Untitled 22](https://user-images.githubusercontent.com/70310271/188685328-5d58e11a-2b7f-4919-b47a-9543bc1b70f6.png)

`중요 !`

![Untitled 23](https://user-images.githubusercontent.com/70310271/188685341-6680fa9a-c578-4b08-bb20-88e2a24c84b4.png)

여기서 ./gradlew build를 실행시켜 빌드를 진행한다.

권한을 주고 실행하기 위해 sudo를 붙여주고 실행을 시켜도 “command not found”오류가 발생한다.

원인) 이는 “gradlew” 파일에 실행 권한이 없기 때문에 발생하는 오류이다.

해결) 권한을 주는 명령어인 chmod 를 사용해 실행권한을 줌으로써 처리한다.

![Untitled 24](https://user-images.githubusercontent.com/70310271/188685392-1f872204-b06d-43f4-b7a3-33a02ce64007.png)

실행가능하므로 gradlew의 색깔이 초록색으로 바뀌었다.

이제 Build를 실행하면 끝이므로 한번 시도해보자

![Untitled 25](https://user-images.githubusercontent.com/70310271/188685406-4ae3607d-47b5-4221-8343-d0f0b4b404d9.png)

./gradlew build를 실행하니 bad interpreter오류가 발생한다.

원인 ) 윈도우에서 실행할때 사용되었던 각 행의 개행표시가 Ubuntu로 넘어오면서 ^M로 변했는데, 이는 인터프리터가 해석할 수 없으므로 발생하는 오류이다.

파일을 읽어보기 위해 “vi -b gradlew”로 살펴보니 모두 ^M이 붙어있는걸 확인할 수 있다.

![Untitled 26](https://user-images.githubusercontent.com/70310271/188685419-f756cb28-5f9a-4bb7-a803-fe14a0bf17b5.png)

해결 ) “%s/^M//g”
“%s/{변환 전 글자}/{변환 후 생성될 글자}/g”

`주의할점 !` 이때 ^M은 Shift+6에 있는 특수문자가 아니라, Ctrl + V를 눌러서 나오는 꺽쇄표시이다.

즉, Ctrl + V 를 누른 후 Ctrl + M을 눌러야만 나오는 표시라는걸 반드시 알고 있어야 해결할 수 있다.

![Untitled 27](https://user-images.githubusercontent.com/70310271/188685439-817d374b-f303-4017-93d3-a6f2d22ad510.png)

깔끔하게 사라진것을 확인할 수 있다. 이후 :wq로 저장하고 종료하면 된다.

이제 실행해보자

이번에도 빌드가 안된다. JAVA_HOME 환경변수가 없어서 안되는것이다.

원인 ) 이는 사실상 AWS에 Java JDK가 아예 설치가 되어있지 않기 때문이다.

![Untitled 28](https://user-images.githubusercontent.com/70310271/188685459-0a4c0172-40b0-44ee-8d36-7e6e7a13ac47.png)

해결 ) Java JDK를 설치해주면 끝난다.

sudo apt-get update

sudo apt-get install openjdk-17-jre

![Untitled 29](https://user-images.githubusercontent.com/70310271/188685481-df4306af-df57-42cc-8470-ae6918d5d686.png)

![Untitled 30](https://user-images.githubusercontent.com/70310271/188685505-baf5430b-b6f0-46ea-be47-bbd15f8c006b.png)

![Untitled 31](https://user-images.githubusercontent.com/70310271/188685518-da0d6f35-043e-47e3-866e-126849f801e2.png)

다 설치되고 실행시켜보자.

![Untitled 32](https://user-images.githubusercontent.com/70310271/188685536-f6eed223-db29-4d98-b07c-fa26985d4314.png)

잘 진행되는걸 확인할 수 있다.

하지만 또 오류가 발생한다.

![Untitled 33](https://user-images.githubusercontent.com/70310271/188685561-01d5ad19-5ef3-414f-bdd5-742a1d99b247.png)

4분째, 76%에서 늘어나지 않는다. 그리고 키보드 입력도 거의 1분에 하나 꼴로 들어간다.

원인 ) 이는 t2.micro 인스턴스의 RAM이 967MB밖에 되지 않는데, 다 써버려서 그렇다.

![Untitled 34](https://user-images.githubusercontent.com/70310271/188685576-4d44d562-2994-4a7e-bec6-1af0ec074815.png)

해결 ) “sudo dd if=/dev/zero of=/swapfile bs=128M count=16”

1. dd 명령어로 128MB씩 16개로 RAM을 2GB로 swap 메모리를 할당한다.
2. “sudo chmod 600 /swap”으로 읽기 및 쓰기 권한을 업데이트한다.
3. “sudo mkswap /swapfile” 명령어로 Linux 스왑 영역을 설정한다.
4. “sudo swapon /swapfile” 명령어를 사용하여 스왑 공간에 스왑 파일을 추가하여 스왑파일을 즉시 사용 할 수 있도록 만든다.
5. “sudo swapon -s” 명령어를 사용하여 swap 영역을 확인한다.
    
![Untitled 35](https://user-images.githubusercontent.com/70310271/188685592-f244bca2-9595-4bbe-97a2-e0786e206c44.png)
    
6. sudo vi /etc/ffstab파일을 열어 서버를 재부팅할 경우 SWAP을 자동으로 활성화 해주도록 설정한다. “/swapfile swap swap defaults 0 0

![Untitled 36](https://user-images.githubusercontent.com/70310271/188685604-ac11e3e1-af37-4c15-ad18-8bf959d2c5bb.png)

`주의할 점!` 

HDD에 할당하기 때문에 RAM과 비교해서 속도가 느리다.

프리티어에서는 멈추는걸 방지하기 위해 거의 필수적인 설정이 될 수 있다.

다시 한번 실행시켜보자.

![Untitled 37](https://user-images.githubusercontent.com/70310271/188685618-5393c427-14ed-4cfa-941a-9c764c4c2ad6.png)

잘 실행되고 빌드까지 마무리가 잘되는것을 볼 수 있다.

17. jar파일 실행시키기

![Untitled 38](https://user-images.githubusercontent.com/70310271/188685631-a81ddf75-bcda-4021-85ef-a9b28157869f.png)

SpringBoot 파일의 build/libs경로에 있는 “server-0.0.11-SNAPSHOT.jar”파일을 볼수 있는데 이를 “java -jar server-0.0.1-SNAPSHOT.jar”로 실행시키면 된다.

![Untitled 39](https://user-images.githubusercontent.com/70310271/188685662-36e1994a-4451-4407-abb8-48cc1c51bbc2.png)

이렇게 잘 배포 되는것을 확인할 수 있고

18. 배포 된것 확인하기

![Untitled 40](https://user-images.githubusercontent.com/70310271/188685677-d53b2ba3-b4ce-400c-a630-633a875bc581.png)

SpringBoot 내장 톰캣의 기본포트인 8080포트로도 잘 접속이 되는것을 확인 할 수 있다.

### 원하는 Profile로 실행시키고 싶을때.

./gradlew bootRun --args='--spring.profiles.active=dev'

### 서버환경 변수 설정

RDS와 함께 AWS Parameter Store를 사용하면 된다.
