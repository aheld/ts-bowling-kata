import { Game } from './bowling'

describe('Basic Game', () => {
  let game: Game

  beforeEach(() => {
    game = new Game()
  })

  test('Gutter Game (all zeros)', () => {
    for (let i = 0; i < 20; i++) game.roll(0)
    expect(game.score()).toBe(0)
  })
})
