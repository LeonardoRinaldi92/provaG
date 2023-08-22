<script>
    import { store } from '../store';
    import Enemy from './Enemy.vue';
    import Timer from './Timer.vue';
    export default {
        name: 'Field',
        components: {
            Enemy,
            Timer
        },
        data() {
            return {
                store,
                disableAddCoin : false,
            }
        },
        methods: {
            increaseEnemyLife(){
                if(store.ActualStage == 9 ) {
                    store.enemyMaxLife = store.enemyMaxLife * 6
                }else if(store.ActualStage == 10){
                    store.enemyMaxLife = store.enemyMaxLife/ 3
                }else {
                    store.enemyMaxLife*= 1.4
                }
                store.enemyMaxLife = Math.round(store.enemyMaxLife)
                store.enemyLife = store.enemyMaxLife
            },
            hitEnemy(){
                store.enemyLife  = store.enemyLife - store.clickValue
            },
            addCoin() {
                if(this.disableAddCoin == false){
                    this.hitEnemy()
                    if(store.enemyLife <= 0 ) {
                        this.increaseEnemyLife()

                        if (store.ActualStage <= 9) {
                            store.ActualStage ++
                            store.coin = Math.round(store.coin + store.coinValue) 
                        }
                        else {
                            store.ActualStage = 1
                            store.AcutalFloor ++
                            store.timer = 30
                            store.coin = Math.round((store.coin + store.coinValue) * 5) 
                        }
                        store.coinValue*=1.2
                    }
                }
            },
            increaseClickValue() {
                if (store.coin >= store.clickPrice) {
                    store.coin = store.coin - store.clickPrice
                    store.clickLevel ++
                    store.clickValue ++
                    if(store.clickLevel % 25 == 0 ) {
                        store.clickValue *= 2
                    }
                    else if(store.clickLevel % 10 == 0 ){
                        store.clickValue *= 1.5
                    }
                    store.clickPrice = Math.round((store.clickPrice * 1.2 ) + (((store.clickPrice * 1.2) / 100) * 10))
                    
                }
            },
            calculateIncreaseDps(ally){
                return ally.Dps * ally.increaseDps
            },
            calculatePriceToLevelUp(ally){
                let price = null
                if(ally.actualLevel == 1){
                    price = ally.priceToLvlUp
                }else {
                    price = ally.priceToLvlUp * ally.increasePrice
                }
                return price
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
                        <div v-if="(store.ActualStage % 10 == 0)">
                            <Timer/>
                        </div>
                        <h3>
                            coin : {{ store.coin }}
                        </h3>
                    </div>
                    <div>
                        <Enemy/>
                    </div>
                </div>
                <div class="col-12 h-25" style="background-color: rgb(61, 129, 40);">
                    <div class="row justify-content-center w-100" id="azioni" @mouseenter="this.disableAddCoin = true" @mouseleave="this.disableAddCoin = false">
                        <div class="col-8" style="cursor: pointer;" @click="increaseClickValue()" >
                             <h3 :class="(store.coin >= store.clickPrice)? 'text-black' : 'text-danger' ">
                                aumenta valore del click
                             </h3>
                             <h5>
                                valore attuale {{ store.clickValue }} Prezzo {{ store.clickPrice }}
                             </h5>
                        </div>
                        <div v-for="ally in store.allies" :key="index" class="col-8" style="cursor: pointer;">
                            <h3>
                               {{ ally.name }} 
                            </h3>
                            <h5>
                                (DPS {{ ally.Dps }}) 
                            </h5>
                            <h6 v-if=(ally.unlocked)>
                                aumenta Dps {{ calculateIncreaseDps(ally)}} price {{ calculatePriceToLevelUp(ally) }}
                            </h6>
                            <h6 v-else>
                                sblocca : {{ ally.priceToBuy }}

                            </h6>


                        </div>

                    </div>
                </div>


            </div>

        </div>
    </div>
</template>