import { getData } from "../utils/nodeFetch.js"
import { convert } from "html-to-text"

let userData = []

export const getInsights = async (req, res) => {

    const url = 'https://' + req.body.url
    let doc = ''
    try {
        doc = await getData(url)
    } catch (err) {
        if (err.code === 'ERR_INVALID_URL') {
            res.status(400).json({
                message: 'requested url is invalid'
            })
            return
        } else {
            res.status(400).json({
                message: 'requested url is invalid'
            })
            return
        }
    }

    const text = convert(doc)
    console.log({ text })

    let MediaMatch = text.matchAll(/\[[\w./ ?=_%&-]+(.jpg|.png)[\w./ ?=_%&-]+\]/gmi)
    let MediaLinks = ''
    for (let x of MediaMatch) {
        MediaLinks = MediaLinks + " " + url + x[0].replace(/([\[\]])/g, "")
    }
    // console.log({ MediaLinks })

    const WebMatch = text.matchAll(/(https:|http:)\/\/[\w./ ?=_%&-]+/gmi)
    let WebLinks = ''
    for (let x of WebMatch) {
        WebLinks = WebLinks + " " + x[0]
    }
    // console.log({ WebLinks })

    const MediaLinkRemoved = text.replace(/\[[\w./ ?=_%&-]+(.jpg|.png)[\w./ ?=_%&-]+\]/gmi, "")
    const WebLinkRemoved = MediaLinkRemoved.replace(/(https:|http:)\/\/[\w./ ?=_%&-]+/gmi, "")
    const ClearedText = WebLinkRemoved

    const data = ClearedText.replace(/[^A-Za-z \n\t]+/gmi, "")
    // console.log({data})
    const words = data.split(/[\s,]+/)
    console.log(words.length)


    const obj = {
        id: (Math.random() * 100000).toFixed(0),
        Domain: url,
        WordCount: words.length | 0,
        Favourite: false,
        WebLinks: WebLinks ,
        MediaLinks: MediaLinks
    }

    userData.push(obj)

    res.status(200).json({
        message: "Successfully added",
        addedObj: obj
    })
}

export const listInsights = (req, res) => {
    res.status(200).json({
        message: 'success',
        data: userData
    })
}

export const removeInsight = (req, res) => {

    userData = userData.filter((datom) => {
        return datom.id !== req.params.id
    })
    res.status(200).json({
        message: 'successfully deleted'
    })
}

export const favInsight = (req, res) => {
    userData = userData.map((datom) => {
        if (datom.id === req.params.id) {
            return { ...datom, Favourite: !datom.Favourite }
        } else {
            return datom
        }
    })
    res.status(200).json({
        message: 'favourite status changed'
    })
}