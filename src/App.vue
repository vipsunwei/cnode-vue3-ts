<template>
  <w-navigator
    :height="50"
    :style="{ paddingLeft: '50px', paddingRight: '50px' }"
  ></w-navigator>
  <div class="main">
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import WNavigator from "@/components/WNavigator.vue";
export default defineComponent({
  name: "App",
  components: {
    WNavigator
  },
  setup() {
    return {};
  }
});
</script>

<style lang="scss">
html,
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background: #e1e1e1;
  color: #333;
  font-size: 13px;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
ul,
li {
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.main {
  box-sizing: border-box;
  overflow-y: auto;
  // flex: 1;
  // padding: 20px;
}
</style>
