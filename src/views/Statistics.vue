<template>
  <div class="about">
    <h1>This is the statistics page</h1>
    <div class="chart-wrapper">
      <chart :options="chartOptionsLine"></chart>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Statistics',
  data () {
    return {
      chartOptionsLine: {
        xAxis: {
          name: 'field value'
        },
        yAxis: {
          name: 'time in s',
          interval: 2
        },
        series: [],
        title: {
          text: 'Fields statistics',
          x: 'center',
          textStyle: {
            fontSize: 24
          }
        }
      }
    }
  },
  created () {
    const dataValuesFields = []
    Object.values(this.$route.params.appGetData).forEach((field, index) => {
      let time = 0
      const dataValuesField = []
      field.forEach(element => {
        const coordinates = [element, time]
        dataValuesField.push(coordinates)
        time += 2
      })
      dataValuesFields.push(dataValuesField)
      const seriesObj = {
        data: dataValuesField,
        type: 'line',
        color: '#' + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6)
      }
      this.chartOptionsLine.series.push(seriesObj)
    })
    console.log(dataValuesFields)
  }
}
</script>

<style lang="scss" scoped>
.chart-wrapper {
  width: 100%;
  height: 500px;
}
.echarts {
  width: 100%;
  height: 100%;
}
</style>
