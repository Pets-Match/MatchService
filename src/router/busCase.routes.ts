import { Router, Request, Response } from "express";
import { PetCreate } from "../serviceBus/PetCreate";
import { authMiddleware } from '../middleware/authmiddleware'

const petBus = new PetCreate()

const busCasesRoutes = (router: Router): void => {
    router.post('/pet-bus', petBus.execute.bind(PetCreate))

}

export { busCasesRoutes }