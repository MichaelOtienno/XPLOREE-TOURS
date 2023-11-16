import Router from "express";
import { createTour, deleteTour, getAllTours, updateTour } from "../controllers/tourContollers";
import multer from "multer";


const tour_router = Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './images');
    },
    filename: function (req, file, cb) {
      cb(null, `${uuidv4()}_${file.originalname}`);
    }
  });

  
const upload = multer({ storage: storage });

tour_router.post('/createTour',upload.single('tourImage'),createTour)
tour_router.get('/',getAllTours),
tour_router.post('/updateTour',updateTour)
tour_router.delete('/deleteTour',deleteTour)
// project_router.get('/',getAllProjects)
// project_router.get('/singleProject',singleProject)
// project_router.post('/updateProject',projectCompleted)
// project_router.get('/getUsers',getAllUsers)
// project_router.post('/projectStatus',updateStatus)
// project_router.get('/getStatus',getProjectStatus)
// project_router.post('/changeProject',updateProject)


export default tour_router

function uuidv4() {
    throw new Error("Function not implemented.");
}
