<script>
import { store } from '../store';

export default {
    name: 'autoclicker',
    data(){
        return {
            store,
            isActive : false,
            time: store.autoclickerTimes
        }
    },
    methods: {
        autoClick() {

            const filed = document.getElementById('fieldBase');
            if (filed && this.isActive) {
                const clickEvent = new Event('click', {
                    bubbles: true,
                    cancelable: true,
                });
                filed.dispatchEvent(clickEvent);
            }
        },
        startAutoclick() {
            if(store.autoclickerTimes >= 600){
                this.autoclickerTimes = true
                // Call autoClick function 10 times per second for 10 seconds
                const interval = 100; // milliseconds
                const duration = 10000; // 10 seconds
                let counter = 0;
    
                const autoClickInterval = setInterval(() => {
                    if (counter >= duration / interval) {
                        clearInterval(autoClickInterval);
                        this.isActive = false // Stop the interval after 10 seconds
                    } else {
                        this.autoClick();
                        this.isActive = true
                        counter++;
                    }
                }, interval);
                this.startCountdown()
            }
        },
        
        startCountdown() {
            const interval = 1000; // 1 second
            const countdownInterval = setInterval(() => {
                if (store.autoclickerTimes > 0) {
                    store.autoclickerTimes -= 1;
                } else {
                    clearInterval(countdownInterval);
                    store.autoclickerTimes = 600;
                    this.isActive = false
                }
            }, interval);
        },
        stopCountdown() {
            clearInterval(this.countdownInterval);
        }
    },
    computed: {
        formatTimer() {
            const minutes = Math.floor(store.autoclickerTimes / 60);
            const seconds = store.autoclickerTimes % 60;
            return `${minutes.toString().padStart(2, '0')}.${seconds.toString().padStart(2, '0')}`;
        }
    },
    mounted(){
        this.startCountdown()
    }
}
</script>

<template>
    <div @click="startAutoclick()" class="cursor-pointer" :class="(store.autoclickerTimes >= 600)? 'text-white' : 'text-secondary'">
        <i class="fa-solid fa-computer-mouse" ></i>
        <div v-if="((store.autoclickerTimes < 600))">
            <span class="cursor-na">
                {{ this.formatTimer }}
            </span>
        </div>
    </div>
</template>