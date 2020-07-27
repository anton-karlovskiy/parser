import { withParent } from './consume.utils.js'
import CSSStyleRule from '../values/CSSStyleRule.js'
import consumeListOfSelectors from './consumeListOfSelectors.js'
import consumeListOfStyleRuleValues from './consumeListOfStyleRuleValues.js'
import consumeRuleContents from './consumeRuleContents.js'

/**
 * Consume a CSS Style Rule from a prepared iterator.
 * @argument {Iterator} iterator
 * @argument {CSSGroup} parent
 */
export default function consumeStyleRule(iterator, parent) {
	const element = withParent(new CSSStyleRule({
		prelude: null,
		opening: null,
		value:   null,
		closing: null,
		extra:   {
			betweenPreludeAndOpening: null,
		},
	}), parent)

	iterator.redo()

	return consumeRuleContents(iterator, element, consumeListOfStyleRuleValues, consumeListOfSelectors)
}

consumeStyleRule.prepare = true

/** @typedef {import('../values/index.js').CSSGroup} CSSGroup */
/** @typedef {import('../css-objects.js').Iterator} Iterator */
