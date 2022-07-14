const tileStyle = [
  { background: '#eee4da', color: '#776e65', key: 2 },
  { background: '#ede0c8', color: '#776e65', key: 4 },
  { background: '#f2b179', color: '#f9f6f2', key: 8 },
  { background: '#f59563', color: '#f9f6f2', key: 16 },
  { background: '#f67c5f', color: '#f9f6f2', key: 32 },
  { background: '#f65e3b', color: '#f9f6f2', key: 64 },
  { background: '#edcf72', color: '#f9f6f2', key: 128 },
  { background: '#edcc61', color: '#f9f6f2', key: 256 },
  { background: 'tedc850', color: '#f9f6f2', key: 512 },
  { background: '#edc53f', color: '#f9f6f2', key: 1024 },
  { background: '#edc22e', color: '#f9f6f2', key: 2048 },
]

export default class Tile {
  // private vars
  #tileElement
  #x
  #y
  #value
  constructor(tileContainer, value = Math.random() > 0.5 ? 2 : 4) {
    this.#tileElement = document.createElement('div')
    this.#tileElement.classList.add('tile')
    tileContainer.append(this.#tileElement)
    this.value = value
  }

  get value() {
    return this.#value
  }

  set value(v) {
    this.#value = v
    this.#tileElement.textContent = v
    const pow = Math.log2(v)
    this.#tileElement.style.setProperty(
      '--background',
      `${tileStyle[pow - 1].background}`,
    )
    this.#tileElement.style.setProperty('--text', `${tileStyle[pow - 1].color}`)
  }

  set x(value) {
    this.#x = value
    this.#tileElement.style.setProperty('--x', value)
  }
  set y(value) {
    this.#y = value
    this.#tileElement.style.setProperty('--y', value)
  }
  remove() {
    this.#tileElement.remove()
  }

  waitForTransition(animation = false) {
    return new Promise((resolve) => {
      this.#tileElement.addEventListener(
        animation ? 'animationend' : 'transitionend',
        resolve,
        {
          once: true,
        },
      )
    })
  }
}
