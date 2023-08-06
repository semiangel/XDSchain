
sudo add-apt-repository -y ppa:ethereum/ethereum
#Enable launchpad repository for Ethereum

sudo apt-get update
sudo apt-get install ethereum
#Install Ethereum using apt-get




git clone https://github.com/Consensys/quorum.git
#Clone Quorum from its source repository

cd quorum
make all
#Make the cloned file as an installation

make test
#Check if the installation was successful



git clone https://github.com/jpmorganchase/quorum-examples.git
#Clone the 7-Nodes Example from its source repository



cd path/to/7nodes
#Navigate to the folder path where the cloned repository locate

./istanbul-init.sh
#Initiate the genesis block with IBFT as its consensus

./istanbul-start.sh
#Activate all seven nodes to start the Blockchain based on the genesis block


