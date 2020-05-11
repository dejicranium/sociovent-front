<template>
<div class="event">
	<nuxt-link  :to="'/events/' + eventSlug">
		<div class="event__image">
			<img v-if="event.photo" :src="event.photo"/>
			<img v-else-if="event.event" :src="event.event.photo"/>
			<svg v-else id="f20e0c25-d928-42cc-98d1-13cc230663ea" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="820.16" height="780.81" viewBox="0 0 820.16 780.81"><defs><linearGradient id="07332201-7176-49c2-9908-6dc4a39c4716" x1="539.63" y1="734.6" x2="539.63" y2="151.19" gradientTransform="translate(-3.62 1.57)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="gray" stop-opacity="0.25"/><stop offset="0.54" stop-color="gray" stop-opacity="0.12"/><stop offset="1" stop-color="gray" stop-opacity="0.1"/></linearGradient><linearGradient id="0ee1ab3f-7ba2-4205-9d4a-9606ad702253" x1="540.17" y1="180.2" x2="540.17" y2="130.75" gradientTransform="translate(-63.92 7.85)" xlink:href="#07332201-7176-49c2-9908-6dc4a39c4716"/><linearGradient id="abca9755-bed1-4a97-b027-7f02ee3ffa09" x1="540.17" y1="140.86" x2="540.17" y2="82.43" gradientTransform="translate(-84.51 124.6) rotate(-12.11)" xlink:href="#07332201-7176-49c2-9908-6dc4a39c4716"/><linearGradient id="2632d424-e666-4ee4-9508-a494957e14ab" x1="476.4" y1="710.53" x2="476.4" y2="127.12" gradientTransform="matrix(1, 0, 0, 1, 0, 0)" xlink:href="#07332201-7176-49c2-9908-6dc4a39c4716"/><linearGradient id="97571ef7-1c83-4e06-b701-c2e47e77dca3" x1="476.94" y1="156.13" x2="476.94" y2="106.68" gradientTransform="matrix(1, 0, 0, 1, 0, 0)" xlink:href="#07332201-7176-49c2-9908-6dc4a39c4716"/><linearGradient id="7d32e13e-a0c7-49c4-af0e-066a2f8cb76e" x1="666.86" y1="176.39" x2="666.86" y2="117.95" gradientTransform="matrix(1, 0, 0, 1, 0, 0)" xlink:href="#07332201-7176-49c2-9908-6dc4a39c4716"/></defs><title>no data</title><rect x="317.5" y="142.55" width="437.02" height="603.82" transform="translate(-271.22 62.72) rotate(-12.11)" fill="#e0e0e0"/><g opacity="0.5"><rect x="324.89" y="152.76" width="422.25" height="583.41" transform="translate(-271.22 62.72) rotate(-12.11)" fill="url(#07332201-7176-49c2-9908-6dc4a39c4716)"/></g><rect x="329.81" y="157.1" width="411.5" height="570.52" transform="translate(-270.79 62.58) rotate(-12.11)" fill="#fafafa"/><rect x="374.18" y="138.6" width="204.14" height="49.45" transform="translate(-213.58 43.93) rotate(-12.11)" fill="url(#0ee1ab3f-7ba2-4205-9d4a-9606ad702253)"/><path d="M460.93,91.9c-15.41,3.31-25.16,18.78-21.77,34.55s18.62,25.89,34,22.58,25.16-18.78,21.77-34.55S476.34,88.59,460.93,91.9ZM470.6,137A16.86,16.86,0,1,1,483.16,117,16.66,16.66,0,0,1,470.6,137Z" transform="translate(-189.92 -59.59)" fill="url(#abca9755-bed1-4a97-b027-7f02ee3ffa09)"/><rect x="375.66" y="136.55" width="199.84" height="47.27" transform="translate(-212.94 43.72) rotate(-12.11)" fill="#86858e"/><path d="M460.93,91.9a27.93,27.93,0,1,0,33.17,21.45A27.93,27.93,0,0,0,460.93,91.9ZM470.17,135a16.12,16.12,0,1,1,12.38-19.14A16.12,16.12,0,0,1,470.17,135Z" transform="translate(-189.92 -59.59)" fill="#86858e"/><rect x="257.89" y="116.91" width="437.02" height="603.82" fill="#e0e0e0"/><g opacity="0.5"><rect x="265.28" y="127.12" width="422.25" height="583.41" fill="url(#2632d424-e666-4ee4-9508-a494957e14ab)"/></g><rect x="270.65" y="131.42" width="411.5" height="570.52" fill="#fff"/><rect x="374.87" y="106.68" width="204.14" height="49.45" fill="url(#97571ef7-1c83-4e06-b701-c2e47e77dca3)"/><path d="M666.86,118c-15.76,0-28.54,13.08-28.54,29.22s12.78,29.22,28.54,29.22,28.54-13.08,28.54-29.22S682.62,118,666.86,118Zm0,46.08a16.86,16.86,0,1,1,16.46-16.86A16.66,16.66,0,0,1,666.86,164Z" transform="translate(-189.92 -59.59)" fill="url(#7d32e13e-a0c7-49c4-af0e-066a2f8cb76e)"/><rect x="377.02" y="104.56" width="199.84" height="47.27" fill="#86858e"/><path d="M666.86,118a27.93,27.93,0,1,0,27.93,27.93A27.93,27.93,0,0,0,666.86,118Zm0,44.05A16.12,16.12,0,1,1,683,145.89,16.12,16.12,0,0,1,666.86,162Z" transform="translate(-189.92 -59.59)" fill="#86858e"/><g opacity="0.5"><rect x="15.27" y="737.05" width="3.76" height="21.33" fill="#47e6b1"/><rect x="205.19" y="796.65" width="3.76" height="21.33" transform="translate(824.47 540.65) rotate(90)" fill="#47e6b1"/></g><g opacity="0.5"><rect x="451.49" width="3.76" height="21.33" fill="#47e6b1"/><rect x="641.4" y="59.59" width="3.76" height="21.33" transform="translate(523.63 -632.62) rotate(90)" fill="#47e6b1"/></g><path d="M961,832.15a4.61,4.61,0,0,1-2.57-5.57,2.22,2.22,0,0,0,.1-.51h0a2.31,2.31,0,0,0-4.15-1.53h0a2.22,2.22,0,0,0-.26.45,4.61,4.61,0,0,1-5.57,2.57,2.22,2.22,0,0,0-.51-.1h0a2.31,2.31,0,0,0-1.53,4.15h0a2.22,2.22,0,0,0,.45.26,4.61,4.61,0,0,1,2.57,5.57,2.22,2.22,0,0,0-.1.51h0a2.31,2.31,0,0,0,4.15,1.53h0a2.22,2.22,0,0,0,.26-.45,4.61,4.61,0,0,1,5.57-2.57,2.22,2.22,0,0,0,.51.1h0a2.31,2.31,0,0,0,1.53-4.15h0A2.22,2.22,0,0,0,961,832.15Z" transform="translate(-189.92 -59.59)" fill="#4d8af0" opacity="0.5"/><path d="M326.59,627.09a4.61,4.61,0,0,1-2.57-5.57,2.22,2.22,0,0,0,.1-.51h0a2.31,2.31,0,0,0-4.15-1.53h0a2.22,2.22,0,0,0-.26.45,4.61,4.61,0,0,1-5.57,2.57,2.22,2.22,0,0,0-.51-.1h0a2.31,2.31,0,0,0-1.53,4.15h0a2.22,2.22,0,0,0,.45.26,4.61,4.61,0,0,1,2.57,5.57,2.22,2.22,0,0,0-.1.51h0a2.31,2.31,0,0,0,4.15,1.53h0a2.22,2.22,0,0,0,.26-.45A4.61,4.61,0,0,1,325,631.4a2.22,2.22,0,0,0,.51.1h0a2.31,2.31,0,0,0,1.53-4.15h0A2.22,2.22,0,0,0,326.59,627.09Z" transform="translate(-189.92 -59.59)" fill="#fdd835" opacity="0.5"/><path d="M855,127.77a4.61,4.61,0,0,1-2.57-5.57,2.22,2.22,0,0,0,.1-.51h0a2.31,2.31,0,0,0-4.15-1.53h0a2.22,2.22,0,0,0-.26.45,4.61,4.61,0,0,1-5.57,2.57,2.22,2.22,0,0,0-.51-.1h0a2.31,2.31,0,0,0-1.53,4.15h0a2.22,2.22,0,0,0,.45.26,4.61,4.61,0,0,1,2.57,5.57,2.22,2.22,0,0,0-.1.51h0a2.31,2.31,0,0,0,4.15,1.53h0a2.22,2.22,0,0,0,.26-.45,4.61,4.61,0,0,1,5.57-2.57,2.22,2.22,0,0,0,.51.1h0a2.31,2.31,0,0,0,1.53-4.15h0A2.22,2.22,0,0,0,855,127.77Z" transform="translate(-189.92 -59.59)" fill="#fdd835" opacity="0.5"/><circle cx="812.64" cy="314.47" r="7.53" fill="#f55f44" opacity="0.5"/><circle cx="230.73" cy="746.65" r="7.53" fill="#f55f44" opacity="0.5"/><circle cx="735.31" cy="477.23" r="7.53" fill="#f55f44" opacity="0.5"/><circle cx="87.14" cy="96.35" r="7.53" fill="#4d8af0" opacity="0.5"/><circle cx="7.53" cy="301.76" r="7.53" fill="#47e6b1" opacity="0.5"/></svg>	
		</div>
	</nuxt-link>

		<div class="event__bottom">
			
			<div class="event__details" v-if="!pageContext || pageContext == 'myevents'">
				<p class="event__details__text__name events__details__name">{{event.name}}</p>
				<p class="event__details__text"></p>
					
				<p class="event__details__text">Venue: {{ event.venue }}</p>
				<p class="event__details__text">Time: {{event.start_time | normalizeDate}}</p>
				<p class="event__details__text" v-if="event.user && pageContext !== 'myevents'">Posted by: {{event.user.name}}</p>
				<p class="event__details__text">Reminders set: {{event.potential_attendees || '0'}}</p>
			</div>

			<div class="event__details" v-if="pageContext === 'reminders'">
				<p class="event__details__text__name events__details__name">{{event.event.name | uppercase}}</p>
				<p class="event__details__text"> First reminder time {{event.first_reminder_time | normalizeDate }}</p>
				<p class="event__details__text"> Second reminder time {{event.second_reminder_time  | normalizeDate}}</p>
				<p class="event__details__text"> Medium: {{event.location }}</p>
			</div>

			<div class="event__details" v-if="pageContext === 'bookmarks'">
				<p class="event__details__text__name events__details__name">{{event.event.name | uppercase}}</p>
	
				<p class="event__details__text">Venue: {{ event.event.venue }}</p>
				<p class="event__details__text">Time: {{event.event.start_time | normalizeDate}}</p>
				<p class="event__details__text">Posted by: </p>
			</div>

			<div class="event__bottom__menu" @click="toggleMenu">
				<div class="event__bottom__menu__item"></div>
				<div class="event__bottom__menu__item"></div>
				<div class="event__bottom__menu__item"></div>

			</div>
		</div>

		<div class="mt-2 py-2 w-48 bg-white shadow-xl eventmenu-dropdown" v-if="showMenu && !pageContext" @click.stop>
			<nuxt-link :to="'/events/' + eventSlug" class="block px-4 py-2 text-gray-800 hover:bg-black hover:text-white">View</nuxt-link>
			<a @click="toggleShareMenu" class="block px-4 py-2 text-gray-800 hover:bg-black hover:text-white">Share</a>
			<!--<a @click="setEventToRemind(event)" :href="googleCalendarShareAPI" target="blank"  v-if="event.reminders && !event.reminders.length" href="#" class="block px-4 py-2 text-gray-800 hover:bg-black hover:text-white">Set Reminder</a> -->

			<!--<a @click="setEventToRemind(event)"  href="#" class="block px-4 py-2 text-gray-800 hover:bg-black hover:text-white">Set reminder</a> -->
			<a @click="setEventToRemind(event)"  :href="googleCalendarShareAPI" target="blank" class="block px-4 py-2 text-gray-800 hover:bg-black hover:text-white">Set reminder</a>
			<a @click="bookmark" v-if="typeof(event.bookmarks) === 'undefined' || !event.bookmarks.length" class="block px-4 py-2 text-gray-800 hover:bg-black hover:text-white">Bookmark</a>
		</div>
		
		<div class="mt-2 py-2 w-48 bg-white shadow-xl eventmenu-dropdown" v-if="showMenu && pageContext == 'reminders'" @click.stop>
			<nuxt-link :to="'/events/' + eventSlug" class="block px-4 py-2 text-gray-800 hover:bg-black hover:text-white">View Event</nuxt-link>
			<a @click="deleteReminder(event)" class="block px-4 py-2 text-gray-800 hover:bg-black hover:text-white">Delete</a>
		</div>
		<div class="mt-2 py-2 w-48 bg-white shadow-xl eventmenu-dropdown" v-if="showMenu && pageContext == 'myevents'" @click.stop>
			<nuxt-link :to="'/events/' + eventSlug" class="block px-4 py-2 text-gray-800 hover:bg-black hover:text-white">View Event</nuxt-link>
			<a @click="deleteEvent(event)" class="block px-4 py-2 text-gray-800 hover:bg-black hover:text-white">Delete</a>
		</div>
		<div class="mt-2 py-2 w-48 bg-white shadow-xl eventmenu-dropdown" v-if="showMenu && pageContext == 'bookmarks'" @click.stop>
			<nuxt-link :to="'/events/' + eventSlug" class="block px-4 py-2 text-gray-800 hover:bg-black hover:text-white">View Event</nuxt-link>
			<a @click="removeBookmark(event)" class="block px-4 py-2 text-gray-800 hover:bg-black hover:text-white">Remove</a>
		</div>

		<div class="mt-2 py-2 w-48 bg-white shadow-xl sharemenu-dropdown" v-if="showShareMenu" @click.stop>
			<a @click="copyLink" class="block px-4 py-2 text-gray-800 hover:bg-black hover:text-white">Copy Link</a>
			<a @click="shareSocial('facebook')" class="block px-4 py-2 text-gray-800 hover:bg-black hover:text-white">Facebook</a>
			<a @click="shareSocial('twitter')" class="block px-4 py-2 text-gray-800 hover:bg-black hover:text-white">Twitter</a>
			<a @click="shareSocial('whatsapp')" class="block px-4 py-2 text-gray-800 hover:bg-black hover:text-white">Whatsapp</a>
			
		</div>
		<!--
		<div class="mt-2 py-2 w-48 bg-white shadow-xl sharemenu-dropdown" v-if="showReminderMenu" @click.stop>
			<a @click="copyLink" class="block px-4 py-2 text-gray-800 hover:bg-black hover:text-white">SMS</a>
			<a @click="copyLink" class="block px-4 py-2 text-gray-800 hover:bg-black hover:text-white">Whatsapp message</a>
			<a @click="copyLink" class="block px-4 py-2 text-gray-800 hover:bg-black hover:text-white">Add to Google Calendar</a>
		</div>-->
    
