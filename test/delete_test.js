const assert = require('assert');
const User = require('../src/user');

describe('Deleting a user', () => {
    let joe;

    beforeEach((done) => {
        joe = new User({ name: 'Joe' });
        joe.save()
            .then(() => done());
    });

    it('model instance remove', (done) => {
        joe.deleteOne()
            .then(() => { return User.findOne({ name: 'Joe' }) })
            .then((user) => {
                assert(user === null);
                done();
            })
    });

    it('class method deleteMany', (done) => {

        User.deleteMany({ name: 'Joe' })
            .then(() => User.findOne({ name: 'Joe' }))
            .then((user) => {
                assert(user === null);
                done();
            })
    });

    it('class method findAndRemove', (done) => {
        User.findOneAndDelete({ name: 'Joe' })
            .then(() => User.findOne({ name: 'Joe' }))
            .then((user) => {
                assert(user === null);
                done();
            });
    });

    it('class method findByIdAndRemove', (done) => {
        User.findByIdAndDelete({ _id: joe._id })
            .then(() => User.findById({ _id: joe._id }))
            .then(user => {
                assert(user === null)
                done();
            });
    });
});