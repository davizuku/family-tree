function formatDate(date) {
    var elems = []
    if (date != null) {
        if (date.day != null) {
            elems.push(date.day)
        }
        if (date.month != null) {
            elems.push(date.month)
        }
        if (date.year != null) {
            elems.push(date.year)
        }
    }
    return elems.join('/')
}
