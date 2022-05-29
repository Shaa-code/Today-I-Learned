## Graph란?

Vertex (정점) : 꼭짓점을 의미한다.

Edge (변,간선) : 변을 의미한다.

Graph (그래프) : Vertex(정점)와 Edge(변)을 서로 연결한것.

![Untitled](https://user-images.githubusercontent.com/70310271/170875779-932d9b4e-76d8-4523-9e17-5bc2c532212a.png)

정점을 떠나는(Leave) 변의 숫자 : 출력 차수(진출 차수)

정점을 들어가는(Enter) 변의 숫자 : 입력 차수

여러개의 점들이 복잡하게 연결되어 있는 관계를 표현한 자료구조.

### Graph를 어떻게 컴퓨터에 표현할까?

인접 행렬과, 인접리스트로 표현한다.

![Untitled 1](https://user-images.githubusercontent.com/70310271/170875784-13d35be5-8c51-4dda-837a-65adfe3a9ac2.png)

### 인접행렬로 구현한다.

정점 A와 B가 연결되어 있으면 1, 이어져 있지 않으면 0으로 표시한다.

가중치 그래프라면 1대신 관계에서 의미있는 값을 저장한다.

```java
public void setGraph(int size) {
  graph = new int[size][size];

  for(int i = 0; i < size; i++) {
    for(int j = 0; j < size; j++) {
      graph[i][j] = 0;
    }
  }
}

public void addEdge(int from, int to) {
    graph[from][to] = 1;
} // 이렇게 from,to를 이용하여 인접행렬을 구현한다.

public boolean hasEdge(int from, int to) {
    else if(graph[from][to] == 1) return true;
    else return false;
  }

public void removeEdge(int from, int to) {
    graph[from][to] = 0;
  }
```

![Untitled 2](https://user-images.githubusercontent.com/70310271/170875792-7b8e8526-9a3e-4bb5-8124-866ab27aacfe.png)


- 구체적으로 언제 인접행렬을 사용하면 좋을까?

두 정점 사이에 관계를 알아보고 싶을때 사용한다.

특히, 가장 빠른경로를 찾고자할때 주로 사용한다.

### 인접 리스트로 구현한다.

인접 리스트는 각 정점이 어떤 정점과 인접하는지 리스트의 형태로 표현한다.

```java
public void addEdge(int from, Integer to) {
    graph.get(from).add(to); // from에 to 추가
		graph.get(to).add(from); // to에도 from추가
  }

public void removeEdge(int from, int to) {
    if(graph.get(from).contains(to)) { // from에 to가 존재하면
      graph.get(from).remove((Integer) to); //from에서 to삭제
    }
```

![Untitled 3](https://user-images.githubusercontent.com/70310271/170875795-827e9429-e29a-4970-86b6-0888cf9576b6.png)

### 구체적으로 언제 인접리스트를 사용할까?

인접행렬은 연결가능한 모든 경우의 수를 저장하기 때문에 상대적으로 메모리를 많이 차지 하므로, 메모리를 효율적으로 사용하고 싶을 때 인접 리스트를 사용한다.

### 용어정리

무(방)향 그래프(undirected graph) : 방향이 없는 그래프

### 인접(Adjacency)

인접 (adjacency) : 두 정점 간에 간선이 직접 이어져 있다면 이 두 정점은 인접한 정점이다.

인접 정점(adjacent vertex) : 하나의 정점에서 간선에 의해 직접 연결되어 있는 정점

![Untitled 4](https://user-images.githubusercontent.com/70310271/170875801-ba47d364-6440-4bfe-8f85-52f94283f2c9.png)

### 집입차수 ,진출차수

진입차수(in-degree) : 한 정점에 들어오는 간선의 개수

진출차수(out-degree) : 한 정점으로 부터 나가는 간선의 개수

![Untitled 5](https://user-images.githubusercontent.com/70310271/170875806-df2e900d-5094-4116-b422-d5543dffb7d0.png)

자기 루프(self loop) : 정점에서 진출하는 간선이 곧바로 자기자신에게 진입하는 경우.

사이클(cycle) : 한 정점에서 출발하여 다시 해당 정점으로 돌아갈 수 있다면 사이클이 있다.

## Tree란?

단방향 그래프의 한 구조로, 데이터가 바로 아래에 있는 하나 이상의 데이터에 무방향으로 연결된 계층적 자료구조.

![Untitled 6](https://user-images.githubusercontent.com/70310271/170875810-75051822-efbf-4368-b765-877d011f859b.png)

Leaf : 트리구조의 끝지점. (자식노드가 없는 노드)

### 깊이(Depth)란?

루트로 부터 하위계층의 특정 노드까지의 깊이

`0부터 시작한다는점 꼭 알고 있자!`

### 레벨(Level)이란?

같은 깊이를 가지고 있는 노드를 묶어서 레벨(Level)로 표현한다.

### 높이(Height)란?

리프 노드(Leaf Node)를 기준으로 루트까지의 높이(Height)

`각 리프노드는 0부터 시작한다는 점 꼭 알고있자!`

### Sibling이란?

같은 깊이를 가지고 있는 노드.

![Untitled 7](https://user-images.githubusercontent.com/70310271/170875820-e1a0752e-c8ab-4faa-aba3-bc3cfc82ef7a.png)


한국 용어로는 헷갈리는 개념이 많아. 모든 개념을 영어로 통일한다.

### Full Binary Tree란?

A perfect binary tree is a type of binary tree in which every internal node has exactly two child nodes and all the leaf nodes are at the same level.

부모노드와 자식노드가 정확히 2가지로만 내려오거나 자손이 없는 경우로만 이루어졌을때,

Full Binary Tree라고 한다.

![Untitled 8](https://user-images.githubusercontent.com/70310271/170875824-ca851ed1-7c82-4477-96de-6d7faeaad7eb.png)

### **Perfect Binary Tree란?**

A perfect binary tree is a type of binary tree in which every internal node has exactly two child nodes and all the leaf nodes are at the same level.

자손이 정확히 2가지 노드로 뻗어나가는 동시에 모든 리프노드가 같은 레벨에 존재할때 "Perfect Binary Tree"라고 한다.

![Untitled 9](https://user-images.githubusercontent.com/70310271/170875830-96eef3e4-dfd5-47b5-9a11-017801c8c634.png)

### Complete Binary Tree란?

![Untitled 10](https://user-images.githubusercontent.com/70310271/170875840-30ff9951-3c8a-41a7-9ce2-5f45daf8a416.png)

A complete binary tree is just like a full binary tree, but with two major differences

1. Every level must be completely filled
2. All the leaf elements must lean towards the left.
3. The last leaf element might not have a right sibling i.e. a complete binary tree doesn't have to be a full binary tree.

Full Binary Tree와 비슷해 보이지만, 두가지 주요한 차이가 있다.

1. 모든 레벨은 반드시 채워져있다.
2. 모든 리프 노드는 왼쪽으로 치우쳐야한다.
3. 마지막 리프 노드는 sibling노드가 동일하지 않다.

< 출처 : [https://www.programiz.com/dsa/binary-tree](https://www.programiz.com/dsa/binary-tree)>

```java
// Binary Tree in Java

// Node creation
class Node {
  int key;
  Node left, right;

  public Node(int item) {
  key = item;
  left = right = null;
  }
}

class BinaryTree {
  Node root;

  BinaryTree(int key) {
  root = new Node(key);
  }

  BinaryTree() {
  root = null;
  }

  // Traverse Inorder
  public void traverseInOrder(Node node) {
  if (node != null) {
    traverseInOrder(node.left);
    System.out.print(" " + node.key);
    traverseInOrder(node.right);
  }
  }

  // Traverse Postorder
  public void traversePostOrder(Node node) {
  if (node != null) {
    traversePostOrder(node.left);
    traversePostOrder(node.right);
    System.out.print(" " + node.key);
  }
  }

  // Traverse Preorder
  public void traversePreOrder(Node node) {
  if (node != null) {
    System.out.print(" " + node.key);
    traversePreOrder(node.left);
    traversePreOrder(node.right);
  }
  }

  public static void main(String[] args) {
  BinaryTree tree = new BinaryTree();

  tree.root = new Node(1);
  tree.root.left = new Node(2);
  tree.root.right = new Node(3);
  tree.root.left.left = new Node(4);

  System.out.print("Pre order Traversal: ");
  tree.traversePreOrder(tree.root);
  System.out.print("\nIn order Traversal: ");
  tree.traverseInOrder(tree.root);
  System.out.print("\nPost order Traversal: ");
  tree.traversePostOrder(tree.root);
  }
}
```

![Untitled 11](https://user-images.githubusercontent.com/70310271/170875845-56e06f1d-5c97-4402-9bf0-c76ce3e8f6c0.png)


위 코드예제로 재귀가 호출되는 과정을 시각화 해보자.

### Pre-Order(전위 순회)에서 재귀가 호출되는 과정 시각화해보기.

```java
class Main{ //1번 노드
    if (node != null) {
        System.out.print(" " + node.key);// 1번 출력
        //traversePreOrder(node.left);// 2번 노드로 들어감
        if (node != null) {
            System.out.print(" " + node.key);// 2번 출력
            //traversePreOrder(node.left);//4번 노드로 들어감
            if (node != null) {
                System.out.print(" " + node.key); //4번 출력
                traversePreOrder(node.left); // 더 이상 노드가 없으므로 pass.
                }
                traversePreOrder(node.right);// 더 이상 노드가 없으므로 pass.
            }
            traversePreOrder(node.right);//더 이상 노드가 없으므로 pass.
        }
    //traversePreOrder(node.right);
    System.out.print(" " + node.key);// 3번 출력
    traversePreOrder(node.left); // 더 이상 노드가 없으므로 pass.
    traversePreOrder(node.right); // 더 이상 노드가 없으므로 pass.
}
```

![Untitled 12](https://user-images.githubusercontent.com/70310271/170875861-4df1be26-4095-435d-8002-34265a264bb7.png)

### In-Order(중위 순회)에서 재귀가 호출되는 과정 시각화해보기.

```java
class Main { //1번 노드
    if (node != null) {
        //traverseInOrder(node.left); //2번 노드로 들어감.
        if (node != null) {
            //traverseInOrder(node.left); //4번 노드로 들어감.
            if (node != null) {
                traverseInOrder(node.left); //더 이상 노드가 없으므로 pass.
                System.out.print(" " + node.key); // 4번 출력
                traverseInOrder(node.right); //더 이상 노드가 없으므로 pass.
            }
            System.out.print(" " + node.key); // 2번 출력
            traverseInOrder(node.right); //더 이상 노드가 없으므로 pass.
        }
        System.out.print(" " + node.key); // 1번 출력
        //traverseInOrder(node.right); // 3번 노드로 들어감.
        if (node != null) {
            traverseInOrder(node.left); //더 이상 노드가 없으므로 pass.
            System.out.print(" " + node.key); //3번 출력
            traverseInOrder(node.right); //더 이상 노드가 없으므로 pass.
        }
    }
}
```

![Untitled 13](https://user-images.githubusercontent.com/70310271/170875868-5c1873c8-5651-4949-928a-38a0fb48faa8.png)


### Post-Order(후위 순회)에서 재귀가 호출되는 과정 시각화해보기.

```java
//후위순회
class Main{ // 1번 노드
    if (node != null) {
        //traversePostOrder(node.left); //2번 노드에 들어감.
        if (node != null) {
            //traversePostOrder(node.left); //4번 노드에 들어감.
            if (node != null) {
                traversePostOrder(node.left); //더 이상 노드가 없으므로 pass.
                traversePostOrder(node.right);//더 이상 노드가 없으므로 pass.
                System.out.print(" " + node.key); // 4번 출력
            }
            traversePostOrder(node.right); //더 이상 노드가 없으므로 pass.
            System.out.print(" " + node.key);//2번 출력
        }
        //traversePostOrder(node.right); // 3번 노드에 들어감.
        if (node != null) {
            traversePostOrder(node.left); //더 이상 노드가 없으므로 pass.
            traversePostOrder(node.right); //더 이상 노드가 없으므로 pass.
            System.out.print(" " + node.key); // 3번 출력
        }
        System.out.print(" " + node.key); //1번 출력
    }
}
```
![Untitled 14](https://user-images.githubusercontent.com/70310271/170875875-bc31708a-295f-426a-bcde-6515ecf01513.png)

트리구조에서 노드를 순차적으로 조회할 때의 순서는 항상 왼쪽부터 오른쪽이다.
