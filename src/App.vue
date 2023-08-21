<script >
import Field from './components/Field.vue';

export default {
  name: 'App',
  components: {
    Field
  }
}
</script>

<template>
  <div class="box-container">
    <Field/>
  </div>
</template>

<style lang="scss">
@use './style/main.scss';
</style>