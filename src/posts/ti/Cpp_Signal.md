---
icon: pen-to-square
date: 2024-07-11
category:
  - tip
---

# CPP实现信号槽机制

bind 函数:

```cpp
template <class Self, class MemFn>
auto bind(Self self, MemFn m, N_shot_t n)  //
{
  return [self = std::move(self), m, n = static_cast<int>(n)](auto... __t) mutable {
  //由于不确定传进来的ptr到底是shared_ptr还是weak_ptr,所以再创建一个ptr,判断是不是weak_ptr,如果是weak_ptr,就要使用weak_ptr.lock()//
  //为什么要判断是不是weak_ptr呢,是因为weak_ptr指向的对象不保证是不是析构了,shared_ptr就不会有这个问题.
    auto const &ptr = lock_if_weak(self);
    //由于如果是weak_ptr可能存在ptr==nullptr的问题
    if (ptr == nullptr) return CallbackResult::ERASE;
    //N_shot_n表示这个函数最多执行的次数,如果是0,就返回ERASE,ERASE表示要在vector把这个函数erase掉.
    if (n == 0) return CallbackResult::ERASE;
    n--;
    // cout << "n= " << n << endl;
    ((*ptr).*m)(__t...);
    //上面的条件都不满足,说明这个函数还要继续留存.
    return CallbackResult::KEEP;
  };
  // 由于lamda表达式封装的operator()是const的，所以不能修改n,使用mutable之后就可以修改了.
}
```

N_shot_t:

```cpp
enum class N_shot_t : int
{
};
```

````
```cpp
template <class Self>
shared_ptr<Self> lock_if_weak(weak_ptr<Self> const &self)
{
  return self.lock();
  //如果是weak_ptr就会返回一个shared_ptr.如果weak_ptr指向的对象已经销毁,就会返回一个空的shared_ptr.
}

template <class Self>
Self const &lock_if_weak(Self const &self)
{
  return self;//否则就什么都不做,直接返回.
}
````

两种返回值:

```cpp
enum CallbackResult
{
  KEEP,
  ERASE
};
```

Lamda 表达式本质上是一个封装好的结构体,里面重在了 operator()运算符.
`auto operator(auto ..._t){....}`

`std::weak_ptr` 的 `lock()` 成员函数用于尝试获取一个 `std::shared_ptr` 对象。如果 `std::weak_ptr` 所指向的对象仍然存活（即至少有一个 `std::shared_ptr` 在管理这个对象，引用计数大于零），那么 `lock()` 函数会返回一个新的 `std::shared_ptr`，这个 `std::shared_ptr` 指向相同的对象并增加其引用计数。如果对象已经被销毁（即没有 `std::shared_ptr` 再管理该对象，引用计数为零），`lock()` 将返回一个空的 `std::shared_ptr`。

Singnal 类：

```cpp
template <class... T>
class Signal
{
#if __cpp_lib_move_only_function
  using Functor = std::move_only_function<CallbackResult(T...)>;
#else
  using Functor = std::function<CallbackResult(T...)>;
#endif

//std::move_only_function表示智能使用移动语义,这个类型特别适用于那些不希望或不能被复制的对象，例如 lambda 表达式捕获变量
//由于是C++20才引入的,所以上面需要判断一下,否则就还用std::function
 // std::vector<std::move_only_function<CallbackResult(T...)>> funs;
  std::vector<Functor> funs;//表示存放一堆函数的vector.
public:
//下面主要是实现两个函数,connect和emit.connect是把一个函数加进来,emit是表示调用里面这些函数.

