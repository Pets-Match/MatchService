import { Router, Request, Response } from "express";
import { PetCreate } from "../serviceBus/PetCreate";

const petBus = new PetCreate()

const busCasesRoutes = (router: Router): void => {
    router.post('/pet-bus', petBus.execute.bind(PetCreate))

}

export { busCasesRoutes }