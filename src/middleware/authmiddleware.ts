import { Request, Response, NextFunction } from "express";
import axios from 'axios'
import { prisma } from "../service/prisma";

async function authMiddleware(
    req: Request, res: Response, next: NextFunction
) {

    try {
        const user = await axios.get('http://localhost:8080/auth/middleware', { headers: req.headers })

        const pet = await prisma.pet.findFirst({
            where: {
                AND: [
                    {
                        id: {
                            equals: Number(req.headers.petid)
                        }
                    },
                    {
                        ownerId: {
                            equals: user.data.id
                        }
                    }
                ]
            }
        })

        if (!pet) {
            return res.status(404).json({ message: "THAT'S NOT YOUR PET!" })

        }

        req.userId = user.data.id;
        return next()

    } catch (error: any) {

        console.log(error)
        return res.status(401).json(error.message)
    }


}

export { authMiddleware }