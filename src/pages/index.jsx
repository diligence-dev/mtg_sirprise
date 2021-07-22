import React, { useState, useEffect } from 'react'
import ReactTooltip from 'react-tooltip'

import { isCastable } from '../mtg_sirprise_lib.mjs'

const callSetter = setter => event => setter(event.target.value)

const QueryResult = ({openMana, expansion}) => {
  const [cardImages, setCardImages] = useState([])

  useEffect(() => {
    if (!expansion || openMana.split('[').length !== openMana.split(']').length) {
      return
    }

    const endpoint = 'https://api.scryfall.com/cards/search?order=cmc&q='
    const request = `${endpoint}s:${expansion}+(t:instant or o:flash)`
    fetch(request)
      .then(result => result.json())
      .then(json => {
        if (json.data) {
          setCardImages(json.data
            .filter(card => {
              if (openMana === '') {
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
    <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginTop: '8px'}}>
      {cardImages.map(imageUrl =>
        <img style={{width: '200px', padding: '1px'}} src={imageUrl} alt='' key={imageUrl} />
      )}
    </div>
  )
}

export default function Home({location}) {
  const [expansion, setExpansion] = useState(location.search.replace('?', ''))
  const [openMana, setOpenMana] = useState('')

  const [allExpansions, setAllExpansions] = useState([])
  useEffect(() => {
    fetch('https://api.scryfall.com/sets')
      .then(result => result.json())
      .then(json => {
        if (!json.data) {
          return
        }
        const expansions = json.data
          .filter(expansionData =>
            !expansionData.parent_set_code
              && !['spellbook', 'promo', 'funny', 'box', 'duel_deck', 'commander'].includes(expansionData.set_type)
              && !expansionData.foil_only)
          .sort(expansionData => expansionData.released_at)
        setAllExpansions(expansions)
        if (!expansion) {
          setExpansion(expansions[0].code)
        }
      })
  }, [expansion])

  const formFieldStyle = {margin: '2px', width: '300px'}
  const openManaHelp = ('Use the color symbols "wubrgc" to define what open mana your opponent has.<br />' +
    'Use brackets if a land can produce one of multiple colors.<br />' +
    'For example if your opponent has two Islands, a Treasure Map and a Raugrin Triome: "uuc[urw]"')
  return (
    <div style={{minWidth: '616px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <h1 style={{fontSize: '30px'}}>MtG Sirprise</h1>
      <div>
        <span>
          expansion:
        </span>
        <select
            value={expansion} style={formFieldStyle} onChange={callSetter(setExpansion)}
            onBlur={callSetter(setExpansion)}>
          {allExpansions.map(expansion => (
            <option value={expansion.code} key={expansion.id}>
              {expansion.code.toUpperCase()} - {expansion.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <span>
          open mana:
        </span>
        <input type='text' value={openMana}  style={formFieldStyle} placeholder='u[rw]'
            onChange={callSetter(setOpenMana)} data-tip={openManaHelp} data-multiline={true} />
      </div>
      <QueryResult openMana={openMana} expansion={expansion} />
      <ReactTooltip />
    </div>
  )
}
