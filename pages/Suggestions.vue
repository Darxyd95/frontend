<template>
  <table>
    <thead>
      <tr>
        <th></th>
        <th v-for="header in headers" v-text="header"></th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <template v-for="(suggestion, index) in suggestionArray">
        <tr @click="editProject(index)">
          <td></td>
          <td>{{suggestion.title}}</td>
          <td>{{suggestion.updatedAt}}</td>
        </tr>
      </template>
    </tbody>
  </table>
</template>

<script>
  export default {
    name: 'suggestions',
    props: ['searchField', 'query'],
    data () {
      return {
        headers: ['title', 'updated'],
        suggestionArray: []
      }
    },
    mounted () {
      fetch(process.env.HOST_URL + '/api/suggestions')
      .then((response) => { return response.json() })
      .then((data) => {
        this.suggestionArray = data
      })
    },
    methods: {
      editProject: function (index) {
        this.$store.commit('setProjectToEdit', { projectToEdit: this.suggestionArray[index] })
        this.$router.push('/form')
      }
    }
  }
</script>

<style>
</style>
