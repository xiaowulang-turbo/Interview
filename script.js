"use strict";

// Question 1 banana
// “烂香蕉问题”是一个典型的广度优先搜索（BFS）问题，它可以用来模拟感染过程。在这个问题中，我们可以使用二维数组来表示香蕉的状态，其中烂香蕉可以用一个特定的值表示（比如 `0`），而好香蕉可以用另一个值表示（比如 `1`）。每一天，所有烂香蕉会尝试将周围的好香蕉变成烂香蕉。

// 以下是解决这个问题的步骤：

// 1. 初始化一个队列来存储所有烂香蕉的位置。
// 2. 进行广度优先搜索，模拟每一天的腐烂过程：
//    - 从队列中取出当前的烂香蕉。
//    - 检查它周围的香蕉（上、下、左、右），如果存在好香蕉，则将其变成烂香蕉，并加入队列。
// 3. 每处理完一层烂香蕉，就表示过了一天。
// 4. 当所有好香蕉都变成烂香蕉，或者队列为空且没有新的烂香蕉被添加时，搜索结束。

// 以下是使用JavaScript实现的代码示例：

```javascript
function rottenBananas(grid) {
  const rows = grid.length;
  const cols = grid[0].length;
  const queue = [];
  let day = 0;

  // 将所有烂香蕉的位置加入队列
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (grid[i][j] === 0) {
        queue.push([i, j]);
      }
    }
  }

  const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]]; // 上下左右
  while (queue.length > 0) {
    const size = queue.length;
    for (let i = 0; i < size; i++) {
      const [r, c] = queue.shift();
      for (const [dr, dc] of directions) {
        const newR = r + dr;
        const newC = c + dc;
        if (newR >= 0 && newR < rows && newC >= 0 && newC < cols && grid[newR][newC] === 1) {
          grid[newR][newC] = 0;
          queue.push([newR, newC]);
        }
      }
    }
    day++; // 每过一天，处理完一层
  }

  // 检查是否所有的香蕉都变烂了
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (grid[i][j] === 1) {
        return -1; // 仍然有好香蕉，返回-1
      }
    }
  }

  return day;
}

// 示例
const grid = [
  [1, 1, 0],
  [0, 1, 1],
  [1, 0, 1]
];
console.log(rottenBananas(grid)); // 输出至少需要的天数
```;

// 在这个代码中，我们首先初始化队列，将所有烂香蕉的位置加入队列。然后，我们使用一个`while`循环来模拟每一天的腐烂过程。在每一天结束时，我们增加`day`计数器。最后，我们检查是否所有的香蕉都变烂了，如果没有，则返回-1；如果都变烂了，则返回所需的天数。

/**
 * 约瑟夫环问题
    每年六一儿童节，牛客都会准备一些小礼物和小游戏去看望孤儿院的孩子们。其中，有个游戏是这样的：首先，让 n 个小朋友们围成一个大圈，小朋友们的编号是0~n-1。然后，随机指定一个数 m ，让编号为0的小朋友开始报数。每次喊到 m-1 的那个小朋友要出列唱首歌，然后可以在礼品箱中任意的挑选礼物，并且不再回到圈中，从他的下一个小朋友开始，继续0... m-1报数....这样下去....直到剩下最后一个小朋友，可以不用表演，并且拿到牛客礼品，请你试着想下，哪个小朋友会得到这份礼品呢？
 */

function LastRemaining_Solution(n, m) {
  // write code here
  if (n < 1 || m < 1) return null;
  let arr = [];
  for (let i = 0; i < n; i++) {
    arr.push(i);
  }
  let index = 0;
  while (arr.length > 1) {
    index = (index + m - 1) % arr.length;
    arr.splice(index, 1);
  }
  return arr[0];
}
