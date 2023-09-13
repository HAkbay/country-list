import { ref } from 'vue'
const getCountry = (numericCode) => {
  const country = ref(null)
  const error = ref(null)
  const load = async () => {
    try {
      let data = await fetch('http://192.168.0.83:3000/country-list/' + numericCode)
      if (!data.ok) {
        throw Error('This Country Does Not Exist')
      }
      country.value = await data.json()
    }
    catch (err) {
      error.value = err.message
      console.log(error.value)
    }
  }
  return { country, error, load }
}
export default getCountry