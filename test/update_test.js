const assert = require('assert');
const User = require('../src/user');

describe('Updating records', () => {
    let joe;

    beforeEach((done) => {
        joe = new User({ name: 'Joe', likes: 0 })
        joe.save()
            .then(() => done());
    });

    function assertName(operation, done) {
        operation
            .then(() => User.find({}))
            .then((users) => {
                assert(users.length === 1);
                assert(users[0].name === 'Alex');
                done();
            });
    }

    it('instance type using set n save', (done) => {
        joe.set('name', 'Alex');
        assertName(joe.save(), done);
    });

    it('a model instance can update', (done) => {
        assertName(joe.updateOne({ name: 'Alex' }), done);
    });

    it('a model class can update', (done) => {
        assertName(
            User.updateOne({ name: 'Joe' }, { name: 'Alex' }),
            done
        );
    });

    it('a model class can update one record', (done) => {
        User.findOneAndUpdate({ name: 'Joe' }, { name: 'Alex' })
            .then(() => User.find({ name: 'Alex' }))
            .then(users => {
                assert((users[0].name === 'Alex'));
                done();
            });

    });

    it('a model class can find a record with an Id and update', (done) => {
        assertName(
            User.findByIdAndUpdate({ _id: joe._id }, { name: 'Alex' }),
            done
        )
    });

    it('A user can have their postCount incremented by 1', (done => {
        User.update({ name: 'Joe' }, { $inc: { likes: 1 } })
            .then(() => User.findOne({ name: 'Joe' }))
            .then((user) => {
                assert(user.likes === 1);
                done();
            });
    }));
});