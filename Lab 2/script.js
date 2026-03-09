// 1.2.3
var car1 = new Object();
car1.color = "Sirius Black";
car1.maxSpeed = 340;
car1.tuning = true;
car1["number of accidents"] = 0;

car1.driver = new Object();
car1.driver.name = "Artem Viktorovich";
car1.driver.category = "C";
car1.driver["personal limitations"] = "No driving at night";


// 1.2.4
var car2 = {
    color: "Walter White",
    maxSpeed: 90,
    tuning: false,
    "number of accidents": 2,
    driver: {
        name: "Artem Viktorovich",
        category: "B",
        "personal limitations": null
    }
};


// 1.2.5
car1.drive = function() {
    console.log("I am not driving at night");
};
console.log("car1.drive():");
car1.drive();


// 1.2.6
car2.drive = function() {
    console.log("I can drive anytime");
};
console.log("car2.drive():");
car2.drive();


// 1.2.7
function Truck(color, weight, avgSpeed, brand, model) {
    this.color = color;
    this.weight = weight;
    this.avgSpeed = avgSpeed;
    this.brand = brand;
    this.model = model;

    // 1.2.9
    this.trip = function() {
        if (!this.driver) {
            console.log("No driver assigned");
        } else {
            var message = this.driver.nightDriving ? "drives at night" : "does not drive at night";
            console.log("Driver " + this.driver.name + " " + message + " and has " + this.driver.experience + " years of experience");
        }
    };
}


// 1.2.8
Truck.prototype.AssignDriver = function(name, nightDriving, experience) {
    this.driver = {
        name: name,
        nightDriving: nightDriving,
        experience: experience
    };
};


// 1.2.10
var truck1 = new Truck("Blue Meth", 6700, 90, "Volvo", "FH16");
var truck2 = new Truck("Michael Gray", 6900, 91, "Mercedes", "W17");

truck1.AssignDriver("Artem Viktorovich", true, 19);
truck2.AssignDriver("Artem Viktorovich", false, 1);

console.log("\nDemonstrating trips:");
console.log("Truck 1:");
truck1.trip();

console.log("Truck 2:");
truck2.trip();

var truck3 = new Truck("Jesse Pink", 2900, 70, "Ford", "F350 1977");
console.log("Truck 3 (no driver):");
truck3.trip();


// 1.2.12 - 1.2.15 
class Square {
    constructor(a) {
        this.a = a;
    }

    static help() {
        console.log("Square is a regular quadrilateral. It has four straight sides of equal length and four equal angles.");
    }

    length() {
        console.log("Perimeter: " + (4 * this.a));
    }

    square() {
        console.log("Area: " + (this.a * this.a));
    }

    info() {
        console.log("Square specials:");
        console.log("Sides: a=" + this.a + ", b=" + this.a + ", c=" + this.a + ", d=" + this.a);
        console.log("Angles: 90°, 90°, 90°, 90°");
        this.length();
        this.square();
    }
}


// 1.2.16 - 1.2.17
class Rectangle extends Square {
    constructor(a, b) {
        super(a);
        this.b = b;
    }

    static help() {
        console.log("Rectangle is a rectilinear convex polygon or a quadrilateral with four right angles. It can also be defined as: an equiangular quadrilateral");
    }

    length() {
        console.log("Perimeter: " + (2 * (this.a + this.b)));
    }

    square() {
        console.log("Area: " + (this.a * this.b));
    }

    info() {
        console.log("Rectangle specials:");
        console.log("Sides: a=" + this.a + ", b=" + this.b + ", c=" + this.a + ", d=" + this.b);
        console.log("Angles: 90°, 90°, 90°, 90°");
        this.length();
        this.square();
    }
}


// 1.2.18 - 1.2.19
class Rhombus extends Square {
    constructor(a, alpha, beta) {
        super(a);
        this.alpha = alpha;
        this.beta = beta;
    }

