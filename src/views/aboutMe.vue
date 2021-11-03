<template>
  <div class="body">
    <Title @setInfor="setInfor"></Title>
    <div v-for="item in itemList" :key="item.title" class="item">
      <i
        :class="item.icon"
        :style="{ color: item.color, 'border-color': item.color }"
      />
      <div>
        <h3>{{ item.title }}</h3>
        <p v-html="item.content"></p>
      </div>
    </div>
  </div>
</template>
<script>
import { onMounted, onBeforeUnmount, reactive, toRefs } from "vue";
import Title from "comps/Title.vue";
export default {
  name: "home",
  components: {
    Title,
  },
  setup() {
    const state = reactive({
      itemList: [],
    });
    const setInfor = () => {
      const infor = sessionStorage.getItem("infor");
      let obj = JSON.parse(infor);
      state.itemList = obj.items;
    };
    return {
      ...toRefs(state),
      setInfor,
    };
  },
};
</script>
<style scoped lang="scss">
.body {
  display: flex;
  flex-direction: column;
  align-items: center;
  .item {
    display: flex;
    width: 100%;
    max-width: 480px;
    margin-bottom: 32px;
    i {
      font-size: 42px;
      border: 1px solid;
      height: 42px;
      border-radius: 100%;
      padding: 12px;
      margin-top: 32px;
    }
    div {
      padding-left: 24px;
    }
  }
}
</style>
