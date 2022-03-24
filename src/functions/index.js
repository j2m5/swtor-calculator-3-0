import equipment from '@/sets/equipment'
import bindings from '@/data/bindings'
import trinkets from '@/sets/trinkets'
import stims from '@/sets/stims'
import legendaries from '@/sets/legendaries'
import augments from '@/sets/augments'
import patterns from '@/data/patterns'
import { attributeItems, disciplineItems, filtered } from '@/functions/filters'

export const hasAlacrityBuff = discipline => (discipline === 'Carnage/Combat' || discipline === 'Arsenal/Gunnery')
const alacrityBuff = 931 // 3% // target - alacrityBuff

export function calculatePercentFromRating (rating, cap, divisor, level = 80) {
  const x = (1 - (0.01 / cap))
  const y = ((rating / level) / divisor)
  return (cap * (1 - Math.pow(x, y))) * 100
}

export function calculateRatingFromPercent (percent, cap, divisor, level = 80) {
  return (Math.log(1 - (percent / 100) / cap) / Math.log(1 - 0.01 / cap)) * level * divisor
}

export function makeBuild (attribute, discipline, rating, augmentRating, set, target, usingStim, usingAugments) {
  const data = bindings.find(el => el.discipline === discipline)

  const stim = stims.find(el => el.statmodifiers.includes(attribute))
  if (stim) stim.secondarystat = attribute === 'Accuracy' ? 264 : 109

  const implants = legendaries.filter(el => el.rating === ((rating <= 326) ? 326 : rating))
    .filter(el => el.disciplines.includes(discipline))

  const augment = augments.find(el => el.statmodifiers.includes(attribute) && el.rating === augmentRating)

  const prototype = []

  if (usingStim) prototype.push(stim)

  patterns.find(el => el.attribute === attribute).pattern.forEach(el => {
    const item = disciplineItems(data.set, equipment, rating, set)
      .find(x => x.category === el && x.statmodifiers.includes(attribute))
    if (item) prototype.push(item)
    else {
      const item = attributeItems(attribute, equipment, rating, set)
        .concat(filtered(trinkets, rating, set).filter(el => el.statmodifiers.includes(attribute)))
        .find(x => x.category === el)
      prototype.push(item)
    }
  })

  implants.filter(el => el.statmodifiers.includes(attribute)).forEach(el => {
    prototype.push(el)
  })

  if (usingAugments) {
    let i = 0
    while (i < 14) {
      prototype.push(augment)
      i++
    }
  }

  const result = getGearBuilds(prototype, target, discipline)
  const sum = []
  result.forEach(el => {
    sum.push(el.map(x => x.secondarystat).reduce((a, b) => a + b))
  })

  const total = Math.min(...sum)
  const index = sum.findIndex(el => el === total)
  const build = result[index]

  return { build, total }
}

function getGearBuilds (prototype, target, discipline, start = 0) {
  const maxValue = prototype.map(el => el.secondarystat).reduce((a, b) => a + b)
  const result = []
  const build = []
  let current = hasAlacrityBuff(discipline) ? alacrityBuff : 0
  let i = start
  while (current <= target) {
    if (current >= maxValue) break
    if (i === prototype.length) i = 0
    current += prototype[i].secondarystat
    build.push(prototype[i])
    i++
  }
  result.push([build])
  if (start < prototype.length - 1) result.push(getGearBuilds(prototype, target, discipline, start + 1))
  return result.flat(1).filter(el => el.length)
}
