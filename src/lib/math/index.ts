// Number handling
export function translateRange (oldValue: number, oldMin: number, oldMax: number, newMin: number, newMax: number) {
  const OldRange = (oldMax - oldMin)
  const NewRange = (newMax - newMin)
  return (((oldValue - oldMin) * NewRange) / OldRange) + newMin
}

// Randomness
import * as Random from 'random-js'
const engine = Random.engines.mt19937().autoSeed()

export function getRandomIntFromRange (min: number, max: number): number {
    return Random.integer(min, max)(engine)
}
