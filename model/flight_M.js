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

  static allFlight = async () => {
    try {
      const result = await db.execute(`select * from flights`); //srtat_time= y/m/d
      console.log(result[0]);
      return result[0];
    } catch (err) {
      console.log(err);
    }
  };

  static searchFlight = async (destination) => {
    try {
      const result = await db.execute(
        `select * from flights where destination=${destination}`
      ); //srtat_time= y/m/d
      console.log(result[0]);
      return result[0];
    } catch (err) {
      console.log(err);
    }
  };

  static addFlight = async (destination, start_time, seats, price,id) => {

    try {
        const admin = await db.execute(
          //   INSERT INTO account (email, username, password) VALUES ('$e', '$u', '$p')
          `SELECT * FROM admin WHERE admin_id =${id} `
        );
        if (!(admin[0].length == 0)) {
          console.log("admin id: ", admin[0]);
          let result = await db.execute(
            `INSERT INTO flights (destination, start_time, seats, price) VALUES (?,?,?,?)`,
            [destination, start_time, seats, price]
          );
          console.log(result[0]);
          return result[0];
        } else {
          return [];
        }
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
        `INSERT INTO booking_1 (pass_id, flight_no, seats_booked) VALUES (?,?,?)`,
        [pss_id, flight_no, seats]
      );
      console.log(result[0]);
      return result[0];
    } catch (err) {
      console.log(err);
    }
  };

  static fetchPassDetails = async (id) => {
    console.log("id in M: ", id);
    try {
      const admin = await db.execute(
        //   INSERT INTO account (email, username, password) VALUES ('$e', '$u', '$p')
        `SELECT * FROM admin WHERE admin_id =${id} `
      );
      if (!(admin[0].length == 0)) {
        console.log("admin id: ", admin[0]);
        let result = await db.execute(
          `SELECT * FROM booking_1 `
        );
        console.log(result[0]);
        return result[0];
      } else {
        let result = await db.execute(
          `SELECT * FROM booking_1 where pass_id=${id}`
        );
        console.log("pass detail: ", result[0]);
        return result[0];
      }
    } catch (err) {
      console.log(err);
    }
  };
  static fetchPassDetailsUser = async (pass_id) => {
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

  static login = async (email, password) => {
    try {
      let result = await db.execute(
        //   INSERT INTO account (email, username, password) VALUES ('$e', '$u', '$p')
        `SELECT * FROM account WHERE email =? AND password =? `,
        [email, password]
      );
      if (!result[0][0]) {
        result = await db.execute(
          //   INSERT INTO account (email, username, password) VALUES ('$e', '$u', '$p')
          `SELECT * FROM admin WHERE email =? AND admin_pass =? `,
          [email, password]
        );
      }

      return {
        result: result[0][0],
      };
    } catch (err) {
      console.log(err);
    }
  };

  static cancelBookedFlight = async (id, flight_no, pass_id) => {
    console.log("id in M: ", id);
    try {
      const admin = await db.execute(
        `SELECT * FROM admin WHERE admin_id =${id} `
      );
      if (!(admin[0].length == 0)) {
        console.log("admin id: ", admin[0]);
        let result = await db.execute(
          `DELETE from booking_1 where pass_id=${pass_id}`
        );
        
        console.log(result[0]);
        return result[0];
      } else {
        let result = await db.execute(
          `DELETE from booking_1 where pass_id=${pass_id}`
        );
        console.log("booking detail: ", result[0]);
        return result[0];
      }
    } catch (err) {
      console.log(err);
    }
  };
}

exports.Account = Account;
