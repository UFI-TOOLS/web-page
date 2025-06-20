function SHA256(e) { function t(e, t) { var n = (65535 & e) + (65535 & t); return (e >> 16) + (t >> 16) + (n >> 16) << 16 | 65535 & n } function n(e, t) { return e >>> t | e << 32 - t } function r(e, t) { return e >>> t } function o(e, t, n) { return e & t ^ ~e & n } function i(e, t, n) { return e & t ^ e & n ^ t & n } function a(e) { return n(e, 2) ^ n(e, 13) ^ n(e, 22) } function s(e) { return n(e, 6) ^ n(e, 11) ^ n(e, 25) } function c(e) { return n(e, 7) ^ n(e, 18) ^ r(e, 3) } function u(e) { return n(e, 17) ^ n(e, 19) ^ r(e, 10) } var l = 8, d = 1; return e = function (e) { e = e.replace(/\\r\\n/g, "\\n"); for (var t = "", n = 0; n < e.length; n++) { var r = e.charCodeAt(n); r < 128 ? t += String.fromCharCode(r) : r > 127 && r < 2048 ? (t += String.fromCharCode(r >> 6 | 192), t += String.fromCharCode(63 & r | 128)) : (t += String.fromCharCode(r >> 12 | 224), t += String.fromCharCode(r >> 6 & 63 | 128), t += String.fromCharCode(63 & r | 128)) } return t }(e), function (e) { for (var t = d ? "0123456789ABCDEF" : "0123456789abcdef", n = "", r = 0; r < 4 * e.length; r++)n += t.charAt(e[r >> 2] >> 8 * (3 - r % 4) + 4 & 15) + t.charAt(e[r >> 2] >> 8 * (3 - r % 4) & 15); return n }(function (e, n) { var r, l, d, p, h, f, m, g, _, b, v, $, S = new Array(1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298), y = new Array(1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225), C = new Array(64); e[n >> 5] |= 128 << 24 - n % 32, e[15 + (n + 64 >> 9 << 4)] = n; for (var _ = 0; _ < e.length; _ += 16) { r = y[0], l = y[1], d = y[2], p = y[3], h = y[4], f = y[5], m = y[6], g = y[7]; for (var b = 0; b < 64; b++)C[b] = b < 16 ? e[b + _] : t(t(t(u(C[b - 2]), C[b - 7]), c(C[b - 15])), C[b - 16]), v = t(t(t(t(g, s(h)), o(h, f, m)), S[b]), C[b]), $ = t(a(r), i(r, l, d)), g = m, m = f, f = h, h = t(p, v), p = d, d = l, l = r, r = t(v, $); y[0] = t(r, y[0]), y[1] = t(l, y[1]), y[2] = t(d, y[2]), y[3] = t(p, y[3]), y[4] = t(h, y[4]), y[5] = t(f, y[5]), y[6] = t(m, y[6]), y[7] = t(g, y[7]) } return y }(function (e) { for (var t = Array(), n = (1 << l) - 1, r = 0; r < e.length * l; r += l)t[r >> 5] |= (e.charCodeAt(r / l) & n) << 24 - r % 32; return t }(e), e.length * l)) }
function gsmEncode(text) { function encodeText(text) { let encoded = []; for (let i = 0; i < text.length; i++) { const char = text[i]; const codePoint = char.codePointAt(0); if (codePoint <= 0xFFFF) { encoded.push((codePoint >> 8) & 0xFF); encoded.push(codePoint & 0xFF) } else { const highSurrogate = 0xD800 + ((codePoint - 0x10000) >> 10); const lowSurrogate = 0xDC00 + ((codePoint - 0x10000) & 0x3FF); encoded.push((highSurrogate >> 8) & 0xFF); encoded.push(highSurrogate & 0xFF); encoded.push((lowSurrogate >> 8) & 0xFF); encoded.push(lowSurrogate & 0xFF) } } return encoded } function toHexString(byteArray) { return byteArray.map(byte => byte.toString(16).padStart(2, '0')).join('') } const encodedBytes = encodeText(text); return toHexString(encodedBytes) }
//注意，如果是在f50本机内发起请求，请将请求端口更改为8080
let KANO_baseURL = '/api'
let KANO_PASSWORD = null
let KANO_TOKEN = null;

