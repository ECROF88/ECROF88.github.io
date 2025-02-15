# windows 下 wezterm 配置

## 在 ~/.config/ 下新建wezterm文件夹 (.config文件夹没有就自己建一个)

### wezterm/wezterm.lua
```lua
local wezterm = require 'wezterm'
-- 系统平台判断工具
-- local platform = require('utils.platform')

-- 初始化配置对象
local config = wezterm.config_builder()

-- 外观配置
local appears = require 'config.appears'
appears.apply(config)
-- shell 菜单配置
local launch = require 'config.launch'
launch.apply(config)
-- 快捷键配置
local keys = require 'config.keys'
keys.apply(config)

-- 窗口初始化
-- 读取上次窗口打开的位置
local position_file_path = wezterm.home_dir .. "/.wezterm_position"
local file, err = io.open(position_file_path, "r")
if not file then
    current_screen = ''
else
    current_screen = file:read("*all")
end

-- 启动监听，初始化窗口
wezterm.on("gui-startup", function(cmd)
    
    -- 遍历，找到对应的显示器名称
    local screen
    local screens = wezterm.gui.screens().by_name
    for name_tmp, screen_tmp in pairs(screens) do
        if name_tmp == current_screen then
            -- 此处给全局变量 current_screen 赋值了，在“update-status”事件中有用到
            current_screen = name_tmp
            screen = screen_tmp
        end
    end

    -- 如果找不到指定显示器，就取默认值 main
    if screen == nil then
        screen = wezterm.gui.screens().main
    end

    -- 初始化窗口
    -- local ratio = 0.7
    -- local width, height = screen.width * ratio, screen.height * ratio
    local width, height = 800, 500  --指定窗口宽高，单位 px
    local tab, pane, window = wezterm.mux.spawn_window(cmd or {
        -- width = 50,  -- 这个长宽是行列数，不适合用来计算
        -- height = 30,
        position = { 
            x = (screen.width - width) / 2, 
            y = (screen.height - height) / 2 * 0.8,  -- 乘以 0.8 让窗口稍微偏上一些更舒适
            origin = {Named=screen.name}
        },
    })
    window:gui_window():set_inner_size(width, height)  -- 这里的长宽单位是 px
end)

-- 监听状态变化事件，记录窗口位置变化
wezterm.on('update-status', function(window, pane)
    if window:is_focused() then
        --记录当前窗口所位于的屏幕，下次从这打开
        -- 一定要用 is_focused 判断，因为 wezterm.gui.screens().active 返回的是拥有焦点的屏幕
        -- 比如把 wezterm 放在了屏幕 1，鼠标放到了屏幕 2 的 vscode 里，此时 active 的是屏幕 2
        local active_name = wezterm.gui.screens().active.name
        if current_screen ~= active_name then
            local file, err = io.open(position_file_path, "w")
            file:write(active_name)
            file:close()
            current_screen = active_name
        end
    end
end)
for i = 1, 8 do
    -- CTRL + number to activate that tab
    table.insert(config.keys, {
      key = tostring(i),
      mods = 'CTRL',
      action = wezterm.action.ActivateTab(i - 1),
    })
  end
-- 返回配置内容
return config

```

### wezterm/utils/platform.lua
```lua
local wezterm = require('wezterm')

local function is_found(str, pattern)
   return string.find(str, pattern) ~= nil
end

local function platform()
   return {
      is_win = is_found(wezterm.target_triple, 'windows'),
      is_linux = is_found(wezterm.target_triple, 'linux'),
      is_mac = is_found(wezterm.target_triple, 'apple'),
   }
end

return platform

```

