### 프록시서버

클라이언트와 서버가 소통할 때, 서버에 바로 접근하지 않고 자신을 통해 서버에 접근할 수 있도록 해주는 일종의 대리서버이다.

- 왜 사용하는가?

지역이 제한되어있는 서비스를 이용하기 위해 우회하거나, 캐시를 통해 더 빠른 이용을 하기 위해 프록시 서버를 사용한다.

### 프록시의 종류

1. Forward Proxy

클라이언트 가까이 위치한 프록시서버로 클라이언트를 대신해 서버에 요청을 전달한다.

![Untitled](https://user-images.githubusercontent.com/70310271/183692466-833bf515-7666-4b70-9d60-3bbe026b762f.png)

- 장점
1. 캐싱을 통해 빠른 서비스를 이용할 수 있다.

여러 클라이언트가 동일한 요청을 보내는 경우 첫 응답을 하며 결과 데이터를 캐시에 저장해놓고, 이후 서버에 재요청을 보내지 않아도 다른 클라이언트에게 빠르게 전달할 수 있다.

1. 보안

클라이언트에서 프록시 서버를 거친 후 서버에 요청이 도착하기 때문에, 서버에서 클라이언트의 IP추적이 필요한 경우 클라이언트의 IP가 아닌 프록시 서버의 IP가 전달된다. 서버에게서 클라이언트를 숨길 수 있다.

1. Reverse Proxy

서버 가까이에 위치한 프록시 서버로 서버를 대신해서 클라이언트에 응답을 제공한다.

![Untitled 1](https://user-images.githubusercontent.com/70310271/183692538-bc3d0dcc-77cf-4408-9967-e1bf4e901552.png)

- 장점
1. 분산처리

사용자가 많아져 서버에 과부하가 올 경우를 위해 부하를 분산할 수 있다.

프록시서버에 요청이 들어오면 여러대의 서버로 요청을 나누어 전달 후 처리한다.

1. 보안

Forward Proxy와 반대로 클라이언트에게 서버를 숨길 수 있다. 클라이언트 입장에서의 요청보내는 서버가 프록시 서버가 되므로 실제서버의 IP주소는 노출되지 않는다.

## 로드밸런서

하나의 서버에 너무 잦은 요청을 보낸다면 서버에는 과부하가 오게 된다.

- 해결방법

### Scale-Up

물리적으로 서버의 사양을 높이는 하드웨어적인 방법

### Scale-Out

서버의 갯수를 늘려 하나의 서버에 줄 부하를 분산시키는 방법

비교적 저렴한 방법으로 부하를 처리할 수 있다.

여러 서버중 어느 서버에서 보내서 처리해야할까? 요청을 여러서버에 나눠 처리할 수 있도록 교통 정리를 해줄 역할이 필요하다.

이 역학을 로드 밸런서가 하고, 여러 서버에 교통정리를 해주는 기술 혹은 프로그램을 로드 밸런싱이라고 부른다.

### 로드밸런서의 종류

| 로드 밸런서의 종류 | 로드밸런싱의 기준 |
| --- | --- |
| L2 | 데이터 전송 계층에서 Mac주소를 바탕으로 로드 밸런싱을 한다. |
| L3 | 네트워크 계층에서 IP 주소를 바탕으로 로드 밸런싱 한다. |
| L4 | 전송 계층에서 IP주소와 Port를 바탕으로 로드 밸런싱 한다. |
| L7 | 응용 계층에서 클라이언트의 요청을 바탕으로 로드 밸런싱한다. |

## Auto Scaling

개발자가 직접 라이브로 지켜보며 수동으로 서버를 증설해야한다면 너무나 번거롭고 갑작스럽게 발생한 문제에 대처하기도 한계가 있다.

클라이언트의 요청이 마낳아져 서버의 처리 요구량이 증가하면 새 리소스를 자동으로 추가하고 반대로 처리 요구량이 줄어들면 리소스를 감소시켜 적절한 분산 환경을 만들어준다.

- 장점
1. 동적 스케일링(Scale Up)

사용자의 요구 수준에 따라 리소스를 동적으로 스케일링 할 수 있다는점.

1. 로드 밸런싱(Scale Out)

다수의 EC2 인스턴스에게 워크로드를 효과적으로 분배할 수 있어 사용자가 정의한 규칙에 따라 워크로드를 효과적으로 관리할 수 있다.

1. 타겟 트래킹

특정 타겟에 대해서만 Auto Scaling을 할 수 있으며, 사용자가 설정한 타겟에 맞춰 EC2 인스턴스의 수를 조정한다.

1. 헬스 체크와 서버 플릿 관리

EC2 인스턴스의 헬스 체크 상태를 모니터링 할 수 있다.

헬스 체크를 하는 과정에서 특정 인스턴스의 문제가 감지되면,

자동으로 다른 인스턴스로 교체한다.

다수의 EC2서버에서 애플리케이션을 호스팅하는 경우, EC2 서버 집합을 AWS는 서버 플릿(Fleet)이라고 부른다.

### EC2 Auto Scaling 활용

Auto Scaling으로 인스턴스를 확장 또는 축소하려면 어떤 서버를 사용할지 결정하는데 이는 시작 템플릿을 통해 가능하다.

시작 템플릿은 AMI 상세정보, 인스턴스 타입, 키 페어, 시큐리티 그룹등 인스턴스에 대한 모든 정보를 담고 있다.

만약 시작템플릿을 사용하고 있지 않고 시작 템플릿을 생성하지 않으려는 경우에는 대신 시작 구성을 생성할 수 있다.

시작 구성은 EC2 Auto Scaling이 사용자를 위해 생성하는 EC2 인스턴스 유형을 지정한다는 점에서 시작 템플릿과 비슷하다.

### Auto Scaling 그룹 생성

Auto Scaling 그룹은 스케일업 및 스케케일 다운 규칙의 모음이다.

EC2인스턴스 시작부터 삭제까지의 모든 동작에 대한 규칙과 정책을 담고 있다.

따라서 Auto Scaling 그룹을 생성하기 위해서는 스케일링 정책 및 유형에 대해서 잘 숙지하고 있어야한다.

### Scaling 유형

1. 인스턴스 레벨 유지

기본 스케일링 계획, 항상 실행 상태를 유지하고자 하는 인스턴스의 수를 지정할 수 있다.

일정한 수의 인스턴스가 필요한 경우 최소, 최대 및 원하는 요량에 동일한 값을 설정 할 수 있다.

1. 수동 스케일링

기존 Auto Scaling 글룹의 크기를 수동으로 변경할 수 있다.

직접 콘솔이나, API, CLI등을 이용해 수동으로 인스턴스를 추가 또는 삭제해야한다. (비추천)

1. 일정별 스케일링

특정 시간대에 어느 정도의 트래픽이 증가하는지 패턴을 파악하고 있다면 일정별 스케일링을 사용하는것이 좋다.

1. 동적 스케일링

수요 변화에 대응하여 Auto Scaling 그룹의 용량을 조정하는 방법을 정의한다.

ex) CPU 처리용량의 80%수준까지 급등한 상태가 5분이상 지속시, Auto Scaling이 작동돼 새 서버를 추가한다.

### 웹서버

- Tomcat

Tomcat은 Apache사에서 개발한 서블릿 컨테이너만 있는 오픈소스 웹 애플리케이션 서버이다.

자바 애플리케이션을 위한 대표적인 오픈소스 WAS(Web Application Server)이다.

오픈소스이기 때문에 라이선스 비용 부담 없이 사용할 수 있다.

독립적으로도 사용가능하며 Apache 같은 다른 웹서버와 연동하여 함께 사용할 수 있다.

Tomcat은 자바 서블릿 컨테이너에 대한 공식 구현체로, Spring Boot에 내장되어 있어 별도의 설치과정이 필요하지 않다.

- Jetty

이클립스 재단의 HTTP서버이자 자바 서블릿 컨테이너이다.

2009년 이클립스 재단으로 이전하며 오픈소스 프로젝트로 개발되었다.

Jetty는 타 웹 애플리에키션 대비 적은 메모리를 사용하여 가볍고 빠르다.

애플리케이션에 내장 가능하다.

경량 웹 애플리케이션으로 소형 장비, 소규모 프로그램에 더 적합하다.

- NginX - Proxy Server

가볍고 높은 성능을 보이는 오픈소스 웹 서버 소프트웨어이다.d

Nginx는 웹 서버로 클라이언트에게 정적 리소스를 빠르게 응답하기 위한 웹서버로 사용할 수 있다.

Nginx는 트래픽이 많은 웹 사이트의 확장성을 위해 개발된 고성능 웹서버이다.

비동기 이벤트 기반으로 적은 자원으로 높은 성능과 높은 동시성을 위해 개발되었다.

다수의 클라이언트 연결을 효율적으로 처리할 수 있다.

클라이언트와 서버 사이에 존재하는 리버스 프록시 서버로 사용할 수 있다.

Nginx를 클라이언트와 서버 사이에 배치하여 무중단 배포를 할 수 있다.

![Untitled 2](https://user-images.githubusercontent.com/70310271/183692647-31c11301-4415-428f-a6d0-1de8c1a0dc56.png)

nginx/nginx.conf

```java
server {
  listen       80;
  server_name  localhost;

  #charset koi8-r;

  #access_log  logs/host.access.log  main;

  location / {
      root   html;
      index  index.html index.htm;
  proxy_pass http://localhost:8080; # 요청을 8080포트로 넘긴다.
  proxy_set_header X-Real-IP $remote_addr;
  proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  proxy_set_header Host $http_host;
}
```

![Untitled 3](https://user-images.githubusercontent.com/70310271/183692705-8cf69f47-eddf-449b-951f-348c78b9fe0e.png)

기본 포트 :80 임에도 불구하고 localhost:8080으로 이동한것을 볼 수 있다.

프록시 서버가 잘 작동하는것을 볼 수 있다.

### Nginx - Load Balancer

![Untitled 4](https://user-images.githubusercontent.com/70310271/183692774-5b7383f1-cf0e-41db-9ec9-be4aea586aca.png)

nginx/nginx.conf

```
http {
    upstream backend {
    server localhost:8080;
    server localhost:8081;
}

location / {
    proxy_pass http://backend;
     root html;
     index index.html index.htm;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header Host $http_host;
}
```

backend라는 서버 그룹을 만든뒤 그룹 자체로 전달하는 구조이다.

![Untitled 5](https://user-images.githubusercontent.com/70310271/183692821-f2a9ee7f-955b-4d9f-8f5b-08355cadf622.png)

![Untitled 6](https://user-images.githubusercontent.com/70310271/183692858-91a1efbc-bd87-4a3d-8b37-366fe1e3a4a7.png)

F5를 반복해서 누를시, Nginx(프록시서버)를 통해 다른 프로세스로 들어가는것을 확인
