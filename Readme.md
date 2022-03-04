# Bowling score TDD

Boilerplate for [UncleBob's BowlingKata](http://butunclebob.com/ArticleS.UncleBob.TheBowlingGameKata)

## Setup
1. Clone Repo!
2. Install nodejs > v16 
3. `npm install`
4. In another terminal open instuctions  
  `npm run instructions` 
5. `npm run jest:watch`
6. You are given a failing Test.  Write just enough code to make test pass.  Everything you need is under `/src`
7. Write new requirement as a failing test in `/src/bowling.spec.ts`
8. Refactor
9. GoTo 5

Every now and then run `npm run autoformat` 

note - if you can't easily write code to make a test pass, then go backwards.
Remove the failing test, then Refactor, the add the test back.

Don't forget to refactor tests, using production code to make sure that tests are still valid. 

open [instructions.mdx](https://aheld.github.io/ts-bowling-kata/public/) 
Run `npm run instructions` to view instructions locally in a browser 
Run `npm run instructions:build` to build instructions (gh-pages branch has to be manually updated)

If you want to run a more complet test suite, add the 'tests' directory in `jest.config.js` 
```
  testMatch: ['<rootDir>/src/**/*.spec.ts', '<rootDir>/tests/**/*.spec.ts'],
```

## No reading ahead!