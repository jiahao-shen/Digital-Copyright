<template>
    <div class="profile-page">
        <section class="section-profile-cover section-shaped my-0">
            <div class="shape shape-style-1 shape-primary shape-skew alpha-4">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </section>
        <!-- <profile-homepage></profile-homepage> -->
        <fade-transition origin="center" mode="out-in" :duration="250">
            <router-view/>
        </fade-transition>
    </div>
</template>


<script>
import { FadeTransition } from "vue2-transitions";
export default {
    components: {
        FadeTransition,
    }
}
</script>
<style scoped lang="scss">
.collection-image {
    width: 100%;
    margin-top: 5vh;
}
</style>
