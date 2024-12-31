'use strict'
var Io = Object.create
var At = Object.defineProperty
var _o = Object.getOwnPropertyDescriptor
var Do = Object.getOwnPropertyNames
var Fo = Object.getPrototypeOf,
  No = Object.prototype.hasOwnProperty
var oe = (e, t) => () => (e && (t = e((e = 0))), t)
var Ce = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports),
  Ze = (e, t) => {
    for (var r in t) At(e, r, { get: t[r], enumerable: !0 })
  },
  zr = (e, t, r, n) => {
    if ((t && typeof t == 'object') || typeof t == 'function')
      for (let i of Do(t))
        !No.call(e, i) &&
          i !== r &&
          At(e, i, {
            get: () => t[i],
            enumerable: !(n = _o(t, i)) || n.enumerable,
          })
    return e
  }
var _e = (e, t, r) => (
    (r = e != null ? Io(Fo(e)) : {}),
    zr(
      t || !e || !e.__esModule
        ? At(r, 'default', { value: e, enumerable: !0 })
        : r,
      e
    )
  ),
  cr = (e) => zr(At({}, '__esModule', { value: !0 }), e)
function mr(e, t) {
  if (((t = t.toLowerCase()), t === 'utf8' || t === 'utf-8'))
    return new h(Vo.encode(e))
  if (t === 'base64' || t === 'base64url')
    return (
      (e = e.replace(/-/g, '+').replace(/_/g, '/')),
      (e = e.replace(/[^A-Za-z0-9+/]/g, '')),
      new h([...atob(e)].map((r) => r.charCodeAt(0)))
    )
  if (t === 'binary' || t === 'ascii' || t === 'latin1' || t === 'latin-1')
    return new h([...e].map((r) => r.charCodeAt(0)))
  if (t === 'ucs2' || t === 'ucs-2' || t === 'utf16le' || t === 'utf-16le') {
    let r = new h(e.length * 2),
      n = new DataView(r.buffer)
    for (let i = 0; i < e.length; i++) n.setUint16(i * 2, e.charCodeAt(i), !0)
    return r
  }
  if (t === 'hex') {
    let r = new h(e.length / 2)
    for (let n = 0, i = 0; i < e.length; i += 2, n++)
      r[n] = parseInt(e.slice(i, i + 2), 16)
    return r
  }
  Xr(`encoding "${t}"`)
}
function Uo(e) {
  let r = Object.getOwnPropertyNames(DataView.prototype).filter(
      (a) => a.startsWith('get') || a.startsWith('set')
    ),
    n = r.map((a) => a.replace('get', 'read').replace('set', 'write')),
    i = (a, f) =>
      function (b = 0) {
        return (
          $(b, 'offset'),
          Y(b, 'offset'),
          q(b, 'offset', this.length - 1),
          new DataView(this.buffer)[r[a]](b, f)
        )
      },
    o = (a, f) =>
      function (b, T = 0) {
        let C = r[a].match(/set(\w+\d+)/)[1].toLowerCase(),
          O = $o[C]
        return (
          $(T, 'offset'),
          Y(T, 'offset'),
          q(T, 'offset', this.length - 1),
          Bo(b, 'value', O[0], O[1]),
          new DataView(this.buffer)[r[a]](T, b, f),
          T + parseInt(r[a].match(/\d+/)[0]) / 8
        )
      },
    s = (a) => {
      a.forEach((f) => {
        f.includes('Uint') && (e[f.replace('Uint', 'UInt')] = e[f]),
          f.includes('Float64') && (e[f.replace('Float64', 'Double')] = e[f]),
          f.includes('Float32') && (e[f.replace('Float32', 'Float')] = e[f])
      })
    }
  n.forEach((a, f) => {
    a.startsWith('read') &&
      ((e[a] = i(f, !1)), (e[a + 'LE'] = i(f, !0)), (e[a + 'BE'] = i(f, !1))),
      a.startsWith('write') &&
        ((e[a] = o(f, !1)), (e[a + 'LE'] = o(f, !0)), (e[a + 'BE'] = o(f, !1))),
      s([a, a + 'LE', a + 'BE'])
  })
}
function Xr(e) {
  throw new Error(`Buffer polyfill does not implement "${e}"`)
}
function Rt(e, t) {
  if (!(e instanceof Uint8Array))
    throw new TypeError(
      `The "${t}" argument must be an instance of Buffer or Uint8Array`
    )
}
function q(e, t, r = Qo + 1) {
  if (e < 0 || e > r) {
    let n = new RangeError(
      `The value of "${t}" is out of range. It must be >= 0 && <= ${r}. Received ${e}`
    )
    throw ((n.code = 'ERR_OUT_OF_RANGE'), n)
  }
}
function $(e, t) {
  if (typeof e != 'number') {
    let r = new TypeError(
      `The "${t}" argument must be of type number. Received type ${typeof e}.`
    )
    throw ((r.code = 'ERR_INVALID_ARG_TYPE'), r)
  }
}
function Y(e, t) {
  if (!Number.isInteger(e) || Number.isNaN(e)) {
    let r = new RangeError(
      `The value of "${t}" is out of range. It must be an integer. Received ${e}`
    )
    throw ((r.code = 'ERR_OUT_OF_RANGE'), r)
  }
}
function Bo(e, t, r, n) {
  if (e < r || e > n) {
    let i = new RangeError(
      `The value of "${t}" is out of range. It must be >= ${r} and <= ${n}. Received ${e}`
    )
    throw ((i.code = 'ERR_OUT_OF_RANGE'), i)
  }
}
function Yr(e, t) {
  if (typeof e != 'string') {
    let r = new TypeError(
      `The "${t}" argument must be of type string. Received type ${typeof e}`
    )
    throw ((r.code = 'ERR_INVALID_ARG_TYPE'), r)
  }
}
function Jo(e, t = 'utf8') {
  return h.from(e, t)
}
var h,
  $o,
  Vo,
  qo,
  jo,
  Qo,
  y,
  pr,
  u = oe(() => {
    'use strict'
    h = class e extends Uint8Array {
      constructor() {
        super(...arguments)
        this._isBuffer = !0
      }
      get offset() {
        return this.byteOffset
      }
      static alloc(r, n = 0, i = 'utf8') {
        return Yr(i, 'encoding'), e.allocUnsafe(r).fill(n, i)
      }
      static allocUnsafe(r) {
        return e.from(r)
      }
      static allocUnsafeSlow(r) {
        return e.from(r)
      }
      static isBuffer(r) {
        return r && !!r._isBuffer
      }
      static byteLength(r, n = 'utf8') {
        if (typeof r == 'string') return mr(r, n).byteLength
        if (r && r.byteLength) return r.byteLength
        let i = new TypeError(
          'The "string" argument must be of type string or an instance of Buffer or ArrayBuffer.'
        )
        throw ((i.code = 'ERR_INVALID_ARG_TYPE'), i)
      }
      static isEncoding(r) {
        return jo.includes(r)
      }
      static compare(r, n) {
        Rt(r, 'buff1'), Rt(n, 'buff2')
        for (let i = 0; i < r.length; i++) {
          if (r[i] < n[i]) return -1
          if (r[i] > n[i]) return 1
        }
        return r.length === n.length ? 0 : r.length > n.length ? 1 : -1
      }
      static from(r, n = 'utf8') {
        if (r && typeof r == 'object' && r.type === 'Buffer')
          return new e(r.data)
        if (typeof r == 'number') return new e(new Uint8Array(r))
        if (typeof r == 'string') return mr(r, n)
        if (ArrayBuffer.isView(r)) {
          let { byteOffset: i, byteLength: o, buffer: s } = r
          return 'map' in r && typeof r.map == 'function'
            ? new e(
                r.map((a) => a % 256),
                i,
                o
              )
            : new e(s, i, o)
        }
        if (
          r &&
          typeof r == 'object' &&
          ('length' in r || 'byteLength' in r || 'buffer' in r)
        )
          return new e(r)
        throw new TypeError(
          'First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.'
        )
      }
      static concat(r, n) {
        if (r.length === 0) return e.alloc(0)
        let i = [].concat(...r.map((s) => [...s])),
          o = e.alloc(n !== void 0 ? n : i.length)
        return o.set(n !== void 0 ? i.slice(0, n) : i), o
      }
      slice(r = 0, n = this.length) {
        return this.subarray(r, n)
      }
      subarray(r = 0, n = this.length) {
        return Object.setPrototypeOf(super.subarray(r, n), e.prototype)
      }
      reverse() {
        return super.reverse(), this
      }
      readIntBE(r, n) {
        $(r, 'offset'),
          Y(r, 'offset'),
          q(r, 'offset', this.length - 1),
          $(n, 'byteLength'),
          Y(n, 'byteLength')
        let i = new DataView(this.buffer, r, n),
          o = 0
        for (let s = 0; s < n; s++) o = o * 256 + i.getUint8(s)
        return i.getUint8(0) & 128 && (o -= Math.pow(256, n)), o
      }
      readIntLE(r, n) {
        $(r, 'offset'),
          Y(r, 'offset'),
          q(r, 'offset', this.length - 1),
          $(n, 'byteLength'),
          Y(n, 'byteLength')
        let i = new DataView(this.buffer, r, n),
          o = 0
        for (let s = 0; s < n; s++) o += i.getUint8(s) * Math.pow(256, s)
        return i.getUint8(n - 1) & 128 && (o -= Math.pow(256, n)), o
      }
      readUIntBE(r, n) {
        $(r, 'offset'),
          Y(r, 'offset'),
          q(r, 'offset', this.length - 1),
          $(n, 'byteLength'),
          Y(n, 'byteLength')
        let i = new DataView(this.buffer, r, n),
          o = 0
        for (let s = 0; s < n; s++) o = o * 256 + i.getUint8(s)
        return o
      }
      readUintBE(r, n) {
        return this.readUIntBE(r, n)
      }
      readUIntLE(r, n) {
        $(r, 'offset'),
          Y(r, 'offset'),
          q(r, 'offset', this.length - 1),
          $(n, 'byteLength'),
          Y(n, 'byteLength')
        let i = new DataView(this.buffer, r, n),
          o = 0
        for (let s = 0; s < n; s++) o += i.getUint8(s) * Math.pow(256, s)
        return o
      }
      readUintLE(r, n) {
        return this.readUIntLE(r, n)
      }
      writeIntBE(r, n, i) {
        return (r = r < 0 ? r + Math.pow(256, i) : r), this.writeUIntBE(r, n, i)
      }
      writeIntLE(r, n, i) {
        return (r = r < 0 ? r + Math.pow(256, i) : r), this.writeUIntLE(r, n, i)
      }
      writeUIntBE(r, n, i) {
        $(n, 'offset'),
          Y(n, 'offset'),
          q(n, 'offset', this.length - 1),
          $(i, 'byteLength'),
          Y(i, 'byteLength')
        let o = new DataView(this.buffer, n, i)
        for (let s = i - 1; s >= 0; s--) o.setUint8(s, r & 255), (r = r / 256)
        return n + i
      }
      writeUintBE(r, n, i) {
        return this.writeUIntBE(r, n, i)
      }
      writeUIntLE(r, n, i) {
        $(n, 'offset'),
          Y(n, 'offset'),
          q(n, 'offset', this.length - 1),
          $(i, 'byteLength'),
          Y(i, 'byteLength')
        let o = new DataView(this.buffer, n, i)
        for (let s = 0; s < i; s++) o.setUint8(s, r & 255), (r = r / 256)
        return n + i
      }
      writeUintLE(r, n, i) {
        return this.writeUIntLE(r, n, i)
      }
      toJSON() {
        return { type: 'Buffer', data: Array.from(this) }
      }
      swap16() {
        let r = new DataView(this.buffer, this.byteOffset, this.byteLength)
        for (let n = 0; n < this.length; n += 2)
          r.setUint16(n, r.getUint16(n, !0), !1)
        return this
      }
      swap32() {
        let r = new DataView(this.buffer, this.byteOffset, this.byteLength)
        for (let n = 0; n < this.length; n += 4)
          r.setUint32(n, r.getUint32(n, !0), !1)
        return this
      }
      swap64() {
        let r = new DataView(this.buffer, this.byteOffset, this.byteLength)
        for (let n = 0; n < this.length; n += 8)
          r.setBigUint64(n, r.getBigUint64(n, !0), !1)
        return this
      }
      compare(r, n = 0, i = r.length, o = 0, s = this.length) {
        return (
          Rt(r, 'target'),
          $(n, 'targetStart'),
          $(i, 'targetEnd'),
          $(o, 'sourceStart'),
          $(s, 'sourceEnd'),
          q(n, 'targetStart'),
          q(i, 'targetEnd', r.length),
          q(o, 'sourceStart'),
          q(s, 'sourceEnd', this.length),
          e.compare(this.slice(o, s), r.slice(n, i))
        )
      }
      equals(r) {
        return (
          Rt(r, 'otherBuffer'),
          this.length === r.length && this.every((n, i) => n === r[i])
        )
      }
      copy(r, n = 0, i = 0, o = this.length) {
        q(n, 'targetStart'),
          q(i, 'sourceStart', this.length),
          q(o, 'sourceEnd'),
          (n >>>= 0),
          (i >>>= 0),
          (o >>>= 0)
        let s = 0
        for (; i < o && !(this[i] === void 0 || r[n] === void 0); )
          (r[n] = this[i]), s++, i++, n++
        return s
      }
      write(r, n, i, o = 'utf8') {
        let s = typeof n == 'string' ? 0 : n ?? 0,
          a = typeof i == 'string' ? this.length - s : i ?? this.length - s
        return (
          (o = typeof n == 'string' ? n : typeof i == 'string' ? i : o),
          $(s, 'offset'),
          $(a, 'length'),
          q(s, 'offset', this.length),
          q(a, 'length', this.length),
          (o === 'ucs2' ||
            o === 'ucs-2' ||
            o === 'utf16le' ||
            o === 'utf-16le') &&
            (a = a - (a % 2)),
          mr(r, o).copy(this, s, 0, a)
        )
      }
      fill(r = 0, n = 0, i = this.length, o = 'utf-8') {
        let s = typeof n == 'string' ? 0 : n,
          a = typeof i == 'string' ? this.length : i
        if (
          ((o = typeof n == 'string' ? n : typeof i == 'string' ? i : o),
          (r = e.from(typeof r == 'number' ? [r] : r ?? [], o)),
          Yr(o, 'encoding'),
          q(s, 'offset', this.length),
          q(a, 'end', this.length),
          r.length !== 0)
        )
          for (let f = s; f < a; f += r.length)
            super.set(
              r.slice(
                0,
                r.length + f >= this.length ? this.length - f : r.length
              ),
              f
            )
        return this
      }
      includes(r, n = null, i = 'utf-8') {
        return this.indexOf(r, n, i) !== -1
      }
      lastIndexOf(r, n = null, i = 'utf-8') {
        return this.indexOf(r, n, i, !0)
      }
      indexOf(r, n = null, i = 'utf-8', o = !1) {
        let s = o ? this.findLastIndex.bind(this) : this.findIndex.bind(this)
        i = typeof n == 'string' ? n : i
        let a = e.from(typeof r == 'number' ? [r] : r, i),
          f = typeof n == 'string' ? 0 : n
        return (
          (f = typeof n == 'number' ? f : null),
          (f = Number.isNaN(f) ? null : f),
          (f ??= o ? this.length : 0),
          (f = f < 0 ? this.length + f : f),
          a.length === 0 && o === !1
            ? f >= this.length
              ? this.length
              : f
            : a.length === 0 && o === !0
              ? (f >= this.length ? this.length : f) || this.length
              : s(
                  (b, T) =>
                    (o ? T <= f : T >= f) &&
                    this[T] === a[0] &&
                    a.every((O, R) => this[T + R] === O)
                )
        )
      }
      toString(r = 'utf8', n = 0, i = this.length) {
        if (((n = n < 0 ? 0 : n), (r = r.toString().toLowerCase()), i <= 0))
          return ''
        if (r === 'utf8' || r === 'utf-8') return qo.decode(this.slice(n, i))
        if (r === 'base64' || r === 'base64url') {
          let o = btoa(this.reduce((s, a) => s + pr(a), ''))
          return r === 'base64url'
            ? o.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
            : o
        }
        if (
          r === 'binary' ||
          r === 'ascii' ||
          r === 'latin1' ||
          r === 'latin-1'
        )
          return this.slice(n, i).reduce(
            (o, s) => o + pr(s & (r === 'ascii' ? 127 : 255)),
            ''
          )
        if (
          r === 'ucs2' ||
          r === 'ucs-2' ||
          r === 'utf16le' ||
          r === 'utf-16le'
        ) {
          let o = new DataView(this.buffer.slice(n, i))
          return Array.from({ length: o.byteLength / 2 }, (s, a) =>
            a * 2 + 1 < o.byteLength ? pr(o.getUint16(a * 2, !0)) : ''
          ).join('')
        }
        if (r === 'hex')
          return this.slice(n, i).reduce(
            (o, s) => o + s.toString(16).padStart(2, '0'),
            ''
          )
        Xr(`encoding "${r}"`)
      }
      toLocaleString() {
        return this.toString()
      }
      inspect() {
        return `<Buffer ${this.toString('hex')
          .match(/.{1,2}/g)
          .join(' ')}>`
      }
    }
    ;($o = {
      int8: [-128, 127],
      int16: [-32768, 32767],
      int32: [-2147483648, 2147483647],
      uint8: [0, 255],
      uint16: [0, 65535],
      uint32: [0, 4294967295],
      float32: [-1 / 0, 1 / 0],
      float64: [-1 / 0, 1 / 0],
      bigint64: [-0x8000000000000000n, 0x7fffffffffffffffn],
      biguint64: [0n, 0xffffffffffffffffn],
    }),
      (Vo = new TextEncoder()),
      (qo = new TextDecoder()),
      (jo = [
        'utf8',
        'utf-8',
        'hex',
        'base64',
        'ascii',
        'binary',
        'base64url',
        'ucs2',
        'ucs-2',
        'utf16le',
        'utf-16le',
        'latin1',
        'latin-1',
      ]),
      (Qo = 4294967295)
    Uo(h.prototype)
    ;(y = new Proxy(Jo, {
      construct(e, [t, r]) {
        return h.from(t, r)
      },
      get(e, t) {
        return h[t]
      },
    })),
      (pr = String.fromCodePoint)
  })
var g,
  c = oe(() => {
    'use strict'
    g = {
      nextTick: (e, ...t) => {
        setTimeout(() => {
          e(...t)
        }, 0)
      },
      env: {},
      version: '',
      cwd: () => '/',
      stderr: {},
      argv: ['/bin/node'],
    }
  })
var x,
  m = oe(() => {
    'use strict'
    x =
      globalThis.performance ??
      (() => {
        let e = Date.now()
        return { now: () => Date.now() - e }
      })()
  })
var E,
  p = oe(() => {
    'use strict'
    E = () => {}
    E.prototype = E
  })
var w,
  d = oe(() => {
    'use strict'
    w = class {
      constructor(t) {
        this.value = t
      }
      deref() {
        return this.value
      }
    }
  })
