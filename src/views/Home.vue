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
        v-model:value="keyWord"
        @search="onSearch"
        @pressEnter="onSearch"
        placeholder="在此输入关键词查询"
      />
    </div>
    <!-- <div class="title">
      <a-radio-group size="large" v-model:value="channelType">
        <a-radio-button
          v-for="item in channelList"
          :key="item.value"
          :value="item.value"
          >{{ item.label }}</a-radio-button
        >
      </a-radio-group>
    </div> -->
    <div class="content" v-if="codeList.length > 0 || loading">
      <div v-show="loading" class="mini">
        <a-skeleton active />
      </div>
      <div v-show="!loading">
        <div v-for="item in codeList" :key="item.id" class="mini">
          <h1>{{ item.title }}</h1>
          <v-md-preview class="md-text" :text="item.content"></v-md-preview>
        </div>
        <a-pagination
          class="pagi"
          v-model:current="pageNum"
          @change="handlerPage"
          :total="totalCount"
          show-less-items
        />
      </div>
    </div>
    <div v-else class="empty">
      <a-empty
        image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
        :image-style="{
          height: '60px',
        }"
      >
        <template #description>
          <span> 站内不存在相关资源，是否跳转到Google搜索 </span>
        </template>
        <a-button @click="toGoogle()" type="primary">Google一下</a-button>
      </a-empty>
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
  h,
} from "vue";

export default {
  name: "",
  components: {},
  setup() {
    const { proxy } = getCurrentInstance();
    onMounted(() => {
      onSearch();
    });
    const channelList = [
      { label: "站内", value: "website", action: "website" },
      { label: "谷歌", value: "google", action: "google" },
      { label: "百度", value: "baidu", action: "baidu" },
    ];
    const state = reactive({
      channelType: "website",
      keyWord: "",
      loading: false,
      codeList: [],
      pageSize: 10,
      pageNum: 1,
      totalCount: 0,
    });
    const handlerPage = (pageNum) => {
      state.pageNum = pageNum;
      onSearch();
    };
    const onSearch = () => {
      if (state.channelType === "website") {
        if (state.loading) {
          return;
        }
        state.loading = true;
        const { pageSize, pageNum, keyWord } = state;
        const para = {
          pageSize,
          pageNum,
          keyWord: keyWord.trim(),
        };
        proxy.$api
          .getMiniList(para)
          .then((data) => {
            state.codeList = data.list;
            state.totalCount = data.total;
          })
          .finally(() => (state.loading = false));
      } else if (state.channelType === "baidu") {
        window.open(`https://www.baidu.com/s?wd=${state.keyWord}`, "_blank");
      } else if (state.channelType === "google") {
        toGoogle();
      }
    };
    const toGoogle = () => {
      window.open(`https://www.google.com/search?q=${state.keyWord}`, "_blank");
    };

    return {
      ...toRefs(state),
      channelList,
      onSearch,
      toGoogle,
      handlerPage,
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
    flex-direction: column;
    background-color: #f8f8f8;
    .mini {
      margin: 16px;
      background-color: #fff;
      border-radius: 12px;
      h1 {
        text-align: center;
        border-bottom: 1px solid #eee;
        padding: 4px 0;
      }
    }
  }
  .pagi {
    text-align: center;
  }
}
</style>
