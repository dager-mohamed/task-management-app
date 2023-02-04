import {config} from 'dotenv'
config();
import { createApp } from './utils'
import express from 'express'
import path from 'path'

async function main(){
    const app = await createApp()
    app.use(express.static(path.join(__dirname, "../../frontend/dist")))

    app.get("*", (_, res) => {
        res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"), (err) => {
            res.status(500).send(err)
        })
    })

    app.listen(process.env.PORT, () => console.log(`[EXPRESS] listening on ${process.env.PORT} port`))
}
main()