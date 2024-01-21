require('dotenv').config();
import request from "request";

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN

const IMAGE_GET_STARTED = 'https://media.istockphoto.com/id/1079901206/vi/anh/k%E1%BA%BFt-xu%E1%BA%A5t-3d-n%E1%BB%99i-th%E1%BA%A5t-nh%C3%A0-h%C3%A0ng-sang-tr%E1%BB%8Dng.jpg?s=2048x2048&w=is&k=20&c=-8CeouwS86UEd5eGtkON8V7H-yZxy6OEzYKburc02Qs='

let callSendAPI = (sender_psid, response) => {
    // Construct the message body
    let request_body = {
        "recipient": {
            "id": sender_psid
        },
        "message": response
    }

    // Send the HTTP request to the Messenger Platform
    request({
        "uri": "https://graph.facebook.com/v9.0/me/messages",
        "qs": { "access_token": PAGE_ACCESS_TOKEN },
        "method": "POST",
        "json": request_body
    }, (err, res, body) => {
        if (!err) {
            console.log('message sent!')
        } else {
            console.error("Unable to send message:" + err);
        }
    });
}

let getUserName = (sender_psid,) => {
    return new Promise((resolve, reject) => {

        // Send the HTTP request to the Messenger Platform
        request({
            "uri": `https://graph.facebook.com/${sender_psid}?fields=first_name,last_name,name,profile_pic&access_token=${PAGE_ACCESS_TOKEN}`,
            "method": "GET",
        }, (err, res, body) => {
            console.log(body);
            if (!err) {
                body = JSON.parse(body);
                let username = body.name;
                resolve(username);
            } else {
                console.error("Unable to send message:" + err);
                reject(err);
            }
        })
    });
}


getStartedTemplate = () => {
    let response = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [{
                    "title": "Chào mừng bạn đến với nhà hàng MinhNhatTran",
                    "subtitle": "Dưới đây là các lựa chọn cho nhà hàng",
                    "image_url": IMAGE_GET_STARTED,
                    "buttons": [
                        {
                            "type": "postback",
                            "title": "MENU CHÍNH!",
                            "payload": "MAIN_MENU",
                        },
                        {
                            "type": "postback",
                            "title": "ĐẶT BÀN!",
                            "payload": "RESERVE_TABLE",
                        },
                        {
                            "type": "postback",
                            "title": "HƯỚNG DẪN SỬ DỤNG BOT",
                            "payload": "GUIDE_TO_USE",
                        }
                    ],
                }]
            }
        }
    }
    return response;
}


let handleGetStarted = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let username = await getUserName(sender_psid);
            let response1 = { "text": `Hi. Chào mừng bạn ${username}!` }
            let response2 = getStartedTemplate();

            // send text message
            await callSendAPI(sender_psid, response1)

            // send generic template message
            await callSendAPI(sender_psid, response2)
            resolve('Done');
        } catch (error) {
            reject(error);
        }
    })
}

let getMainMenuTemplate = () => {
    let response = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [
                    {
                        "title": "Menu của nhà hàng",
                        "subtitle": "Chúng tôi hân hạnh mang đến cho bạn thực đơn phong phú cho bữa trưa hoặc bữa tối.",
                        "image_url": IMAGE_GET_STARTED,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "BỮA TRƯA",
                                "payload": "LUNCH_MENU",
                            },
                            {
                                "type": "postback",
                                "title": "BỮA TỐI",
                                "payload": "DINNER_MENU",
                            },
                        ],
                    },
                    {
                        "title": "Giờ mở cửa",
                        "subtitle": "T2 - T6 10 giờ - 11 giờ || T7 17 giờ - 22 giờ || CN 17 giờ - 21 giờ ",
                        "image_url": IMAGE_GET_STARTED,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "ĐẶT BÀN",
                                "payload": "RESERVE_TABLE",
                            },
                        ],
                    },
                    {
                        "title": "Không gian nhà hàng",
                        "subtitle": "Nhà hàng có sức chưa lên đến 300 ghế ngồi và phục vụ các bữa tiếc lớn",
                        "image_url": IMAGE_GET_STARTED,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "CHI TIẾT",
                                "payload": "SHOW_ROOMS",
                            },
                        ],
                    },

                ]
            }
        }
    }
    return response;
}

let handleSendMainMenu = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response1 = getMainMenuTemplate();

            // send generic template message
            await callSendAPI(sender_psid, response1)
            resolve('Done');
        } catch (error) {
            reject(error);
        }
    })
}

module.exports = {
    handleGetStarted,
    handleSendMainMenu,
}