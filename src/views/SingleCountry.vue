<template>
  <div class="header-div">
    <div v-if="error">{{ error }}</div>
    <div v-if="country" class="country-div">
      <div class="wrapping">
        <div class="flag-country">
          <img :src="country.flags.png" class="flag-img">
        </div>
        <div class="text-details">
          <h2>Country name: {{ country.name }}</h2>
          <h3>Region: {{ country.region }}</h3>
          <h3>Population: {{ country.population }}</h3>
          <h3>Capital: {{ country.capital }}</h3>
          <h3>Time Zone(s): {{ country.timezones }}</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import getCountry from '../js/GetData.js'
import { useRoute } from 'vue-router'

export default {
  props: ['numericCode'],
  setup(props) {
    const routeUse = useRoute()
    console.log(routeUse.params.numericCode)
    const { country, error, load } = getCountry(routeUse.params.numericCode)
    load()
    return { country, error }
  }
}
</script>

<style>
.country-div {
  padding: 10%;
  display: flex;
  justify-content: center;
  margin: auto;
}

.flag-country {
  width: auto;
}

.text-details {
  margin: 28px;
  line-height: 28px;
}

.wrapping {
  padding: 60px;
  display: flex;
  background-color: #eee;
  box-shadow: rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset;
  border-radius: 24px;
}

@media (max-width: 1024px) {
  .country-div {
    padding: 16% 10% 10% 10%;
  }
}

@media (max-width: 768px) {
  .text-details {
    font-size: 14px;
  }
  .wrapping{
    flex-direction: column;
    align-items: center
  }
}
@media (max-width: 425px) {
  .country-div {
    padding: 16% 1% 1% 1%;
  }
  .wrapping{
    padding: 24px;
  }
}
@media (max-width: 375px) {
  .wrapping{
    padding: 20px;
  }
}
@media (max-width: 320px) {
  .wrapping{
    padding: 8px;
  }
  .flag-img{
    border-radius: 8px;
    width: 300px;
  }
  .text-details {
    font-size: 13px;
  }
}
</style>