<template>
        <div>
            <h5>Precio producto</h5>
            <p>{{ presioprod }}</p>
            <h5>Descripción</h5>
            <p>{{ descrip }}</p>
        </div>
</template>

<script>
export default {
    name:'ModalProducactinfo',
    data(props){
        return{
            props
        }
    },
    props:{
        presioprod:Number,
        descrip:String
    }

}
</script>

<style scoped>
    
</style>