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
            // Call autoClick function 10 times per second for 10 seconds
            const interval = 100; // milliseconds
            const duration = 10000; // 10 seconds
            let counter = 0;

            const autoClickInterval = setInterval(() => {
                if (counter >= duration / interval) {
                    clearInterval(autoClickInterval); // Stop the interval after 10 seconds
                } else {
                    this.autoClick();
                    counter++;
                }
            }, interval);
        },
        countDown(){
            window.setInterval(() => {
            store.autoclickerTimes -= 1;
            }, 1000);
        }
    },
    mounted(){
        this.startAutoclick()
        this.countDown()
    },
    computed: {
        formatTimer() {
            const minutes = Math.floor(store.autoclickerTimes / 60);
            const seconds = store.autoclickerTimes % 60;
            return `${minutes.toString().padStart(2, '0')}.${seconds.toString().padStart(2, '0')}`;
        }
    },
}
</script>

<template>
    <div>
        <i class="fa-solid fa-computer-mouse"></i>
    </div>
    <div>
        {{ this.formatTimer }}
    </div>
</template>