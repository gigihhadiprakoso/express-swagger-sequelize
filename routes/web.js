var express = require('express');
var router = express.Router();
var path = require('path');
var multer = require('multer');

var storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, './public/images');
    },
    filename: function(req, file, callback) {
        callback(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
    }
});

var upload = multer({
    storage: storage,
    fileFilter: (req, file, callback) => {
        const filetypes = /jpeg|jpg|png|gif/;
        
        var extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        var mimetype = filetypes.test(file.mimetype);
        if(mimetype && extname) {
            return callback(null,true);
        } else {
            callback('Error: Images Only!');
        }
    }
});

var {authMiddleware} = require('../middleware');
var eventController = require('../controllers/event.controller');
var authController = require('../controllers/auth.controller');


/**
 * This function comment is parsed by doctrine
 * @route POST /login
 * @group Authentications - Operations about user
 * @param {string} username.formData.required - username - eg: user@domain
 * @param {password} password.formData.required - user's password.
 * @returns {object} 200 - An object contain token for access other API endpoint
 * @returns {Error}  default - Unexpected error
 */
router.post('/login', upload.none(), authController.signin)

/**
 * This function comment is parsed by doctrine
 * @route POST /register
 * @group Authentications - Operations about user
 * @param {string} name.formData.required - fullname of user
 * @param {string} username.formData.required - username
 * @param {string} password.formData.required - user's password.
 * @param {string} email.formData.required - user's email - eg: user@email.com
 * @returns {object} 200 - An object contain id_user of user have been created
 * @returns {Error}  default - Unexpected error
 */
router.post('/register', upload.none(), authController.enroll)

router.use(authMiddleware);

/**
 * This function comment is parsed by doctrine
 * @route GET /img/{filename}
 * @group Image - Operations about show image
 * @param {string} filename.path.required - file's name of image
 * @returns {object} 200 - An object contain id_user of user have been created
 * @returns {Error}  default - Unexpected error
 */
router.get('/img/:filename', eventController.showImg);

/**
 * This function comment is parsed by doctrine
 * @route GET /event/{id}
 * @group Events - Operations about event
 * @param {string} id.path.required - id of event
 * @returns {object} 200 - An object contain id_user of user have been created
 * @returns {Error}  default - Unexpected error
 */
router.get('/event/:id', eventController.retrieve);

/**
 * This function comment is parsed by doctrine
 * @route GET /event
 * @group Events - Operations about event
 * @returns {object} 200 - An object contain token for access other API endpoint
 * @returns {Error}  default - Unexpected error
 */
router.get('/event', eventController.retrieve);

/**
 * This function comment is parsed by doctrine
 * @route POST /event
 * @group Events - Operations about user
 * @param {string} name.formData.required - event's name
 * @param {string} location.formData.required - location
 * @param {string} start_date.formData.required - satart date
 * @param {string} end_date.formData.required - end date
 * @param {string} price.formData.required - price
 * @param {string} image.formData.required - image
 * @returns {object} 200 - An object contain id_user of user have been created
 * @returns {Error}  default - Unexpected error
 */
router.post('/event', upload.single('image'), eventController.create);

/**
 * This function comment is parsed by doctrine
 * @route PUT /event/{id}
 * @group Events - Operations about user
 * @param {string} id.path.required - id of event
 * @returns {object} 200 - An object contain id_user of user have been created
 * @returns {Error}  default - Unexpected error
 */
router.put('/event/:id', upload.single('image'), eventController.edit)

/**
 * This function comment is parsed by doctrine
 * @route DELETE /event/{id}
 * @group Events - Operations about user
 * @param {string} id.path.required - id of event
 * @returns {object} 200 - An object contain id_user of user have been created
 * @returns {Error}  default - Unexpected error
 */
router.delete('/event/:id', eventController.delete)

module.exports = router

/*var {authMiddleware} = require('../middleware');
var eventController = require('../controllers/event.controller');
var authController = require('../controllers/auth.controller');

module.exports = (app) => {
    app.use((req, res, next) => {
        next();
    });
    app.post('/register', authController.enroll)
    app.post('/login', authController.signin)

    app.get('/event/:id', [], eventController.retrieve)
    app.post('/event', [], eventController.create)
    app.put('/event/:id', [], eventController.edit)
    app.delete('/event/:id', [], eventController.delete)
}*/