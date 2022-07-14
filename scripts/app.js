import Grid from './grid.js'
import Tile from './tile.js'

const gameBoard = document.getElementById('game-board')
const grid = new Grid(gameBoard)
// console.log(grid.randomEmptyCell())
grid.randomEmptyCell().tile = new Tile(gameBoard)
grid.randomEmptyCell().tile = new Tile(gameBoard)
setupInput()

async function handleInput(e) {
  switch (e.key) {
    case 'ArrowUp':
      await moveUp()
      break
    case 'ArrowDown':
      await moveDown()
      break
    case 'ArrowLeft':
      await moveLeft()
      break
    case 'ArrowRight':
      await moveRight()
      break
    default:
      setupInput()
      return
  }
  grid.cells.forEach((cell) => cell.mergeTiles())
  setupInput()
}

function setupInput() {
  window.addEventListener('keydown', handleInput, { once: true })
}
const moveUp = () => {
  return slideTiles(grid.cellsByColumn)
  // group by column -> [[cells with cell.x:0],[cells with cell.x:1]...]
}
const moveDown = () => {
  return slideTiles(grid.cellsByColumn.map((column) => [...column].reverse()))
  // group by column -> [[cells with cell.x:0].reversed,[cells with cell.x:1].reversed,...]
}
const moveLeft = () => {
  return slideTiles(grid.cellsByRow)
  // group by row -> [[cells with cell.y:0],[cells with cell.y:1]...]
}
const moveRight = () => {
  return slideTiles(grid.cellsByRow.map((row) => [...row].reverse()))
  // group by row -> [[cells with cell.y:0].reversed,[cells with cell.y:1].reversed,...]
}

const slideTiles = (cells) => {
  return Promise.all(
    cells.flatMap((group) => {
      let promises = []
      // group = row or column
      for (let i = 1; i < group.length; i++) {
        const curCell = group[i]
        if (!curCell.tile) continue
        let lastValidCell = null
        // check cells above current cell
        for (let j = i - 1; j >= 0; j--) {
          let moveToCell = group[j]
          if (!moveToCell.canAccept(curCell.tile)) break
          lastValidCell = moveToCell
        }
        // check if we can move current cell
        if (lastValidCell != null) {
          // If it is possible to move tile
          if (lastValidCell.tile != null) {
            lastValidCell.mergeTile = curCell.tile
            // Merge Tiles
          } else {
            lastValidCell.tile = curCell.tile
            // Move Tile
          }
          promises.push(curCell.tile.waitForTransition())
          curCell.tile = null
        }
      }
      return promises
    }),
  )
}
