import { readFile } from 'node:fs/promises'

async function getInput() {
  return readFile('puzzle-02/input.txt')
}

const STEP_SCORE = {
  A: 1, // rock
  B: 2, // paper
  C: 3, // scissors
  X: 1,
  Y: 2,
  Z: 3,
}

const ROUND_SCORE = {
  LOOSE: 0,
  DRAW: 3,
  WIN: 6,
}

const BEAT_MAP = {
  A: ['C', 'Z'],
  B: ['A', 'X'],
  C: ['B', 'Y'],
  X: ['C', 'Z'],
  Y: ['A', 'X'],
  Z: ['B', 'Y'],
}

function decideWinner(opponentStep, myStep) {
  if (BEAT_MAP[opponentStep] === BEAT_MAP[myStep]) {
    return 2 // draw
  }

  if (BEAT_MAP[opponentStep].includes(myStep)) {
    return 0 // loose
  }

  if (BEAT_MAP[myStep].includes(opponentStep)) {
    return 1 // win
  }
}

export async function run() {
  const rounds = (await getInput()).toString().split('\n')
  const scoringMap = rounds.map(round => {
    const steps = round.split(' ')
    const opponentStep = steps[0]
    const myStep = steps[1]

    const outMap = {
      myScore: STEP_SCORE[myStep],
      opponentScore: STEP_SCORE[opponentStep],
    }

    const winner = decideWinner(opponentStep, myStep)
    switch (winner) {
      default:
      case 2:
        // draw
        outMap.myScore += ROUND_SCORE.DRAW
        outMap.opponentScore += ROUND_SCORE.DRAW
        break
      case 0:
        // loose
        outMap.myScore += ROUND_SCORE.LOOSE
        outMap.opponentScore += ROUND_SCORE.WIN
        break
      case 1:
        // win
        outMap.myScore += ROUND_SCORE.WIN
        outMap.opponentScore += ROUND_SCORE.LOOSE
        break
    }

    return outMap
  })

  const totalScores = {
    my: 0,
    opponent: 0,
  }

  for (const roundScoring of scoringMap) {
    totalScores.my += roundScoring.myScore
    totalScores.opponent += roundScoring.opponentScore
  }

  console.log('Rounds:', scoringMap.length)
  console.log('Total scores:', totalScores)
}