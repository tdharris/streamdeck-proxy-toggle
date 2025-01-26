# Stream Deck Toggle Proxy

Toggle Proxy plugin for Elgato Stream Deck.

![Streamdeck Toggle Proxy](/img/streamdeck-screenshot.webp)

## Features

- Toggle the Windows proxy settings on and off.

## Installation

### Install from the Elgato Stream Deck Store

[proxy-toggle]([https://apps.elgato.com/plugins/com.tdharris.toggle-proxy](https://marketplace.elgato.com/product/proxy-toggle-6f4af21d-8f9b-41e0-ba80-bcaac3725ae3))

### Or Download and Install Manually

1. Download the latest release from the [Releases](https://github.com/tdharris/streamdeck-proxy-toggle/releases) page, and run the `com.tdharris.proxy-toggle.streamDeckPlugin` file.

### Or Build from Source

You can build the plugin from source (on Windows):

1. Clone the repository.

    ```bash
    git clone https://github.com/tdharris/streamdeck-proxy-toggle.git
    ```

2. Install the node dependencies:

    ```bash
    npm install
    ```
3. Pack the plugin:

    ```bash
    streamdeck pack com.tdharris.proxy-toggle.sdPlugin
    ```

4. Run the plugin by double-clicking the `com.tdharris.proxy-toggle.streamDeckPlugin` file.