</div>
</template>


<script>
import moment from 'moment';
import requests from '../requests/events';
import reminderRequests from '../requests/reminders';

import { mapActions } from 'vuex';
import utils from '../utils';


export default {
	props: ['event', 
		'closeModals', 
		'deleteEvent', 
		'pageContext', 
		'deleteReminder', 
		'removeBookmark'],
	computed: {
		eventSlug() {
			return this.event.slug ? this.event.slug : this.event.event.slug;
		},
		googleCalendarShareAPI(){
			//const API_URL = "https://calendar.google.com/calendar/r/eventedit?";
			//const description = this.event.description || `${this.event.name} on ${this.event.venue}`;
			//const normalizedStartTime = this.event.start_time.split('-').join('').split('.').join('').split('-').join('').split(':').join('');
			//const query = `text=${this.event.name}&details=${description}&location=${this.event.venue}&dates=${normalizedStartTime}/${normalizedStartTime}`;
			//return API_URL + query;

			return reminderRequests.googleCalendarShareAPI();

		},
		isAuthenticated() {
			return this.$store.state.auth.isAuthenticated;
		}
	},
	data() {
		return {
			showMenu: false,
			showShareMenu: false,
			showReminderMenu: false,
		}
	},
	methods: {
		...mapActions([
			  'showReminderModal', 
		]),
		editReminder() {

		},

		
		toggleMenu() {
			this.showMenu = !this.showMenu;
		},
		toggleShareMenu() {
			this.showShareMenu = !this.showShareMenu;
		},
		copyLink() {
			var textArea = document.createElement("textarea");
			const text = process.env.frontUrl + '/events/' + this.event.slug;
			textArea.value = text;
			
			// Avoid scrolling to bottom
			textArea.style.top = "0";
			textArea.style.left = "0";
			textArea.style.position = "fixed";

			document.body.appendChild(textArea);
			textArea.focus();
			textArea.select();

			document.execCommand('copy');
			
			document.body.removeChild(textArea);
			this.showShareMenu = false;
			this.showMenu = false;
		},
		shareSocial(platform) {
			const locals = {};
			let text, event_url;
			switch(platform.toLowerCase()) {
				case 'whatsapp': 
					text = 'Set a reminder for ' + this.event.venue + ' event: ' + this.event.name + '. ' + process.env.frontUrl +'/events/'+ this.event.slug ;
					locals.url = 'whatsapp://send?text=' + text;
					break;
				case 'facebook':
					text = 'Set a reminder for ' + this.event.venue + ' event: ' + this.event.name + '. ';
					event_url = process.env.frontUrl +'/events/'+ this.event.slug 
					locals.url = `http://www.facebook.com/sharer.php?u=${event_url}&t=${text}`;
					break;
				case 'twitter': 
					text = 'Set a reminder for ' + this.event.venue + ' event: ' + this.event.name + '. ' ;
					event_url = process.env.frontUrl +'/events/'+ this.event.slug 
					locals.url = `http://twitter.com/share?text=${text}&url=${event_url}&hashtags=sociovent,sociovent,sociovent`;
					break;
				default:
					locals.url = ''
			}

			var a = document.createElement("a");
			document.body.appendChild(a);
			a.href = locals.url;
			a.target = '_blank';
			a.click();
			document.body.removeChild(a);

			this.showShareMenu = false;
			this.showMenu = false;
		},
		bookmark() {
			const self = this;
			if (!this.isAuthenticated) {
				this.$router.push('/auth?action=bookmark&event_id=' + this.event.id);
				return;
			}
			requests.bookmarkEvent(this.event.id).then(()=> {
				//this.event.bookmarks = [0] // just add an item to the list so that bookmarks will stop showing
				//self.$toasted.show("Event added to bookmarks");
			})
		},
		setEventToRemind(event) {
			//this.$store.dispatch('events/toggleReminderModal', event );
			const session_id = utils.getSessionId();

			reminderRequests.setPreReminder({
				session_id: session_id,
				event_id: event.id
			})
		}

	},
	watch: {
		closeModals: function(value) {
			if (value === true) {
				this.showMenu = false;
				this.showShareMenu = false;
				this.showReminderMenu = false;
			}
		}
	},

	filters: {
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
}

</script>

<style lang="scss" scoped>
$break-large: 1120px;
$grid-break-5: 1120px;
$grid-break-4: 830px;
$grid-break-3: 630px;
$grid-break-2: 565px;

.event {
	font-size: 13px;
	background: rgb(255, 255, 255);
	/* authshadow/1 */

	box-shadow: 0px 4px 11px rgba(0, 0, 0, 0.05);
	border-radius: 5px;
	//background: #FFFFFF;
	//@at-rootbox-shadow: 0 16px 64px -16px rgba(46,55,77,.1);
	cursor: pointer;
	//border: 1px solid whitesmoke;
	//border-radius: 5px;
	padding-bottom:15px;
	//box-shadow: 0px 2px 2px rgba(140, 134, 134, 0.25);
    flex: 1 0 20%;
    margin-right: 40px;
    margin-bottom: 40px;
	position: relative;

			@media screen and (max-width: $grid-break-2) {
				flex: 1 0 95%;
				margin-right: 0;
				//max-width: 55%;

      		}
			@media screen and (min-width: $grid-break-2) {
				flex: 1 0 40%;
				//max-width: 40%;

      		}
			
			@media screen and (min-width: $grid-break-3) {
                flex: 1 0 30%;
				//max-width: 25%;

      		}
			@media screen and (min-width: $grid-break-4) {
                flex: 1 0 30%;
				//max-width: 20%;

			}

			@media screen and (min-width: $grid-break-5) {
              //  flex: 1 0 19%;
			//	max-width: 19%;

      		}


	&:hover {
		//box-shadow: 0px 0px 0px rgba(140, 134, 134, 0.25);

	}


	&__image {
        border-radius: 5px;
		position: relative;
		
		&::before {
			content: '';
			display: block;
			position: absolute;
			height: 0%;
			width: 100%;
			bottom: 0;
			transition: height 0.5s ease-out;
			background: linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.664) 100%);
			}
			&:hover::before {
			height: 100%;
			}
        @media screen and (max-width: $grid-break-2) {
            //background: rgba(82, 80, 80, 0.623);
        }
		img, svg {
			width: 100%;
			border-top-left-radius: 5px;
			border-top-right-radius: 5px;
			margin-bottom: 5px;
			height: 250px;
			object-fit: cover;



            @media screen and (max-width: $grid-break-2) {
			    object-fit: cover;
      		}


		}
	}

	&__bottom {
		display: flex;
		padding: 0 5px 0px 10px;
		padding-right: 15px;
		justify-content: space-between;
		&__menu {
			padding-top: 5px;
			height: 30px;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			border-radius: 50%;
			flex: 0 1 10%;
			z-index: 10000;

			&:hover {
			}
			&__item {
				width: 4px;
				height: 4px;
				border-radius: 50%;
				background: black;
				margin-bottom: 3px;
			}
		}
	}
	&__details {
		font-size: 14px;
		color: rgb(96, 96, 96);
		flex: 0 1 95%;
		&__text {
			margin-bottom: 5px;
			&__name {
				font-weight: 600;
				color: black;
			}
		}
	}
}

.eventmenu-dropdown {
	right: 0;
	z-index: 10000;
	position: absolute;
	border: 1px solid lightgrey;
	bottom: -65px;
	@media screen and (max-width: $grid-break-2) {
		
	}
}

.sharemenu-dropdown {
	right: -105px;
    z-index: 10000;
    position: absolute;
    border: 1px solid lightgrey;
    bottom: -131px;
	@media screen and (max-width: $grid-break-2) {
		right: 5px;
		width: 100px;
	}
}


</style>