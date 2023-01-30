import { Router } from "express";
import { useCasesRoutes } from "./useCases.routes";

const router = Router()

useCasesRoutes(router)

export { router }