const saman = require("../src/saman");

// Add comprehensive tests
test('saman.equal', () => {
    let obj1 = { x:10, y:20 };
    expect(saman.equal(obj1,obj1)).toEqual(true);
    expect(saman.equal(obj1, {})).toEqual(false);
    expect(saman.equal(obj1, false)).toEqual(false);
    expect(saman.equal([obj1,false], [obj1,true])).toEqual(false);
    expect(saman.equal([obj1,false], [obj1,false])).toEqual(true);
    expect(saman.equal([obj1,false,10], [10,obj1,false])).toEqual(false);
    expect(saman.equal([20,obj1,false,10], [20,obj1,false,10])).toEqual(true);
});

test('diff', () => {

});

test('diff2', () => {

});

test('cDiff', () => {

});

test("uDiff", () => {

});

test("dDiff", () => {

});

test("merge", () => {

});

// console.log(cDiff(obj1, { x:2, k:-3, z:30 }))


// console.log(uDiff(obj1, { x:10, y:20 }));
// console.log(uDiff(obj1, { x:-1, y:20 }));
// console.log(uDiff(obj1, { x:-1, y:2 }));
// console.log(uDiff(obj1, {}));


// console.log(dDiff(obj1, { x:20 }));
// console.log(dDiff(obj1, { y:20 }));
// console.log(dDiff(obj1, {}));

// let d1 = {
//     x:10,
//     y:20,
//     z:[10,20,30],
//     a: {
//         k:10,
//         j:20
//     }
// }

// console.log(dDiff(d1, { x:10, y:20, z:[10,20] }));
// console.log(dDiff(d1, { x:10, y:20, z:[10,20], a:{k:10, j:20 } }));

// let obj3 = {
//     x:10,
//     y:20,
//     z: {
//         e:100,
//         f:200,
//         j:[0,1]
//     },
//     k: [10,20,30]
// };

// let obj4 = {
//     x:10,
//     z: {
//         e:30,
//         f:200,
//         j:[0,1,4],
//         c:-5
//     },
//     k: [10]
// };

// console.log("---------here---------");
// console.log(JSON.stringify(diff(obj3,obj4),null,4));