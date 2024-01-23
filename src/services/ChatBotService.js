require('dotenv').config();
import request from "request";

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN

const IMAGE_GET_STARTED = 'https://media.istockphoto.com/id/1079901206/vi/anh/k%E1%BA%BFt-xu%E1%BA%A5t-3d-n%E1%BB%99i-th%E1%BA%A5t-nh%C3%A0-h%C3%A0ng-sang-tr%E1%BB%8Dng.jpg?s=2048x2048&w=is&k=20&c=-8CeouwS86UEd5eGtkON8V7H-yZxy6OEzYKburc02Qs='
const IMAGE_MAIN_MENU_TABLE = 'https://th.bing.com/th/id/OIP.PDLQVIn6xQSHaFT9ndvzbgHaEK?w=289&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7'
const IMAGE_MAIN_MENU_OPENHOUR = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNWDm0CvVK8gTe9tk9K-wW_xIpvyodIndzrw&usqp=CAU'
const IMAGE_MAIN_MENU_SPACE = 'https://maisonmando.com/wp-content/uploads/2019/11/khong-gian-nha-hang-maison-mando-7.jpg'
const IMAGE_VIEW_APPETIZERS = 'https://forevermark.vn/wp-content/uploads/2023/04/y-nghia-mon-khai-vi-tiec-cuoi.jpg'
const IMAGE_VIEW_CHICKEN = 'https://yummyday.vn/uploads/images/ga-hap-la-chanh.jpg'
const IMAGE_VIEW_MEAT = 'https://adelaidetuanbao.com/wp-content/uploads/2022/04/cach-lam-thit-be-xao-sa-ot.jpg'
const IMAGE_VIEW_DESSERT = 'https://i.ytimg.com/vi/5aYmxWf2JH8/maxresdefault.jpg'

const IMAGE_DETAIL_APPERTIZER_1 = 'https://cdn.tgdd.vn/Files/2022/04/04/1423782/goi-y-8-mon-nguoi-khai-vi-cho-nhung-buoi-tiec-hoi-hop-voi-gia-dinh-202204040912057499.jpg'
const IMAGE_DETAIL_APPERTIZER_2 = 'https://cdn.tgdd.vn/Files/2022/04/04/1423782/goi-y-8-mon-nguoi-khai-vi-cho-nhung-buoi-tiec-hoi-hop-voi-gia-dinh-202204040914134517.jpg'
const IMAGE_DETAIL_APPERTIZER_3 = 'https://cdn.tgdd.vn/Files/2022/04/04/1423782/goi-y-8-mon-nguoi-khai-vi-cho-nhung-buoi-tiec-hoi-hop-voi-gia-dinh-202204040915196807.jpg'

const IMAGE_DETAIL_CHICKEN_1 = 'https://cdn.tgdd.vn/Files/2020/11/30/1310299/tong-hop-cac-mon-ngon-tu-ga-sieu-ngon-de-nau-tai-nha-202011300908140722.jpg'
const IMAGE_DETAIL_CHICKEN_2 = 'https://cdn.tgdd.vn/Files/2020/11/30/1310299/tong-hop-cac-mon-ngon-tu-ga-sieu-ngon-de-nau-tai-nha-202011300909335312.jpg'
const IMAGE_DETAIL_CHICKEN_3 = 'https://cdn.tgdd.vn/Files/2020/11/30/1310299/tong-hop-cac-mon-ngon-tu-ga-sieu-ngon-de-nau-tai-nha-202011300911079997.jpg'

const IMAGE_DETAIL_MEAT_1 = 'https://forevermark.vn/wp-content/uploads/2023/06/bo-cuon-pho-mai-1.jpg'
const IMAGE_DETAIL_MEAT_2 = 'https://forevermark.vn/wp-content/uploads/2023/06/bo-sot-chanh-day-1.jpg'
const IMAGE_DETAIL_MEAT_3 = 'https://forevermark.vn/wp-content/uploads/2023/06/thit-bo-chien-xu.jpg'

