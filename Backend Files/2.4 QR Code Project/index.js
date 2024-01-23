/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/
import inquirer from 'inquirer';
import qr from 'qr-image';
import fs from 'fs';

inquirer
  .prompt([
    {
        message:"Enter URL",
        name:"URL"
    }
  ])
  .then((answers) => {
    var img = qr.image(answers.URL);
    img.pipe(fs.createWriteStream('qr.png'));
    writeFile('URL.txt', answers.URL, 'utf8'); 
 
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });