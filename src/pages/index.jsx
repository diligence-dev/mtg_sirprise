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

    const endpoint = 'https://api.scryfall.com/cards/search?order=review&q='
    const instantOrFlash = 't:instant or o:/flash\\n/ or o:"flash;" or o:/flash$/ or o:"has flash" or o:"had flash"'
    const request = encodeURIComponent(`s:${expansion} and (${instantOrFlash}) and is:booster`)
    fetch(endpoint + request)
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

  const fontSize = '25px'
  const formFieldStyle = {margin: '2px', width: '400px', fontSize}
  const formLabelStyle = {fontSize}
  const openManaHelp = ('Use the color symbols "wubrgc" to define what open mana your opponent has.<br />' +
    'Use brackets if a land can produce one of multiple colors.<br />' +
    'For example if your opponent has two Islands, a Dungeon Map, a Raugrin Triome and a Treasure token: "uuc[urw][wubrg]"<br />' +
    'You can use "*" instead of "[wubrg]".')
  return (
    <div style={{minWidth: '616px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <h2 style={{fontSize: '35px'}}>MtG Sirprise</h2>
      <h3 style={{fontSize, fontWeight: 'normal'}}>
        find all instant/flash cards your opponent could have
      </h3>
      <div>
        <span style={formLabelStyle}>
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
        <span style={formLabelStyle}>
          open mana:
        </span>
        <input type='text' value={openMana}  style={formFieldStyle} placeholder='u[rw]'
            onChange={callSetter(setOpenMana)} data-tip={openManaHelp} />
      </div>
      <QueryResult openMana={openMana} expansion={expansion} />
      <div id='donate' className='d-none'>
        <a href='https://ko-fi.com/Z8Z51NG5X' target='_blank' rel='noreferrer'>
          <img style={{border: '0px', height: '36px'}}
              src='https://cdn.ko-fi.com/cdn/kofi2.png?v=2' alt='Buy Me a Coffee at ko-fi.com' />
        </a>
        <form className='mt-2' action='https://www.paypal.com/cgi-bin/webscr' method='post' target='_top'>
          <input type='hidden' name='cmd' value='_s-xclick' />
          <input type='hidden' name='hosted_button_id' value='TJ8E5ZSCKA4YG' />
          <input type='image' src='https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif' border='0'
            name='submit' title='PayPal - The safer, easier way to pay online!' alt='Donate with PayPal button' />
          <img alt='' border='0' src='https://www.paypal.com/en_US/i/scr/pixel.gif' width='1' height='1' />
        </form>
      </div>
      <ReactTooltip style={{fontSize}} backgroundColor='black' multiline={true} />
    </div>
  )
}
