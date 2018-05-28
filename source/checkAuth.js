module.exports = function (req, res, next) {
	// console.log(req.session)
	if(!req.session.user) {
		res.redirect('/login')
	} else next()
}