const IMAGE_DETAIL_DESSERT_1 = 'https://forevermark.vn/wp-content/uploads/2023/04/cac-loai-trai-cay-trang-mieng-dam-cuoi.jpg'
const IMAGE_DETAIL_DESSERT_2 = 'https://forevermark.vn/wp-content/uploads/2023/04/cac-loai-banh-trang-mieng-dam-cuoi.jpg'
const IMAGE_DETAIL_DESSERT_3 = 'https://forevermark.vn/wp-content/uploads/2023/04/cac-loai-kem-sua-chua-trang-mieng-dam-cuoi.jpg'

const IMAGE_BACK_MAIN_MENU = 'https://media.istockphoto.com/id/1079901206/vi/anh/k%E1%BA%BFt-xu%E1%BA%A5t-3d-n%E1%BB%99i-th%E1%BA%A5t-nh%C3%A0-h%C3%A0ng-sang-tr%E1%BB%8Dng.jpg?s=2048x2048&w=is&k=20&c=-8CeouwS86UEd5eGtkON8V7H-yZxy6OEzYKburc02Qs='

const IMAGE_DETAIL_ROOMS = 'https://phongcachmoc.vn/upload/images/tin-tuc/20%20mau%20nha%20hang%20dep/update-07-2022/noi-that-nha-hang-kokugyu-1.jpg'
const IMAGE_GIF_WELCOME = 'https://media1.giphy.com/media/iDITIbZ3XoMvOZ1NvO/giphy.gif?cid=ecf05e4733x0ishzemvkpqvsub2sfadjo8ldipbsjuswwbq0&ep=v1_gifs_search&rid=giphy.gif&ct=g';

