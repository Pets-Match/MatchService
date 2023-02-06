import { Request, Response } from "express";
import { prisma } from "../service/prisma";


class GetMyMatches {
    async execute(req: Request, res: Response) {

        const { petid } = req.headers

        var list: any = []

        const match = await prisma.match.findMany({
            where: {
                OR: [
                    {
                        ownerId1: {
                            equals: Number(req.userId)
                        }
                    },
                    {
                        ownerId2: {
                            equals: Number(req.userId)
                        }
                    }
                ],
                AND: [
                    {
                        OR: [
                            {
                                petId1: {
                                    equals: Number(petid)
                                }
                            },
                            {
                                petId2: {
                                    equals: Number(petid)
                                }
                            }
                        ]
                    }
                ]
            }

        })

        console.log(match)

        return res.send(match)

    }
}

export { GetMyMatches }