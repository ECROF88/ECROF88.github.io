---
icon: pen-to-square
date: 2024-07-11
category:
  - tip
---
# 让一个vector里面的0翻倍

只能原地更改，不能借用 temp。数组长度不变，多出来的删除。

例如：

`10204`->`10020`

```cpp
void doublezero(vector<int>& nums)

{
  // 就地更改
  int i = 0, j = 0;
  while (j < nums.size())
  {
    if (nums[i] == 0) j++;
    i++;
    j++;
  }
  // i的位置就是要截断的位置。
  i--;
  j--;
  while (i >= 0)
  {
    if (j < nums.size()) nums[j] = nums[i];
    if (nums[i] == 0 && --j > 0) nums[j] = 0;
    i--;
    j--;
  }
}

int main()
{
  vector<int> nums = {1, 0, 2, 0, 3};
  doublezero(nums);
  for (auto i : nums) printf("%d ", i);
}
```
