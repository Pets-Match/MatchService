import { Router } from "express";
import { GetAnimalToMatch } from "../useCase/GetAnimalToMatch";

const match = new GetAnimalToMatch()

const useCasesRoutes = (router: Router): void => {
    router.get('/owner', match.execute.bind(GetAnimalToMatch))
}

export { useCasesRoutes }