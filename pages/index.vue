<template>
	<div class="cont" @click="globalCloseModal">
			<form class="modal" @submit.prevent="createEvent" v-if="showModal" enctype="multipart/form-data">
				<div class="modal__mask modal-overlay" @click.stop="toggleModal">

					<div @click.stop class="modal__header flex items-center justify-between flex-wrap bg-white p-6">
						<p class="">Create Sociovent</p>
						<div @click="toggleModal" class="modal-close cursor-pointer z-50"><svg class="fill-current text-black" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"><path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path></svg></div>
					</div>
					<div @click.stop class="modal__body">
						<div class="modal__body__formfield">
							<label for="" class="modal__body__formfield__label --red">{{eCreateErrors.name}}</label>
							<label for="" class="modal__body__formfield__label">Name *</label>
							<input for="" class="modal__body__formfield__input" placeholder="" v-model="event.name"/>
						</div>
						<div class="modal__body__formfield">
							<label for="" class="modal__body__formfield__label --red">{{eCreateErrors.description}}</label>

							<label for="" class="modal__body__formfield__label">Description</label>
							<textarea for="" class="modal__body__formfield__input" placeholder="" v-model="event.description"></textarea>
						</div>
						<div class="modal__body__formfield">
							<label for="" class="modal__body__formfield__label --red">{{eCreateErrors.venue}}</label>
							<label for="" class="modal__body__formfield__label">Venue *</label>
							<select for="" class="modal__body__formfield__input" placeholder="" v-model="event.venue">
								<option value="Instagram">Instagram</option>
								<option value="Facebook">Facebook</option>
								<option value="Twitter">Twitter</option>
								<option value="Youtube">Youtube</option>
							</select>
						</div>
						<div class="modal__body__formfield">
							<label for="" class="modal__body__formfield__label --red">{{eCreateErrors.host_social_handle}}</label>

							<label for="" class="modal__body__formfield__label">Host's  {{event.venue}} handle *</label>
							<input for="" class="modal__body__formfield__input" placeholder=" (e.g. eldeethadon)" v-model="event.host_social_handle"/>
							<label for="" class="modal__body__formfield__label"{{ resolvedSocialHandle }}</label>

						</div>
						<div class="modal__body__formfield">
							<label for="" class="modal__body__formfield__label --red">{{eCreateErrors.start_time}}</label>

							<div class="modal__body__formfield--flex" style="display:flex; justify-content: space-between">
								<div class="" style="display: flex; flex:0 1 45%; flex-direction:column">

									<label for="" class="modal__body__formfield__label">Date *</label>
									<date-pick class="filter__field__input" v-model="event.date"></date-pick> 
								</div>
								<div class="" style="display: flex; flex:0 1 45%; flex-direction:column">
									<label for="" class="modal__body__formfield__label">Time *</label>
									<vue-timepicker  format="hh:mm A"  class="filter__field__input" v-model="event.start_time"></vue-timepicker>
								</div>
							</div>
							 
						</div>
						<div class="modal__body__formfield">
							<label for="" class="modal__body__formfield__label --red">{{eCreateErrors.country_origin}}</label>

							<label for="" class="modal__body__formfield__label">Host country *</label>
							<select class="modal__body__formfield__input" v-model="event.country_origin">
								<option v-for="country in countries" :value="country.code">{{country.name}}</option>
							</select>
						</div>
						<div class="modal__body__formfield">
							<label for="" class="modal__body__formfield__label --red">{{eCreateErrors.tags}}</label>

							<label for="" class="modal__body__formfield__label">Tags</label>
							<input for="" class="modal__body__formfield__input" placeholder="afrobeats, pop, jackson" v-model="event.tags"/>
						</div>
						<div class="modal__body__formfield">
							<label for="" class="modal__body__formfield__label --red">{{eCreateErrors.photo}}</label>
							<label for="" class="modal__body__formfield__label">Event Photo</label>

							<input type="file" name="eventimage" accept="image/x-png,image/gif,image/jpeg">
						</div>

						<div class="modal__body__ctas flex items-center">
							<button class="button" @click="toggleModal" type="button">Cancel</button>
							<button class="create" @click="createEvent" type="button">Create</button>
						</div>
					</div>	
				</div>
			</form>
			<reminder-modal 
				:event="eventToRemind"
				:toggleModal="toggleReminderModal"
				:showModal="showReminderModal" >
			</reminder-modal>

		<navbar 
			:toggleModal="toggleModal"
			:closeModals="closeAllModals"
			:pageContext="home"
		></navbar>
		
		<div class="vld-parent" v-if="loadingContent">
			<loading :active.sync="loadingContent" 
			:can-cancel="true" 
			:is-full-page="true"></loading>
			
    	</div>



		<div v-else style="position: relative; z-index: 1;top:60px; margin:auto; " class="content">
			<div class="filter-indicator" @click="toggleFilter" v-if="!openFilter"> 
				
				<svg class="filter-indicator__icon" xmlns="http://www.w3.org/2000/svg" width="50" height="42" viewBox="0 0 50 42"><defs><style>.cls-1{fill:#111}.cls-2{fill:#00c569}</style></defs><title>Options</title><g id="Layer_2" data-name="Layer 2"><g id="Options"><path class="cls-1" d="M40.5 12h7a2.5 2.5 0 0 0 0-5h-7a2.5 2.5 0 0 0 0 5zM15.5 7h-13a2.5 2.5 0 0 0 0 5h13a2.5 2.5 0 0 0 0-5zM9.5 30h-7a2.5 2.5 0 0 0 0 5h7a2.5 2.5 0 0 0 0-5zM47.5 30h-13a2.5 2.5 0 0 0 0 5h13a2.5 2.5 0 0 0 0-5z"/><g><path class="cls-2" d="M18.5 23a9.5 9.5 0 1 0 9.5 9.5 9.5 9.5 0 0 0-9.5-9.5zm0 14a4.5 4.5 0 1 1 4.5-4.5 4.51 4.51 0 0 1-4.5 4.5zM31.5 0A9.5 9.5 0 1 0 41 9.5 9.5 9.5 0 0 0 31.5 0zm0 14A4.5 4.5 0 1 1 36 9.5a4.51 4.51 0 0 1-4.5 4.5z"/></g></g></g></svg>
			</div>
			<events-filter :filterMethod='filterEvents' :show="openFilter" :closeMethod="toggleFilter" :filter="filter"></events-filter>

			<div class="cont2">
				<div class="feed__box__body" >
					<event 
						v-for="event in events" 
						:key="event.id" 
						:event="event"
						:setEventToRemind="toggleReminderModal"
						:closeModals="closeAllModals"
					></event>
					

					
				</div>
						<!--
				<div class="feed">
					<div class="feed__box">
						<div class="feed__box__header">
							<p class="feed__box__header__text">Top events</p>
						</div>

					</div>
				</div>-->



			</div> 
			<div class="view-more" style="width:50%; max-width: 300px; background: black; padding: 5px; border-radius: 5px; cursor: pointer; margin:auto; margin-bottom: 20px; text-align: center; border: 1px solid black; color: white;">
				View More
			</div>
			<pagination :pageMeta="pageMeta" :jumpToMethod="changePage"></pagination>


		</div>
    </div>
  	</nav>
	</div>
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
import requests from '../requests/events'
import Cookies from 'js-cookie';
import Pagination from '~/components/paginator';
import utils from '../utils'
// CSS
import 'vue2-timepicker/dist/VueTimepicker.css'
import Loading from 'vue-loading-overlay';
// Import stylesheet
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
  components: {
    Logo,
	Navbar,
	EventsFilter,
	DatePick,
	SocialAuth,
	Event,
	VueTimepicker,
	Loading,
	Pagination,
	ReminderModal
  },

  async asyncData ({ $axios, $context, redirect }) {
    /*return request(`/events`, 'get', {}, {})
      .then((res) => {
        return { events: res.data.data.events }
	  })*/
	  /*
	  
	return requests.getEvents()
		.then(async resp=> {
			const isLoggedIn = await checkAuthStatus() === 1;
			return {
				isLoggedIn,
				events: resp.data.data.events,
				pageMeta: resp.data.data.pageInfo

			}
		})*/
  },

  computed: {
		pageOffset() {},
		resolvedSocialHandle() {
			let result = '';
			const social_handle = this.event.host_social_handle;
			const eventvenue = this.event.venue.toLowerCase();
			switch(eventvenue) {
				case 'facebook':
					result = 'https://facebook.com/' + social_handle
					break;
				case 'twitter':
					result = 'https://twitter.com/' + social_handle
					break;
				case 'instagram':
					result = 'https://instagram.com/' + social_handle
					break;
				case 'twitch':
					result = 'https://twitch.tv/' + social_handle
					break;
				default: 
					result = '';
					break;
			}

			return result;
		}
	},
  	data() {
		return {
			loadingContent: false,
			routeEnterAction: '',
			isAuthenticated: true,
			showModal: false,
			showReminderModal: false,
			date: this.splitDate(),
			events: [],
			closeAllModals: false,
			openFilter: true,
			pageSelection: {
				offset: 0,
				page: ''
			},
			pageMeta: {},
			redirect: null,
			defaultCountry: '',
			eventToRemind: {},
			event: {
				name: '',
				description: '',
				photo: '',
				date: '',
				start_time: '',
				host_social_handle: '',
				host_social_handle_link: '',
				venue: '',
				country_origin: '',
				tags: ''
			},
			filter: {
				search: '',
				country_origin: '',
				venue: '',
				from: '',
				to: ''
			},
			eCreateErrors: {
				name: '',
				description: '',
				photo: '',
				date: '',
				start_time: '',
				host_social_handle: '',
				host_social_handle_link: '',
				venue: '',
				country_origin: '',
				tags: ''
			},

			countries: []
		}
	},

	created() {
		let query = {};
		if (this.$route.query) {
			query = this.$route.query;
		}
		//this.routeEnterAction = this.$route.query['action'];
		if (this.routeEnterAction == 'createEvent') {
			this.showModal = true;
		}
		
		// check if filter elements are in the query.
		if (query.country_origin) {
			this.filter['country_origin'] = query.country_origin
		}
		if (query.venue) {
			this.filter['venue'] = query.venue
		}
		if (query.search) {
			this.filter['search'] = query.search
		}
		if (query.from) {
			this.filter['from'] = query.from
		}
		if (query.to) {
			this.filter['to'] = query.to
		}

		checkAuthStatus();

		this.getEvents(query)

	
	},


	mounted() {
		this.countries = cntries;
	},
	  
	methods: {
		reloadPage(query) {
			let homeroute = '/?';
			window.location.href = homeroute + utils.serialize(query);
		},
		changePage(page) {
			let query = {};
			let filterPageSelect = {page, ...this.filter}
			Object.keys(filterPageSelect).forEach(key=> {
				if (filterPageSelect[key]) {
					query[key] = filterPageSelect[key];
				}
			});
			this.reloadPage(query)
		},
		changePageOffset() {
			const last_event = this.events[this.events.length - 1 ]; // offset to the last event on the page
			this.pageSelection.offset = last_event.id;
		},
		globalCloseModal() {
			this.closeAllModals = !this.closeAllModals;
		},

		filterEvents() {//
			// push router
			const homeroute = '/?'
			let query = {};
			let filterPageSelect = {...this.filter, ...this.pageSelection}
			// get only objects that have a value 
			Object.keys(filterPageSelect).forEach(key=> {
				if (filterPageSelect[key]) {
					query[key] = filterPageSelect[key];
				}
			})

			//this.$router.push(homeroute + utils.serialize(query));
			this.reloadPage(query)
		},
		toggleFilter() {
			this.openFilter = !this.openFilter;
		},
		toggleReminderModal(event = null) {
			if (event) this.eventToRemind = event;
			this.showReminderModal = !this.showReminderModal
		},
		getEvents(query=null) {
			this.loadingContent = true;
			const self = this;
			requests.getEvents(query).then(resp => {
				self.loadingContent = false;
				self.events = resp.data.data.events;
				self.pageMeta = resp.data.data.pageInfo;
			}).catch(err=> {
				self.loadingContent = false;
			})
		},
		splitDate() {
			const now = new Date();
			return now.getUTCFullYear() + '-' + now.getUTCMonth() + '-' + now.getDate();
		},
		closeModal(){
			this.showModal = false;
		},
		toggleModal() {
			if (Cookies.get('socioventtoken')) {
				this.showModal = !this.showModal;
			}
			else {
				this.$router.push('auth/?action=createEvent')
			}
		},
		logIn() {
			this.$store.commit('auth/logIn')
		},
		createEvent(e) {
			const form = document.querySelector('modal');
			const btnOriginalText = e.target.innerText;
			const eventData = this.event;	
			toggleButtonActiveness(e.target, btnOriginalText);

			const formData = new FormData();
			const files = document.querySelector('[name=eventimage]').files;

			formData.append('photo', files[0]);
			formData.append('name', eventData.name)
			formData.append('description', eventData.description)
			formData.append('start_time', eventData.date + ' ' + eventData.start_time)
			formData.append('host_social_handle', eventData.host_social_handle)
			formData.append('host_social_handle_link', eventData.host_social_handle_link)
			formData.append('venue', eventData.venue)
			formData.append('country_origin', eventData.country_origin)
			formData.append('tags', eventData.tags)

			const xhr = new XMLHttpRequest();
			xhr.responseType = 'json';
			const url = 'http://sciovent-api.herokuapp.com/api/v1/events';
			// log response
			xhr.onload = () => {
				toggleButtonActiveness(e.target, btnOriginalText);
				this.clearErrors();

				this.closeModal();
				this.getEvents();			
			};

			xhr.onerror = () => {
				toggleButtonActiveness(e.target, btnOriginalText);
			}

			// create and send the reqeust
			xhr.open('POST', url);
			xhr.setRequestHeader('Authorization', 'Bearer ' + Cookies.get('socioventtoken'))
			xhr.send(formData);
	
			/*
			const data =  {
				name: eventData.name,
				description: eventData.description,
				photo: eventData.photo,
				start_time: eventData.date + ' ' + eventData.start_time,
				host_social_handle: eventData.host_social_handle,
				host_social_handle_link: eventData.host_social_handle_link,
				venue: eventData.venue,
				country_origin: eventData.country_origin,
				tags: eventData.tags
			}
			if (!this.resolveEventCreationParameters()) {
				request('/events', 'post', {}, data)
					.then(async resp=> {
						toggleButtonActiveness(e.target, btnOriginalText);
						this.clearErrors();

						this.closeModal();
						this.getEvents();
					})
					.catch(err=> {
						toggleButtonActiveness(e.target, btnOriginalText);
						//this.serverResolveEventCreateError(err.response.data.message);
					});
			}*/
		},
		resolveEventCreationParameters() {
			let error = false
			const self = this;

			function requiredValidation() {
				['name', 'venue', 'date', 'start_time', 'country_origin']
					.forEach(field => {
						if (!self.event[field])  {
							error = true;
							self.eCreateErrors[field] = field.replace(/_/g, ' ') + ' is required';
						}
					})
			}

			requiredValidation();
			return error;
		},

		serverResolveEventCreateError(err) {
			['name', 'desciption', 'photo', 'start_time', 
			'host_social_handle', 'host_social_handle_link', 'venue', 
			'country_origin', 'tags'].forEach(field=> {
				if (err.indexOf(field) > -1) {
					this.eCreateErrors[field] = err.replace(/_/g, ' ');
				}
			})
		},

		clearErrors() {
			['name', 'desciption', 'photo', 'start_time', 
			'host_social_handle', 'host_social_handle_link', 'venue', 
			'country_origin', 'tags'].forEach(field=> {
				
					this.eCreateErrors[field] = ''
				
			})
		}
		
	}
}
</script>

