const mongoose = require('mongoose')

console.log(process.argv)
if (process.argv.length < 3) {
  console.log('Give password as an argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://caps:${password}@fullstack.fyzlojd.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Fullstack`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length < 5) {
  console.log("phonebook:")
  Person.find({}).then(result => {
    result.forEach(person => console.log(`${person.name} ${person.number}`));
    mongoose.connection.close()
  })
} else {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  })
  person.save().then(result => {
    console.log(`added ${person.name} number ${person.number} to phonebook`)
    mongoose.connection.close()
  })
}
