export default ({ $axios }) => {
  $axios.onRequest(config => {
    console.log('onRequest:')
    console.log(config)
  })

  $axios.onResponse(config => {
    console.log('onResponse:')
    console.log(config)
  })

  $axios.onError(e => {
    console.log('onError:')
    console.log(e.response)
  })
}
