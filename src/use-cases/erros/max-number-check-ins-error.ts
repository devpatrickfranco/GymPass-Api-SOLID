export class MaxNumberCheckInsError extends Error {
    constructor() {
        super('Max Number of check-ins reached.')
    }

}