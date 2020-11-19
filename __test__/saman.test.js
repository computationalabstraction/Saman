const saman = require("../src/saman");

// Add more tests
test('saman.equal', () => {
    let obj1 = { x: 10, y: 20 };
    expect(saman.equal(obj1, obj1)).toEqual(true);
    expect(saman.equal(obj1, {})).toEqual(false);
    expect(saman.equal(obj1, false)).toEqual(false);
    expect(saman.equal([obj1, false], [obj1, true])).toEqual(false);
    expect(saman.equal([obj1, false], [obj1, false])).toEqual(true);
    expect(saman.equal([obj1, false, 10], [10, obj1, false])).toEqual(false);
    expect(saman.equal([20, obj1, false, 10], [20, obj1, false, 10])).toEqual(true);
});

test('diff', () => {
    let obj1 = { x: 1, y: 2 };
    let obj3 = {
        x: 10,
        y: 20,
        z: {
            e: 100,
            f: 200,
            j: [0, 1]
        },
        k: [10, 20, 30]
    };
    let obj4 = {
        x: 10,
        z: {
            e: 30,
            f: 200,
            j: [0, 1, 4],
            c: -5
        },
        k: [10]
    };
    expect(saman.diff(obj3, obj4)).toEqual({
        "y": 20,
        "k": {
            "1": 20,
            "2": 30
        },
        "z": {
            "j": {
                "2": 4
            },
            "c": -5,
            "e": 30
    }
    });
    expect(saman.diff(obj1, obj3)).toEqual({ z: { e: 100, f: 200, j: [0, 1] }, k: [10, 20, 30], x: 10, y: 20 });
    expect(saman.diff(obj1, obj4)).toEqual({ y: 2, z: { e: 30, f: 200, j: [0, 1, 4], c: -5 }, k: [10], x: 10 });
    expect(saman.diff(obj1, obj1)).toEqual({})
});

test('diff2', () => {

});

test('cDiff', () => {
    let obj1 = { x: 10, y: 20, z: [10, 20] };
    expect(saman.cDiff(obj1, { x: 2, k: -3, j: 30 }))
        .toEqual({ k: -3, j: 30 });
    expect(saman.cDiff(obj1, { i: 2, z: [10, 20, 30] }))
        .toEqual({ z: { 2: 30 }, i: 2 });
});

test("uDiff", () => {
    let obj1 = { x: 10, y: 20 };
    expect(saman.uDiff(obj1, { x: 10, y: 20 })).toEqual({});
    expect(saman.uDiff(obj1, { x: -1, y: 20 })).toEqual({ x: -1 });
    expect(saman.uDiff(obj1, { x: -1, y: 2 })).toEqual({ x: -1, y: 2 });
    expect(saman.uDiff(obj1, {})).toEqual({});
});

test("dDiff", () => {
    let obj1 = { x: 10, y: 20 };
    let d1 = {
        x: 10,
        y: 20,
        z: [10, 20, 30],
        a: {
            k: 10,
            j: 20
        }
    }
    expect(saman.dDiff(obj1, { x: 20 })).toEqual({ y: 20 });
    expect(saman.dDiff(obj1, { y: 20 })).toEqual({ x: 10 });
    expect(saman.dDiff(obj1, {})).toEqual({ x: 10, y: 20 });
    expect(saman.dDiff(d1, { x: 10, y: 20, z: [10, 20] }))
        .toEqual({ z: { '2': 30 }, a: { k: 10, j: 20 } });
    expect(saman.dDiff(d1, { x: 10, y: 20, z: [10, 20], a: { k: 10, j: 20 } }))
        .toEqual({ z: { '2': 30 } });
});

test("merge", () => {
    let obj1 = { x: 10, y: 20, z: [10, 20] };
    expect(saman.merge(obj1, { z: 30 })).toEqual({ x: 10, y: 20, z: 30 });
    expect(saman.merge(obj1, { z: [10, 20, 40], k: 30 }))
        .toEqual({ x: 10, y: 20, z: { 0: 10, 1: 20, 2: 40 }, k: 30 });
});