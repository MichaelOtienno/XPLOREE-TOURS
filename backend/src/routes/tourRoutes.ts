import Router from "express";
import { createTour, getAllTours } from "../controllers/tourContollers";


const tour_router = Router()

tour_router.post('/createTour',createTour)
tour_router.get('/',getAllTours)
// project_router.delete('/deleteProject',deleteProject)
// project_router.get('/',getAllProjects)
// project_router.get('/singleProject',singleProject)
// project_router.post('/updateProject',projectCompleted)
// project_router.get('/getUsers',getAllUsers)
// project_router.post('/projectStatus',updateStatus)
// project_router.get('/getStatus',getProjectStatus)
// project_router.post('/changeProject',updateProject)


export default tour_router