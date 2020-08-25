

module.exports.isEmpty  = function(str) {
    if(str === null || str === undefined || str.toString().trim() === ''){
        return false
    }
    if(Object.prototype.toString.call(str) == '[object Array]'){
        if(str.length === 0){
            return false
        }
    }
    return true;
}


/**
 *
 * @param obj   分页数据
 * @param url   跳转地址
 * @returns {{
 * current: number,
 * pageSize: *,
 * total: (number|PaymentItem),
 * pages: number,
 * pageArr: Array,
 * url: *
 * }}
 */
module.exports.calcPageination  = function(obj,url) {
    let pagination = {
        current:Number(obj.current),
        pageSize:obj.pageSize,
        total:obj.total,
        pages:Math.ceil(obj.total/obj.pageSize),
        pageArr:[],
        url:url
    };

    for(let i = 1;i<=5;i++){
        let num = i + pagination.current;
        if(num <= pagination.pages){
            pagination.pageArr.push( num )
        }
    }

    return pagination

}
