# Need: set-executionpolicy remotesigned
net user gx-user gx-user-password /add
Add-LocalGroupMember -Group "Administrateurs" -Member "gx-user"

Get-WindowsCapability -Online | Where-Object Name -like 'OpenSSH*'
# Install the OpenSSH Server
Add-WindowsCapability -Online -Name OpenSSH.Server~~~~0.0.1.0

# Start the sshd service
Start-Service sshd

# OPTIONAL but recommended:
Set-Service -Name sshd -StartupType 'Automatic'

# Confirm the Firewall rule is configured. It should be created automatically by setup. Run the following to verify
if (!(Get-NetFirewallRule -Name "OpenSSH-Server-In-TCP" -ErrorAction SilentlyContinue | Select-Object Name, Enabled)) {
    Write-Output "Firewall Rule 'OpenSSH-Server-In-TCP' does not exist, creating it..."
    New-NetFirewallRule -Name 'OpenSSH-Server-In-TCP' -DisplayName 'OpenSSH Server (sshd)' -Enabled True -Direction Inbound -Protocol TCP -Action Allow -LocalPort 22
} else {
    Write-Output "Firewall rule 'OpenSSH-Server-In-TCP' has been created and exists."
}

# ssh -t gx-user@0.0.0.0 shutdown /p /f /d u:5:15

# Uninstall the OpenSSH Server
# Remove-WindowsCapability -Online -Name OpenSSH.Server~~~~0.0.1.0