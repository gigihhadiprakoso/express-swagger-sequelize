require('dotenv').config()

var jwt = require("jsonwebtoken");
// var config = require("../config/auth.config.js");
var db = require("../config/database");
var User = db.user;

verifyToken = (req, res, next) => {
	var bearerToken = req.headers.authorization.split(' ');
	var token = bearerToken[1];

	if (!token || bearerToken[0] !== 'Bearer') {
		return res.status(403).send({
			message: "No token provided!"
		});
	}
	
	jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
		if (err) {
			return res.status(401).send({
				message: "Unauthorized!"
			});
		}
		req.decodedToken = decoded;
		next();
	});
};

module.exports = verifyToken;