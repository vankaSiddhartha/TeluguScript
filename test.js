class MarethiInterpreter {
    constructor() {
        // Symbol table to store variables and functions
        this.symbolTable = {
            global: {}
        };
        
        // Current scope stack
        this.scopeStack = ['global'];

        // Predefined keywords and their types
        this.keywords = {
            'maredhi': 'declare_var',
            'maranadhi': 'declare_const',
            'pani': 'function_declaration',
            'phalitam': 'return',
            'edi itey': 'if',
            'lekapote': 'else',
            'oka vela': 'else if',
            'malle': 'for',
            'malle itey': 'while',
            'cheppu': 'print'
        };
    }

    // Get the current active scope
    getCurrentScope() {
        return this.scopeStack[this.scopeStack.length - 1];
    }

    // Set a variable in the current scope
    setVariable(name, value, isConstant = false) {
        const currentScope = this.getCurrentScope();
        
        // Check if variable already exists in current scope
        if (this.symbolTable[currentScope] && 
            Object.prototype.hasOwnProperty.call(this.symbolTable[currentScope], name)) {
            throw new Error(`Variable ${name} already declared in current scope`);
        }

        // Initialize scope if not exists
        if (!this.symbolTable[currentScope]) {
            this.symbolTable[currentScope] = {};
        }

        // Store variable with its type
        this.symbolTable[currentScope][name] = {
            value: value,
            isConstant: isConstant
        };
    }

    // Get a variable from any accessible scope
    getVariable(name) {
        // Search through scopes from current to global
        for (let i = this.scopeStack.length - 1; i >= 0; i--) {
            const scopeName = this.scopeStack[i];
            const scope = this.symbolTable[scopeName];
            
            if (scope && Object.prototype.hasOwnProperty.call(scope, name)) {
                return scope[name].value;
            }
        }
        
        throw new Error(`Variable ${name} is not defined`);
    }

    // Evaluate expressions
    evaluateExpression(expr) {
        // Remove leading/trailing whitespace
        expr = expr.trim();

        // Handle string literals
        if ((expr.startsWith('"') && expr.endsWith('"')) || 
            (expr.startsWith("'") && expr.endsWith("'"))) {
            return expr.slice(1, -1);
        }

        // Handle numbers
        if (!isNaN(expr)) {
            return Number(expr);
        }

        // Handle boolean
        if (expr === 'true') return true;
        if (expr === 'false') return false;

        // Handle variable references
        try {
            return this.getVariable(expr);
        } catch {
            // If not a variable, might be a complex expression
            try {
                // Safely evaluate simple arithmetic and comparisons
                return new Function(`return ${expr}`)();
            } catch {
                throw new Error(`Cannot evaluate expression: ${expr}`);
            }
        }
    }

    // Parse and execute a single line of code
    executeLine(line) {
        // Remove leading/trailing whitespace
        line = line.trim();
        
        // Skip empty lines and comments
        if (!line || line.startsWith('//')) return null;

        // Variable declaration
        if (line.startsWith('maredhi ') || line.startsWith('maranadhi ')) {
            const isConstant = line.startsWith('maranadhi');
            const [, declaration] = line.split(/\s+(.+)/);
            const [name, ...valueParts] = declaration.split('=');
            
            const value = valueParts.length 
                ? this.evaluateExpression(valueParts.join('=').trim()) 
                : undefined;
            
            this.setVariable(name.trim(), value, isConstant);
            return value;
        }

        // Print statement
        if (line.startsWith('cheppu(') && line.endsWith(')')) {
            const expr = line.slice(7, -1).trim();
            const value = this.evaluateExpression(expr);
            console.log(value);
            return value;
        }

        // Basic arithmetic and assignment
        if (line.includes('=') && !line.startsWith('pani')) {
            const [name, expr] = line.split('=').map(part => part.trim());
            const value = this.evaluateExpression(expr);
            
            // Check if it's a reassignment to an existing variable
            this.getVariable(name); // This will throw if variable doesn't exist
            
            // Find the scope of the variable and update
            for (let i = this.scopeStack.length - 1; i >= 0; i--) {
                const scopeName = this.scopeStack[i];
                const scope = this.symbolTable[scopeName];
                
                if (scope && Object.prototype.hasOwnProperty.call(scope, name)) {
                    // Check if it's a constant
                    if (scope[name].isConstant) {
                        throw new Error(`Cannot reassign constant variable ${name}`);
                    }
                    scope[name].value = value;
                    break;
                }
            }
            
            return value;
        }

        // Return statement (for function context)
        if (line.startsWith('phalitam ')) {
            const expr = line.slice(8).trim();
            return this.evaluateExpression(expr);
        }

        // If nothing matches, it might be a bare expression
        try {
            return this.evaluateExpression(line);
        } catch {
            throw new Error(`Unable to interpret line: ${line}`);
        }
    }

    // Execute a block of code
    execute(code) {
        // Split code into lines, removing empty lines and comments
        const lines = code.split('\n')
            .filter(line => line.trim() && !line.trim().startsWith('//'));
        
        // Execute each line
        const results = lines.map(line => this.executeLine(line));
        
        // Return the last result
        return results[results.length - 1];
    }
}

// Function to test the interpreter
function testMarethiInterpreter() {
    const interpreter = new MarethiInterpreter();

    console.log("Test 1: Variable Declaration and Printing");
    const code1 = `
maredhi x = 10
cheppu(x)
maredhi y = x + 5
cheppu(y)
`;
    interpreter.execute(code1);

    console.log("\nTest 2: Constant Declaration and Arithmetic");
    const code2 = `
maranadhi PI = 3.14159
maredhi radius = 5
maredhi area = PI * radius * radius
cheppu(area)
`;
    interpreter.execute(code2);

    console.log("\nTest 3: Complex Expressions");
    const code3 = `
maredhi a = 10
maredhi b = 20
maredhi result = a * b + 5
cheppu(result)
`;
    interpreter.execute(code3);
}

// Run the tests
testMarethiInterpreter();