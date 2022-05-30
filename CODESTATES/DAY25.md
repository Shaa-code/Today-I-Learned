# DAY25

## Binary Tree와 여러가지 순회

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

![Untitled 11](https://user-images.githubusercontent.com/70310271/170994277-996f01de-0a6b-4591-9720-12d5e1c96078.png)


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

![Untitled 12](https://user-images.githubusercontent.com/70310271/170994262-9267dc14-6114-4f2e-bf0f-5d70a2db7dfd.png)


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
![Untitled 13](https://user-images.githubusercontent.com/70310271/170994237-8dcd4583-aa6e-4db1-8072-02939eeac9eb.png)



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

![Untitled 14](https://user-images.githubusercontent.com/70310271/170994209-2c1edd79-5f29-48a2-82ce-3f0afc3d616a.png)


트리구조에서 노드를 순차적으로 조회할 때의 순서는 항상 왼쪽부터 오른쪽이다.

```java
package com.codestates.coplit; 
import java.util.*;
import java.util.Arrays;

public class Solution {
    public int[][] createMatrix(int[][] edges) {
        // TODO:
        int max = Arrays.asList(edges).stream().flatMapToInt(Arrays::stream).max().orElse(0) + 1;
        int[][] adjM = new int[max][max];

        for(int i = 0 ; i < edges.length ; i++){
            int from = edges[i][0];
            int to = edges[i][1];
            int dir = edges[i][2];

            adjM[from][to] = 1;
            if(dir==1)
                adjM[to][from] = 1;
        }
        return adjM;
    }
}
```
![Untitled](https://user-images.githubusercontent.com/70310271/170996013-a69d2267-8f82-40ba-9486-45e9f17c3589.png)
