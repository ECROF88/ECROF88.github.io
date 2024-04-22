/* click-effect.js */
document.addEventListener('click', function (event) {
  var sparkle = document.createElement('div');
  sparkle.className = 'firework';
  sparkle.style.top = event.clientY-5 + 'px';
  sparkle.style.left = event.clientX-6 + 'px';
  document.body.appendChild(sparkle);
  // console.log(event.clientX, event.clientY);
  setTimeout(function () {
    document.body.removeChild(sparkle);
  }, 1000);
});
