#!/bin/bash

# Define variables
TABLE_NAME="products"
DATA_FILE="products.json"
TEMP_FILE="$(mktemp)"

# Format the JSON file and write each item to the temp file
jq -c '.[]' "$DATA_FILE" > "$TEMP_FILE"

# Loop through each item in the temp file and add it to the table
while read -r item; do

  # Add the item to the table
  aws dynamodb put-item --table-name "$TABLE_NAME" --item "$item"

done < "$TEMP_FILE"

# Remove the temp file
rm "$TEMP_FILE"