---
icon: pen-to-square
date: 2024-06-25
category:
  - tip

---

# C++实现AVL树
每个Node的定义，和普通的树节点相比，多了一个height.叶子结点默认高度为0.
```cpp 
class Node
{
    public:
    int data; 
    Node* left;
    Node* right;
    int height;
    Node()=default;
    explicit Node(int data) : data(data){
        left = nullptr;
        right = nullptr;
        height =0;
    }
};
```
Tree类：
```cpp
class T
{
    public: 
    Node*root;
    T():root(nullptr){}
    int height(Node* n)
    {
        if(n==nullptr)
        {
            return -1;
        }
        return n->height;
    }
    void updateHeight(Node* n)
    {   
        if(n!=nullptr)
        n->height = max(height(n->left),height(n->right))+1;
    }
    int getBalance(Node* n)
    {
        if(n==nullptr)
        {
            return 0;
        }
        return (height(n->left)-height(n->right));
    }

    Node* rightrotate(Node* n)
    {
        Node *child=n->left;
        Node * grandchild=child->right;
        child->right=n; 
        n->left=grandchild;
        updateHeight(n);
        updateHeight(child);
        return child;//子树的root，不是整个树的root
    }
    Node* leftrotate(Node* n)
    {
        Node *child=n->right;
        Node * grandchild=child->left;
        child->left=n; 
        n->right=grandchild;
        updateHeight(n);
        updateHeight(child);
        return child;//子树的root，不是整个树的root
    }

    Node* rotate(Node* n)
    {
        int balance = getBalance(n);
        if(balance>1)
        {
            if(getBalance(n->left)<0)
            {
                //先左旋再右旋
                cout<<"先左旋再右旋"<<endl;
                n->left=leftrotate(n->left);//先左旋是对左子树的操作
                return rightrotate(n);//再右旋才是对n的操作
            }
            else
            {
                //右旋  
                cout<<"右旋"<<endl;
                return rightrotate(n);
            }
        }
        else if(balance<-1)
        {
            if(getBalance(n->right)>0)
            {
                //先右旋再左旋
                cout<<"先右旋再左旋"<<endl;
                n->right=rightrotate(n->right);
                return leftrotate(n);
            }
            else
            {
                //左旋
                cout<<"左旋"<<endl;
                return leftrotate(n);
            }
        }
        return n;//No need to rotate
    }
    
    //由于删除过程涉及到不断地旋转，所以需要返回新的root
    void remove(int val)
    {
        root=removehelper(root,val);
    }
    //removehelper实现了每一次递归都返回新的root，也就是每个子树的根节点都会被调整
    Node* removehelper(Node* node,int val)
    {
        if(node==nullptr)
        return nullptr;

        if(val<node->data)
        {   
            //
            node->left=removehelper(node->left,val);//从左子树中去找，删除后会返回一个新的子树根节点
        }
        else if(val>node->data)
        {
            node->right=removehelper(node->right,val);
        }
        else if(val==node->data)
        {
            //如果度为0或者1
            if(node->left==nullptr || node->right==nullptr)
            {
                Node* temp=node->left==nullptr?node->right:node->left;
                if(temp==nullptr)
                {
                    //度0
                    temp=node;
                    node=nullptr;
                }
                else
                {   
                    //度为1
                    delete node;
                    node=temp;
                }
            }
            //度为2，这里找右子树最小的节点来代替
            else
            {
                Node*temp=node->right;
                while(temp->left!=nullptr)
                {
                    temp=temp->left;
                }
                int tmpval=temp->data;
                node->right=removehelper(node->right,tmpval);//递归删掉右子树最小的节点
                node->data=tmpval;//更改node值，不用删node指向的对象。
            }
        }
            //删除完成之后，要进行旋转。
        updateHeight(node);
        node=rotate(node);

        return node;//返回这个子树的新根节点
    }


    void insert(int val)
    {
        root=inserthelper(root,val);
    }
    Node* inserthelper(Node* node,int val)//辅助方法，返回新的root
    {
        if(node==nullptr)//直到找到一个空位，插入
        {
            return new Node(val);
        }
        if(val<node->data)
        {
            node->left=inserthelper(node->left,val);//在左子树中找,找到后会返回一个新的子树根节点
        }
        else if(val>node->data)
        {
            node->right=inserthelper(node->right,val);//在右子树中找
        }
        else
        {
            return node;//如果相等，不插入
        }
        updateHeight(node);
        node=rotate(node);
        return node;
    }
    void printTreebyLevel()//广度优先
    {
        queue<Node*> q;
        q.push(root);
        while(!q.empty())
        {
            Node*cur=q.front();
            q.pop();
            cout<<cur->data<<" ";
            if(cur->left!=nullptr)q.push(cur->left);
            if(cur->right!=nullptr)q.push(cur->right);
        }
        cout<<endl;
    }
};
```
最后展示一下测试代码：
```cpp
int main()
{   
    T t;
    int a[10]={3,7,1,2,9,8,6,4,10};

    for(int i=0;i<9;i++)
    {
        t.insert(a[i]);
    }
    t.printTreebyLevel();//3 1 8 2 6 9 4 7 10
    t.remove(7);
    t.remove(8);
    t.printTreebyLevel();//1 3 6 9 2 10 4
}
```