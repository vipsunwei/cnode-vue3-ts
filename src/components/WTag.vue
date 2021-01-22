<template>
  <div v-if="tagText" :style="style">
    {{ tagText }}
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import { TopicsItem } from "@/interface/topics";
export default defineComponent({
  name: "WTag",
  props: {
    item: {
      type: Object as PropType<TopicsItem>,
      required: true
    }
  },
  setup(props) {
    const tagText = computed(() => {
      const top = props.item.top;
      const good = props.item.good;
      const tab = props.item.tab;
      if (top) {
        return "置顶";
      }
      if (good) {
        return "精华";
      }
      if (tab) {
        return tab === "ask"
          ? "问答"
          : tab === "share"
          ? "分享"
          : tab === "job"
          ? "招聘"
          : tab === "dev"
          ? "测试"
          : "";
      }
      return "";
    });
    const style = computed(() => {
      const top = props.item.top;
      const good = props.item.good;
      // const tab = props.item.tab
      const _style = {
        fontSize: "12px",
        padding: "2px 4px",
        borderRadius: "2px",
        backgroundColor: "#e5e5e5",
        color: "#999",
        marginRight: "5px",
        cursor: "default"
      };
      if (top || good) {
        _style.color = "#fff";
        _style.backgroundColor = "#80bd01";
        return _style;
      }
      return _style;
    });
    return { tagText, style };
  }
});
</script>

<style lang="scss" scoped></style>
