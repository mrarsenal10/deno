import { usersCollection } from '../mongo.ts';

export default class User {
    public id: string;
    public name: string;
    public email: string;
    public password: string;

    constructor({id = '', name = '', email = '', password = ''}) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }

    public static async findUser(params: Object) {
        return await usersCollection.findOne(params);
    }

    public async save() {
        try {
            delete this.id;
            const { $oid } = await usersCollection.insertOne(this);
            this.id = $oid;
            return this;
        } catch (e) {
            throw Error('error');
        }
    }
}