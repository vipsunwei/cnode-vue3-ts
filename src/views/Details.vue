<template>
  <div>details</div>
  <div v-html="details.content"></div>
</template>

<script lang="ts">
import { getTopicDetails } from "@/api";
import { defineComponent, onMounted, ref } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "Details",
  setup() {
    const route = useRoute();
    const details = ref({});
    function getData() {
      const id: string = route.query.id as string;
      getTopicDetails(id).then(res => {
        details.value = res.data;
        console.log(details.value);
      });
    }
    onMounted(() => getData());
    return { details };
  }
});
</script>

<style scoped></style>
