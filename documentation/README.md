Here's an extended documentation that includes **usage examples** for each keyword in **TeluguScript**:

---

# **TeluguScript Documentation**

**TeluguScript** allows developers to write code using native Telugu words as programming keywords, making coding more expressive and culturally connected. Below is the documentation that includes **usage examples** for each of the core keywords.

---

## Keywords and Their Usage

### 1. **Variable Declarations**
#### `maredhi` - `let`
Use `maredhi` to declare a variable that can be reassigned.

```teluguscript
maredhi name = "Siddhartha";
cheppu("Peru: " + name);  // Output: Peru: Siddhartha
name = "Vamsi";
cheppu("Updated Name: " + name);  // Output: Updated Name: Vamsi
```

#### `maranadhi` - `const`
Use `maranadhi` to declare a constant variable that cannot be reassigned.

```teluguscript
maranadhi age = 21;
cheppu("Vayasu: " + age);  // Output: Vayasu: 21
// age = 22; // Error: Cannot reassign a constant variable
```

---

### 2. **Control Flow**
#### `edi itey` - `if`
Use `edi itey` to check conditions.

```teluguscript
maredhi age = 25;
edi itey (age >= 18) {
    cheppu("Adult");
} lekapote {
    cheppu("Not an Adult");
}
// Output: Adult
```

#### `lekapote` - `else`
Use `lekapote` as an alternative to the `if` block when the condition is not met.

```teluguscript
maredhi age = 15;
edi itey (age >= 18) {
    cheppu("Adult");
} lekapote {
    cheppu("Not an Adult");
}
// Output: Not an Adult
```

#### `oka vela` - `else if`
Use `oka vela` when you want to check multiple conditions.

```teluguscript
maredhi age = 20;
edi itey (age < 18) {
    cheppu("Underage");
} oka vela (age >= 18 && age <= 25) {
    cheppu("Young Adult");
} lekapote {
    cheppu("Adult");
}
// Output: Young Adult
```

---

### 3. **Loops**
#### `malle itey` - `while`
Use `malle itey` to loop as long as the condition is true.

```teluguscript
maredhi counter = 0;
malle itey (counter < 5) {
    cheppu("Counter: " + counter);
    counter++;
}
// Output: Counter: 0
//         Counter: 1
//         Counter: 2
//         Counter: 3
//         Counter: 4
```

#### `malle` - `for`
Use `malle` to loop a specified number of times.

```teluguscript
maredhi i;
malle (i = 0; i < 5; i++) {
    cheppu("i: " + i);
}
// Output: i: 0
//         i: 1
//         i: 2
//         i: 3
//         i: 4
```

---

### 4. **Functions**
#### `pani` - `function`
Use `pani` to define a function.

```teluguscript
pani greet(name) {
    cheppu("Hello, " + name);
}

greet("Siddhartha");  // Output: Hello, Siddhartha
```

#### `phalitam` - `return`
Use `phalitam` to return a value from a function.

```teluguscript
pani add(a, b) {
    phalitam a + b;
}

maredhi result = add(5, 10);
cheppu("Result: " + result);  // Output: Result: 15
```

---

### 5. **Logging**
#### `cheppu` - `console.log`
Use `cheppu` to print messages to the console.

```teluguscript
cheppu("Hello, World!");  // Output: Hello, World!
```

---

### 6. **Object-Related**
#### `paddathi` - `class`
Use `paddathi` to define a class.

```teluguscript
paddathi Person {
    pani initialize(name, age) {
        this.name = name;
        this.age = age;
    }

    pani greet() {
        cheppu("Hello, my name is " + this.name + " and I am " + this.age + " years old.");
    }
}

maredhi person = new Person("Siddhartha", 21);
person.greet();  // Output: Hello, my name is Siddhartha and I am 21 years old.
```

#### `edi` - `this`
Use `edi` to refer to the current object instance.

```teluguscript
paddathi Car {
    pani initialize(model, year) {
        edi.model = model;
        edi.year = year;
    }

    pani display() {
        cheppu("Model: " + edi.model + ", Year: " + edi.year);
    }
}

maredhi myCar = new Car("Tesla", 2023);
myCar.display();  // Output: Model: Tesla, Year: 2023
```

#### `kotha` - `new`
Use `kotha` to create a new instance of a class.

```teluguscript
paddathi Book {
    pani initialize(title, author) {
        edi.title = title;
        edi.author = author;
    }

    pani display() {
        cheppu("Title: " + edi.title + ", Author: " + edi.author);
    }
}

maredhi myBook = new Book("Telugu Programming", "Siddhartha");
myBook.display();  // Output: Title: Telugu Programming, Author: Siddhartha
```

---

### 7. **Asynchronous Programming**
#### `pedda pani` - `async`
Use `pedda pani` to define an asynchronous function.

```teluguscript
pedda pani fetchData() {
    cheppu("Fetching data...");
    agu new Promise((resolve) => setTimeout(resolve, 2000));
    cheppu("Data fetched!");
}

fetchData();  // Output: Fetching data... (wait 2 seconds) Data fetched!
```

#### `agu` - `await`
Use `agu` to pause execution until an asynchronous function completes.

```teluguscript
pedda pani fetchData() {
    agu new Promise((resolve) => setTimeout(resolve, 2000));
    cheppu("Data fetched!");
}

pani main() {
    cheppu("Starting...");
    agu fetchData();
    cheppu("Finished!");
}

main();  // Output: Starting... (wait 2 seconds) Data fetched! Finished!
```

---

## Example Code: Combining All Keywords

Here’s a more comprehensive example demonstrating the usage of all keywords:

```teluguscript
paddathi Person {
    pani initialize(name, age) {
        edi.name = name;
        edi.age = age;
    }

    pani greet() {
        cheppu("Hello, my name is " + edi.name + " and I am " + edi.age + " years old.");
    }
}

pedda pani fetchPersonData() {
    maredhi personData = { name: "Siddhartha", age: 21 };
    agu new Promise((resolve) => setTimeout(resolve, 1000));
    cheppu("Fetched data: " + personData.name + ", " + personData.age);
    phalitam personData;
}

pani main() {
    cheppu("Fetching person data...");
    maredhi personInfo = agu fetchPersonData();
    cheppu("Data fetched!");
    maredhi person = new Person(personInfo.name, personInfo.age);
    person.greet();
}

main();  // Output: Fetching person data... (wait 1 second) Fetched data: Siddhartha, 21 Data fetched! Hello, my name is Siddhartha and I am 21 years old.
```

---

This documentation includes **usage examples** for each keyword in **TeluguScript**. It demonstrates how to use variable declarations, control flow, loops, functions, logging, classes, asynchronous programming, and more in TeluguScript. The examples make the language's capabilities clear and give you an understanding of how it works.