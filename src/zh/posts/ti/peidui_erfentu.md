---
icon: pen-to-square
date: 2024-06-06
category:
  - test
comment: true
---
# 在图基础上写的配对方法
## 使用的是邻接表
每一个Node：
```cpp
class Node {
    public:
    int data;
    int target;
    Edgenode *firstedge;//一个Node所有的边
public:
    Node(int data)
    {
        this->data = data;
        firstedge=NULL;
        target=0;
    }
    bool operator==(const Node &n) //用于后面的std::find(),重载==运算符用于比较
    {
        return this->data==n.data;
    }
};
```
Edgenode:
```cpp
class Edgenode{
    public:
    int data;
    Edgenode * next;
};
```
Graph:  &ensp;&ensp;&ensp;使用的有向图:

先放一个没加别的扩展的正常的简单的图
```cpp
class Graph{
    public:
    int vexnum=0;//出发节点的数量
    int edgenum=0;//图中总共边的数量
    vector<Node> nodelist;//作为出发节点的list
    vector<Node> targets;//先不用管
    int visited[100];//先不用管
    int match[100];//先不用管
    Graph()
    {
        memset(visited,0,sizeof(visited));
        memset(match,0,sizeof(match));
    }
    void addEdge(int u, int v)//根据两个int u，v在图中添加边
    {   
        //在nodelist先找找u是不是已经存在了，如果不存在Iter就会指向end
        auto Iter=std::find(nodelist.begin(),nodelist.end(),u);
        if(Iter==nodelist.end())
        {
            nodelist.push_back(Node(u));//不存在就把新建一个Node加进去
            vexnum++;
            Iter = std::prev(nodelist.end());
            //由于Iter一直指向end，现在应该让它指向新建的Node，它恰好也在end的前面
        }
        Edgenode *newnode = new Edgenode();//新建一个边的节点（也就是u通过一条边指向的节点。）
        newnode->data = v;
        newnode->next = NULL;
        //让上个节点指向新节点（因为使用邻接表）
        if((*Iter).firstedge==NULL)//Iter是当前的Node，看看它现在有没有边
        {
            (*Iter).firstedge=newnode;//没有的话就把这个Edgenode当做第一条边指向的点
        }
        else
        {
            Edgenode *p=(*Iter).firstedge;
            while(p->next!=NULL)//不断迭代往后找最后一条边指向的节点
            {
                p=p->next;
            }
            p->next=newnode;
        }
        edgenum++;
    }
```
之后想要配对，每个node都尽量跟一个edgenode配对，想要配对的最大数量

要考虑新建一个match数组，保存每一个edgenode配对的node是谁。

以及一个visited数组，保存每一个edgenode是都已经被占有了。

计算的思路：

1. 每次一个node想要进来找一个edgenode的时候，先看看自己能够到的每个edgenode是不是被“访问”了
2. 然后如果一个edgenode没有被访问，那么就占为己有
3. 如果被访问了，那么就看看与占据这个edgenode的node能不能给它让出来。

实现：
```cpp
MAIN():
    for(Node &x:g.nodelist)
    {
        memset(g.visited,0,sizeof(g.visited));//关键！每次一个node想要进来的时候都把visited数组变成0
        if(g.peidui(x))ans++;
    }
```
```cpp
class Graph{

int peidui(Node &n)
    {
        for(Edgenode* j = n.firstedge;j!=NULL;j=j->next)
        {   
            Node *nn=NULL;
            int a=j->data;
            if(visited[a]==1)continue;
            visited[a]=1;//先把它改为已被访问，用于后面的 peidui(*nn)
            for(Node &node:nodelist)if(node.target==a)nn=&node;//找到a的配对
            if( (!match[a] || peidui(*nn)))
            //如果match[a]=0，直接占据，如果=1，那么就看看nn能不能给它让出来
            //这是因为如果peidui(*nn)里面visited数组没有变，在进入这个函数的时候它之前配对的a已经被设置为1了，
            //所以如果这个这次函数还是返回1，那么就是能够找到一个别的edgenode配对。也就是外面这次抢占的是能够成功的
            //这可以是一个多次嵌套的过程
            {
                match[a]=n.data;
                n.target=a;//target是node配对的edgenode的data，在这里也就是for循环里面的j.data
                return 1;
            }
        }
        return 0;//返回0表示找不到一个配对。
    }
}

```
例子：
![1](/assets/images/1.jpg)
<!-- ![1](/assets/images/cover1.jpg) -->





