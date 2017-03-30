<template>
  <div>
    <h2>{{this.$route.params.id}}</h2>
    <div class="qrcode" id="qr-"></div>
    <p>I'm still building up an address-transaction database inlcluding the pending transactions. Until then, old transactions are coming from <a href="https://etherscan.io/">Etherscan</a> (They are awesome) and new transactions to or from this address only show up here once they are confirmed (~30 sec after sending them)</p>
    <p>ETH balance: {{balance/1e18}} Ether (${{Math.round(balance/1e16*price.USD)/100}})</p>
    <table>
      <thead>
        <tr>
          <th v-for="header in headers" v-text="header"></th>
        </tr>
      </thead>
      <tbody>
        <template v-for="tx in transactionList">
          <tr>
            <td><nuxt-link :to="'/address/' + tx.from">{{tx.from.slice(0,10)}}...</nuxt-link></td>
            <td><nuxt-link :to="'/address/' + tx.to">{{tx.to.slice(0,10)}}...</nuxt-link></td>
            <td><nuxt-link :to="'/tx/' + tx.hash">{{Math.round(tx.value/1e10)/1e8}} Ether</nuxt-link> (${{Math.round(tx.value/1e16*price.USD)/100}})</td>
          </tr>
        </template>
      </tbody>
    </table>
    <div class="comments">
      <VueDisqus shortname="ethereumnetwork" :identifier="$route.path" :url="'https://ethereum.network' + $route.path"></VueDisqus>
    </div>
  </div>
</template>

<script>
import VueDisqus from '~components/VueDisqus.vue'
import socket from '~plugins/socket.io.js'

export default {
  validate ({ params }) {
    return (params.id.length === 42 && params.id.slice(0, 2) === '0x')
  },
  props: ['searchField'],
  data () {
    return {
      msg: 'the network explorer is in the works...',
      balance: -0,
      headers: ['from', 'to', 'value'],
      transactionList: [],
      qrcode: {}
    }
  },
  beforeMount () {
    fetch(process.env.HOST_URL + '/api/balance/' + this.$route.params.id)
    .then((response) => { return response.json() })
    .then((balance) => {
      this.balance = balance
    })
    fetch('https://api.etherscan.io/api?module=account&action=txlist&sort=desc&address=' + this.$route.params.id)
    .then((response) => { return response.json() })
    .then((transactionList) => {
      this.transactionList = transactionList.result
    })
  },
  mounted () {
    socket.on(this.$route.params.id, (transactions) => {
      this.transactionList.unshift(transactions)
    })
    const QRCode = require('qrcode-js-package/qrcode.js')
    this.qrcode = new QRCode(document.getElementById('qr-'), {
        text: this.$route.params.id,
        width: 128,
        height: 128,
        colorDark : "#000000",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H
    });
  },
  components: {
    VueDisqus
  },
  computed: {
    price: function () {
      return this.$store.state.price
    }
  }
}
</script>

<style>
  .qrcode {
    float:right;
    padding: 1%;
    color: white;
  }
</style>
