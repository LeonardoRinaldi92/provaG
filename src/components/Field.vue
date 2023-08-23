<script>
    import { store } from '../store';
    import Enemy from './Enemy.vue';
    import Timer from './Timer.vue';
    import EnemiesMap from './EnemiesMap.vue';
    export default {
        name: 'Field',
        components: {
            Enemy,
            Timer,
            EnemiesMap
        },
        data() {
            return {
                store,
                disableClickAtk : false,
            }
        },
        methods: {
            increaseEnemyLife(){
                if (store.ActualEnemies == 9 && store.ActualStage == 9){
                    store.enemyMaxLife *= 8
                }else if(store.ActualEnemies == 9 ) {
                    store.enemyMaxLife = store.enemyMaxLife * 4
                }else if (store.ActualEnemies == 10 && store.ActualStage == 10 ){
                    store.enemyLife /= 7
                }
                else if(store.ActualEnemies == 10){
                    store.enemyMaxLife = store.enemyMaxLife/ 3
                }else {
                    store.enemyMaxLife*= 1.1
                }
                store.enemyMaxLife = Math.round(store.enemyMaxLife)
                store.enemyLife = store.enemyMaxLife
            },
            hitEnemy(){
                if(this.disableClickAtk == false){
                    store.enemyLife  = store.enemyLife - store.clickValue
                    this.addCoin()
                }
            },
            addCoin() {
                if(store.enemyLife <= 0 ) {
                    this.increaseEnemyLife()

                    if (store.ActualStage <= 9) {
                        if(store.ActualEnemies < 10){
                            store.ActualEnemies ++
                        } else {
                            store.ActualEnemies = 1
                            store.ActualStage ++
                        }
                        store.coin = Math.round(store.coin + store.coinValue) 
                    }
                    else {
                        store.ActualStage = 1
                        store.AcutalFloor ++
                        store.timer = 30

                    }
                    if(store.ActualEnemies == 10 && store.ActualStage == 10){
                        store.coin = Math.round((store.coin + store.coinValue) * 5) 
                        store.coinValue*=1.5
                    }
                    else if(store.ActualEnemies == 10){                       
                        store.coin = Math.round((store.coin + store.coinValue) * 2) 
                        store.coinValue*=1.2
                    }else{
                        store.coinValue*=1.05
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
                let dps =  Math.round(ally.Dps * ally.increaseDps)
                return dps
            },
            calculatePriceToLevelUp(ally){
                let price = null
                if(ally.actualLevel == 1){
                    price = ally.priceToLvlUp
                }else {
                    price = Math.round(ally.priceToLvlUp * ally.increasePrice)
                }
                return price
            },
            levelUpAlly(ally){
                let oldDps = ally.Dps
                let addDps = null
                if(!ally.unlocked){
                    if (store.coin >= ally.priceToBuy){
                        store.coin= store.coin - ally.priceToBuy
                        ally.unlocked = true
                        store.totalDps += ally.Dps
                    }
                    if(store.autoAttack == false){
                        store.autoAttack = true
                    }
                }else {
                    if(store.coin >= ally.priceToLvlUp){
                        store.coin= store.coin - ally.priceToLvlUp
                        ally.actualLevel ++
                        ally.priceToLvlUp = Math.round( ally.priceToLvlUp * ally.increasePrice)
                        if(ally.actualLevel == 1){
                            ally.Dps = Math.round(ally.startDps * ally.increaseDps)
                               
                        }else {                          
                            ally.Dps = Math.round(ally.Dps * ally.increaseDps)
                        }
                        addDps = ally.Dps - oldDps
                        store.totalDps += addDps
                    }
                }
            },
            hitEnemyWhitDps(){
                if(store.totalDps !== 0){
                    store.allies.forEach( ally => {
                        if(ally.unlocked){
                            let attackingAlly  = setInterval(() => {
                                store.enemyLife -= ally.Dps
                                this.addCoin()
                            },ally.atkSpd)
                        }
                    })
                }
            }
        },
        watch: {
            'store.autoAttack': {
                immediate: true, // This will trigger the watcher immediately when the component is mounted
                handler(newValue) {
                    this.hitEnemyWhitDps(); // Call your function when totalDps changes
                }
            }
        }
    }

</script>

<template>
    <div class="w-100 h-100">
        <div class="container-fluid h-100">
            <div class="row h-100"  @click="hitEnemy()">
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
                        <div>
                            <EnemiesMap/>
                        </div>
                    </div>
                    <div>
                        <Enemy/>
                    </div>
                </div>
                <div class="col-12 h-25" style="background-color: rgb(61, 129, 40);">
                    <div class="row justify-content-center w-100" id="azioni" @mouseenter="this.disableClickAtk = true" @mouseleave="this.disableClickAtk = false">
                        <div class="col-8" style="cursor: pointer;" @click="increaseClickValue()" >
                             <h3 :class="(store.coin >= store.clickPrice)? 'text-black' : 'text-danger' ">
                                aumenta valore del click
                             </h3>
                             <h5>
                                valore attuale {{ store.clickValue }} Prezzo {{ store.clickPrice }}
                             </h5>
                        </div>
                        <div v-for="(ally, index) in store.allies" :key="index" class="col-8" style="cursor: pointer;" @click="levelUpAlly(ally)" >
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