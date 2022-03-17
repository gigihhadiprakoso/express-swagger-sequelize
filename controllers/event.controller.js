const db = require('../config/database');
const Events = db.events;
var path = require('path');

exports.create = (req, res) => {
    var record = {
        name: req.body.name,
        location: req.body.location,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        price: req.body.price,
        image_name: req.file.filename,
        updated_by: req.decodedToken.id,
        created_by: req.decodedToken.id,
        is_deleted: false,
        created_date: Date.now()
    }
    Events.create(record)
    .then( data => {
        res.send({
            error_msg: '',
            data:{
                id_event: data.id_event
            }
        });
    })
    .catch(error => {
        res.status(500)
            .send({
                error_msg: (error.message || 'Error database'),
                data: null
            });
    });
}

exports.retrieve = (req, res) => {
    if(req.params.id){
        var id = req.params.id;
        Events.findOne({ 
                where: { id_event:id, is_deleted:false, created_by: req.decodedToken.id},
                attributes: { exclude: db.excludeSelect }
            })
            .then(data => {
                res.send({
                    error_msg: '',
                    data: data
                });
            })
            .catch(error => {
                res.status(500)
                    .send({
                        error_msg: (error.message || 'Error database'),
                        data: null
                    });
            });
    } else {
        Events.findAll({
                where: {is_deleted:false, created_by: req.decodedToken.id},
                attributes: {exclude: db.excludeSelect}
            })
            .then(data => {
                console.log(data)
                res.send({
                    error_msg: '',
                    data: data
                })
            })
            .catch(error => {
                res.status(500)
                    .send({
                        error_msg: (error.message || 'Error database'),
                        data: {}
                    });
            });
    }
}

exports.edit = (req, res) => {
    if(!req.params.id){
        res.status(400).send({
            error_msg: 'ID not found',
            data: null
        });
    }

    var record = {
        name: req.body.name,
        location: req.body.location,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        price: req.body.price,
        updated_by: req.decodedToken.id
    }

    if(req.file !== undefined){
        record.image_name = req.file.filename
    }

    Events.update(record,{
            where: { id_event:req.params.id }
        })
        .then( data => {
            res.send({
                error_msg:'',
                data: {
                    id_event: req.params.id
                }
            })
        })
        .catch( error => {
            res.status(500)
                .send({
                    error_msg: (error.message || 'Error database'),
                    data: null
                });
        });
}

exports.delete = (req, res) => {
    if(!req.params.id){
        res.status(400)
            .send({
                error_msg: 'ID not found',
                data: null
            });
    }

    var record = {is_deleted: true, updated_by: req.decodedToken.id}
    Events.update(record, {
            where: {id_event: req.params.id}
        })
        .then((data) => {
            res.send({
                error_msg:'',
                data: {
                    id_event: req.params.id
                }
            })
        })
        .catch(error => {
            res.status(500)
                .send({
                    error_msg: (error.message || 'Error database'),
                    data: null
                });
        });
}

exports.showImg = (req, res) => {
    const { filename } = req.params;
    const dirname = path.resolve();
    const fullfilepath = path.join(dirname, './public/images/' + filename);
    return res.sendFile(fullfilepath);
}