function rn(e, t) {
  var r,
    n,
    i,
    o,
    s,
    a,
    f,
    b,
    T = e.constructor,
    C = T.precision
  if (!e.s || !t.s) return t.s || (t = new T(e)), U ? D(t, C) : t
  if (
    ((f = e.d),
    (b = t.d),
    (s = e.e),
    (i = t.e),
    (f = f.slice()),
    (o = s - i),
    o)
  ) {
    for (
      o < 0
        ? ((n = f), (o = -o), (a = b.length))
        : ((n = b), (i = s), (a = f.length)),
        s = Math.ceil(C / N),
        a = s > a ? s + 1 : a + 1,
        o > a && ((o = a), (n.length = 1)),
        n.reverse();
      o--;

    )
      n.push(0)
    n.reverse()
  }
  for (
    a = f.length,
      o = b.length,
      a - o < 0 && ((o = a), (n = b), (b = f), (f = n)),
      r = 0;
    o;

  )
    (r = ((f[--o] = f[o] + b[o] + r) / j) | 0), (f[o] %= j)
  for (r && (f.unshift(r), ++i), a = f.length; f[--a] == 0; ) f.pop()
  return (t.d = f), (t.e = i), U ? D(t, C) : t
}
function le(e, t, r) {
  if (e !== ~~e || e < t || e > r) throw Error(Re + e)
}
function ae(e) {
  var t,
    r,
    n,
    i = e.length - 1,
    o = '',
    s = e[0]
  if (i > 0) {
    for (o += s, t = 1; t < i; t++)
      (n = e[t] + ''), (r = N - n.length), r && (o += we(r)), (o += n)
    ;(s = e[t]), (n = s + ''), (r = N - n.length), r && (o += we(r))
  } else if (s === 0) return '0'
  for (; s % 10 === 0; ) s /= 10
  return o + s
}
function nn(e, t) {
  var r,
    n,
    i,
    o,
    s,
    a,
    f = 0,
    b = 0,
    T = e.constructor,
    C = T.precision
  if (V(e) > 16) throw Error(fr + V(e))
  if (!e.s) return new T(Z)
  for (
    t == null ? ((U = !1), (a = C)) : (a = t), s = new T(0.03125);
    e.abs().gte(0.1);

  )
    (e = e.times(s)), (b += 5)
  for (
    n = ((Math.log(Ae(2, b)) / Math.LN10) * 2 + 5) | 0,
      a += n,
      r = i = o = new T(Z),
      T.precision = a;
    ;

  ) {
    if (
      ((i = D(i.times(e), a)),
      (r = r.times(++f)),
      (s = o.plus(ge(i, r, a))),
      ae(s.d).slice(0, a) === ae(o.d).slice(0, a))
    ) {
      for (; b--; ) o = D(o.times(o), a)
      return (T.precision = C), t == null ? ((U = !0), D(o, C)) : o
    }
    o = s
  }
}
function V(e) {
  for (var t = e.e * N, r = e.d[0]; r >= 10; r /= 10) t++
  return t
}
function dr(e, t, r) {
  if (t > e.LN10.sd())
    throw (
      ((U = !0),
      r && (e.precision = r),
      Error(re + 'LN10 precision limit exceeded'))
    )
  return D(new e(e.LN10), t)
}
function we(e) {
  for (var t = ''; e--; ) t += '0'
  return t
}
function et(e, t) {
  var r,
    n,
    i,
    o,
    s,
    a,
    f,
    b,
    T,
    C = 1,
    O = 10,
    R = e,
    M = R.d,
    S = R.constructor,
    L = S.precision
  if (R.s < 1) throw Error(re + (R.s ? 'NaN' : '-Infinity'))
  if (R.eq(Z)) return new S(0)
  if ((t == null ? ((U = !1), (b = L)) : (b = t), R.eq(10)))
    return t == null && (U = !0), dr(S, b)
  if (
    ((b += O),
    (S.precision = b),
    (r = ae(M)),
    (n = r.charAt(0)),
    (o = V(R)),
    Math.abs(o) < 15e14)
  ) {
    for (; (n < 7 && n != 1) || (n == 1 && r.charAt(1) > 3); )
      (R = R.times(e)), (r = ae(R.d)), (n = r.charAt(0)), C++
    ;(o = V(R)),
      n > 1 ? ((R = new S('0.' + r)), o++) : (R = new S(n + '.' + r.slice(1)))
  } else
    return (
      (f = dr(S, b + 2, L).times(o + '')),
      (R = et(new S(n + '.' + r.slice(1)), b - O).plus(f)),
      (S.precision = L),
      t == null ? ((U = !0), D(R, L)) : R
    )
  for (
    a = s = R = ge(R.minus(Z), R.plus(Z), b), T = D(R.times(R), b), i = 3;
    ;

  ) {
    if (
      ((s = D(s.times(T), b)),
      (f = a.plus(ge(s, new S(i), b))),
      ae(f.d).slice(0, b) === ae(a.d).slice(0, b))
    )
      return (
        (a = a.times(2)),
        o !== 0 && (a = a.plus(dr(S, b + 2, L).times(o + ''))),
        (a = ge(a, new S(C), b)),
        (S.precision = L),
        t == null ? ((U = !0), D(a, L)) : a
      )
    ;(a = f), (i += 2)
  }
}
function Zr(e, t) {
  var r, n, i
  for (
    (r = t.indexOf('.')) > -1 && (t = t.replace('.', '')),
      (n = t.search(/e/i)) > 0
        ? (r < 0 && (r = n), (r += +t.slice(n + 1)), (t = t.substring(0, n)))
        : r < 0 && (r = t.length),
      n = 0;
    t.charCodeAt(n) === 48;

  )
    ++n
  for (i = t.length; t.charCodeAt(i - 1) === 48; ) --i
  if (((t = t.slice(n, i)), t)) {
    if (
      ((i -= n),
      (r = r - n - 1),
      (e.e = Fe(r / N)),
      (e.d = []),
      (n = (r + 1) % N),
      r < 0 && (n += N),
      n < i)
    ) {
      for (n && e.d.push(+t.slice(0, n)), i -= N; n < i; )
        e.d.push(+t.slice(n, (n += N)))
      ;(t = t.slice(n)), (n = N - t.length)
    } else n -= i
    for (; n--; ) t += '0'
    if ((e.d.push(+t), U && (e.e > St || e.e < -St))) throw Error(fr + r)
  } else (e.s = 0), (e.e = 0), (e.d = [0])
  return e
}
function D(e, t, r) {
  var n,
    i,
    o,
    s,
    a,
    f,
    b,
    T,
    C = e.d
  for (s = 1, o = C[0]; o >= 10; o /= 10) s++
  if (((n = t - s), n < 0)) (n += N), (i = t), (b = C[(T = 0)])
  else {
    if (((T = Math.ceil((n + 1) / N)), (o = C.length), T >= o)) return e
    for (b = o = C[T], s = 1; o >= 10; o /= 10) s++
    ;(n %= N), (i = n - N + s)
  }
  if (
    (r !== void 0 &&
      ((o = Ae(10, s - i - 1)),
      (a = (b / o) % 10 | 0),
      (f = t < 0 || C[T + 1] !== void 0 || b % o),
      (f =
        r < 4
          ? (a || f) && (r == 0 || r == (e.s < 0 ? 3 : 2))
          : a > 5 ||
            (a == 5 &&
              (r == 4 ||
                f ||
                (r == 6 &&
                  (n > 0 ? (i > 0 ? b / Ae(10, s - i) : 0) : C[T - 1]) % 10 &
                    1) ||
                r == (e.s < 0 ? 8 : 7))))),
    t < 1 || !C[0])
  )
    return (
      f
        ? ((o = V(e)),
          (C.length = 1),
          (t = t - o - 1),
          (C[0] = Ae(10, (N - (t % N)) % N)),
          (e.e = Fe(-t / N) || 0))
        : ((C.length = 1), (C[0] = e.e = e.s = 0)),
      e
    )
  if (
    (n == 0
      ? ((C.length = T), (o = 1), T--)
      : ((C.length = T + 1),
        (o = Ae(10, N - n)),
        (C[T] = i > 0 ? ((b / Ae(10, s - i)) % Ae(10, i) | 0) * o : 0)),
    f)
  )
    for (;;)
      if (T == 0) {
        ;(C[0] += o) == j && ((C[0] = 1), ++e.e)
        break
      } else {
        if (((C[T] += o), C[T] != j)) break
        ;(C[T--] = 0), (o = 1)
      }
  for (n = C.length; C[--n] === 0; ) C.pop()
  if (U && (e.e > St || e.e < -St)) throw Error(fr + V(e))
  return e
}
function on(e, t) {
  var r,
    n,
    i,
    o,
    s,
    a,
    f,
    b,
    T,
    C,
    O = e.constructor,
    R = O.precision
  if (!e.s || !t.s) return t.s ? (t.s = -t.s) : (t = new O(e)), U ? D(t, R) : t
  if (
    ((f = e.d),
    (C = t.d),
    (n = t.e),
    (b = e.e),
    (f = f.slice()),
    (s = b - n),
    s)
  ) {
    for (
      T = s < 0,
        T
          ? ((r = f), (s = -s), (a = C.length))
          : ((r = C), (n = b), (a = f.length)),
        i = Math.max(Math.ceil(R / N), a) + 2,
        s > i && ((s = i), (r.length = 1)),
        r.reverse(),
        i = s;
      i--;

    )
      r.push(0)
    r.reverse()
  } else {
    for (i = f.length, a = C.length, T = i < a, T && (a = i), i = 0; i < a; i++)
      if (f[i] != C[i]) {
        T = f[i] < C[i]
        break
      }
    s = 0
  }
  for (
    T && ((r = f), (f = C), (C = r), (t.s = -t.s)),
      a = f.length,
      i = C.length - a;
    i > 0;
    --i
  )
    f[a++] = 0
  for (i = C.length; i > s; ) {
    if (f[--i] < C[i]) {
      for (o = i; o && f[--o] === 0; ) f[o] = j - 1
      --f[o], (f[i] += j)
    }
    f[i] -= C[i]
  }
  for (; f[--a] === 0; ) f.pop()
  for (; f[0] === 0; f.shift()) --n
  return f[0] ? ((t.d = f), (t.e = n), U ? D(t, R) : t) : new O(0)
}
function Se(e, t, r) {
  var n,
    i = V(e),
    o = ae(e.d),
    s = o.length
  return (
    t
      ? (r && (n = r - s) > 0
          ? (o = o.charAt(0) + '.' + o.slice(1) + we(n))
          : s > 1 && (o = o.charAt(0) + '.' + o.slice(1)),
        (o = o + (i < 0 ? 'e' : 'e+') + i))
      : i < 0
        ? ((o = '0.' + we(-i - 1) + o), r && (n = r - s) > 0 && (o += we(n)))
        : i >= s
          ? ((o += we(i + 1 - s)),
            r && (n = r - i - 1) > 0 && (o = o + '.' + we(n)))
          : ((n = i + 1) < s && (o = o.slice(0, n) + '.' + o.slice(n)),
            r && (n = r - s) > 0 && (i + 1 === s && (o += '.'), (o += we(n)))),
    e.s < 0 ? '-' + o : o
  )
}
function en(e, t) {
  if (e.length > t) return (e.length = t), !0
}
function sn(e) {
  var t, r, n
  function i(o) {
    var s = this
    if (!(s instanceof i)) return new i(o)
    if (((s.constructor = i), o instanceof i)) {
      ;(s.s = o.s), (s.e = o.e), (s.d = (o = o.d) ? o.slice() : o)
      return
    }
    if (typeof o == 'number') {
      if (o * 0 !== 0) throw Error(Re + o)
      if (o > 0) s.s = 1
      else if (o < 0) (o = -o), (s.s = -1)
      else {
        ;(s.s = 0), (s.e = 0), (s.d = [0])
        return
      }
      if (o === ~~o && o < 1e7) {
        ;(s.e = 0), (s.d = [o])
        return
      }
      return Zr(s, o.toString())
    } else if (typeof o != 'string') throw Error(Re + o)
    if (
      (o.charCodeAt(0) === 45 ? ((o = o.slice(1)), (s.s = -1)) : (s.s = 1),
      Wo.test(o))
    )
      Zr(s, o)
    else throw Error(Re + o)
  }
  if (
    ((i.prototype = A),
    (i.ROUND_UP = 0),
    (i.ROUND_DOWN = 1),
    (i.ROUND_CEIL = 2),
    (i.ROUND_FLOOR = 3),
    (i.ROUND_HALF_UP = 4),
    (i.ROUND_HALF_DOWN = 5),
    (i.ROUND_HALF_EVEN = 6),
    (i.ROUND_HALF_CEIL = 7),
    (i.ROUND_HALF_FLOOR = 8),
    (i.clone = sn),
    (i.config = i.set = Ko),
    e === void 0 && (e = {}),
    e)
  )
    for (
      n = ['precision', 'rounding', 'toExpNeg', 'toExpPos', 'LN10'], t = 0;
      t < n.length;

    )
      e.hasOwnProperty((r = n[t++])) || (e[r] = this[r])
  return i.config(e), i
}
function Ko(e) {
  if (!e || typeof e != 'object') throw Error(re + 'Object expected')
  var t,
    r,
    n,
    i = [
      'precision',
      1,
      De,
      'rounding',
      0,
      8,
      'toExpNeg',
      -1 / 0,
      0,
      'toExpPos',
      0,
      1 / 0,
    ]
  for (t = 0; t < i.length; t += 3)
    if ((n = e[(r = i[t])]) !== void 0)
      if (Fe(n) === n && n >= i[t + 1] && n <= i[t + 2]) this[r] = n
      else throw Error(Re + r + ': ' + n)
  if ((n = e[(r = 'LN10')]) !== void 0)
    if (n == Math.LN10) this[r] = new this(n)
    else throw Error(Re + r + ': ' + n)
  return this
}
var De,
  Go,
  gr,
  U,
  re,
  Re,
  fr,
  Fe,
  Ae,
  Wo,
  Z,
  j,
  N,
  tn,
  St,
  A,
  ge,
  gr,
  Ot,
  an = oe(() => {
    'use strict'
    u()
    c()
    m()
    p()
    d()
    l()
    ;(De = 1e9),
      (Go = {
        precision: 20,
        rounding: 4,
        toExpNeg: -7,
        toExpPos: 21,
        LN10: '2.302585092994045684017991454684364207601101488628772976033327900967572609677352480235997205089598298341967784042286',
      }),
      (U = !0),
      (re = '[DecimalError] '),
      (Re = re + 'Invalid argument: '),
      (fr = re + 'Exponent out of range: '),
      (Fe = Math.floor),
      (Ae = Math.pow),
      (Wo = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i),
      (j = 1e7),
      (N = 7),
      (tn = 9007199254740991),
      (St = Fe(tn / N)),
      (A = {})
    A.absoluteValue = A.abs = function () {
      var e = new this.constructor(this)
      return e.s && (e.s = 1), e
    }
    A.comparedTo = A.cmp = function (e) {
      var t,
        r,
        n,
        i,
        o = this
      if (((e = new o.constructor(e)), o.s !== e.s)) return o.s || -e.s
      if (o.e !== e.e) return (o.e > e.e) ^ (o.s < 0) ? 1 : -1
      for (n = o.d.length, i = e.d.length, t = 0, r = n < i ? n : i; t < r; ++t)
        if (o.d[t] !== e.d[t]) return (o.d[t] > e.d[t]) ^ (o.s < 0) ? 1 : -1
      return n === i ? 0 : (n > i) ^ (o.s < 0) ? 1 : -1
    }
    A.decimalPlaces = A.dp = function () {
      var e = this,
        t = e.d.length - 1,
        r = (t - e.e) * N
      if (((t = e.d[t]), t)) for (; t % 10 == 0; t /= 10) r--
      return r < 0 ? 0 : r
    }
    A.dividedBy = A.div = function (e) {
      return ge(this, new this.constructor(e))
    }
    A.dividedToIntegerBy = A.idiv = function (e) {
      var t = this,
        r = t.constructor
      return D(ge(t, new r(e), 0, 1), r.precision)
    }
    A.equals = A.eq = function (e) {
      return !this.cmp(e)
    }
    A.exponent = function () {
      return V(this)
    }
    A.greaterThan = A.gt = function (e) {
      return this.cmp(e) > 0
    }
    A.greaterThanOrEqualTo = A.gte = function (e) {
      return this.cmp(e) >= 0
    }
    A.isInteger = A.isint = function () {
      return this.e > this.d.length - 2
    }
    A.isNegative = A.isneg = function () {
      return this.s < 0
    }
    A.isPositive = A.ispos = function () {
      return this.s > 0
    }
    A.isZero = function () {
      return this.s === 0
    }
    A.lessThan = A.lt = function (e) {
      return this.cmp(e) < 0
    }
    A.lessThanOrEqualTo = A.lte = function (e) {
      return this.cmp(e) < 1
    }
    A.logarithm = A.log = function (e) {
      var t,
        r = this,
        n = r.constructor,
        i = n.precision,
        o = i + 5
      if (e === void 0) e = new n(10)
      else if (((e = new n(e)), e.s < 1 || e.eq(Z))) throw Error(re + 'NaN')
      if (r.s < 1) throw Error(re + (r.s ? 'NaN' : '-Infinity'))
      return r.eq(Z)
        ? new n(0)
        : ((U = !1), (t = ge(et(r, o), et(e, o), o)), (U = !0), D(t, i))
    }
    A.minus = A.sub = function (e) {
      var t = this
      return (
        (e = new t.constructor(e)),
        t.s == e.s ? on(t, e) : rn(t, ((e.s = -e.s), e))
      )
    }
    A.modulo = A.mod = function (e) {
      var t,
        r = this,
        n = r.constructor,
        i = n.precision
      if (((e = new n(e)), !e.s)) throw Error(re + 'NaN')
      return r.s
        ? ((U = !1), (t = ge(r, e, 0, 1).times(e)), (U = !0), r.minus(t))
        : D(new n(r), i)
    }
    A.naturalExponential = A.exp = function () {
      return nn(this)
    }
    A.naturalLogarithm = A.ln = function () {
      return et(this)
    }
    A.negated = A.neg = function () {
      var e = new this.constructor(this)
      return (e.s = -e.s || 0), e
    }
    A.plus = A.add = function (e) {
      var t = this
      return (
        (e = new t.constructor(e)),
        t.s == e.s ? rn(t, e) : on(t, ((e.s = -e.s), e))
      )
    }
    A.precision = A.sd = function (e) {
      var t,
        r,
        n,
        i = this
      if (e !== void 0 && e !== !!e && e !== 1 && e !== 0) throw Error(Re + e)
      if (
        ((t = V(i) + 1), (n = i.d.length - 1), (r = n * N + 1), (n = i.d[n]), n)
      ) {
        for (; n % 10 == 0; n /= 10) r--
        for (n = i.d[0]; n >= 10; n /= 10) r++
      }
      return e && t > r ? t : r
    }
    A.squareRoot = A.sqrt = function () {
      var e,
        t,
        r,
        n,
        i,
        o,
        s,
        a = this,
        f = a.constructor
      if (a.s < 1) {
        if (!a.s) return new f(0)
        throw Error(re + 'NaN')
      }
      for (
        e = V(a),
          U = !1,
          i = Math.sqrt(+a),
          i == 0 || i == 1 / 0
            ? ((t = ae(a.d)),
              (t.length + e) % 2 == 0 && (t += '0'),
              (i = Math.sqrt(t)),
              (e = Fe((e + 1) / 2) - (e < 0 || e % 2)),
              i == 1 / 0
                ? (t = '5e' + e)
                : ((t = i.toExponential()),
                  (t = t.slice(0, t.indexOf('e') + 1) + e)),
              (n = new f(t)))
            : (n = new f(i.toString())),
          r = f.precision,
          i = s = r + 3;
        ;

      )
        if (
          ((o = n),
          (n = o.plus(ge(a, o, s + 2)).times(0.5)),
          ae(o.d).slice(0, s) === (t = ae(n.d)).slice(0, s))
        ) {
          if (((t = t.slice(s - 3, s + 1)), i == s && t == '4999')) {
            if ((D(o, r + 1, 0), o.times(o).eq(a))) {
              n = o
              break
            }
          } else if (t != '9999') break
          s += 4
        }
      return (U = !0), D(n, r)
    }
    A.times = A.mul = function (e) {
      var t,
        r,
        n,
        i,
        o,
        s,
        a,
        f,
        b,
        T = this,
        C = T.constructor,
        O = T.d,
        R = (e = new C(e)).d
      if (!T.s || !e.s) return new C(0)
      for (
        e.s *= T.s,
          r = T.e + e.e,
          f = O.length,
          b = R.length,
          f < b && ((o = O), (O = R), (R = o), (s = f), (f = b), (b = s)),
          o = [],
          s = f + b,
          n = s;
        n--;

      )
        o.push(0)
      for (n = b; --n >= 0; ) {
        for (t = 0, i = f + n; i > n; )
          (a = o[i] + R[n] * O[i - n - 1] + t),
            (o[i--] = a % j | 0),
            (t = (a / j) | 0)
        o[i] = (o[i] + t) % j | 0
      }
      for (; !o[--s]; ) o.pop()
      return (
        t ? ++r : o.shift(), (e.d = o), (e.e = r), U ? D(e, C.precision) : e
      )
    }
    A.toDecimalPlaces = A.todp = function (e, t) {
      var r = this,
        n = r.constructor
      return (
        (r = new n(r)),
        e === void 0
          ? r
          : (le(e, 0, De),
            t === void 0 ? (t = n.rounding) : le(t, 0, 8),
            D(r, e + V(r) + 1, t))
      )
    }
    A.toExponential = function (e, t) {
      var r,
        n = this,
        i = n.constructor
      return (
        e === void 0
          ? (r = Se(n, !0))
          : (le(e, 0, De),
            t === void 0 ? (t = i.rounding) : le(t, 0, 8),
            (n = D(new i(n), e + 1, t)),
            (r = Se(n, !0, e + 1))),
        r
      )
    }
    A.toFixed = function (e, t) {
      var r,
        n,
        i = this,
        o = i.constructor
      return e === void 0
        ? Se(i)
        : (le(e, 0, De),
          t === void 0 ? (t = o.rounding) : le(t, 0, 8),
          (n = D(new o(i), e + V(i) + 1, t)),
          (r = Se(n.abs(), !1, e + V(n) + 1)),
          i.isneg() && !i.isZero() ? '-' + r : r)
    }
    A.toInteger = A.toint = function () {
      var e = this,
        t = e.constructor
      return D(new t(e), V(e) + 1, t.rounding)
    }
    A.toNumber = function () {
      return +this
    }
    A.toPower = A.pow = function (e) {
      var t,
        r,
        n,
        i,
        o,
        s,
        a = this,
        f = a.constructor,
        b = 12,
        T = +(e = new f(e))
      if (!e.s) return new f(Z)
      if (((a = new f(a)), !a.s)) {
        if (e.s < 1) throw Error(re + 'Infinity')
        return a
      }
      if (a.eq(Z)) return a
      if (((n = f.precision), e.eq(Z))) return D(a, n)
      if (((t = e.e), (r = e.d.length - 1), (s = t >= r), (o = a.s), s)) {
        if ((r = T < 0 ? -T : T) <= tn) {
          for (
            i = new f(Z), t = Math.ceil(n / N + 4), U = !1;
            r % 2 && ((i = i.times(a)), en(i.d, t)), (r = Fe(r / 2)), r !== 0;

          )
            (a = a.times(a)), en(a.d, t)
          return (U = !0), e.s < 0 ? new f(Z).div(i) : D(i, n)
        }
      } else if (o < 0) throw Error(re + 'NaN')
      return (
        (o = o < 0 && e.d[Math.max(t, r)] & 1 ? -1 : 1),
        (a.s = 1),
        (U = !1),
        (i = e.times(et(a, n + b))),
        (U = !0),
        (i = nn(i)),
        (i.s = o),
        i
      )
    }
    A.toPrecision = function (e, t) {
      var r,
        n,
        i = this,
        o = i.constructor
      return (
        e === void 0
          ? ((r = V(i)), (n = Se(i, r <= o.toExpNeg || r >= o.toExpPos)))
          : (le(e, 1, De),
            t === void 0 ? (t = o.rounding) : le(t, 0, 8),
            (i = D(new o(i), e, t)),
            (r = V(i)),
            (n = Se(i, e <= r || r <= o.toExpNeg, e))),
        n
      )
    }
    A.toSignificantDigits = A.tosd = function (e, t) {
      var r = this,
        n = r.constructor
      return (
        e === void 0
          ? ((e = n.precision), (t = n.rounding))
          : (le(e, 1, De), t === void 0 ? (t = n.rounding) : le(t, 0, 8)),
        D(new n(r), e, t)
      )
    }
    A.toString =
      A.valueOf =
      A.val =
      A.toJSON =
      A[Symbol.for('nodejs.util.inspect.custom')] =
        function () {
          var e = this,
            t = V(e),
            r = e.constructor
          return Se(e, t <= r.toExpNeg || t >= r.toExpPos)
        }
    ge = (function () {
      function e(n, i) {
        var o,
          s = 0,
          a = n.length
        for (n = n.slice(); a--; )
          (o = n[a] * i + s), (n[a] = o % j | 0), (s = (o / j) | 0)
        return s && n.unshift(s), n
      }
      function t(n, i, o, s) {
        var a, f
        if (o != s) f = o > s ? 1 : -1
        else
          for (a = f = 0; a < o; a++)
            if (n[a] != i[a]) {
              f = n[a] > i[a] ? 1 : -1
              break
            }
        return f
      }
      function r(n, i, o) {
        for (var s = 0; o--; )
          (n[o] -= s), (s = n[o] < i[o] ? 1 : 0), (n[o] = s * j + n[o] - i[o])
        for (; !n[0] && n.length > 1; ) n.shift()
      }
      return function (n, i, o, s) {
        var a,
          f,
          b,
          T,
          C,
          O,
          R,
          M,
          S,
          L,
          ne,
          z,
          Ie,
          k,
          Te,
          ur,
          ie,
          Tt,
          Ct = n.constructor,
          Lo = n.s == i.s ? 1 : -1,
          se = n.d,
          B = i.d
        if (!n.s) return new Ct(n)
        if (!i.s) throw Error(re + 'Division by zero')
        for (
          f = n.e - i.e,
            ie = B.length,
            Te = se.length,
            R = new Ct(Lo),
            M = R.d = [],
            b = 0;
          B[b] == (se[b] || 0);

        )
          ++b
        if (
          (B[b] > (se[b] || 0) && --f,
          o == null
            ? (z = o = Ct.precision)
            : s
              ? (z = o + (V(n) - V(i)) + 1)
              : (z = o),
          z < 0)
        )
          return new Ct(0)
        if (((z = (z / N + 2) | 0), (b = 0), ie == 1))
          for (T = 0, B = B[0], z++; (b < Te || T) && z--; b++)
            (Ie = T * j + (se[b] || 0)), (M[b] = (Ie / B) | 0), (T = Ie % B | 0)
        else {
          for (
            T = (j / (B[0] + 1)) | 0,
              T > 1 &&
                ((B = e(B, T)),
                (se = e(se, T)),
                (ie = B.length),
                (Te = se.length)),
              k = ie,
              S = se.slice(0, ie),
              L = S.length;
            L < ie;

          )
            S[L++] = 0
          ;(Tt = B.slice()), Tt.unshift(0), (ur = B[0]), B[1] >= j / 2 && ++ur
          do
            (T = 0),
              (a = t(B, S, ie, L)),
              a < 0
                ? ((ne = S[0]),
                  ie != L && (ne = ne * j + (S[1] || 0)),
                  (T = (ne / ur) | 0),
                  T > 1
                    ? (T >= j && (T = j - 1),
                      (C = e(B, T)),
                      (O = C.length),
                      (L = S.length),
                      (a = t(C, S, O, L)),
                      a == 1 && (T--, r(C, ie < O ? Tt : B, O)))
                    : (T == 0 && (a = T = 1), (C = B.slice())),
                  (O = C.length),
                  O < L && C.unshift(0),
                  r(S, C, L),
                  a == -1 &&
                    ((L = S.length),
                    (a = t(B, S, ie, L)),
                    a < 1 && (T++, r(S, ie < L ? Tt : B, L))),
                  (L = S.length))
                : a === 0 && (T++, (S = [0])),
              (M[b++] = T),
              a && S[0] ? (S[L++] = se[k] || 0) : ((S = [se[k]]), (L = 1))
          while ((k++ < Te || S[0] !== void 0) && z--)
        }
        return M[0] || M.shift(), (R.e = f), D(R, s ? o + V(R) + 1 : o)
      }
    })()
    gr = sn(Go)
    Z = new gr(1)
    Ot = gr
  })
var v,
  ue,
  l = oe(() => {
    'use strict'
    an()
    ;(v = class extends Ot {
      static isDecimal(t) {
        return t instanceof Ot
      }
      static random(t = 20) {
        {
          let n = crypto
            .getRandomValues(new Uint8Array(t))
            .reduce((i, o) => i + o, '')
          return new Ot(`0.${n.slice(0, t)}`)
        }
      }
    }),
      (ue = v)
  })
function Ho() {
  return !1
}
var zo,
  Yo,
  mn,
  pn = oe(() => {
    'use strict'
    u()
    c()
    m()
    p()
    d()
    l()
    ;(zo = {}), (Yo = { existsSync: Ho, promises: zo }), (mn = Yo)
  })
var vn = Ce((Lu, Pn) => {
  'use strict'
  u()
  c()
  m()
  p()
  d()
  l()
  Pn.exports = (Er(), cr(wr)).format
})
var wr = {}
Ze(wr, {
  default: () => es,
  deprecate: () => Cn,
  format: () => Rn,
  inspect: () => An,
  promisify: () => Tn,
})
function Tn(e) {
  return (...t) =>
    new Promise((r, n) => {
      e(...t, (i, o) => {
        i ? n(i) : r(o)
      })
    })
}
function Cn(e, t) {
  return (...r) => (console.warn(t), e(...r))
}
function An(e) {
  return JSON.stringify(e, (t, r) =>
    typeof r == 'function'
      ? r.toString()
      : typeof r == 'bigint'
        ? `${r}n`
        : r instanceof Error
          ? { ...r, message: r.message, stack: r.stack }
          : r
  )
}
var Rn,
  Zo,
  es,
  Er = oe(() => {
    'use strict'
    u()
    c()
    m()
    p()
    d()
    l()
    ;(Rn = vn()),
      (Zo = { promisify: Tn, deprecate: Cn, inspect: An, format: Rn }),
      (es = Zo)
  })
