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
            if(store.ActualStage % 10 == 0){
                this.time = setInterval(() => {
                    if(store.timer > 0) {
                        store.timer -= 0.01
                    }else {
                        clearInterval(this.time)
                        store.timer = 30
                        store.ActualStage --
                        store.enemyMaxLife = store.enemyMaxLife / 6
                        store.enemyLife = store.enemyMaxLife

                    }
                },10)
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