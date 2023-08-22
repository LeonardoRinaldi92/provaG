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