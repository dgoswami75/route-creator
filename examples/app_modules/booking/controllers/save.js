//some 'save' controller code.

function main(req, res){
	console.log('This is shipping.save handler function. Specify this as the main function in the module.exports object.');
	res.json({success: 'shipping/save invoked'});
}

module.exports = {
	main: main
}