# DAY24

## Graph란?

![Untitled](https://user-images.githubusercontent.com/70310271/170724760-6c3c8369-05a4-42f1-b37e-5bd8259887ed.png)

Vertex (정점) : 꼭짓점을 의미한다.

Edge (변,간선) : 변을 의미한다.

Graph (그래프) : Vertex(정점)와 Edge(변)을 서로 연결한것.

출력 차수(진출 차수) : 정점을 떠나는(Leave) 변의 숫자

입력 차수 : 정점을 들어가는(Enter)

여러개의 점들이 복잡하게 연결되어 있는 관계를 표현한 자료구조.

### Graph를 어떻게 컴퓨터에 표현할까?

1. 인접행렬로 구현한다.

정점 A와 B가 연결되어 있으면 1, 이어져 있지 않으면 0으로 표시한다.

가중치 그래프라면 1대신 관계에서 의미있는 값을 저장한다.

- 구체적으로 언제 인접행렬을 사용하면 좋을까?

두 정점 사이에 관계를 알아보고 싶을때 사용한다.

특히, 가장 빠른경로를 찾고자할때 주로 사용한다.

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

### 인접 리스트로 구현한다.

인접 리스트는 각 정점이 어떤 정점과 인접하는지 리스트의 형태로 표현한다.

- 구체적으로 언제 인접리스트를 사용할까?

인접행렬은 연결가능한 모든 경우의 수를 저장하기 때문에 상대적으로 메모리를 많이 차지 하므로, 메모리를 효율적으로 사용하고 싶을 때 인접 리스트를 사용한다.

![Untitled 1](https://user-images.githubusercontent.com/70310271/170724786-5d06d157-c5da-45eb-94a4-c2ce552cbe75.png)

- 용어정리

무(방)향 그래프(undirected graph) : 방향이 없는 그래프

인접 (adjacency) : 두 정점 간에 간선이 직접 이어져 있다면 이 두 정점은 인접한 정점이다.

인접 정점(adjacent vertex) : 하나의 정점에서 간선에 의해 직접 연결되어 있는 정점

![Untitled 2](https://user-images.githubusercontent.com/70310271/170724806-c07b74fc-24dd-4331-bc95-5cdd481747dd.png)

진입차수(in-degree) : 한 정점에 들어오는 간선의 개수

진출차수(out-degree) : 한 정점으로 부터 나가는 간선의 개수

![Untitled 3](https://user-images.githubusercontent.com/70310271/170724827-26a34831-280f-4722-bddb-bdd2f1b6e354.png)

자기 루프(self loop) : 정점에서 진출하는 간선이 곧바로 자기자신에게 진입하는 경우.

사이클(cycle) : 한 정점에서 출발하여 다시 해당 정점으로 돌아갈 수 있다면 사이클이 있다.

## Tree란?

단방향 그래프의 한 구조로, 데이터가 바로 아래에 있는 하나 이상의 데이터에 무방향으로 연결된 계층적 자료구조.

![Untitled 4](https://user-images.githubusercontent.com/70310271/170724841-e9a79585-e14c-487e-a74a-abe4fbad1c19.png)

Leaf : 트리구조의 끝지점. (자식노드가 없는 노드)

### 깊이(Depth)란?

루트로 부터 하위계층의 특정 노드까지의 깊이

`0부터 시작한다는점 꼭 알고 있자!`

### 레벨(Level)이란?

같은 깊이를 가지고 있는 노드를 묶어서 레벨(Level)로 표현한다.

### 높이(Height)란?

리프 노드(Leaf Node)를 기준으로 루트까지의 높이(Height)

`각 리프노드는 0부터 시작한다는 점 꼭 알고있자!`
