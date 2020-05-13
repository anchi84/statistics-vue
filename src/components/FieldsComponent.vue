<template>
  <div class="fields">
    <h1>{{ msg }}</h1>
    <div class="field" v-for="field in fields" :key="field.name">
      <label for="">{{field.name}}: </label>
      <input type="text" :value="field.value" disabled />
      <span v-html="field.arrow"></span>
      <input type="button" :value="field.inProgress? 'Disable' : 'Enable'" @click="toggleChange(field)"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FieldsComponent',
  props: {
    msg: String,
    homeRoute: Boolean
  },
  data () {
    return {
      fields: [],
      statistics: {},
      letChangeFieldsValue: true
    }
  },
  methods: {
    changeFieldsValue () {
      this.fields.forEach(field => {
        this.setFieldInterval(field)
      })
    },
    setFieldInterval (field) {
      field.interval = setInterval(() => {
        if (field.inProgress) {
          const signOfNumber = Math.random() < 0.5 ? '-1' : '1'
          field.arrow = signOfNumber === '1' ? '&#8593;' : '&#8595;'
          const randomNumber = signOfNumber * (Math.random() + 1)
          field.value = (Number(field.value) + randomNumber).toFixed(2)
        }
        this.statistics[field.name].push(field.value)
      }, 2000)
      this.$emit('update:appGetData', this.statistics)
    },
    toggleChange (field) {
      field.inProgress = !field.inProgress
      this.checkIfShouldLetChangeFieldsValue()
    },
    checkIfShouldLetChangeFieldsValue () {
      let letChangeFieldsValue = false
      this.fields.forEach(field => {
        if (field.inProgress) {
          letChangeFieldsValue = true
        }
      })
      this.letChangeFieldsValue = letChangeFieldsValue
    },
    pauseChangeFieldsValue () {
      this.fields.forEach(field => {
        clearInterval(field.interval)
      })
    }
  },
  watch: {
    homeRoute () {
      if (this.homeRoute) {
        if (this.letChangeFieldsValue) {
          this.changeFieldsValue()
        }
      } else {
        this.pauseChangeFieldsValue()
      }
    },
    letChangeFieldsValue () {
      if (this.letChangeFieldsValue) {
        this.changeFieldsValue()
      } else {
        this.pauseChangeFieldsValue()
      }
    }
  },
  created () {
    for (let i = 0; i < 10; i++) {
      const field = {}
      field.name = String.fromCharCode(65 + i)
      field.value = '3'
      field.inProgress = true
      field.arrow = ''
      this.fields.push(field)
      this.statistics[field.name] = [field.value]
    }
  },
  mounted () {
    this.changeFieldsValue()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.field {
  margin: 15px;
  label {
    font: bold 16px monospace;
  }
  input {
    width: 80px;
    margin: 0 10px;
    text-align: center;
  }
}
</style>