### wezterm/config/
下面这些文件放在config目录下面
#### appears.lua
字体没有可以自己设置
```lua
-- 外观设定
local wezterm = require 'wezterm'
local module = {}
function module.apply(config)

    config.enable_scroll_bar = true
--     local materia = wezterm.color.get_builtin_schemes()['Gruvbox dark, hard (base16)']
-- materia.scrollbar_thumb = '#cccccc' -- 更明显的滚动条
-- config.colors = materia

    -- 主题
    -- 自定义主题
    -- config.color_scheme_dirs(wezterm.config_dir .. "/assets/color_scheme/OneHalfDark.oml")
    -- config.colors = wezterm.color.load_scheme(wezterm.config_dir .. "/assets/color_scheme/OneHalfDark.oml")
    -- 预置主题 https://wezfurlong.org/wezterm/colorschemes/index.html
    -- 其他可获取主题的项目：
        -- iTerm2-Color-Schemes，https://github.com/mbadolato/iTerm2-Color-Schemes#screenshots
        -- base16，https://github.com/chriskempson/base16-schemes-source
        -- Gogh，https://gogh-co.github.io/Gogh/
        -- terminal.sexyhttps://terminal.sexy/
    -- config.color_scheme = 'Aci (Gogh)'
    config.color_scheme = 'Gruvbox Dark (Gogh)'
    -- config.color_scheme = 'Breath Darker (Gogh)'  -- manjaro 的感觉！
    -- 字体
    -- config.font = wezterm.font_with_fallback('Iosevka','JetBrainsMono Nerd Font', { weight = 'Bold' })
    config.font = wezterm.font_with_fallback {
        { family = 'Iosevka', weight = 'Bold' },
        { family = '霞鹜文楷等宽', weight = 'Medium'  },
      }
    config.font_size =14
    -- 窗口标题栏配置。隐藏系统标题栏，将窗口按钮集成到标签栏，允许调整窗口大小。
    config.window_decorations = "INTEGRATED_BUTTONS|RESIZE"  -- 
    -- 窗口关闭确认，不弹出
    config.window_close_confirmation = 'NeverPrompt'
    -- 标签的标题渲染，false 表示使用复古样式
    config.use_fancy_tab_bar = false
    -- 单标签页时隐藏标签栏
    -- config.hide_tab_bar_if_only_one_tab = true
    
    -- 背景不透明度
    config.window_background_opacity = 0.7
    -- 背景亚克力效果（Windows系统） Acrylic|Mica|Tabbed
    -- 窗口失去焦点时就失效了！不知道是否可配置成一直生效，github issue：https://github.com/wez/wezterm/issues/5895
    -- config.win32_system_backdrop = 'Acrylic'
    -- 背景亚克力效果（MacOS系统）
    -- config.macos_window_background_blur = 20
    -- 背景颜色渐变（不会用眼睛要瞎了..）
    -- config.window_background_gradient = {
    --     -- 使用预置效果
    --     preset = 'Blues'
    -- }
    -- GPU 加速配置，默认的应该就可以了，这里写出来测试下，用了之后亚克力效果失效了，可能是我不会用
    -- local gpus = wezterm.gui.enumerate_gpus()
    -- config.front_end = 'WebGpu'
    -- config.webgpu_preferred_adapter = gpus[1] -- lua 数组索引从 1 开始，异端
    -- config.webgpu_power_preference = "HighPerformance"
end

return module

```
#### keys.lua
```lua
-- 快捷键绑定
local wezterm = require 'wezterm'
local module = {}
function module.apply(config)
    config.keys = {
        { key = 'm',  mods = 'CTRL', action = wezterm.action.ShowLauncher },
        { key = 'm', mods = 'CTRL|ALT', action = wezterm.action.ShowTabNavigator },
        -- Ctrl+Shift+N 新窗口
        { key = 'N', mods = 'SHIFT|CTRL', action = wezterm.action.SpawnWindow },
        -- Ctrl+Shift+T 新 tab
        { key = 'T', mods = 'SHIFT|CTRL', action = wezterm.action.ShowLauncher },
        -- Ctrl+Shift+Enter 显示启动菜单
        { key = 'Enter', mods = 'SHIFT|CTRL', action = wezterm.action.ShowLauncherArgs { flags = 'FUZZY|TABS|LAUNCH_MENU_ITEMS' } },
        { key = 'w', mods = 'CTRL', action = wezterm.action.CloseCurrentTab { confirm = false } },
    }
end
return module

```

#### lanch.lua
配置支持的shell,没有的可以自己改
```lua
-- Shell 配置
local wezterm = require 'wezterm'
local ps={ label = 'PowerShell', args = { 'C:/Program Files/PowerShell/7/pwsh.exe' } }
local msys2 = { label = 'MSYS / MSYS2', args = { 'C:/msys64/msys2_shell.cmd', '-defterm', '-here', '-no-start' }}
local archwsl = { label = 'Arch-wsl', args = { 'C:/Windows/system32/wsl.exe' ,'-d','Arch' }}
local ubuntuwsl = { label = 'Ubuntu-wsl', args = { 'C:/Windows/system32/wsl.exe' ,'-d','Ubuntu' }}
local launch_menu = {ps, msys2, archwsl,ubuntuwsl}
local module = {}
function module.apply(config)
    -- 默认终端
    config.default_prog = msys2.args
    -- shell 菜单列表
    config.launch_menu = launch_menu
end


return module

```
