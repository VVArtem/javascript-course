console.log("Types: 'leg', 'hypotenuse', 'adjacent angle', 'opposite angle', 'angle'");
console.log("Example: triangle(4, 'leg', 8, 'hypotenuse');");
// triangle(3, 'leg', 4, 'leg');
// triangle(3, 'leg', 5, 'hypotenuse');

function triangle(val1, type1, val2, type2) {
    const toRad = deg => deg * (Math.PI / 180);
    const toDeg = rad => rad * (180 / Math.PI);

    if (val1 <= 0 || val2 <= 0) {
        console.log("Values must be positive.");
        return "failed";
    }

    let a, b, c, alpha, beta;
    
    const types = [type1, type2];

    // Two legs :)
    if (type1 === "leg" && type2 === "leg") {

        a = val1;
        b = val2;

        c = Math.sqrt(a * a + b * b);

        alpha = toDeg(Math.atan(a / b));
        beta = 90 - alpha;
    }

    // Leg and Hypotenuse
    else if (types.includes("leg") && types.includes("hypotenuse")) {

        a = (type1 === "leg") ? val1 : val2;
        c = (type1 === "hypotenuse") ? val1 : val2;

        if (a >= c) {
            console.log("Error: Leg cannot be larger than hypotenuse.");
            return "failed";
        }

        b = Math.sqrt(c * c - a * a);

        alpha = toDeg(Math.asin(a / c));
        beta = 90 - alpha;
    }

    // Leg ang Adjacent angle
    else if (types.includes("leg") && types.includes("adjacent angle")) {

        b = (type1 === "leg") ? val1 : val2;
        beta = (type1 === "adjacent angle") ? val1 : val2;

        if (beta >= 90) return printError("Angle must be sharp");

        alpha = 90 - beta;

        a = b * Math.tan(toRad(alpha));
        c = b / Math.cos(toRad(alpha));
    }

    // Leg and Opposite angle
    else if (types.includes("leg") && types.includes("opposite angle")) {

        a = (type1 === "leg") ? val1 : val2;
        alpha = (type1 === "opposite angle") ? val1 : val2;

        if (alpha >= 90) return printError("Angle must be sharp");

        beta = 90 - alpha;

        b = a / Math.tan(toRad(alpha));
        c = a / Math.sin(toRad(alpha));
    }

    // Hypotenuse and Angle
    else if (types.includes("hypotenuse") && types.includes("angle")) {

        c = (type1 === "hypotenuse") ? val1 : val2;
        alpha = (type1 === "angle") ? val1 : val2;

        if (alpha >= 90) return printError("Angle must be sharp");

        beta = 90 - alpha;
        
        a = c * Math.sin(toRad(alpha));
        b = c * Math.cos(toRad(alpha));
    }

    else {
        console.log("Incompatible types. Please check your inputs.");
        return "failed";
    }

    console.log(`Results:
    a = ${a.toFixed(2)}
    b = ${b.toFixed(2)}
    c = ${c.toFixed(2)}
    alpha = ${alpha.toFixed(2)}°
    beta = ${beta.toFixed(2)}°`);

    return "success";
}

function printError(msg) {
    console.log(`Error: ${msg}`);
    return "failed";
}