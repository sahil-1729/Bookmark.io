
interface prop {
    link: string
}
import getMetaData from 'metadata-scraper'
export default async function GetData() {
    // const getMetaData = require('metadata-scraper')

    async function run() {
        const url = 'https://www.npmjs.com/package/metadata-scraper'
        const data = await getMetaData(url)
        console.log(data)
        return data
    }
    const data = await run()
    console.log(data)
    return data && <div>
        hello {data.description}
    </div>
}

