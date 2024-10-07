private_password = "230949293aef1c98eade64ac412bacd40d5d728920134be8a406ffe75d81beaa"

addListener("startup");
addListener("screen");

function addListener(name) {
    document.getElementById(`${name}-btn`).addEventListener("click", () => {
        hash(prompt("Enter password", "")).then((sha) => {
            if (sha == private_password) {
                console.log("Good password");
                document.getElementById(`${name}-btn`).hidden = true;
                document.getElementById(`download-${name}`).hidden = false;
            } else {
                console.log("Bad password");
            }
        });
    });
}

function hash(string) {
    const utf8 = new TextEncoder().encode(string);
    return crypto.subtle.digest('SHA-256', utf8).then((hashBuffer) => {
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray
            .map((bytes) => bytes.toString(16).padStart(2, '0'))
            .join('');
        return hashHex;
    });
}