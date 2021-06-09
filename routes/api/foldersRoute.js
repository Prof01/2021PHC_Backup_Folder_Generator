const express = require('express');
const router = express.Router();
const createFolders = require('../../functions/createFolders');


//Create a new Folder Route
// POST /api/folders/creater
// @ Public Route
router.post('/2021PHC_Backup_Folder', (req, res) => {
    const {
        distName,
        distCode,
        totalSAs
    } = req.body;

    if(!distName || !distCode|| !totalSAs) return res.status(400).json({ msg: 'Please Enter All Fields' })

    // console.log(req.body);
    // Create and Save Folders
    createFolders(res, distName, distCode, parseInt(totalSAs))
});

//Download a zip File Route
// GET /api/folders/download
// @ Public Route
router.get('/download', (req, res) => {
    const {
        distName,
        distCode,
        totalSAs
    } = req.body;

    if(!distName || !totalSAs) return res.status(400).json({ msg: 'Please Enter All Fields' })

    
});


module.exports = router;