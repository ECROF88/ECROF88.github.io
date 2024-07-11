---
icon: pen-to-square
date: 2024-06-25
category:
  - tip
---

# ADL查找

例子:

```cpp

namespace N
{
class Type
{
};
void function(const Type&) { std::cout << 11111; }
}  
template <typename T>
void function(const T&)
{
  std::cout << 22222;
}
int main()
{
  N::Type t;
  function(t);
  return 0;
}
```
输出结果为11111而不是22222.
如果`main`中写成`function(1)`则会输出22222.

Copliot的解释:
1. 当`function(t);`被调用时，由于`t`的类型是`N::Type`，ADL规则会导致编译器在`N::Type`的命名空间`N`中查找名为`function`的函数。
    
2. 因此，即使全局作用域下有一个模板函数`function`可用，ADL使得编译器也会考虑命名空间`N`中定义的`void function(const N::Type&)`函数。
    
3. 在进行重载解析时，由于`N::function(const N::Type&)`直接匹配了调用的参数类型，而且由于ADL的作用，它被包含在候选函数集中，因此它被选择为调用的函数。
    
总结来说，ADL确保了当你使用类型`N::Type`调用`function`时，命名空间`N`中的`function`函数被考虑在内，这导致了`N::function(const N::Type&)`被调用，程序输出`11111`。这是C++为了支持泛型编程和库开发中的封装而设计的特性，它允许库开发者提供与类型紧密相关的函数，而不必担心这些函数会与用户代码中的同名函数冲突。