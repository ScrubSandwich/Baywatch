const app = {
  init(formSelector) {
    document
      .querySelector(formSelector)

      //Passing the function itselft, we dont want it to just run, so no ()
      .addEventListener('submit', this.handleSubmit)
  },

  handleSubmit(ev) {
    //Keeps the page from refreshing
    ev.preventDefault()

    const flickName = ev.target.flickName.value
    console.log(flickName)
  },
}

app.init('form#flick-form')