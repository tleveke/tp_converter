const factoryGirl = require('factory-girl')
const adapter = new factoryGirl.SequelizeAdapter()
factory = factoryGirl.factory
factory.setAdapter(adapter)

const Account = require('../../models').Account

factory.define('Accounts', Account,{id} {
    name: factory.sequence((n) => `name${n}`),
    email: factory.sequence((n) => `client@client.com`),
    companyId: null
})