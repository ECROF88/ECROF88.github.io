/* click-effect.js */
// document.addEventListener('click', function (event) {
//   var sparkle = document.createElement('div');
//   sparkle.className = 'firework';
//   sparkle.style.top = event.screenY-5 + 'px';
//   sparkle.style.left = event.screenX-6 + 'px';
//   document.body.appendChild(sparkle);
//   // console.log(event.clientX, event.clientY);
//   setTimeout(function () {
//     document.body.removeChild(sparkle);
//   }, 560);
// });


// window.requestAnimationFrame()这个API是浏览器提供的js全局方法，针对动画效果
// 浏览器可以优化并行的动画动作，更合理的重新排列动作序列，并把能够合并的动作放在一个渲染周期内完成，从而呈现出更流畅的动画效果
// 可以调节重新渲染，大幅提高网页性能。其中最重要的，它可以将某些代码放到下一次重新渲染时执行。避免短时间内触发大量reflow
(function(window,document,undefined){
  var hearts = [];
  window.requestAnimationFrame = (function(){
    // 有了这句话，就形成了递归调用，设置应为这个函数多用在持续的动画中
    return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback){
      setTimeout(callback,1000/60);
    }
  })();
  init();
  function init(){
    css(".heart{width: 10px;height: 10px;position: fixed;background: #f00;transform: rotate(45deg);-webkit-transform: rotate(45deg);-moz-transform: rotate(45deg);}.heart:after,.heart:before{content: '';width: inherit;height: inherit;background: inherit;border-radius: 50%;-webkit-border-radius: 50%;-moz-border-radius: 50%;position: absolute;}.heart:after{top: -5px;}.heart:before{left: -5px;}.character{position: fixed;}");
    attachEvent();
    gameloop();
  }
  function gameloop(){
    for(var i=0;i<hearts.length;i++){
      if(hearts[i].alpha <=0){
        document.body.removeChild(hearts[i].el);
        hearts.splice(i,1);
        continue;
      }
      hearts[i].y--;
      hearts[i].scale += 0.004;
      hearts[i].alpha -= 0.013;
      // hearts[i].el.style.cssText = "left:"+hearts[i].x+"px;top:"+hearts[i].y+"px;opacity:"+hearts[i].alpha+";transform:scale("+hearts[i].scale+","+hearts[i].scale+") rotate(45deg);background:"+hearts[i].color;
      hearts[i].el.style.cssText = "left:"+hearts[i].x+"px;top:"+hearts[i].y+"px;opacity:"+hearts[i].alpha+";transform:scale("+hearts[i].scale+","+hearts[i].scale+");color:"+hearts[i].color;
    }
    requestAnimationFrame(gameloop);
  }
  function attachEvent(){
    var old = typeof window.onclick==="function" && window.onclick;
    // 点击出现爱心/颜文字
    window.onclick = function(event){
      old && old();
      // createHeart(event);
      createTexts(event);
    }
    // ==========================================================================================================
    // 把原本的点击出现爱心改为移动出现爱心/颜文字
    let currentTime = new Date().getTime();
    window.onmousemove = function(event){
      if(new Date().getTime() - currentTime > 200) {//这里的判断在于每隔100毫秒生成一个爱心
        currentTime = new Date().getTime();
        // createHeart(event);
        createTexts(event);
      }
    }
  }
  // 创建爱心
  function createHeart(event){
    var d = document.createElement("div");
    d.className = "heart";
    hearts.push({
      el : d,
      x : event.clientX - 5,
      y : event.clientY - 5,
  
      scale : 1,
      alpha : 1,
      color : randomColor()
    });
    document.body.appendChild(d);
  }

  const CharArray = ["O(∩_∩)O~","┭┮﹏┭┮","(#^.^#)","♪(^∇^*)","o(*￣︶￣*)o","(*^▽^*)","w(ﾟДﾟ)w","(๑′ᴗ‵๑)"];
  // 创建颜文字
  function createTexts(event){
    var span = document.createElement("span");
    span.className = "character";
    var i = Math.floor(Math.random() * CharArray.length);
    span.textContent = CharArray[i];
    hearts.push({
      el : span,
      x : event.clientX - 5,
      y : event.clientY - 5,
      scale : 1,
      alpha : 1,
      color : randomColor()
    });
    document.body.appendChild(span);
  }
  // 把css样式添加到创建的元素中
  function css(css){
    var style = document.createElement("style");
    style.type="text/css";
    try{
      style.appendChild(document.createTextNode(css));
    }catch(ex){
      style.styleSheet.cssText = css;
    }
    document.getElementsByTagName('head')[0].appendChild(style);
  }
  // 随机颜色
  function randomColor(){
    return "rgb("+(~~(Math.random()*255))+","+(~~(Math.random()*255))+","+(~~(Math.random()*255))+")";
  }
})(window,document);