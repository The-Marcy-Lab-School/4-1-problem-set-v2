# Problem Set 4.1 - Factory Functions with `this`

# Short Answers
There are short answers for this assignment! They are not optional, please complete them!

# Question 1: make a cellphone object by hand
You'll see in `from-scratch.js` there's just an empty object, fill that up with the following properties and methods.

It should have the following properties and starter values:
- phoneNumber: a 10 digit `String` number (`'8514229482'`)
- model: a `String` that's the name of the phone model (`'iPhone'`)
- contacts: an empty array

And the following methods:
- addContact
- numberOfContacts
- lookUp
- deleteContact
- makeCall

Check the tests to see what each of those should do.

# Question 2: make a cellphoneFactory
Now, create a factory function called cellphoneFactory. This function should return an object with all of the properties and methods that we defined above, but the properties like `model` and `number` should of course be dynamic instead of hard coded. Check the tests to see what the factory function accepts as arguments (what is the "signature" of the function?).