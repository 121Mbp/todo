import { useState } from 'react'
import axios from 'axios'

let baseURL = ''
const hostname = window && window.location && window.location.hostname
const KEY_ID = 'SEvPAPiVgSanzqVPoJR_2NyKzDj9gJTY9a4o7tIyvz8'
//'nwctiH8dWhmJ6uFqOqcdilngx0k_q3BbSyers9jUovM'
//'SEvPAPiVgSanzqVPoJR_2NyKzDj9gJTY9a4o7tIyvz8' 
//'8vV5Go1KA59HhrrlPRyhHDKiqJjp7guifNHNyggmDTY'
//'9uD6skA0QAeB2j1tPDqo45u1Pz2C79splk0LT4mlDp0'

if(hostname === 'localhost') {
    baseURL = 'http://localhost:8081'
}

export const todoAPI = async (api, method, params) => {    
    try {
        const response = await axios({
            method: method,
            url: baseURL + api,
            data: params
        })
        return response
    } catch (error) {
        throw error
    }
}

export const randomBG = async () => {
    try {
        const response = await axios(`https://api.unsplash.com/photos/random/?client_id=${KEY_ID}`)
        return response
    } catch (err) {
        return replace
    }
}

const replace = {
    "data": {
        "urls": {
            "raw": "https://images.unsplash.com/photo-1700406788223-2b053ac814ab?ixid=M3wzNzg1Njd8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDE4OTE5ODl8&ixlib=rb-4.0.3",
            "full": "https://images.unsplash.com/photo-1700406788223-2b053ac814ab?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzNzg1Njd8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDE4OTE5ODl8&ixlib=rb-4.0.3&q=85",
            "regular": "https://images.unsplash.com/photo-1700406788223-2b053ac814ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNzg1Njd8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDE4OTE5ODl8&ixlib=rb-4.0.3&q=80&w=1080",
            "small": "https://images.unsplash.com/photo-1700406788223-2b053ac814ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNzg1Njd8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDE4OTE5ODl8&ixlib=rb-4.0.3&q=80&w=400",
            "thumb": "https://images.unsplash.com/photo-1700406788223-2b053ac814ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNzg1Njd8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDE4OTE5ODl8&ixlib=rb-4.0.3&q=80&w=200",
            "small_s3": "https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1700406788223-2b053ac814ab"
        },
        "user": {
            "username": "oweni",
            "name": "Howen",
            "portfolio_url": "wechat:owenii",
            "location": "Beijing",
        },
        "tags": [
            {
                "source": {
                    "title": "Girls photos & images",
                    "subtitle": "Download free girls photos & images",
                    "description": "Choose from a curated selection of girls photos. Always free on Unsplash.",
                    "meta_title": "Best 500+ Girls Pictures [HD] | Download Free Professional Images on Unsplash",
                    "meta_description": "Choose from hundreds of free girls pictures. Download HD girls photos for free on Unsplash.",
                }
            }
        ]
    }
}