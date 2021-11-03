<template>
  <div class="detail">
    <div class="head">
      <h1>{{ detail.title }}</h1>
      <h2>
        {{ $dayjs(detail.createTime).format("YYYY-MM-DD") }}
      </h2>
    </div>
    <div class="content">
      <v-md-preview :text="detail.content"></v-md-preview>
    </div>
  </div>
</template>
<script>
import { onMounted, reactive, toRefs } from "vue";
import { useRoute } from "vue-router";
import { api } from "../api/index";
export default {
  name: "BlogDetail",
  components: {},
  setup() {
    const route = useRoute();
    const state = reactive({
      detail: {},
      options: {
        markdownIt: {
          linkify: true,
        },
        linkAttributes: {
          attrs: {
            target: "_blank",
            rel: "noopener",
          },
        },
      },
    });
    onMounted(() => {
      getDetail();
    });
    const getDetail = () => {
      const para = {
        id: route.query.id,
      };
      api.getBlogDetailById(para).then((res) => {
        res.content = res.content.replaceAll(
          ".png)",
          ".png?imageView2/2/w/500)"
        );
        state.detail = { ...res };
      });
    };
    return {
      ...toRefs(state),
      getDetail,
    };
  },
};
</script>
<style scoped lang="scss">
.detail {
  flex-direction: column;
  display: flex;
  align-items: center;
  .head {
    text-align: center;
  }
}
@media only screen and(min-width: 1px){
  .content {
    max-width: 100%;
    padding: 12px;
  }
}
@media only screen and(min-width: 1281px){
  .content {
    max-width: 80%;
  }
}
@media only screen and(min-width: 1900px){
  .content {
    max-width: 70%;
  }
}
</style>