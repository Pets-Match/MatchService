import { Router } from "express";
import { authMiddleware } from "../middleware/authmiddleware";
import { GetAnimalToMatch, MatchResponse } from "../useCase/";

const match = new GetAnimalToMatch()
const matchresponse = new MatchResponse()

const useCasesRoutes = (router: Router): void => {
    router.get('/owner', authMiddleware, match.execute.bind(GetAnimalToMatch))
    router.get('/match-response', authMiddleware, matchresponse.execute.bind(MatchResponse))
}

export { useCasesRoutes }