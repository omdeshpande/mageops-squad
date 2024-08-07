import { INodeParams, INodeCredential } from '../src/Interface'

class FirefallApi implements INodeCredential {
    label: string
    name: string
    version: number
    description: string
    inputs: INodeParams[]

    constructor() {
        this.label = 'Firefall API'
        this.name = 'firefallApi'
        this.version = 1.0
        this.description =
            'Refer to <a target="_blank" href="https://wiki.corp.adobe.com/display/adobeDS/Firefall+User+Guide?src=contextnavpagetreemode">official guide</a> of how to use Firefall service'
        this.inputs = [
            {
                label: 'IMS Url',
                name: 'firefallImsUrl',
                type: 'string',
                placeholder: 'YOUR-IMS-URL'
            },
            {
                label: 'IMS Client Id',
                name: 'firefallImsClientId',
                type: 'string',
                placeholder: 'YOUR-IMS-CLIENT-ID'
            },
            {
                label: 'IMS Client Secret',
                name: 'firefallImsClientSecret',
                type: 'string',
                placeholder: 'YOUR-IMS-CLIENT-SECRET'
            },
            {
                label: 'IMS Auth Code',
                name: 'firefallImsAuthCode',
                type: 'string',
                placeholder: 'YOUR-IMS-AUTH-CODE'
            },
            {
                label: 'Fire Fall Api Url',
                name: 'firefallApiUrl',
                type: 'string',
                placeholder: 'FIREFALL-API-URL'
            },
            {
                label: 'Org Id',
                name: 'firefallOrgId',
                type: 'string',
                placeholder: 'ORG-ID'
            }
        ]
    }
}

module.exports = { credClass: FirefallApi }
