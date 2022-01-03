const express = require('express');
const flight_C = require('../controller/flight_C');




const router = express.Router();


router.post('/createAccount', flight_C.createAccountController)
router.get('/searchFlight', flight_C.searchFlightController)
router.post('/addFlight',flight_C.addFlightController)
router.post('/deleteFlight', flight_C.deleteFlightController)
router.post('/updateFlight', flight_C.updateFlightController)
router.post('/bookflight', flight_C.bookFlightController)
router.post('/fetchPassDetails', flight_C.fetchPassDetailsController)
router.post('/fetchPassDetailsCanceled', flight_C.fetchPassDetailsCanceledController)


module.exports = router;