

module.exports.isEmpty  = function(str) {
    if(str === null || str === undefined || str.toString().trim() === ''){
        return false
    }
    return true;
}
