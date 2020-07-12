
import { Router } from 'express'
import multer from 'multer'
import { auth } from '../controllers/index'

const router = new Router()

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, new Date().getTime() + '-' + fileName)
    }
});

var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
}).array('photos', 12);

router.post('/', (req, res) => auth.info(req, res))
router.post('/signup', upload, (req, res) => auth.signUp(req, res))
router.post('/login', (req, res) => auth.login(req, res))
router.get('/logout', (req, res) => auth.logout(req, res))

module.exports = router