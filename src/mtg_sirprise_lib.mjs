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

  const source = 0
  const openManaNode = {
    W: 1,
    U: 2,
    B: 3,
    R: 4,
    G: 5,
    C: 6, // colorless
  }
  const manaCostNode = {
    W: Object.keys(openManaNode).length + 1,
    U: Object.keys(openManaNode).length + 2,
    B: Object.keys(openManaNode).length + 3,
    R: Object.keys(openManaNode).length + 4,
    G: Object.keys(openManaNode).length + 5,
    C: Object.keys(openManaNode).length + 6, // exactly colorless
    A: Object.keys(openManaNode).length + 7, // any/generic mana
  }

  const sink = Object.keys(openManaNode).length + Object.keys(manaCostNode).length + 1

  const graph = new jsgraphs.FlowNetwork(sink + 1)

  openMana.forEach(c => {
    graph.addEdge(new jsgraphs.FlowEdge(source, openManaNode[c], 1))
  })

  Object.keys(openManaNode).forEach(c => {
    graph.addEdge(new jsgraphs.FlowEdge(openManaNode[c], manaCostNode[c], 1000))
    graph.addEdge(new jsgraphs.FlowEdge(openManaNode[c], manaCostNode['A'], 1000))
  })

  manaCost.forEach(c => {
    graph.addEdge(new jsgraphs.FlowEdge(manaCostNode[c], sink, 1))
  })

  const maxFlow = new jsgraphs.FordFulkerson(graph, source, sink).value
  return maxFlow === manaCost.length
}

const isCastable = (openMana, manaCost) => {
  assert(manaCost.includes('{'))
  openMana = openMana.toUpperCase().split('')
  return possibleManaCosts(manaCost).some(
    simpleManaCost => isCastableSimpleManaCost(openMana, simpleManaCost.split('')))
}

export {isCastable, possibleManaCosts}
