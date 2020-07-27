import React, { useState, useEffect } from 'react'

const QueryResult = ({query, expansion}) => {
  const [cardImages, setCardImages] = useState([])

  useEffect(() => {
    if (query === '' || expansion.length !== 3) {
      return
    }

    const cmc = parseInt(query, 10)
    const colors = query.slice(cmc.toString().length).trim()
    const colorQuery = colors === '' ? '' : '+(' + colors.split('').map(c => 'c:' + c).join(' or ') + ')'

    const endpoint = 'https://api.scryfall.com/cards/search?order=cmc&q='
    const request = `${endpoint}s:${expansion}+(t:instant or o:flash)+cmc<=${cmc || '99'}${colorQuery}`
    fetch(request)
      .then(result => result.json())
      .then(json => {
        if (json.data) {
          setCardImages(json.data.map(card => card.image_uris.normal))
        }
      })
  }, [query, expansion])
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
  const [query, setQuery] = useState('2ur')
  const [expansion, setExpansion] = useState('eld')

  return (
    <div>
      expansion: 
      <input type='text' value={expansion} placeholder='eld'
        onChange={event => setExpansion(event.target.value)} />
      <br />
      cmc and colors: 
      <input type='text' value={query} placeholder='2ur'
        onChange={event => setQuery(event.target.value)} />
      <br />
      <QueryResult query={query} expansion={expansion} />
    </div>
  )
}
