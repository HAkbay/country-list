<template>
  <div class="main-div">
    <header class="tab">
      <div class="tab-left" @click="goTo">
        <h1>Where in the world?</h1>
      </div>
    </header>
    <router-view></router-view>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const routeTo = useRouter()
function goTo() {
  routeTo.push('/')
}
</script>

<style>
.main-div {
  width: 100%;
  height: 739px;
}

.tab {
  width: 100%;
  height: 10%;
  display: flex;
  justify-content: space-between;
  text-align: center;
  line-height: 75px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 10px;
}

.tab-left {
  margin-left: 75px;
  cursor: pointer;
}

@media (max-width: 1024px) {
  .tab-left {
    margin: auto;
    cursor: pointer;
    font-size: 12px;
  }
}
</style>
