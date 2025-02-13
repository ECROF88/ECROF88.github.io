# 使用Rust写几个常用的排序算法

### 冒泡排序
```rust
fn bubble_sort(arr:&mut [i32]){
    for i in 0..arr.len()-1{
        for j in i+1..arr.len(){
            if arr[j]<arr[i] {
                arr.swap(i,j);
            }
        }
    }
}
```

### 插入排序
```rust
fn insertion_sort(arr:&mut [i32]){
    for i in 1..arr.len(){
        let mut j=i;
        // 向前比较
        while j>0 && arr[j] < arr[j-1]{
            arr.swap(j,j-1);
            j-=1;
        }
    }
}
```

### 选择排序
```rust
fn selection_sort(arr:&mut [i32]){
    for i in 0..arr.len()-1{
        let mut min_index = i;
        for j in i+1..arr.len(){
            if arr[j]<arr[min_index]{
                min_index =j;
            }
        }
        if i !=min_index {
            arr.swap(i,min_index);
        }   
    }
}
```

### 快速排序
```rust
fn quick_sort(arr:&mut [i32]){
    if arr.len()>1 {
        let pivot_index = partition(arr);
        quick_sort(&mut arr[..pivot_index]);
        quick_sort(&mut arr[pivot_index+1..])
    }
}   
fn partition(arr:&mut [i32]) -> usize{
    let pivot = arr.len()/2;
    let (mut left,mut right) =(0,arr.len()-1);
    while left <right {
        while left < right && arr[right] > arr[pivot]{
            right -=1;
        }
        while left<right && arr[left] < arr[pivot]{
            left+=1;
        }
        if(left != right){
            arr.swap(left,right);
        }
    }
    arr.swap(pivot,left);
    left
}
```