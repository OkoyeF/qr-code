import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";

inquirer
  .prompt([
    {
      message: "Type in your URL: ",
      name: "URL",
    },
  ])
  .then((answers) => {
    const url = answers.URL;
    const qr_svg = qr.image(url); // Create QR code
    qr_svg.pipe(fs.createWriteStream("qr_img.png")); // Write QR code to file

    fs.writeFile("URL.txt", url, (err) => {
      if (err) throw err;
      console.log("This file has been saved!");
    })
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.error("Prompt couldn't be rendered in the current environment");
    } else {
      console.error("Something else went wrong:", error);
    }
  });

/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.

3. Create a txt file to save the user input using the native fs node module.
*/
