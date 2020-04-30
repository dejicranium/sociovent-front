const moment = require('moment');

module.exports =  {
    uppercase: function(value) {
        if (!value) {
            return '';
        }
        
        return value.toString().toUpperCase();
    },
    normalizeDate: function(date) {
        let time = moment(date).format('LLLL');   // Mon, Jun 9 2014 9:32 PM
        time = time.split(' ');
        time[3] = '';
        return time.join(" ");
    }
}