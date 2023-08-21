<script>
    import { store } from '../store';
    export default {
        name: 'Field',
        data() {
            return {
                store
            }
        }
    }

</script>

<template>
    <div>
        <h1>
            prova {{ store.prova }}
        </h1>
    </div>
</template>