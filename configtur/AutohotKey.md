# AutoHotKey 配置

效果：(o3mini说的)

1. 使 CapsLock 失效并充当 Ctrl 键：
   
通过 SetCapsLockState("alwaysoff") 禁用 CapsLock 自身的切换功能。
当单独按下 CapsLock 时，不是切换大小写，而是发送 Ctrl 键的按下和释放事件，让它在组合键中充当 Ctrl 键的作用。
2. 单独点击 CapsLock 发送 Esc：

当只点击 CapsLock（即按下后没有再按其他键），脚本检测到最后的按键依然是 CapsLock（A_PriorKey == "CapsLock"）并且全局变量 g_DoNotAbortSendEsc 为 true 时，会发送 Esc 键。这可以用来触发输入法的切换或其它设定的功能。
```ahk
#Requires AutoHotkey v2
; Install the keyboard hook to capture the real key state of the keyboard
InstallKeybdHook(true)
; Disable the CapsLock key
SetCapsLockState("alwaysoff")
; Send esc key when Capslock is pressed as default
g_DoNotAbortSendEsc := true

$*Capslock::{ ; Capture CapsLock key press
  global g_DoNotAbortSendEsc ; use global variable g_DoNotAbortSendEsc
  g_DoNotAbortSendEsc := true ; set g_DoNotAbortSendEsc to true
  Send("{LControl Down}") ; send Ctrl key down
  KeyWait("CapsLock") ; capture CapsLock key up
  Send("{LControl Up}") ; send Ctrl key up
  if (A_PriorKey == "CapsLock" ; if the last key is Capslock
     && g_DoNotAbortSendEsc) { ; if the g_DoNotAbortSendEsc is true
    Send("{Esc}") ; send Esc key
  }
  return
}
LCtrl::#Space  ;
; capture any key with Ctrl key down
~^*a:: ; * means can be used with any modifier key, ~ means donot block the original key, ^ means Ctrl key, a means the key is a
~^*b::
~^*c::
~^*d::
~^*e::
~^*f::
~^*g::
~^*h::
~^*i::
~^*j::
~^*k::
~^*l::
~^*m::
~^*n::
~^*o::
~^*p::
~^*q::
~^*r::
~^*s::
~^*t::
~^*u::
~^*v::
~^*w::
~^*x::
~^*y::
~^*z::
~^*1::
~^*2::
~^*3::
~^*4::
~^*5::
~^*6::
~^*7::
~^*8::
~^*9::
~^*0::
~^*Space::
~^*Backspace::
~^*Delete::
~^*Insert::
~^*Home::
~^*End::
~^*PgUp::
~^*PgDn::
~^*Tab::
~^*Enter::
~^*,::
~^*.::
~^*/::
~^*;::
~^*'::
~^*[::
~^*]::
~^*\::
~^*-::
~^*=::
~^*`::
~^*F1::
~^*F2::
~^*F3::
~^*F4::
~^*F5::
~^*F6::
~^*F7::
~^*F8::
~^*F9::
~^*F10::
~^*F11::
~^*F12::{
  global g_DoNotAbortSendEsc
  g_DoNotAbortSendEsc := false
}
```