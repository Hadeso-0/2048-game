const GRID_SIZE = 4
const CELL_SIZE = 20
const CELL_GAP = 2

export default class Grid {
  //   private Var
  #cells

  constructor(gridElement) {
    gridElement.style.setProperty('--grid-size', GRID_SIZE)
    gridElement.style.setProperty('--cell-size', `${CELL_SIZE}vmin`)
    gridElement.style.setProperty('--cell-gap', `${CELL_GAP}vmin`)
    this.#cells = createCellElement(gridElement).map(
      (cellElement, index) =>
        new Cell(cellElement, index % GRID_SIZE, Math.floor(index / GRID_SIZE)),
    )
  }

  get #emptyCells() {
    return this.#cells.filter((cell) => cell.tile == null)
  }

  randomEmptyCell = () => {
    const randomIndex = Math.floor(Math.random() * this.#emptyCells.length)
    return this.#emptyCells[randomIndex]
  }
}
class Cell {
  //   private Var
  #cellElement
  #x
  #y
  #tile

  constructor(cellElement, x, y) {
    this.#cellElement = cellElement
    this.#x = x
    this.#y = y
  }

  get tile() {
    return this.#tile
  }

  set tile(val) {
    this.#tile = val
    if (val == null) return
    this.#tile.x = this.#x
    this.#tile.y = this.#y
  }
}

const createCellElement = (gridElement) => {
  const cells = []
  for (let i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
    const cell = document.createElement('div')
    cell.classList.add('cell')
    cells.push(cell)
    gridElement.append(cell)
  }
  return cells
}
