#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import chalk from 'chalk';

// Enhanced Lexical Analysis to handle more complex tokenization
const lexicalAnalysis = (code) => {
    // More sophisticated tokenization that preserves strings and handles special characters
    const tokens = [];
    const regex = /("[^"]*"|\(|\)|\{|\}|\+|=|\.|[a-zA-ZÀ-ÿ_][a-zA-ZÀ-ÿ0-9_]*)/g;
    
    let match;
    while ((match = regex.exec(code)) !== null) {
        tokens.push(match[0]);
    }
    
    console.log(chalk.cyan('Lexical analysis completed. Tokens extracted:'));
  //  console.log(tokens);
    return tokens;
};

/**
 * Enhanced Semantic Analysis with more robust parsing
 * @param {Array} tokens - The array of tokens to be semantically analyzed
 * @returns {boolean} - Whether the code passes semantic analysis
 */
const semanticAnalysis = (tokens) => {
    const declaredVariables = new Set();
    const declaredFunctions = new Set();
    const declaredClasses = new Set();
    let hasError = false;
    
    // Enhanced keywords for TeluguScript
    const declarationKeywords = ['maredhi', 'maranadhi'];
    const functionKeywords = ['pani'];
    const classKeywords = ['paddathi'];
    const specialKeywords = ['cheppu', 'phalitam', 'kotha'];
    const specialSymbols = ['=', '(', ')', '{', '}', '+', '.'];

    const validateTokens = () => {
        let classDeclarationMode = false;
        let functionDeclarationMode = false;
        let functionParameterMode = false;
        const functionParameters = new Set();
        const classMembers = new Set();

        for (let i = 0; i < tokens.length; i++) {
            const token = tokens[i];
            const nextToken = tokens[i + 1];
            const prevToken = tokens[i - 1];

            // Class Declaration
            if (classKeywords.includes(token)) {
                if (!nextToken || specialSymbols.includes(nextToken)) {
                    console.log(chalk.red(`Error: Invalid class declaration after "${token}"`));
                    hasError = true;
                } else {
                    declaredClasses.add(nextToken);
                    classDeclarationMode = true;
                }
            }

            // Variable Declaration
            if (declarationKeywords.includes(token)) {
                if (!nextToken || specialSymbols.includes(nextToken)) {
                    console.log(chalk.red(`Error: Invalid variable declaration after "${token}"`));
                    hasError = true;
                } else {
                    // If in function parameter mode, add to function parameters
                    if (functionParameterMode) {
                        functionParameters.add(nextToken);
                    } else if (classDeclarationMode) {
                        classMembers.add(nextToken);
                    } else {
                        declaredVariables.add(nextToken);
                    }
                }
            }

            // Function Declaration
            if (functionKeywords.includes(token)) {
                if (!nextToken || specialSymbols.includes(nextToken)) {
                    console.log(chalk.red(`Error: Invalid function declaration after "${token}"`));
                    hasError = true;
                } else {
                    if (classDeclarationMode) {
                        classMembers.add(nextToken);
                    } else {
                        declaredFunctions.add(nextToken);
                    }
                    functionDeclarationMode = true;
                }
            }

            // Function Parameter Detection
            if (token === '(') {
                functionParameterMode = true;
            }
            if (token === ')') {
                functionParameterMode = false;
            }

            // Class Declaration End
            if (token === '}') {
                classDeclarationMode = false;
            }

            // Variable/Function/Keyword Usage
            if (!declarationKeywords.includes(token) && 
                !functionKeywords.includes(token) && 
                !classKeywords.includes(token) && 
                !specialKeywords.includes(token) && 
                !specialSymbols.includes(token) && 
                !token.startsWith('"')) {
                // Check if token is a string literal, variable, function, class, or parameter
                if (!declaredVariables.has(token) && 
                    !declaredFunctions.has(token) && 
                    !declaredClasses.has(token) && 
                    !functionParameters.has(token) && 
                    !classMembers.has(token)) {
                    console.log(chalk.red(`Error: Undeclared variable, function, or class used - "${token}"`));
                    hasError = true;
                }
            }
        }
    };

    validateTokens();

    if (!hasError) {
        console.log(chalk.green('Semantic analysis passed: Code has valid variable/function/class usage.'));
    } else {
        console.log(chalk.red('Semantic analysis failed: Errors found.'));
    }

    return !hasError;
};

/**
 * Translates TeluguScript to JavaScript
 * @param {string} code - The TeluguScript code as a string.
 */
const translateToJS = (code) => {
    const translations = new Map([
        ['maredhi', 'let'],
        ['maranadhi', 'const'],
        ['pani', 'function'],
        ['phalitam', 'return'],
        ['edi itey', 'if'],
        ['lekapote', 'else'],
        ['oka vela', 'else if'],
        ['malle', 'for'],
        ['malle itey', 'while'],
        ['cheppu', 'console.log'],
        ['paddathi', 'class'],
        ['edi', 'this'],
        ['kotha', 'new'],
        ['pedda pani', 'async'],
        ['agu', 'await']
    ]);

    let teluguScript = code;

    // Lexical analysis: Tokenize the code into words
    const tokens = lexicalAnalysis(teluguScript);

    // Semantic analysis: Check for undeclared variables or functions being used
    // if (!semanticAnalysis(tokens)) {
    //     console.error(chalk.red('Aborting execution due to semantic errors.'));
    //     return;
    // }

    // Replace all occurrences of Telugu keywords with JavaScript keywords
    translations.forEach((js, telugu) => {
        const regex = new RegExp(`\\b${telugu}\\b`, 'g');
        teluguScript = teluguScript.replace(regex, js);
    });

    // Dynamically execute the translated JavaScript code
    try {
        console.log(chalk.green('Executing the translated JavaScript code...'));
        eval(teluguScript);
    } catch (error) {
        console.error(chalk.red('Error executing code:'), error);
    }
};

// Parse and validate command-line arguments
const args = process.argv.slice(2);
if (args.length !== 1) {
    console.error(chalk.red('Error:'), 'Invalid number of arguments.');
    console.log(chalk.blue('Usage: telugu <filename.tel>'));
    process.exit(1);
}

const fileName = args[0];
if (!fileName.endsWith('.tel')) {
    console.error(chalk.red('Error:'), 'Provided file must have a .tel extension.');
    process.exit(1);
}

const filePath = path.resolve(process.cwd(), fileName);

// Read and process the TeluguScript file
fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
        console.error(chalk.red('Error reading the file:'), err.message);
        process.exit(1);
    }

    console.log(chalk.yellow('Processing TeluguScript file:'), filePath);

    // Call the translation function
    translateToJS(data);
});