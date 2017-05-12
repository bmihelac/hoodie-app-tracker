/* global hoodie */
function showSignedIn (username) {
  document.querySelector('[data-value=username]').textContent = username
  document.body.setAttribute('data-account-state', 'signed-in')
}

function hideSignedIn () {
  document.body.setAttribute('data-account-state', 'signed-out')
}

hoodie.account.on('signin', function (account) {
  showSignedIn(account.username)
})

hoodie.account.on('signout', hideSignedIn)
hoodie.account.get(['session', 'username'], {local: true})
  .then(function (properties) {
    if (properties.session) {
      showSignedIn(properties.username)
    } else {
      hideSignedIn()
    }
  })


hoodie.account.hook.after('signout', function (options) {
  console.log('add item on signout hook')
  console.log('expected that it would be in cleared database')
  return(hoodie.store.add({amount: 1, note: 'on signout hook'}))
})