function os(...e) {
  return e.join('/')
}
function ss(...e) {
  return e.join('/')
}
var Mn,
  as,
  ls,
  rt,
  Ln = oe(() => {
    'use strict'
    u()
    c()
    m()
    p()
    d()
    l()
    ;(Mn = '/'),
      (as = { sep: Mn }),
      (ls = { resolve: os, posix: as, join: ss, sep: Mn }),
      (rt = ls)
  })
var _t,
  _n = oe(() => {
    'use strict'
    u()
    c()
    m()
    p()
    d()
    l()
    _t = class {
      constructor() {
        this.events = {}
      }
      on(t, r) {
        return (
          this.events[t] || (this.events[t] = []), this.events[t].push(r), this
        )
      }
      emit(t, ...r) {
        return this.events[t]
          ? (this.events[t].forEach((n) => {
              n(...r)
            }),
            !0)
          : !1
      }
    }
  })
var Fn = Ce((em, Dn) => {
  'use strict'
  u()
  c()
  m()
  p()
  d()
  l()
  Dn.exports = (e, t = 1, r) => {
    if (
      ((r = { indent: ' ', includeEmptyLines: !1, ...r }), typeof e != 'string')
    )
      throw new TypeError(
        `Expected \`input\` to be a \`string\`, got \`${typeof e}\``
      )
    if (typeof t != 'number')
      throw new TypeError(
        `Expected \`count\` to be a \`number\`, got \`${typeof t}\``
      )
    if (typeof r.indent != 'string')
      throw new TypeError(
        `Expected \`options.indent\` to be a \`string\`, got \`${typeof r.indent}\``
      )
    if (t === 0) return e
    let n = r.includeEmptyLines ? /^/gm : /^(?!\s*$)/gm
    return e.replace(n, r.indent.repeat(t))
  }
})
var Bn = Ce((fm, Un) => {
  'use strict'
  u()
  c()
  m()
  p()
  d()
  l()
  Un.exports = ({ onlyFirst: e = !1 } = {}) => {
    let t = [
      '[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)',
      '(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))',
    ].join('|')
    return new RegExp(t, e ? void 0 : 'g')
  }
})
var Vn = Ce((xm, $n) => {
  'use strict'
  u()
  c()
  m()
  p()
  d()
  l()
  var fs = Bn()
  $n.exports = (e) => (typeof e == 'string' ? e.replace(fs(), '') : e)
})
var Jn = Ce((Yf, bs) => {
  bs.exports = {
    name: '@prisma/engines-version',
    version: '5.16.0-24.34ace0eb2704183d2c05b60b52fba5c43c13f303',
    main: 'index.js',
    types: 'index.d.ts',
    license: 'Apache-2.0',
    author: 'Tim Suchanek <suchanek@prisma.io>',
    prisma: { enginesVersion: '34ace0eb2704183d2c05b60b52fba5c43c13f303' },
    repository: {
      type: 'git',
      url: 'https://github.com/prisma/engines-wrapper.git',
      directory: 'packages/engines-version',
    },
    devDependencies: { '@types/node': '18.19.34', typescript: '4.9.5' },
    files: ['index.js', 'index.d.ts'],
    scripts: { build: 'tsc -d' },
  }
})
var Gn = Ce(() => {
  'use strict'
  u()
  c()
  m()
  p()
  d()
  l()
})
var qr = Ce((GC, Ui) => {
  'use strict'
  u()
  c()
  m()
  p()
  d()
  l()
  Ui.exports = (function () {
    function e(t, r, n, i, o) {
      return t < r || n < r ? (t > n ? n + 1 : t + 1) : i === o ? r : r + 1
    }
    return function (t, r) {
      if (t === r) return 0
      if (t.length > r.length) {
        var n = t
        ;(t = r), (r = n)
      }
      for (
        var i = t.length, o = r.length;
        i > 0 && t.charCodeAt(i - 1) === r.charCodeAt(o - 1);

      )
        i--, o--
      for (var s = 0; s < i && t.charCodeAt(s) === r.charCodeAt(s); ) s++
      if (((i -= s), (o -= s), i === 0 || o < 3)) return o
      var a = 0,
        f,
        b,
        T,
        C,
        O,
        R,
        M,
        S,
        L,
        ne,
        z,
        Ie,
        k = []
      for (f = 0; f < i; f++) k.push(f + 1), k.push(t.charCodeAt(s + f))
      for (var Te = k.length - 1; a < o - 3; )
        for (
          L = r.charCodeAt(s + (b = a)),
            ne = r.charCodeAt(s + (T = a + 1)),
            z = r.charCodeAt(s + (C = a + 2)),
            Ie = r.charCodeAt(s + (O = a + 3)),
            R = a += 4,
            f = 0;
          f < Te;
          f += 2
        )
          (M = k[f]),
            (S = k[f + 1]),
            (b = e(M, b, T, L, S)),
            (T = e(b, T, C, ne, S)),
            (C = e(T, C, O, z, S)),
            (R = e(C, O, R, Ie, S)),
            (k[f] = R),
            (O = C),
            (C = T),
            (T = b),
            (b = M)
      for (; a < o; )
        for (L = r.charCodeAt(s + (b = a)), R = ++a, f = 0; f < Te; f += 2)
          (M = k[f]), (k[f] = R = e(M, b, R, L, k[f + 1])), (b = M)
      return R
    }
  })()
})
var nl = {}
Ze(nl, {
  Debug: () => Pr,
  Decimal: () => ue,
  Extensions: () => hr,
  MetricsClient: () => Be,
  NotFoundError: () => he,
  PrismaClientInitializationError: () => I,
  PrismaClientKnownRequestError: () => Q,
  PrismaClientRustPanicError: () => ye,
  PrismaClientUnknownRequestError: () => J,
  PrismaClientValidationError: () => G,
  Public: () => yr,
  Sql: () => X,
  defineDmmfProperty: () => Qn,
  empty: () => Kn,
  getPrismaClient: () => Oo,
  getRuntime: () => Pe,
  join: () => Wn,
  makeStrictEnum: () => ko,
  objectEnumValues: () => Nt,
  raw: () => Ir,
  sqltag: () => _r,
  warnEnvConflicts: () => void 0,
  warnOnce: () => st,
})
module.exports = cr(nl)
u()
c()
m()
p()
d()
l()
var hr = {}
Ze(hr, { defineExtension: () => ln, getExtensionContext: () => un })
u()
c()
m()
p()
d()
l()
u()
c()
m()
p()
d()
l()
function ln(e) {
  return typeof e == 'function' ? e : (t) => t.$extends(e)
}
u()
c()
m()
p()
d()
l()
function un(e) {
  return e
}
var yr = {}
Ze(yr, { validator: () => cn })
u()
c()
m()
p()
d()
l()
u()
c()
m()
p()
d()
l()
function cn(...e) {
  return (t) => t
}
u()
c()
m()
p()
d()
l()
u()
c()
m()
p()
d()
l()
u()
c()
m()
p()
d()
l()
var br,
  dn,
  fn,
  gn,
  hn = !0
typeof g < 'u' &&
  (({
    FORCE_COLOR: br,
    NODE_DISABLE_COLORS: dn,
    NO_COLOR: fn,
    TERM: gn,
  } = g.env || {}),
  (hn = g.stdout && g.stdout.isTTY))
var Xo = {
  enabled:
    !dn && fn == null && gn !== 'dumb' && ((br != null && br !== '0') || hn),
}
function F(e, t) {
  let r = new RegExp(`\\x1b\\[${t}m`, 'g'),
    n = `\x1B[${e}m`,
    i = `\x1B[${t}m`
  return function (o) {
    return !Xo.enabled || o == null
      ? o
      : n + (~('' + o).indexOf(i) ? o.replace(r, i + n) : o) + i
  }
}
var lu = F(0, 0),
  kt = F(1, 22),
  Mt = F(2, 22),
  uu = F(3, 23),
  yn = F(4, 24),
  cu = F(7, 27),
  mu = F(8, 28),
  pu = F(9, 29),
  du = F(30, 39),
  Ne = F(31, 39),
  bn = F(32, 39),
  Lt = F(33, 39),
  wn = F(34, 39),
  fu = F(35, 39),
  En = F(36, 39),
  gu = F(37, 39),
  xn = F(90, 39),
  hu = F(90, 39),
  yu = F(40, 49),
  bu = F(41, 49),
  wu = F(42, 49),
  Eu = F(43, 49),
  xu = F(44, 49),
  Pu = F(45, 49),
  vu = F(46, 49),
  Tu = F(47, 49)
u()
c()
m()
p()
d()
l()
var ts = 100,
  Sn = ['green', 'yellow', 'blue', 'magenta', 'cyan', 'red'],
  It = [],
  On = Date.now(),
  rs = 0,
  xr = typeof g < 'u' ? g.env : {}
globalThis.DEBUG ??= xr.DEBUG ?? ''
globalThis.DEBUG_COLORS ??= xr.DEBUG_COLORS ? xr.DEBUG_COLORS === 'true' : !0
var tt = {
  enable(e) {
    typeof e == 'string' && (globalThis.DEBUG = e)
  },
  disable() {
    let e = globalThis.DEBUG
    return (globalThis.DEBUG = ''), e
  },
  enabled(e) {
    let t = globalThis.DEBUG.split(',').map((i) =>
        i.replace(/[.+?^${}()|[\]\\]/g, '\\$&')
      ),
      r = t.some((i) =>
        i === '' || i[0] === '-'
          ? !1
          : e.match(RegExp(i.split('*').join('.*') + '$'))
      ),
      n = t.some((i) =>
        i === '' || i[0] !== '-'
          ? !1
          : e.match(RegExp(i.slice(1).split('*').join('.*') + '$'))
      )
    return r && !n
  },
  log: (...e) => {
    let [t, r, ...n] = e,
      i
    typeof require == 'function' &&
    typeof g < 'u' &&
    typeof g.stderr < 'u' &&
    typeof g.stderr.write == 'function'
      ? (i = (...o) => {
          try {
            let s = (Er(), cr(wr))
            g.stderr.write(
              s.format(...o) +
                `
`
            )
          } catch {
            i = console.warn ?? console.log
          }
        })
      : (i = console.warn ?? console.log),
      i(`${t} ${r}`, ...n)
  },
  formatters: {},
}
function ns(e) {
  let t = {
      color: Sn[rs++ % Sn.length],
      enabled: tt.enabled(e),
      namespace: e,
      log: tt.log,
      extend: () => {},
    },
    r = (...n) => {
      let { enabled: i, namespace: o, color: s, log: a } = t
      if (
        (n.length !== 0 && It.push([o, ...n]),
        It.length > ts && It.shift(),
        tt.enabled(o) || i)
      ) {
        let f = n.map((T) => (typeof T == 'string' ? T : is(T))),
          b = `+${Date.now() - On}ms`
        ;(On = Date.now()), a(o, ...f, b)
      }
    }
  return new Proxy(r, { get: (n, i) => t[i], set: (n, i, o) => (t[i] = o) })
}
var Pr = new Proxy(ns, { get: (e, t) => tt[t], set: (e, t, r) => (tt[t] = r) })
function is(e, t = 2) {
  let r = new Set()
  return JSON.stringify(
    e,
    (n, i) => {
      if (typeof i == 'object' && i !== null) {
        if (r.has(i)) return '[Circular *]'
        r.add(i)
      } else if (typeof i == 'bigint') return i.toString()
      return i
    },
    t
  )
}
function kn() {
  It.length = 0
}
var ee = Pr
u()
c()
m()
p()
d()
l()
u()
c()
m()
p()
d()
l()
var vr = [
  'darwin',
  'darwin-arm64',
  'debian-openssl-1.0.x',
  'debian-openssl-1.1.x',
  'debian-openssl-3.0.x',
  'rhel-openssl-1.0.x',
  'rhel-openssl-1.1.x',
  'rhel-openssl-3.0.x',
  'linux-arm64-openssl-1.1.x',
  'linux-arm64-openssl-1.0.x',
  'linux-arm64-openssl-3.0.x',
  'linux-arm-openssl-1.1.x',
  'linux-arm-openssl-1.0.x',
  'linux-arm-openssl-3.0.x',
  'linux-musl',
  'linux-musl-openssl-3.0.x',
  'linux-musl-arm64-openssl-1.1.x',
  'linux-musl-arm64-openssl-3.0.x',
  'linux-nixos',
  'linux-static-x64',
  'linux-static-arm64',
  'windows',
  'freebsd11',
  'freebsd12',
  'freebsd13',
  'freebsd14',
  'freebsd15',
  'openbsd',
  'netbsd',
  'arm',
]
u()
c()
m()
p()
d()
l()
var In = 'library'
function nt(e) {
  let t = us()
  return (
    t ||
    (e?.config.engineType === 'library'
      ? 'library'
      : e?.config.engineType === 'binary'
        ? 'binary'
        : In)
  )
}
function us() {
  let e = g.env.PRISMA_CLIENT_ENGINE_TYPE
  return e === 'library' ? 'library' : e === 'binary' ? 'binary' : void 0
}
u()
c()
m()
p()
d()
l()
u()
c()
m()
p()
d()
l()
var Oe
;((t) => {
  let e
  ;((k) => (
    (k.findUnique = 'findUnique'),
    (k.findUniqueOrThrow = 'findUniqueOrThrow'),
    (k.findFirst = 'findFirst'),
    (k.findFirstOrThrow = 'findFirstOrThrow'),
    (k.findMany = 'findMany'),
    (k.create = 'create'),
    (k.createMany = 'createMany'),
    (k.createManyAndReturn = 'createManyAndReturn'),
    (k.update = 'update'),
    (k.updateMany = 'updateMany'),
    (k.upsert = 'upsert'),
    (k.delete = 'delete'),
    (k.deleteMany = 'deleteMany'),
    (k.groupBy = 'groupBy'),
    (k.count = 'count'),
    (k.aggregate = 'aggregate'),
    (k.findRaw = 'findRaw'),
    (k.aggregateRaw = 'aggregateRaw')
  ))((e = t.ModelAction ||= {}))
})((Oe ||= {}))
var ot = {}
Ze(ot, {
  error: () => ps,
  info: () => ms,
  log: () => cs,
  query: () => ds,
  should: () => Nn,
  tags: () => it,
  warn: () => Tr,
})
u()
c()
m()
p()
d()
l()
var it = {
    error: Ne('prisma:error'),
    warn: Lt('prisma:warn'),
    info: En('prisma:info'),
    query: wn('prisma:query'),
  },
  Nn = { warn: () => !g.env.PRISMA_DISABLE_WARNINGS }
function cs(...e) {
  console.log(...e)
}
function Tr(e, ...t) {
  Nn.warn() && console.warn(`${it.warn} ${e}`, ...t)
}
function ms(e, ...t) {
  console.info(`${it.info} ${e}`, ...t)
}
function ps(e, ...t) {
  console.error(`${it.error} ${e}`, ...t)
}
function ds(e, ...t) {
  console.log(`${it.query} ${e}`, ...t)
}
u()
c()
m()
p()
d()
l()
function Dt(e, t) {
  if (!e)
    throw new Error(
      `${t}. This should never happen. If you see this error, please, open an issue at https://pris.ly/prisma-prisma-bug-report`
    )
}
u()
c()
m()
p()
d()
l()
function ke(e, t) {
  throw new Error(t)
}
u()
c()
m()
p()
d()
l()
function Cr(e, t) {
  return Object.prototype.hasOwnProperty.call(e, t)
}
u()
c()
m()
p()
d()
l()
var Ar = (e, t) => e.reduce((r, n) => ((r[t(n)] = n), r), {})
u()
c()
m()
p()
d()
l()
function Ue(e, t) {
  let r = {}
  for (let n of Object.keys(e)) r[n] = t(e[n], n)
  return r
}
u()
c()
m()
p()
d()
l()
function Rr(e, t) {
  if (e.length === 0) return
  let r = e[0]
  for (let n = 1; n < e.length; n++) t(r, e[n]) < 0 && (r = e[n])
  return r
}
u()
c()
m()
p()
d()
l()
function K(e, t) {
  Object.defineProperty(e, 'name', { value: t, configurable: !0 })
}
u()
c()
m()
p()
d()
l()
var qn = new Set(),
  st = (e, t, ...r) => {
    qn.has(e) || (qn.add(e), Tr(t, ...r))
  }
u()
c()
m()
p()
d()
l()
var Q = class extends Error {
  constructor(t, { code: r, clientVersion: n, meta: i, batchRequestIdx: o }) {
    super(t),
      (this.name = 'PrismaClientKnownRequestError'),
      (this.code = r),
      (this.clientVersion = n),
      (this.meta = i),
      Object.defineProperty(this, 'batchRequestIdx', {
        value: o,
        enumerable: !1,
        writable: !0,
      })
  }
  get [Symbol.toStringTag]() {
    return 'PrismaClientKnownRequestError'
  }
}
K(Q, 'PrismaClientKnownRequestError')
var he = class extends Q {
  constructor(t, r) {
    super(t, { code: 'P2025', clientVersion: r }), (this.name = 'NotFoundError')
  }
}
K(he, 'NotFoundError')
u()
c()
m()
p()
d()
l()
var I = class e extends Error {
  constructor(t, r, n) {
    super(t),
      (this.name = 'PrismaClientInitializationError'),
      (this.clientVersion = r),
      (this.errorCode = n),
      Error.captureStackTrace(e)
  }
  get [Symbol.toStringTag]() {
    return 'PrismaClientInitializationError'
  }
}
K(I, 'PrismaClientInitializationError')
u()
c()
m()
p()
d()
l()
var ye = class extends Error {
  constructor(t, r) {
    super(t),
      (this.name = 'PrismaClientRustPanicError'),
      (this.clientVersion = r)
  }
  get [Symbol.toStringTag]() {
    return 'PrismaClientRustPanicError'
  }
}
K(ye, 'PrismaClientRustPanicError')
u()
c()
m()
p()
d()
l()
var J = class extends Error {
  constructor(t, { clientVersion: r, batchRequestIdx: n }) {
    super(t),
      (this.name = 'PrismaClientUnknownRequestError'),
      (this.clientVersion = r),
      Object.defineProperty(this, 'batchRequestIdx', {
        value: n,
        writable: !0,
        enumerable: !1,
      })
  }
  get [Symbol.toStringTag]() {
    return 'PrismaClientUnknownRequestError'
  }
}
K(J, 'PrismaClientUnknownRequestError')
u()
c()
m()
p()
d()
l()
var G = class extends Error {
  constructor(r, { clientVersion: n }) {
    super(r)
    this.name = 'PrismaClientValidationError'
    this.clientVersion = n
  }
  get [Symbol.toStringTag]() {
    return 'PrismaClientValidationError'
  }
}
K(G, 'PrismaClientValidationError')
u()
c()
m()
p()
d()
l()
var Be = class {
  constructor(t) {
    this._engine = t
  }
  prometheus(t) {
    return this._engine.metrics({ format: 'prometheus', ...t })
  }
  json(t) {
    return this._engine.metrics({ format: 'json', ...t })
  }
}
u()
c()
m()
p()
d()
l()
u()
c()
m()
p()
d()
l()
function at(e) {
  let t
  return {
    get() {
      return t || (t = { value: e() }), t.value
    },
  }
}
function Qn(e, t) {
  let r = at(() => gs(t))
  Object.defineProperty(e, 'dmmf', { get: () => r.get() })
}
function gs(e) {
  throw new Error('Prisma.dmmf is not available when running in edge runtimes.')
}
function Sr(e) {
  return Object.entries(e).map(([t, r]) => ({ name: t, ...r }))
}
u()
c()
m()
p()
d()
l()
var Ft = Symbol(),
  Or = new WeakMap(),
  be = class {
    constructor(t) {
      t === Ft
        ? Or.set(this, `Prisma.${this._getName()}`)
        : Or.set(
            this,
            `new Prisma.${this._getNamespace()}.${this._getName()}()`
          )
    }
    _getName() {
      return this.constructor.name
    }
    toString() {
      return Or.get(this)
    }
  },
  lt = class extends be {
    _getNamespace() {
      return 'NullTypes'
    }
  },
  ut = class extends lt {}
kr(ut, 'DbNull')
var ct = class extends lt {}
kr(ct, 'JsonNull')
var mt = class extends lt {}
kr(mt, 'AnyNull')
var Nt = {
  classes: { DbNull: ut, JsonNull: ct, AnyNull: mt },
  instances: { DbNull: new ut(Ft), JsonNull: new ct(Ft), AnyNull: new mt(Ft) },
}
function kr(e, t) {
  Object.defineProperty(e, 'name', { value: t, configurable: !0 })
}
u()
c()
m()
p()
d()
l()
u()
c()
m()
p()
d()
l()
u()
c()
m()
p()
d()
l()
u()
c()
m()
p()
d()
l()
function pt(e) {
  return {
    ok: !1,
    error: e,
    map() {
      return pt(e)
    },
    flatMap() {
      return pt(e)
    },
  }
}
var Mr = class {
    constructor() {
      this.registeredErrors = []
    }
    consumeError(t) {
      return this.registeredErrors[t]
    }
    registerNewError(t) {
      let r = 0
      for (; this.registeredErrors[r] !== void 0; ) r++
      return (this.registeredErrors[r] = { error: t }), r
    }
  },
  Lr = (e) => {
    let t = new Mr(),
      r = Me(t, e.startTransaction.bind(e)),
      n = {
        adapterName: e.adapterName,
        errorRegistry: t,
        queryRaw: Me(t, e.queryRaw.bind(e)),
        executeRaw: Me(t, e.executeRaw.bind(e)),
        provider: e.provider,
        startTransaction: async (...i) => (await r(...i)).map((s) => hs(t, s)),
      }
    return (
      e.getConnectionInfo &&
        (n.getConnectionInfo = ys(t, e.getConnectionInfo.bind(e))),
      n
    )
  },
  hs = (e, t) => ({
    adapterName: t.adapterName,
    provider: t.provider,
    options: t.options,
    queryRaw: Me(e, t.queryRaw.bind(t)),
    executeRaw: Me(e, t.executeRaw.bind(t)),
    commit: Me(e, t.commit.bind(t)),
    rollback: Me(e, t.rollback.bind(t)),
  })
