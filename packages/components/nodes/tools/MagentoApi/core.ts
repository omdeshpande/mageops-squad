import { Tool } from '@langchain/core/tools'
import fetch from 'node-fetch'

export const desc = `Use this when you want to POST to a website.
Input should be a json string with two keys: "url" and "data".
The value of "url" should be a string, and the value of "data" should be a dictionary of 
key-value pairs you want to POST to the url as a JSON body.
Be careful to always use double quotes for strings in the json string
The output will be the text response of the POST request.`

export interface Body {
    [key: string]: any
}

export interface RequestParameters {
    body?: Body
    url?: string
    adminTokenUrl?: string
    adminUser?: string
    adminPassword?: string
    description?: string
    maxOutputLength?: number
}

export class MagentoApiTool extends Tool {
    name = 'requests_post'
    url = ''
    adminTokenUrl = ''
    adminUser = ''
    adminPassword = ''
    description = desc
    maxOutputLength = Infinity

    constructor(args?: RequestParameters) {
        super()
        this.url = args?.url ?? this.url
        this.adminTokenUrl = args?.adminTokenUrl ?? this.adminTokenUrl
        this.adminUser = args?.adminUser ?? this.adminUser
        this.adminPassword = args?.adminPassword ?? this.adminPassword
        this.description = args?.description ?? this.description
        this.maxOutputLength = args?.maxOutputLength ?? this.maxOutputLength
    }

    /** @ignore */
    async _call(input: string) {
        try {
            let inputMethod = ''
            let inputUrl = ''
            let inputBody = {}

            const { method, path, data } = JSON.parse(input)

            inputMethod = method
            inputUrl = this.url + path
            inputBody = data

            if (process.env.DEBUG === 'true') console.info(`Making POST API call to ${inputUrl} with body ${JSON.stringify(inputBody)}`)

            /**
             * Get the auth token
             */
            const authResponse = await fetch(this.adminTokenUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: this.adminUser,
                    password: this.adminPassword
                })
            })

            /**
             * Make the API call
             */
            const res = await fetch(inputUrl, {
                method: inputMethod,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${JSON.parse(await authResponse.text())}`
                },
                ...(inputMethod !== 'GET' && {
                    body: JSON.stringify(inputBody),
                }),
            })

            const text = await res.text()
            return text.slice(0, this.maxOutputLength)
        } catch (error) {
            return `${error}`
        }
    }
}
