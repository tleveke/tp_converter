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
    getClients() {
        let tabOrga = this.payload.attendees.filter(att => att.organizer !== true && att.response_status == 'accepted');
        return tabOrga;
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
