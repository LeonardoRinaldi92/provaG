<script>
import { store } from '../store';
export default {
    name: 'Timer',
    data() {
        return {
            store,
            time: null,
        }
    },
    computed: {
        formatTimer(){
            return store.timer.toFixed(2)
        }
    },
    methods: {
        TimerFunction() {
            console.log(store.ActualEnemies)
            if(store.ActualEnemies == 10){
                this.time = setInterval(() => {
                    if(store.timer > 0) {
                        store.timer -= 0.01
                        console.log('scorro')
                        if(store.ActualEnemies !== 10){
                            clearInterval(this.time)
                            console.log('mi blocco')
                        }
                    }else {
                        clearInterval(this.time)
                        console.log('mi blocco')
                        store.timer = 30
                        if(store.ActualEnemies == 10 && store.ActualStage == 10){
                            store.enemyMaxLife /= 7
                            store.enemyLife = store.enemyMaxLife
                        }else {
                            store.enemyMaxLife /= 4
                            store.enemyLife = store.enemyMaxLife
                            console.log('riduco vita miniboss')
                        }
                        store.ActualEnemies --
                    }
                },10)
            }  
        },
        restartTimer(){
            if (this.restart == true ){
                this.TimerFunction
            }
        }
    },
    created() {
        store.timer = 30
        this.TimerFunction()
    }
}

</script>

<template>
    <div>
        <h1>
            {{ this.formatTimer }}
        </h1>
    </div>
</template>