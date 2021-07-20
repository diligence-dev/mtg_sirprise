import test from 'ava'
import {isCastable, possibleManaCosts} from './mtg_sirprise_lib.mjs'

test('possibleManaCosts', t => {
    t.deepEqual(possibleManaCosts('{1}{u}{g}'), ['AUG'])
    t.deepEqual(possibleManaCosts('{1}{u/g}{2/g}'), ['AUAA', 'AUG', 'AGAA', 'AGG'])
    t.deepEqual(possibleManaCosts('{U/R}{U/R} // {X}{U}{U}{R}{R}'), ['UU', 'UR', 'RU', 'RR', 'UURR'])
})

test('isCastable', t => {
    t.true(isCastable('gg', '{g}{g}'))
    t.false(isCastable('gg', '{r}{g}'))
    t.true(isCastable('gg', '{g}{2/g}'))
    t.true(isCastable('guu', '{g}{2/g}'))
    t.true(isCastable('uuu', '{1}{u/g}{u/g}'))
    t.false(isCastable('urr', '{1}{u/g}{u/g}'))
    t.true(isCastable('guu', '{g}{2/g}'))
    t.false(isCastable('guur', '{5}'))
    t.true(isCastable('guuwr', '{5}'))
})
