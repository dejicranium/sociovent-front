const utils = require('../utils')

const request = utils.request;

module.exports = {
    getSelf: async () => {
        return await request('/auth/self', 'get',)
    },
    editSelf: async(data) => {
        return await request('/auth/self', 'put', {}, data)
    },
    changePassword: async (data) => {
        return await request('/auth/password/change', 'put', {}, data)

    },
    logout: async () => {
        return await request('/auth/signout', 'post', {})

    }
}