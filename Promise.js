// HardMan
class HardMan {
    constructor(name) {
        this.name = name
        this.tasks = []

        this.tasks.push(() => {
            console.log(`${this.name} come to school`)
        })

        setTimeout(() => {
            this.runTasks()
        }, 0)
    }

    async runTasks() {
        for (let i = 0; i < this.tasks.length; i++) {
            await this.tasks[i]()
        }
    }

    rest(seconds) {
        this.tasks.push(() => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    console.log(`${this.name} rest for ${seconds} seconds`)
                    resolve()
                }, seconds * 1000)
            })
        })
        return this
    }

    restFirst(seconds) {
        this.tasks.unshift(() => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    console.log(`${this.name} rest for ${seconds} seconds`)
                    resolve()
                }, seconds * 1000)
            })
        })
        return this
    }

    learn(subject) {
        this.tasks.push(() => {
            console.log(`${this.name} learn ${subject}`)
        })
        return this
    }
}

const hardMan = new HardMan('John')
// hardMan.rest(1).learn('English')
hardMan.restFirst(2).learn('Math')
