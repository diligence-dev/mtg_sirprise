import React, { useState, useEffect } from 'react'
import jsgraphs from 'js-graph-algorithms'

const wubrg = 'wubrg'.split('')
const callSetter = setter => event => setter(event.target.value)

const isCastable = (openMana, manaCost) => {
  openMana = openMana.toUpperCase().match(/[WUBRGC]/g)

  const graph = new jsgraphs.FlowNetwork(14)
  const source = 0
  const sink = 13
  const openManaNode = {
    W: 1,
    U: 2,
    B: 3,
    R: 4,
    G: 5,
    C: 6
  }
  const manaCostNode = {
    W: 7,
    U: 8,
    B: 9,
    R: 10,
    G: 11,
    C: 12
  }

  openMana.forEach(x => graph.addEdge(new jsgraphs.FlowEdge(source, openManaNode[x], 1)))

  let flowNeeded = 0
  manaCost
    .toUpperCase()
    .replace('{X}', '')
    .match(/\{([0-9]+|[WUBRG])\}/g)
    .map(x => x.replace('{', '').replace('}', ''))
    .forEach(x => {
      if (wubrg.includes(x.toLowerCase())) {
        graph.addEdge(new jsgraphs.FlowEdge(manaCostNode[x], sink, 1))
        flowNeeded += 1
      } else {
        graph.addEdge(new jsgraphs.FlowEdge(manaCostNode['C'], sink, parseInt(x, 10)))
        flowNeeded += parseInt(x, 10)
      }
    })

  graph.addEdge(new jsgraphs.FlowEdge(openManaNode['W'], manaCostNode['W'], 1000))
  graph.addEdge(new jsgraphs.FlowEdge(openManaNode['U'], manaCostNode['U'], 1000))
  graph.addEdge(new jsgraphs.FlowEdge(openManaNode['B'], manaCostNode['B'], 1000))
  graph.addEdge(new jsgraphs.FlowEdge(openManaNode['R'], manaCostNode['R'], 1000))
  graph.addEdge(new jsgraphs.FlowEdge(openManaNode['G'], manaCostNode['G'], 1000))

  graph.addEdge(new jsgraphs.FlowEdge(openManaNode['W'], manaCostNode['C'], 1000))
  graph.addEdge(new jsgraphs.FlowEdge(openManaNode['U'], manaCostNode['C'], 1000))
  graph.addEdge(new jsgraphs.FlowEdge(openManaNode['B'], manaCostNode['C'], 1000))
  graph.addEdge(new jsgraphs.FlowEdge(openManaNode['R'], manaCostNode['C'], 1000))
  graph.addEdge(new jsgraphs.FlowEdge(openManaNode['G'], manaCostNode['C'], 1000))
  graph.addEdge(new jsgraphs.FlowEdge(openManaNode['C'], manaCostNode['C'], 1000))

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

    if (openMana === '') {
      openMana = 'wubrg'
    }

    const colorQuery = openMana
      .split('')
      .filter(c => wubrg.includes(c.toLowerCase()))
      .concat(['colorless'])
      .map(c => 'c:' + c)
      .join(' or ')

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
