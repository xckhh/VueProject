<template>
<div>
  <div class="box">
    <div class="circle" style="--x:0"></div>
    <div class="circle" style="--x:1"></div>
    <div class="circle" style="--x:2"></div>
    <div class="circle" style="--x:3"></div>
    <div class="circle" style="--x:4"></div>
  </div>
</div>
</template>

<script>
export default {
  name: "MyCircle",
  data() {
    return {
    }
  },
  created() {
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
.box {
  position: relative;
}

.box .circle {
  position: absolute;
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0 25px 45px rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  animation: move 10s linear infinite;
  position: fixed;
}



.box .circle:nth-child(1) {
  top: 300px;
  right: 10px;
  width: 100px;
  height: 100px;
}

.box .circle:nth-child(2) {
  top: 300px;
  left: 5px;
  width: 120px;
  height: 120px;
  z-index: 2;
}

.box .circle:nth-child(3) {
  top: 100px;
  right: 10px;
  width: 80px;
  height: 80px;
  z-index: 2;
}

.box .circle:nth-child(4) {
  top: 100px;
  left: 45px;
  width: 60px;
  height: 60px;
}

.box .circle:nth-child(5) {
  top: 170px;
  left: 65px;
  width: 60px;
  height: 60px;
}
@keyframes move {
  0%,
  100% {
    transform: translateY(-50px);
  }

  50% {
    transform: translateY(50px);
  }
}
</style>