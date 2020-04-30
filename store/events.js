import { request } from '../utils';

export const state = () => ({
    eventToRemind: {},
    showReminderModal: false
});

export const mutations = {
   setEventToRemind(state, event) {
       state.eventToRemind = event;
   },
   setToken(state, token){
       state.token = token;
   },
   toggleShowReminderModal(state) {
       state.showReminderModal = !state.showReminderModal;
   },
   closeReminderModal(state) {
       state.showReminderModal = false;
   }
};


export const actions = {
     toggleReminderModal({ commit, dispatch }, params) {
           commit('setEventToRemind', params);
           commit('toggleShowReminderModal')
    },
    closeReminderModal({commit}) {
        commit('closeReminderModal');
    }
       
    };


   
 
 
