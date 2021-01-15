<template>
    <v-app-bar dense color="blue">
        <router-link to="Kwick">
            <v-btn small fab dark outlined @click="logOut()">
                <v-icon>mdi-home</v-icon>
            </v-btn>
        </router-link>
    </v-app-bar>
</template>

<script>
export default {
    methods:{
        // les methods s'excutent lors d'un appel
        logOut(){
            this.$store.commit('kwick/logOut')
            this.$store.commit('kwick/isLoged',false)
        }
    }

}
</script>

<style>

</style>