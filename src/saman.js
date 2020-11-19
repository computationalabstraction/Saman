// Polyfill from MDN
if (!Object.is) {
  Object.defineProperty(Object, 'is', {
    value: function (x, y) {
      // SameValue algorithm
      if (x === y) { // Steps 1-5, 7-10
        // Steps 6.b-6.e: +0 != -0
        return x !== 0 || 1 / x === 1 / y
      } else {
        // Step 6.a: NaN == NaN
        return x !== x && y !== y
      }
    }
  })
}

function arrayEquality (a1, a2) {
  if (a1.length !== a2.length) return false
  let isEqual = false
  for (const i in a1) isEqual = equal(a1[i], a2[i])
  return isEqual
}

function objectEquality (o1, o2) {
  const f1 = Object.getOwnPropertyNames(o1)
  const f2 = Object.getOwnPropertyNames(o2)
  if (f1.length !== f2.length) return false
  let isEqual = false
  for (const p1 in f1) for (const p2 in f2) isEqual = p1 === p2 && equal(o1[p1], o2[p2])
  return isEqual
}

function equal (a, b) {
  if (Object.is(a, b)) return true
  else if (Array.isArray(a) && Array.isArray(b)) return arrayEquality(a, b)
  else if (typeof a === 'object' && typeof b === 'object') return objectEquality(a, b)
  return false
}

function uDiff (oo, no) {
  let keys = Object.getOwnPropertyNames(oo)
  if (Array.isArray(oo) && Array.isArray(no)) keys = keys.filter(v => v !== 'length')
  return keys.reduce((u, p) => {
    let temp
    no[p] !== undefined
      ? ((typeof no[p] === 'object' && typeof oo[p] === 'object')
          ? ((temp = uDiff(oo[p], no[p])) && Object.getOwnPropertyNames(temp).length !== 0 && (u[p] = temp))
          : (oo[p] !== no[p] ? (u[p] = no[p]) : 0)) : 0
    return u
  }, {})
}

function dDiff (oo, no) {
  return Object.getOwnPropertyNames(oo).reduce((d, p) => {
    let temp;
    (no[p] === undefined)
      ? (d[p] = oo[p])
      : (typeof no[p] === 'object') &&
                (typeof oo[p] === 'object')
          ? ((temp = dDiff(oo[p], no[p])) && Object.getOwnPropertyNames(temp).length !== 0 && (d[p] = temp)) : 0
    return d
  }, {})
}

function cDiff (oo, no) {
  return Object.getOwnPropertyNames(no).reduce((c, p) => {
    oo[p] === undefined
      ? (c[p] = no[p])
      : (typeof no[p] === 'object') &&
                (typeof oo[p] === 'object')
          ? ((temp = cDiff(oo[p], no[p])) && Object.getOwnPropertyNames(temp).length !== 0 && (c[p] = temp)) : 0
    return c
  }, {})
}

function merge (obj1, obj2) {
  const m = Object.assign({}, obj1, obj2)
  for (const p1 in obj1) {
    for (const p2 in obj2) {
      p1 === p2 &&
            (typeof obj1[p1] === 'object') &&
            (typeof obj2[p2] === 'object') &&
            (m[p1] = merge(obj1[p1], obj2[p1]))
    }
  }
  return m
}

function diff2 (oo, no) {
  return {
    created: cDiff(oo, no),
    updated: uDiff(oo, no),
    deleted: dDiff(oo, no)
  }
}

function diff (oo, no) {
  return merge(dDiff(oo, no), merge(cDiff(oo, no), uDiff(oo, no)))
}

const saman = Object.freeze({
  equal: equal,
  uDiff: uDiff,
  cDiff: cDiff,
  dDiff: dDiff,
  diff: diff,
  diff2: diff2,
  merge: merge
})

if (typeof module !== 'undefined') module.exports = saman