<style lang="scss" scoped>
$grid-break-5: 1120px;
$grid-break-4: 830px;
$grid-break-3: 630px;
$grid-break-2: 565px;
$modal-break-1: 760px;


.--red {
	font-weight: 500 !important;
	color: red !important;
}

.filter-indicator{
	background: #ffffe6;
	text-align: center;
	//max-height: 200px;
	display: flex;
	flex-direction: column;
	width: 100%;
	padding: 10px;
	position: sticky;
	top: 0;

    border-bottom: 1px solid lightgrey;
	color: grey;
	cursor: pointer;

	&__icon {
		height: 20px;
		fill: darkgrey;
		display: block;
		margin: auto;
		width: 100%;
	}
}

.cont {
  min-height: 100vh;
  display: flex;
  background: #EEEEEE;
  flex-direction:column;
  overflow: scroll;

}

.cont2 {
	width: 98%;
	margin: 0 auto;
	height: 100%;
	margin-bottom: 30px;
	margin-top: 20px;
	display: flex;
	
}

.feed {
	display: flex;
	flex-direction: column;

	&__box {
		

		&__header {
			padding: 10px 20px;
			border-bottom: 1px solid #E5E5E5;
			background-color: white;
		}
		
		&__body {
			/*display: grid;
			grid-gap: 10px;
			grid-auto-rows: minmax(100px, auto);

  		
			@media screen and (max-width: 455px) {
				grid-template-columns: repeat(1, 1fr);
      		}
			@media screen and (min-width: $grid-break-2) {
				grid-template-columns: repeat(2, 1fr);
      		}
			
			@media screen and (min-width: $grid-break-3) {
				grid-template-columns: repeat(3, 1fr);
      		}
			@media screen and (min-width: $grid-break-4) {
				grid-template-columns: repeat(4, 1fr);
			}

			@media screen and (min-width: $grid-break-5) {
				grid-template-columns: repeat(5, 1fr);
      		}*/
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
		}
	}
}


