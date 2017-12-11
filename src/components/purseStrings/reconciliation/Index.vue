<template>
  <div class="container">



    <ky-header class="headerTop color-main_bg"></ky-header>
    <ky-header
      title="对账"
      class="headerTitle color-white color-main_bg"
    >
      <router-link to="/purseStrings" slot="left">
        <mt-button icon="plus">返回</mt-button>
      </router-link>
    </ky-header>

    <canvas id="myChart" height="150" style="width: 100%;"></canvas>


  </div>
</template>

<script>
  import kyHeader from '@/common/header/Header.vue'
  import Chart from 'chart.js'

  export default {
    data() {
      return {

      }
    },
    components: {
      kyHeader
    },
    mounted(){
      var ctx = document.getElementById("myChart").getContext('2d');
      var myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ["10.20", "10.21", "10.22", "10.23", "10.24", "10.25"],
          datasets: [{
            fill: true,
            spanGaps: true,
            data: [120, 100, 300, 105, 102, 130],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1,
            borderJoinStyle: ''
          }]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero:true,
              }
            }]
          }
        }
      });
    }
  }
</script>
