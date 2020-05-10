<template>
	<div class="contain">	
        <navbar></navbar>
        <div class="page-content">

            <reminder-modal>
                
            </reminder-modal>

            <div class="content">
                <div class="content__container">
                    <div class="content__event">
                        <div class="content__event__image">
                            <img class="content__event__photo" :src="event.photo"/>
                            <div class="content__event__name">{{ event.name || ''}} <p>on {{ event.start_time | normalizeDate }}</p></div>
                        </div>

                        <div class="content__event__action">
                            <div class="content__event__action__container">
                                <button  @click="setReminder"><a style="font-size:16px;" :href="googleCalendarShareAPI" target="blank">Set reminder</a></button>
                                <button @click="changeAction('share')">Share</button>
                                <!--<button v-if="event.bookmarks && !event.bookmarks.length" @click="bookmark">Bookmark</button>-->
                            </div>
                        </div>

                        <div class="content__event__action">
                            <div class="content__event__action__container"  v-if="action.share">
                                    <button @click="copyLink" class="twitter">Copy link</button>
                                    <button @click="shareSocial('twitter')" class="twitter">Twitter</button>
                                    <button @click="shareSocial('facebook')" class="facebook">Facebook</button>
                                    <button @click="shareSocial('whatsapp')"  class="whatsapp">Whatsapp</button>
                                </div>
                               
                                
                        </div>
                        <!--<div class="content__event__reminder">
                            <button class="content__event__reminder--button">Remind me</button>
                        </div> -->
                       
                        <div class="content__event__details">
                            <p class="content__event__poster content__event__details__detail" v-if="event.user">Posted by: {{event.user.name }} (@{{ event.user.username }})</p>
                            <p class="content__event__venue">Venue: {{event.venue}}<a style="color:orange" class="content__event__link" :href="resolvedSocialHandle">(Visit page)</a></p>

                        </div>

                        <div class="content__event__description"> {{event.description || 'No description'}}</div>

                    </div>
                </div>
            </div>

            <div class="related">
                <div class="related__header">People also viewed</div>
                <div class="related__body">
                    <div class="suggestion" @click='goToEvent(event.slug)' v-for="event in similar">
                            <div class="suggestion__photo">
                                <img  v-if="event.photo" :src="event.photo"/>
                                <svg v-else id="f20e0c25-d928-42cc-98d1-13cc230663ea" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="820.16" height="780.81" viewBox="0 0 820.16 780.81"><defs><linearGradient id="07332201-7176-49c2-9908-6dc4a39c4716" x1="539.63" y1="734.6" x2="539.63" y2="151.19" gradientTransform="translate(-3.62 1.57)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="gray" stop-opacity="0.25"/><stop offset="0.54" stop-color="gray" stop-opacity="0.12"/><stop offset="1" stop-color="gray" stop-opacity="0.1"/></linearGradient><linearGradient id="0ee1ab3f-7ba2-4205-9d4a-9606ad702253" x1="540.17" y1="180.2" x2="540.17" y2="130.75" gradientTransform="translate(-63.92 7.85)" xlink:href="#07332201-7176-49c2-9908-6dc4a39c4716"/><linearGradient id="abca9755-bed1-4a97-b027-7f02ee3ffa09" x1="540.17" y1="140.86" x2="540.17" y2="82.43" gradientTransform="translate(-84.51 124.6) rotate(-12.11)" xlink:href="#07332201-7176-49c2-9908-6dc4a39c4716"/><linearGradient id="2632d424-e666-4ee4-9508-a494957e14ab" x1="476.4" y1="710.53" x2="476.4" y2="127.12" gradientTransform="matrix(1, 0, 0, 1, 0, 0)" xlink:href="#07332201-7176-49c2-9908-6dc4a39c4716"/><linearGradient id="97571ef7-1c83-4e06-b701-c2e47e77dca3" x1="476.94" y1="156.13" x2="476.94" y2="106.68" gradientTransform="matrix(1, 0, 0, 1, 0, 0)" xlink:href="#07332201-7176-49c2-9908-6dc4a39c4716"/><linearGradient id="7d32e13e-a0c7-49c4-af0e-066a2f8cb76e" x1="666.86" y1="176.39" x2="666.86" y2="117.95" gradientTransform="matrix(1, 0, 0, 1, 0, 0)" xlink:href="#07332201-7176-49c2-9908-6dc4a39c4716"/></defs><title>no data</title><rect x="317.5" y="142.55" width="437.02" height="603.82" transform="translate(-271.22 62.72) rotate(-12.11)" fill="#e0e0e0"/><g opacity="0.5"><rect x="324.89" y="152.76" width="422.25" height="583.41" transform="translate(-271.22 62.72) rotate(-12.11)" fill="url(#07332201-7176-49c2-9908-6dc4a39c4716)"/></g><rect x="329.81" y="157.1" width="411.5" height="570.52" transform="translate(-270.79 62.58) rotate(-12.11)" fill="#fafafa"/><rect x="374.18" y="138.6" width="204.14" height="49.45" transform="translate(-213.58 43.93) rotate(-12.11)" fill="url(#0ee1ab3f-7ba2-4205-9d4a-9606ad702253)"/><path d="M460.93,91.9c-15.41,3.31-25.16,18.78-21.77,34.55s18.62,25.89,34,22.58,25.16-18.78,21.77-34.55S476.34,88.59,460.93,91.9ZM470.6,137A16.86,16.86,0,1,1,483.16,117,16.66,16.66,0,0,1,470.6,137Z" transform="translate(-189.92 -59.59)" fill="url(#abca9755-bed1-4a97-b027-7f02ee3ffa09)"/><rect x="375.66" y="136.55" width="199.84" height="47.27" transform="translate(-212.94 43.72) rotate(-12.11)" fill="#86858e"/><path d="M460.93,91.9a27.93,27.93,0,1,0,33.17,21.45A27.93,27.93,0,0,0,460.93,91.9ZM470.17,135a16.12,16.12,0,1,1,12.38-19.14A16.12,16.12,0,0,1,470.17,135Z" transform="translate(-189.92 -59.59)" fill="#86858e"/><rect x="257.89" y="116.91" width="437.02" height="603.82" fill="#e0e0e0"/><g opacity="0.5"><rect x="265.28" y="127.12" width="422.25" height="583.41" fill="url(#2632d424-e666-4ee4-9508-a494957e14ab)"/></g><rect x="270.65" y="131.42" width="411.5" height="570.52" fill="#fff"/><rect x="374.87" y="106.68" width="204.14" height="49.45" fill="url(#97571ef7-1c83-4e06-b701-c2e47e77dca3)"/><path d="M666.86,118c-15.76,0-28.54,13.08-28.54,29.22s12.78,29.22,28.54,29.22,28.54-13.08,28.54-29.22S682.62,118,666.86,118Zm0,46.08a16.86,16.86,0,1,1,16.46-16.86A16.66,16.66,0,0,1,666.86,164Z" transform="translate(-189.92 -59.59)" fill="url(#7d32e13e-a0c7-49c4-af0e-066a2f8cb76e)"/><rect x="377.02" y="104.56" width="199.84" height="47.27" fill="#86858e"/><path d="M666.86,118a27.93,27.93,0,1,0,27.93,27.93A27.93,27.93,0,0,0,666.86,118Zm0,44.05A16.12,16.12,0,1,1,683,145.89,16.12,16.12,0,0,1,666.86,162Z" transform="translate(-189.92 -59.59)" fill="#86858e"/><g opacity="0.5"><rect x="15.27" y="737.05" width="3.76" height="21.33" fill="#47e6b1"/><rect x="205.19" y="796.65" width="3.76" height="21.33" transform="translate(824.47 540.65) rotate(90)" fill="#47e6b1"/></g><g opacity="0.5"><rect x="451.49" width="3.76" height="21.33" fill="#47e6b1"/><rect x="641.4" y="59.59" width="3.76" height="21.33" transform="translate(523.63 -632.62) rotate(90)" fill="#47e6b1"/></g><path d="M961,832.15a4.61,4.61,0,0,1-2.57-5.57,2.22,2.22,0,0,0,.1-.51h0a2.31,2.31,0,0,0-4.15-1.53h0a2.22,2.22,0,0,0-.26.45,4.61,4.61,0,0,1-5.57,2.57,2.22,2.22,0,0,0-.51-.1h0a2.31,2.31,0,0,0-1.53,4.15h0a2.22,2.22,0,0,0,.45.26,4.61,4.61,0,0,1,2.57,5.57,2.22,2.22,0,0,0-.1.51h0a2.31,2.31,0,0,0,4.15,1.53h0a2.22,2.22,0,0,0,.26-.45,4.61,4.61,0,0,1,5.57-2.57,2.22,2.22,0,0,0,.51.1h0a2.31,2.31,0,0,0,1.53-4.15h0A2.22,2.22,0,0,0,961,832.15Z" transform="translate(-189.92 -59.59)" fill="#4d8af0" opacity="0.5"/><path d="M326.59,627.09a4.61,4.61,0,0,1-2.57-5.57,2.22,2.22,0,0,0,.1-.51h0a2.31,2.31,0,0,0-4.15-1.53h0a2.22,2.22,0,0,0-.26.45,4.61,4.61,0,0,1-5.57,2.57,2.22,2.22,0,0,0-.51-.1h0a2.31,2.31,0,0,0-1.53,4.15h0a2.22,2.22,0,0,0,.45.26,4.61,4.61,0,0,1,2.57,5.57,2.22,2.22,0,0,0-.1.51h0a2.31,2.31,0,0,0,4.15,1.53h0a2.22,2.22,0,0,0,.26-.45A4.61,4.61,0,0,1,325,631.4a2.22,2.22,0,0,0,.51.1h0a2.31,2.31,0,0,0,1.53-4.15h0A2.22,2.22,0,0,0,326.59,627.09Z" transform="translate(-189.92 -59.59)" fill="#fdd835" opacity="0.5"/><path d="M855,127.77a4.61,4.61,0,0,1-2.57-5.57,2.22,2.22,0,0,0,.1-.51h0a2.31,2.31,0,0,0-4.15-1.53h0a2.22,2.22,0,0,0-.26.45,4.61,4.61,0,0,1-5.57,2.57,2.22,2.22,0,0,0-.51-.1h0a2.31,2.31,0,0,0-1.53,4.15h0a2.22,2.22,0,0,0,.45.26,4.61,4.61,0,0,1,2.57,5.57,2.22,2.22,0,0,0-.1.51h0a2.31,2.31,0,0,0,4.15,1.53h0a2.22,2.22,0,0,0,.26-.45,4.61,4.61,0,0,1,5.57-2.57,2.22,2.22,0,0,0,.51.1h0a2.31,2.31,0,0,0,1.53-4.15h0A2.22,2.22,0,0,0,855,127.77Z" transform="translate(-189.92 -59.59)" fill="#fdd835" opacity="0.5"/><circle cx="812.64" cy="314.47" r="7.53" fill="#f55f44" opacity="0.5"/><circle cx="230.73" cy="746.65" r="7.53" fill="#f55f44" opacity="0.5"/><circle cx="735.31" cy="477.23" r="7.53" fill="#f55f44" opacity="0.5"/><circle cx="87.14" cy="96.35" r="7.53" fill="#4d8af0" opacity="0.5"/><circle cx="7.53" cy="301.76" r="7.53" fill="#47e6b1" opacity="0.5"/></svg>	

                            </div>
                            <div class="suggestion__details">
                                <p class="suggestion__details__name" v-if="event.name">{{ event.name }}</p>
                                <p class="suggestion__details__venue">on <b>{{ event.venue }}</b> by </p>
                                <p class="suggestion__details__venue">{{ event.start_time | normalizeDate }}</p>
                            </div>
                    </div>
                    
                </div>
            </div>
        </div>
	</div>
