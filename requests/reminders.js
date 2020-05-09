const utils = require('../utils')

const request = utils.request;

module.exports = {
    googleCalendarShareAPI(){

        //const API_URL = "https://calendar.google.com/calendar/r/eventedit?";
        //const description = this.event.description || `${this.event.name} on ${this.event.venue}`;
        //const normalizedStartTime = this.event.start_time.split('-').join('').split('.').join('').split('-').join('').split(':').join('');
        //const query = `text=${this.event.name}&details=${description}&location=${this.event.venue}&dates=${normalizedStartTime}/${normalizedStartTime}`;
        //return API_URL + query;

        return "https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar.readonly%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar.events&response_type=code&client_id=522673690521-i1gabu8t5nqongl8g4idcjjf8v5n9cgl.apps.googleusercontent.com&redirect_uri=https%3A%2F%2Fsociovent.com%2Freminder-stat";

    },   
    getReminders: async (query=null) => {
        return await request('/reminders', 'get', query=query)
    },
    createReminder: async (data=null) => {
        return await request('/reminders', 'post', {}, data=data)
    },
    deleteReminder: async (id) => {
        return await request('/reminders/'+ id, 'delete', {})
    },
    setPreReminder: async (data) => {
        return await request('/reminders/preminder', 'post', {}, data)
    },

    setGoogleReminder: async (data) => {
        return await request('/reminders/google-calendar', 'post', {}, data)
    },

}