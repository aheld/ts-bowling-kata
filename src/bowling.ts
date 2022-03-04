export class Frame {
  _roll1: number | undefined
  _roll2: number | undefined

  get roll1(): number {
    return this._roll1 || 0
  }

  get roll2(): number {
    return this._roll2 || 0
  }

  get rolls(): number[] {
    return [this._roll1, this._roll2].filter(r => typeof r === 'number')
  }

  roll(roll: number) {
    if (this._roll1 !== undefined) this._roll2 = roll
    else this._roll1 = roll
  }

  complete(): boolean {
    if (this.isStrike()) return true
    return this._roll1 !== undefined && this._roll2 !== undefined
  }

  isSpare(): boolean {
    return !this.isStrike() && this.roll1 + this.roll2 === 10
  }

  isStrike(): boolean {
    return this.roll1 === 10
  }
}

class TenthFrame extends Frame {
  _roll3: number | undefined

  get roll3(): number {
    return this._roll3 || 0
  }

  get rolls(): number[] {
    return [this._roll1, this._roll2, this._roll3].filter(r => r !== undefined)
  }

  roll(roll: number) {
    if (this._roll1 === undefined) {
      this._roll1 = roll
    } else if (this._roll2 === undefined) {
      this._roll2 = roll
    } else {
      this._roll3 = roll
    }
  }

  complete(): boolean {
    return false
  }
}

export class Game {
  frames: (Frame | TenthFrame)[] = new Array(10)
  currentFrame: number

  constructor() {
    for (let i = 0; i < 9; i++) {
      this.frames[i] = new Frame()
    }
    this.frames[9] = new TenthFrame()
    this.currentFrame = 0
  }

  roll(roll: number) {
    if (this.frames[this.currentFrame].complete()) {
      this.currentFrame++
    }
    this.frames[this.currentFrame].roll(roll)
  }

  score(): number {
    let _score = 0
    for (let i = 0; i < this.frames.length; i++) {
      const frame = this.frames[i]
      _score += frame.roll1 + frame.roll2
      if (frame instanceof TenthFrame) {
        _score += frame.roll3
      } else {
        if (frame.isSpare()) _score += this.frames[i + 1].roll1
        if (frame.isStrike()) {
          let nextRolls = this.frames[i + 1].rolls
          if (nextRolls.length < 2) {
            nextRolls = nextRolls.concat(this.frames[i + 2].rolls)
          }
          _score += nextRolls[0] + nextRolls[1]
        }
      }
    }
    return _score
  }
}
