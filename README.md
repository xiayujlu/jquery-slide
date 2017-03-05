# 立即使用
```
<body>
  <div class="keke">
    <img src="images/1.jpg">
    <img src="images/2.jpg">
    <img src="images/3.jpg">
    <img src="images/4.jpg">
  </div>
  <script src="https://cdn.bootcss.com/jquery/3.1.1/jquery.min.js"></script>
  <script src="js/Slide.js" charset="utf-8"></script>
  <script type="text/javascript">
    $('.keke').slides({
        width: 480,
        height: 360,
        auto: 4000,
        duration: 800
    })
  </script>
</body>
```
# options参数
- width:设置图片宽度
- height:设置图片高度
- auto:设置自动播放时间间隔(可选)
- duration:设置切换时长

# 注意
1. 插件依赖jQuery库，所以在引用插件之前要先引入jQuery。
2. 传入的对象应为jQuery对象，原生DOM对象无效。
