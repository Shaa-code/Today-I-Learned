# DAY26

오늘은 DFS, BFS 복습만 했다.

### DFS(Depth First Search)

```java
class Main {
    static int n, m, answer = 0;
    static int[][] graph;
    static int[] ch;

    public void DFS(int v) {
        if (v == n) answer++;
        else {
            for (int i = 1; i <= n; i++) {
                if (graph[v][i] == 1 && ch[i] == 0)
                    ch[i] = 1;
                DFS(i);
                ch[i] = 0;
            }
        }
    }

    public static void main(String[] args) {
        Main T = new Main();
        Scanner kb = new Scanner(System.in);
        n = kb.nextInt();
        m = kb.nextInt();
        graph = new int[n + 1][n + 1];
        ch = new int[n + 1];
        for (int i = 0; i < m; i++) {
            int a = kb.nextInt();
            int b = kb.nextInt();
            graph[a][b] = 1;
        }
        ch[1] = 1;
        T.DFS(1);
        System.out.println(answer);
    }
}
```

![Untitled](https://user-images.githubusercontent.com/70310271/171412871-fff1194d-c283-4e73-aa81-94a35cffc072.png)


### BFS(Breadth First Search)

```java
public class Main{
    Node root;
    public void BFS(Node root){
        Queue<Node> Q = new LinkedList<>();
        int L = 0;
        Q.offer(root);
        while(!Q.isEmpty()){
            int len = Q.size();
            System.out.print(L + " : ");
            for(int i = 0 ; i< len ; i++){
                Node tmp = Q.poll();
                if(tmp.lt != null) Q.offer(tmp.lt);
                if(tmp.rt != null) Q.offer(tmp.rt);
            }
        }
        L++;
        System.out.println();
    }

    public static void main(String[] args) {
        Main tree = new Main();
        tree.root = new Node(1);
        tree.root.lt = new Node(2);
        tree.root.rt=new Node(3);
        tree.root.lt.lt=new Node(4);
        tree.root.lt.rt=new Node(5);
        tree.root.rt.lt=new Node(6);
        tree.root.rt.rt=new Node(7);
        tree.BFS(tree.root);

    }
}
```

![Untitled 1](https://user-images.githubusercontent.com/70310271/171412885-08433ada-76c2-4069-bd99-46296ebbdf8d.png)

