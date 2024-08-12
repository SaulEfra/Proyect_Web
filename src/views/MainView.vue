<template>

    <div class="row">
        <div class="col-lg-2 partlt shadow">
            <ParteLateral></ParteLateral>
            <div class="row">
                <div class="Contenid col-lg-10">
                    <RouterView></RouterView>
                </div>
            </div>
        </div>
    </div>


</template>
<script>



export default {
    name: 'MainView',
    components: {
    }
}

</script>
<style scoped>
.Cont {
    display: flex;
}

.Contenid {
    flex: 1;
    padding: 20px;
}

.partlt {
    border-right: 2px solid #f2f2f2;
    ;
}
</style>