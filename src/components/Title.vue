<template>
  <div class="title">
    <img :src="headImageUrl ? headImageUrl : '../assets/head.jpg'" alt="头像" />
    <h1 class="name">{{ name ? name : "Chen Hai" }}</h1>
    <h2 class="sub_title">{{ verse }}</h2>
  </div>
</template>
<script>
import { onMounted, onBeforeUnmount, reactive, ref, toRefs } from "vue";
import {api} from '../api/index'
export default {
  name: "Title",
  components: {
  },
  setup(props,context) {
    const state = reactive({
      headImageUrl: "",
      name: "",
      verse: "",
    });
    onMounted(() => {
      getInfo();
    });
    const setTitles = () => {
      const infor = sessionStorage.getItem("infor");
      let obj = JSON.parse(infor);
      state.headImageUrl = obj.headImageUrl;
      state.name = obj.name;
      state.verse = obj.verse;
      context.emit("setInfor");
    };
    const getInfo = () => {
      let infor = sessionStorage.getItem("infor");
      if (!infor) {
        api
          .getFrontInfo()
          .then((res) => {
            sessionStorage.setItem("infor", JSON.stringify(res));
            setTitles();
          })
          .catch((err) => {
            console.log("err", err);
          });
      } else {
        setTitles();
      }
    };
    return {
      ...toRefs(state),
      setTitles,
      getInfo,
    };
  },
};
</script>
<style scoped>
.title {
  display: flex;
  flex-direction: column;
  align-items: center;
  border-bottom: 1px solid #eee;
}

.title .sub_title {
  margin-top: -16px;
  color: #aaaabd;
}

.title .name {
  width: 100px;
  text-align: center;
}

.title img {
  width: 100px;
  height: 100px;
  border-radius: 100%;
}
</style>
