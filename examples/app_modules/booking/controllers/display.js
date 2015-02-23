//some 'display' controller code.

function main2(req, res){
	console.log('This is shipping.display handler function. Specify this as the main function in the module.exports object.');
	res.json({success: 'shipping/display invoked'});
}

function helper1() {
	console.log('I am a private helper function. So, dont export me')
}

module.exports = {
	main: main2,
	args: 'cid/city'
}