function Me(e, t) {
  return async (...r) => {
    try {
      return await t(...r)
    } catch (n) {
      let i = e.registerNewError(n)
      return pt({ kind: 'GenericJs', id: i })
    }
  }
}
function ys(e, t) {
  return (...r) => {
    try {
      return t(...r)
    } catch (n) {
      let i = e.registerNewError(n)
      return pt({ kind: 'GenericJs', id: i })
    }
  }
}
var So = _e(Jn())
var MO = _e(Gn())
_n()
pn()
Ln()
u()
c()
m()
p()
d()
l()
var X = class e {
  constructor(t, r) {
    if (t.length - 1 !== r.length)
      throw t.length === 0
        ? new TypeError('Expected at least 1 string')
        : new TypeError(
            `Expected ${t.length} strings to have ${t.length - 1} values`
          )
    let n = r.reduce((s, a) => s + (a instanceof e ? a.values.length : 1), 0)
    ;(this.values = new Array(n)),
      (this.strings = new Array(n + 1)),
      (this.strings[0] = t[0])
    let i = 0,
      o = 0
    for (; i < r.length; ) {
      let s = r[i++],
        a = t[i]
      if (s instanceof e) {
        this.strings[o] += s.strings[0]
        let f = 0
        for (; f < s.values.length; )
          (this.values[o++] = s.values[f++]), (this.strings[o] = s.strings[f])
        this.strings[o] += a
      } else (this.values[o++] = s), (this.strings[o] = a)
    }
  }
  get sql() {
    let t = this.strings.length,
      r = 1,
      n = this.strings[0]
    for (; r < t; ) n += `?${this.strings[r++]}`
    return n
  }
  get statement() {
    let t = this.strings.length,
      r = 1,
      n = this.strings[0]
    for (; r < t; ) n += `:${r}${this.strings[r++]}`
    return n
  }
  get text() {
    let t = this.strings.length,
      r = 1,
      n = this.strings[0]
    for (; r < t; ) n += `$${r}${this.strings[r++]}`
    return n
  }
  inspect() {
    return {
      sql: this.sql,
      statement: this.statement,
      text: this.text,
      values: this.values,
    }
  }
}
function Wn(e, t = ',', r = '', n = '') {
  if (e.length === 0)
    throw new TypeError(
      'Expected `join([])` to be called with an array of multiple elements, but got an empty array'
    )
  return new X([r, ...Array(e.length - 1).fill(t), n], e)
}
function Ir(e) {
  return new X([e], [])
}
var Kn = Ir('')
function _r(e, ...t) {
  return new X(e, t)
}
u()
c()
m()
p()
d()
l()
u()
c()
m()
p()
d()
l()
function dt(e) {
  return {
    getKeys() {
      return Object.keys(e)
    },
    getPropertyValue(t) {
      return e[t]
    },
  }
}
u()
c()
m()
p()
d()
l()
function H(e, t) {
  return {
    getKeys() {
      return [e]
    },
    getPropertyValue() {
      return t()
    },
  }
}
u()
c()
m()
p()
d()
l()
u()
c()
m()
p()
d()
l()
var ce = class {
  constructor() {
    this._map = new Map()
  }
  get(t) {
    return this._map.get(t)?.value
  }
  set(t, r) {
    this._map.set(t, { value: r })
  }
  getOrCreate(t, r) {
    let n = this._map.get(t)
    if (n) return n.value
    let i = r()
    return this.set(t, i), i
  }
}
function Le(e) {
  let t = new ce()
  return {
    getKeys() {
      return e.getKeys()
    },
    getPropertyValue(r) {
      return t.getOrCreate(r, () => e.getPropertyValue(r))
    },
    getPropertyDescriptor(r) {
      return e.getPropertyDescriptor?.(r)
    },
  }
}
u()
c()
m()
p()
d()
l()
u()
c()
m()
p()
d()
l()
var Ut = { enumerable: !0, configurable: !0, writable: !0 }
function Bt(e) {
  let t = new Set(e)
  return {
    getOwnPropertyDescriptor: () => Ut,
    has: (r, n) => t.has(n),
    set: (r, n, i) => t.add(n) && Reflect.set(r, n, i),
    ownKeys: () => [...t],
  }
}
var Hn = Symbol.for('nodejs.util.inspect.custom')
function me(e, t) {
  let r = ws(t),
    n = new Set(),
    i = new Proxy(e, {
      get(o, s) {
        if (n.has(s)) return o[s]
        let a = r.get(s)
        return a ? a.getPropertyValue(s) : o[s]
      },
      has(o, s) {
        if (n.has(s)) return !0
        let a = r.get(s)
        return a ? a.has?.(s) ?? !0 : Reflect.has(o, s)
      },
      ownKeys(o) {
        let s = zn(Reflect.ownKeys(o), r),
          a = zn(Array.from(r.keys()), r)
        return [...new Set([...s, ...a, ...n])]
      },
      set(o, s, a) {
        return r.get(s)?.getPropertyDescriptor?.(s)?.writable === !1
          ? !1
          : (n.add(s), Reflect.set(o, s, a))
      },
      getOwnPropertyDescriptor(o, s) {
        let a = Reflect.getOwnPropertyDescriptor(o, s)
        if (a && !a.configurable) return a
        let f = r.get(s)
        return f
          ? f.getPropertyDescriptor
            ? { ...Ut, ...f?.getPropertyDescriptor(s) }
            : Ut
          : a
      },
      defineProperty(o, s, a) {
        return n.add(s), Reflect.defineProperty(o, s, a)
      },
    })
  return (
    (i[Hn] = function () {
      let o = { ...this }
      return delete o[Hn], o
    }),
    i
  )
}
function ws(e) {
  let t = new Map()
  for (let r of e) {
    let n = r.getKeys()
    for (let i of n) t.set(i, r)
  }
  return t
}
function zn(e, t) {
  return e.filter((r) => t.get(r)?.has?.(r) ?? !0)
}
u()
c()
m()
p()
d()
l()
function $e(e) {
  return {
    getKeys() {
      return e
    },
    has() {
      return !1
    },
    getPropertyValue() {},
  }
}
u()
c()
m()
p()
d()
l()
function $t(e, t) {
  return {
    batch: e,
    transaction:
      t?.kind === 'batch'
        ? { isolationLevel: t.options.isolationLevel }
        : void 0,
  }
}
u()
c()
m()
p()
d()
l()
u()
c()
m()
p()
d()
l()
var Ve = class {
  constructor(t = 0, r) {
    this.context = r
    this.lines = []
    this.currentLine = ''
    this.currentIndent = 0
    this.currentIndent = t
  }
  write(t) {
    return typeof t == 'string' ? (this.currentLine += t) : t.write(this), this
  }
  writeJoined(t, r, n = (i, o) => o.write(i)) {
    let i = r.length - 1
    for (let o = 0; o < r.length; o++) n(r[o], this), o !== i && this.write(t)
    return this
  }
  writeLine(t) {
    return this.write(t).newLine()
  }
  newLine() {
    this.lines.push(this.indentedCurrentLine()),
      (this.currentLine = ''),
      (this.marginSymbol = void 0)
    let t = this.afterNextNewLineCallback
    return (this.afterNextNewLineCallback = void 0), t?.(), this
  }
  withIndent(t) {
    return this.indent(), t(this), this.unindent(), this
  }
  afterNextNewline(t) {
    return (this.afterNextNewLineCallback = t), this
  }
  indent() {
    return this.currentIndent++, this
  }
  unindent() {
    return this.currentIndent > 0 && this.currentIndent--, this
  }
  addMarginSymbol(t) {
    return (this.marginSymbol = t), this
  }
  toString() {
    return this.lines.concat(this.indentedCurrentLine()).join(`
`)
  }
  getCurrentLineLength() {
    return this.currentLine.length
  }
  indentedCurrentLine() {
    let t = this.currentLine.padStart(
      this.currentLine.length + 2 * this.currentIndent
    )
    return this.marginSymbol ? this.marginSymbol + t.slice(1) : t
  }
}
u()
c()
m()
p()
d()
l()
u()
c()
m()
p()
d()
l()
function Yn(e) {
  return e.substring(0, 1).toLowerCase() + e.substring(1)
}
u()
c()
m()
p()
d()
l()
function qe(e) {
  return (
    e instanceof Date || Object.prototype.toString.call(e) === '[object Date]'
  )
}
function Vt(e) {
  return e.toString() !== 'Invalid Date'
}
u()
c()
m()
p()
d()
l()
l()
function je(e) {
  return v.isDecimal(e)
    ? !0
    : e !== null &&
        typeof e == 'object' &&
        typeof e.s == 'number' &&
        typeof e.e == 'number' &&
        typeof e.toFixed == 'function' &&
        Array.isArray(e.d)
}
u()
c()
m()
p()
d()
l()
var ft = class {
  constructor(t, r, n, i, o) {
    ;(this.modelName = t),
      (this.name = r),
      (this.typeName = n),
      (this.isList = i),
      (this.isEnum = o)
  }
  _toGraphQLInputType() {
    let t = this.isList ? 'List' : '',
      r = this.isEnum ? 'Enum' : ''
    return `${t}${r}${this.typeName}FieldRefInput<${this.modelName}>`
  }
}
function Qe(e) {
  return e instanceof ft
}
u()
c()
m()
p()
d()
l()
u()
c()
m()
p()
d()
l()
var qt = class {
  constructor(t) {
    this.value = t
  }
  write(t) {
    t.write(this.value)
  }
  markAsError() {
    this.value.markAsError()
  }
}
u()
c()
m()
p()
d()
l()
var jt = (e) => e,
  Qt = { bold: jt, red: jt, green: jt, dim: jt, enabled: !1 },
  Xn = { bold: kt, red: Ne, green: bn, dim: Mt, enabled: !0 },
  Je = {
    write(e) {
      e.writeLine(',')
    },
  }
u()
c()
m()
p()
d()
l()
var pe = class {
  constructor(t) {
    this.contents = t
    this.isUnderlined = !1
    this.color = (t) => t
  }
  underline() {
    return (this.isUnderlined = !0), this
  }
  setColor(t) {
    return (this.color = t), this
  }
  write(t) {
    let r = t.getCurrentLineLength()
    t.write(this.color(this.contents)),
      this.isUnderlined &&
        t.afterNextNewline(() => {
          t.write(' '.repeat(r)).writeLine(
            this.color('~'.repeat(this.contents.length))
          )
        })
  }
}
u()
c()
m()
p()
d()
l()
var Ee = class {
  constructor() {
    this.hasError = !1
  }
  markAsError() {
    return (this.hasError = !0), this
  }
}
var Ge = class extends Ee {
  constructor() {
    super(...arguments)
    this.items = []
  }
  addItem(r) {
    return this.items.push(new qt(r)), this
  }
  getField(r) {
    return this.items[r]
  }
  getPrintWidth() {
    return this.items.length === 0
      ? 2
      : Math.max(...this.items.map((n) => n.value.getPrintWidth())) + 2
  }
  write(r) {
    if (this.items.length === 0) {
      this.writeEmpty(r)
      return
    }
    this.writeWithItems(r)
  }
  writeEmpty(r) {
    let n = new pe('[]')
    this.hasError && n.setColor(r.context.colors.red).underline(), r.write(n)
  }
  writeWithItems(r) {
    let { colors: n } = r.context
    r
      .writeLine('[')
      .withIndent(() => r.writeJoined(Je, this.items).newLine())
      .write(']'),
      this.hasError &&
        r.afterNextNewline(() => {
          r.writeLine(n.red('~'.repeat(this.getPrintWidth())))
        })
  }
  asObject() {}
}
u()
c()
m()
p()
d()
l()
var Zn = ': ',
  Jt = class {
    constructor(t, r) {
      this.name = t
      this.value = r
      this.hasError = !1
    }
    markAsError() {
      this.hasError = !0
    }
    getPrintWidth() {
      return this.name.length + this.value.getPrintWidth() + Zn.length
    }
    write(t) {
      let r = new pe(this.name)
      this.hasError && r.underline().setColor(t.context.colors.red),
        t.write(r).write(Zn).write(this.value)
    }
  }
u()
c()
m()
p()
d()
l()
var We = class e extends Ee {
  constructor() {
    super(...arguments)
    this.fields = {}
    this.suggestions = []
  }
  addField(r) {
    this.fields[r.name] = r
  }
  addSuggestion(r) {
    this.suggestions.push(r)
  }
  getField(r) {
    return this.fields[r]
  }
  getDeepField(r) {
    let [n, ...i] = r,
      o = this.getField(n)
    if (!o) return
    let s = o
    for (let a of i) {
      let f
      if (
        (s.value instanceof e
          ? (f = s.value.getField(a))
          : s.value instanceof Ge && (f = s.value.getField(Number(a))),
        !f)
      )
        return
      s = f
    }
    return s
  }
  getDeepFieldValue(r) {
    return r.length === 0 ? this : this.getDeepField(r)?.value
  }
  hasField(r) {
    return !!this.getField(r)
  }
  removeAllFields() {
    this.fields = {}
  }
  removeField(r) {
    delete this.fields[r]
  }
  getFields() {
    return this.fields
  }
  isEmpty() {
    return Object.keys(this.fields).length === 0
  }
  getFieldValue(r) {
    return this.getField(r)?.value
  }
  getDeepSubSelectionValue(r) {
    let n = this
    for (let i of r) {
      if (!(n instanceof e)) return
      let o = n.getSubSelectionValue(i)
      if (!o) return
      n = o
    }
    return n
  }
  getDeepSelectionParent(r) {
    let n = this.getSelectionParent()
    if (!n) return
    let i = n
    for (let o of r) {
      let s = i.value.getFieldValue(o)
      if (!s || !(s instanceof e)) return
      let a = s.getSelectionParent()
      if (!a) return
      i = a
    }
    return i
  }
  getSelectionParent() {
    let r = this.getField('select')?.value.asObject()
    if (r) return { kind: 'select', value: r }
    let n = this.getField('include')?.value.asObject()
    if (n) return { kind: 'include', value: n }
  }
  getSubSelectionValue(r) {
    return this.getSelectionParent()?.value.fields[r].value
  }
  getPrintWidth() {
    let r = Object.values(this.fields)
    return r.length == 0 ? 2 : Math.max(...r.map((i) => i.getPrintWidth())) + 2
  }
  write(r) {
    let n = Object.values(this.fields)
    if (n.length === 0 && this.suggestions.length === 0) {
      this.writeEmpty(r)
      return
    }
    this.writeWithContents(r, n)
  }
  asObject() {
    return this
  }
  writeEmpty(r) {
    let n = new pe('{}')
    this.hasError && n.setColor(r.context.colors.red).underline(), r.write(n)
  }
  writeWithContents(r, n) {
    r.writeLine('{').withIndent(() => {
      r.writeJoined(Je, [...n, ...this.suggestions]).newLine()
    }),
      r.write('}'),
      this.hasError &&
        r.afterNextNewline(() => {
          r.writeLine(r.context.colors.red('~'.repeat(this.getPrintWidth())))
        })
  }
}
u()
c()
m()
p()
d()
l()
var W = class extends Ee {
  constructor(r) {
    super()
    this.text = r
  }
  getPrintWidth() {
    return this.text.length
  }
  write(r) {
    let n = new pe(this.text)
    this.hasError && n.underline().setColor(r.context.colors.red), r.write(n)
  }
  asObject() {}
}
var Dr = class {
  constructor(t) {
    this.errorMessages = []
    this.arguments = t
  }
  write(t) {
    t.write(this.arguments)
  }
  addErrorMessage(t) {
    this.errorMessages.push(t)
  }
  renderAllMessages(t) {
    return this.errorMessages.map((r) => r(t)).join(`
`)
  }
}
function Ke(e) {
  return new Dr(ei(e))
}
function ei(e) {
  let t = new We()
  for (let [r, n] of Object.entries(e)) {
    let i = new Jt(r, ti(n))
    t.addField(i)
  }
  return t
}
function ti(e) {
  if (typeof e == 'string') return new W(JSON.stringify(e))
  if (typeof e == 'number' || typeof e == 'boolean') return new W(String(e))
  if (typeof e == 'bigint') return new W(`${e}n`)
  if (e === null) return new W('null')
  if (e === void 0) return new W('undefined')
  if (je(e)) return new W(`new Prisma.Decimal("${e.toFixed()}")`)
  if (e instanceof Uint8Array)
    return y.isBuffer(e)
      ? new W(`Buffer.alloc(${e.byteLength})`)
      : new W(`new Uint8Array(${e.byteLength})`)
  if (e instanceof Date) {
    let t = Vt(e) ? e.toISOString() : 'Invalid Date'
    return new W(`new Date("${t}")`)
  }
  return e instanceof be
    ? new W(`Prisma.${e._getName()}`)
    : Qe(e)
      ? new W(`prisma.${Yn(e.modelName)}.$fields.${e.name}`)
      : Array.isArray(e)
        ? xs(e)
        : typeof e == 'object'
          ? ei(e)
          : new W(Object.prototype.toString.call(e))
}
function xs(e) {
  let t = new Ge()
  for (let r of e) t.addItem(ti(r))
  return t
}
function Gt(e, t) {
  let r = t === 'pretty' ? Xn : Qt,
    n = e.renderAllMessages(r),
    i = new Ve(0, { colors: r }).write(e).toString()
  return { message: n, args: i }
}
function ri(e) {
  if (e === void 0) return ''
  let t = Ke(e)
  return new Ve(0, { colors: Qt }).write(t).toString()
}
u()
c()
m()
p()
d()
l()
var Ps = 'P2037'
function Wt({ error: e, user_facing_error: t }, r, n) {
  return t.error_code
    ? new Q(vs(t, n), {
        code: t.error_code,
        clientVersion: r,
        meta: t.meta,
        batchRequestIdx: t.batch_request_idx,
      })
    : new J(e, { clientVersion: r, batchRequestIdx: t.batch_request_idx })
}
function vs(e, t) {
  let r = e.message
  return (
    (t === 'postgresql' || t === 'postgres' || t === 'mysql') &&
      e.error_code === Ps &&
      (r += `
Prisma Accelerate has built-in connection pooling to prevent such errors: https://pris.ly/client/error-accelerate`),
    r
  )
}
u()
c()
m()
p()
d()
l()
u()
c()
m()
p()
d()
l()
u()
c()
m()
p()
d()
l()
u()
c()
m()
p()
d()
l()
u()
c()
m()
p()
d()
l()
var Fr = class {
  getLocation() {
    return null
  }
}
function xe(e) {
  return typeof $EnabledCallSite == 'function' && e !== 'minimal'
    ? new $EnabledCallSite()
    : new Fr()
}
u()
c()
m()
p()
d()
l()
u()
c()
m()
p()
d()
l()
u()
c()
m()
p()
d()
l()
var ni = { _avg: !0, _count: !0, _sum: !0, _min: !0, _max: !0 }
function He(e = {}) {
  let t = Cs(e)
  return Object.entries(t).reduce(
    (n, [i, o]) => (
      ni[i] !== void 0 ? (n.select[i] = { select: o }) : (n[i] = o), n
    ),
    { select: {} }
  )
}
function Cs(e = {}) {
  return typeof e._count == 'boolean' ? { ...e, _count: { _all: e._count } } : e
}
function Kt(e = {}) {
  return (t) => (typeof e._count == 'boolean' && (t._count = t._count._all), t)
}
function ii(e, t) {
  let r = Kt(e)
  return t({ action: 'aggregate', unpacker: r, argsMapper: He })(e)
}
u()
c()
m()
p()
d()
l()
function As(e = {}) {
  let { select: t, ...r } = e
  return typeof t == 'object'
    ? He({ ...r, _count: t })
    : He({ ...r, _count: { _all: !0 } })
}
function Rs(e = {}) {
  return typeof e.select == 'object'
    ? (t) => Kt(e)(t)._count
    : (t) => Kt(e)(t)._count._all
}
function oi(e, t) {
  return t({ action: 'count', unpacker: Rs(e), argsMapper: As })(e)
}
u()
c()
m()
p()
d()
l()
function Ss(e = {}) {
  let t = He(e)
  if (Array.isArray(t.by))
    for (let r of t.by) typeof r == 'string' && (t.select[r] = !0)
  else typeof t.by == 'string' && (t.select[t.by] = !0)
  return t
}
function Os(e = {}) {
  return (t) => (
    typeof e?._count == 'boolean' &&
      t.forEach((r) => {
        r._count = r._count._all
      }),
    t
  )
}
function si(e, t) {
  return t({ action: 'groupBy', unpacker: Os(e), argsMapper: Ss })(e)
}
function ai(e, t, r) {
  if (t === 'aggregate') return (n) => ii(n, r)
  if (t === 'count') return (n) => oi(n, r)
  if (t === 'groupBy') return (n) => si(n, r)
}
u()
c()
m()
p()
d()
l()
function li(e, t) {
  let r = t.fields.filter((i) => !i.relationName),
    n = Ar(r, (i) => i.name)
  return new Proxy(
    {},
    {
      get(i, o) {
        if (o in i || typeof o == 'symbol') return i[o]
        let s = n[o]
        if (s) return new ft(e, o, s.type, s.isList, s.kind === 'enum')
      },
      ...Bt(Object.keys(n)),
    }
  )
}
u()
c()
m()
p()
d()
l()
u()
c()
m()
p()
d()
l()
var ui = (e) => (Array.isArray(e) ? e : e.split('.')),
  Nr = (e, t) => ui(t).reduce((r, n) => r && r[n], e),
  ci = (e, t, r) =>
    ui(t).reduceRight(
      (n, i, o, s) => Object.assign({}, Nr(e, s.slice(0, o)), { [i]: n }),
      r
    )
function ks(e, t) {
  return e === void 0 || t === void 0 ? [] : [...t, 'select', e]
}
function Ms(e, t, r) {
  return t === void 0 ? e ?? {} : ci(t, r, e || !0)
}
function Ur(e, t, r, n, i, o) {
  let a = e._runtimeDataModel.models[t].fields.reduce(
    (f, b) => ({ ...f, [b.name]: b }),
    {}
  )
  return (f) => {
    let b = xe(e._errorFormat),
      T = ks(n, i),
      C = Ms(f, o, T),
      O = r({ dataPath: T, callsite: b })(C),
      R = Ls(e, t)
    return new Proxy(O, {
      get(M, S) {
        if (!R.includes(S)) return M[S]
        let ne = [a[S].type, r, S],
          z = [T, C]
        return Ur(e, ...ne, ...z)
      },
      ...Bt([...R, ...Object.getOwnPropertyNames(O)]),
    })
  }
}
function Ls(e, t) {
  return e._runtimeDataModel.models[t].fields
    .filter((r) => r.kind === 'object')
    .map((r) => r.name)
}
u()
c()
m()
p()
d()
l()
u()
c()
m()
p()
d()
l()
var Is = _e(Fn())
var _s = {
    red: Ne,
    gray: xn,
    dim: Mt,
    bold: kt,
    underline: yn,
    highlightSource: (e) => e.highlight(),
  },
  Ds = {
    red: (e) => e,
    gray: (e) => e,
    dim: (e) => e,
    bold: (e) => e,
    underline: (e) => e,
    highlightSource: (e) => e,
  }
