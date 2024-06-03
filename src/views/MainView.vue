<template>
    <div class="Cont col-lg-12">
        <div class="row">
            <div class="col-lg-3">
                <ParteLateral></ParteLateral>
            </div>
            <div class="Contenid col-lg-9">
                <RouterView></RouterView>
            </div>
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
<style>
.Cont {
    display: flex;
}

.Contenid {
    flex: 1;
    padding: 20px;
}
</style>