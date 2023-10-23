import { checkMembership, cn } from './utils'

describe('checkMembership', () => {
  it('should return false if all members are active', () => {
    const members = [{ active: true }, { active: true }, { active: true }]
    expect(checkMembership(members)).toBe(false)
  })

  it('should return true if some members are active', () => {
    const members = [{ active: true }, { active: false }, { active: true }]
    expect(checkMembership(members)).toBe(true)
  })

  it('should return false if no members are active', () => {
    const members = [{ active: false }, { active: false }, { active: false }]
    expect(checkMembership(members)).toBe(false)
  })
})

describe('cn', () => {
  it('should return an empty string when no arguments are passed', () => {
    expect(cn()).toBe('')
  })

  it('should return a single class name when passed a single string argument', () => {
    expect(cn('foo')).toBe('foo')
  })

  it('should return a single class name when passed a single object argument with a truthy value', () => {
    expect(cn({ foo: true })).toBe('foo')
  })

  it('should return an empty string when passed a single object argument with a falsy value', () => {
    expect(cn({ foo: false })).toBe('')
  })

  it('should return a space-separated list of class names when passed multiple string arguments', () => {
    expect(cn('foo', 'bar', 'baz')).toBe('foo bar baz')
  })

  it('should return a space-separated list of class names when passed multiple object arguments with truthy values', () => {
    expect(cn({ foo: true }, { bar: true }, { baz: true })).toBe('foo bar baz')
  })

  it('should ignore object arguments with falsy values when passed multiple arguments', () => {
    expect(cn('foo', { bar: false }, 'baz', { qux: true })).toBe('foo baz qux')
  })

  it('should merge class names when passed nested arrays of arguments', () => {
    expect(cn(['foo', ['bar', 'baz']], 'qux')).toBe('foo bar baz qux')
  })
})