/**
 * @typedef {Object} Seat
 * @property {string} id
 * @property {string} number
 * @property {boolean} isAvailable
 * @property {{ row: number, col: number }} position
 */

/**
 * @typedef {Object} Compartment
 * @property {string} id
 * @property {string} name
 * @property {Seat[]} seats
 */

/**
 * @typedef {Object} Train
 * @property {string} id
 * @property {string} name
 * @property {Compartment[]} compartments
 */

/**
 * @typedef {Object} Booking
 * @property {string} id
 * @property {string} trainId
 * @property {string} trainName
 * @property {string} compartmentId
 * @property {string} compartmentName
 * @property {string[]} seatIds
 * @property {string[]} seatNumbers
 * @property {string} passengerName
 * @property {string} passengerEmail
 * @property {string} journeyDate
 * @property {string} bookingDate
 * @property {'confirmed' | 'pending' | 'cancelled'} status
 * @property {number} groupSize
 */

/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} name
 * @property {string} email
 * @property {Booking[]} bookings
 */
