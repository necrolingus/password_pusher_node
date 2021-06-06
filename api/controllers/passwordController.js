const db = require("../models/mainModel")
const cipherHandler = require("./cipherHandler")
const passwordModel = db.passwordModel
const Op = db.Sequelize.Op
const { v4: uuidv4 } = require('uuid');

//get the validator objects and such
const Validator = require('jsonschema').Validator
const schema = require('../config/jsonValidator');
const v = new Validator()
//done with validator object and such



exports.insertOne = (req, res) => {
    theBody = req.body
    validateOutcome = v.validate(theBody, schema)
  
    if (validateOutcome.errors.length >= 1){
        return res.status(400).json({
            status: 'error',
            error: validateOutcome.errors
        });
    }
    let dt = new Date()
    let dateOffset = new Date(dt.setMinutes(dt.getMinutes() + Math.abs(dt.getTimezoneOffset()))); 
    dateOffset.setHours(dt.getHours() + theBody.hoursToLive);
   
    uniqueId = uuidv4();
    theBody.uniqueId = uniqueId
    theBody.hoursToLive = dateOffset.toISOString()
    theBody.password = cipherHandler.encrypt(theBody.password)
   
    passwordModel.create(theBody)
        .then(data => {
            return res.status(200).json({
                status: 'good',
                outcome: uniqueId
            });
        })
        .catch(err => {
            return res.status(500).json({
                status: 'error',
                error: err.message || "Could not create the record"
            });
        })
    
};

exports.selectOne = (req, res) => {
    const uniqueId = req.params.uniqueId
    let dt = new Date()
    let dateOffset = new Date(dt.setMinutes(dt.getMinutes() + Math.abs(dt.getTimezoneOffset()))).toISOString();
    
    passwordModel.findOne({
        where: {uniqueId: uniqueId, 
                viewsToLive: {[Op.gte]: 0},
                hoursToLive: {[Op.gte]: dateOffset}
            }
        })
        .then(data => {
            //if nothing is found data is null so have to test for it
            if (data){
                data.decrement('viewsToLive', {by: 1});
                data.password = cipherHandler.decrypt(data.password);
            }             
            return res.status(200).json({
                status: 'good',
                outcome: data
            });
        })
        .catch(err => {
            return res.status(500).json({
                status: 'error',
                error: err.message || "Could not find the record"
            });
        })
};

exports.deleteOne = (req, res) => {
    const uniqueId = req.params.uniqueId
    passwordModel.destroy({
        where: {uniqueId: uniqueId}
        })
        .then(data => {
            return res.status(200).json({
                status: 'good',
                outcome: data
            });
        })
        .catch(err => {
            return res.status(500).json({
                status: 'error',
                error: err.message || "Could not find the record"
            });
        })
};

exports.deleteAllOld = () => {
    let dt = new Date()
    let dateOffset = new Date(dt.setMinutes(dt.getMinutes() + Math.abs(dt.getTimezoneOffset()))).toISOString();
    passwordModel.destroy({
        where: {
            [Op.or]: [
                {viewsToLive: {[Op.lte]: -1}},
                {hoursToLive: {[Op.lte]: dateOffset}}
            ]
        }
    })
    .then(data => {
        console.log('This many records deleted: ' + data)
        return data
    })
    .catch(err => {
        console.log(err)
        return err
    })

};