//日期转时间戳
function transdate(dateStr) {
    var newstr = dateStr.replace(/-/g,'/');
    var date =  new Date(newstr);
    var time_str = date.getTime().toString();
    return time_str.substr(0, 10);
}
exports.transdate = transdate;