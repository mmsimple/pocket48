<template>
  <div class="home">
    <div class="title">公告</div>
    <div class="content">
      <div>
        &emsp;&emsp;做这个产品的初衷是希望能记录xox一些东西，数据不一定完全准确。已经第二次看到有人拿着截图去质问xox，去带节奏。我们出钱出力的产品不是为了让大家去搞xox的。
      </div>
    </div>
    <div class="content">如果再有下次，我们会下架自己玩。</div>

    
    <div class="content">&emsp;&emsp;某些yxh拿着我们产品带节奏换取流量是不是要给我们分红一些。其他人想打赏也可以，感谢大家给我们服务器添砖加瓦！</div>
    <img class="img" src="@/img/sf.png" alt="">
    <div class="button">
      <el-button @click="toChat">聊天</el-button>
    </div>
    <div class="button">
      <el-button @click="toOnline">串门</el-button>
    </div>
    <div class="button">
      <el-button @click="toStatus">实时人数</el-button>
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
    },
    toStatus() {
      this.$router.push('/status')
    }
  }
}
</script>

<style src="./style.css" scoped></style>
