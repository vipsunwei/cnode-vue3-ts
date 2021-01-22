<template>
  <div class="list-item" v-if="isShow">
    <div class="info">
      <img class="avatar" :src="avatarUrl" :title="loginName" />
      <w-tag v-if="isShowTag" :item="listItem"></w-tag>
      <span class="title">{{ listItem.title }}</span>
    </div>
    <div class="last-active-time">{{ listItem.lastReplyAt }}</div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import { TopicsItem } from "@/interface/topics";
import WTag from "@/components/WTag.vue";

export default defineComponent({
  name: "WListItem",
  components: {
    WTag
  },
  props: {
    listItem: {
      type: Object as PropType<TopicsItem>,
      required: true
    },
    isShowTab: {
      type: Boolean,
      default: true
    }
  },
  setup(props) {
    const avatarUrl = computed(() => props?.listItem?.author?.avatar_url);
    const loginName = computed(() => props?.listItem?.author?.loginname);
    const tab = computed(() => props?.listItem?.tab);
    const isShow = computed(() => tab.value);
    const isShowTag = computed(() => {
      return props.listItem?.top || props.listItem?.good || props.isShowTab;
    });

    return { avatarUrl, loginName, tab, isShow, isShowTag };
  }
});
</script>

<style lang="scss" scoped>
.list-item {
  border-top: 1px solid #f0f0f0;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  background-color: #fff;
  .info {
    flex: 1;
    margin-right: 20px;
    display: inline-flex;
    align-items: center;
    .avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin-right: 15px;
    }
  }
  .last-active-time {
    flex-shrink: 0;
    width: 150px;
    text-align: right;
  }
  .title {
    cursor: pointer;
    font-size: 16px;
    color: #333;
  }
}
.list-item:hover {
  background-color: rgba($color: #f5f5f5, $alpha: 1);
}
.list-item:nth-child(1) {
  border-top: none;
}
</style>
