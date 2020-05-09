const utils = require('../utils')

const request = utils.request;

module.exports = {
 
    getEvents: async (query=null) => {
        
        return await request('/events', 'get', {}, {}, query)
    },

    getEvent: async (slug) => {
        const slug_delim = slug.split('-');
        const id = slug_delim[slug_delim.length - 1];

        return await request(`/events/${id}`, 'get');
    },

    setPreReminder: async (data) => {
        return await request('/reminders/preminder', 'post', {}, data)
    },

    setGoogleReminder: async (data) => {
        return await request('/reminders/google-calendar', 'post', {}, data)
    },

    getSimilarEvents: async (id) => {
        return await request(`/events/${id}/similar`, 'get');
    },
    getSelfEvents: async() => {
        return await request(`/events/self`, 'get')
    },
    bookmarkEvent: async(id) => {
        return await request('/events/bookmarks', 'post', {}, data={event_id:id})
    },
    deleteEvent: async(id) => {
        return await request('/events/'+id, 'delete', {})
    },
    deleteBookmark: async(id) => {
        return await request('/events/bookmarks/'+id, 'delete', {})
    },
    getBookmarks: async() => {
        return await request('/events/bookmarks', 'get', {})
    }
}