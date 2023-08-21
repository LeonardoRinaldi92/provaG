<script>
    import { store } from '../store';
    export default {
        name: 'Field',
        data() {
            return {
                store,
            }
        },
        methods: {
            addCoin() {
                store.coin  = store.coin + store.coinValue
            }
        }
    }

</script>

<template>
    <div class="w-100 h-100">
        <div class="container-fluid h-100">
            <div class="row h-100"  @click="addCoin()">
                <div class="col-12 h-75" style="background-color: rgb(175, 201, 224);">
                    <div class="text-center">
                        <h3>
                            coin : {{ store.coin }}
                        </h3>
                    </div>
                </div>
                <div class="col-12 h-25" style="background-color: rgb(61, 129, 40);">
                </div>


            </div>

        </div>
    </div>
</template>