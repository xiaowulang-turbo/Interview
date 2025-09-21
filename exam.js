console.log("script start")

setTimeout(() => {
  console.log("setTimeout")
}, 0)

Promise.resolve()
  .then(() => {
    console.log("promise1")
  })
  .then(() => {
    console.log("promise2")
  })

console.log("script end")

/* 我的答案是: 
 script start
 script end 
 promise1
 promise2
 setTimeout
*/
