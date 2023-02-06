import { Request, Response } from "express";
import { prisma } from "../service/prisma";


class GetAnimalToMatch {
    async execute(req: Request, res: Response) {
        const { petid } = req.headers

        var list: any = []

        list.push({
            id: {
                equals: Number(petid)
            }
        })

        const alreadyVoted1 = await prisma.match.findMany({
            where: {
                petId1: { equals: Number(petid) },
            }
        })

        const alreadyVoted2 = await prisma.match.findMany({
            where: {
                petId2: { equals: Number(petid) },
            }
        })


        for (var i = 0; i < alreadyVoted1.length; i++) {
            if (alreadyVoted1[i].ownerInterest1 != null) {
                list.push({
                    id: {
                        equals: alreadyVoted1[i].petId2
                    }
                })

            }
        }


        for (var i = 0; i < alreadyVoted2.length; i++) {
            if (alreadyVoted2[i].ownerInterest2 != null) {
                list.push({
                    id: {
                        equals: alreadyVoted2[i].petId1
                    }
                })

            }
        }



        const myPets = await prisma.pet.findMany({
            where: {
                ownerId: Number(req.userId)
            }
        })

        for (var i = 0; i < myPets.length; i++) {
            list.push({
                id: {
                    equals: myPets[i].id
                }
            })

        }

        const myPet = await prisma.pet.findUnique({
            where: {
                id: Number(petid)
            }
        })

        const petToBeSent = await prisma.pet.findFirst({
            where: {
                NOT: list,
                AND: {
                    NOT: { gender: { equals: myPet?.gender } }
                }
            }
        })


        if (petToBeSent == null) {
            return res.status(404).json(petToBeSent)
        }

        return res.status(200).json(petToBeSent)
    }
}

export { GetAnimalToMatch }