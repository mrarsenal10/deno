import { surveysCollection } from '../mongo.ts';

export default class Survey {
    public id: string = '';

    constructor(
        public userId: string = '',
        public name: string = '',
        public description: string = '') {

        this.userId = userId;
        this.name = name;
        this.description = description;
    }

    static async findByUser(userId: string) {
        const surveys = await surveysCollection.find({ userId });
        return surveys.map((survey: any) => this.prepare(survey));
    }

    public async save() {
        try {
            delete this.id;
            const { $oid } = await surveysCollection.insertOne(this);
            this.id = $oid;
            return this;
        } catch (error) {
            throw new Error('error');
        }
    }

    private static prepare(data: any) {
        data.id = data._id.$oid;
        delete data._id;
        return data;
    }
}