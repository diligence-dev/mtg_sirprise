import test from 'ava'
import {isCastable, possibleManaCosts} from './mtg_sirprise_lib.mjs'

test('foo', t => {
    t.assert(isCastable('gg', '{g}{g}'))
})
