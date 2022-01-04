const express = require('express');
const flight_C = require('../controller/flight_C');
const isAuth = require('../middleware/is-auth');




const router = express.Router();


router.post('/createAccount', flight_C.createAccountController)
router.post('/searchFlight',flight_C.searchFlightController)
router.post('/allFlight',flight_C.allFlightController)
router.post('/addFlight',isAuth, flight_C.addFlightController) //isAuth,
router.post('/deleteFlight',isAuth,  flight_C.deleteFlightController)
router.post('/updateFlight',isAuth, flight_C.updateFlightController)
router.post('/bookflight',  flight_C.bookFlightController)
router.post('/fetchPassDetails',isAuth,  flight_C.fetchPassDetailsController)
router.post('/fetchPassDetailsUser', flight_C.fetchPassDetailsControllerUser)
router.post('/fetchPassDetailsCanceled',  flight_C.fetchPassDetailsCanceledController)
router.post('/login',flight_C.loginController);
router.post('/cancelBookedFlight',isAuth, flight_C.cancelBookedFlightController)


module.exports = router;