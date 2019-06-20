## 在线涂鸦画板

### 功能：

+ **调节笔颜色**
+ **调节笔粗细**
+ **清空画板**
+ **返回上一步**
+ **保存下载**

### 难点实现方法

#### 1. 返回功能

> 先定义一个数组canvasHistory，在鼠标松开的时候将本次保存到canvasHistory中，点击返回时将画板清空然后将上一步画板信息在canvas中画出。
>
##### 主要属性

1. getImageData

    返回 ImageData 对象，该对象拷贝了画布指定矩形的像素数据。

2. putImageData

   将图像数据（从指定的 ImageData 对象）放回画布上。

   

```js
canvas.ontouchend = function () {
    step++;
    canvasHistory.push(context.getImageData(0, 0, yyy.width, yyy.height))
}
```
```js
cancel.onclick = function () {

    if (step >= 0) {
        step--;
        context.clearRect(0, 0, yyy.width, yyy.height)
        context.putImageData(canvasHistory[step], 0, 0)
        console.log(step, context)
    } else {
        console.log('不能再继续撤销了');
    }
}
```



#### 2. 保存下载

将画板图案用toDataURL属性产生URL，在body创建a元素设置其href和download属性，并点击a元素开始下载

##### 主要属性

1. toDataURL

   返回一个包含图片展示的 data URI

2. download

   该属性设置一个值来规定下载文件的名称

3. target

   标签的 target 属性规定在何处打开链接文档。

   _blank：浏览器总在一个新打开、未命名的窗口中载入目标文档。

```js
save.onclick = function () {
    var url = yyy.toDataURL('image/png')
    var a = document.createElement('a')
    document.body.appendChild(a)
    a.href = url
    a.download = '我的画板'
    a.target = '_blank'
    a.click()
}
```

