const factoryGirl = require('factory-girl')
const adapter = new factoryGirl.SequelizeAdapter()
factory = factoryGirl.factory
factory.setAdapter(adapter)

const User = require('../../models').User

factory.define('Users', User, {
    name: factory.sequence((n) => `Name${n}`),
    email: factory.chance('email'),
})