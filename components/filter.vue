<template>
    		<div class="filter" v-if="show">
				<div class="" style="width:70%; margin:auto; margin-bottom: 15px">

					<div style="position: absolute; width: 70%; margin: auto; text-align: right; padding:10px 0px;" class="modal-close cursor-pointer z-50">
							<svg @click="closeMethod" style="display:inline" class="fill-current text-black" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"><path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path></svg>
					</div>
				</div>
				<div class="filter__container">
					

					<div class="filter__field">
                        <label>Venue</label>
						<select type="text" v-model="filter.venue">
                            <option value="" disabled selected>Select venue</option>

							<option value="instagram">Instagram</option>
							<option value="facebook">Facebook</option>
							<option value="twitter">Twitter</option>
							<option value="youtube">Youtube</option>
							<option value="twitch">Twitch</option>
						</select>
					</div>
					<div class="filter__field">
                        <label>Country</label>

						<select class="filter__field__input" v-model="filter.country_origin" type="text" >
                            <option value="" disabled selected>Select country</option>
							<option :value="country.code" v-for="country in countries">{{country.name}}</option>
						</select>
										
					</div>
					<div class="filter__field filter__field__name">
                        <label>Name / Description / Tag</label>

						<input class="filter__field__input" v-model="filter.search"  type="text" />
					</div>
					<div class="filter__field" >
                        <label>From</label>
						<date-pick  v-model="filter.from" class="filter__field__input"  type="text" placeholder="Date from"></date-pick>

					</div>
					<div class="filter__field">
                        <label>To</label>

						<date-pick  v-model="filter.to" class="filter__field__input"  type="text" placeholder="Date from"></date-pick>

					</div>
            
					<div class="filter__field" style="margin-top:15px; display:flex; justify-content:flex-end"> 
					</div>
					<div class="filter__field" style="margin-top:15px; display:flex; align-items: flex-end;"> 
						<input type="submit"  @click="filterMethod" style="background:black; font-size: 14px; border-radius:5px; max-width: 100px; color: white;" class="filter__field__input"  value="Filter"/>
					</div>
				</div>
			</div>
</template>


<script>
import 'vue-date-pick/dist/vueDatePick.css';
import DatePick from 'vue-date-pick';
import cntries from '../countries.json'

export default {
	name: "events-filter",
	props: ['filterMethod', 'filter', 'show', 'closeMethod'],
    components: {
        DatePick,
    },
    data() {
        return {
			date: '',            
        }
	},
	
	methods: {
		close() {
			this.show = false;
		}
	},

    computed: {
        countries() {
            return cntries;
        }
    }

}
</script>

<style lang="scss" scoped>
$break-small: 485px;

.filter {
	
	background: rgb(255, 255, 230);
	//max-height: 200px;
	display: flex;
	flex-direction: column;
	width: 100%;
	position: sticky;
    border-bottom: 1px solid lightgrey;
	&__container {
		width: 70%;
		margin:auto;
		display: flex;
		flex-direction: row;
		padding: 10px 0px;
		flex-wrap: wrap;
        justify-content: space-between;

	
	}
	&__field {
		//padding: 5px 0px;
		align-items: space-between;
		margin-bottom: 4px;
        width: 45%;
        display: flex;
        flex-direction: column;
		//flex: 1 0 45%; /* explanation below */
		//margin-right: 10px;
        &:last-of-type {
            margin-bottom: 0;
        }

        label {
            font-size: 13px;
            color: #abadb3;
            //font-weight: 600;
        }
		&__input {
			width: 100%;
			//background-color: #f4f5f7 !important;
			color: #172b4d;

		}
		select {

			padding: 5px 5px;
			width: 100%;
			-webkit-appearance: none;
			appearance: none;
			background-color: white !important;
			border: 1px solid #dfe1e6;
			font-size: 13px;
		}
        &__name {
            flex: 1 0 100%;     

            @media screen and (max-width: $break-small) {
                flex: 1 0 100%;     
            }       
        }
	}

input, /deep/input {
	background-color: white;
    width: 100%;
	border: 1px solid #dfe1e6;
	color: #172b4d;
	font-size: 13px;

}
/deep/input {
    padding: 4px;
}

input:focus {
	background-color: white !important;
}

/deep/.vdpPositionTop.vdpPositionLeft {
	position: static !important;
}

}

</style>