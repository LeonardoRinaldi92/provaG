<script>
    import { store } from '../store';
    import Enemy from './Enemy.vue';
    import Timer from './Timer.vue';
    import EnemiesMap from './EnemiesMap.vue';
    import autoclicker from './autoclicker.vue';
    export default {
        name: 'Field',
        components: {
            Enemy,
            Timer,
            EnemiesMap,
            autoclicker
        },
        data() {
            return {
                store,
                disableClickAtk : false,
            }
        },
        methods: {
            //aumento vita dei mostri
            increaseEnemyLife(){
                //aumento vita x 8 nel caso sia un Boss di fine stage
                if (store.ActualEnemies == 9 && store.ActualStage == 9){
                    store.enemyMaxLife *= 8
                //aumento vita nel caso sia un miniBoss 
                }else if(store.ActualEnemies == 9 ) {
                    store.enemyMaxLife = store.enemyMaxLife * 4
                //reset della vita dei nemici dopo boss
                }else if (store.ActualEnemies == 10 && store.ActualStage == 10 ){
                    store.enemyLife /= 7
                    //reset della vita dei nemici dopo miniboss ma con aggiunta di un extra 30%
                }else if(store.ActualEnemies == 10){
                    store.enemyMaxLife = store.enemyMaxLife/ 3
                //aumento classica di vita, dopo ogni nemico
                }else {
                    store.enemyMaxLife*= 1.1
                }
                //rendi numero intero vita dei mostri
                store.enemyMaxLife = Math.round(store.enemyMaxLife)
                //pareggia vita massima con vita attuale dei nemici
                store.enemyLife = store.enemyMaxLife
            },

            //danno al click
            hitEnemy(){
                //check se si è in poszioni dove non si accetta il danno da click
                if(this.disableClickAtk == false){
                    //sottrai il valore del danno da click dalla vita dei nemici
                    store.enemyLife  = store.enemyLife - store.clickValue
                    //richiama la funzione di aggiunta soldi
                    this.addCoin()
                }
            },
            //funzione aggiunta soldi
            addCoin() {
                let actualcoin = store.coin
                //se la vita del mostro si azzera
                if(store.enemyLife <= 0 ) {
                    //richiama la funzione di aumento della vita
                    this.increaseEnemyLife()
                    //se sconfiggi un boss di fine stage
                    if(store.ActualEnemies == 10 && store.ActualStage == 10){
                        //aggiunge ai soldi il valore fisso di vittoria e moltiplica il tutto x 5
                        store.coin = Math.round((store.coin + store.coinValue) * 5)
                        //aumento il valore fisso di vittoria del 50%
                        store.coinEarnd += store.coin - actualcoin
                        store.coinValue*=1.5
                    }
                    //se sconfiggi un miniboss
                    else if(store.ActualEnemies == 10){           
                        //aggiunge ai soldi il valore fisso di vittoria e moltiplica il tutto x 2            
                        store.coin = Math.round((store.coin + store.coinValue) * 2) 
                        //aumento il valore fisso di vittoria del 20% 
                        store.coinEarnd += store.coin - actualcoin
                        store.coinValue*=1.2
                    //in tutti gli altri casi
                    }else{
                        //aumento il valore fisso di vittoria del 5% 
                        store.coin = Math.round(store.coin + store.coinValue)
                        store.coinEarnd += store.coin - actualcoin
                        store.coinValue*=1.05
                    }
                    //richiama funzione x aumento livello/stage e modifica mappa
                    this.checkStage()
                }
            },
            //funzione x aumento livello/stage e modifica mappa
            checkStage(){
                let actualcoin = store.coin
                //determiniamo se non siamo al boss
                if (store.ActualStage <= 9) {
                    //determiniamo se non siamo al miniboss
                    if(store.ActualEnemies < 10){
                        //aumentiamo di 1 la posizione nella mappa
                        store.ActualEnemies ++
                    //se siamo al miniboss    
                    } else {
                        //reset sulla mappa a 1
                        store.ActualEnemies = 1
                        //aumento di 1 dello stage
                        store.ActualStage ++
                    }

                }
                //determiniamo se siamo a un boss
                else {
                    //reset dello stage a 1
                    store.ActualStage = 1
                    //aumenta di 1 il valore del piano
                    store.AcutalFloor ++
                    //porta il timer a 30secondi(funzione di check, deprecabile in futuro)
                    store.timer = 30
                } 
            },

            //aumento il valore del danno da click
            increaseClickValue() {
                //controlla se si dispongono soldi per pagare l'upgrade
                if (store.coin >= store.clickPrice) {
                    //sottari i soldi del pagamento
                    store.coin = store.coin - store.clickPrice
                    //aumenta il livello del click
                    store.clickLevel ++
                    //aumenta il valore del danno 
                    store.clickValue+= store.increaseClickValue
                    //determina se l'upgrade è di livello 26/50/75 ecc..
                    if(store.clickLevel % 25 == 0 ) {
                        //raddoppia il valore di danno del click
                        store.clickValue *= 2
                    }
                    //determina se l'upgrade è di livello 10,20,30 ecc...
                    else if(store.clickLevel % 10 == 0 ){
                        //aumenta del 50% il danno del click
                        store.clickValue *= 1.5
                    }
                    //rendi il valore del danno da click un intero
                    store.clickPrice = Math.round((store.clickPrice * 1.2 ) + (((store.clickPrice * 1.2) / 100) * 10))
                }
            },


            calculateIncreaseDps(ally){
                let dps =  Math.round(ally.Dps * ally.increaseDps)
                return dps
            },

            //calcola il prezzo dell'upgrade del danno degli alleati
            calculatePriceToLevelUp(ally){
                let price = null
                if(ally.actualLevel == 1){
                    price = ally.priceToLvlUp
                }else {
                    price = Math.round(ally.priceToLvlUp * ally.increasePrice)
                    price = price.toExponential(3)
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
                               
                        }else if(ally.actualLevel == 10){          
                            ally.increaseDps = 1.5                
                            ally.Dps = Math.round(ally.Dps * 2)
                        }else if (ally.actualLevel == 25){
                            ally.increaseDps = 1
                            ally.Dps = Math.round(ally.Dps * 2)
                        }else if (ally.actualLevel % 25 == 0){
                            ally.startDps += 5
                            ally.Dps = Math.round(ally.Dps * 2)
                        }else if(ally.actualLevel < 25){
                            ally.Dps = Math.round((ally.startDps / ally.increaseDps) + ally.Dps)
                        }else {
                            ally.Dps = Math.round((ally.startDps * ally.increaseDps) + ally.Dps)
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
            },

            //prova caricamento automatico
            load(){
                let storage = localStorage
                for (let key in storage) {
                    if (storage.hasOwnProperty(key)) {
                        let value = storage.getItem(key);
                        store[key] = JSON.parse(value)
                    }
                }
                // let time = JSON.parse(localStorage.getItem('timeLeave'))
                // console.log (localStorage.getItem('ciao'))
                // store.timePast = Date.now() - time
            },
            // registraTempo(){
            //     let ora = JSON.stringify(Date.now()) 
            //     localStorage.setItem('timeLeave', ora)
            //     let ciao = JSON.stringify('ciao')
            //     localStorage.setItem('ciao', ciao)
            // }
        },
        watch: {
            'store.autoAttack': {
                immediate: false, // This will trigger the watcher immediately when the component is mounted
                handler(newValue) {
                    this.hitEnemyWhitDps(); // Call your function when totalDps changes
                }
            },
            'store.coin': {
                immediate: false,
                handler(newValue) {
                    let coin = JSON.stringify(store.coin)
                    localStorage.setItem('coin', coin)
                }
            },
            'store.coinEarnd': {
                immediate: false,
                handler(newValue) {
                    let coinEarnd = JSON.stringify(store.coinEarnd)
                    localStorage.setItem('coinEarnd', coinEarnd)
                }
            },
            'store.coinValue': {
                immediate: false,
                handler(newValue) {
                    let coinValue = JSON.stringify(store.coinValue)
                    localStorage.setItem('coinValue', coinValue)
                }
            },
            'store.clickValue': {
                immediate: false,
                handler(newValue) {
                    let clickValue = JSON.stringify(store.clickValue)
                    localStorage.setItem('clickValue', clickValue)
                }
            },
            'store.clickLevel': {
                immediate: false,
                handler(newValue) {
                    let clickLevel = JSON.stringify(store.clickLevel)
                    localStorage.setItem('clickLevel', clickLevel)
                }
            },
            'store.increaseClickValue': {
                immediate: false,
                handler(newValue) {
                    let increaseClickValue = JSON.stringify(store.increaseClickValue)
                    localStorage.setItem('increaseClickValue', increaseClickValue)
                }
            },
            'store.clickPrice': {
                immediate: false,
                handler(newValue) {
                    let clickPrice = JSON.stringify(store.clickPrice)
                    localStorage.setItem('clickPrice', clickPrice)
                }
            },
            'store.enemyMaxLife': {
                immediate: false,
                handler(newValue) {
                    let enemyMaxLife = JSON.stringify(store.enemyMaxLife)
                    localStorage.setItem('enemyMaxLife', enemyMaxLife)
                }
            },
            'store.ActualStage': {
                immediate: false,
                handler(newValue) {
                    let ActualStage = JSON.stringify(store.ActualStage)
                    localStorage.setItem('ActualStage', ActualStage)
                }
            },
            'store.AcutalFloor': {
                immediate: false,
                handler(newValue) {
                    let AcutalFloor = JSON.stringify(store.AcutalFloor)
                    localStorage.setItem('AcutalFloor', AcutalFloor)
                }
            },
            'store.ActualEnemies': {
                immediate: false,
                handler(newValue) {
                    let ActualEnemies = JSON.stringify(store.ActualEnemies)
                    localStorage.setItem('ActualEnemies', ActualEnemies)
                }
            },
            'store.MaxEnemies': {
                immediate: false,
                handler(newValue) {
                    let MaxEnemies = JSON.stringify(store.MaxEnemies)
                    localStorage.setItem('MaxEnemies', MaxEnemies)
                }
            },
            'store.totalDps': {
                immediate: false,
                handler(newValue) {
                    let totalDps = JSON.stringify(store.totalDps)
                    localStorage.setItem('totalDps', totalDps)
                }
            },
            'store.autoAttack': {
                immediate: false,
                handler(newValue) {
                    let autoAttack = JSON.stringify(store.autoAttack)
                    localStorage.setItem('autoAttack', autoAttack)
                }
            },
            'store.allies': {
                deep: true,
                immediate: false, 
                handler(newAllies, oldAllies) {
                    let allies = JSON.stringify(store.allies)
                    localStorage.setItem('allies', allies)
                }
            },
            'store.autoclickerTimes': {
                deep: true,
                immediate: false, 
                handler(newValue) {
                    let autoclickerTimes = JSON.stringify(store.autoclickerTimes)
                    localStorage.setItem('autoclickerTimes', autoclickerTimes)
                }
            },
        },
        created() {
            // localStorage.clear()
            this.load()
            this.hitEnemyWhitDps()
            store.enemyLife = store.enemyMaxLife
        }
    }

</script>

<template>
    <div class="w-100 h-100">
        <div class="container-fluid h-100">
            <div class="row h-100"  @click="hitEnemy()" id="fieldBase">
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
                        <div  @mouseenter="this.disableClickAtk = true" @mouseleave="this.disableClickAtk = false">

                            <autoclicker v-if="(store.clickLevel >= 10)"/>
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
                                <div>
                                    livello : {{ store.clickLevel }}
                                </div>
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
                        <div v-for="(ally, index) in store.allies" :key="index" class="col-12 row align-items-center p-2" style="cursor: pointer;" @click="levelUpAlly(ally)" >
                            <div  v-if="(store.coinEarnd >= ally.priceToBuy)" class="col-4">
                                <div>
                                    livello: {{ ally.actualLevel }}
                                </div>
                                <div v-if="(ally.unlocked)" :class="(store.coin >= ally.priceToLvlUp )? 'btn-success' : ' btn-danger'" class="btn text-white" >
                                    {{ ally.priceToLvlUp }} <i class="fa-solid fa-coins"></i>
                                </div>
                                <div v-else :class="(store.coin >= ally.priceToBuy)? 'btn-success' : ' btn-danger'" class="btn text-white" >
                                    {{ ally.priceToBuy }} <i class="fa-solid fa-coins"></i>
                                </div>
                                <h6 v-if='(ally.unlocked)'>
                                (DPS {{ ally.Dps }}) 
                                </h6>
                            </div>
                            <div v-if="(store.coinEarnd >= ally.priceToBuy)" class="col-8 mb-4">
                                <h5>
                                    <span v-if="!ally.unlocked">
                                        sblocca :
                                    </span>
                                    {{ ally.name }}
                                </h5>
                                <h6 v-if="(ally.unlocked)">
                                    Aumenta danno
                                </h6>
                                <span v-if="(ally.unlocked)" class="text-secondary">
                                   <span>
                                       prossimo livello   
                                   </span>
                                   <span>
                                    <i class="fa-solid fa-users"></i>
                                   </span>
                                </span>
                            </div>

                            <!-- <h6 v-if=(ally.unlocked)>
                                aumenta Dps {{ calculateIncreaseDps(ally)}} price {{ calculatePriceToLevelUp(ally) }}
                            </h6> -->
                            <hr v-if="(store.coinEarnd >= ally.priceToBuy)" >
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