let callSendAPI = async (sender_psid, response) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Construct the message body
            let request_body = {
                "recipient": {
                    "id": sender_psid
                },
                "message": response
            }

            await sendMarkReadMessage(sender_psid);
            await sendTypingOn(sender_psid);
            // Send the HTTP request to the Messenger Platform
            request({
                "uri": "https://graph.facebook.com/v9.0/me/messages",
                "qs": { "access_token": PAGE_ACCESS_TOKEN },
                "method": "POST",
                "json": request_body
            }, (err, res, body) => {
                if (!err) {
                    resolve('message sent!')
                } else {
                    console.error("Unable to send message:" + err);
                }
            });
        } catch (error) {
            reject(error)
        }
    })
}
let sendTypingOn = (sender_psid) => {
    // Construct the message body
    let request_body = {
        "recipient": {
            "id": sender_psid
        },
        "sender_action": "typing_on"
    }

    // Send the HTTP request to the Messenger Platform
    request({
        "uri": `https://graph.facebook.com/v2.6/me/messages?access_token=${PAGE_ACCESS_TOKEN}`,
        "qs": { "access_token": PAGE_ACCESS_TOKEN },
        "method": "POST",
        "json": request_body
    }, (err, res, body) => {
        if (!err) {
            console.log('Send typing on sent!')
        } else {
            console.error("Unable to send typing on:" + err);
        }
    });
}
let sendMarkReadMessage = (sender_psid) => {
    // Construct the message body
    let request_body = {
        "recipient": {
            "id": sender_psid
        },
        "sender_action": "mark_seen"
    }

    // Send the HTTP request to the Messenger Platform
    request({
        "uri": `https://graph.facebook.com/v2.6/me/messages?access_token=${PAGE_ACCESS_TOKEN}`,
        "qs": { "access_token": PAGE_ACCESS_TOKEN },
        "method": "POST",
        "json": request_body
    }, (err, res, body) => {
        if (!err) {
            console.log('Send mark seen sent!')
        } else {
            console.error("Unable to send mark seen:" + err);
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


let getStartedTemplate = (sender_psid) => {
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
                            "type": "web_url",
                            "url": `${process.env.URL_WEB_VIEW_ORDER}/${sender_psid}`,
                            "title": "ĐẶT BÀN",
                            "webview_height_ratio": "tall",
                            "messenger_extensions": true
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
let getStartedQuickReplyTemplate = (sender_psid) => {
    let response = {
        "text": "Dưới đây là các lựa chọn cho nhà hàng:",
        "quick_replies": [
            {
                "content_type": "text",
                "title": "MENU CHÍNH",
                "payload": "MAIN_MENU",
            },
            {
                "content_type": "text",
                "title": "HƯỚNG DẪN SỬ DỤNG BOT",
                "payload": "GUIDE_TO_USE",
            }
        ]
    }

    return response;
}
let getImageGetStartedTemplate = () => {
    let response = {
        "attachment": {
            "type": "image",
            "payload": {
                "url": IMAGE_GIF_WELCOME,
                "is_reusable": true
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
            // let response2 = getStartedTemplate(sender_psid);

            // send an image 
            let response2 = getImageGetStartedTemplate();

            // send a quick reply
            let response3 = getStartedQuickReplyTemplate(sender_psid);

            // send text message
            await callSendAPI(sender_psid, response1)

            // send generic template message
            await callSendAPI(sender_psid, response2)

            // send generic template message
            await callSendAPI(sender_psid, response3)
            resolve('Done');
        } catch (error) {
            reject(error);
        }
    })
}

let getMainMenuTemplate = (sender_psid) => {
    let response = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [
                    {
                        "title": "Menu của nhà hàng",
                        "subtitle": "Chúng tôi hân hạnh mang đến cho bạn thực đơn phong phú cho bữa trưa hoặc bữa tối.",
                        "image_url": IMAGE_MAIN_MENU_TABLE,
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
                        "subtitle": "T2 - T6 10 giờ - 11 giờ | T7 17 giờ - 22 giờ | CN 17 giờ - 21 giờ ",
                        "image_url": IMAGE_MAIN_MENU_OPENHOUR,
                        "buttons": [
                            {
                                "type": "web_url",
                                "url": `${process.env.URL_WEB_VIEW_ORDER}/${sender_psid}`,
                                "title": "ĐẶT BÀN",
                                "webview_height_ratio": "tall",
                                "messenger_extensions": true
                            },
                        ],
                    },
                    {
                        "title": "Không gian nhà hàng",
                        "subtitle": "Nhà hàng có sức chưa lên đến 300 ghế ngồi và phục vụ các bữa tiếc lớn",
                        "image_url": IMAGE_MAIN_MENU_SPACE,
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
            let response1 = getMainMenuTemplate(sender_psid);

            // send generic template message
            await callSendAPI(sender_psid, response1)
            resolve('Done');
        } catch (error) {
            reject(error);
        }
    })
}

let getLunchMainMenuTemplate = () => {
    let response = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [
                    {
                        "title": "Món khai vị",
                        "subtitle": "Nhà hàng có nhiều món khai vị hấp dẫn",
                        "image_url": IMAGE_VIEW_APPETIZERS,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "XEM CHI TIẾT",
                                "payload": "VIEW_APPETIZERS",
                            },
                        ],
                    },
                    {
                        "title": "Gà",
                        "subtitle": "Nhà hàng có nhiều món chế biến từ thịt gà hấp dẫn",
                        "image_url": IMAGE_VIEW_CHICKEN,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "XEM CHI TIẾT",
                                "payload": "VIEW_CHICKEN",
                            },
                        ],
                    },
                    {
                        "title": "Bò",
                        "subtitle": "Nhà hàng có nhiều món chế biến từ thịt bò hấp dẫn",
                        "image_url": IMAGE_VIEW_MEAT,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "XEM CHI TIẾT",
                                "payload": "VIEW_MEAT",
                            },
                        ],
                    },
                    {
                        "title": "Món tráng miệng",
                        "subtitle": "Nhà hàng có nhiều món tráng miệng hấp dẫn",
                        "image_url": IMAGE_VIEW_DESSERT,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "XEM CHI TIẾT",
                                "payload": "VIEW_DESSERT",
                            },
                        ],
                    },
                    {
                        "title": "Quay trở lại",
                        "subtitle": "Quay trở lại Menu chính",
                        "image_url": IMAGE_BACK_MAIN_MENU,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "QUAY TRỞ LẠI",
                                "payload": "BACK_TO_MAIN_MENU",
                            },
                        ],
                    },

                ]
            }
        }
    }
    return response;
}
let handleSendLunchMainMenu = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response1 = getLunchMainMenuTemplate();

            // send generic template message
            await callSendAPI(sender_psid, response1)
            resolve('Done');
        } catch (error) {
            reject(error);
        }
    })
}

