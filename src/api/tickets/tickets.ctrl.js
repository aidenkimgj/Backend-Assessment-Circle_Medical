import Flight from '../../libs/flight.post.class';
import flights from '../../libs/flights.data';
import flightDateGenerator from '../../libs/date.generator';
import {
  FAILED,
  SEATNUMBER_EXIST,
  SUCCESS,
  TICKETID_EXIST,
} from '../../constants';

const create = (req, res) => {
  let { ticketId, flightDate, flightNumber, seatNumber, ticketCost } =
    req.body.event;

  const date = flightDateGenerator(flightDate);
  const existTicketId = flights.some(flight => flight.ticketId === ticketId);
  const existSeatNumber = flights.some(
    flight =>
      flight.seatNumber === seatNumber &&
      flight.flightNumber === flightNumber &&
      flight.flightDate.toISOString().substring(0, 10) === flightDate
  );

  if (existTicketId) {
    return res
      .status(400)
      .json({ status: FAILED, reason: TICKETID_EXIST })
      .end();
  }

  if (existSeatNumber) {
    return res
      .status(400)
      .json({ status: FAILED, reason: SEATNUMBER_EXIST })
      .end();
  }

  flights.push(
    new Flight(ticketId, date, flightNumber, seatNumber, ticketCost)
  );
  res.status(200).json({ status: SUCCESS }).end();
};

export default { create };
