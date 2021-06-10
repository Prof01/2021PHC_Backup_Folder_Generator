const fs = require('fs');
const path = require('path');
const {zip} =  require('zip-a-folder');

async function createFolders(res, dictsName, distCode, totalSAs) {
    const districtName = dictsName.toUpperCase();
    const totalEAs = 7;

    const mainFolderName = `2021PHC_${districtName} DATA_BACKUP`;

    const readmeMessage = `
        The Steps Below will help you use the Generated template with ease.

        STEPS

        1. Extract ${mainFolderName} folder on your Desktop or your prefered location.

        2. Open the ${mainFolderName} folder and you will see the various SAs Folders.

        3. Under each SA folder you will see the various EAs Folders (eg. EA004_(EnumName)_01) and Supervisor Backup Folder (SUP_(SupName)).

        4. Rename Each EA Backup Folder with the Enumerator Name on that EA by Replacing (EnumName) with the Enumerator Name. (eg. EA004_MOHAMMED HAJARA_01)

        5. Rename the Supervisor Backup Folder under Each SA by Replacing (SupName) with the Supervisor Name. (eg. SUP_ERIC ATIM)

        NOTE the following: 
        1. Backup Folders are Generated for Support Enumerators, you have to do that manually.

        2. Delete Extra Folders, if EAs under an SA are not up to seven(7).

        Thank you!!!
    `

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

    //Create readme.txt write to file
    fs.writeFile(path.join(__dirname, `../storage/folders/${distCode}/${mainFolderName}`, 'readme.txt'), readmeMessage, err => {
        if(err) return;
        // console.log('File written to....');
        
    })

    
    for(let i=0; i < totalSAs; i++){
        const saNumber = i+1;
        const saFolderName = saNumber < 10 ? `SA_0${saNumber}` : `SA_${saNumber}`;
        
        const supFolderName = `SUP_(SupName)`;
        
        // Create the SAs Folder
        await fs.mkdir(path.join(__dirname, `../storage/folders/${distCode}/${mainFolderName}/${saFolderName}`), {}, err => {
            if(err) return;
            // console.log('SAs Folder Created....')
        })
        

        // Generate a Supervisor Folder for Each SA Folder
        await fs.mkdir(path.join(__dirname, `../storage/folders/${distCode}/${mainFolderName}/${saFolderName}/${supFolderName}`), {}, err => {
            if(err) return;
            // console.log('SAs Folder Created....')
        })

        // Generate 7 EAs Folder for Each SA 
        for(let i=0; i < totalEAs; i++){
       
            const eaNumber = i+1;
            const enumFolderName = `EA00${eaNumber}_(EnumName)_01`;
       
            await fs.mkdir(path.join(__dirname, `../storage/folders/${distCode}/${mainFolderName}/${saFolderName}/${enumFolderName}`), {}, err => {
                if(err) return;
                // console.log('SAs Folder Created....')
            })

        }
        
        // Create the District Folder For Storing Zip File
       await fs.mkdir(path.join(__dirname, `../storage/zipfiles/${distCode}`), {}, err => {
            if(err) return;
            // console.log('District Folder Created....')
        })

    }

    // Create Zip File of Folders created
    zip(`./storage/folders/${distCode}`, `./storage/zipfiles/${distCode}/${districtName} BACKUP_FOLDER.zip`)
    .then(() => res.sendFile(path.join(__dirname, `../storage/zipfiles/${distCode}/${districtName} BACKUP_FOLDER.zip`)))
    .catch(err => res.status(500).send('<h2>Oops Request Timeout. Retry Again.</h2>'))

}

module.exports = createFolders