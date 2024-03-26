import { ref } from 'vue'
const getCountryList = () => {
    const countriesList = ref(null)
    const errorList = ref(null)
    const loadList = async () => {
        try {
            let data = await fetch('http://localhost:3000/country-list')
            if (!data.ok) {
                throw Error('No Data Available')
            }
            countriesList.value = await data.json()
        }
        catch (err) {
            errorList.value = err.message
            console.log(errorList)
        }
    }
    return { countriesList, errorList, loadList }
}
export default getCountryList