export default {
  data () {
    return {
      position: 'bottom-right'
    }
  },
  methods: {
    notify (type, message) {
      switch (type) {
        case 'success':
          this.$q.notify({
            message: message || 'Ação realizada com successo !',
            color: 'positive',
            position: this.position
          })
          break
        case 'error':
          this.$q.notify({
            message: message || 'Ação realizada com successo !',
            color: 'negative',
            position: this.position
          })
          break
        default:
          this.$q.notify({
            message: message || 'Realizando Ação... !',
            color: 'primary',
            position: this.position
          })
          break
      }
    }
  }
}
