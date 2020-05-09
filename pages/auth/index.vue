<template>
	<div class="contain">
		<div class="contain--1">
			</div>
			<div class="auth">
				<div class="auth__tabs">
					<div class="auth__tabs__tab" :class="[authMode == 1 ? 'isActive' : '']" style="border-right:0" @click="switchAuthMode">Log in</div>
					<div class="auth__tabs__tab" :class="[authMode == 0 ? 'isActive' : '']"   style="border-lefts:0" @click="switchAuthMode">Sign Up</div>
				</div>
				<div class="auth__signup auth__box" v-if="authMode == 0">
					<label class="auth__box__label"></label>
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
						<div class="form__div">
							<label>Instagram Handle</label>

							<input type="text" class="form__control" v-model="signupData.instagram_handle" placeholder="">
						</div>
						<div class="form__div">
							<label>Twitter Handle</label>

							<input type="text" class="form__control" v-model="signupData.twitter_handle" placeholder="">
						</div>
						<div class="form__div">
							<button id="signupButton" type="button" class="form__control form__control__submit" >Sign up</button>
						</div>

					</form>

				</div>
				<div class="auth__signup auth__box" v-else>
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
							<button  id="signinButton" type="button" class="form__control form__control__submit">Sign in</button>
						</div>

					</form>

				</div>
				<p class="signin-prompt" v-if="authMode == 0"> Already have an account? <a href="#" @click="switchAuthMode">Sign In</a></p>
				<p class="signin-prompt" v-else> Don't have an account? <a href="#" @click="switchAuthMode">Sign Up</a></p>

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
		signin(e) {
			this.authErrorMessage = '';
			let queryString = '';
			let l = document.getElementById('signinButton');

			const original_text= l.innerText;

			this.decideNextPage();
			toggleButtonActiveness(l, original_text)

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
						toggleButtonActiveness(l, original_text)
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
					toggleButtonActiveness(l, original_text)
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
			let l = document.getElementById('signupButton');
			//const original_text = l.innerText;
			//toggleButtonActiveness(l, original_text)

			if (!this.validateSignupFields()) {
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
					this.signin();
					//toggleButtonActiveness(l, original_text)
					if (this.$route.query['action']== 'bookmark' && this.$route.query['event_id']) {
						eventrequests.bookmarkEvent(this.$route.query['event_id']).then(()=> {
							//this.event.bookmarks = [0] // just add an item to the list so that bookmarks will stop showing
							//self.$toasted.show("Event added to bookmarks");
						})
					}

				})
				.catch(err=> {			
					//toggleButtonActiveness(l, original_text)
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
$grid-break-5: 1120px;
$grid-break-4: 830px;
$grid-break-3: 630px;
$grid-break-2: 565px;
$modal-break-1: 760px;

/* Sample `apply` at-rules with Tailwind CSS
.container {
  @apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/

* {
}

.contain {
	background-size: contain;
	background-color: whitesmoke;;
	margin: 0 auto;
  	min-height: 100vh;
  	display: flex;
  	justify-content: center;
  	align-items: center;
  	text-align: center;

	&--1{
		z-index: 400
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

.auth {
	width: 50%;
	border-radius: 10px;
		@media screen and (max-width: $modal-break-1) {
			width: 80%;
		}

	&__tabs {
		background: white;
		display: flex;
		justify-content: space-between;

		&__tab {
			cursor: pointer;
			color: black;
			//border: 1px solid lightgray;
			text-align: center;
			flex: 1 0 50%;
			padding: 10px;
			font-size: 16px;
			font-weight: 400;
			&:hover{ 
				background: whitesmoke;
				color: black;
			}
		}
	}

	&__box {
		//border: 1px solid lightgray;
		
		border-top: 0px;
		padding: 30px 20px;
		background-color: white;
		box-sizing: border-box;
		width: 100%;
		@media screen and (max-width: $modal-break-1) {
			padding: 30px 10px;
		}
    
		&__label {
			color: black;
			margin-bottom: 20px;
			display: block;
			font-size: 20px;
		}

		&__error {
			font-size: 12px;
			color: red;
			margin-bottom: 5px;
			display: block;
		}
	}
}

.form {
	width: 80%;
	margin: auto;
	&__div {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		margin-bottom: 10px;
		margin-bottom: 20px;

		label {
		color: #5e6c84;

		font-size: 14px;
		}
	}
	&__label {
		color: #5e6c84;

		font-size: 16px;
		font-weight: bold;
	}
	&__control {
		border: none;
		width: 100%;
		margin:auto;
		height: 60px;
//		border: 1px solid lightgrey;
		padding: 10px 0px 10px 10px;
		font-size: 14px;
		min-width: 200px;
		border-radius: 5px;
		outline-color: #dfe1e6;
		border-color: darkgrey;

		border-radius: 8px;
		border-width: 1px;
		border-style: solid;
		border-image: initial;
		padding: 0px 10px;

		

		&__submit {
			border: 2px solid #ffffe6;
			color: #ffffe6;
			font-weight: 400;
			background: black;
			font-size: 16px;
			&:hover {
				background-color: black;;
				color: white;
				font-weight: bold;;

			}
		}
	}
}
.signin-prompt {
	margin-top: 10px;
	color: darkgrey;
	font-weight: normal;
	font-size: 13px;

	a {
		text-decoration: underline;
	}
}

.isActive {
	background: black;
	color: white;
}
.red {
	color: rgb(151, 144, 144);
}
</style>