</template>

<script>
import Logo from '~/components/Logo.vue'
import Navbar from '~/components/navbar.vue';
import requests from '../../requests/events';
import reminderRequests from '../../requests/reminders';
import ShareIcon from '~/components/shareicon.vue';
import BookmarkIcon from '~/components/bookmarkicon.vue';
import ReminderIcon from '~/components/remindericon.vue';
import ReminderModal from '~/components/remindermodal.vue'
import filters from '../../filters';
import utils from '../../utils';

import { request, checkAuthStatus, toggleButtonActiveness } from '../../utils';


utils.googleAnalytics();

export default {
	components: {
        Logo,
        Navbar,
        ShareIcon,
        BookmarkIcon,
        ReminderIcon,
        ReminderModal

        
    },
  

    head () {
        return {
        title: this.event.name,
        /*
        script: [
            { src: 'https://www.googletagmanager.com/gtag/js?id=UA-165985781-1', defer: true }
        ],*/
        meta: [
            {
                name: 'twitter:title',
                content: this.event.name
            },
            {
                name: 'twitter:description',
                content: this.event.description || this.event.venue + 'event: '+ this.event.name + ' on Sociovent'
            },
            {
                name: 'twitter:image',
                content: this.event.photo,
            },
            {
                name: 'og:title',
                content: this.event.name
            },
            {
                name: 'og:description',
                content: this.event.description || this.event.venue + 'event: '+ this.event.name + ' on Sociovent'
            },
            {
                name: 'og:image',
                content: this.event.photo,
            },
            {
                name: 'og:url',
                content: process.env.url + '/events' + this.event.slug,
            },
            // hid is used as unique identifier. Do not use `vmid` for it as it will not work
            { hid: 'description', name: 'description', content: this.event.description || this.event.venue + 'event: '+ this.event.name + ' on Sociovent'}
        ]
        }
    },

    async asyncData ({ params }) {
        let slug = params.slug;
    
        return requests.getEvent(slug)
            .then(async resp=> {
                const similar = await  utils.request(`/events/${resp.data.data.id}/similar?limit=10`, 'get');
                return {
                    similar: similar.data.data.events,
                    event: resp.data.data,

                }
                
            })
    },

    filters: filters,

	data() {
		return {
			isAuthenticated: false,
            action: {
                reminder: false,
                share: false,
                bookmark: false
            }
		}
	},
	async created() {
        utils.setSessionId();

        let authstatus = await checkAuthStatus();
        if (authstatus === 1) {
            this.isAuthenticated = true;
            return;
        }
       
        this.isAuthenticated = false;
	},
	methods: {
        goToEvent(slug) {
            this.$router.push('/events/' + slug);
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
        verifyAuth() {
            if (!this.isAuthenticated) {
                this.$router.push('/auth?goto=event_detail&pagename=' + this.event.slug)
                return;
            }
        },
		setReminder() {
            const session_id = utils.getSessionId();

            reminderRequests.setPreReminder({
				session_id: session_id,
				event_id: this.event.id
            })
            
            
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
					text = 'Set a reminder for ' + this.event.venue + ' event: ' + this.event.name + '. ' + process.env.frontUrl +'/events/'+ this.event.slug ;
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
        bookmarkEvent() {

        },
        changeAction(name) {
            //this.verifyAuth()
            this.action[name] = true;
            Object.keys(this.action).forEach(action=> {
                if (action !== name) {
                    this.action[action] = false;
                }
            })
        },
        showReminderModal(event) {
            this.verifyAuth()
            this.$store.dispatch('events/toggleReminderModal', this.event )

        },
        bookmark() {
            this.verifyAuth();
			const self = this;
			requests.bookmarkEvent(this.event.id).then(()=> {
				this.event.bookmarks = [0] // just add an item to the list so that bookmarks will stop showing
				//self.$toasted.show("Event added to bookmarks");
			}).catch(err=> {
                if (!err.response) {
                    alert(err)
                }
                else {
                    alert(err.response.data.message)
                }
            })
        }
		
    },
    computed: {
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
					result = 'https://twitch.tv/' + host_social_handle
					break;
				default: 
					result = '';
					break;
			}

			return result;
        },
        googleCalendarShareAPI(){
			
			return reminderRequests.googleCalendarShareAPI();

		},
    }
}

