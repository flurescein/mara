import Parser from 'rss-parser'

export interface Size {
  width: number
  height: number
}

export function getScreenSize(): Size {
  return {
    width: window.innerWidth,
    height: window.innerHeight
  }
}

export function getRandomBetween(min: number, max: number): number {
  return min + Math.floor((max - min) * Math.random())
}

export function getRandomBWColor(min: number = 0, max: number = 255): string {
  const value = getRandomBetween(min, max)
  return `rgba(${value}, ${value}, ${value}, ${Math.random()})`
}

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function removePunctuation(str: string) {
  return str.replace(/[.,\/#!$%\^&\*;:{}=_`~()]/g, '').replace(/\s{2,}/g, ' ')
}

export async function getWordsFromRss(channels: string[], newsCount: number) {
  const rssParser = new Parser()
  const parsedChannels = await Promise.all(
    channels.map(channel => rssParser.parseURL(channel))
  )

  return parsedChannels
    .map(({ items }) =>
      items?.slice(0, newsCount).map(({ contentSnippet }) => contentSnippet)
    )
    .flat()
    .map(article => removePunctuation(article).split(' '))
    .flat()
    .map(capitalize)
}
