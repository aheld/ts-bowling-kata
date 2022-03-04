import { Game } from './bowling'

function rollMany(game: Game, times: number, pins: number) {
  for (let i = 0; i < times; i++) {
    game.roll(pins)
  }
}

describe('Basic Game', () => {
  let game: Game

  beforeEach(() => {
    game = new Game()
  })

  test('Gutter Game (all zeros)', () => {
    rollMany(game, 20, 0)
    expect(game.score()).toBe(0)
  })

  test('Simple Game', () => {
    rollMany(game, 20, 1)
    expect(game.score()).toBe(20)
  })

  const testcases = [
    [0, 0, 0],
    [3, 4, 70],
    [4, 1, 50],
  ]
  test.each(testcases)(
    'Roll 10 %i, 10 %i score %i',
    (rollA, rollB, expected) => {
      rollMany(game, 10, rollA)
      rollMany(game, 10, rollB)
      expect(game.score()).toBe(expected)
    }
  )
})

describe('Advanced Game', () => {
  let game: Game

  beforeEach(() => {
    game = new Game()
  })

  test('Spare Game', () => {
    rollMany(game, 3, 5)
    rollMany(game, 17, 0)
    expect(game.score()).toBe(20)
  })

  test('Strike Game', () => {
    rollMany(game, 1, 10)
    rollMany(game, 2, 3)
    rollMany(game, 16, 0)
    expect(game.score()).toBe(22)
  })

  test('Last Frame Strike Game', () => {
    rollMany(game, 18, 0)
    rollMany(game, 1, 10)
    rollMany(game, 2, 4)
    expect(game.score()).toBe(18)
  })

  test('Last Frame Spare Game', () => {
    rollMany(game, 18, 0)
    rollMany(game, 3, 5)
    expect(game.score()).toBe(15)
  })

  const moreTests: Array<Array<number[] | number>> = [
    [[5, 0, 3, 4, 5, 2, 9, 0, 3, 3, 6, 3, 7, 3, 9, 0, 3, 4, 9, 0], 87],
    [[10, 3, 3], 22],
    [[3, 4, 6, 4, 7, 1, 4, 5, 10, 4, 6, 10, 10, 10, 5, 5, 3], 169],
  ]
  test.each(moreTests)('bulk tests %s, %s', (rolls, score) => {
    if (typeof rolls === 'number') rolls = [rolls]
    rolls.forEach(roll => {
      game.roll(roll)
    })
    const res = game.score()
    expect(res).toBe(score)
  })
})
