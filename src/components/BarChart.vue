<template>
  <div class="barchart">
    <p>Tasks Vs List</p>
    <Bar id="my-chart-id" :data="chartData" />
    <p>PendingTasks Vs DeadLine</p>
    <Line :data="LineData" />
    <p>Completed Vs Pending</p>
    <Pie id="my-chart-pie" :data="PieData" />
  </div>
</template>


<script>
import { Bar } from 'vue-chartjs'
import { Pie } from 'vue-chartjs';
import { Line } from 'vue-chartjs';
import {
  Chart as ChartJS, Title, Tooltip, ArcElement, PointElement,
  LineElement, Legend, BarElement, CategoryScale, LinearScale
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement, PointElement,
  LineElement, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChart',
  components: { Bar, Pie, Line },
  data() {
    return {
      data: JSON.parse(localStorage.getItem("user_data", JSON.stringify(this.user_data)))
    }
  },
  computed: {
    chartData() {
      let label = Object.keys(this.data)
      let values = Object.values(this.data).map(item => item.length)
      let completed_values = Object.values(this.data)

      completed_values = completed_values.map(item => {
        let completed = 0
        item.map(subitem => {
            if (subitem.status === "completed") {
              completed += 1
            }
          }
        )
        return completed
      })

      let pending_values = Object.values(this.data)

      pending_values = pending_values.map(item => {
        let completed = 0
        item.map(subitem => {
            if (subitem.status !== "completed") {
              completed += 1
            }
          }
        )
        return completed
      })

      return {
        labels: label,
        datasets: [{ label: 'No.of Tasks', backgroundColor: '#f87979', data: values },
        { label: 'Completed', backgroundColor: '#41B883', data: completed_values },
        { label: 'Pending', backgroundColor: '#E46651', data: pending_values }]
      }
    },
    PieData() {
      let completed = 0
      let pending = 0
      let label = ["completed", "pending"]
      let values = ([].concat(...(Object.values(this.data)))).map(inneritem => {
        if (inneritem.status === "completed") {
          completed += 1
        }
        else {
          pending += 1
        }
      })
      values = [completed, pending]
      return {
        labels: label,
        datasets: [{ backgroundColor: ['#41B883', '#E46651'], data: values }]
      }
    },
    LineData() {
      let list = {}
      let values = ([].concat(...(Object.values(this.data)))).map(inneritem => {
        if (inneritem.status !== "completed") {
          if (Object.keys(list).includes(inneritem['due-date'])) {
            list[inneritem['due-date']] += 1
          }
          else { list[inneritem['due-date']] = 1 }
        }
      })
      values = Object.values(list)
      console.log(values, Object.keys(list))
      return {
        labels: Object.keys(list),
        datasets: [{ label: 'No.of Tasks', backgroundColor: ['#41B883', '#E46651'], data: values }]
      }
    }
  }
}
</script>
<style scoped>
.barchart {
  width: 40%;
  margin-left: 30%;
  margin-right: 30%;
  align-self: center;
  margin-top: 2%;
  margin-bottom: 2%;
  text-align: center;
}

.barchart p {
  margin-top: 5%;
  width: 40%;
}

.piechart {
  width: 30%;
}
#my-chart-pie{
  width: 20%;
  margin-left: 15%;
  margin-right: 15%;
  align-self: center;
  margin-top: 2%;
  margin-bottom: 2%;
  text-align: center;
}
</style>