let getDinnerMainMenuTemplate = () => {
    let response = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [
                    {
                        "title": "Món khai vị",
                        "subtitle": "Nhà hàng có nhiều món khai vị hấp dẫn",
                        "image_url": IMAGE_VIEW_APPETIZERS,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "XEM CHI TIẾT",
                                "payload": "VIEW_APPETIZERS",
                            },
                        ],
                    },
                    {
                        "title": "Gà hấp",
                        "subtitle": "Gà hấp lá chanh - Gà hấp bia",
                        "image_url": IMAGE_VIEW_CHICKEN,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "XEM CHI TIẾT",
                                "payload": "VIEW_CHICKEN",
                            },
                        ],
                    },
                    {
                        "title": "Bê",
                        "subtitle": "Bê xào sả ớt - Bê hấp sả",
                        "image_url": IMAGE_VIEW_MEAT,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "XEM CHI TIẾT",
                                "payload": "VIEW_MEAT",
                            },
                        ],
                    },
                    {
                        "title": "Món tráng miệng",
                        "subtitle": "Rau câu 7 màu",
                        "image_url": IMAGE_VIEW_DESSERT,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "XEM CHI TIẾT",
                                "payload": "VIEW_DESSERT",
                            },
                        ],
                    },
                    {
                        "title": "Quay trở lại",
                        "subtitle": "Quay trở lại Menu chính",
                        "image_url": IMAGE_BACK_MAIN_MENU,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "QUAY TRỞ LẠI",
                                "payload": "BACK_TO_MAIN_MENU",
                            },
                        ],
                    },

                ]
            }
        }
    }
    return response;
}
let handleSendDinnerMainMenu = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response1 = getDinnerMainMenuTemplate();

            // send generic template message
            await callSendAPI(sender_psid, response1)
            resolve('Done');
        } catch (error) {
            reject(error);
        }
    })
}

let handleBackToMainMenu = async (sender_psid) => {
    await handleSendMainMenu(sender_psid);
}
let handleBackToLunchMainMenu = async (sender_psid) => {
    await handleSendLunchMainMenu(sender_psid);
}

let handleDetailViewAppetizers = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response1 = getDetailViewAppetizerTemplate();

            // send generic template message
            await callSendAPI(sender_psid, response1)
            resolve('Done');
        } catch (error) {
            reject(error);
        }
    })
}
let getDetailViewAppetizerTemplate = () => {
    let response = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [
                    {
                        "title": "Gỏi củ hủ dừa",
                        "subtitle": "30.000đ/1kg",
                        "image_url": IMAGE_DETAIL_APPERTIZER_1,
                    },
                    {
                        "title": "Gỏi ngó sen tôm thịt",
                        "subtitle": "50.000đ/1kg",
                        "image_url": IMAGE_DETAIL_APPERTIZER_2,
                    },
                    {
                        "title": "Thịt nguội bát bửu",
                        "subtitle": "20.000đ/1kg",
                        "image_url": IMAGE_DETAIL_APPERTIZER_3,
                    },
                    {
                        "title": "Quay trở lại",
                        "subtitle": "Quay trở lại menu buổi trưa",
                        "image_url": IMAGE_BACK_MAIN_MENU,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "QUAY TRỞ LẠI",
                                "payload": "BACK_TO_LUNCH_MAIN_MENU",
                            },
                        ],
                    },

                ]
            }
        }
    }
    return response;
}

