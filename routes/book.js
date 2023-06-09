const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();
const BookController = require("../controllers/BookController");

const firebase = require("firebase/app");
const {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} = require("firebase/storage");

const firebaseConfig = {
  apiKey: "AIzaSyCAfXANYYLjmrRyMe_yQbM2jkFuzY5OvuU",
  authDomain: "qltv-1485f.firebaseapp.com",
  projectId: "qltv-1485f",
  databaseURL: "gs://qltv-1485f.appspot.com/",
  storageBucket: "qltv-1485f.appspot.com",
  messagingSenderId: "165219753686",
  appId: "1:165219753686:web:f4453aa11cb8d70341f377",
};

firebase.initializeApp(firebaseConfig);

const storage = getStorage();

const upload = multer({ storage: multer.memoryStorage() });

router.get("/", BookController.getList);
router.get("/detail/:id", BookController.getDetail);
router.get("/:id/comments", BookController.getComments);
router.get("/buy/:userId", BookController.getBuy);

router.post("/add", BookController.addBook);
router.post("/:id/comment", BookController.addComment);

router.post("/uploadFile", upload.single("filename"), async (req, res) => {
  try {
    const storageRef = ref(storage, req.file.originalname);

    await uploadBytes(storageRef, req.file.buffer);

    const downloadURL = await getDownloadURL(storageRef);

    console.log("File uploaded:", downloadURL);

    res.json({ results: downloadURL });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to upload file" });
  }
});

router.put("/update", BookController.updateBook);
router.post("/sold", BookController.soldBook);
router.post("/back", BookController.backBook);
router.post("/uploadFile");

router.delete("/:id", BookController.deleteBook);

module.exports = router;
