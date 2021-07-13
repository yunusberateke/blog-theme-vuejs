import serverClient from '@/store/http_client'
import axios from 'axios';

export default {
    async sendMail(_, data) {
        return new Promise((resolve, reject) => {
            serverClient.post(`/sendmail`, data).then(() => {
                resolve("ok");
            }).catch((error) => {
                reject(error);
            })
        })

    },

    async getLocation() {
        axios.get("http://ipinfo.io/json", {
            headers:{
                "Access-Control-Allow-Origin": "*",
                Authorization: "Bearer 21f7a2d0234cca"
            }
        }).then(
            (response) => {
                console.log(response.data);
            }
        )
    }
}
