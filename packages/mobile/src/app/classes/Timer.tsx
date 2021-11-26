interface IGetTimeInParts {
  minutes: string
  seconds: string
  ms: string
}

export class Timer {
  isRunning: boolean
  startTime: number
  overallTime: number

  constructor() {
    this.isRunning = false
    this.startTime = 0
    this.overallTime = 0
  }

  _getTimeElapsedSinceLastStart() {
    if (!this.startTime) {
      return 0
    }

    return Date.now() - this.startTime
  }

  start() {
    if (this.isRunning) {
      return console.error('Timer is already running')
    }

    this.isRunning = true

    this.startTime = Date.now()
  }

  stop() {
    if (!this.isRunning) {
      return console.error('Timer is already stopped')
    }

    this.isRunning = false

    this.overallTime = this.overallTime + this._getTimeElapsedSinceLastStart()
  }

  reset() {
    this.overallTime = 0

    if (this.isRunning) {
      this.startTime = Date.now()
      return
    }

    this.startTime = 0
  }

  getTime() {
    if (!this.startTime) {
      return 0
    }

    if (this.isRunning) {
      return this.overallTime + this._getTimeElapsedSinceLastStart()
    }

    return this.overallTime
  }

  getTimeInString(time: number): string {
    function pad(n: number, steps: number) {
      return String(n).padStart(steps, '0')
    }

    const date = new Date(time)
    const minutes = pad(date.getMinutes(), 2)
    const seconds = pad(date.getSeconds(), 2)
    const ms = pad(date.getMilliseconds(), 4)

    return `${minutes}:${seconds}:${ms}`
  }

  getTimeInParts(time: number): IGetTimeInParts {
    function pad(n: number, steps: number) {
      return String(n).padStart(steps, '0')
    }

    const date = new Date(time)
    const minutes = pad(date.getMinutes(), 2)
    const seconds = pad(date.getSeconds(), 2)
    const ms = pad(date.getMilliseconds(), 4)

    return {
      minutes,
      seconds,
      ms,
    }
  }
}
