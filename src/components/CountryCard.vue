<template>
  <div class="info-main">
    <img :src="country.flags.png" class="flag" />
    <h4>{{ country?.name }}</h4>
    <div class="info">
      <div>Population:</div>
      {{ country?.population }}
    </div>
    <div class="info">
      <div>Region:</div>
      {{ country?.region }}
    </div>
    <div class="info">
      <div>Capital:</div>
      {{ country?.capital }}
    </div>
  </div>
</template>

<script>
export default {
  props: ['country', 'numericCode'],
  setup() {}
}
</script>

<style>
.info-main {
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  width: 250px;
}

.flag {
  width: 250px;
}

.info {
  display: flex;
  font-size: 15px;
  line-height: 20px;
}
</style>
