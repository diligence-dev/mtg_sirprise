import React, { useState, useEffect } from 'react'
import jsgraphs from 'js-graph-algorithms'

const callSetter = setter => event => setter(event.target.value)

// returns an array of all possible mana costs (e.g. possibleManaCosts('1b/r2/g') === ['AB/RAA', 'AB/RG'])
// expects string without {}, converts mana cost of 2 generic mana to AA, returns all uppercase
const possibleManaCosts = manaCost => {
  if (manaCost.search('2/') === -1) {
    return [manaCost.replace(/[0-9]+/g, matchedNumber => 'A'.repeat(matchedNumber)).toUpperCase()]
  }
  return possibleManaCosts(manaCost.replace(/2\/(.)/, 'AA')).concat(
    possibleManaCosts(manaCost.replace(/2\/(.)/, '$1'))
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

const QueryResult = ({openMana, expansion}) => {
  const [cardImages, setCardImages] = useState([])

  useEffect(() => {
    if (!expansion) {
      setCardImages([])
      return
    }

    const colorQuery = (openMana === '' ? 'wubrgc' : openMana)
      .split('')
      .filter(c => 'wubrg'.includes(c.toLowerCase()))
      .concat(['colorless'])
      .map(c => 'c:' + c)
      .join(' or ')

    // TODO query for cycling and cycling cost separately
    const endpoint = 'https://api.scryfall.com/cards/search?order=cmc&q='
    const request = `${endpoint}s:${expansion}+(t:instant or o:flash)+(${colorQuery})`
    fetch(request)
      .then(result => result.json())
      .then(json => {
        if (json.data) {
          setCardImages(json.data
            .filter(card => {
              if (openMana.length === 0) {
                return true
              }
              return isCastable(openMana, card.mana_cost || card.card_faces[0].mana_cost)
            })
            .map(card => (card.image_uris || card.card_faces[0].image_uris).normal)
          )
        }
      })
  }, [openMana, expansion])
  return (
    <div>
      <div style={{maxWidth: 1000}}>
        {cardImages.map(imageUrl => <img width='200' src={imageUrl} alt='' key={imageUrl} />)}
      </div>
      <br />
    </div>
  )
}

export default function Home({location}) {
  const [expansion, setExpansion] = useState(location.search.replace('?', ''))
  const [openMana, setOpenMana] = useState('')

  const [allExpansion, setAllExpansions] = useState([])
  useEffect(() => {
    fetch('https://api.scryfall.com/sets')
      .then(result => result.json())
      .then(json => {
        if (!json.data) {
          return
        }
        setAllExpansions(json.data
          .filter(expansion =>
            !expansion.parent_set_code
              && !['spellbook', 'promo', 'funny', 'box', 'duel_deck', 'commander'].includes(expansion.set_type)
              && !expansion.foil_only)
          .sort(expansion => expansion.released_at))
      })
  }, [])

  return (
    <div>
      expansion: 
      <select value={expansion} onChange={callSetter(setExpansion)} onBlur={callSetter(setExpansion)}>
        {allExpansion.map(expansion => (
          <option value={expansion.code} key={expansion.id}>
            {expansion.code.toUpperCase()} - {expansion.name}
          </option>
        ))}
      </select>
      <br />
      openMana:
      <input type='text' value={openMana} placeholder='ur' onChange={callSetter(setOpenMana)} />
      <br />
      <QueryResult openMana={openMana} expansion={expansion} />
    </div>
  )
}
