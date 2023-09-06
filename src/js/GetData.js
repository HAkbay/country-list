import {ref} from 'vue'
const getCountryList = () =>{
    const countryList = ref([])
    const error = ref(null)
    const load = async() => {
      try{
        let data = await fetch('http://localhost:3000/country-list')
        if(!data.ok){
          throw Error('No Data Available')
        }
        countryList.value = await data.json()
      }
      catch(err){
        error.value = err.message
        console.log(error.value)
      }
    }
  return { countryList, error, load }
}
export default getCountryList