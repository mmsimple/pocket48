<template>
  <div class="online">
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

    <div v-if="roomList.length" class="container">
      <div class="room-head">
        {{ showName }}
      </div>
      <div class="room-box">
        <div v-for="item in filterRoomList" :key="item._id" class="box-item">
          {{getMessage(item)}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { parseTime } from "@/utils/index.js"
export default {
  data() {
    return {
      base: "https://raw.xox48.com:8048/api/visits",
      chatroom: null,
      roomName: "",
      roomArr: [],
      searchArr: [],
      loading: false,
      dataPeople: this.$store.state.dataPeople,
      showName: '',
      roomList: [],
    }
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
    filterRoomList() {
      return this.roomList.filter(e => e.fields.guest[0] !== '车仔面' && e.fields.guest[0] !== 'Rats')
    },
    getMessage() {
      return function (item) {
        const time = parseTime(new Date(item.fields['@timestamp'][0]))
        return `${time} ${item.fields.guest[0]} ${item.fields.action[0]} ${item.fields.chatroomOwner[0]} 的房间`
      }
    }

  },

  methods: {
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

    // 通过名字查询
    searchByName() {
      this.showName = this.roomArr[0]?.name
      this.$axios.get(`${this.base}?chatroomOwner=${this.showName}`).then(res => {
        this.roomList = res.data.hits
      })
    },
  },
}
</script>

<style src="./style.css"></style>
