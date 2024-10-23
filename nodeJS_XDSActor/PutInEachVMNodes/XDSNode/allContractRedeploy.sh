#!/bin/bash

# Function to execute the command and wait for it to finish
execute_command() {
    local command="$1"
    echo "Executing: $command"
    $command
    echo "Command finished. Waiting for 5 seconds..."
    sleep 5
}

# Function to repeat the execution sequence 10 times
repeat_sequence() {
    execute_command "node XDSRegistryDeploy.js"
    execute_command "node LogContractDeploy.js"
}

# Main script execution
repeat_sequence