// 包装fetch
(() => {
    const of = window.fetch;

    function hmacSignature(secret, data) {
        const hmacMd5 = CryptoJS.HmacMD5(data, secret);
        const hmacMd5Bytes = CryptoJS.enc.Hex.parse(hmacMd5.toString());

        const mid = Math.floor(hmacMd5Bytes.sigBytes / 2);
        const part1 = CryptoJS.lib.WordArray.create(hmacMd5Bytes.words.slice(0, mid / 4), mid);
        const part2 = CryptoJS.lib.WordArray.create(hmacMd5Bytes.words.slice(mid / 4), mid);

        const sha1 = CryptoJS.SHA256(part1);
        const sha2 = CryptoJS.SHA256(part2);
        const finalHash = CryptoJS.SHA256(sha1.concat(sha2));

        return finalHash.toString(CryptoJS.enc.Hex);
    }

    window.fetch = async (input, init = {}) => {
        const headers = new Headers(init.headers || {});
        const t = Date.now();
        const method = (init.method || 'GET').toUpperCase();

        // 提取纯路径（不含 query）
        let urlPath = '';
        try {
            const url = new URL(input, window.location.origin);
            urlPath = url.pathname;
        } catch (e) {
            console.warn('无效的URL:', input);
            urlPath = input; // fallback
        }
        // 没啥用，只是起到混淆作用
        const signature = hmacSignature('minikano_kOyXz0Ciz4V7wR0IeKmJFYFQ20jd', 'minikano' + method + urlPath + t);

        headers.set('kano-t', t);
        headers.set('kano-sign', signature);

        const newInit = {
            ...init,
            headers,
        };
        return of(input, newInit);
    };
})();

//登录
const common_headers = {
    "referer": KANO_baseURL + '/index.html',
    "host": KANO_baseURL,
    "origin": KANO_baseURL,
    "authorization": KANO_TOKEN
}

