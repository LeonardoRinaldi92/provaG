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
            if(store.ActualEnemies == 10){
                console.log('parte il cronomtro)')
                this.time = setInterval(() => {
                    if(store.timer > 0) {
                        store.timer -= 0.01
                        this.restart = false
                    }else {
                        clearInterval(this.time)
                        console.log('blocca cronometro')
                        store.timer = 30
                        store.enemyLife = store.enemyMaxLife
                        if(store.ActualEnemies == 10 && store.ActualStage == 10){
                            store.enemyMaxLife /= 7
                            store.enemyLife = store.enemyMaxLife
                        }else {
                            store.enemyMaxLife /= 4
                            store.enemyLife = store.enemyMaxLife
                        }
                        store.ActualEnemies --
                    }
                },10)
            }  
        },
        restartTimer(){
            console.log('parte il restart')
            if (this.restart == true ){
                this.TimerFunction
            }
        }
    },
    created() {
        store.timer = 30
        this.TimerFunction()
        this.restartTimer()
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