function Fs({ message: e, originalMethod: t, isPanic: r, callArguments: n }) {
  return {
    functionName: `prisma.${t}()`,
    message: e,
    isPanic: r ?? !1,
    callArguments: n,
  }
}
function Ns(
  {
    functionName: e,
    location: t,
    message: r,
    isPanic: n,
    contextLines: i,
    callArguments: o,
  },
  s
) {
  let a = [''],
    f = t ? ' in' : ':'
  if (
    (n
      ? (a.push(
          s.red(
            `Oops, an unknown error occurred! This is ${s.bold('on us')}, you did nothing wrong.`
          )
        ),
        a.push(
          s.red(`It occurred in the ${s.bold(`\`${e}\``)} invocation${f}`)
        ))
      : a.push(s.red(`Invalid ${s.bold(`\`${e}\``)} invocation${f}`)),
    t && a.push(s.underline(Us(t))),
    i)
  ) {
    a.push('')
    let b = [i.toString()]
    o && (b.push(o), b.push(s.dim(')'))), a.push(b.join('')), o && a.push('')
  } else a.push(''), o && a.push(o), a.push('')
  return (
    a.push(r),
    a.join(`
`)
  )
}
function Us(e) {
  let t = [e.fileName]
  return (
    e.lineNumber && t.push(String(e.lineNumber)),
    e.columnNumber && t.push(String(e.columnNumber)),
    t.join(':')
  )
}
function ze(e) {
  let t = e.showColors ? _s : Ds,
    r
  return (
    typeof $getTemplateParameters < 'u'
      ? (r = $getTemplateParameters(e, t))
      : (r = Fs(e)),
    Ns(r, t)
  )
}
function mi(e, t, r, n) {
  return e === Oe.ModelAction.findFirstOrThrow ||
    e === Oe.ModelAction.findUniqueOrThrow
    ? Bs(t, r, n)
    : n
}
function Bs(e, t, r) {
  return async (n) => {
    if ('rejectOnNotFound' in n.args) {
      let o = ze({
        originalMethod: n.clientMethod,
        callsite: n.callsite,
        message: "'rejectOnNotFound' option is not supported",
      })
      throw new G(o, { clientVersion: t })
    }
    return await r(n).catch((o) => {
      throw o instanceof Q && o.code === 'P2025'
        ? new he(`No ${e} found`, t)
        : o
    })
  }
}
u()
c()
m()
p()
d()
l()
function de(e) {
  return e.replace(/^./, (t) => t.toLowerCase())
}
var $s = [
    'findUnique',
    'findUniqueOrThrow',
    'findFirst',
    'findFirstOrThrow',
    'create',
    'update',
    'upsert',
    'delete',
  ],
  Vs = ['aggregate', 'count', 'groupBy']
function Br(e, t) {
  let r = e._extensions.getAllModelExtensions(t) ?? {},
    n = [
      qs(e, t),
      Qs(e, t),
      dt(r),
      H('name', () => t),
      H('$name', () => t),
      H('$parent', () => e._appliedParent),
    ]
  return me({}, n)
}
function qs(e, t) {
  let r = de(t),
    n = Object.keys(Oe.ModelAction).concat('count')
  return {
    getKeys() {
      return n
    },
    getPropertyValue(i) {
      let o = i,
        s = (f) => e._request(f)
      s = mi(o, t, e._clientVersion, s)
      let a = (f) => (b) => {
        let T = xe(e._errorFormat)
        return e._createPrismaPromise((C) => {
          let O = {
            args: b,
            dataPath: [],
            action: o,
            model: t,
            clientMethod: `${r}.${i}`,
            jsModelName: r,
            transaction: C,
            callsite: T,
          }
          return s({ ...O, ...f })
        })
      }
      return $s.includes(o) ? Ur(e, t, a) : js(i) ? ai(e, i, a) : a({})
    },
  }
}
function js(e) {
  return Vs.includes(e)
}
function Qs(e, t) {
  return Le(
    H('fields', () => {
      let r = e._runtimeDataModel.models[t]
      return li(t, r)
    })
  )
}
u()
c()
m()
p()
d()
l()
function pi(e) {
  return e.replace(/^./, (t) => t.toUpperCase())
}
var $r = Symbol()
function gt(e) {
  let t = [Js(e), H($r, () => e), H('$parent', () => e._appliedParent)],
    r = e._extensions.getAllClientExtensions()
  return r && t.push(dt(r)), me(e, t)
}
function Js(e) {
  let t = Object.keys(e._runtimeDataModel.models),
    r = t.map(de),
    n = [...new Set(t.concat(r))]
  return Le({
    getKeys() {
      return n
    },
    getPropertyValue(i) {
      let o = pi(i)
      if (e._runtimeDataModel.models[o] !== void 0) return Br(e, o)
      if (e._runtimeDataModel.models[i] !== void 0) return Br(e, i)
    },
    getPropertyDescriptor(i) {
      if (!r.includes(i)) return { enumerable: !1 }
    },
  })
}
function di(e) {
  return e[$r] ? e[$r] : e
}
function fi(e) {
  if (typeof e == 'function') return e(this)
  if (e.client?.__AccelerateEngine) {
    let r = e.client.__AccelerateEngine
    this._originalClient._engine = new r(
      this._originalClient._accelerateEngineConfig
    )
  }
  let t = Object.create(this._originalClient, {
    _extensions: { value: this._extensions.append(e) },
    _appliedParent: { value: this, configurable: !0 },
    $use: { value: void 0 },
    $on: { value: void 0 },
  })
  return gt(t)
}
u()
c()
m()
p()
d()
l()
u()
c()
m()
p()
d()
l()
function gi({ result: e, modelName: t, select: r, omit: n, extensions: i }) {
  let o = i.getAllComputedFields(t)
  if (!o) return e
  let s = [],
    a = []
  for (let f of Object.values(o)) {
    if (n) {
      if (n[f.name]) continue
      let b = f.needs.filter((T) => n[T])
      b.length > 0 && a.push($e(b))
    } else if (r) {
      if (!r[f.name]) continue
      let b = f.needs.filter((T) => !r[T])
      b.length > 0 && a.push($e(b))
    }
    Gs(e, f.needs) && s.push(Ws(f, me(e, s)))
  }
  return s.length > 0 || a.length > 0 ? me(e, [...s, ...a]) : e
}
function Gs(e, t) {
  return t.every((r) => Cr(e, r))
}
function Ws(e, t) {
  return Le(H(e.name, () => e.compute(t)))
}
u()
c()
m()
p()
d()
l()
function Ht({
  visitor: e,
  result: t,
  args: r,
  runtimeDataModel: n,
  modelName: i,
}) {
  if (Array.isArray(t)) {
    for (let s = 0; s < t.length; s++)
      t[s] = Ht({
        result: t[s],
        args: r,
        modelName: i,
        runtimeDataModel: n,
        visitor: e,
      })
    return t
  }
  let o = e(t, i, r) ?? t
  return (
    r.include &&
      hi({
        includeOrSelect: r.include,
        result: o,
        parentModelName: i,
        runtimeDataModel: n,
        visitor: e,
      }),
    r.select &&
      hi({
        includeOrSelect: r.select,
        result: o,
        parentModelName: i,
        runtimeDataModel: n,
        visitor: e,
      }),
    o
  )
}
function hi({
  includeOrSelect: e,
  result: t,
  parentModelName: r,
  runtimeDataModel: n,
  visitor: i,
}) {
  for (let [o, s] of Object.entries(e)) {
    if (!s || t[o] == null) continue
    let f = n.models[r].fields.find((T) => T.name === o)
    if (!f || f.kind !== 'object' || !f.relationName) continue
    let b = typeof s == 'object' ? s : {}
    t[o] = Ht({
      visitor: i,
      result: t[o],
      args: b,
      modelName: f.type,
      runtimeDataModel: n,
    })
  }
}
function yi({
  result: e,
  modelName: t,
  args: r,
  extensions: n,
  runtimeDataModel: i,
  globalOmit: o,
}) {
  return n.isEmpty() || e == null || typeof e != 'object' || !i.models[t]
    ? e
    : Ht({
        result: e,
        args: r ?? {},
        modelName: t,
        runtimeDataModel: i,
        visitor: (a, f, b) => {
          let T = de(f)
          return gi({
            result: a,
            modelName: T,
            select: b.select,
            omit: b.select ? void 0 : { ...o?.[T], ...b.omit },
            extensions: n,
          })
        },
      })
}
u()
c()
m()
p()
d()
l()
u()
c()
m()
p()
d()
l()
l()
function bi(e) {
  if (e instanceof X) return Ks(e)
  if (Array.isArray(e)) {
    let r = [e[0]]
    for (let n = 1; n < e.length; n++) r[n] = ht(e[n])
    return r
  }
  let t = {}
  for (let r in e) t[r] = ht(e[r])
  return t
}
function Ks(e) {
  return new X(e.strings, e.values)
}
function ht(e) {
  if (typeof e != 'object' || e == null || e instanceof be || Qe(e)) return e
  if (je(e)) return new ue(e.toFixed())
  if (qe(e)) return new Date(+e)
  if (ArrayBuffer.isView(e)) return e.slice(0)
  if (Array.isArray(e)) {
    let t = e.length,
      r
    for (r = Array(t); t--; ) r[t] = ht(e[t])
    return r
  }
  if (typeof e == 'object') {
    let t = {}
    for (let r in e)
      r === '__proto__'
        ? Object.defineProperty(t, r, {
            value: ht(e[r]),
            configurable: !0,
            enumerable: !0,
            writable: !0,
          })
        : (t[r] = ht(e[r]))
    return t
  }
  ke(e, 'Unknown value')
}
function Ei(e, t, r, n = 0) {
  return e._createPrismaPromise((i) => {
    let o = t.customDataProxyFetch
    return (
      'transaction' in t &&
        i !== void 0 &&
        (t.transaction?.kind === 'batch' && t.transaction.lock.then(),
        (t.transaction = i)),
      n === r.length
        ? e._executeRequest(t)
        : r[n]({
            model: t.model,
            operation: t.model ? t.action : t.clientMethod,
            args: bi(t.args ?? {}),
            __internalParams: t,
            query: (s, a = t) => {
              let f = a.customDataProxyFetch
              return (
                (a.customDataProxyFetch = Ti(o, f)),
                (a.args = s),
                Ei(e, a, r, n + 1)
              )
            },
          })
    )
  })
}
function xi(e, t) {
  let { jsModelName: r, action: n, clientMethod: i } = t,
    o = r ? n : i
  if (e._extensions.isEmpty()) return e._executeRequest(t)
  let s = e._extensions.getAllQueryCallbacks(r ?? '$none', o)
  return Ei(e, t, s)
}
function Pi(e) {
  return (t) => {
    let r = { requests: t },
      n = t[0].extensions.getAllBatchQueryCallbacks()
    return n.length ? vi(r, n, 0, e) : e(r)
  }
}
function vi(e, t, r, n) {
  if (r === t.length) return n(e)
  let i = e.customDataProxyFetch,
    o = e.requests[0].transaction
  return t[r]({
    args: {
      queries: e.requests.map((s) => ({
        model: s.modelName,
        operation: s.action,
        args: s.args,
      })),
      transaction: o
        ? { isolationLevel: o.kind === 'batch' ? o.isolationLevel : void 0 }
        : void 0,
    },
    __internalParams: e,
    query(s, a = e) {
      let f = a.customDataProxyFetch
      return (a.customDataProxyFetch = Ti(i, f)), vi(a, t, r + 1, n)
    },
  })
}
var wi = (e) => e
function Ti(e = wi, t = wi) {
  return (r) => e(t(r))
}
u()
c()
m()
p()
d()
l()
u()
c()
m()
p()
d()
l()
function Ai(e, t, r) {
  let n = de(r)
  return !t.result || !(t.result.$allModels || t.result[n])
    ? e
    : Hs({
        ...e,
        ...Ci(t.name, e, t.result.$allModels),
        ...Ci(t.name, e, t.result[n]),
      })
}
function Hs(e) {
  let t = new ce(),
    r = (n, i) =>
      t.getOrCreate(n, () =>
        i.has(n)
          ? [n]
          : (i.add(n), e[n] ? e[n].needs.flatMap((o) => r(o, i)) : [n])
      )
  return Ue(e, (n) => ({ ...n, needs: r(n.name, new Set()) }))
}
function Ci(e, t, r) {
  return r
    ? Ue(r, ({ needs: n, compute: i }, o) => ({
        name: o,
        needs: n ? Object.keys(n).filter((s) => n[s]) : [],
        compute: zs(t, o, i),
      }))
    : {}
}
function zs(e, t, r) {
  let n = e?.[t]?.compute
  return n ? (i) => r({ ...i, [t]: n(i) }) : r
}
function Ri(e, t) {
  if (!t) return e
  let r = { ...e }
  for (let n of Object.values(t))
    if (e[n.name]) for (let i of n.needs) r[i] = !0
  return r
}
function Si(e, t) {
  if (!t) return e
  let r = { ...e }
  for (let n of Object.values(t))
    if (!e[n.name]) for (let i of n.needs) delete r[i]
  return r
}
var zt = class {
    constructor(t, r) {
      this.extension = t
      this.previous = r
      this.computedFieldsCache = new ce()
      this.modelExtensionsCache = new ce()
      this.queryCallbacksCache = new ce()
      this.clientExtensions = at(() =>
        this.extension.client
          ? {
              ...this.previous?.getAllClientExtensions(),
              ...this.extension.client,
            }
          : this.previous?.getAllClientExtensions()
      )
      this.batchCallbacks = at(() => {
        let t = this.previous?.getAllBatchQueryCallbacks() ?? [],
          r = this.extension.query?.$__internalBatch
        return r ? t.concat(r) : t
      })
    }
    getAllComputedFields(t) {
      return this.computedFieldsCache.getOrCreate(t, () =>
        Ai(this.previous?.getAllComputedFields(t), this.extension, t)
      )
    }
    getAllClientExtensions() {
      return this.clientExtensions.get()
    }
    getAllModelExtensions(t) {
      return this.modelExtensionsCache.getOrCreate(t, () => {
        let r = de(t)
        return !this.extension.model ||
          !(this.extension.model[r] || this.extension.model.$allModels)
          ? this.previous?.getAllModelExtensions(t)
          : {
              ...this.previous?.getAllModelExtensions(t),
              ...this.extension.model.$allModels,
              ...this.extension.model[r],
            }
      })
    }
    getAllQueryCallbacks(t, r) {
      return this.queryCallbacksCache.getOrCreate(`${t}:${r}`, () => {
        let n = this.previous?.getAllQueryCallbacks(t, r) ?? [],
          i = [],
          o = this.extension.query
        return !o || !(o[t] || o.$allModels || o[r] || o.$allOperations)
          ? n
          : (o[t] !== void 0 &&
              (o[t][r] !== void 0 && i.push(o[t][r]),
              o[t].$allOperations !== void 0 && i.push(o[t].$allOperations)),
            t !== '$none' &&
              o.$allModels !== void 0 &&
              (o.$allModels[r] !== void 0 && i.push(o.$allModels[r]),
              o.$allModels.$allOperations !== void 0 &&
                i.push(o.$allModels.$allOperations)),
            o[r] !== void 0 && i.push(o[r]),
            o.$allOperations !== void 0 && i.push(o.$allOperations),
            n.concat(i))
      })
    }
    getAllBatchQueryCallbacks() {
      return this.batchCallbacks.get()
    }
  },
  Yt = class e {
    constructor(t) {
      this.head = t
    }
    static empty() {
      return new e()
    }
    static single(t) {
      return new e(new zt(t))
    }
    isEmpty() {
      return this.head === void 0
    }
    append(t) {
      return new e(new zt(t, this.head))
    }
    getAllComputedFields(t) {
      return this.head?.getAllComputedFields(t)
    }
    getAllClientExtensions() {
      return this.head?.getAllClientExtensions()
    }
    getAllModelExtensions(t) {
      return this.head?.getAllModelExtensions(t)
    }
    getAllQueryCallbacks(t, r) {
      return this.head?.getAllQueryCallbacks(t, r) ?? []
    }
    getAllBatchQueryCallbacks() {
      return this.head?.getAllBatchQueryCallbacks() ?? []
    }
  }
u()
c()
m()
p()
d()
l()
var Oi = ee('prisma:client'),
  ki = { Vercel: 'vercel', 'Netlify CI': 'netlify' }
function Mi({ postinstall: e, ciName: t, clientVersion: r }) {
  if (
    (Oi('checkPlatformCaching:postinstall', e),
    Oi('checkPlatformCaching:ciName', t),
    e === !0 && t && t in ki)
  ) {
    let n = `Prisma has detected that this project was built on ${t}, which caches dependencies. This leads to an outdated Prisma Client because Prisma's auto-generation isn't triggered. To fix this, make sure to run the \`prisma generate\` command during the build process.

Learn how: https://pris.ly/d/${ki[t]}-build`
    throw (console.error(n), new I(n, r))
  }
}
u()
c()
m()
p()
d()
l()
function Li(e, t) {
  return e
    ? e.datasources
      ? e.datasources
      : e.datasourceUrl
        ? { [t[0]]: { url: e.datasourceUrl } }
        : {}
    : {}
}
u()
c()
m()
p()
d()
l()
u()
c()
m()
p()
d()
l()
u()
c()
m()
p()
d()
l()
var Ys = 'Cloudflare-Workers',
  Xs = 'node'
function Ii() {
  return typeof Netlify == 'object'
    ? 'netlify'
    : typeof EdgeRuntime == 'string'
      ? 'edge-light'
      : globalThis.navigator?.userAgent === Ys
        ? 'workerd'
        : globalThis.Deno
          ? 'deno'
          : globalThis.__lagon__
            ? 'lagon'
            : globalThis.process?.release?.name === Xs
              ? 'node'
              : globalThis.Bun
                ? 'bun'
                : globalThis.fastly
                  ? 'fastly'
                  : 'unknown'
}
var Zs = {
  node: 'Node.js',
  workerd: 'Cloudflare Workers',
  deno: 'Deno and Deno Deploy',
  netlify: 'Netlify Edge Functions',
  'edge-light':
    'Edge Runtime (Vercel Edge Functions, Vercel Edge Middleware, Next.js (Pages Router) Edge API Routes, Next.js (App Router) Edge Route Handlers or Next.js Middleware)',
}
function Pe() {
  let e = Ii()
  return {
    id: e,
    prettyName: Zs[e] || e,
    isEdge: ['workerd', 'deno', 'netlify', 'edge-light'].includes(e),
  }
}
u()
c()
m()
p()
d()
l()
u()
c()
m()
p()
d()
l()
function Xt({
  inlineDatasources: e,
  overrideDatasources: t,
  env: r,
  clientVersion: n,
}) {
  let i,
    o = Object.keys(e)[0],
    s = e[o]?.url,
    a = t[o]?.url
  if (
    (o === void 0
      ? (i = void 0)
      : a
        ? (i = a)
        : s?.value
          ? (i = s.value)
          : s?.fromEnvVar && (i = r[s.fromEnvVar]),
    s?.fromEnvVar !== void 0 && i === void 0)
  )
    throw Pe().id === 'workerd'
      ? new I(
          `error: Environment variable not found: ${s.fromEnvVar}.

In Cloudflare module Workers, environment variables are available only in the Worker's \`env\` parameter of \`fetch\`.
To solve this, provide the connection string directly: https://pris.ly/d/cloudflare-datasource-url`,
          n
        )
      : new I(`error: Environment variable not found: ${s.fromEnvVar}.`, n)
  if (i === void 0)
    throw new I(
      'error: Missing URL environment variable, value, or override.',
      n
    )
  return i
}
u()
c()
m()
p()
d()
l()
u()
c()
m()
p()
d()
l()
function _i(e) {
  if (e?.kind === 'itx') return e.options.id
}
u()
c()
m()
p()
d()
l()
var Vr,
  Di = {
    async loadLibrary(e) {
      let { clientVersion: t, adapter: r, engineWasm: n } = e
      if (r === void 0)
        throw new I(
          `The \`adapter\` option for \`PrismaClient\` is required in this context (${Pe().prettyName})`,
          t
        )
      if (n === void 0)
        throw new I('WASM engine was unexpectedly `undefined`', t)
      Vr === void 0 &&
        (Vr = (async () => {
          let o = n.getRuntime(),
            s = await n.getQueryEngineWasmModule()
          if (s == null)
            throw new I(
              'The loaded wasm module was unexpectedly `undefined` or `null` once loaded',
              t
            )
          let a = { './query_engine_bg.js': o },
            f = new WebAssembly.Instance(s, a)
          return o.__wbg_set_wasm(f.exports), o.QueryEngine
        })())
      let i = await Vr
      return {
        debugPanic() {
          return Promise.reject('{}')
        },
        dmmf() {
          return Promise.resolve('{}')
        },
        version() {
          return { commit: 'unknown', version: 'unknown' }
        },
        QueryEngine: i,
      }
    },
  }
var ea = 'P2036',
  fe = ee('prisma:client:libraryEngine')
function ta(e) {
  return e.item_type === 'query' && 'query' in e
}
function ra(e) {
  return 'level' in e ? e.level === 'error' && e.message === 'PANIC' : !1
}
var jT = [...vr, 'native'],
  Fi = 0,
  yt = class {
    constructor(t, r) {
      this.name = 'LibraryEngine'
      ;(this.libraryLoader = r ?? Di),
        (this.config = t),
        (this.libraryStarted = !1),
        (this.logQueries = t.logQueries ?? !1),
        (this.logLevel = t.logLevel ?? 'error'),
        (this.logEmitter = t.logEmitter),
        (this.datamodel = t.inlineSchema),
        t.enableDebugLogs && (this.logLevel = 'debug')
      let n = Object.keys(t.overrideDatasources)[0],
        i = t.overrideDatasources[n]?.url
      n !== void 0 && i !== void 0 && (this.datasourceOverrides = { [n]: i }),
        (this.libraryInstantiationPromise = this.instantiateLibrary()),
        this.checkForTooManyEngines()
    }
    checkForTooManyEngines() {
      ;(this.config.adapter && ['wasm'].includes('wasm')) ||
        (Fi === 10 &&
          console.warn(
            `${Lt('warn(prisma-client)')} This is the 10th instance of Prisma Client being started. Make sure this is intentional.`
          ))
    }
    async applyPendingMigrations() {
      throw new Error(
        'Cannot call this method from this type of engine instance'
      )
    }
    async transaction(t, r, n) {
      await this.start()
      let i = JSON.stringify(r),
        o
      if (t === 'start') {
        let a = JSON.stringify({
          max_wait: n.maxWait,
          timeout: n.timeout,
          isolation_level: n.isolationLevel,
        })
        o = await this.engine?.startTransaction(a, i)
      } else
        t === 'commit'
          ? (o = await this.engine?.commitTransaction(n.id, i))
          : t === 'rollback' &&
            (o = await this.engine?.rollbackTransaction(n.id, i))
      let s = this.parseEngineResponse(o)
      if (na(s)) {
        let a = this.getExternalAdapterError(s)
        throw a
          ? a.error
          : new Q(s.message, {
              code: s.error_code,
              clientVersion: this.config.clientVersion,
              meta: s.meta,
            })
      }
      return s
    }
    async instantiateLibrary() {
      if ((fe('internalSetup'), this.libraryInstantiationPromise))
        return this.libraryInstantiationPromise
      ;(this.binaryTarget = await this.getCurrentBinaryTarget()),
        await this.loadEngine(),
        this.version()
    }
    async getCurrentBinaryTarget() {}
    parseEngineResponse(t) {
      if (!t)
        throw new J('Response from the Engine was empty', {
          clientVersion: this.config.clientVersion,
        })
      try {
        return JSON.parse(t)
      } catch {
        throw new J('Unable to JSON.parse response from engine', {
          clientVersion: this.config.clientVersion,
        })
      }
    }
    async loadEngine() {
      if (!this.engine) {
        this.QueryEngineConstructor ||
          ((this.library = await this.libraryLoader.loadLibrary(this.config)),
          (this.QueryEngineConstructor = this.library.QueryEngine))
        try {
          let t = new w(this),
            { adapter: r } = this.config
          r && fe('Using driver adapter: %O', r),
            (this.engine = new this.QueryEngineConstructor(
              {
                datamodel: this.datamodel,
                env: g.env,
                logQueries: this.config.logQueries ?? !1,
                ignoreEnvVarErrors: !0,
                datasourceOverrides: this.datasourceOverrides ?? {},
                logLevel: this.logLevel,
                configDir: this.config.cwd,
                engineProtocol: 'json',
              },
              (n) => {
                t.deref()?.logger(n)
              },
              r
            )),
            Fi++
        } catch (t) {
          let r = t,
            n = this.parseInitError(r.message)
          throw typeof n == 'string'
            ? r
            : new I(n.message, this.config.clientVersion, n.error_code)
        }
      }
    }
    logger(t) {
      let r = this.parseEngineResponse(t)
      if (r) {
        if ('span' in r) {
          this.config.tracingHelper.createEngineSpan(r)
          return
        }
        ;(r.level = r?.level.toLowerCase() ?? 'unknown'),
          ta(r)
            ? this.logEmitter.emit('query', {
                timestamp: new Date(),
                query: r.query,
                params: r.params,
                duration: Number(r.duration_ms),
                target: r.module_path,
              })
            : (ra(r),
              this.logEmitter.emit(r.level, {
                timestamp: new Date(),
                message: r.message,
                target: r.module_path,
              }))
      }
    }
    parseInitError(t) {
      try {
        return JSON.parse(t)
      } catch {}
      return t
    }
    parseRequestError(t) {
      try {
        return JSON.parse(t)
      } catch {}
      return t
    }
    onBeforeExit() {
      throw new Error(
        '"beforeExit" hook is not applicable to the library engine since Prisma 5.0.0, it is only relevant and implemented for the binary engine. Please add your event listener to the `process` object directly instead.'
      )
    }
    async start() {
      if (
        (await this.libraryInstantiationPromise,
        await this.libraryStoppingPromise,
        this.libraryStartingPromise)
      )
        return (
          fe(
            `library already starting, this.libraryStarted: ${this.libraryStarted}`
          ),
          this.libraryStartingPromise
        )
      if (this.libraryStarted) return
      let t = async () => {
        fe('library starting')
        try {
          let r = { traceparent: this.config.tracingHelper.getTraceParent() }
          await this.engine?.connect(JSON.stringify(r)),
            (this.libraryStarted = !0),
            fe('library started')
        } catch (r) {
          let n = this.parseInitError(r.message)
          throw typeof n == 'string'
            ? r
            : new I(n.message, this.config.clientVersion, n.error_code)
        } finally {
          this.libraryStartingPromise = void 0
        }
      }
      return (
        (this.libraryStartingPromise = this.config.tracingHelper.runInChildSpan(
          'connect',
          t
        )),
        this.libraryStartingPromise
      )
    }
    async stop() {
      if (
        (await this.libraryStartingPromise,
        await this.executingQueryPromise,
        this.libraryStoppingPromise)
      )
        return fe('library is already stopping'), this.libraryStoppingPromise
      if (!this.libraryStarted) return
      let t = async () => {
        await new Promise((n) => setTimeout(n, 5)), fe('library stopping')
        let r = { traceparent: this.config.tracingHelper.getTraceParent() }
        await this.engine?.disconnect(JSON.stringify(r)),
          (this.libraryStarted = !1),
          (this.libraryStoppingPromise = void 0),
          fe('library stopped')
      }
      return (
        (this.libraryStoppingPromise = this.config.tracingHelper.runInChildSpan(
          'disconnect',
          t
        )),
        this.libraryStoppingPromise
      )
    }
    version() {
      return (
        (this.versionInfo = this.library?.version()),
        this.versionInfo?.version ?? 'unknown'
      )
    }
    debugPanic(t) {
      return this.library?.debugPanic(t)
    }
    async request(t, { traceparent: r, interactiveTransaction: n }) {
      fe(`sending request, this.libraryStarted: ${this.libraryStarted}`)
      let i = JSON.stringify({ traceparent: r }),
        o = JSON.stringify(t)
      try {
        await this.start(),
          (this.executingQueryPromise = this.engine?.query(o, i, n?.id)),
          (this.lastQuery = o)
        let s = this.parseEngineResponse(await this.executingQueryPromise)
        if (s.errors)
          throw s.errors.length === 1
            ? this.buildQueryError(s.errors[0])
            : new J(JSON.stringify(s.errors), {
                clientVersion: this.config.clientVersion,
              })
        if (this.loggerRustPanic) throw this.loggerRustPanic
        return { data: s, elapsed: 0 }
      } catch (s) {
        if (s instanceof I) throw s
        s.code === 'GenericFailure' && s.message?.startsWith('PANIC:')
        let a = this.parseRequestError(s.message)
        throw typeof a == 'string'
          ? s
          : new J(
              `${a.message}
${a.backtrace}`,
              { clientVersion: this.config.clientVersion }
            )
      }
    }
    async requestBatch(t, { transaction: r, traceparent: n }) {
      fe('requestBatch')
      let i = $t(t, r)
      await this.start(),
        (this.lastQuery = JSON.stringify(i)),
        (this.executingQueryPromise = this.engine.query(
          this.lastQuery,
          JSON.stringify({ traceparent: n }),
          _i(r)
        ))
      let o = await this.executingQueryPromise,
        s = this.parseEngineResponse(o)
      if (s.errors)
        throw s.errors.length === 1
          ? this.buildQueryError(s.errors[0])
          : new J(JSON.stringify(s.errors), {
              clientVersion: this.config.clientVersion,
            })
      let { batchResult: a, errors: f } = s
      if (Array.isArray(a))
        return a.map((b) =>
          b.errors && b.errors.length > 0
            ? this.loggerRustPanic ?? this.buildQueryError(b.errors[0])
            : { data: b, elapsed: 0 }
        )
      throw f && f.length === 1
        ? new Error(f[0].error)
        : new Error(JSON.stringify(s))
    }
    buildQueryError(t) {
      t.user_facing_error.is_panic
      let r = this.getExternalAdapterError(t.user_facing_error)
      return r
        ? r.error
        : Wt(t, this.config.clientVersion, this.config.activeProvider)
    }
    getExternalAdapterError(t) {
      if (t.error_code === ea && this.config.adapter) {
        let r = t.meta?.id
        Dt(
          typeof r == 'number',
          'Malformed external JS error received from the engine'
        )
        let n = this.config.adapter.errorRegistry.consumeError(r)
        return Dt(n, 'External error with reported id was not registered'), n
      }
    }
    async metrics(t) {
      await this.start()
      let r = await this.engine.metrics(JSON.stringify(t))
      return t.format === 'prometheus' ? r : this.parseEngineResponse(r)
    }
  }
function na(e) {
  return typeof e == 'object' && e !== null && e.error_code !== void 0
}
u()
c()
m()
p()
d()
l()
var bt =
    'Accelerate has not been setup correctly. Make sure your client is using `.$extends(withAccelerate())`. See https://pris.ly/d/accelerate-getting-started',
  Zt = class {
    constructor(t) {
      this.config = t
      this.name = 'AccelerateEngine'
      this.resolveDatasourceUrl =
        this.config.accelerateUtils?.resolveDatasourceUrl
      this.getBatchRequestPayload =
        this.config.accelerateUtils?.getBatchRequestPayload
      this.prismaGraphQLToJSError =
        this.config.accelerateUtils?.prismaGraphQLToJSError
      this.PrismaClientUnknownRequestError =
        this.config.accelerateUtils?.PrismaClientUnknownRequestError
      this.PrismaClientInitializationError =
        this.config.accelerateUtils?.PrismaClientInitializationError
      this.PrismaClientKnownRequestError =
        this.config.accelerateUtils?.PrismaClientKnownRequestError
      this.debug = this.config.accelerateUtils?.debug
      this.engineVersion = this.config.accelerateUtils?.engineVersion
      this.clientVersion = this.config.accelerateUtils?.clientVersion
    }
    onBeforeExit(t) {}
    async start() {}
    async stop() {}
    version(t) {
      return 'unknown'
    }
    transaction(t, r, n) {
      throw new I(bt, this.config.clientVersion)
    }
    metrics(t) {
      throw new I(bt, this.config.clientVersion)
    }
    request(t, r) {
      throw new I(bt, this.config.clientVersion)
    }
    requestBatch(t, r) {
      throw new I(bt, this.config.clientVersion)
    }
    applyPendingMigrations() {
      throw new I(bt, this.config.clientVersion)
    }
  }
function Ni({ copyEngine: e = !0 }, t) {
  let r
  try {
    r = Xt({
      inlineDatasources: t.inlineDatasources,
      overrideDatasources: t.overrideDatasources,
      env: { ...t.env, ...g.env },
      clientVersion: t.clientVersion,
    })
  } catch {}
  e &&
    r?.startsWith('prisma://') &&
    st(
      'recommend--no-engine',
      'In production, we recommend using `prisma generate --no-engine` (See: `prisma generate --help`)'
    )
  let n = nt(t.generator),
    i = !!(r?.startsWith('prisma://') || !e),
    o = !!t.adapter,
    s = n === 'library',
    a = n === 'binary'
  if ((i && o) || (o && !1)) {
    let f
    throw (
      (e
        ? r?.startsWith('prisma://')
          ? (f = [
              'Prisma Client was configured to use the `adapter` option but the URL was a `prisma://` URL.',
              'Please either use the `prisma://` URL or remove the `adapter` from the Prisma Client constructor.',
            ])
          : (f = [
              'Prisma Client was configured to use both the `adapter` and Accelerate, please chose one.',
            ])
        : (f = [
            'Prisma Client was configured to use the `adapter` option but `prisma generate` was run with `--no-engine`.',
            'Please run `prisma generate` without `--no-engine` to be able to use Prisma Client with the adapter.',
          ]),
      new G(
        f.join(`
`),
        { clientVersion: t.clientVersion }
      ))
    )
  }
  if (o) return new yt(t)
  if (i) return new Zt(t)
  {
    let f = [
      `PrismaClient failed to initialize because it wasn't configured to run in this environment (${Pe().prettyName}).`,
      'In order to run Prisma Client in an edge runtime, you will need to configure one of the following options:',
      '- Enable Driver Adapters: https://pris.ly/d/driver-adapters',
      '- Enable Accelerate: https://pris.ly/d/accelerate',
    ]
    throw new G(
      f.join(`
`),
      { clientVersion: t.clientVersion }
    )
  }
  throw new G('Invalid client engine type, please use `library` or `binary`', {
    clientVersion: t.clientVersion,
  })
}
u()
c()
m()
p()
d()
l()
function er({ generator: e }) {
  return e?.previewFeatures ?? []
}
u()
c()
m()
p()
d()
l()
u()
c()
m()
p()
d()
l()
function Ye(e) {
  return e.substring(0, 1).toLowerCase() + e.substring(1)
}
u()
c()
m()
p()
d()
l()
u()
c()
m()
p()
d()
l()
var ji = _e(qr())
u()
c()
m()
p()
d()
l()
function Vi(e, t, r) {
  let n = qi(e),
    i = ia(n),
    o = sa(i)
  o ? tr(o, t, r) : t.addErrorMessage(() => 'Unknown error')
}
function qi(e) {
  return e.errors.flatMap((t) => (t.kind === 'Union' ? qi(t) : [t]))
}
function ia(e) {
  let t = new Map(),
    r = []
  for (let n of e) {
    if (n.kind !== 'InvalidArgumentType') {
      r.push(n)
      continue
    }
    let i = `${n.selectionPath.join('.')}:${n.argumentPath.join('.')}`,
      o = t.get(i)
    o
      ? t.set(i, {
          ...n,
          argument: {
            ...n.argument,
            typeNames: oa(o.argument.typeNames, n.argument.typeNames),
          },
        })
      : t.set(i, n)
  }
  return r.push(...t.values()), r
}
function oa(e, t) {
  return [...new Set(e.concat(t))]
}
function sa(e) {
  return Rr(e, (t, r) => {
    let n = Bi(t),
      i = Bi(r)
    return n !== i ? n - i : $i(t) - $i(r)
  })
}
function Bi(e) {
  let t = 0
  return (
    Array.isArray(e.selectionPath) && (t += e.selectionPath.length),
    Array.isArray(e.argumentPath) && (t += e.argumentPath.length),
    t
  )
}
function $i(e) {
  switch (e.kind) {
    case 'InvalidArgumentValue':
    case 'ValueTooLarge':
      return 20
    case 'InvalidArgumentType':
      return 10
    case 'RequiredArgumentMissing':
      return -10
    default:
      return 0
  }
}
u()
c()
m()
p()
d()
l()
var te = class {
  constructor(t, r) {
    this.name = t
    this.value = r
    this.isRequired = !1
  }
  makeRequired() {
    return (this.isRequired = !0), this
  }
  write(t) {
    let {
      colors: { green: r },
    } = t.context
    t.addMarginSymbol(r(this.isRequired ? '+' : '?')),
      t.write(r(this.name)),
      this.isRequired || t.write(r('?')),
      t.write(r(': ')),
      typeof this.value == 'string'
        ? t.write(r(this.value))
        : t.write(this.value)
  }
}
u()
c()
m()
p()
d()
l()
var wt = class {
  constructor() {
    this.fields = []
  }
  addField(t, r) {
    return (
      this.fields.push({
        write(n) {
          let { green: i, dim: o } = n.context.colors
          n.write(i(o(`${t}: ${r}`))).addMarginSymbol(i(o('+')))
        },
      }),
      this
    )
  }
  write(t) {
    let {
      colors: { green: r },
    } = t.context
    t.writeLine(r('{'))
      .withIndent(() => {
        t.writeJoined(Je, this.fields).newLine()
      })
      .write(r('}'))
      .addMarginSymbol(r('+'))
  }
}
function tr(e, t, r) {
  switch (e.kind) {
    case 'MutuallyExclusiveFields':
      aa(e, t)
      break
    case 'IncludeOnScalar':
      la(e, t)
      break
    case 'EmptySelection':
      ua(e, t, r)
      break
    case 'UnknownSelectionField':
      da(e, t)
      break
    case 'UnknownArgument':
      fa(e, t)
      break
    case 'UnknownInputField':
      ga(e, t)
      break
    case 'RequiredArgumentMissing':
      ha(e, t)
      break
    case 'InvalidArgumentType':
      ya(e, t)
      break
    case 'InvalidArgumentValue':
      ba(e, t)
      break
    case 'ValueTooLarge':
      wa(e, t)
      break
    case 'SomeFieldsMissing':
      Ea(e, t)
      break
    case 'TooManyFieldsGiven':
      xa(e, t)
      break
    case 'Union':
      Vi(e, t, r)
      break
    default:
      throw new Error('not implemented: ' + e.kind)
  }
}
function aa(e, t) {
  let r = t.arguments.getDeepSubSelectionValue(e.selectionPath)?.asObject()
  r &&
    (r.getField(e.firstField)?.markAsError(),
    r.getField(e.secondField)?.markAsError()),
    t.addErrorMessage(
      (n) =>
        `Please ${n.bold('either')} use ${n.green(`\`${e.firstField}\``)} or ${n.green(`\`${e.secondField}\``)}, but ${n.red('not both')} at the same time.`
    )
}
function la(e, t) {
  let [r, n] = Et(e.selectionPath),
    i = e.outputType,
    o = t.arguments.getDeepSelectionParent(r)?.value
  if (o && (o.getField(n)?.markAsError(), i))
    for (let s of i.fields)
      s.isRelation && o.addSuggestion(new te(s.name, 'true'))
  t.addErrorMessage((s) => {
    let a = `Invalid scalar field ${s.red(`\`${n}\``)} for ${s.bold('include')} statement`
    return (
      i ? (a += ` on model ${s.bold(i.name)}. ${xt(s)}`) : (a += '.'),
      (a += `
Note that ${s.bold('include')} statements only accept relation fields.`),
      a
    )
  })
}
function ua(e, t, r) {
  let n = t.arguments.getDeepSubSelectionValue(e.selectionPath)?.asObject()
  if (n) {
    let i = n.getField('omit')?.value.asObject()
    if (i) {
      ca(e, t, i)
      return
    }
    if (n.hasField('select')) {
      ma(e, t)
      return
    }
  }
  if (r?.[Ye(e.outputType.name)]) {
    pa(e, t)
    return
  }
  t.addErrorMessage(
    () => `Unknown field at "${e.selectionPath.join('.')} selection"`
  )
}
function ca(e, t, r) {
  r.removeAllFields()
  for (let n of e.outputType.fields) r.addSuggestion(new te(n.name, 'false'))
  t.addErrorMessage(
    (n) =>
      `The ${n.red('omit')} statement includes every field of the model ${n.bold(e.outputType.name)}. At least one field must be included in the result`
  )
}
function ma(e, t) {
  let r = e.outputType,
    n = t.arguments.getDeepSelectionParent(e.selectionPath)?.value,
    i = n?.isEmpty() ?? !1
  n && (n.removeAllFields(), Gi(n, r)),
    t.addErrorMessage((o) =>
      i
        ? `The ${o.red('`select`')} statement for type ${o.bold(r.name)} must not be empty. ${xt(o)}`
        : `The ${o.red('`select`')} statement for type ${o.bold(r.name)} needs ${o.bold('at least one truthy value')}.`
    )
}
function pa(e, t) {
  let r = new wt()
  for (let i of e.outputType.fields) i.isRelation || r.addField(i.name, 'false')
  let n = new te('omit', r).makeRequired()
  if (e.selectionPath.length === 0) t.arguments.addSuggestion(n)
  else {
    let [i, o] = Et(e.selectionPath),
      a = t.arguments.getDeepSelectionParent(i)?.value.asObject()?.getField(o)
    if (a) {
      let f = a?.value.asObject() ?? new We()
      f.addSuggestion(n), (a.value = f)
    }
  }
  t.addErrorMessage(
    (i) =>
      `The global ${i.red('omit')} configuration excludes every field of the model ${i.bold(e.outputType.name)}. At least one field must be included in the result`
  )
}
function da(e, t) {
  let [r, n] = Et(e.selectionPath),
    i = t.arguments.getDeepSubSelectionValue(r)?.asObject(),
    o
  if (i) {
    let s = i.getFieldValue('select')?.asObject(),
      a = i.getFieldValue('include')?.asObject(),
      f = i.getFieldValue('omit')?.asObject()
    s?.hasField(n)
      ? ((o = 'select'), s.getField(n)?.markAsError(), Gi(s, e.outputType))
      : a?.hasField(n)
        ? ((o = 'include'), a.getField(n)?.markAsError(), Pa(a, e.outputType))
        : f?.hasField(n) &&
          ((o = 'omit'), f.getField(n)?.markAsError(), va(f, e.outputType))
  }
  t.addErrorMessage((s) => {
    let a = [`Unknown field ${s.red(`\`${n}\``)}`]
    return (
      o && a.push(`for ${s.bold(o)} statement`),
      a.push(`on model ${s.bold(`\`${e.outputType.name}\``)}.`),
      a.push(xt(s)),
      a.join(' ')
    )
  })
}
function fa(e, t) {
  let r = e.argumentPath[0],
    n = t.arguments.getDeepSubSelectionValue(e.selectionPath)?.asObject()
  n && (n.getField(r)?.markAsError(), Ta(n, e.arguments)),
    t.addErrorMessage((i) =>
      Qi(
        i,
        r,
        e.arguments.map((o) => o.name)
      )
    )
}
function ga(e, t) {
  let [r, n] = Et(e.argumentPath),
    i = t.arguments.getDeepSubSelectionValue(e.selectionPath)?.asObject()
  if (i) {
    i.getDeepField(e.argumentPath)?.markAsError()
    let o = i.getDeepFieldValue(r)?.asObject()
    o && Wi(o, e.inputType)
  }
  t.addErrorMessage((o) =>
    Qi(
      o,
      n,
      e.inputType.fields.map((s) => s.name)
    )
  )
}
function Qi(e, t, r) {
  let n = [`Unknown argument \`${e.red(t)}\`.`],
    i = Aa(t, r)
  return (
    i && n.push(`Did you mean \`${e.green(i)}\`?`),
    r.length > 0 && n.push(xt(e)),
    n.join(' ')
  )
}
function ha(e, t) {
  let r
  t.addErrorMessage((f) =>
    r?.value instanceof W && r.value.text === 'null'
      ? `Argument \`${f.green(o)}\` must not be ${f.red('null')}.`
      : `Argument \`${f.green(o)}\` is missing.`
  )
  let n = t.arguments.getDeepSubSelectionValue(e.selectionPath)?.asObject()
  if (!n) return
  let [i, o] = Et(e.argumentPath),
    s = new wt(),
    a = n.getDeepFieldValue(i)?.asObject()
  if (a)
    if (
      ((r = a.getField(o)),
      r && a.removeField(o),
      e.inputTypes.length === 1 && e.inputTypes[0].kind === 'object')
    ) {
      for (let f of e.inputTypes[0].fields)
        s.addField(f.name, f.typeNames.join(' | '))
      a.addSuggestion(new te(o, s).makeRequired())
    } else {
      let f = e.inputTypes.map(Ji).join(' | ')
      a.addSuggestion(new te(o, f).makeRequired())
    }
}
function Ji(e) {
  return e.kind === 'list' ? `${Ji(e.elementType)}[]` : e.name
}
function ya(e, t) {
  let r = e.argument.name,
    n = t.arguments.getDeepSubSelectionValue(e.selectionPath)?.asObject()
  n && n.getDeepFieldValue(e.argumentPath)?.markAsError(),
    t.addErrorMessage((i) => {
      let o = rr(
        'or',
        e.argument.typeNames.map((s) => i.green(s))
      )
      return `Argument \`${i.bold(r)}\`: Invalid value provided. Expected ${o}, provided ${i.red(e.inferredType)}.`
    })
}
function ba(e, t) {
  let r = e.argument.name,
    n = t.arguments.getDeepSubSelectionValue(e.selectionPath)?.asObject()
  n && n.getDeepFieldValue(e.argumentPath)?.markAsError(),
    t.addErrorMessage((i) => {
      let o = [`Invalid value for argument \`${i.bold(r)}\``]
      if (
        (e.underlyingError && o.push(`: ${e.underlyingError}`),
        o.push('.'),
        e.argument.typeNames.length > 0)
      ) {
        let s = rr(
          'or',
          e.argument.typeNames.map((a) => i.green(a))
        )
        o.push(` Expected ${s}.`)
      }
      return o.join('')
    })
}
function wa(e, t) {
  let r = e.argument.name,
    n = t.arguments.getDeepSubSelectionValue(e.selectionPath)?.asObject(),
    i
  if (n) {
    let s = n.getDeepField(e.argumentPath)?.value
    s?.markAsError(), s instanceof W && (i = s.text)
  }
  t.addErrorMessage((o) => {
    let s = ['Unable to fit value']
    return (
      i && s.push(o.red(i)),
      s.push(`into a 64-bit signed integer for field \`${o.bold(r)}\``),
      s.join(' ')
    )
  })
}
function Ea(e, t) {
  let r = e.argumentPath[e.argumentPath.length - 1],
    n = t.arguments.getDeepSubSelectionValue(e.selectionPath)?.asObject()
  if (n) {
    let i = n.getDeepFieldValue(e.argumentPath)?.asObject()
    i && Wi(i, e.inputType)
  }
  t.addErrorMessage((i) => {
    let o = [
      `Argument \`${i.bold(r)}\` of type ${i.bold(e.inputType.name)} needs`,
    ]
    return (
      e.constraints.minFieldCount === 1
        ? e.constraints.requiredFields
          ? o.push(
              `${i.green('at least one of')} ${rr(
                'or',
                e.constraints.requiredFields.map((s) => `\`${i.bold(s)}\``)
              )} arguments.`
            )
          : o.push(`${i.green('at least one')} argument.`)
        : o.push(
            `${i.green(`at least ${e.constraints.minFieldCount}`)} arguments.`
          ),
      o.push(xt(i)),
      o.join(' ')
    )
  })
}
function xa(e, t) {
  let r = e.argumentPath[e.argumentPath.length - 1],
    n = t.arguments.getDeepSubSelectionValue(e.selectionPath)?.asObject(),
    i = []
  if (n) {
    let o = n.getDeepFieldValue(e.argumentPath)?.asObject()
    o && (o.markAsError(), (i = Object.keys(o.getFields())))
  }
  t.addErrorMessage((o) => {
    let s = [
      `Argument \`${o.bold(r)}\` of type ${o.bold(e.inputType.name)} needs`,
    ]
    return (
      e.constraints.minFieldCount === 1 && e.constraints.maxFieldCount == 1
        ? s.push(`${o.green('exactly one')} argument,`)
        : e.constraints.maxFieldCount == 1
          ? s.push(`${o.green('at most one')} argument,`)
          : s.push(
              `${o.green(`at most ${e.constraints.maxFieldCount}`)} arguments,`
            ),
      s.push(
        `but you provided ${rr(
          'and',
          i.map((a) => o.red(a))
        )}. Please choose`
      ),
      e.constraints.maxFieldCount === 1
        ? s.push('one.')
        : s.push(`${e.constraints.maxFieldCount}.`),
      s.join(' ')
    )
  })
}
function Gi(e, t) {
  for (let r of t.fields)
    e.hasField(r.name) || e.addSuggestion(new te(r.name, 'true'))
}
function Pa(e, t) {
  for (let r of t.fields)
    r.isRelation &&
      !e.hasField(r.name) &&
      e.addSuggestion(new te(r.name, 'true'))
}
function va(e, t) {
  for (let r of t.fields)
    !e.hasField(r.name) &&
      !r.isRelation &&
      e.addSuggestion(new te(r.name, 'true'))
}
function Ta(e, t) {
  for (let r of t)
    e.hasField(r.name) ||
      e.addSuggestion(new te(r.name, r.typeNames.join(' | ')))
}
function Wi(e, t) {
  if (t.kind === 'object')
    for (let r of t.fields)
      e.hasField(r.name) ||
        e.addSuggestion(new te(r.name, r.typeNames.join(' | ')))
}
function Et(e) {
  let t = [...e],
    r = t.pop()
  if (!r) throw new Error('unexpected empty path')
  return [t, r]
}
function xt({ green: e, enabled: t }) {
  return (
    'Available options are ' +
    (t ? `listed in ${e('green')}` : 'marked with ?') +
    '.'
  )
}
function rr(e, t) {
  if (t.length === 1) return t[0]
  let r = [...t],
    n = r.pop()
  return `${r.join(', ')} ${e} ${n}`
}
var Ca = 3
function Aa(e, t) {
  let r = 1 / 0,
    n
  for (let i of t) {
    let o = (0, ji.default)(e, i)
    o > Ca || (o < r && ((r = o), (n = i)))
  }
  return n
}
function nr({
  args: e,
  errors: t,
  errorFormat: r,
  callsite: n,
  originalMethod: i,
  clientVersion: o,
  globalOmit: s,
}) {
  let a = Ke(e)
  for (let C of t) tr(C, a, s)
  let { message: f, args: b } = Gt(a, r),
    T = ze({
      message: f,
      callsite: n,
      originalMethod: i,
      showColors: r === 'pretty',
      callArguments: b,
    })
  throw new G(T, { clientVersion: o })
}
var Ra = {
  findUnique: 'findUnique',
  findUniqueOrThrow: 'findUniqueOrThrow',
  findFirst: 'findFirst',
  findFirstOrThrow: 'findFirstOrThrow',
  findMany: 'findMany',
  count: 'aggregate',
  create: 'createOne',
  createMany: 'createMany',
  createManyAndReturn: 'createManyAndReturn',
  update: 'updateOne',
  updateMany: 'updateMany',
  upsert: 'upsertOne',
  delete: 'deleteOne',
  deleteMany: 'deleteMany',
  executeRaw: 'executeRaw',
  queryRaw: 'queryRaw',
  aggregate: 'aggregate',
  groupBy: 'groupBy',
  runCommandRaw: 'runCommandRaw',
  findRaw: 'findRaw',
  aggregateRaw: 'aggregateRaw',
}
function Ki({
  modelName: e,
  action: t,
  args: r,
  runtimeDataModel: n,
  extensions: i,
  callsite: o,
  clientMethod: s,
  errorFormat: a,
  clientVersion: f,
  previewFeatures: b,
  globalOmit: T,
}) {
  let C = new jr({
    runtimeDataModel: n,
    modelName: e,
    action: t,
    rootArgs: r,
    callsite: o,
    extensions: i,
    selectionPath: [],
    argumentPath: [],
    originalMethod: s,
    errorFormat: a,
    clientVersion: f,
    previewFeatures: b,
    globalOmit: T,
  })
  return { modelName: e, action: Ra[t], query: Pt(r, C) }
}
function Pt({ select: e, include: t, ...r } = {}, n) {
  let i
  return (
    n.isPreviewFeatureOn('omitApi') && ((i = r.omit), delete r.omit),
    { arguments: zi(r, n), selection: Sa(e, t, i, n) }
  )
}
function Sa(e, t, r, n) {
  return e
    ? (t
        ? n.throwValidationError({
            kind: 'MutuallyExclusiveFields',
            firstField: 'include',
            secondField: 'select',
            selectionPath: n.getSelectionPath(),
          })
        : r &&
          n.isPreviewFeatureOn('omitApi') &&
          n.throwValidationError({
            kind: 'MutuallyExclusiveFields',
            firstField: 'omit',
            secondField: 'select',
            selectionPath: n.getSelectionPath(),
          }),
      La(e, n))
    : Oa(n, t, r)
}
function Oa(e, t, r) {
  let n = {}
  return (
    e.modelOrType &&
      !e.isRawAction() &&
      ((n.$composites = !0), (n.$scalars = !0)),
    t && ka(n, t, e),
    e.isPreviewFeatureOn('omitApi') && Ma(n, r, e),
    n
  )
}
function ka(e, t, r) {
  for (let [n, i] of Object.entries(t)) {
    if (i === !1) {
      e[n] = !1
      continue
    }
    let o = r.findField(n)
    if (
      (o &&
        o.kind !== 'object' &&
        r.throwValidationError({
          kind: 'IncludeOnScalar',
          selectionPath: r.getSelectionPath().concat(n),
          outputType: r.getOutputTypeDescription(),
        }),
      o)
    ) {
      e[n] = Pt(i === !0 ? {} : i, r.nestSelection(n))
      continue
    }
    if (i === !0) {
      e[n] = !0
      continue
    }
    e[n] = Pt(i, r.nestSelection(n))
  }
}
function Ma(e, t, r) {
  let n = r.getComputedFields(),
    i = { ...r.getGlobalOmit(), ...t },
    o = Si(i, n)
  for (let [s, a] of Object.entries(o)) {
    let f = r.findField(s)
    ;(n?.[s] && !f) || (e[s] = !a)
  }
}
function La(e, t) {
  let r = {},
    n = t.getComputedFields(),
    i = Ri(e, n)
  for (let [o, s] of Object.entries(i)) {
    let a = t.findField(o)
    if (!(n?.[o] && !a)) {
      if (s === !1) {
        r[o] = !1
        continue
      }
      if (s === !0) {
        a?.kind === 'object' ? (r[o] = Pt({}, t.nestSelection(o))) : (r[o] = !0)
        continue
      }
      r[o] = Pt(s, t.nestSelection(o))
    }
  }
  return r
}
function Hi(e, t) {
  if (e === null) return null
  if (typeof e == 'string' || typeof e == 'number' || typeof e == 'boolean')
    return e
  if (typeof e == 'bigint') return { $type: 'BigInt', value: String(e) }
  if (qe(e)) {
    if (Vt(e)) return { $type: 'DateTime', value: e.toISOString() }
    t.throwValidationError({
      kind: 'InvalidArgumentValue',
      selectionPath: t.getSelectionPath(),
      argumentPath: t.getArgumentPath(),
      argument: { name: t.getArgumentName(), typeNames: ['Date'] },
      underlyingError: 'Provided Date object is invalid',
    })
  }
  if (Qe(e))
    return {
      $type: 'FieldRef',
      value: { _ref: e.name, _container: e.modelName },
    }
  if (Array.isArray(e)) return Ia(e, t)
  if (ArrayBuffer.isView(e))
    return { $type: 'Bytes', value: y.from(e).toString('base64') }
  if (_a(e)) return e.values
  if (je(e)) return { $type: 'Decimal', value: e.toFixed() }
  if (e instanceof be) {
    if (e !== Nt.instances[e._getName()])
      throw new Error('Invalid ObjectEnumValue')
    return { $type: 'Enum', value: e._getName() }
  }
  if (Da(e)) return e.toJSON()
  if (typeof e == 'object') return zi(e, t)
  t.throwValidationError({
    kind: 'InvalidArgumentValue',
    selectionPath: t.getSelectionPath(),
    argumentPath: t.getArgumentPath(),
    argument: { name: t.getArgumentName(), typeNames: [] },
    underlyingError: `We could not serialize ${Object.prototype.toString.call(e)} value. Serialize the object to JSON or implement a ".toJSON()" method on it`,
  })
}
function zi(e, t) {
  if (e.$type) return { $type: 'Raw', value: e }
  let r = {}
  for (let n in e) {
    let i = e[n]
    i !== void 0 && (r[n] = Hi(i, t.nestArgument(n)))
  }
  return r
}
function Ia(e, t) {
  let r = []
  for (let n = 0; n < e.length; n++) {
    let i = t.nestArgument(String(n)),
      o = e[n]
    o === void 0 &&
      t.throwValidationError({
        kind: 'InvalidArgumentValue',
        selectionPath: i.getSelectionPath(),
        argumentPath: i.getArgumentPath(),
        argument: { name: `${t.getArgumentName()}[${n}]`, typeNames: [] },
        underlyingError:
          'Can not use `undefined` value within array. Use `null` or filter out `undefined` values',
      }),
      r.push(Hi(o, i))
  }
  return r
}
function _a(e) {
  return typeof e == 'object' && e !== null && e.__prismaRawParameters__ === !0
}
function Da(e) {
  return typeof e == 'object' && e !== null && typeof e.toJSON == 'function'
}
var jr = class e {
  constructor(t) {
    this.params = t
    this.params.modelName &&
      (this.modelOrType =
        this.params.runtimeDataModel.models[this.params.modelName] ??
        this.params.runtimeDataModel.types[this.params.modelName])
  }
  throwValidationError(t) {
    nr({
      errors: [t],
      originalMethod: this.params.originalMethod,
      args: this.params.rootArgs ?? {},
      callsite: this.params.callsite,
      errorFormat: this.params.errorFormat,
      clientVersion: this.params.clientVersion,
      globalOmit: this.params.globalOmit,
    })
  }
  getSelectionPath() {
    return this.params.selectionPath
  }
  getArgumentPath() {
    return this.params.argumentPath
  }
  getArgumentName() {
    return this.params.argumentPath[this.params.argumentPath.length - 1]
  }
  getOutputTypeDescription() {
    if (!(!this.params.modelName || !this.modelOrType))
      return {
        name: this.params.modelName,
        fields: this.modelOrType.fields.map((t) => ({
          name: t.name,
          typeName: 'boolean',
          isRelation: t.kind === 'object',
        })),
      }
  }
  isRawAction() {
    return [
      'executeRaw',
      'queryRaw',
      'runCommandRaw',
      'findRaw',
      'aggregateRaw',
    ].includes(this.params.action)
  }
  isPreviewFeatureOn(t) {
    return this.params.previewFeatures.includes(t)
  }
  getComputedFields() {
    if (this.params.modelName)
      return this.params.extensions.getAllComputedFields(this.params.modelName)
  }
  findField(t) {
    return this.modelOrType?.fields.find((r) => r.name === t)
  }
  nestSelection(t) {
    let r = this.findField(t),
      n = r?.kind === 'object' ? r.type : void 0
    return new e({
      ...this.params,
      modelName: n,
      selectionPath: this.params.selectionPath.concat(t),
    })
  }
  getGlobalOmit() {
    return this.params.modelName
      ? this.params.globalOmit?.[Ye(this.params.modelName)] ?? {}
      : {}
  }
  nestArgument(t) {
    return new e({
      ...this.params,
      argumentPath: this.params.argumentPath.concat(t),
    })
  }
}
u()
c()
m()
p()
d()
l()
var Yi = (e) => ({ command: e })
u()
c()
m()
p()
d()
l()
u()
c()
m()
p()
d()
l()
var Xi = (e) => e.strings.reduce((t, r, n) => `${t}@P${n}${r}`)
u()
c()
m()
p()
d()
l()
l()
function vt(e) {
  try {
    return Zi(e, 'fast')
  } catch {
    return Zi(e, 'slow')
  }
}
function Zi(e, t) {
  return JSON.stringify(e.map((r) => Fa(r, t)))
}
function Fa(e, t) {
  return typeof e == 'bigint'
    ? { prisma__type: 'bigint', prisma__value: e.toString() }
    : qe(e)
      ? { prisma__type: 'date', prisma__value: e.toJSON() }
      : ue.isDecimal(e)
        ? { prisma__type: 'decimal', prisma__value: e.toJSON() }
        : y.isBuffer(e)
          ? { prisma__type: 'bytes', prisma__value: e.toString('base64') }
          : Na(e) || ArrayBuffer.isView(e)
            ? {
                prisma__type: 'bytes',
                prisma__value: y.from(e).toString('base64'),
              }
            : typeof e == 'object' && t === 'slow'
              ? to(e)
              : e
}
function Na(e) {
  return e instanceof ArrayBuffer || e instanceof SharedArrayBuffer
    ? !0
    : typeof e == 'object' && e !== null
      ? e[Symbol.toStringTag] === 'ArrayBuffer' ||
        e[Symbol.toStringTag] === 'SharedArrayBuffer'
      : !1
}
function to(e) {
  if (typeof e != 'object' || e === null) return e
  if (typeof e.toJSON == 'function') return e.toJSON()
  if (Array.isArray(e)) return e.map(eo)
  let t = {}
  for (let r of Object.keys(e)) t[r] = eo(e[r])
  return t
}
function eo(e) {
  return typeof e == 'bigint' ? e.toString() : to(e)
}
var Ua = /^(\s*alter\s)/i,
  ro = ee('prisma:client')
