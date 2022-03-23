<template>
    <div>
        <p>id: {{ id }}</p>
        <p>title: {{ title }}</p>
        
    </div>
</template>

<script>
import { reactive, ref, onMounted} from "@vue/composition-api";
export default {
    name: "Details",
    setup(props, { root }){
        onMounted(() => {
            id.value = root.$store.state.infoDetails.id;
            title.value = root.$store.state.infoDetails.title;
        });
        const id = ref("");
        const title = ref("");
        return {
            id,
            title,
        }
    }
}
</script>

<style lang="scss" scoped>

</style>