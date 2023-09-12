<template>
    <div class="container">
        <div class="lower-top">
            <div class="search-wrapper">
                <!-- Search Bar -->
                <div class="input-with-icon">
                    <i class="fas fa-search input-icon"></i>
                    <input type="text" class="input-text" placeholder="Search for a country..." v-model="textInput"
                        @input="searchCountry(textInput)" />
                </div>
            </div>
            <div class="w-a">
                <SelectBox @send-data="getDataFromChild" />
            </div>
        </div>
        <div class="table-container">
            <div v-for="country in filteredCountryList" class="table-cell">
                <CountryCard :country="country" @click="goTo(country)" />
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'
import CountryCard from '../components/CountryCard.vue'
import SelectBox from '../components/SelectBox.vue'
import { useRouter } from 'vue-router'

export default {
    components: { CountryCard, SelectBox },
    setup() {
        let countryList = ref([])
        const error = ref(null)
        const receivedData = ref('')
        let filteredCountryList = ref([])
        let oldFilteredCountryList = ref([])
        const textInput = ref('')
        const routeTo = useRouter()

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

        function goTo(country) {
            routeTo.push({ path: '/details/' + country.numericCode, state: { numericCode: country.numericCode } })
        }

        getCountryList()

        return { getDataFromChild, receivedData, filteredCountryList, searchCountry, textInput, goTo }
    },
    computed: {
        computedArray() {
            return this.filteredCountryList
        }
    },

}
</script>

<style>
.container {
    background-color: #f2f2f2;
    padding: 20px;
    border: 1px solid #ddd;
    text-align: center;
}

.lower-top {
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

.w-a {
    width: auto;
    margin-right: 55px;
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

@media (max-width: 1024px) {
    .table-container {
        grid-template-columns: repeat(3, auto);
    }

    .lower-top {
        width: auto;
        justify-content: space-between;
        flex-wrap: wrap;
        padding: 16px;
    }

    .w-a {
        padding-top: 16px;
    }

    .input-with-icon {
        flex-direction: column;
        display: flex;
    }

    .input-text {
        width: 350px;
        margin-left: 20px;
    }

    .input-icon {
        left: 32px;
    }
}

@media (max-width: 768px) {
    .table-container {
        grid-template-columns: repeat(2, auto);
    }
}

@media (max-width: 425px) {
    .table-container {
        grid-template-columns: repeat(1, auto);
    }

    .lower-top {
        justify-content: center;
    }

}

@media (max-width: 320px) {
    .lower-top {
        width: auto;
        justify-content: center;
        flex-wrap: wrap;
        padding: 4px;
    }

    .input-text {
        width: 300px;
        margin-left: 4px;
    }

    .input-icon {
        left: 16px;
    }
}
</style>