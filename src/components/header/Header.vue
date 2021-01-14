<template>
    <v-app-bar dense color="blue">
        <router-link to="Kwick">
            <v-btn small fab color="wight" outlined @click="logOut()">
                Home
            </v-btn>
        </router-link>
    </v-app-bar>
</template>

<script>
export default {
    methods:{
        logOut(){
            this.$store.commit('kwick/logOut')
        }
    }

}
</script>

<style>

</style>