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
                    if(store.ActualEnemies == 10 && store.ActualStage == 10){
                        console.log('soldi boss', (store.coin + store.coinValue)-store.coin,store.ActualEnemies)
                        store.coin = Math.round((store.coin + store.coinValue) * 5) 
                        store.coinValue*=1.5
                    }
                    else if(store.ActualEnemies == 10){                       
                        store.coin = Math.round((store.coin + store.coinValue) * 2) 
                        console.log('soldi miniboss',(store.coin + store.coinValue)-store.coin, store.ActualEnemies)
                        store.coinValue*=1.2
                    }else{
                        store.coinValue*=1.05
                    }
                    
                    if (store.ActualStage <= 9) {
                        if(store.ActualEnemies < 10){
                            store.ActualEnemies ++
                        } else {
                            store.ActualEnemies = 1
                            store.ActualStage ++
                        }

                        if((!store.ActualEnemies == 10 && store.ActualStage == 10) || !(store.ActualEnemies == 10)){
                            console.log('soldi normali',(store.coin + store.coinValue)-store.coin, store.ActualEnemies)
                            store.coin = Math.round(store.coin + store.coinValue) 
                        }
                    }
                    else {
                        store.ActualStage = 1
                        store.AcutalFloor ++
                        store.timer = 30
                    } 
                }
            },
            increaseClickValue() {
                if (store.coin >= store.clickPrice) {
                    store.coin = store.coin - store.clickPrice
                    store.clickLevel ++
                    store.clickValue+= store.increaseClickValue
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
                <div class="col-8 h-100" style="background-color: rgb(175, 201, 224);">
                    <div class="row justify-content-end">
                        <div class="col-4 text-end">
                           
                            <h3>
                                <i class="fa-solid fa-coins"></i> {{ store.coin }}
                            </h3>
                        </div>
                        <div v-if="(store.ActualEnemies % 10 == 0)" >
                            <Timer/>
                        </div>
                        <div class="col-12">
                            <div class="text-center mb-2">
                                livello:{{ store.AcutalFloor }} - stage:{{ store.ActualStage }}
                            </div>
                            <EnemiesMap/>
                        </div>
                        <div class="col-12 row justify-content-center mt-5">
                            <div class="col-6 text-center">
                                <Enemy/>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-4 h-100" style="background-color: rgb(190, 202, 120);">
                    <div class="row justify-content-center w-100" id="azioni" @mouseenter="this.disableClickAtk = true" @mouseleave="this.disableClickAtk = false">
                        <div class="col-12 row  p-2">
                            <div class="col-3">
                                <i class="fa-solid fa-arrow-pointer"></i> {{ store.clickValue }}
                            </div>
                            <div class="col-3">
                                <i class="fa-solid fa-users"></i> {{ store.totalDps }}
                            </div>
                        </div>
                        <hr>
                        <div class="col-12 row align-items-center p-2" style="cursor: pointer;" @click="increaseClickValue()">
                            <div class="col-4">
                                <div :class="(store.coin >= store.clickPrice)? 'btn-success' : ' btn-danger'" class="btn text-white" >
                                    {{ store.clickPrice }} <i class="fa-solid fa-coins"></i>
                                </div>
                            </div>
                            <div class="col-8 mb-4">
                                <h6>
                                    Aumenta potenza click
                                </h6>
                                <span class="text-secondary">
                                   <span>
                                       prossimo livello   
                                   </span>
                                   <span>
                                    <i class="fa-solid fa-arrow-pointer"></i>
                                   </span>
                                   <span v-if="((store.clickLevel+1 )% 25 == 0)">
                                    {{ (store.clickValue + store.increaseClickValue) * 2}}
                                   </span>
                                   <span v-else-if="((store.clickLevel+1 )% 10 == 0)">
                                    {{ (store.clickValue + store.increaseClickValue) * 1.5}}
                                   </span>
                                   <span v-else>
                                    {{ (store.clickValue + store.increaseClickValue)}}
                                   </span>
                                </span>
                            </div>
                            <hr>
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
<style lang="scss" scoped>

.button-ally {
    border: 1px solid black;
}


</style>