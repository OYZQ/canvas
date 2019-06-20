var yyy = document.getElementById('xxx');
var context = yyy.getContext('2d');
var lineWidth = 5;
let canvasHistory = [];
let step = -1;
var c1;
autoSetCanvasSize(yyy)

listenToMouse(yyy)


var eraserEnabled = false

one.onclick = function () {
    lineWidth = 3;
    for (var i = 0; i < one.parentNode.children.length; i++) {
        one.parentNode.children[i].classList.remove('active')
    }
    one.classList.add('active')
}

two.onclick = function () {
    lineWidth = 6;
    for (var i = 0; i < two.parentNode.children.length; i++) {
        two.parentNode.children[i].classList.remove('active')
    }
    two.classList.add('active')
}

three.onclick = function () {
    lineWidth = 9;
    for (var i = 0; i < three.parentNode.children.length; i++) {
        three.parentNode.children[i].classList.remove('active')
    }
    three.classList.add('active')
}

four.onclick = function () {
    lineWidth = 12;
    for (var i = 0; i < four.parentNode.children.length; i++) {
        four.parentNode.children[i].classList.remove('active')
    }
    four.classList.add('active')
}

five.onclick = function () {
    lineWidth = 15;
    for (var i = 0; i < five.parentNode.children.length; i++) {
        five.parentNode.children[i].classList.remove('active')
    }
    five.classList.add('active')
}

six.onclick = function () {
    lineWidth = 18;
    for (var i = 0; i < six.parentNode.children.length; i++) {
        six.parentNode.children[i].classList.remove('active')
    }
    six.classList.add('active')
}

seven.onclick = function () {
    lineWidth = 21;
    for (var i = 0; i < seven.parentNode.children.length; i++) {
        seven.parentNode.children[i].classList.remove('active')
    }
    seven.classList.add('active')
}

clear.onclick = function () {
    context.clearRect(0, 0, yyy.width, yyy.height)
}

save.onclick = function () {
    var url = yyy.toDataURL('image/png')
    var a = document.createElement('a')
    document.body.appendChild(a)
    a.href = url
    a.download = '我的画板'
    a.target = '_blank'
    a.click()
}

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

black.onclick = function () {
    context.strokeStyle = 'black'
    for (var i = 0; i < black.parentNode.children.length; i++) {
        black.parentNode.children[i].classList.remove('active')
    }
    black.classList.add('active')
}

red.onclick = function () {
    context.strokeStyle = 'red'
    for (var i = 0; i < black.parentNode.children.length; i++) {
        black.parentNode.children[i].classList.remove('active')
    }
    red.classList.add('active')
}

green.onclick = function () {
    context.strokeStyle = 'green'
    for (var i = 0; i < black.parentNode.children.length; i++) {
        black.parentNode.children[i].classList.remove('active')
    }
    green.classList.add('active')
}

blue.onclick = function () {
    context.strokeStyle = 'blue'
    for (var i = 0; i < black.parentNode.children.length; i++) {
        black.parentNode.children[i].classList.remove('active')
    }
    blue.classList.add('active')
}

yellow.onclick = function () {
    context.strokeStyle = 'yellow'
    for (var i = 0; i < black.parentNode.children.length; i++) {
        black.parentNode.children[i].classList.remove('active')
    }
    yellow.classList.add('active')
}
skyblue.onclick = function () {
    context.strokeStyle = 'skyblue'
    for (var i = 0; i < black.parentNode.children.length; i++) {
        black.parentNode.children[i].classList.remove('active')
    }
    skyblue.classList.add('active')
}
pink.onclick = function () {
    context.strokeStyle = 'pink'
    for (var i = 0; i < black.parentNode.children.length; i++) {
        black.parentNode.children[i].classList.remove('active')
    }
    pink.classList.add('active')
}
white.onclick = function () {
    context.strokeStyle = 'white'
    for (var i = 0; i < black.parentNode.children.length; i++) {
        black.parentNode.children[i].classList.remove('active')
    }
    white.classList.add('active')
}

/******/

function autoSetCanvasSize(canvas) {
    setCanvasSize()

    window.onresize = function () {
        setCanvasSize()
    }

    function setCanvasSize() {
        var pageWidth = document.documentElement.clientWidth
        var pageHeight = document.documentElement.clientHeight

        canvas.width = pageWidth
        canvas.height = pageHeight
    }
}

function drawCircle(x, y, radius) {
    context.beginPath()
    context.fillStyle = 'black'
    context.arc(x, y, radius, 0, Math.PI * 2);
    context.fill()
}

function drawLine(x1, y1, x2, y2) {
    context.beginPath();
    context.moveTo(x1, y1) // 起点
    context.lineWidth = lineWidth
    context.lineTo(x2, y2) // 终点
    context.stroke()
    context.closePath()
}

function listenToMouse(canvas) {


    var using = false
    var lastPoint = {
        x: undefined,
        y: undefined
    }

    // 特性检测
    if (document.body.ontouchstart === undefined) {
        canvas.onmousedown = function (aaa) {
            var x = aaa.clientX
            var y = aaa.clientY
            using = true
            if (eraserEnabled) {
                context.clearRect(x - 5, y - 5, 10, 10)
            } else {
                lastPoint = {
                    "x": x,
                    "y": y
                }
            }
        }
        canvas.onmousemove = function (aaa) {
            var x = aaa.clientX
            var y = aaa.clientY

            if (!using) {
                return
            }

            if (eraserEnabled) {
                context.clearRect(x - 5, y - 5, 10, 10)
            } else {
                var newPoint = {
                    "x": x,
                    "y": y
                }
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                lastPoint = newPoint
            }

        }
        canvas.onmouseup = function (aaa) {
            using = false
            step++;
            canvasHistory.push(context.getImageData(0, 0, yyy.width, yyy.height))
        }

    } else {
        canvas.ontouchstart = function (aaa) {
            var x = aaa.touches[0].clientX
            var y = aaa.touches[0].clientY
            using = true
            if (eraserEnabled) {
                context.clearRect(x - 5, y - 5, 10, 10)
            } else {
                lastPoint = {
                    "x": x,
                    "y": y
                }
            }
        }

        canvas.ontouchmove = function (aaa) {
            var x = aaa.touches[0].clientX
            var y = aaa.touches[0].clientY

            if (!using) {
                return
            }

            if (eraserEnabled) {
                context.clearRect(x - 5, y - 5, 10, 10)
            } else {
                var newPoint = {
                    "x": x,
                    "y": y
                }
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                lastPoint = newPoint
            }
        }

        canvas.ontouchend = function () {
            using = false
            step++;
            canvasHistory.push(context.getImageData(0, 0, yyy.width, yyy.height))
        }
    }
}