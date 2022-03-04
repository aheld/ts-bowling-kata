import * as fs from 'fs'

import { Game } from '../src/bowling'

class TestCase {
  input: number[] = []
  score = 0

  constructor(input: number[], score: number) {
    this.input = input
    this.score = score
  }
  toString(): string {
    return `TestCase ${this.input}:=> ${this.score}`
  }
}

const testCases = fs
  .readFileSync('./tests/test_cases.txt', 'utf-8')
  .split('\n')
  .map((line: string) => {
    const tc = JSON.parse(line)
    return new TestCase(tc.input, tc.score)
  })

describe('Run test fixture file', () => {
  test.each(testCases)('Run Testcase %s', tc => {
    const game = new Game()
    tc.input.forEach(roll => {
      game.roll(roll)
    })
    expect(game.score()).toBe(tc.score)
  })
})
