---
icon: pen-to-square
date: 2024-07-11
category:
  - tip
---
# 回溯和剪枝

## 1. 流程

以在树中寻找 val=7 的节点为例,返回搜索的路径:

辅助函数

```cpp
bool isSolution(vector<Node *> &state) { return !state.empty() && state.back()->val == 7; }
void recordSolution(vector<Node *> &state, vector<vector<Node *>> &res) { res.push_back(state); }
bool isValid(vector<Node *> &state, Node *chioce) { return chioce != nullptr && chioce->val != 3; }
void makechioce(vector<Node *> &state, Node *&chioce) { state.push_back(chioce); }
void unmakechioce(vector<Node *> &state) { state.pop_back(); }

```

核心代码,通用范例
对于不合法的剪枝,合法的进行选择尝试,然后进行下一轮选择,最后进行回溯(undo).

```cpp
void backtrack(vector<Node *> &state, vector<Node *> chioces, vector<vector<Node *>> &res)
{
  if (isSolution(state))
  {
    recordSolution(state, res);
    return;
  }
  // 遍历所有的选择：
  for (auto chioce : chioces)
  {
    if (isValid(state, chioce))
    {
      makechioce(state, chioce);
      vector<Node *> nextchioces = {chioce->left, chioce->right};
      backtrack(state, nextchioces, res);
      unmakechioce(state);
    }
  }
}
```

### 全排列问题

只分析一下存在重复元素的全排列问题

```cpp
void backtrack(vector<int>& state, vector<int>& chioces, vector<bool>& selected, vector<vector<int>>& res)
{
  if (state.size() == chioces.size())
  {
    res.push_back(state);
    return;
  }
  unordered_set<int> used;
  // set中没有重复元素，所以可以用set来判断是否有重复元素,每一层选择都会创建一个新的set
  for (int i = 0; i < chioces.size(); i++)
  {
    int chioce = chioces[i];
    if (!selected[i] && used.find(chioce) == used.end())
    {
      used.emplace(chioce);
      selected[i] = true;
      state.push_back(chioces[i]);
      backtrack(state, chioces, selected, res);
      selected[i] = false;
      state.pop_back();
    }
  }
}
```

### 子集和问题

##### 1.无重复元素的情况

由于子集和问题可以选择重复的元素,而且最后的结果中每个子序列是不能重复的,例如[4,5]和[5,4]就是重复的,按照之前的方法得到的结果会出现重复的子序列.因此要进行剪枝.

首先就是如何判断什么`state`在什么状态下是`Solution`,进行`res.push_back(state)`的操作:
给函数增加一个参数`target`,然后每次都是去找一个比`target`小的元素把这个元素加入`state`中.然后下一次函数传入的`target`就是`target-choice`.
当出现`target==0`的时候,说明这个`state`是一个解,加进`res`中.

为了防止出现重复子集,需要先对整个数组进行排序,记录一个`start`,每次只能从`start`开始选择,不能选前面的比它小的元素.

代码:

```cpp
void backtrack(vector<int>& state, vector<int>& chioces, vector<vector<int>>& res, int target, int start)
{
  if (target == 0)
  {
    res.push_back(state);
    return;
  }
  for (int i = start; i < chioces.size(); i++)
  {
    int chioce = chioces[i];
    if (target < chioce) return;
    state.push_back(chioces[i]);
    backtrack(state, chioces, res, target - chioce, i);
    state.pop_back();
  }
}
```

##### 2.有重复元素的情况

由于前面已经给排序好了,所以只需要判断当前元素和前面的元素是不是相同的,是相同的就直接跳过去.
当然这里也可以直接把数组去重并排序:
使用`chioces.erase(std::unique(chioces.begin(),chioces.end()),chioces.end())`

```cpp
void backtrack2(vector<int>& state, vector<int>& chioces, vector<vector<int>>& res, int target, int start)
{
  if (target == 0)
  {
    res.push_back(state);
    return;
  }
  for (int i = start; i < chioces.size(); i++)
  {
    int chioce = chioces[i];
    if (target < chioce) return;
    if (i > start && chioces[i] == chioces[i - 1]) continue;  // 避免重复(如果有重复元素)
    state.push_back(chioces[i]);
    backtrack2(state, chioces, res, target - chioce, i);
    state.pop_back();
  }
}
```

### N 皇后问题

```cpp
// N皇后问题，皇后的数量和棋盘的大小相同，皇后之间不能在同一行，同一列，同一对角线上
void backtrack(int row, int n, vector<vector<string>>& state, vector<vector<vector<string>>>& res, vector<bool> col,vector<bool> slash, vector<bool> backslash)
{
  // 从上到下每一行放一个，row表示当前放到第几行
  if (row == n)
  {
    res.push_back(state);
    return;
  }
  for (int i = 0; i < n; i++)
  {
    int slash_index = row - i + n - 1;  // 主对角线
    int backslash_index = row + i;      // 副对角线
    // 如果当前列，主对角线，副对角线都没有放置皇后
    if (!col[i] && !slash[slash_index] && !backslash[backslash_index])
    {
      col[i] = true;

      slash[slash_index] = true;

      backslash[backslash_index] = true;

      state[row][i] = 'Q';

      backtrack(row + 1, n, state, res, col, slash, backslash);

      col[i] = false;

      slash[slash_index] = false;

      backslash[backslash_index] = false;

      state[row][i] = '#';

    }
  }
}

int main()
{
  int n = 8;
  vector<vector<vector<string>>> res;
  vector<vector<string>> state(n, vector<string>(n, "#"));
  vector<bool> col(n, false);
  vector<bool> slash(2 * n - 1, false);
  vector<bool> backslash(2 * n - 1, false);
  
  backtrack(0, n, state, res, col, slash, backslash);

  int count = 1;
  for (auto v : res)
  {
    cout << "Solution:" << count++ << endl;
    for (auto s : v)
    {
      for (auto c : s)
      {
        cout << c << "";
      }
      cout << endl;
    }
    cout << endl;
  }
}
```

八皇后问题共有92个解.