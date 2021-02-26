const factoryGirl = require('factory-girl')
const adapter = new factoryGirl.SequelizeAdapter()
factory = factoryGirl.factory
factory.setAdapter(adapter)

const Booking = require('../../models').Booking

factory.define('Bookings', Booking, {
    idGoogle: Math.random(),
    startDate: factory.chance('date'),
    endDate: factory.chance('date'),
    clientId: factory.assoc('Accounts', '_id'),
    employeeId: factory.assoc('Accounts', '_id'),
})