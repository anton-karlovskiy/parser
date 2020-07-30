# Consumers

This section describes how different objects are consumed in CSS.

- [CSSDeclaration](#cssdeclaration)
- [CSSStyleRule](#cssstylerule)

---

## CSSDeclaration

The **CSSDeclaration** class represents a CSS declaration block.

```
┌───────────────────────────────────────────────────────────┐
│                        declaration                        │
├──────────────────┬─────────┬───────┬────────────┬─────────┤
│       name       │ opening │ value │  priority  │ closing │
" background-color      :       red    !important      ;    "
└──────────────────┴─────────┴───────┴────────────┴─────────┘
```

### Consuming a CSSDeclaration

To consume a declaration:

1.  If the current value is not a `CSSWord`, then
      a. Return nothing.
2.  Create a new `CSSDeclaration`.
3.  Assign the current value to `CSSDeclaration#name`.
4.  Advance the current value.
5.  If the current value cannot be accessed;
      a. Return the incomplete `CSSDeclaration`.
6.  While the current value is a `CSSComment` or `CSSSpace` value,
      a. Assign the current value to `CSSDeclaration#betweenNameAndOpening`.
      b. Advance the current value.
7.  If the current value is not a `CSSSymbol<":">`, then
      a. Return the incomplete `CSSDeclaration`.
8.  Otherwise
      a. Assign the current value to `CSSDeclaration#opening`.
9.  Advance the current value.
10. While the current value is a `CSSComment` or `CSSSpace` value, then
    a. Assign the current value to `CSSDeclaration#betweenOpeningAndValue`.
    b. Advance the value.
11. While the current value can be accessed,
    a. Push the current value to `CSSDeclaration#value`.
    b. Advance the current value.
12. Move any `CSSComment` or `CSSSpace` values from the end of `CSSDeclaration#value` to `CSSDeclaration#betweenValueAndClosing`.
13. If the following conditions are met, which are
    a. If the last value of `CSSDeclaration#value` is a `CSSWord`, and
    b. If zero-or-more values before that value are a `CSSComment` or `CSSSpace`, and
    c. If the value before that is a `CSSSymbol<"!">`, then
       A. Create a new `CSSPriority`.
       B. Assign it to `CSSDeclaration#priority`.
       C. Assign the `CSSSymbol<"!">` value to `CSSPriority#symbol`.
       D. Assign the `CSSWord` value to `CSSPriority#value`.
       E. Move any `CSSComment` or `CSSSpace` values between `CSSPriority#symbol` and `CSSPriority#value` to `CSSPriority#betweenSymbolAndValue`.
       F. Move any `CSSComment` or `CSSSpace` values before `CSSPriority#symbol` to `CSSDeclaration#betweenValueAndPriority`.
14. Return the new `CSSDeclaration`.

**Shape**

```ts
declare class CSSDeclaration extends CSSGroup {
  name: CSSWord
  betweenNameAndOpening: CSSSkippable[]
  opening: CSSSymbol<":">
  betweenOpeningAndValue: CSSSkippable[]
  value: CSSValue[]
  betweenValueAndPriority: CSSSkippable[]
  priority: CSSPriority<{
    symbol: CSSSymbol<"!">
    betweenSymbolAndValue: CSSSkippable[]
    value: CSSWord
  }>
  betweenValueAndClosing: CSSSkippable[]
}

declare type CSSSkippable = CSSComment | CSSSpace
```

## CSSStyleRule