let getDetailViewChickenTemplate = () => {
    let response = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [
                    {
                        "title": "Gà hấp nước mắm",
                        "subtitle": "280.000đ/phần",
                        "image_url": IMAGE_DETAIL_CHICKEN_1,
                    },
                    {
                        "title": "Gà luộc nước dừa",
                        "subtitle": "250.000đ/phần",
                        "image_url": IMAGE_DETAIL_CHICKEN_2,
                    },
                    {
                        "title": "Lẩu gà thuốc bác",
                        "subtitle": "280.000đ/phần",
                        "image_url": IMAGE_DETAIL_CHICKEN_3,
                    },
                    {
                        "title": "Quay trở lại",
                        "subtitle": "Quay trở lại menu buổi trưa",
                        "image_url": IMAGE_BACK_MAIN_MENU,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "QUAY TRỞ LẠI",
                                "payload": "BACK_TO_LUNCH_MAIN_MENU",
                            },
                        ],
                    },

                ]
            }
        }
    }
    return response;
}
let getDetailViewMeatTemplate = () => {
    let response = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [
                    {
                        "title": "Bò cuộn phô mai",
                        "subtitle": "350.000đ/phần",
                        "image_url": IMAGE_DETAIL_MEAT_1,
                    },
                    {
                        "title": "Bò sốt chanh dây",
                        "subtitle": "300.000đ/phần",
                        "image_url": IMAGE_DETAIL_MEAT_2,
                    },
                    {
                        "title": "Thịt bò chiên xù",
                        "subtitle": "320.000đ/phần",
                        "image_url": IMAGE_DETAIL_MEAT_3,
                    },
                    {
                        "title": "Quay trở lại",
                        "subtitle": "Quay trở lại menu buổi trưa",
                        "image_url": IMAGE_BACK_MAIN_MENU,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "QUAY TRỞ LẠI",
                                "payload": "BACK_TO_LUNCH_MAIN_MENU",
                            },
                        ],
                    },

                ]
            }
        }
    }
    return response;
}
let getDetailViewDessertTemplate = () => {
    let response = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [
                    {
                        "title": "Trái cây tráng miệng",
                        "subtitle": "200.000đ/phần",
                        "image_url": IMAGE_DETAIL_DESSERT_1,
                    },
                    {
                        "title": "Các loại bánh tráng miệng",
                        "subtitle": "220.000đ/phần",
                        "image_url": IMAGE_DETAIL_DESSERT_2,
                    },
                    {
                        "title": "Kem/Sữa chua",
                        "subtitle": "220.000đ/phần",
                        "image_url": IMAGE_DETAIL_DESSERT_3,
                    },
                    {
                        "title": "Quay trở lại",
                        "subtitle": "Quay trở lại menu buổi trưa",
                        "image_url": IMAGE_BACK_MAIN_MENU,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "QUAY TRỞ LẠI",
                                "payload": "BACK_TO_LUNCH_MAIN_MENU",
                            },
                        ],
                    },

                ]
            }
        }
    }
    return response;
}
let handleDetailViewChicken = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response1 = getDetailViewChickenTemplate();

            // send generic template message
            await callSendAPI(sender_psid, response1)
            resolve('Done');
        } catch (error) {
            reject(error);
        }
    })
}
let handleDetailViewMeat = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response1 = getDetailViewMeatTemplate();

            // send generic template message
            await callSendAPI(sender_psid, response1)
            resolve('Done');
        } catch (error) {
            reject(error);
        }
    })
}
let handleDetailViewDessert = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response1 = getDetailViewDessertTemplate();

            // send generic template message
            await callSendAPI(sender_psid, response1)
            resolve('Done');
        } catch (error) {
            reject(error);
        }
    })
}

let getImageRoomTemplate = () => {
    let response = {
        "attachment": {
            "type": "image",
            "payload": {
                "url": IMAGE_DETAIL_ROOMS,
                "is_reusable": true
            }
        }
    }
    return response;
}
let getButtonRoomsTemplate = (sender_psid) => {
    let response = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "button",
                "text": "Nhà hàng có thể phục vụ tối đa 300 khách",
                "buttons": [
                    {
                        "type": "postback",
                        "title": "MENU CHÍNH",
                        "payload": "MAIN_MENU"
                    },
                    {
                        "type": "web_url",
                        "url": `${process.env.URL_WEB_VIEW_ORDER}/${sender_psid}`,
                        "title": "ĐẶT BÀN",
                        "webview_height_ratio": "tall",
                        "messenger_extensions": true
                    },
                ]
            }
        }
    }
    return response;
}
let handleShowDetailRoom = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            // send an image
            let response1 = getImageRoomTemplate();
            let response2 = getButtonRoomsTemplate(sender_psid);

            // send a button template: text, buttons
            // send generic template message
            await callSendAPI(sender_psid, response1)
            await callSendAPI(sender_psid, response2)
            resolve('Done');
        } catch (error) {
            reject(error);
        }
    })
}

module.exports = {
    callSendAPI,
    handleGetStarted,
    handleSendMainMenu,
    handleSendLunchMainMenu,
    handleSendDinnerMainMenu,
    handleBackToMainMenu,
    handleBackToLunchMainMenu,
    handleDetailViewAppetizers,
    handleDetailViewChicken,
    handleDetailViewMeat,
    handleDetailViewDessert,
    handleShowDetailRoom,
    getUserName,
}