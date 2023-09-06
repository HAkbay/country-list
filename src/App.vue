<template>
  <div class="Mommy">
    <header class="tab">
      <div class="tabLeft"><h1>Where in the world?</h1></div>
      <div class="tabRight">
        <img src="/src/assets/moon-regular.png" class="logo" />
        <h3>Dark Mode</h3>
      </div>
    </header>
    <div class="container">
      <div class="lowerTop">
        <div>
          <!-- Search Bar -->
          <div class="input-with-icon">
            <i class="fas fa-search input-icon"></i>
            <input
              type="text"
              class="input-text"
              placeholder="Search for a country..."
              v-model="textInput"
              @input="searchCountry(textInput)"
            />
          </div>
        </div>
        <SelectBox @send-data="getDataFromChild" />
      </div>
      <div class="lowerBottom">
        <div class="table-container">
          <div v-for="country in computedArray" :key="country.alpha2Code" class="table-cell">
            <CountryCard :country="country" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { computed, onMounted, ref } from 'vue'
import CountryCard from '../src/components/CountryCard.vue'
import SelectBox from '../src/components/SelectBox.vue'

export default {
  components: { CountryCard, SelectBox },
  setup() {
    let countryList = ref([])
    const error = ref(null)
    const receivedData = ref('')
    let filteredCountryList = ref([])
    let oldFilteredCountryList = ref([])
    const textInput = ref('')

    const getCountryList = async () => {
      try {
        let data = await fetch('http://localhost:3000/country-list')
        if (!data.ok) {
          throw Error('No Data Available')
        }
        countryList.value = await data.json()
        filteredCountryList.value = countryList.value
        oldFilteredCountryList.value = filteredCountryList.value
      } catch (err) {
        error.value = err.message
        console.log(error)
      }
    }

    const getDataFromChild = (regionData) => {
      receivedData.value = regionData
      filteredCountryList.value = countryList.value.filter(
        (country) => country.region == regionData.value
      )
      oldFilteredCountryList.value = filteredCountryList.value
    }

    function searchCountry(textInput) {
      filteredCountryList.value = oldFilteredCountryList.value.filter((country) =>
        country.name.toLowerCase().includes(textInput.toLowerCase())
      )
    }

    onMounted(() => {
      getCountryList()
    })

    return { getDataFromChild, receivedData, filteredCountryList, searchCountry, textInput }
  },
  computed: {
    computedArray() {
      return this.filteredCountryList
    }
  }
}
</script>

<style>
.Mommy {
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
.tabLeft {
  margin-left: 75px;
}
.tabRight {
  width: 25%;
  display: flex;
  align-items: center;
}
.logo {
  width: 6%;
}
.container {
  background-color: #f2f2f2;
  padding: 20px;
  border: 1px solid #ddd;
  text-align: center;
}
.lowerTop {
  margin-bottom: 18px;
  margin-top: 1%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.input-with-icon {
  position: relative;
  display: inline-block;
}
.input-icon {
  position: absolute;
  left: 65px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
}
.input-text {
  width: 400px;
  padding: 20px 0px 20px 35px;
  margin-left: 50px;
  border: none;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 10px;
  border-radius: 10px;
}
.lowerBottom {
  width: 100%;
  height: 80%;
}
.table-container {
  display: grid;
  grid-template-columns: repeat(4, auto);
  gap: 8px;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.1);
}
.table-cell {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5em;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 5px;
  transition: background-color 0.3s ease;
}
.table-cell:hover {
  background-color: rgba(255, 255, 255, 0.4);
}
</style>
