<template>
  <div class="main">
    <div class="header">
      <span
        class="btn"
        :class="{ check: item.path === checkItem }"
        @click="handleClick(item)"
        v-for="item in menuList"
        :key="item.label"
        >{{ item.label }}</span
      >
    </div>
    <router-view class="routerBody" />
    <div class="footer">
      <p>浙ICP备2021005058号</p>
      <div class="gongan">
        <img src="../assets/beian.png" />
        <span>浙公网安备 33032402002173号</span>
      </div>
      <p>© Copyright 2021 抹上一抹凉</p>
    </div>
  </div>
</template>
<script>
import { onMounted, reactive, toRefs } from "vue";
import { useRouter, useRoute } from "vue-router";
export default {
  name: "Main",
  setup() {
    const router = useRouter();
    const route = useRoute();
    const state = reactive({
      checkItem: "/home",
      menuList: [
        {
          label: "关于",
          active: "jump",
          path: "/aboutMe",
          icon: "iconfont icon-aboutme",
        },
        {
          label: "博客",
          active: "jump",
          path: "/blog",
          icon: "iconfont icon-boke",
        },
        // {
        //   label: "码云",
        //   active: "open",
        //   path: "https://gitee.com/a-little-cool",
        //   icon: "iconfont icon-mayun",
        // },
        {
          label: "首页",
          active: "jump",
          path: "/home",
          icon: "iconfont icon-home",
        },
      ],
    });
    onMounted(() => {
      checkRoute();
    });
    const handleClick = (item) => {
      if (item.active == "open") {
        window.open(item.path);
      } else {
        state.checkItem = item.path;
        router.push(item.path);
      }
    };
    const checkRoute = () => {
      if (route.path) {
        state.checkItem = route.path;
      }
    };
    return {
      ...toRefs(state),
      handleClick,
      checkRoute,
    };
  },
};
</script>
<style scoped lang="scss">
.main {
  display: flex;
  min-height: 100%;
  flex-direction: column;
  .header {
    display: flex;
    flex-direction: row-reverse;
    position: fixed;
    left: 0;
    z-index: 5;
    right: 0;
    background: white;
    top: 0;
    padding: 8px 0;
    border-bottom: 1px solid #eee;
    .btn {
      color: #2e62cd;
      margin: 0 24px;
      padding: 4px;
      cursor: pointer;
    }
    .check {
      background-color: #2e62cd;
      color: white;
      border-radius: 8px;
    }
  }
  .routerBody {
    padding: 50px 0;
    flex: 1;
  }
  .footer {
    display: flex;
    position: fixed;
    z-index: 5;
    right: 0;
    width: 100%;
    bottom: 0;
    justify-content: space-around;
    background: white;
    border-top: 1px solid #eee;
    align-items: center;
    flex-direction: row;
    font-size: 12px;
    color: #aaaabd;
    line-height: 16px;
    img {
      width: 16px;
      height: 16px;
    }
  }
}
</style>
