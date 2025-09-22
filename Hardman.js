class Hardman {
    constructor(name) {
        this.name = name
        this.tasks = []

        this.tasks.push(() => {
            console.log(`${name} comes to school`)
        })

        setTimeout(() => {
            this.handleTasks()
        }, 0)
    }

    async handleTasks() {
        for (let task of this.tasks) {
            await task()
        }
    }

    rest(seconds) {
        this.tasks.push(
            () =>
                new Promise((resolve, reject) => {
                    setTimeout(() => {
                        resolve()
                        console.log(`${this.name} rest for ${seconds} seconds`)
                    }, seconds * 1000)
                })
        )
        return this
    }

    restFirst(seconds) {
        this.tasks.unshift(
            () =>
                new Promise((resolve, reject) => {
                    setTimeout(() => {
                        resolve()
                        console.log(
                            `${this.name} restFirst for ${seconds} seconds`
                        )
                    }, seconds * 1000)
                })
        )
        return this
    }

    learn(subject) {
        this.tasks.push(() => {
            console.log(`${this.name} is learning ${subject}`)
            return Promise.resolve() // 保持一致性
        })
        return this
    }
}

const Jack = new Hardman('Jack')
// console.log(Jack)

// Jack.rest(5).learn('Chinese')
Jack.restFirst(2).rest(3).learn('Math')