.event {
	font-size: 13px;
	background: #FFFFFF;
	box-shadow: 0 16px 64px -16px rgba(46,55,77,.1);
	cursor: pointer;
	border: 1px solid whitesmoke;
	border-radius: 5px;
	padding-bottom:15px;
	box-shadow: 0px 2px 2px rgba(140, 134, 134, 0.25);

	&:hover {
		box-shadow: 0px 0px 0px rgba(140, 134, 134, 0.25);

	}
	&__image {
		
		img {
			width: 100%;
			border-top-left-radius: 5px;
			border-top-right-radius: 5px;
			margin-bottom: 5px;
			height: 250px;
			object-fit: cover;
		}
	}

	&__details {
		padding: 2px 10px;

		&__text {

			&__name {
				font-size: 15px;
				font-weight: 600;
			}
		}
	}

	
	
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
.bold {
	font-weight: 600;
	display: inline;
}

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
		padding-top: 30px;
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
				background-color: #f4f5f7 !important;
   			 	border: 1px solid #dfe1e6 !important;

				input {
					background: #f4f5f7 !important;
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

.staticposition {
	position: static;
}
.vdpComponent.vdpWithInput > input {
	//background: #f4f5f7 !important;
}
.content {
 position: relative;
 top: 60px;
 width: 100%;
 margin: auto;

}

input {
	//background-color: #f4f5f7 !important;
	//border: 1px solid #dfe1e6;
	color: #172b4d;
	font-size: 13px;

}

input:focus {
	background-color: white !important;
}
/deep/input {
	background-color: white;
    width: 100%;
	border: 1px solid #dfe1e6;
	color: #172b4d;
	font-size: 13px;
	height: 100%;

}
.vdpWithInput {
	height: 100%;
}
</style>
