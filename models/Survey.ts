import { surveysCollection } from '../mongo.ts';
import BaseModel from './BaseModel.ts';

export default class Survey extends BaseModel {
    public id: string = '';

    constructor(
        public userId: string = '',
        public name: string = '',
        public description: string = '') {

        super();

        this.userId = userId;
        this.name = name;
        this.description = description;
    }

    static async findByUser(userId: string): Promise<Survey[]> {
        const surveys = await surveysCollection.find({ userId });
        return surveys.map((survey: any) => BaseModel.prepare(survey));
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
}