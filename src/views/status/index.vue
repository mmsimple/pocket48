<template>
  <div class="status">
    <div class="content" v-loading="loading">
      <div class="content-all">口袋房间在线总人数: {{ allPeople }}</div>
      <table>
        <thead  class="thead">
          <tr> 
            <th>排名</th>
            <th>姓名</th>
            <th>在线人数</th>
          </tr>
        </thead>
        <tbody class="tbody">
          <tr v-for="(item, index) in roomList" :key="item.roomId">
            <td>{{index + 1}}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.membersN }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { getStatus } from '@/api/index'
export default {
  data() {
    return {
      roomList: [],
      loading: true,
      allPeople: 0
    }
  },
  mounted() {
    this.test()
  },
  methods: {
    async test() {
      let { data, status } = await getStatus()
      if (status === 200) {
        data.rooms.sort((a, b) => b.membersN - a.membersN)
        this.roomList = data.rooms
        this.roomList.forEach(e => {
          this.allPeople += e.membersN
        })
        this.loading = false
      }
    },
  },
}
</script>

<style src="./style.css" scoped></style>
