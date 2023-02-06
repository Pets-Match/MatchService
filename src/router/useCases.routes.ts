import { Router } from "express";
import { authMiddleware } from "../middleware/authmiddleware";
import { GetAnimalToMatch, GetMyMatches, MatchResponse } from "../useCase/";

const match = new GetAnimalToMatch()
const matchresponse = new MatchResponse()
const getMatches = new GetMyMatches()

const useCasesRoutes = (router: Router): void => {
    router.get('/get-animal', authMiddleware, match.execute.bind(GetAnimalToMatch))
    router.get('/match-response', authMiddleware, matchresponse.execute.bind(MatchResponse))
    router.get('/my-matches', authMiddleware, getMatches.execute.bind(GetMyMatches))
}

export { useCasesRoutes }