
### 한번 그려본 흐름

![Untitled 25](https://user-images.githubusercontent.com/70310271/209355886-985ceecb-5d19-482a-a8d7-eba686ae4f5e.png)

![Untitled 26](https://user-images.githubusercontent.com/70310271/209355895-6d870c2a-8c6d-4880-8ba7-6716292cff1a.png)

### 발생할 수 있는 문제

이 코드는 sendMsg라는 공유자원에 동시에 접근할 수 있기 때문에 동시성 문제가 발생할 수 있다.

동시성 문제를 해결하기 위해 이때 임계영역에 뮤텍스 락이나, 셰마포어와 같은 기법을 사용해서 예방하면 좋을것 같다는 생각이 들었다.

자바에서는 synchronized와 ReenterantLock을 사용해서 구현할 수 있다고해서 한번 시도해 보았다.

```java
public synchronized void sendMsg(){
    Scanner keyboardInput = new Scanner(System.in);
    while(!lock.isLocked()){
        lock.lock();
        try {
            sendMsg = "<msg>[서버] " + keyboardInput.nextLine() + "</msg>";
            System.out.println(sendMsg);

            if (isTerminated) break;

            sendString.write(sendMsg + '\n');
            sendString.flush();
        }catch(IOException e){
        }finally {
            lock.unlock();
        }
    }
}
```

우선에 생각하기에 이런식으로 구현하면 안될까 싶다.
