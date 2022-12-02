import inquirer from 'inquirer'
import { readdir } from 'fs/promises'

async function runPuzzleSolution(dir) {
  const { run } = await import(`./${dir}/solution.mjs`)
  await run()
}

async function getExistingPuzzles() {
  return (await readdir('./', { withFileTypes: true }))
    .filter(d => d.isDirectory())
    .map(d => d.name)
    .filter(dn => dn.includes('puzzle-'))
}

async function main() {
  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'puzzle',
      message: 'What puzzle do you want to run?',
      choices: await getExistingPuzzles()
    }
  ])

  const { puzzle } = answers
  const puzzleText = `Puzzle #${puzzle.split('-')[1]}`
  console.log('Running:', puzzleText)

  await runPuzzleSolution(puzzle)

  console.log('End')
}

main().then(()=>{}).catch(err => console.error(err))
