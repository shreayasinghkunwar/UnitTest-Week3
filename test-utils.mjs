const testFns = []

/**
 * @param {string} name
 * @param {() => void} definition
 */
export function defineTest(name, definition) {
    testFns.push({ name, definition })
}

export function runTests() {
    testFns.forEach(({ name, definition }) => {
        console.error(name)
        try {
            definition()
            console.error(`✔️ Passed\n`)
        } catch (e) {
            console.error(`❌ Failed: ${e.message}\n`)
        }
    })
}

/**
 * @param {string} value
 * @param {string} expectedValue
 * @param {string=} message
 */
export function assertEqual(value, expectedValue, message) {
    if (value !== expectedValue) {
        const errorMsg = [
            `Expected ${JSON.stringify(value)} to equal ${JSON.stringify(expectedValue)}`,
            message
        ].filter(v => v)
            .join(': ')
        throw new Error(errorMsg)
    }
}

/**
 * @param {string} value
 * @param {string} expectedValue
 * @param {string=} message
 */
export function assertNotEqual(value, expectedValue, message) {
    if (value === expectedValue) {
        const errorMsg = [
            `Expected ${JSON.stringify(value)} to not equal ${JSON.stringify(expectedValue)}`,
            message
        ].filter(v => v)
            .join(': ')
        throw new Error(errorMsg)
    }
}

/**
 * @param {() => void} fn
 * @param {string=} matchErrorMessage
 * @param {string=} message
 */
export function assertThrowsError(fn, matchErrorMessage, message) {
    let thrownError = null
    try {
        fn()
    } catch (e) {
        thrownError = e
    }
    if (!thrownError) {
        const errorMsg = [
            `Expected function to throw error but it did not`,
            message
        ].filter(v => v)
            .join(': ')
        throw new Error(errorMsg)
    }
    if (matchErrorMessage && matchErrorMessage === thrownError.message) return
    const errorMsg = [
        `Expected error message to be "${matchErrorMessage}" but got ${thrownError.message}`,
        message
    ].filter(v => v)
        .join(': ')
    throw new Error(errorMsg)
}