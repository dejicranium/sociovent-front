<template>
    <div class="page-content">
        <navbar></navbar>
        <div class="page-content__container">
            <div class="main">

                <div class="sidebar">
                    <div class="sidebar__search">
                        <input type="text">
                    </div>
                    <div class="sidebar__messages">
                        <div class="sidebar__messages__message">
                            <div class="sidebar__messages__message__container">

                                <p class="sidebar__messages__message__name">Deji Atoyebi</p>
                                <p class="sidebar__messages__message__event">Judah on stuff</p>
                                <p class="sidebar__messages__message__bid">$20,000</p>

                            </div>
                        </div>
                        <div class="sidebar__messages__message">
                            <div class="sidebar__messages__message__container">

                                <p class="sidebar__messages__message__name">Deji Atoyebi</p>
                                <p class="sidebar__messages__message__event">Judah on stuff</p>
                                <p class="sidebar__messages__message__bid">$20,000</p>

                            </div>
                        </div>
                        <div class="sidebar__messages__message">
                            <div class="sidebar__messages__message__container">

                                <p class="sidebar__messages__message__name">Deji Atoyebi</p>
                                <p class="sidebar__messages__message__event">Judah on stuff</p>
                                <p class="sidebar__messages__message__bid">$20,000</p>

                            </div>
                        </div>
                    
                    </div>
                </div>
                <div class="content">
                    <div class="content__top">
                        <p class="content__top__name"> Deji Atoyebi</p>
                        <p class="content__top__bid"> Initial Bid: N100,000</p>
                    </div>
                    <div class="content__main"></div>
                    <div class="content__bottom">
                        <input type="text"/>
                        <button class="send">Send</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Navbar from '~/components/navbar.vue'
export default {
    components: {
        Navbar
    }
}
</script>

<style lang="scss" scoped>
.page-content {
    &__container {
        display: flex; 
        padding-top: 100px;
        width: 80%;
        margin: auto;
        
    }

}
.main {
    display:flex;
    background: white;
    height: 700px;
    width:100%;
    border: 1px solid lightgrey;
}
.sidebar {
    flex: 1 0 25%;
    border-right: 1px solid lightgrey;
    &__search {
        background: white;
        padding: 5px 0;
        padding-top: 20px;
        input {
            background: whitesmoke;
            border-radius: 2px;
            border: 1px solid lightgray;
            border: 0;
            width: 90%;
            margin: auto;
            display: block;
            padding: 5px 15px;
        }
    }
    &__messages {
        display: flex;
        flex-direction: column;
        background: white;
        padding-top: 30px;
        
        &__message {
            display: flex;
            flex-direction: column;
        
            border-top: 1px solid lightgrey;
            &:first-of-type {
                border-top: 0;
            }
            &:hover{ 
                background: whitesmoke
            }
            p {
                font-size: 13px;
            }
            &__name {
                font-weight: 500;
                //font-style:
            }
            &__container {
                width: 90%;
                margin: auto;
                padding-left: 20px;
                padding-top: 10px;
                padding-bottom: 10px;
            }

        }
    }
}

.content {
    flex: 1 0 80%;
    background: white;
    display: flex;
    flex-direction: column;
    &__top {
        padding: 20px 20px;
        background: white;
        border: 1px solid lightgrey;
        border-left: 0;
        width: 100%;;
        flex: 1 0 10%;
        
        &__name {
            font-weight: 600;
        }
        &__bid {
            font-size: 12px;;
        }
    }
    &__main {
        background: white;
        flex: 1 0 80%;
                border: 1px solid lightgrey;

    }
    &__bottom {
         border: 1px solid lightgrey;
         align-self: flex-end;
         justify-self: flex-end;
        flex: 1 0 10%;
        width: 100%;;
        display: flex;

        input {
            //width: 80%;
        }
    }
}
</style>