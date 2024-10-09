const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

private_password = "915ad5681c3f7f854c10bffe6f9ea0be553690b2f78139c34a9ba3be967406c4"

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