# Bowling Kata

---

# How to score Bowling

http://en.wikipedia.org/wiki/Ten-pin_bowling

![Bowling Frame](http://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Bowlstrike.PNG/330px-Bowlstrike.PNG)

---

# External API

- call roll for each roll
- calculate score at the end
- Assume good inputs (rolls always equal a full game)

```
    +--------------------+
    | Game               |
    | ------------------ |
    | + roll(pins : int) |
    | + score() : int    |
    +--------------------+
```

---

# Gutter Game
    
Given a standard game of bowling  
When 20 rolls are 0 (gutter ball)  
Then the score should be 0  

```typescript
test('Gutter Game (all zeros)', () => {
    for (let i = 0; i < 20; i++) game.roll(0)
    expect(game.score()).toBe(0)
  })
```

---

# Passing code

```typescript
  score(): number {
    return 0
  }
```

---

# Simple games
    
Given a standard game of bowling  
When 20 rolls are 1  
Then the score should be 20  

```typescript
for (i; i < 20; i ++) {
    game.roll(1);
}
game.score().should.equal(20);
```

---

# Passing code

```typescript
  roll(roll: number) {
    total += roll
  }

  score(): number {
    return total
  }
```

---

# Refactor Tests

## Always be stable!

Use *Working Code* as tests for test code

- Condense ``for`` loops into ``rollMany``
- Does this belong in Production code OR Test code?
```typescript
    game.rollMany(20, 0) //roll 20 zeros
    rollMany(game, 20, 0) //roll 20 zeros
```

---

# Sum games

```cucumber
Given a standard game of bowling  
When all roll are less than 5  
When I roll a <rollA> 10 times
When I roll a <rollB> 10 times
Then the score is the sum of the rolls <score>

Examples:
| rollA | rollB | score |
| 0     | 0     | 0     |
| 3     | 4     | 70    |
| 4     | 5     | 90    |
```

---

# Game with a single spare

if we roll a 5 three times, and then all zeros the score should be 20
```
- roll '5' 3 times
- roll '0' 17 times
    - Score should be 20
```
You may need to remove this test, refactor, then procede 

---

# Possible object model

```
                          Next Frame
                          ┌─────────┐
┌─────────────────┐    ┌──┴─────────▼────┐     ┌───────────┐
│Game             │    │Frame            │     │Roll       │
├─────────────────┤ 10 ├─────────────────┤ 1..2├───────────┤
│+ roll(pins: int)├───►│+ score(): int   ├────►│- pin: int │
│+ score(): int   │    │                 │     │           │
└─────────────────┘    └─────────────────┘     └───────────┘
                              ▲                     ▲
                              │ subclass            │ 1
                      ┌───────┴────────┐            │
                      │  Tenth Frame   │            │
                      │                ├────────────┘
                      └────────────────┘  Extra Roll
                      
```

---

# Game with a single strike

if we roll a Strike , then a 3 two times, and then all zeros the score should be 16

    - roll '10' one time
    - roll '3' two times
    - roll '0' 16 times
        - Score should be 22

---

# Game with mixed strikes and spares

Rolls:
3,4,6,4,7,1,4,5,10,4,6,10,10,10,5,5,3 = 169

---

# New Requirement!

## Bad input!

    - Throw an exception if score is called
      and you don't have a complete game

---

# New Requirement!

## Per frame scoring

    - be able to call score at any time and 
      return the current score
    - return known score if current frame 
      cannot be scored

---

# New Requirement!

## Kids bowling

    - GutterBalls are not allowed
    - All rolls of 0 are re-rolled
    - Kid bolwing will be indicated by the caller
     (constructor arg?)
 
---

# New Requirement!

## Drunk bowling

    - Any 4 consecutive rolls of zero is
      considered a drunk player
    - Drunk players have thier score tallied
      immediately and game ends
 
---

# New Requirement!

## Klingon Bowling

    - Each frame gets 3 rolls
    - the lowest roll is considered ghojwI'
      and is not counted
    - two consective 0 rolls earns a bIj of -10

Klingons do not deliver software  
They execute requirements  

---

# Temporial Bowling

    - Check the time when you start a game
    - if the time is < Noon, then 
      score according to kids bowling 

    - if the time is > 10pm, then 
      score according to the drunk bowling 

    - if the time is a pallendrome, then 
      score according to klingon bowling 

---

# Credits

- Object Model diagram and inspiration from this post: 
http://pixelhandler.com/posts/bowling-game-kata-using-mocha-bdd-test-framework-and-yeoman

- Unclebob's original post
http://butunclebob.com/ArticleS.UncleBob.TheBowlingGameKata