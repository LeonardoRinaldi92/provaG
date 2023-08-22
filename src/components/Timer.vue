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
<<<<<<< HEAD
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
=======
            this.time = setInterval(() => {
                if(store.timer > 0) {
                    store.timer -= 0.01
                }else {
                    clearInterval(this.time)
                    store.timer = 30
                }

            },10)
        }
    },
    created() {
>>>>>>> 6c4a44dae9c05c7501b72fcc4ee285e5201f3f7a
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