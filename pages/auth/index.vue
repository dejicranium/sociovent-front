<template>
    <div class="wrapper">
        <div class="sidebar">
            <div class="sidebar-wrapper">
                <p class="sidebar__header">Sociovent</p>
                <p class="sidebar__body__header">Create social media events</p>
                <p class="sidebar__body__desc">Get discovered, share with your network and potential sponsors</p>
                <nuxt-link to="#" class="sidebar__body__link">Privacy Policy</nuxt-link>
            </div>
        </div>
        <div class="content">
			<div class="auth">
				<div class="auth__tabs">
					<div class="auth__tabs__tab" :class="[authMode == 1 ? 'isActive' : '']" @click="switchAuthMode">Log in</div>
					<div class="auth__tabs__tab" :class="[authMode == 0 ? 'isActive' : '']"   @click="switchAuthMode">Sign Up</div>
				</div>
				<div class="auth__signup auth__box" v-if="authMode == 0">
					<!--<p class="auth__header">Create your Sociovent account</p>-->
					<label class="auth__box__error" v-if="authErrorMessage">{{ authErrorMessage }}</label>

					<form  class="form" @submit.prevent="signup">
						<div class="form__div">
							<label>Name <label class="red">*</label></label>
							<input type="text" class="form__control" v-model="signupData.name" placeholder="">
						</div>
						<div class="form__div">
							<label>E-mail address <label class="red">*</label></label>

							<input type="text" class="form__control" v-model="signupData.email" placeholder=""/>
						</div>
						<div class="form__div">
							<label>Username <label class="red">*</label></label>

							<input type="text" class="form__control" v-model="signupData.username" placeholder=""/>
						</div>
						<div class="form__div">
							<label>Password <label class="red">*</label></label>

							<input type="password" class="form__control" v-model="signupData.password" placeholder="">
						</div>
                        <!--
						<div class="form__div">
							<label>Instagram Handle</label>

							<input type="text" class="form__control" v-model="signupData.instagram_handle" placeholder="">
						</div>
						<div class="form__div">
							<label>Twitter Handle</label>

							<input type="text" class="form__control" v-model="signupData.twitter_handle" placeholder="">
						</div>-->
						<div class="form__div">
							<button id="a" type="button" class="form__control form__control__submit" @click="signup">Sign up</button>
						</div>

					</form>

				</div>
				<div class="auth__signup auth__box" v-else>
					<!--<p class="auth__header">Sign in to Sociovent</p>-->

					<label class="auth__box__error" v-if="authErrorMessage">{{ authErrorMessage }}</label>
					<form class="form" @submit.prevent="signin">
						<div class="form__div">
							<label>Username or email address</label>
							<input type="text" v-model="loginData.identifier" class="form__control" />
						</div>
						<div class="form__div">
							<label>Password</label>
							<input type="password" v-model="loginData.password" class="form__control" placeholder="">
						</div>
						<div class="form__div">
							<button  @click="signin" id="signinButton" type="button" class="form__control form__control__submit">Sign in</button>
						</div>

					</form>

				</div>
				<!--<p class="signin-prompt" v-if="authMode == 0"> Already have an account? <a href="#" @click="switchAuthMode">Sign In</a></p>
				<p class="signin-prompt" v-else> Don't have an account? <a href="#" @click="switchAuthMode">Sign Up</a></p>-->
			</div>
        </div>
    </div>
</template>


