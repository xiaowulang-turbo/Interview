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

function debounceThrottle(fn, delay) {
    let lastCall = 0
    let timer = null

    return function (...args) {
        const now = Date.now()
        const timeSinceLastCall = now - lastCall

        if (timer) {
            clearTimeout(timer)
        }

        if (timeSinceLastCall >= delay) {
            fn.apply(this, args)
            lastCall = Date.now()
        } else {
            timer = setTimeout(() => {
                fn.apply(this, args)
                lastCall = Date.now()
                timer = null
            }, delay)
        }
    }
}
