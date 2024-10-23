#!/bin/bash

# Function to execute the command and wait for it to finish
execute_command() {
    local command="$1"
    echo "Executing: $command"
    $command
    wait $!
    echo "Command finished. Waiting for 5 seconds..."
    sleep 5
}

# Function to repeat the execution sequence 10 times
repeat_sequence() {
    for i in {1..10}
    do
        execute_command "node manualLogReader.js 1 122 100 01 03:06:2024 00:00:00 04:06:2024 00:00:00 advExp 0"
        execute_command "node manualLogReader.js 1 122 100 02 03:06:2024 00:00:00 04:06:2024 00:00:00 advExp 0"
        execute_command "node manualLogReader.js 1 122 100 03 03:06:2024 00:00:00 04:06:2024 00:00:00 advExp 0"
        execute_command "node manualLogReader.js 1 122 100 04 03:06:2024 00:00:00 04:06:2024 00:00:00 advExp 0"
        execute_command "node manualLogReader.js 1 122 100 05 03:06:2024 00:00:00 04:06:2024 00:00:00 advExp 0"
        execute_command "node manualLogReader.js 1 122 100 06 03:06:2024 00:00:00 04:06:2024 00:00:00 advExp 0"
        execute_command "node manualLogReader.js 1 122 100 07 03:06:2024 00:00:00 04:06:2024 00:00:00 advExp 0"
        execute_command "node manualLogReader.js 1 122 100 08 03:06:2024 00:00:00 04:06:2024 00:00:00 advExp 0"
        execute_command "node manualLogReader.js 1 122 100 09 03:06:2024 00:00:00 04:06:2024 00:00:00 advExp 0"
        execute_command "node manualLogReader.js 1 122 100 10 03:06:2024 00:00:00 04:06:2024 00:00:00 advExp 0"
    done
}

# Main script execution
repeat_sequence
