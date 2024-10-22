export interface Coordinate{
    latidute: number,
    longitude: number
}

export function getDistanceBetweenCoordinates(
    from: Coordinate,
    to: Coordinate
) {
    if (from.latidute === to.latidute && from.longitude === to.longitude){
        return 0
    }

    const fromRandian = (Math.PI * from.latidute) / 180
    const toRadian = (Math.PI * to.latidute) / 180

    const theta = from.longitude - to.longitude
    const radTheta = (Math.PI * theta) / 180

    let dist = 
    Math.sin(fromRandian) * Math.sin(toRadian) + 
    Math.cos(fromRandian) * Math.sin(toRadian) * Math.cos(radTheta)

    if (dist > 1 ) {
        dist = 1
    }

    dist = Math.acos(dist)
    dist = (dist * 180 ) / Math.PI
    dist = dist * 60 * 1.1515
    dist = dist * 1.609344

    return dist

}




