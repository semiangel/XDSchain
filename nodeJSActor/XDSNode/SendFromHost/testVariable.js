var a = 0;
var b = 0;

function test () {
    console.log('test1=' + a.toString());
    a = a + 10;
    test2();
}

function test2 () {
    console.log('test2=' + a.toString());
}

test();
a = a + 1;
test();
a = a + 2;
test();