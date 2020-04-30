import { request } from '../utils';

export const state = () => ({
    isAuthenticated: false,
    token: ''
});

export const mutations = {
   setAuthenticated(state, bool) {
       state.isAuthenticated = bool;
   },
   setToken(state, token){
       state.token = token;
   }
};


export const actions = {
    async logIn({ commit, dispatch }, params) {
        await request('/login', 'post', {}, params).then(resp=> {
           commit('setToken', resp.data.data.token);
           commit('setAuthenticated');
        })
        .catch({

        });
    },

    async signUp({ commit }, params) {
        await request('/signup', 'post', {}, params).then(async resp=> {
            await dispatch('login', params);
        });
    }
 };
 