  template <class Func>
  void connect(Func fun)
  {
  //使用if constexpr来判断传进来的函数的返回值是不是能转换为CallbackResult类型,如果是,就编译第一个分支,都则编译第二个分支,防止编译时传入不合法的出现编译错误
  //std::invoke_result_t<Func, T...>会推导出Func的返回类型，T...是它的形参包
    if constexpr (std::is_convertible_v<std::invoke_result_t<Func, T...>, CallbackResult>) {
      cout << "convertible\n";
      funs.push_back(move(fun));
    } else {
    //如果不能转换,说明函数的返回值不是CallbackResult类型,不符合自己的要求,所以给它自动加上一个返回值.所以要对函数使用Lamda表达式再进行一次封装.
      cout << "not convertible\n";
      funs.push_back([fun = move(fun)](T... t) mutable {
      //mutable表示这里的
        fun(t...);
        return CallbackResult::KEEP;
      });
    }
  }



//第二种connect,传入一个指针和一个成员函数指针,可以适用于一个结构体指针和结构体内部的成员函数.
//Self是一个指针,MemFn也是一个指针,所以bind时候要使用(*self).(*m)
//bind是一个方法,将这个函数封装起来.
  template <class Self, class MemFn, class... Tag>
  void connect(Self self, MemFn m, Tag... tag)
  {
    funs.push_back(bind(std::move(self), m, tag...));
  }
  //对于如果不使用bind的话,也可以自己来封装:
//注意要使用值捕获而不是引用捕获,因为传进来的指针可能已经销毁了.
  // template <class Self, class MemFn>
  // void connect(Self self, MemFn m)
  // {
  //   funs.push_back([=](T... t) { ((*self).*m)(t...); });  // 如果使用引用就会出现错误，因为外部的变量可能已经被销毁
  // }

//想要麻烦的一个个实现不同的connect,使得传进来的函数,在调用的时候次数是SHOT_TIMES,不想这么再写一个就可以按照上面的写法,再加上一个Tag形参包.
  // template <class Self, class MemFn>
  // void connect_N_shot(Self self, MemFn m, int n = SHOT_TIMES)
  // {
  //   funs.push_back(bind_N_shot(std::move(self), m, n));
  // }

//对于传入weak_ptr而不是shared_ptr的特殊情况,不想单独再写一个就要在bind里面进行动手.
  // template <class Self, class MemFn>
  // void connect_weak(std::weak_ptr<Self> self, MemFn m)
  // {
  //   funs.push_back(bind(std::weak_ptr<Self>(self), m));
  // }

//emit函数,对于vector里面的每一个函数都执行一遍.
//T...t是声明形参.
  void emit(T... t)
  {
    for (auto it = funs.begin(); it != funs.end();) {
    //看看这个函数的返回值是什么
      CallbackResult result = (*it)(t...);
      switch (result) {
        case CallbackResult::KEEP:
          it++;
          break;
        case CallbackResult::ERASE:
        //如果是ERASE就要把它删掉,由于删掉之后返回的迭代器正好指向下一个,直接这么赋值即可.
          it = funs.erase(it);
          break;
      }
    }
  }
};
```

测试用的一个外部结构体:

```cpp
struct A {
  static int id;
  int data = 1000;
 
  void print(int i)
  {
    printf_s("A get %d and data = %d\n", i, data);
    data++;
  }
  A() { printf_s("A construct %d\n", data); }
  ~A() { printf_s("A destruct %d\n", data); }
  void exit(string s1, string s2) const { cout << "A" << s1 << " " << s2 << endl; }
};
```

input 类,里面可以包含各种类型的 Signal

```cpp
struct Input {
  Signal<int> on_input;//一个是参数类型为int的
  Signal<string, string> on_exit;//一个是两个string的.由于上面写好的...t,所以两个也是没问题的.

