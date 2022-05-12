import Vue from 'vue'
import Vuex from 'vuex'
import user from "@/store/modules/user";
import axios from "axios";
Vue.use(Vuex)

export default new Vuex.Store({
  state: {

  },
  mutations: {

  },
  actions: {
    // 通过id获取用户信息
    async getUserById(context,id){
      const { data: res } = await axios.get(`/user/getUserById/${id}`)
      return res
    },
    // 通过id获取条件信息
    async getPersonalData(context,id){
      const { data: res } = await axios.get(`/condition/getPersonal/${id}`)
      return  res
    },
    // 通过id获取相册信息
    async getAlbum(context,id) {
      const { data: res } = await axios.get(`/album/getAlbumList/${id}`)
      return res
    },
    // 通过相册id获取图片信息
    async getPhotoList(context,album_id) {
      const { data: res } = await axios.get(`/photo/getPhotoList/${album_id}`)
      return  res
    },
    // 获取用户集合
    async getUserList(context){
      const { data: res } = await axios.get('/user/getUserList')
      return res
    }
  },
  modules: {
    user
  }
})
