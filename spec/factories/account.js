const factoryGirl = require('factory-girl')
const adapter = new factoryGirl.SequelizeAdapter()
factory = factoryGirl.factory
factory.setAdapter(adapter)

const Account = require('../../models').Account

factory.define('Accounts', Account, {
    name: factory.chance('name'),
    companyId: null
})