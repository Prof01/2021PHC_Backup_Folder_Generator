const fs = require('fs');
const path = require('path');
const {zip} =  require('zip-a-folder');

async function createFolders(res, dictsName, distCode, totalSAs) {
    const districtName = dictsName.toUpperCase();

    const mainFolderName = `2021PHC_${districtName} DATA_BACKUP`;


    // Create the Main District Backup Folder
    await fs.mkdir(path.join(__dirname, `../storage/folders/${distCode}`), {}, async err => {
        if(err) {
            
            // Remove created folders after zipping folders
            await fs.rmdir(`../storage/folders/${distCode}`, function(err) {
                if (err) return 'Error';
                console.log("Successfully removed the empty directory!")
                })

                // Create the District Backup Folder
                await fs.mkdir(path.join(__dirname, `../storage/folders/${distCode}`), {}, err => {
                    if(err) return;
                    // console.log('Main Folder Created....')
                })
            };

        // console.log('Main Folder Created....')
    })

    // Create the District Backup Folder
    await fs.mkdir(path.join(__dirname, `../storage/folders/${distCode}/${mainFolderName}`), {}, err => {
        if(err) return;
        // console.log('Main Folder Created....')
    })
    
    for(let i=0; i < totalSAs; i++){
        const saNumber = i+1;
        const saFolderName = saNumber < 10 ? `SA_0${saNumber}` : `SA_${saNumber}`;
        
        // Create the SAs Folder
       await fs.mkdir(path.join(__dirname, `../storage/folders/${distCode}/${mainFolderName}/${saFolderName}`), {}, err => {
            if(err) return;
            // console.log('SAs Folder Created....')
        })
        
        // Create the District Folder For Storing Zip File
       await fs.mkdir(path.join(__dirname, `../storage/zipfiles/${distCode}`), {}, err => {
            if(err) return;
            // console.log('District Folder Created....')
        })

    }

    // Create Zip File of Folders created
    await zip(`./storage/folders/${distCode}`, `./storage/zipfiles/${distCode}/${districtName} BACKUP_FOLDER.zip`)
    .then(async () => await res.sendFile(path.join(__dirname, `../storage/zipfiles/${distCode}/${districtName} BACKUP_FOLDER.zip`)))
    // .catch(err => res.status(500).send({msg: err}))
    .catch(err => res.status(500).send('<h2>Oops Request Timeout. Retry Again</h2>'))

}

module.exports = createFolders