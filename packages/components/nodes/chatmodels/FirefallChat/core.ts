export declare interface FirefallOpenAIInput {
    /**
     * IMS URL to use when making requests to Firefall Api.
     */
    firefallImsUrl?: string
    /**
     * IMS Client ID to use when making requests to Firefall Api.
     */
    firefallImsClientId?: string
    /**
     * IMS Client Secret to use when making requests to Firefall Api.
     */
    firefallImsClientSecret?: string
    /**
     * IMS Auth Code to use when making requests to Firefall Api.
     */
    firefallImsAuthCode?: string
    /**
     * Firefall API URL to use when making requests to Firefall Api.
     */
    firefallApiUrl?: string
    /**
     * Organization ID to use when making requests to Firefall Api.
     */
    firefallOrgId?: string
    /**
     * Store context for Firefall API.
     */
    storeContext: boolean
    /**
     * LLM Type for Firefall API.
     */
    llmType: string
}
