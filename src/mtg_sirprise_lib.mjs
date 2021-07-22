import jsgraphs from 'js-graph-algorithms'

const assert = (condition, message) => {
    if (!condition) {
        throw new Error(message || "Assertion failed");
    }
}

// returns an array of all possible mana costs: possibleManaCosts('{1}{2/G}{B/R}') === ["AAAB", "AAAR", "AGB", "AGR"]
// converts mana cost of 4 generic mana to AAAA
const possibleManaCosts = manaCost => {
  if (manaCost.includes('//')) {
    const manaCostParts = manaCost.split('//')
    assert(manaCostParts.length === 2)
    return possibleManaCosts(manaCostParts[0]).concat(
      possibleManaCosts(manaCostParts[1])
    )
  }
  assert(!manaCost.includes('//'))
  manaCost = manaCost
    .replace(/\{(X|.\/P)\}/g, '') // remove costs that can be paid with 0 mana
    .replace(/\{([0-9]+)\}/g, (_, match) => 'A'.repeat(parseInt(match, 10)))
    .replace(/[{} ]/g, '')
    .toUpperCase()
  if (manaCost.search('/') === -1) {
    manaCost = manaCost.replace(/2/g, 'AA')
    assert(manaCost.replace(/[WUBRGCA]/g, '') === '')
    return [manaCost]
  }
  return possibleManaCosts(manaCost.replace(/(.)\/(.)/, '$1')).concat(
    possibleManaCosts(manaCost.replace(/(.)\/(.)/, '$2'))
  )
}

const isCastableSimpleManaCost = (openMana, manaCost) => {
  assert(typeof openMana !== 'string' && typeof manaCost !== 'string')

  const nodes = new Set(['source', 'sink', 'openA'])
  const edges = []

  // landColors will be 'RGW' for a triome producing red, green, white mana
  openMana.forEach((landColors, index) => {
    const landId = `land${index}`
    nodes.add(landId)
    edges.push(['source', landId, 1])
    edges.push([landId, 'openA', 1])
    landColors.split('').forEach(landColor => {
      nodes.add(`open${landColor}`)
      edges.push([landId, `open${landColor}`, 1])
    })
  })

  manaCost.forEach(costColor => {
    nodes.add(`open${costColor}`)
    nodes.add(`cost${costColor}`)
    edges.push([`open${costColor}`, `cost${costColor}`, 999])
    edges.push([`cost${costColor}`, 'sink', 1])
  })
  const nodeMap = {}
  Array.from(nodes).forEach((nodeName, index) => {
    nodeMap[nodeName] = index
  })

  const graph = new jsgraphs.FlowNetwork(Array.from(nodes).length)
  edges.forEach(edge => {
    assert(2 <= edge.length && edge.length <= 3)
    graph.addEdge(new jsgraphs.FlowEdge(nodeMap[edge[0]], nodeMap[edge[1]], edge[2]))
  })

  const maxFlow = new jsgraphs.FordFulkerson(graph, nodeMap['source'], nodeMap['sink']).value
  return maxFlow === manaCost.length
}

const isCastable = (openMana, manaCost) => {
  assert(manaCost.includes('{'))
  openMana = openMana
    .replace('*', '[WUBRG]')
    .toUpperCase()
    .match(/[\[\(\{][^\]\)\}]+[\]\)\}]|[WUBRGC]/g)
    .map(x => x.replace(/[\[\]\(\)\{\}]/g, ''))
  assert(!openMana.includes('['))
  return possibleManaCosts(manaCost).some(
    simpleManaCost => isCastableSimpleManaCost(openMana, simpleManaCost.split('')))
}

export {isCastable, possibleManaCosts}
