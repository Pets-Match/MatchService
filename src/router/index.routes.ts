import { Router } from "express";
import { useCasesRoutes } from "./useCases.routes";
import { busCasesRoutes } from './busCase.routes'
const router = Router()

useCasesRoutes(router)
busCasesRoutes(router)

export { router }