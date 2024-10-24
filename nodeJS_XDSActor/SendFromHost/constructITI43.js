var net = require('net');
var fs = require("fs");
var util = require("util");
var xml2js = require('xml2js');
var parseString = xml2js.parseString;
var builder = new xml2js.Builder;
var hrstart = null;
obj = {
    "soapenv:Envelope": {
        "$": {
            "xmlns": " !-- namespaces omitted -- "
        },
        "soapenv:Header": [
            {
                "wsa:To": [
                    {
                        "_": "https://epd-test.com/Repository/services/RepositoryService",
                        "$": {
                            "soapenv:mustUnderstand": "1"
                        }
                    }
                ],
                "wsa:MessageID": [
                    {
                        "_": "urn:uuid:1EB10F67-6562-46D5-9B6B-5DC42EB2B4A6",
                        "$": {
                            "soapenv:mustUnderstand": "1"
                        }
                    }
                ],
                "wsa:Action": [
                    {
                        "_": "urn:ihe:iti:2007:RetrieveDocumentSet",
                        "$": {
                            "soapenv:mustUnderstand": "1"
                        }
                    }
                ],
                "wsse:Security": [
                    {
                        "saml2:Assertion": [
                            " "
                        ]
                    }
                ]
            }
        ],
        "soapenv:Body": [
            {
                "xsdb:RetrieveDocumentSetRequest": [
                    {
                        "xsdb:DocumentRequest": [
                            {
                                "xsdb:HomeCommunityId": [
                                    "urn:oid:1.3.6.1.4.1.21367.2017.2.6.19"
                                ],
                                "xsdb:RepositoryUniqueId": [
                                    "1.3.6.1.4.1.21367.2017.2.3.54"
                                ],
                                "xsdb:DocumentUniqueId": [
                                    "1.3.6.1.4.1.21367.2017.2.1.75.20200922130227623"
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }
}

console.log(util.inspect(obj));

var queryXMLrebuilt = builder.buildObject(obj);
fs.writeFile("rebuildITI43.xml", queryXMLrebuilt, {flag: "w"}, function(err) {
    if (err) console.log(err);
    console.log("Successfully Written to File.");
});


