/**
 * 자주 사용하는 것들에 대한 유틸 클래스.
 */
const CryptoJS = require("crypto-js");
// const logger = require("../utils/winston");

/**
 * getter
 * AES_256 암호화. 
 * @param {String} msg 암후화 하고싶은 문자열
 * @author hmju
 */
exports.enc = function (msg) {
    return '' + CryptoJS.AES.encrypt(JSON.stringify(msg), process.env.AES_KEY);
}

/**
 * getter 
 * AES_256 복호화
 * @param {String} msg 암호화된 문자열
 * @author hmju
 */
exports.dec = function (msg) {
    const bytes = CryptoJS.AES.decrypt(msg.toString(), process.env.AES_KEY);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}

/**
 * Header Cookie 값 파싱 해주는 함수.
 * @param {String} cookie
 * @author hmju
 */
exports.cookieParser = function (cookie = '') {
    return cookie
        .split(';')
        .map(v => v.split('='))
        .map(([k, ...vs]) => [k, vs.join('=')])
        .reduce((acc, [k, v]) => {
            acc[k.trim()] = decodeURIComponent(v);
            return acc;
        }, {});
}

/**
 * UTF-8 인코딩
 * @param {String} str
 * @author hmju
 */
exports.encode_utf8 = function (str) {
    return encodeURIComponent(str);
}

/**
 * UTF-8 디코딩
 * @param {String} str
 * @author hmju
 */
exports.decode_utf8 = function (str) {
    return decodeURIComponent(str);
}

/**
 * 문자열 유효성 검사.
 * @param {String} str
 * @author hmju
 */
exports.isValidString = function (str) {
    return !(str == null || str == "");
}

exports.isValidInt = function (value) {
    return !(value == null)
}

/**
 * Request 정보 가져오기.
 * APP 인경우 
 */
exports.reqInfo = function (req) {
    try {
        const reqType = req.header(process.env.HEADER_TYPE);
        // APP 인경우.
        if (reqType != null) {
            return {
                osType: reqType,
                loginKey: req.header(process.env.HEADER_LOGIN)
            }
        }
        // Web 인경우 쿠키에서 로그인 키값을 리턴함
        else {
            let cookie = exports.cookieParser(req.headers.cookie);
            return {
                loginKey: cookie.loginKey
            }
        }
    } catch (err) {
        console.log("reqInfo Error " + err);
        return null;
    }
}

/**
 * CmmInfo 에서 앱인지 아닌지 판별
 */
exports.isApp = function (cmmInfo) {
    try {
        if (cmmInfo.osType != null) {
            if (cmmInfo.osType == 'AND' || cmmInfo.osType == 'iOS') {
                return true
            }
        }
        return false
    } catch (err) {
        return false
    }
}

/**
 * 운영 및 개발 버전에 따라서 로그 분기 처리.
 * @param {String} msg 
 */
exports.logD = function (msg) {
    // try {
    //     if (process.env.BUILD_TYPE == 'RELEASE') {
    //         logger.info(msg);
    //     } else {
    //         logger.debug(msg);
    //     }
    // } catch (err) {

    // }
}

exports.logFileReq = function (any) {
    // try {
    //     logger.info('Request File\n[Headers]\n' + JSON.stringify(any.rawHeaders) + '\n\n[File]\n' + JSON.stringify(any.file));
    // }catch(err){

    // }
}

exports.logFileRes = function (any) {
    // try {
    //     logger.info('Response File\n[Headers]\n' + any.response + '\n\n[Client]\n' + any.client);
    // }catch(err){

    // }
}

exports.logE = function (msg) {
    // try {
    //     if (process.env.BUILD_TYPE == 'RELEASE') {
    //         logger.error(msg);
    //     } else {
    //         logger.error(msg);
    //     }
    // } catch (err) {

    // }
}

/**
 * 디렉토리 체크 로직
 * @param {string} path 
 * @param {function} callback 
 */
const isDir = (fs, path, callback) => {
    try {
        fs.stat(path, (err, stats) => {
            if (err && err.code === 'ENOENT')
                return callback(null, true);
            if (err)
                return callback(err);

            return callback(null, !stats.isDirectory());
        });
    } catch (err) {
        return callback(err)
    }

}

exports.checkDir = function (fs, path, callback) {
    isDir(fs, path, (err, isTrue) => {
        if (err) {
            if (callback == null) {
                return console.log(err);
            } else {
                return callback(false, '에러!' + err);
            }
        }

        if (!isTrue) {
            if (callback == null) {
                return console.log('이미 동일한 디렉토리가 있습니다. ' + path);
            } else {
                return callback(true, '이미 동일한 디렉토리가 있습니다.' + path);
            }
        }

        fs.mkdir(path, (err) => {
            if (err) {
                if (callback == null) {
                    return console.log(err);
                } else {
                    return callback(false, err);
                }
            }

            // 디렉토리 생성 완료.
            if (callback == null) {
                return console.log('디렉토리 생성 완료 ' + path);
            } else {
                return callback(true, path);
            }
        })
    })
}

