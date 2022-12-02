import { readFile } from 'node:fs/promises'

async function getInput() {
  return readFile('puzzle-01/input.txt')
}

function parseElves(input) {
  const elves = [{
    ei: 0,
    entries: [],
    sum: null,
  }]
  let elfIndex = 0
  for (const entry of input.split('\n')) {
    if (entry === '') {
      elfIndex++

      elves[elfIndex] = {
        ei: elfIndex,
        entries: [],
        sum: null,
      }
      continue
    }

    elves[elfIndex].entries.push(Number(entry))
  }

  return elves.map(e => {
    return {
      ...e,
      sum: e.entries.reduce((acc, v) => acc + v, 0),
    }
  })
}

export async function run () {
  const data = await getInput()
  let topThreeTotal = 0
  const elves = parseElves(data.toString())
  console.log('elves:', elves.length)
  let max = Math.max(...elves.map(e => e.sum))
  console.log('first max:', max)
  let foundIndex = elves.findIndex(p => p.sum === max)
  let found = elves.splice(foundIndex, 1)
  console.log('first found:', found)
  topThreeTotal += max
  max = Math.max(...elves.map(e => e.sum))
  console.log('second max:', max)
  foundIndex = elves.findIndex(p => p.sum === max)
  found = elves.splice(foundIndex, 1)
  console.log('second found:', found)
  topThreeTotal += max
  max = Math.max(...elves.map(e => e.sum))
  console.log('third max:', max)
  foundIndex = elves.findIndex(p => p.sum === max)
  found = elves.splice(foundIndex, 1)
  console.log('third found:', found)
  topThreeTotal += max

  if (found) {
    console.log('SOLUTION FOUND')
    console.log('Top three elves are carrying total of', topThreeTotal, 'Calories')
  }
}
