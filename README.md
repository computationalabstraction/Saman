<div align="center">
<img src="./static/saman.png" height="155em" width="318em"/>
</div>
<hr/>

Saman(समान) is a deep object diffing and equality checker for Javascript. The library is concise consisting of only 6 functions and the distribution size is 659 bytes(Gzipped). 

#### `Example Code`
```javascript
const { equal, diff2 } = require("saman");

let obj1 = {
    i:10,
    j:-3,
    y:[-1,-3]
};

let obj2 = {
    r:76,
    e:23,
    i:4,
    y:[1,2,-7]
};

let obj3 = { m: "hello", n:"bye" };

console.log(equal(obj3,obj3)); // -> True
console.log(diff2(obj1,obj2)); // ->
/*
{
  created: { r: 76, e: 23, y: { '2': -7 } },
  updated: { i: 4, y: { '0': 1, '1': 2 } },
  deleted: { j: -3 }
} 
*/
```

## Installation

### Node
```
npm i saman
```
### Browser
```
<script src="https://unpkg.com/saman"></script>
```

## Documentation
> Underconstruction!

#### `saman.equal(obj1: Object, obj2: Object) -> Boolean`
This function recursively checks every property of both the objects for equality and returns a boolean.

```javascript
const { equal } = require("saman");

const obj1 = { x:10, y:20 };
const obj2 = { x:-1, y:2 };

console.log(equal(obj1,obj2)) // -> false
console.log(equal(obj1,obj1)) // -> true
console.log(equal(obj2,obj2)) // -> true
```

#### `saman.cDiff(obj1: Object, obj2: Object) -> Object`
This function recursively checks and reports every new property created in `obj2` w.r.t.`obj1` and returns an object which contains all the newly created props.

```javascript
const { cDiff } = require("saman");

const obj1 = { x:10, y:20 };
const obj2 = { x:-1, y:2, z:30 };

console.log(cDiff(obj1,obj2)) // -> { z:30 }
```

#### `saman.uDiff(obj1: Object, obj2: Object) -> Object`
This function recursively checks and reports every updated property in `obj2` w.r.t.`obj1` and returns an object which contains all the updated props.

```javascript
const { uDiff } = require("saman");

const obj1 = { x:10, y:20 };
const obj2 = { x:10, y:-7, z:30 };

console.log(uDiff(obj1,obj2)) // -> { y:-7 }
```

#### `saman.dDiff(obj1: Object, obj2: Object) -> Object`
This function recursively checks and reports every deleted property in `obj2` w.r.t.`obj1` and returns an object which contains all the deleted  props.

```javascript
const { dDiff } = require("saman");

const obj1 = { x:10, y:20 };
const obj2 = { y:-7 };

console.log(dDiff(obj1,obj2)) // -> { x:10 }
console.log(dDiff(obj1,obj1)) // -> {}
```

#### `saman.diff(obj1: Object, obj2: Object) -> Object`
This function recursively checks and reports every created, updated and deleted properties in `obj2` w.r.t.`obj1` and returns an object which contains all the created, updated and deleted props.

```javascript
const { diff } = require("saman");

const obj1 = { x:10, y:20, z:30 };
const obj2 = { x:2, y:-7 };

console.log(diff(obj1,obj2)) // -> { x:2, y:-7, z:30 }
```

#### `saman.diff2(obj1: Object, obj2: Object) -> Object`
This function is similar to `saman.diff` but instead of returning created, updated and deleted props all-together merged in one object without delineation, `saman.diff2` returns an object with 3 props: `created`, `updated` and `deleted` which contain those props respectively.

```javascript
const { diff2 } = require("saman");

const obj1 = { x:10, y:20, z:30 };
const obj2 = { x:2, y:-7 };

console.log(diff2(obj1,obj2)) 
// -> { created:{}, updated: {x:2, y:-7}, deleted: {z:30} }
```
