import express from 'express'
import { Request, Response } from 'express'
import { router } from './router/index.routes'

var app = new Array(3);
for (let i = 3000; i < 3003; i++) {
    app[i] = express()

    app[i].use(express.json())
    app[i].get('/', (req: Request, res: Response) => {
        res.send(`HELLO FROM PORT ${i}`)
    })
    app[i].use(router)

    app[i].listen(i, () => {
        console.log(
            i
        )
    })
}
