// The files to bundle
let files = ['index.js', 'treasure.js', 'dice.js'];

// Creates three files with the index.js code in it
export default files.map(function (file) {
	return {
		input: `src/index.js`,
		output: {
			file: file,
			format: 'iife'
		}
	};
});

// Creates one scripts.js file with the dice.js code in it
// export default files.map(function (file) {
// 	return {
// 		input: `src/${file}`,
// 		output: {
// 			file: 'scripts.js',
// 			format: 'iife'
// 		}
// 	};
// });