<template>
  <li :style="style" class="tab-item" :class="{ 'is-active': active }">
    <slot></slot>
  </li>
</template>
<script lang="ts">
import { computed, defineComponent, inject } from "vue";
export default defineComponent({
  name: "WTabItem",
  props: {
    active: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const gutter = inject("WTabs", 0);
    const style = computed(() => {
      if (gutter) {
        return {
          display: "block",
          minHeight: "1px",
          marginLeft: gutter / 2 + "px",
          marginRight: gutter / 2 + "px"
        };
      }
      return {};
    });
    return { style };
  }
});
</script>

<style lang="scss" scoped>
.tab-item {
  height: auto;
  cursor: pointer;
  padding: 3px 4px;
}
.tab-item:hover,
.tab-item:focus {
  color: #80bd01;
  font-weight: bold;
}
.tab-item.is-active {
  color: #fff;
  background-color: #80bd01;
  border-radius: 3px;
  font-weight: bold;
}
</style>
