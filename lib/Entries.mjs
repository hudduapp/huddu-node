export class Entries {

    constructor(session, organization, project) {
        this.session = session
        this.project = project
        this.organization = organization
    }

    async get(filter) {
        let res = await await this.session.request("GET", `/organizations/${this.organization}/projects/${this.project}/entries`, { filter: JSON.stringify(filter), limit: 1 });

        if (res.data.length) {
            return res.data[0]
        } else {
            return null
        }
    }

    async list(filter = {}, skip = 0, limit = 30) {



        let res = await await this.session.request("GET", `/organizations/${this.organization}/projects/${this.project}/entries`,
            {
                filter: JSON.stringify(filter),
                limit: limit,
                skip: skip
            }
        );

        return res

    }
}
