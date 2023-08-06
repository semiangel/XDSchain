var queryXML = {
  "query:AdhocQueryRequest": {
    "$": {
      "xmlns:query": "urn:oasis:names:tc:ebxml-regrep:xsd:query:3.0",
      "xmlns:rim": "urn:oasis:names:tc:ebxml-regrep:xsd:rim:3.0",
      "xmlns:rs": "urn:oasis:names:tc:ebxml-regrep:xsd:rs:3.0",
      "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
      "xsi:schemaLocation": "urn:oasis:names:tc:ebxml-regrep:xsd:query:3.0 ../../schema/ebRS/query.xsd"
    },
    "query:ResponseOption": [
      {
        "$": {
          "returnComposedObjects": "true", 
          "returnType": "LeafClass" //Define return type, ObjRef or LeafClass
        }
      }
    ],
    "rim:AdhocQuery": [
      {
        "$": {
          "id": " urn:uuid:14d4debf-8f97-4251-9a74-a90016b0af0d "
        },
        "rim:Slot": [] //Query keyword
      }
    ]
  }
}

console.log(queryXML['query:AdhocQueryRequest']['rim:AdhocQuery'][0]['rim:Slot']);