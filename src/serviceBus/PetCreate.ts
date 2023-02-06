import { Request, Response } from "express";
import { prisma } from '../service/prisma'

class PetCreate {
    async execute(req: Request, res: Response) {
        try {
            const petBody = req.body

            const pet = await prisma.pet.create({
                data: petBody
            })


            return res.status(200).json(pet)
        } catch (err: any) {
            return res.status(400).json(err.message)
        }
    }
}

export { PetCreate }