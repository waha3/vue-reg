export function filterGender(sex) {
    if (sex == 'male') {
        return '男';
    } else if (sex == 'female') {
        return '女'
    } else {
        return '性别不明'
    }
}

const newObj = {}
export function changeName(obj) {
    newObj.姓名 = obj.name
    newObj.英文名 = obj.lastname + ' ' + obj.firstname
    newObj.性别 = (obj.gender == 'male') ? '男' : '女'
    newObj.血型 = obj.blood + '型'
    newObj.证件号码 = obj.certificate_id
    newObj.出生日期 = obj.birthdate
    newObj.联系电话 = obj.mobile
    newObj.紧急联系人 = obj.emergency_contact_person
    newObj.紧急联系电话 = obj.emergency_mobile
    if(obj.pb_certificate) {
        newObj.成绩证书 = obj.pb_certificate
    }
    if(obj.health_certificate) {
        newObj.健康证书 = obj.health_certificate
    }
    changeCert(obj)
    return newObj
}

function changeCert(obj) {
    if (obj.certificate_type == 'identity') {
        newObj.证件类型 = '二代身份证'
    } else if (obj.certificate_type == 'passport') {
        newObj.证件类型 = '护照'
    } else {
        newObj.证件类型 = '其他'
    }
}


export function prettyBytes() {
    if (typeof num !== 'number' || isNaN(num)) {
        throw new TypeError('Expected a number');
    }

    var exponent;
    var unit;
    var neg = num < 0;
    var units = ['B', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    if (neg) {
        num = -num;
    }

    if (num < 1) {
        return (neg ? '-' : '') + num + ' B';
    }

    exponent = Math.min(Math.floor(Math.log(num) / Math.log(1000)), units.length - 1);
    num = (num / Math.pow(1000, exponent)).toFixed(2) * 1;
    unit = units[exponent];

    return (neg ? '-' : '') + num + ' '
}


export function changeRadioOptions(options) {
    let data = options.split(';')
    let arr = []
    for(let i = 0; i < data.length; i++){
        arr.push({
            text: data[i],
            value: data[i]
        })
    }
    return arr
}

export function changeSelectOptions(options) {
    let data = options.split(';')
    let arr = []
    for(let i = 0; i < data.length; i++){
        arr.push({
            key: data[i],
            value: data[i]
        })
    }
    return arr
}

export function changeCheckboxOptions(options) {
    let data = options.split(';')
    let arr = data
    return arr
}

export function changeArray(data) {
    var arr = []

    return arr
}

export function formatMIME(data) {
    var a = data.replace(/\*/g, '')
    var b = a.replace(/\;/g, ',')
    return b
}

const orderInfo = {}
export function changeOrderInfo(obj) {
    orderInfo.姓名 = obj.name
    orderInfo.英文名 = obj.lastname + ' ' + obj.firstname
    orderInfo.性别 = (obj.gender == 'male') ? '男' : '女'
    orderInfo.血型 = obj.blood + '型'
    orderInfo.证件号码 = obj.certificate_id
    orderInfo.出生日期 = obj.birthdate
    orderInfo.联系电话 = obj.mobile
    orderInfo.紧急联系人 = obj.emergency_contact_person
    orderInfo.紧急联系电话 = obj.emergency_mobile
    // orderInfo.成绩证书 = obj.pb_certificate
    // orderInfo.健康证书 = obj.health_certificate
    return orderInfo
}
