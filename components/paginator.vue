<template>
    <div class="paginator">
        <div class="page-bloc" :class="[pageBlocks[0] ? '' : 'hide' ]">{{pageBlocks[0] ? pageBlocks[0] : ''}} </div>
        <div class="page-bloc" :class="[pageBlocks[1] ? '' : 'hide' ]">{{pageBlocks[1]  ? pageBlocks[1] : ''}}</div>
        <div class="page-bloc" :class="[pageBlocks[2] ? '' : 'hide' ]">{{pageBlocks[2]  ? pageBlocks[2] : ''}}</div>
        <div class="page-bloc page-bloc__input" style="display:flex" >
            <input type="number" v-model="page"/>
            <button @click="jumpToMethod(page)">Go</button>
        </div>

        <div class="page-bloc" :class="[pageBlocks[3] ? '' : 'hide' ]">{{pageBlocks[3]}}</div>
    </div>
</template>


<script>
export default {
    props: ['pageMeta', 'jumpToMethod'],

    data() {
        return {
            pageBlocks: [],
            page: this.pageMeta.currentPage ? this.pageMeta.currentPage : 0,
        }
    },
    created() {
        this.construct();
    },
    updated() {
    },
    methods: {
        construct() {
            let tp= this.pageMeta.totalPages;
            let cp = this.pageMeta.currentPage;
            this.pageBlocks = [0, 0, 0, 0];
            this.pageBlocks[3] = (tp);
            const dtcp = tp - cp;

            if (dtcp > 2) {
                for (let i = 0; i < 3; i++) {
                    this.pageBlocks[i] =  cp;
                    cp++;
                }
            }
            else if (tp === 0 && cp === 0) {
                this.pageBlocks = [];
            }
            else if (dtcp == 0) {

            }
            else if (dtcp == 1){
                this.pageBlocks[0] = tp - 1;
                this.pageBlocks[4] = tp;
            }
            else if (dtcp == 2){
                this.pageBlocks[0] = tp - 2;
                this.pageBlocks[1] = tp - 1;
                this.pageBlocks[4] = tp;
            }
        },


    }
}
</script>


<style lang="scss" scoped>
.hide {
    display: none;
}
.paginator {
    display: flex;
    width: 80%;
    justify-content: center;
    margin: auto;
    margin-bottom: 30px;
}
.page-bloc {
    
    cursor: pointer;
    padding: 4px 8px;
    border: 1px solid grey;
    margin-right: 5px;
    border-radius: 2px;
    &:hover {
        background-color: grey;
    }
    &__input {
        padding: 0;
        &:hover {
            background: none;
        }
    }
    input {
        padding: 4px;
    }
    button {
        padding: 3px 5px;
        background: black;
        color: white;
    }
}
</style>