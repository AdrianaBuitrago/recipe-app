import { Router } from 'express'
// import heartbeat from './heartbeat'
import uploads from './uploads'
import recipes from './recipes'
import ingredients from './ingredients'

const router = Router({ mergeParams: true })

// router.use(heartbeat)
router.use(uploads)
router.use(recipes)
router.use(ingredients)

export default router