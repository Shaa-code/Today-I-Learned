# DAY28

### 순열과 조합

### 조합은 뽑고싶은 만큼 수의 for문으로 구현한다.

```java
for(int i = 0 ; i < cards.length ; i++){
    for(int j = i+1 ; j < cards.length ; j++){
        for(int k = j+1 ; k < cards.length ; k++){
            System.out.println(cards[i] + " " + cards[j] + " " + cards[k];
```

n가지 중에 3개 를 뽑고싶으면 위처럼 3중 for문을 만들면 된다.

### 순열은 BFS로 구현한다.

```java
class Permutation {
    
    static int[] target = new int[] { 1, 2, 3 };
    static boolean[] visited = new boolean[target.length];

    public static void main(String[] args) {
        permutation(0, "");
    }
    
    private static void permutation(int cnt, String result) {
        if (cnt == 2) {
            System.out.println(result);
            return;
        }
        for (int i = 0; i < 3; i++) {
            if (visited[i]) {
                continue;
            }
            visited[i] = true;
            permutation(cnt + 1, result + target[i]);
            visited[i] = false;
        }
    }
}
```

![Untitled](https://user-images.githubusercontent.com/70310271/171827206-fd150871-2e0b-4e3f-94a2-2c273be7480a.png)

