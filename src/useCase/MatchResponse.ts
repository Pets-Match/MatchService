import { match } from "assert";
import { Request, Response } from "express";
import { prisma } from "../service/prisma";


class MatchResponse {
    async execute(req: Request, res: Response) {
        const { match, petMatchId } = req.body
        const { petid } = req.headers
        const currentPetId = Number(petid)



        const isMatch = await prisma.match.findFirst({
            where: {
                OR: [
                    { petId1: { equals: currentPetId } },
                    { petId1: { equals: petMatchId } }
                ],
                AND: [
                    {
                        OR: [
                            { petId2: { equals: currentPetId } },
                            { petId2: { equals: petMatchId } }

                        ]
                    }
                ]
            }
        })


        if (isMatch) {

            if (isMatch.ownerId1 == Number(req.userId) && isMatch.ownerInterest1) {
                return res.status(200).json({
                    message: "already sent"
                })
            } else if (
                isMatch.ownerId2 == Number(req.userId) && isMatch.ownerInterest2
            ) {
                return res.status(200).json({
                    message: "already sent"
                })
            }



        } else {

            const pet = await prisma.pet.findFirst({
                where: {
                    id: petMatchId
                }
            })

            console.log(pet)

            const createdMatch = await prisma.match.create({
                data: {
                    petId1: Number(petid),
                    petId2: petMatchId,
                    ownerId1: Number(req.userId),
                    ownerId2: pet?.ownerId,
                    ownerInterest1: match
                }
            })
            return res.send({ message: 'Ok' })
        }

    }
}

export { MatchResponse }