<template>
    <!--  <div class="Cont col-lg-12">
        <div class="row">
            <div class="col-lg-3">
                <ParteLateral></ParteLateral>
            </div>
            <div class="Contenid col-lg-9">
                <RouterView></RouterView>
            </div>
        </div>
    </div>
      -->
    <div class="row">
        <div class="col-2">
            <ParteLateral></ParteLateral>
        </div>
        <div class="Contenid col-10">
            <Empleados></Empleados>
                <!--<InfoNeg></InfoNeg>-->
        </div>
    </div>


</template>
<script>
import ParteLateral from '@/components/ParteLateral.vue';
/*import InfoNeg from '../components/InfoNeg.vue';*/
import Empleados from '@/components/Empleados.vue';

export default {
    name: 'MainView',
    components: {
        ParteLateral,
        Empleados,
        /**InfoNeg,**/
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