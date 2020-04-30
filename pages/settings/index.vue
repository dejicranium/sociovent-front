<template>
	<div class="contain">	
        <navbar></navbar>
        <div class="page-content">
            <div class="vld-parent" v-if="loadingContent">
                <loading :active.sync="loadingContent" 
                :can-cancel="false" 
                :is-full-page="true"></loading>
                
            </div>
            <div class="content" v-else> 
                <div class="sidebar">
                    <div class="sidebar-item" @click="changeView('profile')">Profile</div>
                    <div class="sidebar-item" @click="changeView('security')">Security</div>
                </div>

                <div class="panel">
                    <div class="panel__container">
                        <div class="panel__profile" v-if="profile">
                            <div class="panel__form-group">
                                <div class="panel__form-field">
                                    <label for="">Name</label>
                                    <input v-model="user.name"></input>
                                </div>
                                <div class="panel__form-field">
                                    <label for="">Username</label>
                                    <input v-model="user.username"></input>
                                </div>
                            </div>
                            <div class="panel__form-group">
                                <div class="panel__form-field">
                                    <label for="">Email</label>
                                    <input v-model="user.email"></input>
                                </div>
                                <div class="panel__form-field">
                                    <label for="">Phone no.</label>
                                    <input v-model="user.phone"></input>
                                </div>
                            </div>
                            <div class="panel__form-group">
                                <div class="panel__form-field">
                                    <label for="">Instagram</label>
                                    <input v-model="user.social_links.instagram_handle"></input>
                                </div>
                                <div class="panel__form-field">
                                    <label for="">Twitter</label>
                                    <input v-model="user.social_links.twitter_handle"></input>
                                </div>
                            </div>
                            <div class="panel__form-group">
                                <div class="panel__form-field">
                                    <label for="">Facebook</label>
                                    <input v-model="user.social_links.facebook_handle" ></input>
                                </div>
                                <div class="panel__form-field">
                                    <label for="">Youtube</label>
                                    <input v-model="user.social_links.youtube_handle"></input>
                                </div>
                            </div>
                            <div class="panel__form-group">
                                <div class="panel__form-field">
                                    <label for="">Twitch</label>
                                    <input v-model="user.social_links.twitch_handle"></input>
                                </div>
                                <div class="panel__form-field">
                                </div>
                            </div>
                        </div>

                        <div class="panel__profile" v-else>
                            <div class="panel__form-group">
                                <div class="panel__form-field">
                                    <label for="">Old password</label>
                                    <input v-model="passwordChange.old_password"></input>
                                </div>
                                <div class="panel__form-field">
                                   
                                </div>
                            </div>
                            <div class="panel__form-group">
                                <div class="panel__form-field">
                                    <label for="">New Password</label>
                                    <input v-model="passwordChange.password"></input>
                                </div>
                                <div class="panel__form-field">
                                    <label for="">Confirm password</label>
                                    <input v-model="passwordChange.password_confirmation"></input>
                                </div>
                            </div>

                        </div>
                        <button class="btn-save" @click="saveChanges">Save</button>
                    </div>

                    
                </div>
            </div>
        </div>
	</div>
</template>

<script>
import Logo from '~/components/Logo.vue'
import Navbar from '~/components/navbar.vue';
import requests from '../../requests/auth';

import filters from '../../filters';
import utils from '../../utils';
import { parseZone } from 'moment';
import Loading from 'vue-loading-overlay';
// Import stylesheet
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
	components: {
        Logo,
        Navbar,
        Loading,
        
    },

    created() {
            this.getSelf();
    },
    
    computed: {
       
    },

    data() {
        return {
            loadingContent: false,
            profile: true,
            security: false,
            user: {
                social_links: {}
            },

            passwordChange: {
                old_password: '',
                password: '',
                password_confirmation: ''
            }
            
        }
    },

    methods: {
        changeView(name) {
          if (name == 'security') {
              this.security = true;
              this.profile = false;
          }
          if (name == 'profile') {
              this.profile = true;
              this.security =false;
          }
        },

        saveChanges() {

            if (this.profile) {
                const data = this.user;
                data.social_links = JSON.stringify(data.social_links);
                
                requests.editSelf(data)
                    .then(resp=> {
                        this.getSelf()
                    })
                    .catch(err=> {
                        alert(err.response.data.message)
                    })
                
            }
            else {
                const data = this.passwordChange;
                requests.changePassword(data)
                    .then(resp=> {
                        alert("Password changed");

                    })
                    .catch(err=> {
                        alert(err.response.data.message);
                    })

            }
            
        },

        getSelf() {
            this.loadingContent = true;
            requests.getSelf()
                .then(resp=> {
                this.loadingContent = false;

                   this.user = resp.data.data; 
                })
                .catch(err=> {
                    this.loadingContent = false;
                    alert(err)
                })
        }
    },

    computed: {
        socialLinks() {
            if (this.user) {

                const parsed = this.user.social_links;
                return {
                    facebook: parsed.facebook_handle,
                    twitter: parsed.twitter_handle,
                    instagram: parsed.instagram_handle,
                    twitch: parsed.twitch_handle,
                    youtube: parsed.youtube_handle
                }
            }
            return {}
        }

        
    }

    
}

</script>

<style lang="scss" scoped>
$break-point-1: 860px;
$modal-break-1: 760px;


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
    padding-top: 100px;
    padding-right: 16px;
    padding-left: 16px;
    display: flex;
    width: 100%;
    justify-content: center;



    @media screen and (max-width: $modal-break-1) {
		flex-direction: column;
	}


}
.sidebar {
    display: flex;
    flex-direction: column;
    font-size: 14px;
    color: black;
    flex: 1 0 20%;
    margin-right: 50px;
    max-width: 300px;
    background: white;
    text-align: center;
    border: 1px solid lightgrey;
    justify-content: center;
    height: 100px;

    @media screen and (max-width: $modal-break-1) {
        margin-bottom: 10px;;
        width: 100%;

    }

    &-item {
        padding: 10px 6px;
        cursor: pointer;
        border-bottom: 1px solid lightgrey;

        &:last-of-type {
            border: 0;
        }

        &:hover {
            background: whitesmoke;
        }
    }

}
.panel {
    background: white;
    text-align: center;
    border: 1px solid lightgrey;
    flex: 1 0 50%;
    max-width: 700px;

    @media screen and (max-width: $modal-break-1) {
			width: 100%;
	}
    
    &__container {
        padding: 15px 30px;
        display: flex;
        flex-direction: column;
    }

    &__form-group {
        display: flex;
        justify-content: space-between;
        margin-bottom: 30px;;
        @media screen and (max-width: $modal-break-1) {
            flex-direction: column;
            margin-bottom: 0;;

        }
    }

    &__form-field {
        font-size: 14px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        width: 48%;
        @media screen and (max-width: $modal-break-1) {
            margin-bottom: 10px;;
            width: 100%;

        }

        input {
            padding: 3px 10px;
            border-radius: 2px;
            outline: teal;
            background-color: #f4f5f7 !important;
            border: 1px solid #dfe1e6 !important;
            width: 100%;
        }
    }

}

.btn-save {
    background: black;
    color: white;
    max-width: 300px;
    padding: 5px 10px;
    border-radius: 5px;
    align-self: flex-end;

}

</style>
