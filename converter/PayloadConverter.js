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

    onStart() {
        let start = this.payload.start;
        let dateStart = new Date(start.date_time);
        return dateStart;
    }

    onEnd() {
        let end = this.payload.end;
        let dateEnd =  new Date(end.date_time);
        return dateEnd;
    }
}
module.exports = PayloadConverter
