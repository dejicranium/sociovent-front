<template>
    <form class="modal" v-if="showModal" enctype="multipart/form-data">
        <div class="modal__mask modal-overlay" @click.stop="closeModal">

                <div @click.stop class="modal__header flex items-center justify-between flex-wrap bg-white p-6">
                    <div>
                        <p class="">Set reminder</p>
                        <p class="" style="color: grey; font-size:13px" >Event: {{ event.name }}</p>
                    </div>
                   
                    <div @click="closeModal" class="modal-close cursor-pointer z-50"><svg class="fill-current text-black" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"><path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path></svg></div>
                </div>
                <div @click.stop class="modal__body">
                    <div class="modal__body__formfield">
                        <label for="" class="modal__body__formfield__label --red">{{rCreateErrors.location}}</label>
                        <label for="" class="modal__body__formfield__label">Medium *</label>
                        <select for="" class="modal__body__formfield__input" v-model="reminder.location">
                            <option value="" disabled selected>Select medium</option>
                            <option value="sms">SMS</option>
                            <option value="whatsapp">Whatsapp</option>
                            <option value="google_calendar">Google Calender</option>
                        </select>
                    </div>
                    <div  class="modal__body__formfield"  v-if="reminder.location == 'sms' || reminder.location === 'whatsapp'">
                        <label for="" class="modal__body__formfield__label --red">{{rCreateErrors.phone}}</label>
						<label for="" class="modal__body__formfield__label">Phone no.</label>

                        <input for="" class="modal__body__formfield__input" v-model="reminder.phone"/>
                        <label style="position:relative; height: 10px;"> 
							<input  style=" position: absolute; top: 5px;" class="modal__body__formfield__input" type="checkbox" v-model="reminder.save_phone"/>
							<div style="font-size: 10px; color: grey; font-weight: 500; position: absolute; top: 3px; left: 20px;"> Remember phone (save as default)</div>
						</label>

					</div>

                    <div class="modal__body__formfield" style="margin-top: 5px;">
                        <label for="" class="modal__body__formfield__label --red">{{rCreateErrors.first_reminder_time}}</label>
                        <div class="modal__body__formfield--flex" style="display:flex; justify-content: space-between">
                            <div class="" style="display: flex;  flex-direction:column; width: 100%;">
                                <label for="" class="modal__body__formfield__label">Time</label>
                                <vue-timepicker  format="hh:mm A"  class="filter__field__input" v-model="reminder.first_reminder_time"></vue-timepicker>
                            </div>
                        </div>
                    
                    </div>
					
                    <div class="modal__body__formfield">
                        <label for="" class="modal__body__formfield__label --red">{{rCreateErrors.second_reminder_time}}</label>
                        <div class="modal__body__formfield--flex" style="display:flex; justify-content: space-between">
                            <div class="" style="display: flex; flex-direction:column; width: 100%">
                                <label for="" class="modal__body__formfield__label">Second reminder time</label>
                                <vue-timepicker  format="hh:mm A"  class="filter__field__input" v-model="reminder.second_reminder_time"></vue-timepicker>
                            </div>
                        </div>
                    
                    </div>

                    <div class="modal__body__ctas flex items-center">
                        <button class="button" @click="closeModal" type="button">Cancel</button>
                        <button class="create" @click="createReminder" type="button">Create</button>
                    </div>
                </div>	
            </div>
        </form>



</template>

<script>
import Logo from '~/components/Logo.vue'
import SocialAuth from '~/components/socialauth.vue';
import Event from '~/components/event.vue';
import Navbar from '~/components/navbar.vue';
import EventsFilter from '~/components/filter.vue';
import DatePick from 'vue-date-pick';
import ReminderModal from '~/components/remindermodal.vue';
import 'vue-date-pick/dist/vueDatePick.css';
import cntries from '../countries.json';
import VueTimepicker from 'vue2-timepicker';
import axios from 'axios';
import { request, checkAuthStatus, toggleButtonActiveness, convertObjToQueryString } from '../utils';
import requests from '../requests/reminders'
import authrequests from '../requests/auth'
import Cookies from 'js-cookie';
import Pagination from '~/components/paginator';
// CSS
import 'vue2-timepicker/dist/VueTimepicker.css'
import Loading from 'vue-loading-overlay';
// Import stylesheet
import 'vue-loading-overlay/dist/vue-loading.css';
import { mapActions } from 'vuex'

