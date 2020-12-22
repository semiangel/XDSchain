function fun1(req, res){
  return request.get('http://localhost:3000')
   .catch((err) =>{
     console.log('found error');
}).then((res) =>{
   console.log('get request returned.');
});