const login = async () => {
    try {

        const { LD } = await getLD()
        if (!LD) throw new Error('无法获取LD')

        const pwd = SHA256(SHA256(KANO_PASSWORD) + LD)
        const body = new URLSearchParams({
            "goformId": "LOGIN",
            "isTest": "false",
            "password": pwd,
            "user": "admin"
        })
        const res = await fetch(KANO_baseURL + "/goform/goform_set_cmd_process", {
            method: "POST",
            headers: {
                ...common_headers,
                "content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            },
            body
        })
        const res_data = await res.json()
        if (res_data == undefined || res_data == null || res_data.result == '3' || res_data.result == 3) {
            return null
        }
        return res.headers.get('kano-cookie').split(';')[0]
    }
    catch {
        return null
    }
}

const logout = async (cookie) => {
    const AD = await processAD(cookie)
    const body = new URLSearchParams({
        "goformId": "LOGOUT",
        "isTest": "false",
        AD: AD
    })
    const res = await fetch(KANO_baseURL + "/goform/goform_set_cmd_process", {
        method: "POST",
        headers: {
            ...common_headers,
            "content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            // "content-Length": body.toString().length
        },
        body
    })
    return await res.text()
}

const getLD = async () => {
    const res = await fetch(KANO_baseURL + "/goform/goform_get_cmd_process?isTest=false&cmd=LD&_=" + Date.now(), {
        method: "GET",
        headers: {
            ...common_headers,
        }
    })
    return await res.json()
}

const getRD = async (cookie) => {
    if (!cookie) throw new Error('请提供cookie')
    const res = await fetch(KANO_baseURL + "/goform/goform_get_cmd_process?isTest=false&cmd=RD&_=" + Date.now(), {
        method: "GET",
        headers: {
            ...common_headers,
            "Cookie": cookie
        }
    })
    return await res.json()
}

const getUFIInfo = async () => {
    const res = await fetch(KANO_baseURL + "/goform/goform_get_cmd_process?isTest=false&cmd=Language,cr_version,wa_inner_version&multi_data=1&_=" + Date.now(), {
        method: "GET",
        headers: {
            ...common_headers
        }
    })
    return await res.json()
}

const processAD = async (cookie) => {
    const { wa_inner_version, cr_version } = await getUFIInfo()
    if (!wa_inner_version || !cr_version) throw new Error('无法获取版本信息')
    const parsedInfo = SHA256(wa_inner_version + cr_version)
    const { RD } = await getRD(cookie)
    const AD = SHA256(parsedInfo + RD)
    return AD
}

const postData = async (cookie, data = {}) => {
    const AD = await processAD(cookie)
    const body = new URLSearchParams({
        ...data,
        isTest: false,
        "AD": AD
    })
    const res = await fetch(KANO_baseURL + "/goform/goform_set_cmd_process", {
        method: "POST",
        headers: {
            ...common_headers,
            "Content-Type": "application/x-www-form-urlencoded",
            "Cookie": cookie,
            // "content-Length": body.toString().length
        },
        body
    })
    return res
}

const getData = async (data = new URLSearchParams({})) => {
    data.append('isTest', 'false')
    data.append('_', Date.now())
    const res = await fetch(KANO_baseURL + "/goform/goform_get_cmd_process?" + data.toString(), {
        method: "GET",
        headers: {
            ...common_headers,
            "Content-Type": "application/x-www-form-urlencoded",
        },
    })
    return await res.json()
}

const reboot = async (cookie) => {
    const res = await postData(cookie, {
        goformId: 'REBOOT_DEVICE',
    })
    return res
}

// 发送短信
const sendSms_UFI = async ({ content, number }) => {
    if (!content) throw new Error('请提供短信内容')
    if (!number) throw new Error('请提供手机号')
    const cookie = await login()
    const res = await postData(cookie, {
        goformId: 'SEND_SMS',
        Number: number,
        MessageBody: gsmEncode(content)
    })
    await logout(cookie)
    return await res.json()
}

//删除短信
const removeSmsById = async (id) => {
    if (!id) throw new Error('请提供短信id')
    const cookie = await login()
    const res = await postData(cookie, {
        goformId: 'DELETE_SMS',
        msg_id: id,
        notCallback: true,
    })
    await logout(cookie)
    return await res.json()
}

// 已读短信
const readSmsByIds = async (ids) => {
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
        throw new Error('请提供短信id数组');
    }

    const cookie = await login();
    const results = [];

    for (const id of ids) {
        try {
            const response = await postData(cookie, {
                goformId: 'SET_MSG_READ',
                msg_id: id,
                notCallback: true,
            });

            const data = await response.json();
            results.push({ id, success: data?.result == 'success', data });
        } catch (err) {
            console.error(`处理短信 ID ${id} 时出错:`, err);
            results.push({ id, success: false, error: err.message || String(err) });
        }
    }

    await logout(cookie);
    return results;
};

//获取短信列表（base64编码）
const getSmsInfo = async () => {
    const params = new URLSearchParams()
    params.append('_', Date.now().toString())
    const res = await fetch(KANO_baseURL + "/goform/goform_get_cmd_process?multi_data=1&isTest=false&cmd=sms_data_total&page=0&data_per_page=500&mem_store=1&tags=100&order_by=order by id desc&" + params, {
        headers: {
            ...common_headers
        }
    })
    return await res.json()
}

