import React, { useState, useEffect } from 'react'

import { isCastable } from '../mtg_sirprise_lib'

const callSetter = setter => event => setter(event.target.value)

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
