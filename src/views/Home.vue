<template>
  <div class="home">
    <div class="search">
      <a-radio-group
        size="large"
        button-style="solid"
        v-model:value="channelType"
      >
        <a-radio-button
          v-for="item in channelList"
          :key="item.value"
          :value="item.value"
          >{{ item.label }}</a-radio-button
        >
      </a-radio-group>
      <br />
      <a-input-search
        size="large"
        v-model:value="keyWords"
        @search="onSearch"
        @pressEnter="onSearch"
        placeholder="在此输入关键词查询"
      />
    </div>
    <div class="title">
      <a-radio-group size="large" v-model:value="channelType">
        <a-radio-button
          v-for="item in channelList"
          :key="item.value"
          :value="item.value"
          >{{ item.label }}</a-radio-button
        >
      </a-radio-group>
    </div>
    <div class="content">
      <a-card title="Card title" :bordered="false">
        <p>card content</p>
      </a-card>

      <a-card title="Card title" :bordered="false">
        <p>card content</p>
      </a-card>
      <a-card title="Card title" :bordered="false">
        <p>card content</p>
      </a-card>
    </div>
  </div>
</template>

<script>
import {
  onMounted,
  reactive,
  toRefs,
  getCurrentInstance,
  ref,
  nextTick,
} from "vue";

export default {
  name: "",
  components: {},
  setup() {
    const { proxy } = getCurrentInstance();
    onMounted(() => {});
    const channelList = [
      { label: "站内", value: "website", action: "website" },
      { label: "谷歌", value: "google", action: "google" },
      { label: "百度", value: "baidu", action: "baidu" },
    ];
    const state = reactive({
      channelType: "website",
      keyWords: "",
      loading: false,
    });
    const onSearch = () => {
      if (state.loading) {
        return;
      }
      state.loading = true;
      console.log(state.loading);
      console.log(state.keyWords);
      nextTick(() => {
        console.log("定时器", state.loading);
        console.log("定时器", state.keyWords);
        state.loading = false;
      }, 1000);
    };
    return {
      ...toRefs(state),
      channelList,
      onSearch,
    };
  },
};
</script>

<style scoped lang="scss">
$mar-top: 16px;

.home {
  display: flex;
  flex-direction: column;
  height: 100%;
  .search {
    background-image: url(https://qiniu.msyml.cn/pexels-felix-mittermeier-956981.jpg?imageView2/1/w/320/h/180);
    height: 224px;
    text-align: center;
    padding-top: $mar-top * 4;
    .ant-input-search {
      margin-top: $mar-top;
      width: 50%;
    }
  }
  .title {
    text-align: center;
    padding: 8px 0;
  }
  .content {
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    align-items:center;
    background-color: #f8f8f8;
  }
}
</style>
