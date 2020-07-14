console.log('Inside client side javascript file')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


const fetchForecast = (location) => {
    fetch(`/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                return messageOne.textContent = data.error
            }
            messageOne.textContent = `The forecast for ${data.place_name} is ${data.summary}.`
            messageTwo.textContent = `Currently the temperature is ${data.temperature} degrees, but it feels like ${data.feelsLike} degrees.`
        })
    })
}


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    messageOne.textContent = 'Loading....'
    messageTwo.textContent = ''
    fetchForecast(location)
})
