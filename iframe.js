class SafeIframeLoader {
    constructor(options = {}) {
        // 跨域错误不会返回给父页面
        this.timeout = options.timeout || 5000
        this.container = options.container || document.body
        // TODO: 初始化其他必要的属性
        this.iframe = null
    }

    /**
     * 加载iframe
     * @param {string} url - iframe的src地址
     * @param {Object} options - 配置选项
     * @returns {Promise} 返回Promise，resolve时传入iframe元素
     */
    loadIframe(url, options = {}) {
        // TODO: 实现iframe加载逻辑
        return new Promise((resolve, reject) => {
            const timeoutId = setTimeout(() => {
                reject(new Error('iframe加载超时'))
            }, this.timeout)

            const iframeLoadHandler = () => {
                clearTimeout(timeoutId)
                resolve(iframe)
            }

            const iframeErrorHandler = () => {
                clearTimeout(timeoutId)
                reject(new Error('iframe加载失败'))
            }

            const iframe = document.createElement('iframe')
            iframe.src = url
            iframe.onload = iframeLoadHandler
            iframe.onerror = iframeErrorHandler

            this.iframe = iframe
            this.container.appendChild(iframe)
        })
    }

    /**
     * 向iframe发送消息并等待响应
     * @param {any} message - 要发送的消息
     * @param {number} timeout - 响应超时时间
     * @returns {Promise} 返回Promise，resolve时传入响应数据
     */
    postMessage(message, timeout = 3000) {
        // TODO: 实现跨域消息通信
        return new Promise((resolve, reject) => {
            const timeoutId = setTimeout(() => {
                window.removeEventListener('message', messageHandler)
                reject(new Error('响应超时'))
            }, timeout)

            const messageHandler = (event) => {
                if (event.source !== this.iframe.contentWindow) return

                clearTimeout(timeoutId)
                resolve(event.data)
                window.removeEventListener('message', messageHandler)
            }

            window.addEventListener('message', messageHandler)
            this.iframe.contentWindow.postMessage(message, '*')
        })
    }

    /**
     * 销毁iframe并清理资源
     * @returns {Promise} 返回Promise
     */
    destroy() {
        // TODO: 实现资源清理逻辑
        if (this.iframe) {
            this.iframe.remove()
            this.iframe = null
        }
    }
}

// 基础使用
// const loader = new SafeIframeLoader({
//     timeout: 8000,
//     container: document.getElementById('iframe-container'),
// })

// loader
//     .loadIframe('https://example.com')
//     .then((iframe) => {
//         console.log('iframe加载成功:', iframe)
//         return loader.postMessage({ type: 'getData', id: 123 })
//     })
//     .then((response) => {
//         console.log('收到响应:', response)
//     })
//     .catch((error) => {
//         console.error('操作失败:', error)
//     })
//     .finally(() => {
//         return loader.destroy()
//     })