function Qr(e, t, r, n) {
  if (
    !(e !== 'postgresql' && e !== 'cockroachdb') &&
    r.length > 0 &&
    Ua.exec(t)
  )
    throw new Error(`Running ALTER using ${n} is not supported
Using the example below you can still execute your query with Prisma, but please note that it is vulnerable to SQL injection attacks and requires you to take care of input sanitization.

Example:
  await prisma.$executeRawUnsafe(\`ALTER USER prisma WITH PASSWORD '\${password}'\`)

More Information: https://pris.ly/d/execute-raw
`)
}
var Jr =
    ({ clientMethod: e, activeProvider: t }) =>
    (r) => {
      let n = '',
        i
      if (Array.isArray(r)) {
        let [o, ...s] = r
        ;(n = o), (i = { values: vt(s || []), __prismaRawParameters__: !0 })
      } else
        switch (t) {
          case 'sqlite':
          case 'mysql': {
            ;(n = r.sql),
              (i = { values: vt(r.values), __prismaRawParameters__: !0 })
            break
          }
          case 'cockroachdb':
          case 'postgresql':
          case 'postgres': {
            ;(n = r.text),
              (i = { values: vt(r.values), __prismaRawParameters__: !0 })
            break
          }
          case 'sqlserver': {
            ;(n = Xi(r)),
              (i = { values: vt(r.values), __prismaRawParameters__: !0 })
            break
          }
          default:
            throw new Error(`The ${t} provider does not support ${e}`)
        }
      return (
        i?.values
          ? ro(`prisma.${e}(${n}, ${i.values})`)
          : ro(`prisma.${e}(${n})`),
        { query: n, parameters: i }
      )
    },
  no = {
    requestArgsToMiddlewareArgs(e) {
      return [e.strings, ...e.values]
    },
    middlewareArgsToRequestArgs(e) {
      let [t, ...r] = e
      return new X(t, r)
    },
  },
  io = {
    requestArgsToMiddlewareArgs(e) {
      return [e]
    },
    middlewareArgsToRequestArgs(e) {
      return e[0]
    },
  }
