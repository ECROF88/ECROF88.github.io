# windows MSYS2 配置

## 先下载安装msys2
如果有个找数据库的部分，卡住50%，可以断网之后自动跳过

## 参考教程wezterm，使用wezterm打开msys2终端
1. 下载fish 
   `pacman -S fish`,下载之后输入fish切换到fish，fish自带开箱即用高亮显示，如果想获得与bash更好的兼容性推荐使用zsh+插件

2. 下载gcc和llvm
-  输入`pacman -Ss gcc` 可以找到这一项
   ```
    mingw64/mingw-w64-x86_64-gcc 14.2.0-2 (mingw-w64-x86_64-toolchain) [已安装]
    GNU Compiler Collection (C,C++,OpenMP) for MinGW-w64
    ```
    我这里是已经安装了
    安装方法就是`pacman -S mingw-w64-x86_64-toolchain`,有选项就选1，全选
-  输入`pacman -Ss llvm`
  找到这个
  ```
  clang64/mingw-w64-clang-x86_64-llvm 19.1.7-1 (mingw-w64-clang-x86_64-toolchain) [已安装]
  ```
  使用`pacman -S mingw-w64-clang-x86_64-toolchain` 安装

3. 下载一些小工具
   - 例如`mingw-w64-clang-x86_64-eza`代替`ls`
   - `mingw-w64-clang-x86_64-fastfetch`代替`neofetch`
   - `mingw-w64-clang-x86_64-fd` 代替`find `

### other
由于使用了配置了wezterm，你可以ctrl+w 快速关闭一个窗口

ctrl+shift+enter 快速选择一个新窗口打开