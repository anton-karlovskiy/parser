import tokenize from './tokenize.js'

import CSSFragment from './types/CSSObject/CSSHost/CSSFragment.js'
import CSSRoot from './types/CSSObject/CSSHost/CSSRoot.js'

import consumeAny from './types/CSSObject/fromTokenizer/Any.fromTokenizers.js'
import consumeNode from './types/CSSObject/fromTokenizer/CSSNode.fromTokenizer.js'
import consumeRoot from './types/CSSObject/fromTokenizer/CSSRoot.fromTokenizer.js'

export function parseFragment(input) {
	const tokenizer = tokenize(input)
	return consumeAny(tokenizer, consumeNode, CSSFragment)
}

export function parseRoot(input) {
	const tokenizer = tokenize(input)
	return consumeAny(tokenizer, consumeRoot, CSSRoot)
}
