<template>
  <div class="chat">
    <div class="title">
      <el-select
        v-model="roomName"
        filterable
        clearable
        remote
        reserve-keyword
        placeholder="搜索偶像"
        :remote-method="remoteMethod"
        :loading="loading"
      >
        <el-option
          v-for="item in searchArr"
          :key="item.roomId"
          :label="item.name"
          :value="item.name"
        >
        </el-option>
      </el-select>
      <el-button class="title-btn" round @click="searchByName">搜索</el-button>
    </div>

    <div v-if="stage === 'ONLINE'" class="container">
      <div class="room-head">
        {{ showName }}
      </div>
      <div class="room-box" ref="scroll-box" @scroll="scrollGet($event)">
        <div
          v-for="msg in filterMsgs"
          :key="msg.idClient"
          @click="inspect(msg)"
          class="msg-item"
        >
          <img class="avatar" :src="base + msg.custom.user?.avatar" alt="" />
          <div class="msg-item-content">
            <span class="nickName">
              {{ msg.custom.user?.nickName }}
            </span>
            <span class="time">
              {{ time(msg.time) }}
            </span>
            <div v-if="msg.type === 'text'" class="content">
              {{ msg.custom.text }}
            </div>
            <div v-else-if="msg.type === 'image'" class="content">
              <img class="content-img" :src="msg.file.url" @onload="!flag ? toEnd: ''"/>
            </div>
            <div v-else class="content"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { parseTime } from "@/utils/index.js"
export default {
  name: "Home",
  created() {
    // console.log(this.Nim);
  },
  watch: {
    roomName() {
      const len = this.roomName.length
      this.roomArr = this.dataPeople.filter(people => {
        return this.roomName !== '' && (people.name.includes(this.roomName) || people.abbr.slice(0, len) === this.roomName)
      })
    },
  },
  computed: {
    filterMsgs() {
      const a = this.msgs.filter((msg) => {
        return (
          msg.custom.messageType !== "DELETE" && msg.custom.user?.roleId === 3
        )
      })
      return a
    },
    time() {
      return function (time) {
        return parseTime(time)
      }
    },
  },
  data() {
    return {
      base: "https://source.48.cn/",
      chatroom: null,
      stage: "OFFLINE",
      msgs: [],
      roomName: "",
      roomArr: [],
      searchArr: [],
      loading: false,
      dataPeople: this.$store.state.dataPeople,
      showName: ''
    }
  },
  methods: {
    init(id) {
      const appKey = "632feff1f4c838541ab75195d1ceb3fa"
      const chatroomAddresses = ["chatweblink01.netease.im:443"]
      const onwillreconnect = (...args) => {
        console.log("e", args)
      }
      const onerror = (...args) => {
        console.log("r", args)
      }

      this.chatroom = this.Nim.Chatroom.getInstance({
        appKey,
        isAnonymous: true,
        chatroomNick: "WebAgent",
        // account: account,
        // token: account,
        chatroomId: id,
        chatroomAddresses,
        onconnect: this.onconnect.bind(this),
        onwillreconnect,
        ondisconnect: () => {
          this.stage = "OFFLINE"
        },
        onerror,
        onmsgs: this.onmsgs.bind(this),
      })
    },
    // 与sdk连接上
    async onconnect() {
      this.stage = "ONLINE"
      await this.oneDayMsg()
      setTimeout(() => {
        this.toEnd()
      }, 3000)
    },
    // 获取实时消息
    onmsgs(msgs) {
      this.msgs = [
        ...this.msgs,
        ...msgs
          .filter((msg) => !msg.resend)
          .map((msg) => ({ ...msg, custom: JSON.parse(msg.custom) })),
      ]
    },
    // 获取一天的消息
    async oneDayMsg() {
      let timetag = this.msgs[0] ? new Date(this.msgs[0].time) : new Date()
      let flag = true
      let count = 0
      while(flag) {
        await this.earlier()
        if(this.msgs.length === 0) {
          alert('该房间没有消息')
          break
        }
        if(new Date() - timetag >= 5000) {
          break
        }
        console.log(new Date() - timetag)
        count++
        if(count >= 5) {
          break
        }
      }
      console.log(this.msgs)
    },

    // 获取早期消息
    earlier() {
      return new Promise ((resolve) => {
        this.chatroom.getHistoryMsgs({
          timetag: this.msgs[0]?.time,
          done: (err, obj) => {
            if (err) {
              console.log(err)
              return
            }
            const msgs = [...obj.msgs]
            msgs.reverse()
            this.msgs = [
              ...msgs
                .filter((msg) => !msg.resend)
                .map((msg) => ({ ...msg, custom: JSON.parse(msg.custom) })),
              ...this.msgs,
            ]
            resolve()
          },
        })
      })
    },
    //点击打印
    inspect(msg) {
      console.log(JSON.parse(JSON.stringify(msg)))
    },
    // 通过名字查询
    searchByName() {
      const id = this.roomArr[0]?.roomId
      this.showName = this.roomArr[0]?.name
      this.msgs = []
      this.roomArr = []
      this.roomName = ''
      this.searchArr = []
      this.chatroom?.disconnect()
      this.chatroom = null
      this.init(id)
    },

    // 搜索查找
    remoteMethod(serchName) {
      if (serchName !== "") {
        this.loading = true
        const len = serchName.length
        setTimeout(() => {
          this.loading = false
          this.searchArr = this.dataPeople.filter((people) => {
            return (
              serchName !== "" &&
              (people.name.includes(serchName) ||
                people.abbr.slice(0, len) === serchName)
            )
          })
        }, 200)
      } else {
        this.searchArr = []
      }
    },

    // 加赞最新，滚动条滚到最后
    toEnd() {
      this.$nextTick(() => {
        let box= this.$refs["scroll-box"]
        box.scrollTop = box.scrollHeight
      })
    },
    // 监听滚动事件
    async scrollGet(e) {
      // console.log(e)
      if(e.target.scrollTop === 0) {
        await this.earlier()
      }
    },
  },
}
</script>

<style src="./style.css"></style>
