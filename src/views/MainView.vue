<template>
    <div class="row">
        <div class="col-md-3 col-lg-2 partlt">
            <ParteLateral ref="parteLateral"></ParteLateral>
        </div>
        <div class="Contenid col-md-9 col-lg-10">
            <RouterView @negocio-creado="actualizarNegocios"></RouterView>
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
    },
    methods: {
        actualizarNegocios() {
            // Llama al método cargarNegocios del componente ParteLateral
            this.$refs.parteLateral.cargarNegocios();
        }
    }
}
</script>

<style scoped>
.row {
    display: flex;
    flex-wrap: wrap;
}

.Contenid {
    flex: 1;
    padding: 20px;
}

.partlt {
    border-right: 2px solid #f2f2f2;
}
</style>