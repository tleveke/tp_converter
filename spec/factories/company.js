const factoryGirl = require('factory-girl')
const adapter = new factoryGirl.SequelizeAdapter()
factory = factoryGirl.factory
factory.setAdapter(adapter)

const Company = require('../../models').Company

factory.define('Companies', Company, {
    name: factory.sequence((n) => `firstName${n}`)
})