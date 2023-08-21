<script>
    import { store } from '../store';
    import Enemy from './Enemy.vue';
    export default {
        name: 'Field',
        components: {
            Enemy
        },
        data() {
            return {
                store,
                disableAddCoin : false,
            }
        },
        methods: {
            addCoin() {
                if(this.disableAddCoin == false){
                    store.enemyLife  = store.enemyLife - store.clickValue
                    if(store.enemyLife <= 0 ) {
                        if(store.ActualStage == 9 ) {
                            store.enemyMaxLife = store.enemyMaxLife * 15
                        }
                        store.enemyLife = store.enemyMaxLife
                        store.coin = store.coin+10
                        if (store.ActualStage <= 9) {
                            store.ActualStage ++
                        }
                        else {
                            store.ActualStage = 1
                            store.enemyMaxLife = store.enemyMaxLife/ 3
                            store.enemyLife = store.enemyMaxLife
                            store.AcutalFloor ++
                        }
                    }
                }
            },
            increaseClickValue() {
                if (store.coin >= store.clickPrice) {
                    store.coin = store.coin - store.clickPrice
                    store.clickValue ++
                    store.clickPrice = Math.round((store.clickPrice * 2 ) + (((store.clickPrice * 2) / 100) * 10))
                }
            }
        }
    }

</script>

<template>
    <div class="w-100 h-100">
        <div class="container-fluid h-100">
            <div class="row h-100"  @click="addCoin()">
                <div class="col-12 h-75" style="background-color: rgb(175, 201, 224);">
                    <div class="text-center">
                        <h2>
                            {{ store.AcutalFloor }} - {{ store.ActualStage }}
                        </h2>
                        <h3>
                            coin : {{ store.coin }}
                        </h3>
                    </div>
                    <div>
                        <Enemy/>
                    </div>
                </div>
                <div class="col-12 h-25" style="background-color: rgb(61, 129, 40);">
                    <div class="row justify-content-center" id="azioni" @mouseenter="this.disableAddCoin = true" @mouseleave="this.disableAddCoin = false">
                        <div class="col-6" style="cursor: pointer;" @click="increaseClickValue()" >
                             <h3 :class="(store.coin >= store.clickPrice)? 'text-black' : 'text-danger' ">
                                aumenta valore del click
                             </h3>
                             <h5>
                                valore attuale {{ store.clickValue }} Prezzo {{ store.clickPrice }}
                             </h5>

                        </div>

                    </div>
                </div>


            </div>

        </div>
    </div>
</template>