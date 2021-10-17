import originFlights from '../../libs/flights.data';
import flightDateGenerator from '../../libs/date.generator';
import Flight from '../../libs/flight.get.class';
import {
  ENDDATE_INVALID,
  FAILED,
  FORMAT_INVALID,
  STARTDATE_EMPTY,
} from '../../constants';
import dayFormatCheck from '../../libs/date.format.check';

const show = (req, res) => {
  let { startDate, endDate } = req.query;

  if (!startDate || !endDate) {
    return res.status(400).json({ status: FAILED, reason: STARTDATE_EMPTY });
  }

  if (!dayFormatCheck(startDate) || !dayFormatCheck(endDate)) {
    return res.status(400).json({ status: FAILED, reason: FORMAT_INVALID });
  }

  let startTime = flightDateGenerator(startDate);
  let endTime = flightDateGenerator(endDate);

  if (startTime > endTime) {
    return res.status(400).json({ status: FAILED, reason: ENDDATE_INVALID });
  }

  const data = originFlights.filter(
    flight => flight.flightDate >= startTime && flight.flightDate <= endTime
  );

  let flightsByDateOrigin = [];

  // making a array per dates
  for (let i = startTime.getDate(); i <= endTime.getDate(); i++) {
    flightsByDateOrigin = [
      ...flightsByDateOrigin,
      data.filter(flight => flight.flightDate.getDate() === i),
    ];
  }

  let flightsByDateNew = [];
  let tempFlightNumber;
  let tempFlightDate;
  let map, map2;

  for (let i = 0; i < flightsByDateOrigin.length; i++) {
    map = new Map();
    map2 = new Map();

    let newFlights = [];
    if (flightsByDateOrigin[i].length > 0) {
      tempFlightDate = flightsByDateOrigin[i][0].flightDate;

      for (let j = 0; j < flightsByDateOrigin[i].length; j++) {
        let revenue = 0;
        let occupiedSeats = [];

        tempFlightNumber = flightsByDateOrigin[i][j].flightNumber;

        flightsByDateOrigin[i].forEach((flight, index) => {
          if (flight.flightNumber === tempFlightNumber) {
            map.set(flight.ticketId, flight);
          }
        });

        for (let [key, value] of map) {
          if (value.flightNumber === tempFlightNumber) {
            revenue += value.ticketCost;
            occupiedSeats.push(value.seatNumber);
          }
        }
        map2.set(
          tempFlightNumber,
          new Flight(tempFlightNumber, revenue, occupiedSeats)
        );
      }
      newFlights = [...map2.values()];

      flightsByDateNew = [
        ...flightsByDateNew,
        {
          date: tempFlightDate.toISOString().substring(0, 10),
          flights: newFlights,
        },
      ];
    } else {
      tempFlightDate = new Date(
        tempFlightDate.getFullYear(),
        tempFlightDate.getMonth(),
        tempFlightDate.getDate() + 1
      );
      flightsByDateNew = [
        ...flightsByDateNew,
        {
          date: tempFlightDate.toISOString().substring(0, 10),
          flights: [],
        },
      ];
    }
  }

  res.status(200).json({ dates: flightsByDateNew });
};

export default { show };
