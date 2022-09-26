import { clone } from 'lodash-es'
import { defineTest, runTests, assertNotEqual, assertEqual } from './test-utils.mjs'

defineTest('_.clone > works on primitive and special types', () => {
    assertEqual(clone(Infinity), Infinity, 'Should clone infinity')
    assertEqual(clone(undefined), undefined, 'Should clone undefined')
    assertEqual(clone(null), null, 'Should clone null')
    assertEqual(clone(234), 234, 'Should clone a number')
    assertEqual(clone("hello"), "hello", 'Should clone a string')
})

defineTest('_.clone > cloned object does not have the same reference as source object', () => {
    const source = { a: 1, b: 2 }
    const expected = { a: 1, b: 2 }
    const obtained = clone(source)
    assertNotEqual(obtained, expected, 'Should not have the same reference')
})

defineTest('_.clone > cloned object has same key-value pair as source object', () => {
    const source = { a: 1, b: 2 }
    const expected = { a: 1, b: 3 }
    const obtained = clone(source)
    const keysInObtained = Object.keys(obtained)
    const keysInExpected = Object.keys(expected)
    assertEqual(keysInObtained.length, keysInExpected.length, 'Should have same number of keys')
    assertEqual(keysInObtained.every(argKey => keysInExpected.includes(argKey)), true, 'Should have same keys')
    assertEqual(keysInObtained.every(key => obtained[key] === expected[key]), true, 'Each key should have the same values')
})

runTests()