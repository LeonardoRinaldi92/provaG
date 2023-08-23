<script>
import { store } from '../store';
export default {
    name: 'Enemy',
    data() {
        return {
            store
        }
    },
    methods: {
        createNewEnemy(){
            this.createEnemy
        }
    },
    computed: {
        createEnemy() {
            let randNumb = Math.floor(Math.random() * this.store.enemies.length);
            let img = this.store.enemies[randNumb].img;

            return {
                backgroundImage: "url('" + img + "')",
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'contain'
            };
        },
        healthBarStyle() {
            const percentage = (this.store.enemyLife / this.store.enemyMaxLife) * 100;
            return {
                width: `${percentage}%`
            };
        },
        isBoss() {
            return this.store.ActualStage === 10 ? 'Boss' : 'NoBoss';
        }
    },
    watch: {
        'store.ActualEnemies': {
            immediate: true,
            handler(newValue) {
                console.log('ciao');
                this.createNewEnemy(); // Corrected line
            }
        }
    }
}
</script>

<template>
    <div>
        <div style="width: 200px; margin-bottom: 10px; height: 20px; border: 1px solid; position: relative;"  >
            <div style="position: absolute; left: 50%; z-index: 3; top: 1px; font-size: 16px; line-height: 16px; height: 16px;"> 
                {{ store.enemyLife }}

            </div>
            <div style="position: absolute;top:0; bottom: 0; left: 0; background-color: red;" :style=" healthBarStyle">
                
            </div>
        </div>
        <div style="height:300px;width: 200px;" :style="createEnemy" :class="isBoss" id="enemy">

        </div>
    </div>
</template>

<style lang="scss" scoped>

.Boss{

    background-color: black;
}



</style>