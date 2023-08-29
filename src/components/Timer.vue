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
                this.time = setInterval(() => {
                    if(store.timer > 0) {
                        store.timer -= 0.01
                        if(store.ActualEnemies !== 10){
                            clearInterval(this.time)
                        }
                    }else {
                        clearInterval(this.time)
                        store.timer = 30
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