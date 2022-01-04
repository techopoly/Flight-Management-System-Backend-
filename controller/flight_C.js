const { validationResult } = require("express-validator/check");

const user_M = require("../model/user_M");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");
const flight_M = require("../model/flight_M");

const createAccountController = async (req, res, next) => {
  console.log(req.body.username);
  username = req.body.username;
  email = req.body.email;
  password = req.body.password;

  const account = new flight_M.Account(username, email, password);
  const result = await account.createAccount();
  res.status(200).json({
    message: "user created",
    data: result,
  });
};

const searchFlightController = async (req, res, next) => {
  const destination = req.body.destination;
  const start_date = req.body.start_date;
  console.log(start_date);

  const result = await flight_M.Account.searchFlight(destination);
  res.status(200).json({
    message: "successfull",
    data: result,
  });
};

const allFlightController = async (req, res, next) => {
  const result = await flight_M.Account.allFlight();
  res.status(200).json({
    message: "successfull",
    data: result,
  });
};

const addFlightController = async (req, res, next) => {
  const destination = req.body.destination;
  const start_time = "2021-03-10";
  const seats = req.body.seats;
  const price = req.body.price;
  console.log(start_time);
  id = req.id;

  const result = await flight_M.Account.addFlight(
    destination,
    start_time,
    seats,
    price,
    id
  );
  res.status(200).json({
    message: "successfull",
    data: result,
  });
};

const deleteFlightController = async (req, res, next) => {
  const flight_no = req.body.flight_no;
  console.log(flight_no);

  const result = await flight_M.Account.deleteFlight(flight_no);
  res.status(200).json({
    message: "successfull",
    data: result,
  });
};

const updateFlightController = async (req, res, next) => {
  const flight_no = req.body.flight_no;
  const seats = req.body.seats;
  console.log('flight_no: ',flight_no);

  const result = await flight_M.Account.updateFlight(flight_no, seats);
  res.status(200).json({
    message: "successfull",
    data: result,
  });
};

const bookFlightController = async (req, res, next) => {
  pass_id = req.body.pass_id;
  const flight_no = req.body.flight_no;
  const seats = req.body.seats;
  console.log(flight_no);

  const result = await flight_M.Account.bookFlight(pass_id, flight_no, seats);
  res.status(200).json({
    message: "successfull",
    data: result,
  });
};

const fetchPassDetailsController = async (req, res, next) => {
  id = req.id;
  console.log('id: ',req.id);

  const result = await flight_M.Account.fetchPassDetails(id);
  res.status(200).json({
    message: "successfull",
    data: result,
  });
};
const fetchPassDetailsControllerUser = async (req, res, next) => {
  //   pass_id = req.pass_id;
  pass_id = req.body.pass_id;
  console.log(req.body.header);

  const result = await flight_M.Account.fetchPassDetails(pass_id);
  res.status(200).json({
    message: "successfull",
    data: result,
  });
};

const fetchPassDetailsCanceledController = async (req, res, next) => {
  pass_id = req.body.pass_id;
  console.log(pass_id);

  const result = await flight_M.Account.fetchPassDetailsCanceled(pass_id);
  res.status(200).json({
    message: "successfull",
    data: result,
  });
};

const loginController = async (req, res, next) => {
  email = req.body.email;
  password = req.body.password;

  const result = await flight_M.Account.login(email, password);
  let id;
  if (result.result.pass_id) {
    id = result.result.pass_id;
    console.log(result.result.pass_id);
  } else {
    id = result.result.admin_id;
    console.log("admin_id ", result.result.admin_id);
  }

  if (result) {
    const token = jwt.sign(
      {
        id: id,
        password: password,
      },
      "privateKey",
      { expiresIn: "1h" }
    );
    res.status(200).json({
      token: token,
      message: "user logged in",
      data: result,
      id: id,
    });
  }
};

const cancelBookedFlightController = async (req, res, next) => {
    let id = req.id;
    let flight_no = req.body.flight_no;
    let pass_id = req.body.pass_id
    console.log(flight_no)
    console.log('id: ', req.id);
  
    const result = await flight_M.Account.cancelBookedFlight(id, flight_no,pass_id);
    res.status(200).json({
      message: "successfull",
      data: result,
    });
  };

exports.cancelBookedFlightController = cancelBookedFlightController  
exports.allFlightController = allFlightController;
exports.loginController = loginController;
exports.fetchPassDetailsCanceledController = fetchPassDetailsCanceledController;
exports.fetchPassDetailsControllerUser = fetchPassDetailsControllerUser;
exports.fetchPassDetailsController = fetchPassDetailsController;
exports.bookFlightController = bookFlightController;
exports.updateFlightController = updateFlightController;
exports.deleteFlightController = deleteFlightController;
exports.addFlightController = addFlightController;
exports.createAccountController = createAccountController;
exports.searchFlightController = searchFlightController;