</script>

<style lang="scss" scoped>
$break-point-1: 860px;

/* Sample `apply` at-rules with Tailwind CSS
.container {
  @apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
* {
}

.page-content {
    display: flex;

            @media screen and (max-width: $break-point-1) {
			    flex-direction: column;
      		}
    
}
.contain {
    min-height: 100vh;
    display: flex;
    background: #EEEEEE;
    flex-direction:column;
}

.content { 
    padding-top: 70px;
    flex: 1 0 75%;
    
    
    &__container {
        width: 70%;
        margin: auto;
        background: white;
        border-radius: 3px;
	    border: 1px solid #dfe1e6;
        font-size: 14px;

            @media screen and (max-width: $break-point-1) {
                width: 90%;
            }
    }
    &__event{ 
        border-radius: 10px;

        &__image {
            border-radius: 10px;
            background-color:white;
            position: relative;
            height: 600px;

            @media screen and (max-width: $break-point-1) {
                height: 300px
            }
            img {
                border-top-left-radius: 3px;
                border-top-right-radius: 3px;
			    max-height: 600px;
                height: 100%;
                width: 100%;
                object-fit: contain;

                @media screen and (max-width: $break-point-1) {
                    object-fit: contain;

                }
            }

        }

        &__action {
            border-bottom: 1px solid #dfe1e6 ;
            //margin-bottom: 20px;
            background: whitesmoke;

            @media screen and (max-width: $break-point-1) {
                
            }
            &__container{ 

                display: flex; 
                width: 70%;   
                justify-content: center;
                margin: auto;
                padding: 10px 20px;
                flex-wrap: wrap;

                @media screen and (max-width: $break-point-1) {
                    object-fit: contain;
                    font-size: 12px;
                    width: 100%;
                    justify-content: center;

                }

                button {
                    padding: 3px 15px;
                    object-fit: contain;
                    font-weight:500;
                    font-size: 16px !important;

                    @media screen and (max-width: $break-point-1) {
                        object-fit: contain;

                    }
                }
            }
        }


       

        &__details {
            display: flex;
            flex-direction: column;
            justify-content: center;
            margin-bottom: 10px;
            padding-top: 20px;

            p {
                margin-bottom: 3px;
            }

        }

        &__description {
            text-align: left;
            line-height: 25px;
            padding: 15px;
            font-size: 14px;
        }

        &__name {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            width: 100%;
            text-align: center;
            background: rgba(0, 0, 0, 0.513);
            font-size: 20px;
            padding: 30px 10px;
            color: rgb(216, 213, 213);
        }
        p, a {
            padding: 0px 10px;
            font-size: 14px;
        }

        &__reminder {
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
            padding: 0 20px;
            button {
               
            }
        }
    }
}

.related {
	flex: 1 0 25%;
    padding-top: 70px;
    @media screen and (max-width: $break-point-1) {
        flex-direction: column;
    }
    &__header{
        color: #5e6c84;
        font-weight: 600;
        font-size: 15px;
        margin-bottom: 10px;
        padding-bottom: 10px;
        padding-right: 10px;
        border-bottom: 0.5px solid  lightgrey;
        @media screen and (max-width: $break-point-1) {
            text-align: center;
        }
    }
    &__body {
        @media screen and (max-width: $break-point-1) {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }
    }
}

.suggestion {
    display: flex;
    color: #5e6c84;
    margin-bottom: 20px;
    &:hover {
        cursor:pointer;
    }
    justify-content: space-between;
    @media screen and (max-width: $break-point-1) {
        flex-direction: column;
        margin: auto;
        width: 70%;
        margin-bottom: 15px;
        border-radius: 5px;

    }
    &__photo {
        margin-right: 10px;
	    flex: 1 0 40%;
        background: whitesmoke;

        @media screen and (max-width: $break-point-1) {
            width: 100%;
            border-radius: 5px;
        }
        img {
            width: 100%;
            object-fit: contain;
            height: 90px;

            @media screen and (max-width: $break-point-1) {
                width: 100%;
                border-radius: 5px;
                height: 200px;

            }
        }
        svg {
            width: 100%;
            object-fit: contain;
            height: 90px;
            @media screen and (max-width: $break-point-1) {
                width: 100%;
                border-radius: 5px;
                height: 200px;

            }
        }
    }
    &__details {
        display: flex;
        flex-direction: column;
        justify-content: center;
        
        flex: 1 0 60%;
        font-size: 12px;
        @media screen and (max-width: $break-point-1) {
            background: white;
            padding-top: 5px;
            padding:5px;
            align-items: center;
            padding-bottom: 10px;
        }
       
        &__name {
            font-weight: 600;;
        }

    }
}
</style>
