const { validationResult } = require("express-validator/check");

const user_M = require("../model/user_M");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");
const flight_M = require('../model/flight_M');


const createAccountController = async (req, res, next) => {
  console.log(req.body.username);
  username = req.body.username;
  email = req.body.email;
  password = req.body.password;
  
    const account = new flight_M.Account(username, email, password);
    const result = await account.createAccount();
    res.status(200).json({
      message: "user created",
      data: result
    });
}

const searchFlightController = async (req, res, next)=>{
    const destination = req.body.destination;
    const start_date = req.body.start_date;
    console.log( start_date)
    
    const result = await flight_M.Account.searchFlight(destination, start_date)
    res.status(200).json({
        message: 'successfull',
        data: result
    })
}

const addFlightController = async(req, res, next)=>{
    const destination = req.body.destination;
    const start_time = req.body.start_time;
    const seats = req.body.seats
    const price = req.body.price
    console.log( start_time)
    
    const result = await flight_M.Account.addFlight(destination, start_time, seats, price)
    res.status(200).json({
        message: 'successfull',
        data: result
    })
}

const deleteFlightController = async(req, res, next)=>{
    const flight_no = req.body.flight_no
    console.log( flight_no)
    
    const result = await flight_M.Account.deleteFlight(flight_no)
    res.status(200).json({
        message: 'successfull',
        data: result
    })
}

const updateFlightController = async(req, res, next)=>{
    const flight_no = req.body.flight_no
    const seats = req.body.seats
    console.log( flight_no)
    
    const result = await flight_M.Account.updateFlight(flight_no, seats)
    res.status(200).json({
        message: 'successfull',
        data: result
    })
}

const bookFlightController = async(req, res, next)=>{
    pass_id = req.body.pass_id
    const flight_no = req.body.flight_no
    const seats = req.body.seats
    console.log( flight_no)
    
    const result = await flight_M.Account.bookFlight(pass_id,flight_no, seats)
    res.status(200).json({
        message: 'successfull',
        data: result
    })
}

const fetchPassDetailsController = async(req, res, next)=>{
    pass_id = req.body.pass_id
    console.log( pass_id)
    
    const result = await flight_M.Account.fetchPassDetails(pass_id)
    res.status(200).json({
        message: 'successfull',
        data: result
    })
}


const fetchPassDetailsCanceledController = async(req, res, next)=>{
    pass_id = req.body.pass_id
    console.log( pass_id)
    
    const result = await flight_M.Account.fetchPassDetailsCanceled(pass_id)
    res.status(200).json({
        message: 'successfull',
        data: result
    })
}


exports.fetchPassDetailsCanceledController = fetchPassDetailsCanceledController
exports.fetchPassDetailsController = fetchPassDetailsController
exports.bookFlightController= bookFlightController
exports.updateFlightController = updateFlightController
exports.deleteFlightController = deleteFlightController
exports.addFlightController = addFlightController
exports.createAccountController = createAccountController
exports.searchFlightController = searchFlightController