exports.isEmpty = function (value) {
    if (value == '' ||
        value == null ||
        value == undefined ||
        value == 'undefined' ||
        (value != null && typeof value == 'object' && !Object.keys(value).length)) {
        return true
    } else {
        return false
    }
}

exports.getCurrentDate = function () {
    const date = new Date()
    const year = date.getFullYear().toString()
    let month = date.getMonth() + 1
    month = month < 10 ? '0' + month.toString() : month.toString()
    let day = date.getDate()
    day = day < 10 ? '0' + day.toString() : day.toString()
    return year + '' + month + '' + day
}

exports.checkAuth = function (findAuthKey, callback) {
    authModel.fetchAutkKey(function onMessage(err, rows) {
        if (err) {
            callback(false)
            return
        }
        console.log(findAuthKey)
        rows.forEach(e => {
            if (e.AUTH_KEY == findAuthKey) {
                callback(true)
                return
            }
        });
        callback(false)
    })
}

var randomImageArr = [
    'https://node.qtzz.synology.me/resource/img/20210921/1632238064795dwalkkz7dea.png',
    'https://node.qtzz.synology.me/resource/img/20210922/1632318929985pivput2yrnh.jpg',
    'https://node.qtzz.synology.me/resource/img/20211122/1637586222323fzcfhwey4km.png',
    'https://node.qtzz.synology.me/resource/img/20220111/1641903610369o5hb9obe2n.JPG',
    'https://node.qtzz.synology.me/resource/img/20230227/1677459493890tm5o2bizusc.jpg',
    'https://node.qtzz.synology.me/resource/img/20230227/16774626399811aaisjyf63t.jpg',
    'https://node.qtzz.synology.me/resource/img/20230227/1677463363512ckpf7o2nmgc.jpg',
    'https://node.qtzz.synology.me/resource/img/20230227/1677463363525o8e0voblm9g.jpg',
]

var randomTitleArr = [
    '안녕하세요',
    '무한한 창의력 발휘',
    '창의적인 아이디어 실현',
    '블랙몬스터',
    '홈브루~',
    '📕 Today, I learned Something',
    ':man-bowing: :man-bowing::man-bowing::man-bowing:',
    '나는야 날으는 돼지'
]

var randomMessageArr = [
    '그대와 처음 만난 이곳 모든날 모든 순간 좋았다.',
    '말했잖아 언젠가 이런 날이 온다면 널 혼자 내버려두지 않을 거라고 죄다 낭떠러지야, 봐 예상했던 것보다 더 아플지도모르지만',
    '스토어. 좋아하는 Apple 제품을 구입하는 가장 좋은 방법',
    '지는 별빛 바라볼때 눈에 흘러 내리는 못다한 말들 그 아픈 사랑',
    '나는야 날으는 도야지! 늦가가가 최신 제품. 따끈따근 신제품 이야기....~',
    '금씩 알게되는 에스쁘아 🍯템들! ',
    ':이런 작은 차이들이 고퀄을 만드는거죠👏👏👏 게다가 70%할인이라니 아니 살 수가 없어요, 이런 🍯정보 쪼느님이🙏',
    '8만 구독자의 와인디렉터 양갱 이 알려주는 초보자를 위한 세상에서 가장 쉬운 와인 입문서'
]

exports.randomImage = function () {
    return randomImageArr[Math.floor(Math.random() * randomImageArr.length)]
}

exports.randomTitle = function () {
    return randomTitleArr[Math.floor(Math.random() * randomTitleArr.length)]
}

exports.randomMessage = function () {
    return randomMessageArr[Math.floor(Math.random() * randomMessageArr.length)]
}

exports.randomInt = function () {
    return Math.floor(Math.random() * 100)
}

/**
 * Header Cookie 값 파싱 해주는 함수.
 * @param {String} cookie
 * @author hmju
 */
exports.cookieParser = function (cookie = '') {
    return cookie
        .split(';')
        .map(v => v.split('='))
        .map(([k, ...vs]) => [k, vs.join('=')])
        .reduce((acc, [k, v]) => {
            acc[k.trim()] = decodeURIComponent(v);
            return acc;
        }, {});
}

exports.isExpiredToken = function (req) {
    try {
        const token = req.header('Token')
        return token.includes('Expired')
    } catch (err) {
        return false
    }
}
