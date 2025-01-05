import {INode, INodeData, INodeParams} from '../../../src/Interface'
import {getBaseClasses} from '../../../src/utils'
import {desc, MagentoApiTool, RequestParameters} from './core'

class MagentoApi_Tools implements INode {
    label: string
    name: string
    version: number
    description: string
    type: string
    icon: string
    category: string
    baseClasses: string[]
    inputs: INodeParams[]

    constructor() {
        this.label = 'Magento REST API Client'
        this.name = 'magentoApi'
        this.version = 2.0
        this.type = 'MagentoApi'
        this.icon = 'magento.svg'
        this.category = 'Tools'
        this.description = 'Make Magento REST API calls'
        this.baseClasses = [this.type, ...getBaseClasses(MagentoApiTool)]
        this.inputs = [
            {
                label: 'URL',
                name: 'url',
                type: 'string',
                description:
                    'Agent will make call to this URL along with the path provided in the AIPlugin. If not specified, API call will fail',
                additionalParams: true,
                optional: false
            },
            {
                label: 'Admin Token URL',
                name: 'adminTokenUrl',
                type: 'string',
                description:
                    'Agent will make a call to this URL to get admin token. If not specified, API call auth will fail',
                additionalParams: true,
                optional: false
            },
            {
                label: 'Admin User',
                name: 'adminUser',
                type: 'string',
                description: 'Admin user to get the token. If not specified, API call auth will fail',
                additionalParams: true,
                optional: false
            },
            {
                label: 'Admin Password',
                name: 'adminPassword',
                type: 'string',
                description: 'Admin password to get the token. If not specified, API call auth will fail',
                additionalParams: true,
                optional: false
            },
            {
                label: 'Description',
                name: 'description',
                type: 'string',
                rows: 4,
                default: desc,
                description: 'Acts like a prompt to tell agent when it should use this tool',
                additionalParams: true,
                optional: true
            }
        ]
    }

    async init(nodeData: INodeData): Promise<any> {
        const url = nodeData.inputs?.url as string
        const adminTokenUrl = nodeData.inputs?.adminTokenUrl as string
        const adminUser = nodeData.inputs?.adminUser as string
        const adminPassword = nodeData.inputs?.adminPassword as string
        const description = nodeData.inputs?.description as string

        const obj: RequestParameters = {}
        if (url) obj.url = url
        if (adminTokenUrl) obj.adminTokenUrl = adminTokenUrl
        if (adminUser) obj.adminUser = adminUser
        if (adminPassword) obj.adminPassword = adminPassword
        if (description) obj.description = description

        return new MagentoApiTool(obj)
    }
}

module.exports = { nodeClass: MagentoApi_Tools }
