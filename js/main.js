const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

private_password = "bM&N8&$`M10*?*`&71MFU**'$*b'NFU'&&0$bFUT*?`M0b107NbUN0U'b$?7F$17"

addListener("startup");
addListener("screen");

function addListener(name) {
    document.getElementById(`${name}-btn`).addEventListener("click", () => {
        hash(prompt("Enter password", "")).then((sha) => {
            if (cesar(sha) == private_password) {
                console.log("Good password");
                document.getElementById(`${name}-btn`).hidden = true;
                document.getElementById(`download-${name}`).hidden = false;
            } else {
                console.log("Bad password");
            }
        });
    });
}

function cesar(password) {

    chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 €<>&'(-_)=$*,;:!.?/%}]@^\\`|[{#~"
    encoded_password = '';
    for (i=0; i < password.length; i++) { 

        if (!chars.includes(password[i])) {
            
        }

        for (y=0; y < chars.length; y++) { 
            if (password[i] == chars[y]) {
                encoded_password += chars[(y + password[0].charCodeAt(0).toString(16)) % chars.length];
            }
        }

    }

    return encoded_password;

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
