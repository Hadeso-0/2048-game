import Grid from './grid.js'
import Tile from './tile.js'

const gameBoard = document.getElementById('game-board')
const grid = new Grid(gameBoard)
// console.log(grid.randomEmptyCell())
grid.randomEmptyCell().tile = new Tile(gameBoard)
grid.randomEmptyCell().tile = new Tile(gameBoard)

function setupInput() {
  window.addEventListener('keydown', handleInput, { once: true })
}

const handleInput = (e) => {
  switch (e.key) {
    case 'ArrowUp':
      moveUp()
      break
    case 'ArrowDown':
      moveDown()
      break
    case 'ArrowLeft':
      moveLeft()
      break
    case 'ArrowRight':
      moveRight()
      break
    default:
      break
  }
}

const moveUp = () => {}
