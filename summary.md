# Weather APP Summary

## 問題

1. style.css 一开始没有生效
   原因：html 中链接 css 文件的 tag 写错了，写成了 meta，应该是 link,正确代码如下:
   ```html
   <link rel="stylesheet" href="./style.css" />
   ```

## 新知识

1. API 的调用，这次用了 openweather 的 API，知道了怎么查看 API 的参数调用方法，内容。同样都是天气 API，darksky API 从 icon 获取天气图标的方法就不一样。有些 API 不支持从本地 host 调用，这时，可以在调用 API 前加如下代码:

   ```JavaScript
    const proxy = 'https://cors-anywhere.herokuapp.com/';
    const api = `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${long}`
   ```

   定义 API 后，用`fetch(api)`从服务器获得 API 数据，先确认收到 response,用 json 形式，接下来处理获得的数据。具体代码如下:

   ```JavaScript
   fetch(api)
       .then((response) => {
           return response.json();
       })
       .then((data) => {...})
       .then(...);
   ```

2. \<div>作用：block 一块区域作为一个整体,再加入`class=...`，之后在设置 css 格式，或用 js 添加功能时，可以分区指定编辑，很方便。</br>
   css: `.(classname){...}`(千万不要漏掉前面的`.`)</br>
   js:

   ```JavaScript
   let x = document.querySelector(".(classname)"); //获得class
   x.textContent = (...) //定义x中的显示内容
   ```

3. `navigator.geolocation`是 boolean 值，可以判断网页是否允许获取用户当前地理位置

4. 可以用`console.log(...)`输出一些变量内容来 debug，查看时打开**Developer Tool（Mac: cmd+opt+I）**，console 部分会显示输出，如有错误，点击错误代码出跳转到 source 处查看具体内容。
5. opt+shift+8 可以打出小圈符号`°`

## 待处理

1. id 和 class 区别
2. js 的 DOC 是什么
3. \<span>\</span>tag 的用处
