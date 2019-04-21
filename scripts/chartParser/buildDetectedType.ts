import {formatTS} from '../prettier'

interface Structure {
  arbitraryKeys?: boolean
  children: {[k: string]: 'any' | Structure}
}

export function buildDetectedTypeStructure(names: string[]) {
  const structure: Structure = {children: {}}

  for (const name of names) {
    const parts = name.split('.')
    const lastIdx = parts.length - 1

    let base = structure
    for (const [idx, part] of parts.entries()) {
      if (idx === lastIdx) {
        const childPart = base.children[part]
        if (childPart === undefined) {
          base.children[part] = 'any'
        } else if (typeof childPart === 'object') {
          childPart.arbitraryKeys = true
        }
      } else {
        if (base.children[part] === undefined || base.children[part] === 'any') {
          base.children[part] = {children: {}}
        }
        base = base.children[part] as Structure
      }
    }
  }

  return structure
}

function structureToType(structure: Structure): string {
  const children = Object.keys(structure.children).map(child => {
    const childStructure = structure.children[child]
    if (childStructure === 'any') {
      return `'${child}'?: any`
    }
    return `'${child}'?: ${structureToType(childStructure)}`
  })
  return `{
  ${children}
  ${structure.arbitraryKeys ? '[k: string]: any' : ''}
}`
}

export function buildDetectedType(names: string[]) {
  const structure = buildDetectedTypeStructure(names)
  const typedef = `interface ChartValues ${structureToType(structure)}`
  return formatTS(typedef)
}
