function scroll(opt) {
  var viewBox = opt.viewBox // 视图盒子
  var content = opt.content // 内容盒子
  var barBox = opt.barBox // 滑道
  var bar = opt.bar // 滑块
  var barHeight = 0 // 滑块高度
  var barY = 0 // 滑块位置
  var speed = 50 // 速度，每滚一下滑轮，移动50px

  // 计算bar的高度

  if (content.scrollHeight > viewBox.clientHeight) {
    barBox.style.display = 'block'
    barHeight =
      (viewBox.clientHeight * viewBox.clientHeight) / content.scrollHeight
  }
  bar.style.height = barHeight + 'px'

  // 事件监听
  viewBox.addEventListener('mousewheel', scrollRoll)
  // 兼容  Firefox
  viewBox.addEventListener('DOMMouseScroll', scrollRoll)

  function scrollRoll(e) {
    e = e || window.event
    if (e.detail > 0) {
      down()
    } else if (e.detail < 0) {
      up()
    }

    if (e.wheelDelta > 0) {
      up()
    } else if (e.wheelDelta < 0) {
      down()
    }
  }
  // 滚轮向下滚动
  function down() {
    barY = bar.offsetTop + speed
    // 范围判断
    barY =
      barY > barBox.clientHeight - bar.clientHeight
        ? barBox.clientHeight - bar.clientHeight
        : barY
    bar.style.top = barY + 'px'
    contentTop()
  }
  // 滚轮向上滚动
  function up() {
    barY = bar.offsetTop - speed
    // 范围判断
    barY = barY < 0 ? 0 : barY
    bar.style.top = barY + 'px'
    contentTop()
  }

  function contentTop() {
    var contentMax = content.scrollHeight - viewBox.clientHeight

    var barMax = barBox.clientHeight - bar.clientHeight
    var contentY = (barY / barMax) * contentMax
    content.style.top = -contentY + 'px'
  }
}

function timeago(dateTimeStamp) {
  // dateTimeStamp是一个时间毫秒，注意时间戳是秒的形式，在这个毫秒的基础上除以1000，就是十位数的时间戳。13位数的都是时间毫秒。
  var minute = 1000 * 60 // 把分，时，天，周，一个月用毫秒表示
  var hour = minute * 60
  var day = hour * 24
  var week = day * 7
  var month = day * 30
  var now = +new Date()
  var diffValue = now - dateTimeStamp // 时间差
  var result = ''

  if (diffValue < 0) {
    return
  }
  var minC = diffValue / minute // 计算时间差的分，时，天，周，月
  var hourC = diffValue / hour
  var dayC = diffValue / day
  var weekC = diffValue / week
  var monthC = diffValue / month
  if (monthC >= 1 && monthC <= 11) {
    result = ' ' + parseInt(monthC) + '个月前'
  } else if (weekC >= 1 && weekC <= 3) {
    result = ' ' + parseInt(weekC) + '周前'
  } else if (dayC >= 1 && dayC <= 6) {
    result = ' ' + parseInt(dayC) + '天前'
  } else if (hourC >= 1 && hourC <= 23) {
    result = ' ' + parseInt(hourC) + '小时前'
  } else if (minC >= 1 && minC <= 59) {
    result = ' ' + parseInt(minC) + '分钟前'
  } else if (diffValue >= 0 && diffValue <= minute) {
    result = '刚刚'
  } else {
    result = timeFormat({
      template: '{0}-{1}-{2}'
    })
  }
  return result
}

function timeFormat(options) {
  let time = options.time ? options.time : new Date()
  let template = options.template
    ? options.template
    : '{0}年{1}月{2}日 {3}时{4}分{5}秒'
  let arr = [
    time.getFullYear(),
    zero(time.getMonth() + 1),
    zero(time.getDate()),
    zero(time.getHours()),
    zero(time.getMinutes()),
    zero(time.getSeconds())
  ]
  return template.replace(/\{(\d)\}/g, (...[, capture]) => {
    return arr[capture] || '00'
  })

  function zero(num) {
    return num < 10 ? '0' + num : num
  }
}

export default { scroll, timeago }
