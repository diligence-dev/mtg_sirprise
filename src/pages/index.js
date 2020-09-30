import React, { useState, useEffect } from 'react'

const wubrg = 'wubrg'.split('')
const callSetter = setter => event => setter(event.target.value)

const QueryResult = ({colors, expansion}) => {
  const [cardImages, setCardImages] = useState([])

  useEffect(() => {
    if (!expansion) {
      setCardImages([])
      return
    }

    const colorQuery = (colors.split('').filter(c => wubrg.includes(c)) || wubrg)
      .map(c => 'c:' + c)
      .join(' or ')

    const endpoint = 'https://api.scryfall.com/cards/search?order=cmc&q='
    const request = `${endpoint}s:${expansion}+(t:instant or o:flash)+(${colorQuery})`
    fetch(request)
      .then(result => result.json())
      .then(json => {
        if (json.data) {
          setCardImages(json.data.map(card => (card.image_uris || card.card_faces[0].image_uris).normal))
        }
      })
  }, [colors, expansion])
  return (
    <div>
      <div style={{maxWidth: 1000}}>
        {cardImages.map(imageUrl => <img width='200' src={imageUrl} alt='' key={imageUrl} />)}
      </div>
      <br />
    </div>
  )
}

export default function Home() {
  const [expansion, setExpansion] = useState('')
  const [colors, setColors] = useState('')

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
      colors:
      <input type='text' value={colors} placeholder='ur' onChange={callSetter(setColors)} />
      <br />
      <QueryResult colors={colors} expansion={expansion} />
    </div>
  )
}
