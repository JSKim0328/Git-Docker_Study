var obj = {
  p: 'hello',
  m: function () {
    console.log(this.p);
  }
}

module.exports = obj;