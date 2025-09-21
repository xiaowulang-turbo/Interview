// 防抖
function debounce(fn, delay) {
  let timer = null

  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }

    timer = setTimeout(() => {
      fn.apply(null, args)
      timer = null
    }, delay)
  }
}

// 节流
function throttle(fn, delay) {
  let timer = null

  return function (...args) {
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(null, args)
        timer = null
      }, delay)
    }
  }
}
