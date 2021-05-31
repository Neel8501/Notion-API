const dotenv = require('dotenv').config()           //  import dotenv
const { Client } = require('@notionhq/client')      // import client 
const database_id = process.env.NOTION_DATABASE_ID

//  notion config 
const notion = new Client({
    auth: process.env.NOTION_TOKEN
})

//  export function
module.exports = async function getTasks() {
    const payload = {
        path: `databases/${database_id}/query`,
        method: 'POST'
    }
    const { results } = await notion.request(payload)   //  fetch all database reacords 

    const tasks = results.map((task) => {
        return {
            id: task.id,
            name: task.properties.Name.title[0].text.content,
            dueTime: new Date(task.properties.DueTime.date.start),
            type: task.properties.Type.rich_text[0].text.content,
            tag: task.properties.Tags.select.name,
            completed: task.properties.Completed.checkbox
        }
    })
    return tasks
}
