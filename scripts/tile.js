export default class Tile {
  // private vars
  #tileElement
  #x
  #y
  #value
  constructor(tileContainer, val = Math.random() > 0.5 ? 2 : 4) {
    this.#tileElement = document.createElement('div')
    this.#tileElement.classList.add('tile')
    tileContainer.append(this.#tileElement)
    this.val = val
  }

  set val(v) {
    this.#value = v
    this.#tileElement.textContent = v
    const pow = Math.log2(v)
    const backgroundLightness = 100 - pow * 9
    this.#tileElement.style.setProperty(
      '--background-lightness',
      `${backgroundLightness}%`,
    )
    this.#tileElement.style.setProperty(
      '--text-lightness',
      `${backgroundLightness <= 50 ? 90 : 10}%`,
    )
  }

  set x(val) {
    this.#x = val
    this.#tileElement.style.setProperty('--x', val)
  }
  set y(val) {
    this.#y = val
    this.#tileElement.style.setProperty('--y', val)
  }
}
