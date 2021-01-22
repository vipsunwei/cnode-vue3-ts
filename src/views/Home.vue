<template>
  <div class="home">
    <w-tabs :gutter="20" :style="{ backgroundColor: '#f6f6f6' }">
      <w-tab-item
        v-for="item in tabs"
        :key="item.value"
        :active="activeTab === item.value"
        @click="onTabClick(item.value)"
      >
        {{ item.label }}
      </w-tab-item>
    </w-tabs>
    <div>
      <w-list-item
        v-for="item in topics"
        :key="item.id"
        :listItem="item"
        :isShowTab="isShowTab"
        @click="goDetails(item.id)"
      ></w-list-item>
      <div
        :style="{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '50px',
          padding: '0 20px'
        }"
      >
        <button :disabled="currentPage === 1" @click="prev">上一页</button>
        <select v-model="pageSize" @change="onPageSizeChange">
          <option value="10">10</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
        <button @click="next">下一页</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, Ref, ref, watch } from "vue";
import WTabs from "@/components/WTabs.vue";
import WTabItem from "@/components/WTabItem.vue";
import WListItem from "@/components/WListItem.vue";
import "vue3-pagination/dist/vue3-pagination.css";
import { getTopics } from "@/api/index";
import { Tab, TopicsItem } from "@/interface/topics";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn"; // use locale
import relativeTime from "dayjs/plugin/relativeTime";
import { useRouter } from "vue-router";
dayjs.locale("zh-cn");
dayjs.extend(relativeTime);

export default defineComponent({
  name: "Home",
  components: {
    WTabs,
    WTabItem,
    WListItem
  },
  setup() {
    const tabs: Array<Tab> = [
      {
        label: "全部",
        value: "all"
      },
      {
        label: "精华",
        value: "good"
      },
      {
        label: "分享",
        value: "share"
      },
      {
        label: "问答",
        value: "ask"
      },
      {
        label: "招聘",
        value: "job"
      },
      {
        label: "测试",
        value: "dev"
      }
    ];
    const activeTab: Ref<string> = ref("all");
    const currentPage: Ref<number> = ref(1);
    const pageSize: Ref<number> = ref(10);
    const topics: Ref<TopicsItem[]> = ref([]);
    const isShowTab = computed(() => activeTab.value === "all");
    function onTabClick(tab: string): void {
      currentPage.value = 1;
      activeTab.value = tab;
    }
    function fmtTime(item: TopicsItem): TopicsItem {
      if (item.last_reply_at) {
        item.lastReplyAt = dayjs(item.last_reply_at).fromNow();
      }
      if (item.create_at) {
        item.createAt = dayjs(item.create_at).fromNow();
      }
      return item;
    }
    function getData(): void {
      getTopics({
        tab: activeTab.value,
        limit: pageSize.value,
        page: currentPage.value
      }).then(res => {
        topics.value = res.data.map(fmtTime);
      });
    }
    watch(
      () => activeTab.value,
      () => getData(),
      {
        immediate: true
      }
    );
    const router = useRouter();
    function goDetails(id: string) {
      router.push({ path: "/details", query: { id } });
      // router.push({ name: 'Details', params: { id } })
    }
    function prev(): void {
      currentPage.value--;
      getData();
    }
    function next(): void {
      currentPage.value++;
      getData();
    }
    function onPageSizeChange(e: Event): void {
      pageSize.value = +(e.target as HTMLSelectElement).value;
      currentPage.value = 1;
      getData();
    }
    return {
      tabs,
      activeTab,
      onTabClick,
      topics,
      isShowTab,
      goDetails,
      currentPage,
      prev,
      next,
      pageSize,
      onPageSizeChange
    };
  }
});
</script>

<style lang="scss" scoped>
.home {
  box-sizing: border-box;
  // width: 100%;
  min-width: 960px;
  max-width: 1280px;
  background-color: #fff;
  margin: 20px auto;
}
</style>
