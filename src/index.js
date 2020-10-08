// Polyfill from MDN
if (!Object.is) {
    Object.defineProperty(Object, "is", {
      value: function (x, y) {
        // SameValue algorithm
        if (x === y) { // Steps 1-5, 7-10
          // Steps 6.b-6.e: +0 != -0
          return x !== 0 || 1 / x === 1 / y;
        } else {
          // Step 6.a: NaN == NaN
          return x !== x && y !== y;
        }
      }
    });
  }

function arrayEquality(a1, a2) {
    if(a1.length != a2.length) return false;
    let isEqual = false;
    for (let i in a1) isEqual = check(a1[i],a2[i]);
    return isEqual;
}

function objectEquality(o1, o2) {   
    let f1 = Object.getOwnPropertyNames(o1);
    let f2 = Object.getOwnPropertyNames(o2);
    if(f1.length != f2.length) return false;
    let isEqual = false;
    for(let p1 of f1) for(let p2 of f2) p1 == p2 && (isEqual = check(o1[p1],o2[p2]));
    return isEqual;
}

function check(a, b) {
    if (Object.is(a,b)) return true;
    else if (Array.isArray(a) && Array.isArray(b)) return arrayEquality(a, b);
    else if (typeof a == "object" && typeof b == "object") return objectEquality(a,b);
    return false;
}

function uDiff(oo,no) {
    let f1 = Object.getOwnPropertyNames(oo);
    let updated = {};
    for(let p1 of f1) 
        oo[p1] != no[p1] && no[p1] != undefined && (updated[p1]=no[p1])
    return updated;
}

function dDiff(oo,no) {
    return Object.getOwnPropertyNames(oo)
            .reduce((d,p) => {
                (no[p] === undefined) && (d[p]=oo[p]);
                return d;
            }, {});
}

function cDiff(oo,no) {
    // let f1 = Object.getOwnPropertyNames(oo);
    let f2 = Object.getOwnPropertyNames(no);
    let created = {};
    for(let p2 of f2) 
         oo[p2] == undefined && (created[p2]=no[p2])
    return updated;
}

function diff(oo,no) {

}

let obj1 = { x:10, y:20 };

console.log(check(obj1,obj1));
console.log(check(obj1, {}));
console.log(check(obj1, false));
console.log(check([obj1,false], [obj1,true]));
console.log(check([obj1,false], [obj1,false]));
console.log(check([obj1,false,10], [10,obj1,false]));
console.log(check([20,obj1,false,10], [20,obj1,false,10]));

console.log(uDiff(obj1, { x:10, y:20 }));
console.log(uDiff(obj1, { x:-1, y:20 }));
console.log(uDiff(obj1, { x:-1, y:2 }));
console.log(uDiff(obj1, {}));


console.log(dDiff(obj1, { x:20 }));
console.log(dDiff(obj1, { y:20 }));
console.log(dDiff(obj1, {}));