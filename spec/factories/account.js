const factoryGirl = require('factory-girl')
const adapter = new factoryGirl.SequelizeAdapter()
factory = factoryGirl.factory
factory.setAdapter(adapter)

const Account = require('../../models').Account

factory.define('Accounts', Account, {
    name: factory.sequence((n) => `name${n}`),
    email: factory.sequence((n) => `client@client.com`)
})

/*factory.define('Accounts', Account, (buildOptions = {}) => {
    const attrs = {
        name: factory.sequence((n) => `name${n}`),
        email: factory.sequence((n) => `client@client.com`),
        companyId: factory.assocMany('Companies', buildOptions.companyId || 300, 'id')
    };
    return attrs;
});*/