    // 1.2.22
    get sideA() { return this.a; }
    set sideA(val) { this.a = val; }
    get angleAlpha() { return this.alpha; }
    set angleAlpha(val) { this.alpha = val; }
    get angleBeta() { return this.beta; }
    set angleBeta(val) { this.beta = val; }

    static help() {
        console.log("Rhombus (pl.: rhombi or rhombuses) is an equilateral quadrilateral, a quadrilateral whose four sides all have the same length.");
    }

    length() {
        console.log("Perimeter: " + (4 * this.a));
    }

    square() {
        let s = Math.pow(this.a, 2) * Math.sin(this.beta * Math.PI / 180);
        console.log("Area: " + s.toFixed(2));
    }

    info() {
        console.log("Rhombus specials:");
        console.log("Sides: a=" + this.a + ", b=" + this.a + ", c=" + this.a + ", d=" + this.a);
        console.log("Angles: stupid=" + this.alpha + "°, clever=" + this.beta + "°");
        this.length();
        this.square();
    }
}


// 1.2.20 - 1.2.21
class Parallelogram extends Rectangle {
    constructor(a, b, alpha, beta) {
        super(a, b);
        this.alpha = alpha;
        this.beta = beta;
    }

    static help() {
        console.log("Parallelogram is a 4-sided flat polygon (quadrilateral) with two pairs of parallel, equal-length opposite sides.");
    }

    length() {
        console.log("Perimeter: " + (2 * (this.a + this.b)));
    }

    square() {
        let s = this.a * this.b * Math.sin(this.beta * Math.PI / 180);
        console.log("Area: " + s.toFixed(2));
    }

    info() {
        console.log("Parallelogram specials:");
        console.log("Sides: a=" + this.a + ", b=" + this.b + ", c=" + this.a + ", d=" + this.b);
        console.log("Angles: stupid=" + this.alpha + "°, clever=" + this.beta + "°");
        this.length();
        this.square();
    }
}


// 1.2.23 
console.log("\nMethods help()");
Square.help();
Rectangle.help();
Rhombus.help();
Parallelogram.help();


// 1.2.24
const mySquare = new Square(10);
const myRect = new Rectangle(10, 20);
const myRhombus = new Rhombus(10, 120, 60);
const myParall = new Parallelogram(15, 25, 135, 45);

console.log("\nMethods info()");
mySquare.info();
myRect.info();
myRhombus.info();
myParall.info();


// 1.2.25 - 1.2.26
function Triangular(a = 3, b = 4, c = 5) {
    return { a, b, c };
}

console.log("\nTriangular objects:");
const tri1 = Triangular();
const tri2 = Triangular(10, 10, 10);
const tri3 = Triangular(7, 24, 25);
console.log(tri1, tri2, tri3);


// 1.2.27 - 1.2.28
function PiMultiplier(num) {
    return function() {
        return Math.PI * num;
    };
}

const multBy2 = PiMultiplier(2);
const multBy3_2 = PiMultiplier(3/2);
const divBy2 = PiMultiplier(1/2);

console.log("\nPiMultiplier results:");
console.log("PI * 2 =", multBy2());
console.log("PI * 3/2 =", multBy3_2());
console.log("PI / 2 =", divBy2());


// 1.2.29 - 1.2.30
function Painter(color) {
    return function(obj) {
        if (obj && obj.type) {
            console.log(`Color: ${color}, Type: ${obj.type}`);
        } else {
            console.log("No ‘type’ property occurred!");
        }
    };
}

const PaintBlue = Painter("Blue");
const PaintRed = Painter("Red");
const PaintYellow = Painter("Yellow");


// 1.2.31
const obj1 = { maxSpeed: 320, type: "Sportcar", color: "magenta" };
const obj2 = { type: "Truck", "avg speed": 90, "load capacity": 2400 };
const obj3 = { maxSpeed: 180, color: "purple", isCar: true };

console.log("\nPainter demonstration:");
PaintBlue(obj1);
PaintRed(obj2);
PaintYellow(obj3);