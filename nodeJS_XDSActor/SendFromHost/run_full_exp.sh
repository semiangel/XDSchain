#!/bin/bash

# Execute the first command
echo "Running the first command: node logAndRetrievableXdsDocumentRepository.js 01 10 10"
node logAndRetrievableXdsDocumentRepository.js 01 10 10

# Check if the first command was successful
if [ $? -eq 0 ]; then
  echo "First command completed successfully."
else
  echo "First command failed."
  exit 1
fi

# Execute the second command
echo "Running the second command: node retrieveableXdsDocumentConsumerActor.js 01 FindMaxSingle 10 10"
node retrieveableXdsDocumentConsumerActor.js 01 FindMaxSingle 10 10

# Check if the second command was successful
if [ $? -eq 0 ]; then
  echo "Second command completed successfully."
else
  echo "Second command failed."
  exit 1
fi

# Execute the third command
echo "Running the third command: node logAndRetrievableXdsDocumentRepository.js 01 -r 10 10"
node logAndRetrievableXdsDocumentRepository.js 01 -r 10 10

# Check if the third command was successful
if [ $? -eq 0 ]; then
  echo "Third command completed successfully."
else
  echo "Third command failed."
  exit 1
fi

echo "All commands executed successfully."
