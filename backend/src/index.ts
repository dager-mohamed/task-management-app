import {config} from 'dotenv'
config();
import { createApp } from './utils'

async function main(){
    const app = await createApp()
    app.get('/', (req, res) => res.send('ok'))
    app.listen(process.env.PORT, () => console.log(`[EXPRESS] listening on ${process.env.PORT} port`))
}
main()