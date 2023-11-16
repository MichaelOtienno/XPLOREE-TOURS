"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tourContollers_1 = require("../controllers/tourContollers");
const multer_1 = __importDefault(require("multer"));
const tour_router = (0, express_1.default)();
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './images');
    },
    filename: function (req, file, cb) {
        cb(null, `${uuidv4()}_${file.originalname}`);
    }
});
const upload = (0, multer_1.default)({ storage: storage });
tour_router.post('/createTour', upload.single('tourImage'), tourContollers_1.createTour);
tour_router.get('/', tourContollers_1.getAllTours),
    tour_router.post('/updateTour', tourContollers_1.updateTour);
tour_router.delete('/deleteTour', tourContollers_1.deleteTour);
// project_router.get('/',getAllProjects)
// project_router.get('/singleProject',singleProject)
// project_router.post('/updateProject',projectCompleted)
// project_router.get('/getUsers',getAllUsers)
// project_router.post('/projectStatus',updateStatus)
// project_router.get('/getStatus',getProjectStatus)
// project_router.post('/changeProject',updateProject)
exports.default = tour_router;
function uuidv4() {
    throw new Error("Function not implemented.");
}
