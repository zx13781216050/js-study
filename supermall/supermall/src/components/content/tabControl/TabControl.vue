<template>
  <div class="tab-contorl">
    <div v-for="(item, index) in titles" :key="index">
      <span>{{ item }}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "TabContorl",
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>
<style scoped>
.tab-contorl {
  display: flex;
  text-align: center;
}
.tab-contorl-item {
  flex: 1;
  height: 40px;
  line-height: 40;
}
</style>
