<template>
  <div>
    <p>{{ blockData }}</p>
  </div>
</template>

<script>
export default {
  name: 'block',
  props: ['searchField'],
  data () {
    return {
      msg: 'the network explorer is in the works...',
      blockData: 0
    }
  },

  beforeMount () {
    fetch(process.env.HOST_URL + '/api/tx/' + this.$route.params.id)
    .then((response) => { return response.json() })
    .then((blockData) => {
      this.blockData = blockData
    })
  }
}
</script>
