`이론으로 설명하는 사람들중에 구체적으로 작동 방식을 설명하는 사람이 아무도 없어서 그냥 직접 테스트해본다.`

```java
public class Main{
    public static void main(String[] args) {
        Player player = new Player() {}; // 오류 발생 (내부 메서드 구현을 해야함)
        AbstractPlayer abstractPlayer = new AbstractPlayer(); // 오류 발생 (같은 이유)

        AudioPlayer audioPlayer = new AudioPlayer();
        audioPlayer.play();
        audioPlayer.pause();
        audioPlayer.stop();
        audioPlayer.play(3);
    }
}

//AudioPlayer
play
pause
상속받은 stop 실행?
상속받은 play 실행?
```

`그냥 추상클래스는 new로 생성할 수 없음을 알 수 있었음.`

추상클래스는 반드시 Override를 통해 구현을 해야만 사용할 수 있음.

전부다 구현해야 하는 줄 알았는데, 

```
abstract void play(int pos);
abstract void stop();
```

이 두 메서드만 구현하면 사용할 수 있음.

![image](https://github.com/Shaa-code/Today-I-Learned/assets/70310271/72b65deb-c4ae-46bb-8caf-6a8e9c9bc086)

```java
abstract class Player{

    abstract void play(int pos);
    abstract void stop();

    void play(){
        System.out.println("play");
    }

    void pause(){
        System.out.println("pause");
    }
}
```

```java
abstract class AbstractPlayer extends Player{
    void player(int pos) {}
}

```

```java
public class AudioPlayer extends Player{
    void play(int pos){
        System.out.println("상속받은 play 실행?");
    }
    void stop() {
        System.out.println("상속받은 stop 실행?");
    }
}
```

- 정리
1. 추상클래스를 생성해서 사용하려면 추상클래스 내부에 abstract로 둔 메서드들은 인터페이스와 같이 반드시 구현해야만 한다.

1. 추상클래스 내부에 일반 메서드들을 구현해 두면 그냥 extends를 받아서 그대로 바로 사용할 수 있다.

1. 그냥 말그대로 인터페이스랑 일반 클래스를 섞어서 사용하는거다.

추상 메서드로 선언해두면 반드시 구현해야하고, 그냥 구현 해둔 메서드는 그냥 쓰던지 Override받아서 다르게 쓰던지 둘다 할 수 있게 만들어 둔거다.

- 필요하면 수정해서 테스트해보기

```java
public class Main{
    public static void main(String[] args) {

        System.out.println("//Player");

        Player player = new Player() {
            @Override
            void play(int pos) {
                System.out.println(pos + "Player");
            }

            @Override
            void stop() {
                System.out.println("Stopped By Player");
            }
        };
        player.play(2);
        player.stop();
        player.pause();

        System.out.println("//AbstractPlayer");

        AbstractPlayer abstractPlayer = new AbstractPlayer() {
            @Override
            void play(int pos) {
                System.out.println(pos + "abstractPlayer");
            }
            @Override
            void stop() {
                System.out.println("Stopped By AbstractPlayer");
            }
        };

        abstractPlayer.player(3);
        abstractPlayer.play();
        abstractPlayer.pause();
        abstractPlayer.stop();

        System.out.println("//AudioPlayer");

        AudioPlayer audioPlayer = new AudioPlayer();
        audioPlayer.play();
        audioPlayer.pause();
        audioPlayer.stop();
        audioPlayer.play(3);

    }
}
```

- 그냥 인터넷 뒤진거
    
    추상클래스는 클래스라서 extends를 받는다.
    
    인터페이스는 인터페이스라서 implements를 사용한다.
    
    구체적인 부분만 구현할 거면 일반 클래스를 쓰고
    
    추상 메소드만 쓸거면 인터페이스를 쓴다.
    
    추상 메소드, 일반 메서드를 섞어 쓰면 향후에 효과적이라고 고려될 때 추상 클래스를 사용한다.
    

그래서 인터페이스랑 무슨 차이가 있는데?

인터페이스는 무조건 다 구현해야하고, (얘는 다중 상속가능)

추상 클래스는 추상메서드, 일반메서드 다 만들 수 있다. (얘는 단일 상속만 가능)

하지만 사용하기 위해서는 추상클래스 또한 모든 메서드를 구현해야 한다.

그렇게 하지 않으면 애초에 컴파일이 되지 않는다.

모든 메서드를 @Override해서 구현한 후에야 일반메서드로 등록한 메서드도 super.play()를 통해서 사용할 수 있게 되는거다.
