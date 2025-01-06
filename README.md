# MageOps Squad

A squad of AI Agents to help manage your Magento store. There are 4 types of agents:
1. Team Lead
2. Support
3. Analyst
4. Developer

There are multiple pairs of Analyst / Developer agents for each domain (example: catalog, category, promotion etc.)

### Team Lead

Intercepts your request and decides which agent should handle it.

### Support

Handles general queries and directs the conversation towards specific topics that the squad is capable of managing.

### Analyst

Magento functional expert, whose job is to ensure all required information is collected from you in order to take relevant action(s) in the store.

### Developer

Executes actions in the store, based on user intent, via REST API calls.

# What does MageOps Squad support?

Currently supports managing the below areas of the Magento store. More capabilities are on the roadmap. **Open for volunteer contributions too!!**

1. Catalog

Ability to view, create, edit, delete products

# Installation

### Prerequisite

-   Install [PNPM](https://pnpm.io/installation)
    ```bash
    npm i -g pnpm
    ```

### Setup

1. Clone this repository


2. Go into repository folder

    ```bash
    cd llm-workflows
    ```

3. Install all dependencies of all modules:

    ```bash
    pnpm install
    ```

4. Build all the code:

    ```bash
    pnpm build
    ```

5. Start the app:

    ```bash
    pnpm start
    ```

    You can now access the app on [http://localhost:3000](http://localhost:3000)

6. For development build:

    - Create `.env` file and specify the `VITE_PORT` (refer to `.env.example`) in `packages/ui`
    - Create `.env` file and specify the `PORT` (refer to `.env.example`) in `packages/server`
    - Run

        ```bash
        pnpm dev
        ```

    Any code changes will reload the app automatically on [http://localhost:8080](http://localhost:8080)


### Configuration

1. In the Flowise app click on the **Marketplace** menu

2. Find and open the **MageOps Squad** template and click on **Use Template**

3. Configure the Azure OpenAI chat node with your credentials. You can replace this with any other chat model too by clicking on + -> Chat Models. *FYI: This works best with Azure OpenAI or OpenAI chat models*

4. Configure the Magento REST API Client node with your store credentials

# Tech stack

1. [(https://flowiseai.com/)]

Sets up the Agent workflows. Including custom tools build on top of the open source app to interact with Magento API's

2. LLM

Provides the chat model capabilities. Works best with Azure Open AI / OpenAI models. It should work well with Llama 3 as well, but with the 70b+ models.
