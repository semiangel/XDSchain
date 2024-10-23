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
repeat_sequenceA() {
    for i in {1..10}
    do
        execute_command "node manualLogReader.js 1 122 100 01 01:08:2024 00:00:00 04:08:2024 00:00:00 advExp 0"
        execute_command "node manualLogReader.js 1 122 100 02 01:08:2024 00:00:00 04:08:2024 00:00:00 advExp 0"
        execute_command "node manualLogReader.js 1 122 100 03 01:08:2024 00:00:00 04:08:2024 00:00:00 advExp 0"
        execute_command "node manualLogReader.js 1 122 100 04 01:08:2024 00:00:00 04:08:2024 00:00:00 advExp 0"
        execute_command "node manualLogReader.js 1 122 100 05 01:08:2024 00:00:00 04:08:2024 00:00:00 advExp 0"
        execute_command "node manualLogReader.js 1 122 100 06 01:08:2024 00:00:00 04:08:2024 00:00:00 advExp 0"
        execute_command "node manualLogReader.js 1 122 100 07 01:08:2024 00:00:00 04:08:2024 00:00:00 advExp 0"
        execute_command "node manualLogReader.js 1 122 100 08 01:08:2024 00:00:00 04:08:2024 00:00:00 advExp 0"
        execute_command "node manualLogReader.js 1 122 100 09 01:08:2024 00:00:00 04:08:2024 00:00:00 advExp 0"
        execute_command "node manualLogReader.js 1 122 100 10 01:08:2024 00:00:00 04:08:2024 00:00:00 advExp 0"
    done
}

repeat_sequenceB() {
    for i in {1..10}
    do
        execute_command "node manualLogReader.js 2 122 100 01 01:08:2024 00:00:00 04:08:2024 00:00:00 advExp 0"
        execute_command "node manualLogReader.js 2 122 100 02 01:08:2024 00:00:00 04:08:2024 00:00:00 advExp 0"
        execute_command "node manualLogReader.js 2 122 100 03 01:08:2024 00:00:00 04:08:2024 00:00:00 advExp 0"
        execute_command "node manualLogReader.js 2 122 100 04 01:08:2024 00:00:00 04:08:2024 00:00:00 advExp 0"
        execute_command "node manualLogReader.js 2 122 100 05 01:08:2024 00:00:00 04:08:2024 00:00:00 advExp 0"
        execute_command "node manualLogReader.js 2 122 100 06 01:08:2024 00:00:00 04:08:2024 00:00:00 advExp 0"
        execute_command "node manualLogReader.js 2 122 100 07 01:08:2024 00:00:00 04:08:2024 00:00:00 advExp 0"
        execute_command "node manualLogReader.js 2 122 100 08 01:08:2024 00:00:00 04:08:2024 00:00:00 advExp 0"
        execute_command "node manualLogReader.js 2 122 100 09 01:08:2024 00:00:00 04:08:2024 00:00:00 advExp 0"
        execute_command "node manualLogReader.js 2 122 100 10 01:08:2024 00:00:00 04:08:2024 00:00:00 advExp 0"
    done
}

repeat_sequenceC() {
    for i in {1..10}
    do
        execute_command "node manualLogReader.js 3 100 999 01 01:08:2024 00:00:00 04:08:2024 00:00:00 advExp 0"
        execute_command "node manualLogReader.js 3 100 999 02 01:08:2024 00:00:00 04:08:2024 00:00:00 advExp 0"
        execute_command "node manualLogReader.js 3 100 999 03 01:08:2024 00:00:00 04:08:2024 00:00:00 advExp 0"
        execute_command "node manualLogReader.js 3 100 999 04 01:08:2024 00:00:00 04:08:2024 00:00:00 advExp 0"
        execute_command "node manualLogReader.js 3 100 999 05 01:08:2024 00:00:00 04:08:2024 00:00:00 advExp 0"
        execute_command "node manualLogReader.js 3 100 999 06 01:08:2024 00:00:00 04:08:2024 00:00:00 advExp 0"
        execute_command "node manualLogReader.js 3 100 999 07 01:08:2024 00:00:00 04:08:2024 00:00:00 advExp 0"
        execute_command "node manualLogReader.js 3 100 999 08 01:08:2024 00:00:00 04:08:2024 00:00:00 advExp 0"
        execute_command "node manualLogReader.js 3 100 999 09 01:08:2024 00:00:00 04:08:2024 00:00:00 advExp 0"
        execute_command "node manualLogReader.js 3 100 999 10 01:08:2024 00:00:00 04:08:2024 00:00:00 advExp 0"
    done
}

# Main script execution
repeat_sequenceA
repeat_sequenceB
repeat_sequenceC