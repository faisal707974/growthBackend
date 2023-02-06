import express from 'express'
import { favInsight, getInsights, listInsights, removeInsight } from '../controllers/InsightsController.js'

const router = express.Router()

router.route('/').get((req, res) => {
    res.send('<h1>Growth.cx</h1>')
})
router.route('/getInsights').post(getInsights)
router.route('/listInsights').get(listInsights)
router.route('/removeInsights/:id').delete(removeInsight)
router.route('/FavInsights/:id').patch(favInsight)


export default router