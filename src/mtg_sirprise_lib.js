import jsgraphs from 'js-graph-algorithms'

// returns an array of all possible mana costs: possibleManaCosts('{1}{2/G}{B/R}') === ["AAAB", "AAAR", "AGB", "AGR"]
// converts mana cost of 4 generic mana to AAAA
const possibleManaCosts = manaCost => {
  manaCost = manaCost
    .replace(/\{(X|.\/P)\}/g, '') // remove costs that can be paid with 0 mana
    .replace(/\{([0-9]+)\}/g, (_, match) => 'A'.repeat(parseInt(match, 10)))
    .replace(/[{}]/g, '')
    .toUpperCase()
  if (manaCost.search('/') === -1) {
    return [manaCost.replace('2', 'AA')]
  }
  return possibleManaCosts(manaCost.replace(/(.)\/(.)/, '$1')).concat(
    possibleManaCosts(manaCost.replace(/(.)\/(.)/, '$2'))
  )
}


const isCastable = (openMana, manaCost) => {
  openMana = openMana.toUpperCase().match(/[WUBRGC]/g)

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
  // TODO
  const hybridManaCostNode = {
    WU: Object.keys(openManaNode).length + 8,
    WB: Object.keys(openManaNode).length + 9,
    WR: Object.keys(openManaNode).length + 10,
    WG: Object.keys(openManaNode).length + 11,
    UB: Object.keys(openManaNode).length + 12,
    UR: Object.keys(openManaNode).length + 13,
    UG: Object.keys(openManaNode).length + 14,
    BR: Object.keys(openManaNode).length + 15,
    BG: Object.keys(openManaNode).length + 16,
    RG: Object.keys(openManaNode).length + 17,
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

  let flowNeeded = 0
  manaCost
    .toUpperCase()
    .replace(/\{(X|.\/P)\}/g, '')
    .match(/\{([0-9]+|[WUBRGSC]|[WUBRG2]\/[WUBRG])\}/g)
    .map(x => x.replace(/[{}]/g, ''))
    .forEach(x => {
      if (Object.keys(openManaNode).includes(x)) {
        graph.addEdge(new jsgraphs.FlowEdge(manaCostNode[x], sink, 1))
        flowNeeded += 1
      } else {
        graph.addEdge(new jsgraphs.FlowEdge(manaCostNode['A'], sink, parseInt(x, 10)))
        flowNeeded += parseInt(x, 10)
      }
    })

  const maxFlow = new jsgraphs.FordFulkerson(graph, source, sink).value
  return maxFlow === flowNeeded
}

export {isCastable}