  void start_loop()
  {
    int input;
    while (cin >> input && input != -1) {
      on_input.emit(input);
      if (input == 100) gloabl_ptr = nullptr;
    }
    on_exit.emit("exit", "!");
  }
};
```

先在外面写一个`global_ptr`来进行相关测试`shared_ptr<A> gloabl_ptr;`

关键的函数:

```cpp
void dummy(Input &input)
{
  auto ptr = make_shared<A>();
  // 捕获shared_ptr不能使用引用,应该直接拷贝:(使用&ptr=ptr会出现错误)
  // 例如只有下面这一句话的时候,就会报错,因为ptr被析构了.如果后面还有用到ptr这里不论是写&还是=都没有问题.
  // input.on_input.connect([&ptr = ptr](int i) { return ptr->print(i); });



  weak_ptr<A> weak_ptr = ptr;//一个weak_ptr,将shared_ptr赋值给它,用来验证shared_ptr没了之后,weak_ptr指向的那个地方是个空.

  shared_ptr<A> shared_a = ptr;

  input.on_input.connect([weak_ptr](int i) {
	 std::shared_ptr<A> shared_a = weak_ptr.lock();
	  if (shared_a != nullptr)
	  shared_a->print(i);
	     else {
       cout << "home is empty" << endl;
     }
   });//如果下面全部注释掉,及聚会输出home is empty,这是因为上面的ptr已经脱离作用域了,没了.



  // 使用weak_ptr导致A已经析构了,所以不会输出任何东西
  // 想要延长生命周期,可以使用一个全局的shared_ptr来指向A,
  gloabl_ptr = shared_a;  // 加上这句话延长了shared_a指向的那个A的对象的生命周期

  // input.on_input.connect(std::weak_ptr(shared_a), &A::print, N_shot_t(3));

  input.on_input.connect(ptr, &A::print, N_shot_t(3));

  // input.on_input.connect(FUN(ptr->print));

  // auto foo = make_unique<A>();

  // input.on_input.connect(FUN(ptr->print));

  // input.on_input.connect([aa = ptr](int i) { aa->print(i); });

  // input.on_input.connect(ptr, &A::print);

  // input.on_input.connect(move(foo), &A::print);

  // input.on_exit.connect(ptr, &A::exit);

}

```

```cpp
#define FUN(f, ...) [=](auto &&...__t) { return f(__VA_ARGS__ __VA_OPT__(, ) forward<decltype(__t)>(__t)...); }
//这个宏是为了减小一下写的麻烦,这样直接写下面这个,看起来就好像不用穿一个对了
input.on_input.connect(FUN(ptr->print));
```

解释一下这个宏:

1. `#define FUN(f, ...)`：定义了一个宏`FUN`，它接受至少一个参数`f`（函数名或可调用对象），后面可以跟随任意数量的参数（这些参数将作为`f`的参数）。
2. `(auto &&...__t)`：这是 lambda 表达式的参数列表，使用了模板参数包和右值引用，允许 lambda 接受任意数量和类型的参数。
3. `{ return f(__VA_ARGS__ __VA_OPT__(, ) forward<decltype(__t)>(__t)...); }`：这是 lambda 表达式的主体。
    - `f(__VA_ARGS__ __VA_OPT__(, ) forward<decltype(__t)>(__t)...)`：调用函数`f`，传递宏参数`__VA_ARGS__`和 lambda 表达式接收到的参数。
    - `__VA_ARGS__`：宏的可变参数，这些参数会直接传递给`f`。
    - `__VA_OPT__(, )`：C++20 中引入的特性，如果`__VA_ARGS__`非空，则插入一个逗号，用于分隔`__VA_ARGS__`和后续的参数。
    - `forward<decltype(__t)>(__t)...`：使用完美转发将 lambda 表达式接收到的参数转发给`f`。`forward`根据参数的类型保持其值类别（左值或右值）。

这个宏在下面这个情况中需要用到:

```cpp
struct A{

	void print(int i,int j)
	{
		cout<<"i="<<i<<"j="<<j<<endl;
	}
}

//这种情况下，如果j想要有个默认值，就可以写成
input.on_input.connect(FUN(ptr->print,99));
i就默认为99.
```

main():

```cpp
int main()

{
  // A a;
  Input input;
  // input.singal.connect([a](std::any i) { a.print(any_cast<int>(i)); });
  dummy(input);
  // input.on_input.connect(bind(&a, &A::print));
  // input.on_input.connect(&a, &A::print);
  // input.on_input.connect(FUN(a.print));
  // input.on_input.connect(FUN(test));
  // input.on_exit.connect([&a](string s1, string s2) { a.exit(s1, s2); });
  // input.on_exit.connect(bind(&a, &A::exit));
  // input.on_exit.connect(&a, &A::exit);
  input.start_loop();
}
```
