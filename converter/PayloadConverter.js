/*
*
* {
      attendees: [{
      displayName: 'Nick Stock',
      email: client@client.com,
      organizer: true,
      response_status: 'accepted'
    },
    {
      displayName: 'Nicholas Stock',
      email: 'not_client@client.com',
      response_status: 'accepted',
      self: true
    },
    {
      displayName: 'John Stock',
      email: 'John@client.com',
      response_status: 'accepted',
      self: true
    }
    ],
      end: { date_time: '2018-03-05T18:30:00.000+01:00' },
      html_link: 'https://www.google.com/calendar/event?eid=MGptdjJ1ZDljMWo3Y2kyZzFqZ21ybWY2c3Mgbmlja0BnZW1iYW5pLmNvbQ',
      id: '0jmv2ud9c1j7ci2g1jgmrmf6ss',
      start: { date_time: '2018-03-05T12:30:00.000+01:00' },
      status: 'confirmed',
      summary: summary
    }
*
* */

const db = require('../models');

class PayloadConverter {


    constructor(payload) {
        this.payload = payload;
    }

    getIdGoogle() {
        const html_link = this.payload.html_link;
        const id = html_link.split('?eid=')[1];
        return id;
    }
    getOrganizater() {
        let tabOrga = this.payload.attendees.filter(att => att.organizer === true);
        return tabOrga;
    }

    async getClientsId() {
        var clientsId = [];
        const payloadClients = this.payload.attendees.filter(att => att.response_status === 'accepted');
        payloadClients.map(async (client) => {
            const user = await db.User.findOrCreate({
                where: {
                    email: client.email
                },
                defaults: {
                    name: client.displayName
                }
            });
            const account = await db.Account.findOne({
                where: {
                    CompanyId: user.CompanyId
                }
            });
            if(!account) {
                clientsId.push(user.id);
            }
        })
        return clientsId;
    }

    async createOrganizator(organizater, company) {

        let account = await db.Account.findOne({ where: { name: organizater.displayName } });

        if (account === null) {
            account = await factory.create('Accounts', {CompanyId: company.id, name:organizater.displayName });
        }

        return account;
    }

    onStart() {
        const start = this.payload.start;
        const dateStart = new Date(start.date_time);
        return dateStart;
    }

    onEnd() {
        const end = this.payload.end;
        const dateEnd =  new Date(end.date_time);
        return dateEnd;
    }
}
module.exports = PayloadConverter
