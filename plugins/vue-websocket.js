import Vue from 'vue'
import VueWebsocket from 'vue-websocket'

Vue.use(VueWebsocket, '/', {'path': '/socket/socket.io'})
