//const User = require('./auth-dao');
const User = require('./auth-model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET_KEY = 'secretkey123456';

exports.createUser = (req, res, next) => {
	const newUser = {
		name: req.body.name,
		email: req.body.email,
		password: bcrypt.hashSync(req.body.password)
	};
	const u = new User(newUser);
	u.save((err, user) => {
		// User.create(newUser, (err, user)=>{
		//console.log('XXXXXX', err);
		if (err && err.code === 11000) return res.status(409).send('Email already exists');
		if (err) return res.status(500).send('Server error');
		/*const expiresIn = 24 * 60 * 60;
		const accessToken = jwt.sign({ id: user.id }, SECRET_KEY, {
			expiresIn: expiresIn
		});
		const dataUser = {
			name: user.name,
			email: user.email,
			accessToken: accessToken,
			expiresIn: expiresIn
		};*/
		//response frontend
		//res.send({ dataUser });
		res.json({response: 'Te has registrado con exito, ahora sólo debes iniciar sesión'});
	});
};

exports.loginUser = (req, res, next) => {
	const userData = {
		email: req.body.email,
		password: req.body.password
	};
	User.findOne({ email: userData.email }, (err, user) => {
		if (err) return res.status(500).send('Server error');
		if (!user) {
			// email no existe
			res.status(409).send({ response: 'Something is wrong' });
		} else {
			// comparar la contraseña ingresada por el usuario con la que viene por base de datos
			const resultPassword = bcrypt.compareSync(userData.password, user.password);
			if (resultPassword) {
				const expiresIn = 24 * 60 * 60;
				const accessToken = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: expiresIn });
				res.json({ name: user.name,
					email: user.email,
					accessToken: accessToken,
					expiresIn: expiresIn });
			} else {
				//password incorrecta
				res.status(409).json({ response: 'mail or password incorrect' });
			}
		}
	});
};

exports.validarToken = (req, res, next) => {
	jwt.verify(req.headers.authorization, SECRET_KEY, (err) => {
		if (err) {
			res.status(401).json(); // token invalido o vencido
		}else return next();
	});
};
