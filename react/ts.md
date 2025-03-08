# TypeScript

### 常量枚举
使用const定义enum,编译时候会内联，避免产生额外的代码
```ts
const enum Direction {
    Up,Down,Left,Right
}
let x = Direction.Up 
// 编译之后的代码：
let x =0 /* Direction.Up*/
```

### type
为任意类型创建别名
- `type uuzi = number`
- `type Status = number | string`
- `type Gender = 'Male' | 'Female'`
- 交叉类型
```ts
type Area = {
    height : number;
    width : number;
};
type Address = {
    cell:number
    room:string
}
type House = Area & Address
```
-`type SomeFun= ()=> void`

### void
函数返回声明为void，可以返回undefined
```ts
// 1. 显式返回 undefined
function f1(): void {
  return undefined;
}
// 2. 空的 return 语句
function f2(): void {
  return;
}
// 3. 没有 return 语句
function f3(): void {
  // 什么也不做
}

```

### void类型特殊行为
```ts
type Fun =() => void

const f1:Fun = functino (){
    return 123;
}
let x = f1()
console.log(x) // 123
if(x){ // 报错！
    ...
}
```
可以返回123的原因：
兼容js：例如箭头函数语句只有一句的时候 可以不写{}，直接简写


### class
```ts
class Person {
  name:string
  age:number
  constructor(name:string,age:number){
    this.name = name
    this.age = age
  }
  speak(){
    ...
  }
}
```

### interface
```ts
interface IPerson {
    name:string
    age:number
    speak (n:void):void
}
//可以被class implement
class Person implements IPerson {
    constuctor(
        public name:string,
        public age:number
    ){}
    speak(n:number):void{
        for(let i=0;i<n;i++){
            **console**.log(`${i}`);
        }
    }
}
// 也可以直接当类型用
const user:IPerson ={
    ...
}
```
定义函数结构：
```ts
interface CountInterface {
    (a:number, b:number):number;
}
const count: CountInterface =(x,y)=>{
    return x+y
}
```
接口的继承
```ts
interface A{
    a:number
}
interface AB extends A{
    b:string
}
const ab:AB = {
    a:1,
    b:'b'
}
```
接口的可重复定义
```ts
interface RoomInterface {
    area:number
}
interface RoomInterface{
    name:string
}
const r:RoomInterface ={
    name:'a room',
    area:100
}
```