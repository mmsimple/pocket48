<template>
  <div class="home">
    <div class="button">
      <el-button @click="toChat">聊天</el-button>
    </div>
    <div class="button">
      <el-button @click="toOnline">串门</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  methods: {
    toChat() {
      this.$router.push('/chat')
    },
    toOnline() {
      this.$router.push('/online')
    }
  }
}
</script>

<style src="./style.css"></style>
