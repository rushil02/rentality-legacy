#!/usr/bin/env bash

echo "Warning: Setup only tested for Ubuntu 18.04 and is for development only"
echo "*Starting setup*"

sudo apt-get update
sudo apt-get -y install apt-transport-https ca-certificates curl software-properties-common

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
sudo apt-get update
sudo apt-get -y install docker-ce

sudo curl -L "https://github.com/docker/compose/releases/download/1.24.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

echo "Adding user to docker group"
if [ "$(getent group docker)" ]; then
    echo "Group 'docker' already exists."
    if getent group docker | grep -q "\b$USER\b"; then
        echo "User already in docker group."
    else
        echo "Adding user"
        sudo usermod -aG docker $USER
    fi
else
    echo "Creating group 'docker' and adding current user."
    sudo groupadd docker
    sudo usermod -aG docker $USER
fi

echo "Setup complete!"
