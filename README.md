<div align="center">
<img src="./static/saman.png" height="150em" width="300em"/>

## Saman

</div>

Saman(समान) is a deep object diffing and equality checker for Javascript. The library is concise and has about 7 functions and the distribution size is 659 bytes(Gzipped). 

#### `Example Code`
```javascript
const { diff } = require("saman");

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

console.log(diff(obj1,obj2));
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
### Browser Optimized (gzipped)
```
<script src="https://unpkg.com/vachan/dist/browser/saman.min.js.gz"></script>
```

## Documentation
> Underconstruction

#### `saman.equal(obj1: Object, obj2: Object) -> Object`
...

#### `saman.cDiff(obj1: Object, obj2: Object) -> Object`
...

#### `saman.uDiff(obj1: Object, obj2: Object) -> Object`
...

#### `saman.dDiff(obj1: Object, obj2: Object) -> Object`
...

#### `saman.diff(obj1: Object, obj2: Object) -> Object`
...

#### `saman.diff2(obj1: Object, obj2: Object) -> Object`
...

#### `saman.merge(obj1: Object, obj2: Object) -> Object`
...