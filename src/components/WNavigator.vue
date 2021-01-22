<template>
  <div class="navigator" :style="style">
    <div>cnode</div>
    <ul class="nav-list">
      <li @click="navTo('/')">首页</li>
      <li @click="navTo('/about')">新手教程</li>
      <li>API</li>
    </ul>
    <div>你好 用户1</div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import { Router, useRouter } from "vue-router";
export default defineComponent({
  name: "WNavigator",
  props: {
    height: {
      type: [Number, String] as PropType<number | string>,
      default: ""
    }
  },
  setup(props) {
    const router: Router = useRouter();
    function navTo(path: string): void {
      router.push(path);
    }
    const style = computed(() => {
      if (props.height) {
        if (typeof props.height === "string") {
          return {
            height: props.height
          };
        }
        if (typeof props.height === "number") {
          return {
            height: props.height + "px"
          };
        }
      }
      return {};
    });
    return { navTo, style };
  }
});
</script>

<style lang="scss" scoped>
.navigator {
  background-color: #444;
  // width: 100%;
  height: 60px;
  font-size: 13px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;
  box-sizing: border-box;
  color: #ccc;
  flex-shrink: 0;
}
.nav-list {
  list-style: none;
  height: 100%;
  display: flex;
  align-items: center;
  color: #ccc;
}
.nav-list > li {
  padding: 0 20px;
  cursor: pointer;
}
.nav-list > li:hover {
  color: #fff;
}
</style>
