import { match } from "assert";
import { Request, Response } from "express";
import { prisma } from "../service/prisma";


class MatchResponse {
    async execute(req: Request, res: Response) {
        const { match, petMatchId } = req.body
        const { petid } = req.headers
        const currentPetId = Number(petid)


        try {
            if (currentPetId == Number(petid)) {
                throw new Error('You cannot match your own pet')
            }


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

                if (isMatch.ownerId1 == Number(req.userId) && isMatch.ownerInterest1 != null) {
                    return res.status(200).json({
                        message: "already sent"
                    })
                } else if (
                    isMatch.ownerId2 == Number(req.userId) && isMatch.ownerInterest2 != null
                ) {
                    return res.status(200).json({
                        message: "already sent"
                    })
                } else if (isMatch.ownerId1) {

                    const nMatch = await prisma.match.update({
                        where: {
                            petId1_petId2: {
                                petId1: isMatch.petId1,
                                petId2: isMatch.petId2
                            }
                        },
                        data: {
                            ownerId2: Number(req.userId),
                            ownerInterest2: match
                        }
                    })


                    if (nMatch.ownerInterest1 == true && nMatch.ownerInterest2 == true) {
                        return res.status(200).json({
                            message: "IT'S A MATCH!!!"
                        })
                    } else if (nMatch.ownerInterest1 == true && nMatch.ownerInterest2 == false) {
                        return res.status(200).json({
                            message: "You missed a match"
                        })
                    }



                } else if (isMatch.ownerId2) {

                    const nMatch = await prisma.match.update({
                        where: {
                            petId1_petId2: {
                                petId1: isMatch.petId1,
                                petId2: isMatch.petId2
                            }
                        },
                        data: {
                            ownerId1: Number(req.userId),
                            ownerInterest1: match
                        }
                    })

                    return res.status(200).json({
                        nMatch
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

        } catch (err: any) {
            return res.status(400).json({ message: err.message })
        }
    }
}

export { MatchResponse }