const db = require("../util/database");

class Account {
  constructor(username, email, password) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.pass_id;
  }

  createAccount = async () => {
    try {
      const result = await db.execute(
        //   INSERT INTO account (email, username, password) VALUES ('$e', '$u', '$p')
        "INSERT INTO account ( username, email, password) VALUES(?,?,?)",
        [this.username, this.email, this.password]
      );
      //   console.log(result);
      //   this.pass_id = result[0].pass_id;
      //   console.log(this);

      return {
        result: result[0],
      };
    } catch (err) {
      console.log(err);
    }
  };

  static searchFlight = async (destination, start_time) => {
    try {
      const result = await db.execute(
        `select * from flights where destination=? AND start_time=?`,
        [destination, start_time]
      ); //srtat_time= y/m/d
      console.log(result[0]);
      return result[0];
    } catch (err) {
      console.log(err);
    }
  };

  static addFlight = async (destination, start_time, seats, price) => {
    try {
      const result = await db.execute(
        `INSERT INTO flights (destination, start_time, seats, price) VALUES (?,?,?,?)`,
        [destination, start_time, seats, price]
      ); //srtat_time= y/m/d
      console.log(result[0]);
      return result[0];
    } catch (err) {
      console.log(err);
    }
  };

  static deleteFlight = async (flight_no) => {
    try {
      const result = await db.execute(
        `DELETE FROM flights WHERE flight_no=${flight_no}`
      ); //srtat_time= y/m/d
      console.log(result[0]);
      return result[0];
    } catch (err) {
      console.log(err);
    }
  };

  static updateFlight = async (flight_no, seats) => {
    try {
      const result = await db.execute(
        `UPDATE flights SET seats=${seats} WHERE flight_no=${flight_no}`
      ); //srtat_time= y/m/d
      console.log(result[0]);
      return result[0];
    } catch (err) {
      console.log(err);
    }
  };

  static bookFlight = async (pss_id, flight_no, seats) => {
    try {
      const result = await db.execute(
        `INSERT INTO booking (pass_id, flight_no, seats_booked) VALUES (?,?,?)`,
        [pss_id, flight_no, seats]
      );
      console.log(result[0]);
      return result[0];
    } catch (err) {
      console.log(err);
    }
  }

  static fetchPassDetails = async (pass_id) => {
    try {
      const result = await db.execute(
        `SELECT F.start_time date, P.pass_id pass_id, B.email email, B.flight_no flightNo, B.seats_booked bookedseats FROM (booking B inner Join passenger P on B.pass_id=P.pass_id) inner JOIN flights F on B.flight_no=F.flight_no where P.pass_id=${pass_id} ORDER BY start_time DESC`
      );
      console.log(result[0]);
      return result[0];
    } catch (err) {
      console.log(err);
    }
  };

  static fetchPassDetailsCanceled = async (pass_id) => {
    try {
      const result = await db.execute(
        `SELECT F.start_time date, P.pass_id pass_id, P.email email, C.flight_no flightNo, C.refund_status cancelled FROM (payment C inner Join passenger P on C.pass_id=P.pass_id) inner JOIN flights F on C.flight_no=F.flight_no where P.pass_id=${pass_id} AND C.refund_status = 'Y' ORDER BY start_time DESC`
      );
      console.log(result[0]);
      return result[0];
    } catch (err) {
      console.log(err);
    }
  };



}

exports.Account = Account;
