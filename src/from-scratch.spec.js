const path = require('path');
const ScoreCounter = require('score-tests');
const {
  cellphone,
  cellphoneFactory,
} = require('./from-scratch');

const testSuiteName = 'From Scratch Tests';
const scoresDir = path.join(__dirname, '..', 'scores');
const scoreCounter = new ScoreCounter(testSuiteName, scoresDir);

describe(testSuiteName, () => {
  it('phoneNumber - the cellphone object has property phoneNumber whose value is a 10 digit string', () => {
    expect(cellphone.phoneNumber).toMatch(/\d{10}/);
    expect(typeof cellphone.phoneNumber).toBe('string');

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it("model - the cellphone object has a property `model` that's value is a string", () => {
    expect(cellphone.model).not.toBeUndefined();
    expect(typeof cellphone.model).toBe('string');

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it("contacts - the cellphone object has a `contacts` property that's an empty array", () => {
    expect(Array.isArray(cellphone.contacts)).toBe(true);
    expect(cellphone.contacts.length).toBe(0);

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it('addContact - the cellphone object has a method that adds a contact object to the contacts array', () => {
    const cellphoneCopy = Object.create(Object.getPrototypeOf(cellphone));
    Object.assign(cellphoneCopy, cellphone);
    cellphoneCopy.contacts = [];
    expect(typeof cellphoneCopy.addContact).toBe('function');

    const reubenReturnVal = cellphoneCopy.addContact('Reuben Ogbonna', '9196219388');
    const annReturnVal = cellphoneCopy.addContact('Ann', '0987654321');
    expect(reubenReturnVal).toBe('Reuben Ogbonna successfully added.');
    expect(annReturnVal).toBe('Ann successfully added.');
    expect(cellphoneCopy.contacts.length).toBe(2);

    // Check that the contacts array contains the correct objects
    expect(cellphoneCopy.contacts.some(({ name, phoneNumber }) => (
      name === 'Reuben Ogbonna' && phoneNumber === '9196219388'
    ))).toBe(true);

    expect(cellphoneCopy.contacts.some(({ name, phoneNumber }) => (
      name === 'Ann' && phoneNumber === '0987654321'
    ))).toBe(true);

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it('numberOfContacts - the cellphone object has a method that gets the length of the contacts array', () => {
    const cellphoneCopy = Object.create(Object.getPrototypeOf(cellphone));
    Object.assign(cellphoneCopy, cellphone);
    cellphoneCopy.contacts = [];
    expect(typeof cellphoneCopy.addContact).toBe('function');
    expect(cellphoneCopy.addContact('Reuben Ogbonna', '9196219388')).toBe('Reuben Ogbonna successfully added.');
    expect(cellphoneCopy.addContact('Ann', '0987654321')).toBe('Ann successfully added.');
    expect(cellphoneCopy.contacts.length).toBe(cellphoneCopy.numberOfContacts());

    expect(cellphoneCopy.addContact('Maya', '1234567890')).toBe('Maya successfully added.');
    expect(cellphoneCopy.contacts.length).toBe(cellphoneCopy.numberOfContacts());

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it('lookUp - the cellphone object has a method that looks up a contact and returns their number', () => {
    const cellphoneCopy = Object.create(Object.getPrototypeOf(cellphone));
    Object.assign(cellphoneCopy, cellphone);
    cellphoneCopy.contacts = [];
    expect(cellphoneCopy.addContact).not.toBeUndefined();
    expect(cellphoneCopy.addContact('Reuben Ogbonna', '9196219388')).toBe('Reuben Ogbonna successfully added.');
    expect(cellphoneCopy.addContact('Ann', '0987654321')).toBe('Ann successfully added.');
    expect(cellphoneCopy.lookUp('Reuben Ogbonna')).toBe('9196219388');
    expect(cellphoneCopy.lookUp('Ann')).toBe('0987654321');
    expect(cellphoneCopy.lookUp(Math.random().toString())).toBe('Contact not found.');

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it('lookUp - the cellphone object has a method that looks up a contact and "Contact not found." if no match.', () => {
    const cellphoneCopy = Object.create(Object.getPrototypeOf(cellphone));
    Object.assign(cellphoneCopy, cellphone);
    cellphoneCopy.contacts = [];
    const randomCellNumber = Math.random().toString();

    expect(cellphoneCopy.lookUp(randomCellNumber)).toBe('Contact not found.');

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it('deleteContact - the cellphone object has a method that removes a contact when given a perfectly matching name', () => {
    const cellphoneCopy = Object.create(Object.getPrototypeOf(cellphone));
    Object.assign(cellphoneCopy, cellphone);
    cellphoneCopy.contacts = [];
    const jimReturnVal = cellphoneCopy.addContact('Jim Smith', '9876543210');
    expect(jimReturnVal).toBe('Jim Smith successfully added.');

    expect(cellphoneCopy.deleteContact('Jim Smith')).toBe('Jim Smith successfully deleted.');
    expect(cellphoneCopy.contacts.some(({ name }) => name === 'Jim Smith')).toBe(false);
    expect(cellphoneCopy.deleteContact(Math.random().toString())).toBe('Contact not found.');

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it("deleteContact - the cellphone object's method deleteContact returns `Contact not found.` if given a bad name", () => {
    const cellphoneCopy = Object.create(Object.getPrototypeOf(cellphone));
    Object.assign(cellphoneCopy, cellphone);
    cellphoneCopy.contacts = [];
    const randomName = Math.random().toString();
    expect(cellphoneCopy.deleteContact(randomName)).toBe('Contact not found.');

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it("makeCall - the cellphoneObject's makeCall method for name calls a contact member, either with a number of name", () => {
    const cellphoneCopy = Object.create(Object.getPrototypeOf(cellphone));
    Object.assign(cellphoneCopy, cellphone);
    cellphoneCopy.contacts = [];
    expect(typeof cellphoneCopy.addContact).toBe('function');
    expect(cellphoneCopy.addContact('Reuben Ogbonna', '9196219388')).toBe('Reuben Ogbonna successfully added.');
    expect(cellphoneCopy.addContact('Ann', '0987654321')).toBe('Ann successfully added.');

    expect(cellphoneCopy.makeCall('Reuben Ogbonna')).toBe('Calling Reuben Ogbonna at 9196219388');
    expect(cellphoneCopy.makeCall('Ann')).toBe('Calling Ann at 0987654321');
    expect(cellphoneCopy.makeCall('9196219388')).toBe('Calling Reuben Ogbonna at 9196219388');
    expect(cellphoneCopy.makeCall(Math.random().toString())).toBe('Contact not found.');

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it("makeCall - the cellphoneObject's makeCall method returns 'Contact not found' if given a name or number it can't find", () => {
    const cellphoneCopy = Object.create(Object.getPrototypeOf(cellphone));
    Object.assign(cellphoneCopy, cellphone);
    cellphoneCopy.contacts = [];

    expect(cellphoneCopy.makeCall(Math.random().toString())).toBe('Contact not found.');

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it('cellphoneFactory - the factory function returns a dynamic phone object just like we handmade', () => {
    const reubensCell = cellphoneFactory('9196219388', 'iPhone XR');
    expect(typeof reubensCell).toBe('object');
    expect(reubensCell.phoneNumber).toBe('9196219388');
    expect(reubensCell.model).toBe('iPhone XR');
    expect(Array.isArray(reubensCell.contacts)).toBe(true);
    expect(reubensCell.contacts.length).toBe(0);

    expect(reubensCell.addContact('Ann', '0987654321')).toBe('Ann successfully added.');
    expect(reubensCell.numberOfContacts()).toBe(1);
    expect(reubensCell.lookUp('Ann')).toBe('0987654321');
    expect(reubensCell.makeCall('Ann')).toBe('Calling Ann at 0987654321');
    expect(reubensCell.deleteContact('Ann')).toBe('Ann successfully deleted.');
    expect(reubensCell.numberOfContacts()).toBe(0);

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  // IGNORE PLEASE
  beforeEach(() => scoreCounter.add(expect));
  afterAll(scoreCounter.export);
});