const getUFIData = async () => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5秒超时

    try {
        const params = new URLSearchParams();
        params.append('_', Date.now().toString());

        const cmd = 'usb_port_switch,battery_charging,sms_received_flag,sms_unread_num,sms_sim_unread_num,sim_msisdn,data_volume_limit_switch,battery_value,battery_vol_percent,network_signalbar,network_rssi,cr_version,iccid,imei,imsi,ipv6_wan_ipaddr,lan_ipaddr,mac_address,msisdn,network_information,Lte_ca_status,rssi,Z5g_rsrp,lte_rsrp,wifi_access_sta_num,loginfo,data_volume_alert_percent,data_volume_limit_size,realtime_rx_thrpt,realtime_tx_thrpt,realtime_time,monthly_tx_bytes,monthly_rx_bytes,monthly_time,network_type,network_provider,ppp_status';

        const res = await fetch(`${KANO_baseURL}/goform/goform_get_cmd_process?multi_data=1&isTest=false&cmd=${cmd}&${params.toString()}`, {
            headers: {
                ...common_headers
            },
            signal: controller.signal
        });

        const resData = await res.json()

        //获取设备基本信息
        let deviceInfo = {}
        try {
            const res = await (await fetch(`${KANO_baseURL}/baseDeviceInfo`, { headers: { ...common_headers } })).json()
            deviceInfo = res
        } catch {/*没有，不处理*/ }


        //处理U30Air兼容
        if (!resData.msisdn) {
            resData.msisdn = resData.sim_msisdn
        }

        return {
            ...resData,
            ...deviceInfo,
            //U30Air电池兼容写法
            battery: resData?.battery_value ? resData.battery_value : resData?.battery_vol_percent ? resData.battery_vol_percent : deviceInfo.battery,
        }
    } catch (error) {
        if (error.name === 'AbortError') {
            console.warn('请求超时');
        } else {
            console.error('请求失败', error);
        }
        return null;
    } finally {
        clearTimeout(timeoutId); // 清理定时器
    }
};

function fetchWithTimeout(url = '', options = {}, timeout = 10000) {
    const controller = new AbortController()
    const tid = setTimeout(() => controller.abort(), timeout);
    return fetch(url, {
        ...options,
        signal: controller.signal,
        headers: { ...common_headers }
    })
        .then(response => {
            // 处理响应
            return response
        })
        .catch(err => {
            if (err.name === 'AbortError') {
                console.error('请求超时')
            } else {
                console.error('请求失败', err)
            }
            throw err
        }).finally(() => {
            clearTimeout(tid)
        })
}

//查流量使用情况
async function getDataUsage() {
    try {
        const res = await getData(new URLSearchParams({
            cmd: 'flux_data_volume_limit_switch,data_volume_limit_switch,data_volume_limit_unit,data_volume_limit_size,data_volume_alert_percent,monthly_tx_bytes,monthly_rx_bytes,monthly_time,wan_auto_clear_flow_data_switch,traffic_clear_date,',
            multi_data: 1
        }))
        return res
    } catch {
        return null
    }
}

//adb保活
async function adbKeepAlive() {
    try {
        const { result } = await (await fetch(`${KANO_baseURL}/adb_alive`, {
            headers: common_headers
        })).json()
        if (result == undefined || result == null) return false
        return result == "true" ? true : false
    } catch {
        return false
    }

}

//自定义头部
const getCustomHead = async () => {
    try {
        const { text } = await (await fetchWithTimeout(`${KANO_baseURL}/get_custom_head`, {
            headers: { ...common_headers }
        })).json()
        return text || ''
    } catch (e) {
        return '';
    }
}
const setCustomHead = async (text = "") => {
    try {
        const { result, error } = await (await fetchWithTimeout(`${KANO_baseURL}/set_custom_head`, {
            headers: { ...common_headers },
            method: "POST",
            body: JSON.stringify({
                text: text
            })
        })).json()
        return {
            result, error
        }
    } catch (e) {
        return false
    }
}