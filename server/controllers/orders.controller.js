const express = require('express');
const mongoose = require('mongoose');
const Order = require('../models/order.model');




module.exports.createOne = (req,res)=>{
    Order.create(req.body)
        .then(x => res.json( x ))
        .catch(err => res.json(err));
}


module.exports.getAll = (req, res) => {
    Order.find({})
        .then(Orders => res.json(Orders))
        .catch(err => res.json(err));
};


module.exports.getOne = (req, res) => {
    Order.find({ customer:req.params.customer })
        .then(prod => {
            res.json(prod), console.log(customer)})
        .catch(err => res.json(err));
        
};
module.exports.updateOne = (req, res) => {
    Order.findOneAndUpdate({ customer: req.params.id }, req.body, { new: true, runValidators: true })
        .then(updated => res.json(updated))
        .catch(err => res.json(err));
};

module.exports.deleteOne = (req, res) => {
    Order.findByIdAndDelete({ _id: req.params.id })
        .then(deleted => res.json(deleted))
        .catch(err => res.json(err));
};

