#!/usr/bin/env node

import inquirer from 'inquirer';
import fs from 'fs';

// Function to generate the SVG content based on user input
function generateSVG({ logoText, textColor, shape, shapeColor }) {
  let shapeElement = '';

  // Generate the SVG shape based on user's choice
  switch (shape) {
    case 'circle':
      shapeElement = `<circle cx="150" cy="100" r="80" fill="${shapeColor}" />`;
      break;
    case 'square':
      shapeElement = `<rect x="50" y="50" width="200" height="200" fill="${shapeColor}" />`;
      break;
    case 'triangle':
      shapeElement = `<polygon points="150,20 280,180 20,180" fill="${shapeColor}" />`;
      break;
  }

  // Return the full SVG content
  return `
    <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
      ${shapeElement}
      <text x="150" y="125" font-size="60" fill="${textColor}" text-anchor="middle" dy=".3em">${logoText}</text>
    </svg>
  `;
}

// Function to save the SVG file
function saveSVG(fileName, svgContent) {
  fs.writeFile(fileName, svgContent, (err) => {
    if (err) {
      console.error('Error saving SVG file:', err);
    } else {
      console.log(`Generated ${fileName}`);
    }
  });
}

// Main function to prompt the user and generate the SVG
function createLogo() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'logoText',
        message: 'Enter up to 3 characters for your logo text:',
        validate: (input) => {
          if (input.length > 3) {
            return 'Please enter no more than 3 characters.';
          }
          return true;
        },
        default: 'ABC',
      },
      {
        type: 'input',
        name: 'textColor',
        message: 'Enter the text color (keyword or hex):',
        default: '#FFFFFF',
      },
      {
        type: 'list',
        name: 'shape',
        message: 'Choose a shape:',
        choices: ['circle', 'triangle', 'square'],
      },
      {
        type: 'input',
        name: 'shapeColor',
        message: 'Enter the shape color (keyword or hex):',
        default: '#000000',
      },
    ])
    .then((answers) => {
      // Generate the SVG content based on the answers
      const svgContent = generateSVG(answers);

      // Save the SVG to the file
      saveSVG('logo.svg', svgContent);
    })
    .catch((error) => {
      console.error('Error occurred:', error);
    });
}

// Run the application
createLogo();