u()
c()
m()
p()
d()
l()
function Gr(e) {
  return function (r) {
    let n,
      i = (o = e) => {
        try {
          return o === void 0 || o?.kind === 'itx' ? (n ??= oo(r(o))) : oo(r(o))
        } catch (s) {
          return Promise.reject(s)
        }
      }
    return {
      then(o, s) {
        return i().then(o, s)
      },
      catch(o) {
        return i().catch(o)
      },
      finally(o) {
        return i().finally(o)
      },
      requestTransaction(o) {
        let s = i(o)
        return s.requestTransaction ? s.requestTransaction(o) : s
      },
      [Symbol.toStringTag]: 'PrismaPromise',
    }
  }
}
function oo(e) {
  return typeof e.then == 'function' ? e : Promise.resolve(e)
}
u()
c()
m()
p()
d()
l()
var so = {
    isEnabled() {
      return !1
    },
    getTraceParent() {
      return '00-10-10-00'
    },
    async createEngineSpan() {},
    getActiveContext() {},
    runInChildSpan(e, t) {
      return t()
    },
  },
  Wr = class {
    isEnabled() {
      return this.getGlobalTracingHelper().isEnabled()
    }
    getTraceParent(t) {
      return this.getGlobalTracingHelper().getTraceParent(t)
    }
    createEngineSpan(t) {
      return this.getGlobalTracingHelper().createEngineSpan(t)
    }
    getActiveContext() {
      return this.getGlobalTracingHelper().getActiveContext()
    }
    runInChildSpan(t, r) {
      return this.getGlobalTracingHelper().runInChildSpan(t, r)
    }
    getGlobalTracingHelper() {
      return globalThis.PRISMA_INSTRUMENTATION?.helper ?? so
    }
  }
function ao(e) {
  return e.includes('tracing') ? new Wr() : so
}
u()
c()
m()
p()
d()
l()
function lo(e, t = () => {}) {
  let r,
    n = new Promise((i) => (r = i))
  return {
    then(i) {
      return --e === 0 && r(t()), i?.(n)
    },
  }
}
u()
c()
m()
p()
d()
l()
var Ba = ['$connect', '$disconnect', '$on', '$transaction', '$use', '$extends'],
  uo = Ba
u()
c()
m()
p()
d()
l()
function co(e) {
  return typeof e == 'string'
    ? e
    : e.reduce(
        (t, r) => {
          let n = typeof r == 'string' ? r : r.level
          return n === 'query'
            ? t
            : t && (r === 'info' || t === 'info')
              ? 'info'
              : n
        },
        void 0
      )
}
u()
c()
m()
p()
d()
l()
var ir = class {
  constructor() {
    this._middlewares = []
  }
  use(t) {
    this._middlewares.push(t)
  }
  get(t) {
    return this._middlewares[t]
  }
  has(t) {
    return !!this._middlewares[t]
  }
  length() {
    return this._middlewares.length
  }
}
u()
c()
m()
p()
d()
l()
var po = _e(Vn())
u()
c()
m()
p()
d()
l()
function or(e) {
  return typeof e.batchRequestIdx == 'number'
}
u()
c()
m()
p()
d()
l()
l()
function sr(e) {
  return e === null
    ? e
    : Array.isArray(e)
      ? e.map(sr)
      : typeof e == 'object'
        ? $a(e)
          ? Va(e)
          : Ue(e, sr)
        : e
}
function $a(e) {
  return e !== null && typeof e == 'object' && typeof e.$type == 'string'
}
function Va({ $type: e, value: t }) {
  switch (e) {
    case 'BigInt':
      return BigInt(t)
    case 'Bytes':
      return y.from(t, 'base64')
    case 'DateTime':
      return new Date(t)
    case 'Decimal':
      return new ue(t)
    case 'Json':
      return JSON.parse(t)
    default:
      ke(t, 'Unknown tagged value')
  }
}
u()
c()
m()
p()
d()
l()
function mo(e) {
  if (e.action !== 'findUnique' && e.action !== 'findUniqueOrThrow') return
  let t = []
  return (
    e.modelName && t.push(e.modelName),
    e.query.arguments && t.push(Kr(e.query.arguments)),
    t.push(Kr(e.query.selection)),
    t.join('')
  )
}
function Kr(e) {
  return `(${Object.keys(e)
    .sort()
    .map((r) => {
      let n = e[r]
      return typeof n == 'object' && n !== null ? `(${r} ${Kr(n)})` : r
    })
    .join(' ')})`
}
u()
c()
m()
p()
d()
l()
var qa = {
  aggregate: !1,
  aggregateRaw: !1,
  createMany: !0,
  createManyAndReturn: !0,
  createOne: !0,
  deleteMany: !0,
  deleteOne: !0,
  executeRaw: !0,
  findFirst: !1,
  findFirstOrThrow: !1,
  findMany: !1,
  findRaw: !1,
  findUnique: !1,
  findUniqueOrThrow: !1,
  groupBy: !1,
  queryRaw: !1,
  runCommandRaw: !0,
  updateMany: !0,
  updateOne: !0,
  upsertOne: !0,
}
function Hr(e) {
  return qa[e]
}
u()
c()
m()
p()
d()
l()
var ar = class {
  constructor(t) {
    this.options = t
    this.tickActive = !1
    this.batches = {}
  }
  request(t) {
    let r = this.options.batchBy(t)
    return r
      ? (this.batches[r] ||
          ((this.batches[r] = []),
          this.tickActive ||
            ((this.tickActive = !0),
            g.nextTick(() => {
              this.dispatchBatches(), (this.tickActive = !1)
            }))),
        new Promise((n, i) => {
          this.batches[r].push({ request: t, resolve: n, reject: i })
        }))
      : this.options.singleLoader(t)
  }
  dispatchBatches() {
    for (let t in this.batches) {
      let r = this.batches[t]
      delete this.batches[t],
        r.length === 1
          ? this.options
              .singleLoader(r[0].request)
              .then((n) => {
                n instanceof Error ? r[0].reject(n) : r[0].resolve(n)
              })
              .catch((n) => {
                r[0].reject(n)
              })
          : (r.sort((n, i) => this.options.batchOrder(n.request, i.request)),
            this.options
              .batchLoader(r.map((n) => n.request))
              .then((n) => {
                if (n instanceof Error)
                  for (let i = 0; i < r.length; i++) r[i].reject(n)
                else
                  for (let i = 0; i < r.length; i++) {
                    let o = n[i]
                    o instanceof Error ? r[i].reject(o) : r[i].resolve(o)
                  }
              })
              .catch((n) => {
                for (let i = 0; i < r.length; i++) r[i].reject(n)
              }))
    }
  }
  get [Symbol.toStringTag]() {
    return 'DataLoader'
  }
}
var ja = ee('prisma:client:request_handler'),
  lr = class {
    constructor(t, r) {
      ;(this.logEmitter = r),
        (this.client = t),
        (this.dataloader = new ar({
          batchLoader: Pi(async ({ requests: n, customDataProxyFetch: i }) => {
            let { transaction: o, otelParentCtx: s } = n[0],
              a = n.map((C) => C.protocolQuery),
              f = this.client._tracingHelper.getTraceParent(s),
              b = n.some((C) => Hr(C.protocolQuery.action))
            return (
              await this.client._engine.requestBatch(a, {
                traceparent: f,
                transaction: Qa(o),
                containsWrite: b,
                customDataProxyFetch: i,
              })
            ).map((C, O) => {
              if (C instanceof Error) return C
              try {
                return this.mapQueryEngineResult(n[O], C)
              } catch (R) {
                return R
              }
            })
          }),
          singleLoader: async (n) => {
            let i = n.transaction?.kind === 'itx' ? fo(n.transaction) : void 0,
              o = await this.client._engine.request(n.protocolQuery, {
                traceparent: this.client._tracingHelper.getTraceParent(),
                interactiveTransaction: i,
                isWrite: Hr(n.protocolQuery.action),
                customDataProxyFetch: n.customDataProxyFetch,
              })
            return this.mapQueryEngineResult(n, o)
          },
          batchBy: (n) =>
            n.transaction?.id
              ? `transaction-${n.transaction.id}`
              : mo(n.protocolQuery),
          batchOrder(n, i) {
            return n.transaction?.kind === 'batch' &&
              i.transaction?.kind === 'batch'
              ? n.transaction.index - i.transaction.index
              : 0
          },
        }))
    }
    async request(t) {
      try {
        return await this.dataloader.request(t)
      } catch (r) {
        let {
          clientMethod: n,
          callsite: i,
          transaction: o,
          args: s,
          modelName: a,
        } = t
        this.handleAndLogRequestError({
          error: r,
          clientMethod: n,
          callsite: i,
          transaction: o,
          args: s,
          modelName: a,
          globalOmit: t.globalOmit,
        })
      }
    }
    mapQueryEngineResult({ dataPath: t, unpacker: r }, n) {
      let i = n?.data,
        o = n?.elapsed,
        s = this.unpack(i, t, r)
      return g.env.PRISMA_CLIENT_GET_TIME ? { data: s, elapsed: o } : s
    }
    handleAndLogRequestError(t) {
      try {
        this.handleRequestError(t)
      } catch (r) {
        throw (
          (this.logEmitter &&
            this.logEmitter.emit('error', {
              message: r.message,
              target: t.clientMethod,
              timestamp: new Date(),
            }),
          r)
        )
      }
    }
    handleRequestError({
      error: t,
      clientMethod: r,
      callsite: n,
      transaction: i,
      args: o,
      modelName: s,
      globalOmit: a,
    }) {
      if ((ja(t), Ja(t, i) || t instanceof he)) throw t
      if (t instanceof Q && Ga(t)) {
        let b = go(t.meta)
        nr({
          args: o,
          errors: [b],
          callsite: n,
          errorFormat: this.client._errorFormat,
          originalMethod: r,
          clientVersion: this.client._clientVersion,
          globalOmit: a,
        })
      }
      let f = t.message
      if (
        (n &&
          (f = ze({
            callsite: n,
            originalMethod: r,
            isPanic: t.isPanic,
            showColors: this.client._errorFormat === 'pretty',
            message: f,
          })),
        (f = this.sanitizeMessage(f)),
        t.code)
      ) {
        let b = s ? { modelName: s, ...t.meta } : t.meta
        throw new Q(f, {
          code: t.code,
          clientVersion: this.client._clientVersion,
          meta: b,
          batchRequestIdx: t.batchRequestIdx,
        })
      } else {
        if (t.isPanic) throw new ye(f, this.client._clientVersion)
        if (t instanceof J)
          throw new J(f, {
            clientVersion: this.client._clientVersion,
            batchRequestIdx: t.batchRequestIdx,
          })
        if (t instanceof I) throw new I(f, this.client._clientVersion)
        if (t instanceof ye) throw new ye(f, this.client._clientVersion)
      }
      throw ((t.clientVersion = this.client._clientVersion), t)
    }
    sanitizeMessage(t) {
      return this.client._errorFormat && this.client._errorFormat !== 'pretty'
        ? (0, po.default)(t)
        : t
    }
    unpack(t, r, n) {
      if (!t || (t.data && (t = t.data), !t)) return t
      let i = Object.values(t)[0],
        o = r.filter((a) => a !== 'select' && a !== 'include'),
        s = sr(Nr(i, o))
      return n ? n(s) : s
    }
    get [Symbol.toStringTag]() {
      return 'RequestHandler'
    }
  }
