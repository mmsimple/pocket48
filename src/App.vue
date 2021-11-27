<template>
  <router-view />
</template>

<script>
export default {
  name: "App",
  mounted() {
    /**
     * 解决 css 引入图片在 github pages 无法获取的问题
     */
    const { NODE_ENV } = process.env
    document.documentElement.className = NODE_ENV
  },
}
</script>
<style>
body {
  margin: 0;
  font-size: 14px;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", 微软雅黑, Arial, sans-serif;
  height: 100vh;
  overflow: hidden;
}

html {
  margin: 0;
}
</style>
