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

### 计数排序
```rust
fn main() {
    let arr = vec![3, 2, 3, 4, 5, 4];
    let sorted_arr = count_sort(&arr);
    println!("{:?}", sorted_arr);
}

fn count_sort(arr: &Vec<i32>) -> Vec<i32> {
    let min = *arr.iter().min().unwrap();
    let max = *arr.iter().max().unwrap();

    let range = (max - min + 1) as usize;

    let mut count_arr = vec![0; range];

    for i in 0..arr.len() {
        count_arr[arr[i] as usize - min as usize] += 1;
    }

    // 计算累计频次
    for i in 1..range {
        count_arr[i] += count_arr[i - 1];
    }

    let mut result = vec![0; arr.len()];

    for i in (0..arr.len()).rev() {
        let cur_element = arr[i];
        let count_index = (cur_element - min) as usize;
        let position = count_arr[count_index] - 1;
        result[position] = cur_element;
        count_arr[count_index] -= 1;
    }

    result
}
```

### 优雅的基数排序
基于前面的计数排序
```rust
fn radix_sort(arr: &Vec<i32>) -> Vec<i32> {
    let mut result = arr.clone();

    let max = *arr.iter().max().unwrap();
    let max_digits = max.to_string().len();
    // let max_digits = (max as f64).log10().floor() as u32 + 1;
    for digit in 0..max_digits {
        result = counting_sort(result, digit);
    }

    result
}

fn counting_sort(arr: Vec<i32>, digit: usize) -> Vec<i32> {
    let mut buckets: Vec<Vec<i32>> = vec![Vec::new(); 10];

    for num in arr {
        let digit_value = (num.abs() / 10_i32.pow(digit as u32)) % 10;
        buckets[digit_value as usize].push(num);
    }

    buckets.into_iter().flatten().collect()
}

```