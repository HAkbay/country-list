<template>
  <div class="info-main">
    <img :src="country.flag" class="flag" />
    <h4>{{ country?.name }}</h4>
    <div class="info">
      <div>Population:</div>
      <b>{{ country?.population }}</b>
    </div>
    <div class="info">
      <div>Region:</div>
      <b>{{ country?.region }}</b>
    </div>
    <div class="info" v-if="country.capital">
      <div>Capital:</div>
      <b>{{ country?.capital }}</b>
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
  width: 250px;
}

.flag {
  width: 250px;
}

.info {
  display: flex;
  font-size: 15px;
  line-height: 20px;
  justify-content: center;
}
</style>