<script>
import Logo from '~/components/Logo.vue'
import axios from 'axios'
import { request, checkAuthStatus, toggleButtonActiveness } from '../../utils';
import Cookies from 'js-cookie';
import eventrequests from '../../requests/events';
export default {
    	components: {
		Logo
	},
	data() {
		return {
			authMode: 1, // 0 = signup, 1=siginin
			authError: true,
			authErrorMessage: '',
			action: '',
			signupData: {
				username: '',
				name: '',
				instagram_handle: '',
				twitter_handle: '',
				email: '',
				password: '',
			},
			loginData: {
				identifier: '',
				password: '',
			}
		}
	},

	async created() {
		let authStatus = await checkAuthStatus();
		if (authStatus) {
			this.$router.push('/')
		}		
		this.action = this.$route.query['action']; // get action that should be used after this;
	},
	methods: {
		switchAuthMode() {
			this.authError = false; // don't show error if there is one already
			this.authMode = this.authMode ? 0 : 1
		},

		decideNextPage() {
			let query = {};
			if (this.$route.query) {
				query = this.$route.query;
			}
			if (query.goto) {
				switch(query.goto) {
					case "event_detail":
						if (query.pagename) {
							this.$router.push('/events/' + query.pagename)
							break;
						}
						else {

							this.$router.push('/')
						}
				}
			}

		},

		validateSignupFields() {
			const requiredFields = ['username', 'name', 'email', 'password'];
			let error = 1;
			for (let i = 0; i < requiredFields.length; i++) {
				let field = requiredFields[i];
				if (!this.signupData[field]) {
					this.authErrorMessage = field + ' is required';
					error = 0;
					break;
				}
			}
			return error;
		},
		signin(from=null) {
			this.authErrorMessage = '';
			let queryString = '';
			let l = null;
			if (!from) {

				l = document.getElementById('signinButton');
	
				const original_text= l.innerText;
	
				toggleButtonActiveness(l, original_text)
			}

			this.decideNextPage();
			if (this.action) {
				switch(this.action) {
					case 'createEvent':
						queryString = `?action=createEvent`;
						break;
					default:
						queryString = `?action=createEvent`;
						break;
				}
			}

			const data = {
				identifier: this.loginData.identifier,
				password: this.loginData.password,
			}

			request('/auth/signin', 'post', {}, data)
				.then(resp=> {

					Cookies.set('socioventtoken', resp.data.data.token)
					this.$store.commit('auth/setAuthenticated', true);
					if (queryString) {

						this.$router.push('/' + queryString);
					}
					else {
						if(!from) {

							toggleButtonActiveness(l, original_text)
						}
						this.$router.push('/')
					}

					if (this.$route.query['action']== 'bookmark' && this.$route.query['event_id']) {
						eventrequests.bookmarkEvent(this.$route.query['event_id']).then(()=> {
							//this.event.bookmarks = [0] // just add an item to the list so that bookmarks will stop showing
							//self.$toasted.show("Event added to bookmarks");
						})
					}

					
				})
				.catch(err=> {
					this.authError = true;
					if (!from) toggleButtonActiveness(l, original_text)
					if (err.response && err.response.data && err.response.data.message) {

						this.authErrorMessage = err.response.data.message
					}
					else {
						this.authErrorMessage =err
						alert(this.authErrorMessage)
					}
				})

		},

		signup(e) {
			this.authErrorMessage = '';
			let queryString = '';
			let button = document.getElementById('a');
			const original_text = button.innerText;
			toggleButtonActiveness(button, original_text)

			if (!this.validateSignupFields()) {
				toggleButtonActiveness(button, original_text)

				return;
			}

			this.decideNextPage();


			
			const data = {
				social_links: JSON.stringify({
					instagram_handle: this.signupData.instagram_handle,
					twitter_handle: this.signupData.twitter_handle
				}),
				username: this.signupData.username,
				email: this.signupData.email,
				password: this.signupData.password,
				name: this.signupData.name
			}

			request('/auth/signup', 'post', {}, data)
				.then(resp=> {
					this.loginData.identifier = this.signupData.username;
					this.loginData.password = this.signupData.password;
					this.signin(true);
					toggleButtonActiveness(button, original_text)
					if (this.$route.query['action']== 'bookmark' && this.$route.query['event_id']) {
						eventrequests.bookmarkEvent(this.$route.query['event_id']).then(()=> {
							//this.event.bookmarks = [0] // just add an item to the list so that bookmarks will stop showing
							//self.$toasted.show("Event added to bookmarks");
						})
					}

				})
				.catch(err=> {			
					toggleButtonActiveness(button, original_text)
					this.authError = true;
					if (err.response && err.response.data && err.response.data.message) {

						this.authErrorMessage = err.response.data.message
					}
					else {
						this.authErrorMessage =err
						alert(this.authErrorMessage)
					}
				})
		}
		
	}
}
</script>


<style lang="scss" scoped>
$break-point-1: 1000px;
$break-point-2: 860px;



