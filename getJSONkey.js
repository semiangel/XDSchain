result={"key1":"value1","key2":"value2"}

console.log(result);

var kKeys = Object.keys(result);
console.log(kKeys);
for (var i = 0; i < kKeys.length; i++) {
  console.log(kKeys[i]);
}