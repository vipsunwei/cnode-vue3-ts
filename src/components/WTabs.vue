<template>
  <ul class="tab" :style="style">
    <slot name="default"></slot>
  </ul>
</template>

<script lang="ts">
import { computed, defineComponent, provide } from "vue";
export default defineComponent({
  name: "WTabs",
  props: {
    gutter: {
      type: [Number],
      default: 0
    }
  },
  setup(props) {
    provide("WTabs", props.gutter);
    const style = computed(() => {
      if (props.gutter) {
        return {
          paddingLeft: props.gutter / 2 + "px",
          paddingRight: props.gutter / 2 + "px"
        };
      }
      return {};
    });
    return { style };
  }
});
</script>

<style lang="scss" scoped>
.tab {
  box-sizing: border-box;
  width: 100%;
  height: 40px;
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
</style>
