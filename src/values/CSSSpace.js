import { SPACE_TYPE } from '../token-types.js'
import { defineClass, toConcatenatedString } from './CSSValue.utils.js'
import { space } from '../tokenize.strings.js'
import CSSToken from './CSSToken.js'

/**
 * ## CSSSpace
 *
 * The CSSSpace class is the token object for all space values in CSS.
 *
 * @class @extends {CSSToken}
 * @argument {string} value - Value of the space.
 */
export default function CSSSpace(value) {
	this.value = value == null ? space : String(value)
}

defineClass(`CSSSpace`, CSSSpace, CSSToken, {
	type: [ 2, SPACE_TYPE ],

	// Methods
	toString: [ 6, function toString() {
		return toConcatenatedString(
			this.value,
			this.unit
		)
	} ],
})
