<template>
  <select v-model="selectedRegion" class="select" @change="sendData">
    <option selected hidden disabled value="">Select by Region</option>
    <option>Africa</option>
    <option>Americas</option>
    <option>Asia</option>
    <option>Europe</option>
    <option>Oceania</option>
  </select>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['send-data'])
let selectedRegion = ref('')
const sendData = () => {
  emit('send-data', selectedRegion)
}
</script>


<style>
.select {
  width: 15%;
  height: 30%;
  margin-right: 55px;
  border: none;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 10px;
  border-radius: 10px;
  padding: 10px 25px 10px 20px;
}
</style>