export default {
    components: {
	    VueTimepicker,
    },
    props: [],
    methods: {
		...mapActions([
			  'closeReminderModal', 
		]),
        showSecondReminderTime() {
            this.secondReminderTimeBool = true;
        },
        createReminder(e) {
			const locals = {};
			locals.original_text = e.target.innerText;
			
			toggleButtonActiveness(e.target, locals.original_text);
			requests.createReminder({...this.reminder, event_id: this.event.id})
				.then(() => {
					toggleButtonActiveness(e.target, locals.original_text);
					authrequests.getSelf((resp) => {
						if (resp.data.data.phone) {
							this.user.phone = resp.data.data.phone
						}
					})
					this.closeModal();
					this.event

				})
				.catch(err=> {
					toggleButtonActiveness(e.target, locals.original_text);
					if (err.response) {
						alert(err.response.data.message)
					}
					alert(err);
				})
		},
		closeModal() {
			this.$store.dispatch('events/closeReminderModal')
		}
    },
    data() {
        return {
            reminder: {
                location: '',
                phone: '',
                first_reminder_time: '',
				second_reminder_time: '',
				save_phone: false
			},

			user: {
				phone: '',
			},


            rCreateErrors: {
                location: '',
                phone: '',
                first_reminder_time: '',
                second_reminder_time: '',
            },

            secondReminderTimeBool: false
        }
	},
	
	watch: {
		location: function(value) {
			switch(value) {
				case 'whatsapp':
					this.reminder.phone = this.user.phone
					break;
				case 'sms': 
					this.reminder.phone = this.user.phone
					break;
				default:
					this.reminder.phone = this.user.phone
					break;
			} 	
		}
	},

    computed: {
			location() {
				return this.reminder.location
			},
			event() {
				return this.$store.state.events.eventToRemind;
			},
			showModal() {
				return this.$store.state.events.showReminderModal;

			},
			
			reminderTimes() {
				let count = 0;
				['first_reminder_time', 'second_reminder_time'].forEach(time=> {
					if (this.reminder[time]) count++;
				})

				return count
			},
		

    }
}
</script>

<style lang="scss" scoped>
$grid-break-5: 1120px;
$grid-break-4: 830px;
$grid-break-3: 630px;
$grid-break-2: 565px;
$modal-break-1: 760px;

.modal  {
	display: block;
	position: fixed;
	width: 100%;
	height: 100%;
	z-index: 1000;
	overflow: scroll;

	&__mask {
		background: rgba(0, 0, 0, 0.726);
		height: 100vh;
		padding-top: 100px;
		position: relative;
		width: 100%;
	}

	&__header {
		font-size: 18px !important;
		padding: 20px;
		background: white;
		width: 40%;
		margin:auto;
		border-bottom: 1px solid lightgrey;
		
		@media screen and (max-width: $modal-break-1) {
			width: 80%;
		}

	}

	&__body {
		background: white;
		width: 40%;
		margin: auto;
		padding-top: 10px;
		padding-bottom: 30px;
		display: flex;
		flex-direction: column;
		@media screen and (max-width: $modal-break-1) {
			width: 80%;
		}
		&__formfield {
			display: flex;
			flex-direction: column;
			padding: 10px 20px;
			
			select {
				-webkit-appearance: none;
				appearance: none;
				-moz-appearance: none;
				-ms-progress-appearance: none;
			}

			

			label {
				color: #5e6c84;
					font-size: 12px;
					font-weight: 600;			
			
			}

			textarea {
				    overflow: auto;
					outline: none;

					-webkit-box-shadow: none;
					-moz-box-shadow: none;
					box-shadow: none;

					resize: none;
			}

			&__input {
				font-size: 13px;
				padding: 7px 10px;
				border-radius: 5px;
				outline: teal;
				//background-color: #f4f5f7 !important;
   			 	border: 1px solid #dfe1e6 !important;

				input {
				//	background: #f4f5f7 !important;
				}
				&:active {
					background: white;
				}
				&:focus {
					background: white;
				}
			}

			
		}
		&__ctas {
			padding: 10px 20px;
			align-self: flex-end;
			justify-content: space-between;

			button {
				margin-right: 10px;
				color: #5e6c84;
				padding: 5px 10px;
				border-radius: 3px;
				font-size: 14px;

				&:last-of-type {
					margin-right: 0;
				}
			}

			.create {
				background: black;
				color: white;
			}
			
		}
	}
}
/deep/input {
    width: 100%;
}

/deep/.display-time{ 
	width: 100% !important;
	//background: #f4f5f7;
	border-radius: 5px;
}

/deep/.vue__time-picker {
	width: 100% !important;
}
select {
	background: white;
}
</style>