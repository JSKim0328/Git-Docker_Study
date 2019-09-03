var argv = process.argv;

if (argv.length < 3) {
  console.log('입력값이 존재하지 않습니다.');
} else {
  for (var i = 2; i < argv.length; ++i) {
    console.log(argv[i]);
  }
}