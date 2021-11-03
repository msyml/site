<template>
  <div class="blogs">
    <Title></Title>
    <div class="list">
      <div
        v-for="item in blogList"
        @click="handleClick(item)"
        :key="item.title"
        class="item"
      >
        <div class="title">
          {{ item.title }}
        </div>
        <span class="time">
          {{ $dayjs(item.createTime).format("YYYY-MM-DD") }}
        </span>
      </div>
      <div class="page">
        <div
          v-show="page.pageIndex != 1"
          @click="handlePageClick(-1)"
          class="prev"
        >
          <i class="iconfont icon-left"></i>
          <span>Prev</span>
        </div>
        <div style="flex: 1"></div>
        <div
          v-show="page.pageIndex < page.totalPage"
          @click="handlePageClick(1)"
          class="next"
        >
          <span>Next</span>
          <i class="iconfont icon-right"></i>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Title from "comps/Title.vue";
import { onMounted, reactive, toRefs } from "vue";
import { api } from "../api/index";
import { useRouter, useRoute } from "vue-router";
export default {
  name: "Blog",
  components: {
    Title,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const state = reactive({
      page: {
        pageIndex: 1,
        pageSize: 10,
        totalPage: 1,
      },
      blogList: [],
    });
    onMounted(() => {
      getBlogList();
    });
    const getBlogList = () => {
      const para = {
        pageSize: state.page.pageSize,
        pageNum: state.page.pageIndex,
      };
      api
        .getBlogList(para)
        .then((res) => {
          state.blogList = res.list;
          state.page.totalPage = res.totalPage;
        })
        .finally(() => {});
    };
    const handlePageClick = (number) => {
      state.page.pageIndex += number;
      getBlogList();
    };
    const handleClick = (item) => {
      router.push({
        name: "blogDetail",
        query: {
          id: item.id,
        },
      });
    };
    return {
      ...toRefs(state),
      getBlogList,
      handlePageClick,
      handleClick,
    };
  },
};
</script>

<style scoped lang="scss">
.blogs {
  display: flex;
  flex-direction: column;
  align-items: center;
  .list {
    .item {
      border-bottom: 1px solid #eee;
      padding: 16px 0;
      cursor: pointer;
      color: #bbbbca;
      display: flex;
      justify-content: space-between;
      line-height: 36px;
      .title {
        color: #333;
        font: bold 19px/1.7 "Helvetica Neue", helvetica, Arial, sans-serif;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
    }
    .item:hover,
    .item .title:hover {
      color: #2e62cd;
    }
    .page {
      margin-top: 24px;
      display: flex;
      justify-content: space-between;
      line-height: 36px;
      height: 36px;
      span {
        font-size: 24px;
      }
      i {
        font-size: 18px;
      }
      .next:hover {
        transform: translateX(5px);
        color: #2e62cd;
        cursor: pointer;
      }
      .prev:hover {
        transform: translateX(-5px);
        color: #2e62cd;
        cursor: pointer;
      }
    }
  }
}

@media only screen and (min-width: 721px) {
  .item {
    width: 640px;
    .title {
      max-width: 70%;
    }
  }
}

@media only screen and (max-width: 720px) {
  .item {
    .time {
      display: none;
    }
  }
}
</style>
