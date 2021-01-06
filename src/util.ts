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
