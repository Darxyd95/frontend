
<template>
  <v-app top-toolbar footer class="app">
    <v-toolbar class="grey darken-3">
      <v-toolbar-items class="hidden-sm-and-down" v-for="item in items" :key="item.title">
        <v-toolbar-item :href="item.href" router>{{item.title}}</v-toolbar-item>
      </v-toolbar-items>
      <v-toolbar-items>
        <v-toolbar-item class="hidden-sm-and-down" href="https://blog.ethereum.network/latest">Blog</v-toolbar-item>
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <v-toolbar-side-icon class="hidden-md-and-up" @click.native.stop="sidebar = !sidebar" />
    </v-toolbar>
    <main>
      <v-sidebar drawer v-model="sidebar">
        <v-list>
          <v-list-item v-for="item in items" :key="item.title">
            <v-list-tile :href="item.href" router>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile>
          </v-list-item>
          <v-list-item>
            <v-list-tile href="https://blog.ethereum.network/latest">
              <v-list-tile-title>Blog</v-list-tile-title>
            </v-list-tile>
          </v-list-item>
        </v-list>
      </v-sidebar>
      <v-content>
        <v-container fluid class="px-2">
          <nuxt/>
        </v-container>
      </v-content>
    </main>
    <v-footer class="grey darken-4">
      <div class="text-xs-right">
        <a href="https://www.linkedin.com/company/ethereum-network" target="_blank">LinkedIn</a> | <a href="https://twitter.com/EthereumNetw" target="_blank">Twitter</a> | <a href="https://github.com/EthereumNetwork/guide-website" target="_blank">Github</a> | <a href="https://www.facebook.com/EthereumNetwork/" target="_blank">Facebook</a>
     </div>
    </v-footer>
  </v-app>
</template>

<script>
  // import 'wenk'
  export default {
    name: 'app',
    data () {
      return {
        sidebar: false,
        items: [
          {title: 'Home', href: '/'},
          {title: 'Learn', href: '/learn'},
          {title: 'Projects', href: '/projects'},
          {title: 'Explorer', href: '/explorer'},
          {title: 'About', href: '/about'}
        ]
      }
    },
    mounted () {
      fetch(process.env.HOST_URL + '/api/projects')
      .then((response) => { return response.json() })
      .then((data) => {
        this.$store.commit('setProjectList', { projectList: data })
      })

      fetch('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=BTC,USD,EUR')
      .then((response) => { return response.json() })
      .then((price) => { this.$store.commit('setPrice', { price: price }) })

      this.$store.commit('setToken', { token: this.$cookie.get('token') })
    }
  }
</script>

<style>
  h1 {
    font-size: 1.8em;
  }
  h2 {
    font-size: 1.6em;
  }
  .searchfield {
    float:right;
    padding-right: 1%;
    color: white;
    width: 20em;
    height: 4.5em;
  }
  .app  {
    font-family: Arial, Helvetica, sans-serif;
  }
  .menu {
    color: grey;
    font-size: 1em;
  }
</style>
