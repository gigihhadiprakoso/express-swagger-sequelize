var helper = require('../helpers/general');

var db = require('../config/database');
var Users = db.users;


exports.signin = (req, res) => {
    Users.findOne({
            where: {username: req.body.username},
            attributes: ['username', 'password', 'id_user', 'name', 'email']
        }) 
        .then((data) => {
            if(!data){
                res.status(404).send({
                    error_msg: 'Username or password not match',
                    data: null
                });
            }

            if(!helper.isPasswordMatch(req.body.password, data.password)){
                res.status(404).send({
                    error_msg: 'Username or password not match',
                    data: null
                });
            }

            var token = {
                username: data.username,
                id: data.id_user,
                name: data.name,
                email: data.email,
                iat: Date.now()
            }

            res.send({
                error_msg: '',
                data: {
                    token: helper.generateAccessToken(token)
                }
            });

        })
        .catch((error) => {
            res.status(500).send({
                error_msg: (error.message || 'Error database'),
                data: null
            });
        });
}

exports.enroll = async (req, res) => {
    if(!helper.isFormatEmail(req.body.email)){
        return res.status(400).send({
            error_msg: 'Format email invalid',
            data: null
        });
    }
    
    var passwordEncrypted = await helper.encryptPass(req.body.password);
    var record = {
        name: req.body.name,
        username: req.body.username,
        password: passwordEncrypted,
        email: req.body.email,
        updated_by: 0,
        created_by: 0,
        is_deleted: 0,
        created_date: Date.now()
    }

    Users.create(record)
        .then( (data) => {
            res.send({
                error_msg:'',
                data:{
                    id_user: data.id_user
                }
            });
        })
        .catch((error) => {
            res.status(500).send({
                error_msg: (error.message || 'Error database'),
                data: null
            });
        })
}