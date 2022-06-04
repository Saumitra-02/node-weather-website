const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    //console.log(location)  

    messageTwo.textContent = ''
    messageOne.textContent = 'Loading...'

    fetch('/weather?search=' + location).then((res) => {
        
        res.json().then((data) => {
            if(data.error){
                return messageOne.textContent = data.error
                //return console.log(data.error)
            }
            if(data.errorMessage){
                return messageOne.textContent = data.errorMessage
                //return console.log(data.errorMessage)
            }
            // console.log(data.location)
            // console.log(data.forecast)
            messageOne.textContent = 'Location: ' + data.location
            messageTwo.textContent = 'Forecast: ' + data.forecast
        })
    })
})
