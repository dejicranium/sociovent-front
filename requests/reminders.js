const utils = require('../utils')

const request = utils.request;

module.exports = {
    getReminders: async (query=null) => {
        return await request('/reminders', 'get', query=query)
    },
    createReminder: async (data=null) => {
        return await request('/reminders', 'post', {}, data=data)
    },
    deleteReminder: async (id) => {
        return await request('/reminders/'+ id, 'delete', {})
    },

}