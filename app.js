const app = {
  init(selectors) {
    this.flicks = []

    this.list = document.querySelector(selectors.listSelector)
    document
      .querySelector(selectors.formSelector)
      //Passing the function itselft, we dont want it to just run, so no ()
      .addEventListener('submit', this.handleSubmit.bind(this))

    this.checkLocalStorage()

    this.max = -1
    defaultBackgroundColor = 'cadetblue'
    likedBackgroundColor = 'deeppink'    
  },

  checkLocalStorage() {
    const data = JSON.parse(localStorage.getItem("data"))
    const len = parseInt(localStorage.getItem("len"))
    debugger

    if (JSON.parse(localStorage.getItem("data"))){
      for (var i = len; i > -1; i--) {        
        const listItem = app.renderListItem(data[i])
        this.list.insertBefore(listItem, this.list.firstElementChild)
      }
    }
  },

  renderUpButton(ev) {
    const button = document.createElement('button')
    button.textContent = 'Move Up'
    button.className += 'success button upButton'

    //Add an event listener for this button
    button.addEventListener('click', function(ev) {
      const ulList = ev.target.parentElement.parentElement
      const currentListItem = ev.target.parentElement

      ulList.insertBefore(currentListItem, currentListItem.previousElementSibling)
    })

    return button
  },

  renderDownButton(ev) {
    const button = document.createElement('button')
    button.textContent = 'Move Down'
    button.className += 'success button downButton'

    //Add an event listener for this button
    button.addEventListener('click', function(ev) {
      try {
        const ulList = ev.target.parentElement.parentElement
        const currentListItem = ev.target.parentElement

        ulList.insertBefore(currentListItem.nextElementSibling, currentListItem)
      } catch (ex) {
        //Do nothing
      }
    })

    return button
  },

  getIndexOfFlick(parentElement) {
    let index = -1

    for (var i = 0; i < app.flicks.length; i++){
      if (app.flicks[i].id === parseInt(parentElement.id)) {
        index = i;
      }
    }

    return index
  },

  renderRemoveButton(text) {
    const button = document.createElement('button')
    button.textContent = (text)
    button.className += 'button removeButton'

    //Add an event listener for this button
    button.addEventListener('click', function(ev) {
      const parent = ev.target.parentElement 
      const index = app.getIndexOfFlick(parent)     
      parent.parentNode.removeChild(parent)

      //Remove the flick from the array of flicks
      app.flicks.splice((index), 1)
      app.max --
    })

    return button
  },

  renderLikeButton(text) {
    const button = document.createElement('button')
    button.textContent = (text) 
    button.className += 'button likeButton'

    //Add an event listener for this button
    button.addEventListener('click', function(ev) {
      const parentElement = ev.target.parentElement

      let index = app.getIndexOfFlick(parentElement)

      //Change background color and button text
      if (app.flicks[index].favorited) {
        parentElement.style.backgroundColor = defaultBackgroundColor
        app.flicks[index].favorited = false;
        
        //Change the button text
        for (let i = 1; i < parentElement.childNodes.length; i++){
          if ((parentElement.childNodes[i].className.includes('likeButton'))) {
            parentElement.childNodes[i].textContent = 'Like'
          }
        }

      } else {
        parentElement.style.backgroundColor = likedBackgroundColor
        app.flicks[index].favorited = true;
        
        //Change the button text
        for (let i = 1; i < parentElement.childNodes.length; i++){
          if ((parentElement.childNodes[i].className.includes('likeButton'))) {
            parentElement.childNodes[i].textContent = 'Unlike'
          }
        }    
      }
    })

    return button
  },

  renderListItem(flick) {
    const item = document.createElement('li')
    item.id = flick.id
    item.style.fontSize = '2rem'
    item.style.backgroundColor = 'cadetblue'
    item.style.borderRadius = '6px'
    
    const text = document.createElement('span')
    text.textContent = flick.name
    text.contentEditable = true

    item.appendChild(text)

    //Add the Like Button the the li element
    item.appendChild(this.renderLikeButton('Like'))

    //Add the Remove Button to the li element
    item.appendChild(this.renderRemoveButton('Remove'))

    //Add the Down Button to the li element
    item.appendChild(this.renderDownButton())

    //Add the Up Button to the li element
    item.appendChild(this.renderUpButton())

    return item
  },

  handleSubmit(ev) {
    //Keeps the page from refreshing
    ev.preventDefault()

    const f = ev.target
    this.max ++

    const flick = {
      name: f.flickName.value,
      id: this.max,
      favorited: false,
    }

    this.flicks.unshift(flick)
    this.flicks.push(flick)

    const listItem = this.renderListItem(flick)
    this.list.insertBefore(listItem, this.list.firstElementChild)

    const r = this.flicks.pop() ////////////////////////////////////////////////////////// Dangerous Code here   
    localStorage.setItem("data", JSON.stringify(app.flicks))
    localStorage.setItem("len", this.max)

    f.reset();
  },
}

app.init({
  formSelector: 'form#flick-form',
  listSelector: '#flick-list',
})
