<template>
  <div>
		<nav class="navbar flex items-center justify-between flex-wrap bg-white">
			<div class="flex items-center flex-shrink-0 text-white">
				<span class="font-semibold text-xl tracking-tight"><nuxt-link to="/">Sociovent</nuxt-link></span>
			</div>
      <div class="navbar__ctas" style="">
        <a class="block text-sm navbar__ctas__item"  @click="toggleModal" v-if="isAuthenticated && pageContext && pageContext == 'home'" style="margin-right: 20px">Create</a>
        <a  @click="login"  style="cursor:pointer" class="inline-block text-sm navbar__ctas__item" v-if="isAuthenticated === false">Sign In</a>

        <div @click="toggleDropdown" v-if="isAuthenticated" class="navbar__ctas__item" >
          <button style="background:white;" class="block h-8 w-8 rounded-full overflow-hidden border-2 border-gray-600 focus:outline-none focus:border-white">
            <img  style="background:white;" class="h-full w-full object-cover">
          </button> 
        </div>
      </div>
      
      <div class="navbar__menu">
        <div class="navbar__menu__item navbar__menu__item--1"></div>
        <div class="navbar__menu__item navbar__menu__item--2"></div>
        <div class="navbar__menu__item navbar__menu__item--3"></div>
      </div>

      
		</nav>
    <div class="mt-2 py-2 w-48 bg-white shadow-xl profile-dropdown" v-if="showDropdown" @click.stop>
      <a @click="toggleModal" v-if="pageContext && pageContext == 'home' && isAuthenticated" class="block px-4 py-2 text-gray-800 hover:bg-black hover:text-white">Create Event</a>
      <nuxt-link to="/my_events" href="#" class="block px-4 py-2 text-gray-800 hover:bg-black hover:text-white">My Events</nuxt-link>
      <nuxt-link to="/bookmarks" href="#" class="block px-4 py-2 text-gray-800 hover:bg-black hover:text-white">Bookmarks</nuxt-link>
      <nuxt-link to="/reminders" href="#" class="block px-4 py-2 text-gray-800 hover:bg-black hover:text-white">Reminders</nuxt-link>
      <nuxt-link to="/settings" class="block px-4 py-2 text-gray-800 hover:bg-black hover:text-white">Settings</nuxt-link>
      <a @click="signout" href="#" class="block px-4 py-2 text-gray-800 hover:bg-black hover:text-white">Sign out</a>
    </div>
  </div>
</template>

<script>
import { request, checkAuthStatus, toggleButtonActiveness } from '../utils';
import requests from '../requests/auth';

export default {
    props: ['toggleModal', 'closeModals', 'pageContext', 'signInMethod', 'router'],

    data() {
      return{
        showDropdown: false,
        isAuthenticated: false
      }
    },

    async created() {
      this.isAuthenticated = await checkAuthStatus() == 1;
    },

    watch: {
      closeModals: function (value)  {
        if (value === true) {
          this.showDropdown = false;
        }
      }
    },

  methods: {
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
    async signout() {
      await requests.logout().then(resp=> {
        this.isAuthenticated = false;
        this.showDropdown = false
      })
      .catch(err => {
        
      })
    },
    login() {
      this.$router.push('/auth')
    }
  }

}
</script>

<style lang="scss" scoped>


$navbar-break-small: 259px;
$breaklarge: 1200px;

.profile-dropdown {
      position: fixed;
    z-index: 1000000;
    right: 0;
    top: 50px;
}
.navbar {
    width: 100%;
    top: 0;
    float: left;
    height: 60px;
    position: fixed;
    width: 100%;
    z-index: 5;
    padding: 20px 20px;
    box-shadow: 0px 4px 2px rgba(0, 0, 0, 0.04);
    z-index: 50;
    background: black;
    left: 0;
    color: white;
    position: fixed;

    &__ctas{
      display: flex;
      align-items: center;

      @media screen and (max-width: $navbar-break-small) {
        display: none;
      }

      &__item {
        margin-right: 30px;
        flex: 1 0 19%;
        margin-right: 5px;
        &:last-of-type {
          margin-right: 0;
        }
      }
    }

    &__menu {
      @media screen and (min-width: $navbar-break-small) {
        display: none;
      }
      &__item {
        background: white;
        min-height: 2px;
        width: 20px;
        margin-bottom: 3px;

        
      }
    }
    
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
}
</style>