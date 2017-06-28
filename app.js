const app = {
  init(selectors) {
    this.flicks = []
    this.max = 0
    defaultBackgroundColor = 'white'
    likedBackgroundColor = 'grey'
    this.list = document.querySelector(selectors.listSelector)
    document
      .querySelector(selectors.formSelector)
      //Passing the function itselft, we dont want it to just run, so no ()
      .addEventListener('submit', this.handleSubmit.bind(this))
  },

  renderRemoveButton(text) {
    const button = document.createElement('button')
    button.textContent = (text)
    button.className += 'button removeButton'

    //Add an event listener for this button
    button.addEventListener('click', function(ev) {
      const parent = ev.target.parentElement      
      parent.parentNode.removeChild(parent)

      //Remove the flick from the array of flicks
      app.flicks.splice((parent.id), 1)
    })

    return button
  },

  //Part 2 of Homework
  renderLikeButton(text) {
    const button = document.createElement('button')
    button.textContent = (text) 
    button.className += 'button likeButton'

    //Add an event listener for this button
    button.addEventListener('click', function(ev) {
      const parentElement = ev.target.parentElement

      //Change background color and button text
      if (app.flicks[parentElement.id].favorited) {
        parentElement.style.backgroundColor = defaultBackgroundColor
        app.flicks[parentElement.id].favorited = false;

        //Change the button text
        for (let i = 0; i < parentElement.childNodes.length; i++){
          if ((parentElement.childNodes[i].className === 'likeButton')) {
            parentElement.childNodes[i].textContent = 'Like'
          }
        }

      } else {
        parentElement.style.backgroundColor = likedBackgroundColor
        app.flicks[parentElement.id].favorited = true;

        //Change the button text
        for (let i = 0; i < parentElement.childNodes.length; i++){
          if ((parentElement.childNodes[i].className === 'likeButton')) {
            parentElement.childNodes[i].textContent = 'Unlike'
          }
        }    
      }
    })

    return button
  },

  renderListItem(flick) {
    const item = document.createElement('li')
    item.textContent = flick.name
    item.id = flick.id
    item.style.fontSize = '2rem'
    item.style.backgroundColor = defaultBackgroundColor
    item.style.borderRadius = '6px'

    //Add the Like Button the the li element
    item.appendChild(this.renderLikeButton('Like'))

    //Add the Remove Button to the li element
    item.appendChild(this.renderRemoveButton('Remove'))

    return item
  },

  handleSubmit(ev) {
    //Keeps the page from refreshing
    ev.preventDefault()

    const f = ev.target

    const flick = {
      name: f.flickName.value,
      id: this.max,
      favorited: false,
    }

    //Part 1 of Homework
    this.flicks.push(flick)

    const listItem = this.renderListItem(flick)
    this.list.appendChild(listItem)
    console.log('increasing max variable')
    this.max ++
  },
}

app.init({
  formSelector: 'form#flick-form',
  listSelector: '#flick-list',
})