.wrapper {
    //background: white;
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;;
    background:white;
    justify-content: space-between;
	@media screen and (max-width: $break-point-1) {
		position: fixed;
		width: 100%;
		height: 100px;
		flex-direction: column;
	}
      
	  
	
    
}
.sidebar {
    background: url('../../static/abstract.jpg');
    
    position: fixed;
    top: 0;
	left: 0;
    width: 30%;
    height: 100vh;
    box-shadow: 0px 4px 11px rgba(0, 0, 0, 0.05);
	
	@media screen and (max-width: $break-point-1) {
		position: fixed;
		width: 100%;
		height: 300px;	
	}


    &-wrapper {
        background: rgba(0, 0, 92, 0.75);;
        position: absolute;
        top: 0;
        right: 0;
        height: 100%;
        box-shadow: 10px 10px 11px rgba(0, 0, 0, 0.05);
        padding: 20px 30px;
        color: white;
        width:100%;
		@media screen and (max-width: $break-point-1) {
			width: 100%;
			height: 300px;	
			text-align: center;
		}

    }
    &__header {
        font-weight: 600;
        color: white;
        box-shadow: 10px 10px 11px rgba(0, 0, 0, 0.05);
        padding: 10px 0px;
        font-size: 36px;
    }
    &__body {
        &__header {
            margin-top:200px;
            font-weight: 500;
            font-size: 26px;
            margin-bottom: 20px;
			@media screen and (max-width: $break-point-1) {
				width: 100%;
				height: 100px;	
				text-align: center;
				display: none;
			}
        }
        &__desc {
           font-size: 18px;
           max-width: 300px;
           @media screen and (max-width: $break-point-1) {
				width: 100%;
				height: 100px;	
				text-align: center;
				display: none;
			}
        }
        &__link {
            position: absolute;
            bottom: 20px;
			@media screen and (max-width: $break-point-1) {
				width: 100%;
				height: 100px;	
				text-align: center;
				display: none;
			}
        }
    }

}

.content {
    width: 70%;
	height: 100%;
	
	@media screen and (max-width: $break-point-2) {
		width: 85%;

	}

	@media screen and (min-width: $break-point-1) {
		position: absolute;
		right: 0;
		top: 0;
		bottom:0;
		padding: 120px 20px 0px 20%;
	}
	@media screen and (max-width: $break-point-1) {
		margin:auto;
		z-index: 1000;
		background-color: white;
		margin-top: 150px;
	}
}

.auth {
    width: 70%;

	@media screen and (max-width: $break-point-1) {
		width: 100%;
		padding: 20px;
		background: white;
	}
	&__header {
		font-size: 25px;
		margin-bottom: 40px;
		color: #C060A1;
	}
    &__tabs {
        display: flex;
        justify-content: space-between;

        &__tab {
            font-size: 20px;
            width: 100%;
            font-weight: 500;
            cursor: pointer;
            padding: 12px 15px ;
            box-shadow: 10px 4px 11px rgba(0, 0, 0, 0.05);
            color: rgb(45, 44, 44);
            background: #FBFBFB;
            text-align: center;

			@media screen and (max-width: $break-point-2) {
				font-size:16px;

			}
           
        }
    }
    &__box {
        padding-top:40px;

        &__error {
            margin-bottom: 40px;
            display: block;
            font-size: 14px;
            color: red;
        }
    }
}

.form {
        position: relative;
        display: block;
    &__div {
        display: flex;
        flex-direction: column;

        label {
            font-weight: 500;
            font-size: 14px;
            line-height: 16px;
            margin-bottom: 8px;

            color: #757575;
        }

        input {
            background: white;
            border: 4px solid rgba(0, 0, 0, 0.09);
            box-sizing: border-box;
            border-radius: 5px;
            height: 48px;
            margin-bottom: 25px;
            padding-left: 10px;

            &:active {
                outline: 0;
            }
            &:focus {
                outline:0;
            }
        }

        button {
            background: rgba(0, 0, 92, 0.75);;
            height:48px;
            text-align: center;
            vertical-align: center;
            font-size: 16px;
            color: white;
            margin-top: 8px;
			border-radius: 5px;

			margin-bottom:120px;
			@media screen and (max-width: $break-point-2) {
				margin-bottom:40px;

			}
        }
    }
}

.isActive {
    background: white;
    color: rgba(0, 0, 92, 0.75);;
}
</style>