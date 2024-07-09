<template>
    <div class="Cont col-lg-12">
        <div class="row">
            <div class="col-lg-2">
                <ParteLateral></ParteLateral>
            </div>
            <div class="Contenid col-lg-9">
                <RouterView></RouterView>
            </div>
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