function Qa(e) {
  if (e) {
    if (e.kind === 'batch')
      return { kind: 'batch', options: { isolationLevel: e.isolationLevel } }
    if (e.kind === 'itx') return { kind: 'itx', options: fo(e) }
    ke(e, 'Unknown transaction kind')
  }
}
function fo(e) {
  return { id: e.id, payload: e.payload }
}
function Ja(e, t) {
  return or(e) && t?.kind === 'batch' && e.batchRequestIdx !== t.index
}
function Ga(e) {
  return e.code === 'P2009' || e.code === 'P2012'
}
function go(e) {
  if (e.kind === 'Union') return { kind: 'Union', errors: e.errors.map(go) }
  if (Array.isArray(e.selectionPath)) {
    let [, ...t] = e.selectionPath
    return { ...e, selectionPath: t }
  }
  return e
}
u()
c()
m()
p()
d()
l()
var ho = '5.16.1'
var yo = ho
u()
c()
m()
p()
d()
l()
l()
function bo(e) {
  return e.map((t) => {
    let r = {}
    for (let n of Object.keys(t)) r[n] = wo(t[n])
    return r
  })
}
function wo({ prisma__type: e, prisma__value: t }) {
  switch (e) {
    case 'bigint':
      return BigInt(t)
    case 'bytes':
      return y.from(t, 'base64')
    case 'decimal':
      return new ue(t)
    case 'datetime':
    case 'date':
      return new Date(t)
    case 'time':
      return new Date(`1970-01-01T${t}Z`)
    case 'array':
      return t.map(wo)
    default:
      return t
  }
}
u()
c()
m()
p()
d()
l()
var To = _e(qr())
u()
c()
m()
p()
d()
l()
var _ = class extends Error {
  constructor(t) {
    super(
      t +
        `
Read more at https://pris.ly/d/client-constructor`
    ),
      (this.name = 'PrismaClientConstructorValidationError')
  }
  get [Symbol.toStringTag]() {
    return 'PrismaClientConstructorValidationError'
  }
}
K(_, 'PrismaClientConstructorValidationError')
var Eo = [
    'datasources',
    'datasourceUrl',
    'errorFormat',
    'adapter',
    'log',
    'transactionOptions',
    'omit',
    '__internal',
  ],
  xo = ['pretty', 'colorless', 'minimal'],
  Po = ['info', 'query', 'warn', 'error'],
  Ka = {
    datasources: (e, { datasourceNames: t }) => {
      if (e) {
        if (typeof e != 'object' || Array.isArray(e))
          throw new _(
            `Invalid value ${JSON.stringify(e)} for "datasources" provided to PrismaClient constructor`
          )
        for (let [r, n] of Object.entries(e)) {
          if (!t.includes(r)) {
            let i = Xe(r, t) || ` Available datasources: ${t.join(', ')}`
            throw new _(
              `Unknown datasource ${r} provided to PrismaClient constructor.${i}`
            )
          }
          if (typeof n != 'object' || Array.isArray(n))
            throw new _(`Invalid value ${JSON.stringify(e)} for datasource "${r}" provided to PrismaClient constructor.
It should have this form: { url: "CONNECTION_STRING" }`)
          if (n && typeof n == 'object')
            for (let [i, o] of Object.entries(n)) {
              if (i !== 'url')
                throw new _(`Invalid value ${JSON.stringify(e)} for datasource "${r}" provided to PrismaClient constructor.
It should have this form: { url: "CONNECTION_STRING" }`)
              if (typeof o != 'string')
                throw new _(`Invalid value ${JSON.stringify(o)} for datasource "${r}" provided to PrismaClient constructor.
It should have this form: { url: "CONNECTION_STRING" }`)
            }
        }
      }
    },
    adapter: (e, t) => {
      if (e === null) return
      if (e === void 0)
        throw new _(
          '"adapter" property must not be undefined, use null to conditionally disable driver adapters.'
        )
      if (!er(t).includes('driverAdapters'))
        throw new _(
          '"adapter" property can only be provided to PrismaClient constructor when "driverAdapters" preview feature is enabled.'
        )
      if (nt() === 'binary')
        throw new _(
          'Cannot use a driver adapter with the "binary" Query Engine. Please use the "library" Query Engine.'
        )
    },
    datasourceUrl: (e) => {
      if (typeof e < 'u' && typeof e != 'string')
        throw new _(`Invalid value ${JSON.stringify(e)} for "datasourceUrl" provided to PrismaClient constructor.
Expected string or undefined.`)
    },
    errorFormat: (e) => {
      if (e) {
        if (typeof e != 'string')
          throw new _(
            `Invalid value ${JSON.stringify(e)} for "errorFormat" provided to PrismaClient constructor.`
          )
        if (!xo.includes(e)) {
          let t = Xe(e, xo)
          throw new _(
            `Invalid errorFormat ${e} provided to PrismaClient constructor.${t}`
          )
        }
      }
    },
    log: (e) => {
      if (!e) return
      if (!Array.isArray(e))
        throw new _(
          `Invalid value ${JSON.stringify(e)} for "log" provided to PrismaClient constructor.`
        )
      function t(r) {
        if (typeof r == 'string' && !Po.includes(r)) {
          let n = Xe(r, Po)
          throw new _(
            `Invalid log level "${r}" provided to PrismaClient constructor.${n}`
          )
        }
      }
      for (let r of e) {
        t(r)
        let n = {
          level: t,
          emit: (i) => {
            let o = ['stdout', 'event']
            if (!o.includes(i)) {
              let s = Xe(i, o)
              throw new _(
                `Invalid value ${JSON.stringify(i)} for "emit" in logLevel provided to PrismaClient constructor.${s}`
              )
            }
          },
        }
        if (r && typeof r == 'object')
          for (let [i, o] of Object.entries(r))
            if (n[i]) n[i](o)
            else
              throw new _(
                `Invalid property ${i} for "log" provided to PrismaClient constructor`
              )
      }
    },
    transactionOptions: (e) => {
      if (!e) return
      let t = e.maxWait
      if (t != null && t <= 0)
        throw new _(
          `Invalid value ${t} for maxWait in "transactionOptions" provided to PrismaClient constructor. maxWait needs to be greater than 0`
        )
      let r = e.timeout
      if (r != null && r <= 0)
        throw new _(
          `Invalid value ${r} for timeout in "transactionOptions" provided to PrismaClient constructor. timeout needs to be greater than 0`
        )
    },
    omit: (e, t) => {
      if (typeof e != 'object')
        throw new _('"omit" option is expected to be an object.')
      if (e === null) throw new _('"omit" option can not be `null`')
      let r = []
      for (let [n, i] of Object.entries(e)) {
        let o = za(n, t.runtimeDataModel)
        if (!o) {
          r.push({ kind: 'UnknownModel', modelKey: n })
          continue
        }
        for (let [s, a] of Object.entries(i)) {
          let f = o.fields.find((b) => b.name === s)
          if (!f) {
            r.push({ kind: 'UnknownField', modelKey: n, fieldName: s })
            continue
          }
          if (f.relationName) {
            r.push({ kind: 'RelationInOmit', modelKey: n, fieldName: s })
            continue
          }
          typeof a != 'boolean' &&
            r.push({ kind: 'InvalidFieldValue', modelKey: n, fieldName: s })
        }
      }
      if (r.length > 0) throw new _(Ya(e, r))
    },
    __internal: (e) => {
      if (!e) return
      let t = ['debug', 'engine', 'configOverride']
      if (typeof e != 'object')
        throw new _(
          `Invalid value ${JSON.stringify(e)} for "__internal" to PrismaClient constructor`
        )
      for (let [r] of Object.entries(e))
        if (!t.includes(r)) {
          let n = Xe(r, t)
          throw new _(
            `Invalid property ${JSON.stringify(r)} for "__internal" provided to PrismaClient constructor.${n}`
          )
        }
    },
  }
function Co(e, t) {
  for (let [r, n] of Object.entries(e)) {
    if (!Eo.includes(r)) {
      let i = Xe(r, Eo)
      throw new _(
        `Unknown property ${r} provided to PrismaClient constructor.${i}`
      )
    }
    Ka[r](n, t)
  }
  if (e.datasourceUrl && e.datasources)
    throw new _(
      'Can not use "datasourceUrl" and "datasources" options at the same time. Pick one of them'
    )
}
function Xe(e, t) {
  if (t.length === 0 || typeof e != 'string') return ''
  let r = Ha(e, t)
  return r ? ` Did you mean "${r}"?` : ''
}
function Ha(e, t) {
  if (t.length === 0) return null
  let r = t.map((i) => ({ value: i, distance: (0, To.default)(e, i) }))
  r.sort((i, o) => (i.distance < o.distance ? -1 : 1))
  let n = r[0]
  return n.distance < 3 ? n.value : null
}
function za(e, t) {
  return vo(t.models, e) ?? vo(t.types, e)
}
function vo(e, t) {
  let r = Object.keys(e).find((n) => Ye(n) === t)
  if (r) return e[r]
}
function Ya(e, t) {
  let r = Ke(e)
  for (let o of t)
    switch (o.kind) {
      case 'UnknownModel':
        r.arguments.getField(o.modelKey)?.markAsError(),
          r.addErrorMessage(() => `Unknown model name: ${o.modelKey}.`)
        break
      case 'UnknownField':
        r.arguments.getDeepField([o.modelKey, o.fieldName])?.markAsError(),
          r.addErrorMessage(
            () =>
              `Model "${o.modelKey}" does not have a field named "${o.fieldName}".`
          )
        break
      case 'RelationInOmit':
        r.arguments.getDeepField([o.modelKey, o.fieldName])?.markAsError(),
          r.addErrorMessage(
            () =>
              'Relations are already excluded by default and can not be specified in "omit".'
          )
        break
      case 'InvalidFieldValue':
        r.arguments.getDeepFieldValue([o.modelKey, o.fieldName])?.markAsError(),
          r.addErrorMessage(() => 'Omit field option value must be a boolean.')
        break
    }
  let { message: n, args: i } = Gt(r, 'colorless')
  return `Error validating "omit" option:

${i}

${n}`
}
u()
c()
m()
p()
d()
l()
function Ao(e) {
  return e.length === 0
    ? Promise.resolve([])
    : new Promise((t, r) => {
        let n = new Array(e.length),
          i = null,
          o = !1,
          s = 0,
          a = () => {
            o || (s++, s === e.length && ((o = !0), i ? r(i) : t(n)))
          },
          f = (b) => {
            o || ((o = !0), r(b))
          }
        for (let b = 0; b < e.length; b++)
          e[b].then(
            (T) => {
              ;(n[b] = T), a()
            },
            (T) => {
              if (!or(T)) {
                f(T)
                return
              }
              T.batchRequestIdx === b ? f(T) : (i || (i = T), a())
            }
          )
      })
}
var ve = ee('prisma:client')
typeof globalThis == 'object' && (globalThis.NODE_CLIENT = !0)
var Xa = {
    requestArgsToMiddlewareArgs: (e) => e,
    middlewareArgsToRequestArgs: (e) => e,
  },
  Za = Symbol.for('prisma.client.transaction.id'),
  el = {
    id: 0,
    nextId() {
      return ++this.id
    },
  }
function Oo(e) {
  class t {
    constructor(n) {
      this._originalClient = this
      this._middlewares = new ir()
      this._createPrismaPromise = Gr()
      this.$extends = fi
      ;(e = n?.__internal?.configOverride?.(e) ?? e), Mi(e), n && Co(n, e)
      let i = new _t().on('error', () => {})
      ;(this._extensions = Yt.empty()),
        (this._previewFeatures = er(e)),
        (this._clientVersion = e.clientVersion ?? yo),
        (this._activeProvider = e.activeProvider),
        (this._globalOmit = n?.omit),
        (this._tracingHelper = ao(this._previewFeatures))
      let o = {
          rootEnvPath:
            e.relativeEnvPaths.rootEnvPath &&
            rt.resolve(e.dirname, e.relativeEnvPaths.rootEnvPath),
          schemaEnvPath:
            e.relativeEnvPaths.schemaEnvPath &&
            rt.resolve(e.dirname, e.relativeEnvPaths.schemaEnvPath),
        },
        s
      if (n?.adapter) {
        s = Lr(n.adapter)
        let f =
          e.activeProvider === 'postgresql' ? 'postgres' : e.activeProvider
        if (s.provider !== f)
          throw new I(
            `The Driver Adapter \`${s.adapterName}\`, based on \`${s.provider}\`, is not compatible with the provider \`${f}\` specified in the Prisma schema.`,
            this._clientVersion
          )
      }
      let a = e.injectableEdgeEnv?.()
      try {
        let f = n ?? {},
          b = f.__internal ?? {},
          T = b.debug === !0
        T && ee.enable('prisma:client')
        let C = rt.resolve(e.dirname, e.relativePath)
        mn.existsSync(C) || (C = e.dirname),
          ve('dirname', e.dirname),
          ve('relativePath', e.relativePath),
          ve('cwd', C)
        let O = b.engine || {}
        if (
          (f.errorFormat
            ? (this._errorFormat = f.errorFormat)
            : g.env.NODE_ENV === 'production'
              ? (this._errorFormat = 'minimal')
              : g.env.NO_COLOR
                ? (this._errorFormat = 'colorless')
                : (this._errorFormat = 'colorless'),
          (this._runtimeDataModel = e.runtimeDataModel),
          (this._engineConfig = {
            cwd: C,
            dirname: e.dirname,
            enableDebugLogs: T,
            allowTriggerPanic: O.allowTriggerPanic,
            datamodelPath: rt.join(e.dirname, e.filename ?? 'schema.prisma'),
            prismaPath: O.binaryPath ?? void 0,
            engineEndpoint: O.endpoint,
            generator: e.generator,
            showColors: this._errorFormat === 'pretty',
            logLevel: f.log && co(f.log),
            logQueries:
              f.log &&
              !!(typeof f.log == 'string'
                ? f.log === 'query'
                : f.log.find((R) =>
                    typeof R == 'string' ? R === 'query' : R.level === 'query'
                  )),
            env: a?.parsed ?? {},
            flags: [],
            engineWasm: e.engineWasm,
            clientVersion: e.clientVersion,
            engineVersion: e.engineVersion,
            previewFeatures: this._previewFeatures,
            activeProvider: e.activeProvider,
            inlineSchema: e.inlineSchema,
            overrideDatasources: Li(f, e.datasourceNames),
            inlineDatasources: e.inlineDatasources,
            inlineSchemaHash: e.inlineSchemaHash,
            tracingHelper: this._tracingHelper,
            transactionOptions: {
              maxWait: f.transactionOptions?.maxWait ?? 2e3,
              timeout: f.transactionOptions?.timeout ?? 5e3,
              isolationLevel: f.transactionOptions?.isolationLevel,
            },
            logEmitter: i,
            isBundled: e.isBundled,
            adapter: s,
          }),
          (this._accelerateEngineConfig = {
            ...this._engineConfig,
            accelerateUtils: {
              resolveDatasourceUrl: Xt,
              getBatchRequestPayload: $t,
              prismaGraphQLToJSError: Wt,
              PrismaClientUnknownRequestError: J,
              PrismaClientInitializationError: I,
              PrismaClientKnownRequestError: Q,
              debug: ee('prisma:client:accelerateEngine'),
              engineVersion: So.version,
              clientVersion: e.clientVersion,
            },
          }),
          ve('clientVersion', e.clientVersion),
          (this._engine = Ni(e, this._engineConfig)),
          (this._requestHandler = new lr(this, i)),
          f.log)
        )
          for (let R of f.log) {
            let M =
              typeof R == 'string' ? R : R.emit === 'stdout' ? R.level : null
            M &&
              this.$on(M, (S) => {
                ot.log(`${ot.tags[M] ?? ''}`, S.message || S.query)
              })
          }
        this._metrics = new Be(this._engine)
      } catch (f) {
        throw ((f.clientVersion = this._clientVersion), f)
      }
      return (this._appliedParent = gt(this))
    }
    get [Symbol.toStringTag]() {
      return 'PrismaClient'
    }
    $use(n) {
      this._middlewares.use(n)
    }
    $on(n, i) {
      n === 'beforeExit'
        ? this._engine.onBeforeExit(i)
        : n && this._engineConfig.logEmitter.on(n, i)
    }
    $connect() {
      try {
        return this._engine.start()
      } catch (n) {
        throw ((n.clientVersion = this._clientVersion), n)
      }
    }
    async $disconnect() {
      try {
        await this._engine.stop()
      } catch (n) {
        throw ((n.clientVersion = this._clientVersion), n)
      } finally {
        kn()
      }
    }
    $executeRawInternal(n, i, o, s) {
      let a = this._activeProvider
      return this._request({
        action: 'executeRaw',
        args: o,
        transaction: n,
        clientMethod: i,
        argsMapper: Jr({ clientMethod: i, activeProvider: a }),
        callsite: xe(this._errorFormat),
        dataPath: [],
        middlewareArgsMapper: s,
      })
    }
    $executeRaw(n, ...i) {
      return this._createPrismaPromise((o) => {
        if (n.raw !== void 0 || n.sql !== void 0) {
          let [s, a] = Ro(n, i)
          return (
            Qr(
              this._activeProvider,
              s.text,
              s.values,
              Array.isArray(n)
                ? 'prisma.$executeRaw`<SQL>`'
                : 'prisma.$executeRaw(sql`<SQL>`)'
            ),
            this.$executeRawInternal(o, '$executeRaw', s, a)
          )
        }
        throw new G(
          "`$executeRaw` is a tag function, please use it like the following:\n```\nconst result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`\n```\n\nOr read our docs at https://www.prisma.io/docs/concepts/components/prisma-client/raw-database-access#executeraw\n",
          { clientVersion: this._clientVersion }
        )
      })
    }
    $executeRawUnsafe(n, ...i) {
      return this._createPrismaPromise(
        (o) => (
          Qr(
            this._activeProvider,
            n,
            i,
            'prisma.$executeRawUnsafe(<SQL>, [...values])'
          ),
          this.$executeRawInternal(o, '$executeRawUnsafe', [n, ...i])
        )
      )
    }
    $runCommandRaw(n) {
      if (e.activeProvider !== 'mongodb')
        throw new G(
          `The ${e.activeProvider} provider does not support $runCommandRaw. Use the mongodb provider.`,
          { clientVersion: this._clientVersion }
        )
      return this._createPrismaPromise((i) =>
        this._request({
          args: n,
          clientMethod: '$runCommandRaw',
          dataPath: [],
          action: 'runCommandRaw',
          argsMapper: Yi,
          callsite: xe(this._errorFormat),
          transaction: i,
        })
      )
    }
    async $queryRawInternal(n, i, o, s) {
      let a = this._activeProvider
      return this._request({
        action: 'queryRaw',
        args: o,
        transaction: n,
        clientMethod: i,
        argsMapper: Jr({ clientMethod: i, activeProvider: a }),
        callsite: xe(this._errorFormat),
        dataPath: [],
        middlewareArgsMapper: s,
      }).then(bo)
    }
    $queryRaw(n, ...i) {
      return this._createPrismaPromise((o) => {
        if (n.raw !== void 0 || n.sql !== void 0)
          return this.$queryRawInternal(o, '$queryRaw', ...Ro(n, i))
        throw new G(
          "`$queryRaw` is a tag function, please use it like the following:\n```\nconst result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`\n```\n\nOr read our docs at https://www.prisma.io/docs/concepts/components/prisma-client/raw-database-access#queryraw\n",
          { clientVersion: this._clientVersion }
        )
      })
    }
    $queryRawUnsafe(n, ...i) {
      return this._createPrismaPromise((o) =>
        this.$queryRawInternal(o, '$queryRawUnsafe', [n, ...i])
      )
    }
    _transactionWithArray({ promises: n, options: i }) {
      let o = el.nextId(),
        s = lo(n.length),
        a = n.map((f, b) => {
          if (f?.[Symbol.toStringTag] !== 'PrismaPromise')
            throw new Error(
              'All elements of the array need to be Prisma Client promises. Hint: Please make sure you are not awaiting the Prisma client calls you intended to pass in the $transaction function.'
            )
          let T =
              i?.isolationLevel ??
              this._engineConfig.transactionOptions.isolationLevel,
            C = { kind: 'batch', id: o, index: b, isolationLevel: T, lock: s }
          return f.requestTransaction?.(C) ?? f
        })
      return Ao(a)
    }
    async _transactionWithCallback({ callback: n, options: i }) {
      let o = { traceparent: this._tracingHelper.getTraceParent() },
        s = {
          maxWait: i?.maxWait ?? this._engineConfig.transactionOptions.maxWait,
          timeout: i?.timeout ?? this._engineConfig.transactionOptions.timeout,
          isolationLevel:
            i?.isolationLevel ??
            this._engineConfig.transactionOptions.isolationLevel,
        },
        a = await this._engine.transaction('start', o, s),
        f
      try {
        let b = { kind: 'itx', ...a }
        ;(f = await n(this._createItxClient(b))),
          await this._engine.transaction('commit', o, a)
      } catch (b) {
        throw (
          (await this._engine.transaction('rollback', o, a).catch(() => {}), b)
        )
      }
      return f
    }
    _createItxClient(n) {
      return gt(
        me(di(this), [
          H('_appliedParent', () => this._appliedParent._createItxClient(n)),
          H('_createPrismaPromise', () => Gr(n)),
          H(Za, () => n.id),
          $e(uo),
        ])
      )
    }
    $transaction(n, i) {
      let o
      typeof n == 'function'
        ? this._engineConfig.adapter?.adapterName === '@prisma/adapter-d1'
          ? (o = () => {
              throw new Error(
                'Cloudflare D1 does not support interactive transactions. We recommend you to refactor your queries with that limitation in mind, and use batch transactions with `prisma.$transactions([])` where applicable.'
              )
            })
          : (o = () =>
              this._transactionWithCallback({ callback: n, options: i }))
        : (o = () => this._transactionWithArray({ promises: n, options: i }))
      let s = { name: 'transaction', attributes: { method: '$transaction' } }
      return this._tracingHelper.runInChildSpan(s, o)
    }
    _request(n) {
      n.otelParentCtx = this._tracingHelper.getActiveContext()
      let i = n.middlewareArgsMapper ?? Xa,
        o = {
          args: i.requestArgsToMiddlewareArgs(n.args),
          dataPath: n.dataPath,
          runInTransaction: !!n.transaction,
          action: n.action,
          model: n.model,
        },
        s = {
          middleware: {
            name: 'middleware',
            middleware: !0,
            attributes: { method: '$use' },
            active: !1,
          },
          operation: {
            name: 'operation',
            attributes: {
              method: o.action,
              model: o.model,
              name: o.model ? `${o.model}.${o.action}` : o.action,
            },
          },
        },
        a = -1,
        f = async (b) => {
          let T = this._middlewares.get(++a)
          if (T)
            return this._tracingHelper.runInChildSpan(s.middleware, (L) =>
              T(b, (ne) => (L?.end(), f(ne)))
            )
          let { runInTransaction: C, args: O, ...R } = b,
            M = { ...n, ...R }
          O && (M.args = i.middlewareArgsToRequestArgs(O)),
            n.transaction !== void 0 && C === !1 && delete M.transaction
          let S = await xi(this, M)
          return M.model
            ? yi({
                result: S,
                modelName: M.model,
                args: M.args,
                extensions: this._extensions,
                runtimeDataModel: this._runtimeDataModel,
                globalOmit: this._globalOmit,
              })
            : S
        }
      return this._tracingHelper.runInChildSpan(s.operation, () => f(o))
    }
    async _executeRequest({
      args: n,
      clientMethod: i,
      dataPath: o,
      callsite: s,
      action: a,
      model: f,
      argsMapper: b,
      transaction: T,
      unpacker: C,
      otelParentCtx: O,
      customDataProxyFetch: R,
    }) {
      try {
        n = b ? b(n) : n
        let M = { name: 'serialize' },
          S = this._tracingHelper.runInChildSpan(M, () =>
            Ki({
              modelName: f,
              runtimeDataModel: this._runtimeDataModel,
              action: a,
              args: n,
              clientMethod: i,
              callsite: s,
              extensions: this._extensions,
              errorFormat: this._errorFormat,
              clientVersion: this._clientVersion,
              previewFeatures: this._previewFeatures,
              globalOmit: this._globalOmit,
            })
          )
        return (
          ee.enabled('prisma:client') &&
            (ve('Prisma Client call:'),
            ve(`prisma.${i}(${ri(n)})`),
            ve('Generated request:'),
            ve(
              JSON.stringify(S, null, 2) +
                `
`
            )),
          T?.kind === 'batch' && (await T.lock),
          this._requestHandler.request({
            protocolQuery: S,
            modelName: f,
            action: a,
            clientMethod: i,
            dataPath: o,
            callsite: s,
            args: n,
            extensions: this._extensions,
            transaction: T,
            unpacker: C,
            otelParentCtx: O,
            otelChildCtx: this._tracingHelper.getActiveContext(),
            globalOmit: this._globalOmit,
            customDataProxyFetch: R,
          })
        )
      } catch (M) {
        throw ((M.clientVersion = this._clientVersion), M)
      }
    }
    get $metrics() {
      if (!this._hasPreviewFlag('metrics'))
        throw new G(
          '`metrics` preview feature must be enabled in order to access metrics API',
          { clientVersion: this._clientVersion }
        )
      return this._metrics
    }
    _hasPreviewFlag(n) {
      return !!this._engineConfig.previewFeatures?.includes(n)
    }
    $applyPendingMigrations() {
      return this._engine.applyPendingMigrations()
    }
  }
  return t
}
function Ro(e, t) {
  return tl(e) ? [new X(e, t), no] : [e, io]
}
function tl(e) {
  return Array.isArray(e) && Array.isArray(e.raw)
}
u()
c()
m()
p()
d()
l()
var rl = new Set([
  'toJSON',
  '$$typeof',
  'asymmetricMatch',
  Symbol.iterator,
  Symbol.toStringTag,
  Symbol.isConcatSpreadable,
  Symbol.toPrimitive,
])
function ko(e) {
  return new Proxy(e, {
    get(t, r) {
      if (r in t) return t[r]
      if (!rl.has(r)) throw new TypeError(`Invalid enum value: ${String(r)}`)
    },
  })
}
u()
c()
m()
p()
d()
l()
l()
0 &&
  (module.exports = {
    Debug,
    Decimal,
    Extensions,
    MetricsClient,
    NotFoundError,
    PrismaClientInitializationError,
    PrismaClientKnownRequestError,
    PrismaClientRustPanicError,
    PrismaClientUnknownRequestError,
    PrismaClientValidationError,
    Public,
    Sql,
    defineDmmfProperty,
    empty,
    getPrismaClient,
    getRuntime,
    join,
    makeStrictEnum,
    objectEnumValues,
    raw,
    sqltag,
    warnEnvConflicts,
    warnOnce,
  })
//# sourceMappingURL=wasm.js.map
