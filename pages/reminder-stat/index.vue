<template>
    <div>
        <navbar 
			:toggleModal="toggleModal"
			:closeModals="closeAllModals"
            :pageContext="'reminder-stats'"

		></navbar>
		
		<div class="vld-parent" v-if="loadingContent">
			<loading :active.sync="loadingContent" 
			:can-cancel="true" 
			:is-full-page="true"></loading>
			
    	</div>
        
        <div v-else style="position: relative; z-index: 1;top:60px; margin:auto; " class="content">

            <div class="cont2">
				<div v-if="error === true">
					<p>An error occurred</p>
				</div>
				<div v-else>
					<p style="margin-bottom: 10px;">
						Reminder set for {{event.name}}
					</p>

					<a style="color:blue" href="#" @click="gobacktoevent(event.slug)">Go back to event</a>
				</div>
			</div> 
			
		</div>

    </div>
</template>


<script>
import Logo from '~/components/Logo.vue'
import SocialAuth from '~/components/socialauth.vue';
import Event from '~/components/event.vue';
import Navbar from '~/components/navbar.vue';
import EventsFilter from '~/components/filter.vue';
import DatePick from 'vue-date-pick';
import 'vue-date-pick/dist/vueDatePick.css';
import cntries from '../../countries.json';
import VueTimepicker from 'vue2-timepicker';
import axios from 'axios';
import { request, checkAuthStatus, toggleButtonActiveness, convertObjToQueryString } from '../../utils';
import requests from '../../requests/reminders'
import utils from '../../utils'
import Cookies from 'js-cookie';
import Pagination from '~/components/paginator';
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
	Pagination
  },

  	data() {
		return {
			error: null,
			loadingContent: false,
			routeEnterAction: '',
			isAuthenticated: true,
			showModal: false,
			date: this.splitDate(),
			events: [],
			closeAllModals: false,
			openFilter: true,
			pageSelection: {
				offset: 0
			},
			event:null,
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
		if (this.$route.query) {
			console.log(this.$route.query)
		}
		//this.routeEnterAction = this.$route.query['action'];
		if (this.routeEnterAction == 'createEvent') {
			this.showModal = true;
		}
	
		checkAuthStatus();

		const session_id = utils.getSessionId();

		requests.setGoogleReminder({
			session_id,
			code: this.$route.query.code ? this.$route.query.code.split('%').join('/') : null
		})
		.then((resp) => {
			this.loadingContent = false;
			this.error = false;
			this.event = resp.data.data;
		})
		.catch(err => {
			this.loadingContent = false;
			this.error = true;

		})
		//this.getEvents()

	
	},


	mounted() {
		this.countries = cntries;
	},
	  
	methods: {
		gobacktoevent(slug) {
			this.$router.push('/events/' + this.event.slug)
		},
		globalCloseModal() {
			this.closeAllModals = !this.closeAllModals;
		},
		
		getEvents(query=null) {
			this.loadingContent = true;
			const self = this;
			requests.getBookmarks(query).then(resp => {
				self.loadingContent = false;
                self.events = resp.data.data

			}).catch(err=> {
				console.log(err);

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
		removeBookmark(event) {
			const id = event.id;
			console.log('id is ' + id)
			requests.deleteBookmark(id)
				.then(() => {
					console.log('done')
					this.getEvents();
				})
				.catch((err)=> {
					console.log(err.stack)
					//if (err.response) alert(err.response.data.message)
					alert(err)
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
.page-header {
    padding: 16px;
    margin-top: 20px;
    font-size: 14px;
    font-weight: 600;
    font-size: 20px;
}
</style>
