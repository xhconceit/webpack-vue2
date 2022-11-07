<template>
    <div>Hello world s  s s{{msg}}; <Com />
    <div></div></div>
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

<style scoped>
div{
    color: rebeccapurple;
}
</style>