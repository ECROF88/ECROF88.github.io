# Rust 中的内存布局

### usize & isize 
usize 无符号整型 ,isiz 有符号整型。
在64位系统上——8bytes。
在32位系统上——4bytes。

### bool
长度和对齐长度都是1byte。

### array
数组的内存布局是系统类型元组的有序组合
`size:n* size_of::<T>`
`align: align_of:<T>`

### struct
结构体的对齐方式就是所有成员的对齐属性的最大值
Rust会在必要的位置填充空白的数据 
```rust

struct A{
    a:u8,
    b:u32, -> => != !== != >= <=  111   
    c:u16,
}
```
内存布局不一定是写的顺序,在这里,b放在最前面,然后是c,a。
按4字节对齐,一共8字节。

### DST (Dynamically Sized Types)
Rust主要有两种主要的DST类型
- `trait objects: dyn SomeTrait`
- `slices: [T] ,str,和其他`
任何指向DST的指针都会变成一个fat pointer,包含DST类型信息
如何类型没有实现Sized,就无法知道东西的大小来产生合理的代码
几乎所有的地方都需要Sized： 
   - struct字段，函数参数，返回值，变量，数组
   - 自定义的Type Bound 自动包含T:Sized,除非写明 T:?Sized
对于DST：   
   - 将非Sized类型放在宽指针后面，宽指针就是一个普通指针附加一个word-sized字段
   - 可以提供给编译器所需要的关注指针的额外信息
例如：Box和Arc都支持存储宽指针，所以都支持T:?Sized



### 地址、大小、值

#### 值删除的顺序
变量和函数的参数是按相反的顺序进行删除的
嵌套的值是按照源代码的顺序进行删除的 

#### 可变引用是独占的：
```rust
fn noalias(a:&i32,b:&mut i32){
    ...
}
```
可以断定在这里a和b一定是不同的值

可变引用只允许修改引用所指向的内存地址
```rust
    let x :i32=42;
    let x2 :i32= 33;
    let mut y :&i32 = &x;
    let z :&mut &i32 = &mut y;
    // z只允许持有对y的一个可变引用 ，但是可通过z修改y的值
    *z = &20;
    // z = &mut &x2; 不可以
    println!("y= {y}"); // 20
```

### 内部可变性
- 通过共享引用获得可变引用
`Mutex 、RefCell`
二者是实现内部可变性的智能指针，允许在逻辑上不可变的数据结构内部进行修改
两种智能指针都依赖于 Rust 标准库中的 `UnsafeCell` 类型。
内部的“不安全”操作被封装在这些智能指针的实现中，用户在正常使用时不需要直接编写 `unsafe` 代码
- 通过共享引用替换值
`std::sync::atomic,std::cell:Cell`
没有提供可变引用到内部值
提供就地操作值的方法
`Cell` 不允许你获取内部的可变引用，因此你不能通过共享引用直接修改内部结构，而是只能通过 `Cell` 提供的接口方法替换整个值
Cell 无法跨线程共享

#### 泛型生命周期
1. 实现Drop的类型：如果一个类型实现了Drop trait，那么在丢弃（drop）该类型的实例时，Rust会认为这个操作使用了该类型的泛型生命周期或类型参数。这意味着在drop方法中，你可能会使用到这些引用，因此借用检查器会确保在drop之前，这些引用仍然是合法的。
2. 未实现Drop的类型：如果一个类型没有实现Drop trait，那么在丢弃该类型的实例时，Rust不会认为这个操作使用了该类型的泛型生命周期或类型参数。因此，类型内部的引用可以被忽略，借用检查器不会对它们进行额外的检查。
例子：
```rust
struct MyType<'a,T>{
    value: &'a T,
}
impl<'a, T> Drop for My<'a, T> {
    fn drop(&mut self) {
        print!("123");
    }
}
fn main(){
    let mut x :i32=100;
    let my :My<'_, i32> = Mytype{value:&x};
    // let b =&mut x; 报错，因为在Mytype{value:&x} 有对x的不可变借用
    // 如果没有实现Drop Trait，就不会检查
}
```
### Variant
- covariant 协变
    某类型只能用子类型代替
    'b:'a ,'b是'a的子类，'b live longer than 'a 
    例如 &'static T 可以代替 &'a T
- invariant 不变
    例如 &mut T, 对T来说是不变的
- contravariant 逆变
    函数对参数的要求越低，参数可发挥的作用越大
    函数的入参是逆变的，出参是协变的
 
#### repr
1. repr(C)
布局方式和C,C++ 编译器对同类型的布局兼容
  - 例如使用FFI与其他语言交互
  - Rust会生成一个匹配其他语言编译器期望的布局
2. #[repr(Rust)]允许重新对字段排序,可以减少填充
3. #[repr(packed)] 字段之间无需任何填充
  - 承担不对齐造成的访问性能损失
  - 可利用于内存有限、低带宽网络连接发送内存表示
  - 若cpu仅支持对齐操作，可导致程序崩溃
4. #[repr(align(n))] 在内存中至少按照n字节的对齐
   - 例如 保证内存中连续存储的不同值位于CPU的不同的缓存行上，避免false sharing
   - 缓存行(cache line)：缓存有缓存行组成，缓存以一个缓存行作为一个单位进行处理
   - 伪共享：多线程环境下。当多个线程各自操作不同的变量时，这些变量恰好位于同一个缓存行内。虽然线程之间并没有逻辑上的数据共享，但由于 CPU 缓存一致性协议（如 MESI 协议）的存在，当一个线程修改了缓存行内的数据，其他线程中对应缓存行的数据就会被标记为无效，迫使这些线程从内存中重新加载数据。
   - 避免多个独立的数据被放到同一个缓存行中，从而减少因伪共享导致的缓存行无效
5. #[repr(transparent)] 
   - 这个属性通常用于创建“透明包装”类型，即新类型（newtype）模式
    ```rust
     #[repr(transparent)]
    struct Meters(f32);
    ``` 
    Meters 类型的内存表示与 f32 完全相同

#### 其他类型的内存表示
1. Tuple： Like Struct
2. 数组
3. Union：所有字段共享内存,对齐就是所有变体最大的
   - Union的读取需要放在unsafe里面
4. enum ：和Union一样，额外有一个隐藏共享字段，用于存储鉴别符
```rust
#[repr(u8)]
enum OverflowingDiscriminantError2 {
    MaxMinusOne = 254, // 254
    Max,               // 255
    MaxPlusOne         // 应该是256，但枚举溢出了。
}
```
零枚举类型 `enum ZeroVariants{}` 零变体枚举与 never类型等效，但它不能被强转为其他类型。
enum 本质是个中tagged union, 是sum type,用一个 byte 来存储 type tag.
enum存在一种优化就是 使用padding 中未定义的内存来存储 type tag

#### static dispatch
`impl` 
为每个类型都复制一份，每份有自己的地址，可以用来跳转
对于方法给定的任何副本，分排到的地址都是静态已知的(编译期间已知)

#### 单态化
一个泛型类型到多个非泛型类型的过程叫单态化
代价：
- 所有示例单独编译，编译时间增加
- 程序更大，每个单态化的都会有一段自己的机器码(二进制文件 膨胀)
- 指令在泛型方法的不同实例种无法共享，CPU指令缓存效率降低

#### 动态分发(dynamic dispatch)
```rust
fn ffff(s:&dyn SomeTrait){}
```



