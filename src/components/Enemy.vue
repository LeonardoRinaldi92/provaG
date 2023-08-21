<script>
import { store } from '../store';
export default {
    name: 'Enemy',
    data() {
        return {
            store
        }
    },
    computed: {
        healthBarStyle() {
        const percentage = (store.enemyLife / store.enemyMaxLife) * 100;
            return {
                width: `${percentage}%`
            };
        }
    }
}
</script>

<template>
    <div>
        <div style="width: 200px; margin-bottom: 10px; height: 20px; border: 1px solid black; position: relative;">
            <div style="position: absolute; left: 50%; z-index: 3; top: 1px; font-size: 16px; line-height: 16px; height: 16px;"> 
                {{ store.enemyLife }}

            </div>
            <div style="position: absolute;top:0; bottom: 0; left: 0; background-color: red;" :style=" healthBarStyle">
                
            </div>
        </div>
        <div style="height:300px;width: 200px; background-color: black;">

        </div>
    </div>
</template>