import { ChatOpenAI as LangchainChatOpenAI, OpenAIChatInput } from '@langchain/openai'
import { BaseCache } from '@langchain/core/caches'
import { BaseLLMParams } from '@langchain/core/language_models/llms'
import { ICommonObject, INode, INodeData, INodeOptionsValue, INodeParams } from '../../../src'
import { getBaseClasses, getCredentialData, getCredentialParam } from '../../../src'
import { ChatOpenAI } from '../ChatOpenAI/FlowiseChatOpenAI'
import { getModels, MODEL_TYPE } from '../../../src/modelLoader'
import { FirefallOpenAIInput } from './core'

class FirefallChat_ChatModels implements INode {
    label: string
    name: string
    version: number
    type: string
    icon: string
    category: string
    description: string
    baseClasses: string[]
    credential: INodeParams
    inputs: INodeParams[]

    constructor() {
        this.label = 'Firefall Chat'
        this.name = 'firefallChat'
        this.version = 1.0
        this.type = 'FirefallChat'
        this.icon = 'Firefall.png'
        this.category = 'Chat Models'
        this.description = 'Wrapper around Firefall large language models'
        this.baseClasses = [this.type, ...getBaseClasses(LangchainChatOpenAI)]
        this.credential = {
            label: 'Connect Credential',
            name: 'credential',
            type: 'credential',
            credentialNames: ['firefallApi']
        }
        this.inputs = [
            {
                label: 'Cache',
                name: 'cache',
                type: 'BaseCache',
                optional: true
            },
            {
                label: 'Model Name',
                name: 'modelName',
                type: 'string',
                optional: false,
                default: 'gpt-4-32k',
                placeholder: 'gpt-4-32k'
            },
            {
                label: 'LLM Type',
                name: 'llmType',
                type: 'string',
                options: [{ label: 'Azure Chat OpenAI', name: 'azure_chat_openai' }],
                default: 'azure_chat_openai',
                optional: false
            },
            {
                label: 'Store Context',
                name: 'storeContext',
                type: 'boolean',
                default: false,
                optional: false
            },
            {
                label: 'Temperature',
                name: 'temperature',
                type: 'number',
                step: 0.1,
                default: 0.9,
                optional: true
            }
        ]
    }

    //@ts-ignore
    loadMethods = {
        async listModels(): Promise<INodeOptionsValue[]> {
            return await getModels(MODEL_TYPE.CHAT, 'firefallChat')
        }
    }

    async init(nodeData: INodeData, _: string, options: ICommonObject): Promise<any> {
        const modelName = nodeData.inputs?.modelName as string
        const llmType = nodeData.inputs?.llmType as string
        const storeContext = nodeData.inputs?.storeContext as boolean
        const temperature = nodeData.inputs?.temperature as string
        const cache = nodeData.inputs?.cache as BaseCache

        const credentialData = await getCredentialData(nodeData.credential ?? '', options)
        const firefallImsUrl = getCredentialParam('firefallImsUrl', credentialData, nodeData)
        const firefallImsClientId = getCredentialParam('firefallImsClientId', credentialData, nodeData)
        const firefallImsClientSecret = getCredentialParam('firefallImsClientSecret', credentialData, nodeData)
        const firefallImsAuthCode = getCredentialParam('firefallImsAuthCode', credentialData, nodeData)
        const firefallApiUrl = getCredentialParam('firefallApiUrl', credentialData, nodeData)
        const firefallOrgId = getCredentialParam('firefallOrgId', credentialData, nodeData)

        const obj: BaseLLMParams & Partial<OpenAIChatInput> & FirefallOpenAIInput = {
            temperature: parseFloat(temperature),
            modelName,
            storeContext,
            llmType,
            firefallImsUrl,
            firefallImsClientId,
            firefallImsClientSecret,
            firefallImsAuthCode,
            firefallApiUrl,
            firefallOrgId
        }

        if (cache) obj.cache = cache

        const model = new ChatOpenAI(nodeData.id, obj)
        if (cache) model.cache = cache
        return model
    }
}

module.exports = { nodeClass: FirefallChat_ChatModels }
