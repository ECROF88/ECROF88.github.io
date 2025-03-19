# 学习Rust的设计模式

## 实现观察者模式，且不使用dyn Trait的实现
一开始让AI来写，但是全是使用dyn Trait 以及 Box+Any等方法的实现。

本次是探讨是否可以用无虚表开销等方式的实现。

写这个灵感来自于看了·小彭大典·里面的CPP教程的实现
`https://142857.red/book/design_gamedev/`

```rust
use std::collections::HashMap;

// 消息类型枚举
#[derive(Debug, Clone)]
pub enum Message {
    Move { velocity_change: Vec3 },
    Other { data: String },
}

// 简单的向量结构
#[derive(Debug, Clone, Copy, Default)]
struct Vec3 {
    x: f32,
    y: f32,
    z: f32,
}

impl Vec3 {
    fn new(x: f32, y: f32, z: f32) -> Self {
        Self { x, y, z }
    }

    fn add(&mut self, other: Vec3) {
        self.x += other.x;
        self.y += other.y;
        self.z += other.z;
    }
}

pub trait IsComponent {
    fn update(&mut self);

    fn handle_message(&mut self, msg: Message);
}

#[derive(Debug, Clone, Copy)]
struct Movable {
    position: Vec3,
    velocity: Vec3,
}

impl IsComponent for Movable {
    fn update(&mut self) {}

    fn handle_message(&mut self, msg: Message) {
        match msg {
            Message::Move { velocity_change } => {
                // self.velocity += velocity_change;
                println!("收到消息");
                self.velocity.add(velocity_change);
            }
            _ => {
                println!("not move msg")
            }
        }
    }
    // fn subscribe_messages(&mut self, go: &mut GameObject) {
    //     go.subscribe(EventType::MoveMessage, self);
    // }
}

// 组件枚举
#[derive(Debug, Clone, Copy)]
enum Component {
    Movable(Movable),
}

impl Component {
    fn update(&mut self, go: &GameObject) {
        match self {
            Component::Movable(movable) => {
                movable.update();
            }
        }
    }

    fn handle_message(&mut self, msg: Message) {
        match self {
            Component::Movable(movable) => {
                movable.handle_message(msg);
            }
        }
    }

    fn subscribe_messages<'a: 'b, 'b>(&'a mut self, go: &mut GameObject<'b>) {
        go.subscribe(EventType::MoveMessage, self);
    }
}

// 事件类型
#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
enum EventType {
    MoveMessage,
    // OtherMessage,
}

struct GameObject<'a> {
    // components: Vec<&'a Component>,
    subscribers: HashMap<EventType, Vec<&'a mut Component>>, // 存储组件在components中的索引
}

impl<'a> GameObject<'a> {
    fn new() -> Self {
        Self {
            // components: Vec::new(),
            subscribers: HashMap::new(),
        }
    }

    // 这里被生命周期问题折磨了一段时间，现在对生命周期的理解比以前清晰了
    fn subscribe<'b: 'a>(&mut self, event_type: EventType, component: &'b mut Component) {
        self.subscribers
            .entry(event_type)
            .or_insert_with(Vec::new)
            .push(component);
    }

    // 暂时没有写这个add方法，有一个问题
    // 如果搞两个vector的话，往里面添加同一个Component
    // 不能一个是共享引用，一个是可变独占引用
    // fn add(&mut self, component: &'a Component) {
    //     self.components.push(component);
    // }

    fn send(&mut self, event_type: EventType, message: Message) {
        if let Some(subscribers) = self.subscribers.get_mut(&event_type) {
            // for cp in subscribers {
            //     cp.handle_message(message.clone());
            // }
            let _ = subscribers
                .iter_mut()
                .for_each(|cp| cp.handle_message(message.clone()));
        }
    }

    fn update(&mut self) {
        println!("GameObject updated");
    }
}
```
## 接下来就是main函数的效果
```rust
fn main() {
    let mut game_object = GameObject::new();

    let mut movable_component = Component::Movable(Movable {
        position: Vec3 {
            x: 0.0,
            y: 0.0,
            z: 0.0,
        },
        velocity: Vec3 {
            x: 1.0,
            y: 1.0,
            z: 1.0,
        },
    });

    movable_component.subscribe_messages(&mut game_object);
    // 发送移动消息
    game_object.send(
        EventType::MoveMessage,
        Message::Move {
            velocity_change: Vec3::new(1.0, 2.0, 3.0),
        },
    );

    game_object.update();
}

```
打印：
```
收到消息
GameObject updated
```