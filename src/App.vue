<template>
    <div>Hello {{msg}}; <Com /></div>
</template>

<script>
import Com from './Com.vue'
export default {
    data() {
        return {
            msg: 'Vue'
        }
    },
    components: {
        Com
    }
}
</script>

<style>
div{
    color: rebeccapurple;
}
</style>