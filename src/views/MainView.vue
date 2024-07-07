<template>
    
        <div class="row">
            <div class="col-lg-2 partlt shadow">
                <ParteLateral></ParteLateral>
            </div>
            <div class="Contenid col-lg-9">
                <RouterView></RouterView>
            </div>
        </div>
    
</template>
<script>
import ParteLateral from '../components/ParteLateral.vue';

export default {
    name: 'MainView',
    components: {
        ParteLateral
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
.partlt{
    border-right: 2px solid #f2f2f2;;
}
</style>