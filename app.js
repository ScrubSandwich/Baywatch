const app = {
  init(formSelector) {
    document
      .querySelector(formSelector)

      //Passing the function itselft, we dont want it to just run, so no ()
      .addEventListener('submit', this.handleSubmit.bind(this))
    this.max = 0
  },

  handleSubmit(ev) {
    //Keeps the page from refreshing
    ev.preventDefault()

    const f = ev.target

    const flick = {
      name: f.flickName.value,
      id: this.max + 1,
    }

    console.log(flick)
    this.max ++
  },
}

app.init('form#flick-form')