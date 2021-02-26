const factoryGirl = require('factory-girl')
const adapter = new factoryGirl.SequelizeAdapter()
factory = factoryGirl.factory
factory.setAdapter(adapter)

const Booking = require('../../models').Booking

factory.define('booking', Booking, {
    idGoogle: Math.random(),
    startDate: factory.chance('date'),
    endDate: factory.chance('date')
})