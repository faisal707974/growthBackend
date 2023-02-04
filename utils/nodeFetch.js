import fetch from "node-fetch";

export const getData = async (url) => {

    try {
        const response = await fetch(url)
        const doc = await response.text()
        return doc
    }catch(err){
        console.log(err)
        throw new Error('invalid url')
    }
}