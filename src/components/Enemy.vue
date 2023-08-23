<script>
import { store } from '../store';
export default {
    name: 'Enemy',
    data() {
        return {
            store,
            enemeyName : null
            
        }
    },
    computed: {
        createEnemy() {
            let randNumb = Math.floor(Math.random() * this.store.enemies.length);
            this.enemeyName = this.store.enemies[randNumb].name;
            let img = this.store.enemies[randNumb].img;
            store.ActualEnemies;

            return {
                backgroundImage: "url('" + img + "')",
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'contain',
            };
        },
        createEnemyName() {

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
        <div style="height:300px;width: 200px;">
            <div style="height:280px;width: 200px;" :style="createEnemy" :class="isBoss" id="enemy">
            </div>
            <div class="text-center">
                {{ this.enemeyName }}
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>

.Boss{

    background-color: black;
}



</style>