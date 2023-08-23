<script>
import { store } from '../store';
export default {
    name: 'EnemiesMap',
    data(){
        return {
            store
        }
    }
}
</script>

<template>
    <div class="container">
        <div class="row justify-content-center w-25 mx-auto">
            <div v-for="(enemy, index) in store.MaxEnemies" :key="index" class="col-1">
                <div :class="(index+1 == store.ActualEnemies)? '' : 'opacity-25'">
                    <i class="fa-solid" :class="(index+1 == 10) ? 'fa-skull-crossbones' : 'fa-circle-dot'" style="font-size: 12px;"></i>
                </div>
            </div>

        </div>
        
    </div>
</template>