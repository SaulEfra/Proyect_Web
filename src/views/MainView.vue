<template>
    <div class="row">
        <div class="col-md-3 col-lg-2">
            <ParteLateral></ParteLateral>
        </div>
        <div class="Contenid col-md-3 col-lg-9">
            <RouterView></RouterView>
        </div>
        
    </div>


</template>
<script>
import ParteLateral from '@/components/ParteLateral.vue';
import { RouterView } from 'vue-router';

export default {
    name: 'MainView',
    components: {
        ParteLateral,
        RouterView,
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