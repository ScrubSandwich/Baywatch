const app = {
  init(selectors) {
    this.flicks = []
    this.max = 0
    this.list = document.querySelector(selectors.listSelector)

    document
      .querySelector(selectors.formSelector)

      //Passing the function itselft, we dont want it to just run, so no ()
      .addEventListener('submit', this.handleSubmit.bind(this))
  },

  renderListItem(flick) {
    const item = document.createElement('li')
    item.textContent = flick.name

    return item
  },

  handleSubmit(ev) {
    //Keeps the page from refreshing
    ev.preventDefault()

    const f = ev.target

    const flick = {
      name: f.flickName.value,
      id: this.max + 1,
    }

    const listItem = this.renderListItem(flick)
    this.list.appendChild(listItem)
    this.max ++
  },
}

app.init({
  formSelector: 'form#flick-form',
  listSelector: '#flick-list',
})