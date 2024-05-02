---
icon: pen-to-square
date: 2024-05-02
category:
  - test
comment: true
---
# A Simple Map
#### 实现了基本的增删改查
```cpp
template <typename KeyType, typename ValueType>
class Map
{
private:
    vector<pair<KeyType, ValueType>> pairs;
public:
    void insert(KeyType key, ValueType value)
    {   
        // cout<<key<<" "<<value<<endl;
        for(auto i:pairs)
        {
            if(i.first==key)
            {
                cout<<"Key already exists"<<endl;
                return;
            }
        }
        pair<KeyType,ValueType> p(key,value);
        pairs.push_back(p);
    }
    void output()
    {
        for(auto i:pairs)
        {   
            cout<<i.first<<" "<<i.second<<endl;
        }
    }
    void remove(KeyType key)
    {
        // for(auto i=pairs.begin();i!=pairs.end();i++)
        // {
        //     if(i->first==key)
        //     {
        //         pairs.erase(i);
        //     }
        // }
        //std::remove_if函数并不直接删除元素，而是将不满足条件的元素移到容器的末尾，
        // 并返回一个迭代器，指向第一个不满足条件的元素。
        // 然后你可以使用容器的erase方法来删除这些元素。
        pairs.erase(std::remove_if(pairs.begin(), pairs.end(), [&](const auto& pair) {
            return pair.first == key;
        }), pairs.end());
    }
    ValueType get(KeyType key)
    {   
        if(pairs.size()==0)
        {
            cout<<"Map is empty"<<endl;
            return -1;
        }
        for(auto i:pairs)
        {
            if(i.first==key)
            {
                return i.second;
            }
        }
        cout<<"Key not found"<<endl;
        return pairs.end()->second;
    }
    int size()
    {
        return pairs.size();
    }
};
int main()
{
    Map<string,int> mymap;
    for(auto i = 'a';i<'f';i++)
    {   
        mymap.insert(string(1,i),i);
    }
    string s=string(1,'b');
    mymap.output();//a 97 b 98 c 99 d 100 e 101
    cout<<"map_size:"<<mymap.size()<<endl;//5
    cout<<"find key 'b':"<<mymap.get("b")<<endl;//98
    mymap.remove("b");
    mymap.output();//a 97 c 99 d 100 e 101
    cout<<"map_size:"<<mymap.size()<<endl;//4
}
```
```cpp
template <typename KeyType, typename ValueType> 
不能写成
template <KeyType, ValueType>
在 C++ 中，typename 关键字通常用于告诉编译器模板参数是一个类型。
当你在模板中使用某个类型时，编译器需要知道这个名字代表一个类型而不是其他东西，比如一个静态成员或者一个函数。
在模板定义中，typename 用于声明一个类型参数。如果不使用 typename，编译器可能会将其解释为非类型的东西，导致编译错误。
在某些情况下，typename 可以省略。例如，在模板的参数列表中，不需要 typename：
template <typename T>
void print(T value) {
    // T 是一个类型，这里不需要使用 typename
    std::cout << value << std::endl;
}
然而，在模板的函数体内，如果你要使用模板参数作为一个类型，你必须在其前面加上typename:
template <typename T>
void print() {
    // 这里需要使用 typename
    typename T::iterator it;
    // 使用 it
}
```
### lambda表达式
```cpp
[capture clause](parameter list) -> return type {
    // 函数体
};

捕获子句 (capture clause): 指定 lambda 表达式可以访问的外部变量。
参数列表 (parameter list): 定义函数的参数，类似于普通函数。
返回类型 (return type): 可选，可以由编译器自动推导。
函数体 (function body): 包含函数的实际代码。
捕获子句
[]: 不捕获任何外部变量。
[=]: 按值捕获所有外部变量。
[&]: 按引用捕获所有外部变量。
[a, &b]: 按值捕获 a，按引用捕获 b。

Example:
std::vector data = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
auto new_end = std::remove_if(data.begin(), data.end(),[](int x) { return x % 2 == 0; });
这里*new_end是6.

当然，remove_if并不会真的像erase一样删除,只是把符合条件的放在末尾了
也就是:
for (auto it = data.begin(); it != data.end(); ++it) 
{
    std::cout << *it << " ";//1 3 5 7 9 6 7 8 9 10
}
后面的5位并不会变，当然前面1 2 3 4 5被覆盖了。
所以想要只保留1 3 5 7 9：
data.erase(std::remove_if(data.begin(), data.end(),[](int x) { return x % 2 == 0; }),data.end());
//删除从new_end开始到结尾。
```