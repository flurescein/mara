import { init, text, wordsUrl, fail } from './settings.json'
import { getRandomBetween, getRandomBWColor, getScreenSize } from './util'

const editorial = document.getElementById('editorial') as HTMLCanvasElement

// Screen size
let screenSize = getScreenSize()
editorial.width = screenSize.width
editorial.height = screenSize.height

window.addEventListener('resize', () => {
  screenSize = getScreenSize()
  editorial.width = screenSize.width
  editorial.height = screenSize.height
})

// Printing
const context = editorial.getContext('2d')
context.textAlign = 'center'

let words = init.words

setInterval(() => {
  context.fillStyle = getRandomBWColor()

  const fontSize = getRandomBetween(text.size.min, text.size.max)
  const fontFamily = text.fonts[getRandomBetween(0, text.fonts.length)]
  context.font = `${fontSize}px '${fontFamily}'`

  const wordToPrint = words[getRandomBetween(0, words.length)]

  context.fillText(
    wordToPrint,
    getRandomBetween(0, screenSize.width),
    getRandomBetween(0, screenSize.height)
  )

  document.title = wordToPrint
}, 1000 / init.speed)

// Getting news
fetch(wordsUrl)
  .then(async response => {
    const gettedWords = (await response.json()) as string[]
    words = gettedWords
  })
  .catch(() => (words = fail.words))

// Add clear listener
document.body.addEventListener('click', () => {
  context.clearRect(0, 0, screenSize.width, screenSize.height)
})
