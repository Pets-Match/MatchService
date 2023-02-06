import { Request, Response } from "express";
import { prisma } from "../service/prisma";


class GetAnimalToMatch {
    async execute(req: Request, res: Response) {
        const { ids } = req.body
        const { petid } = req.headers



        var query = ids.map((element: number) => {
            return {
                id: {
                    equals: element
                }
            }
        })


        query.push({
            id: {
                equals: Number(petid)
            }
        })

        const petToBeSent = await prisma.pet.findFirst({
            where: {
                NOT: query
            }
        })

        return res.status(200).json(petToBeSent)
    }
}

export { GetAnimalToMatch }