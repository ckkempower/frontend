<slot />

<style lang="scss" global>
    html {
        --color-blue-a: #2a5298;
        --color-blue-b: #1e3c72;
        --color-yellow-a: #ffcc33;
        --color-yellow-b: #f5c12e;
        --color-red-a: #cb2d3e;
        --color-red-b: #ef473a;
        --color-green-a: #0baa4b;
        --color-green-b: #48cb2d;

        --color-primary: #bb86fc;
        --color-off-primary: #3700b3;
        --color-secondary: #03dac6;
        --color-warning: #cf6679;
        --color-warning-dark: #b00020;
        --color-off-warning: #f8d7da;
        --color-light: #ffffff;
        --color-off-light: #f9f9f9;
        --color-medium: #989898;
        --color-dark: #121212;
        --color-off-dark: rgb(33, 33, 33);
    }

    * {
        scrollbar-width: auto;
        scrollbar-color: #666666 #404040;
    }

    /* Chrome, Edge, and Safari */
    ::-webkit-scrollbar {
        position: absolute;
        width: 1em;

        background-color: var(--color-off-dark);
    }

    ::-webkit-scrollbar {
        width: 0.5em;
        background-color: var(--color-off-dark);
    }

    .description > ::-webkit-scrollbar-thumb {
        border: 2px solid transparent;
    }

    ::-webkit-scrollbar-thumb {
        background-color: darken(#f9f9f9, 20%);
        border: 1em solid transparent;
        border-radius: 20px;
        &:hover {
            background-color: darken(#ffffff, 20%);
        }
    }

    *,
    *::after,
    *::before {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    html {
        scroll-behavior: smooth;
        font-size: 62.5%;
        height: 100%;
        font-family: Lato, sans-serif;
        font-weight: 400;
        box-sizing: border-box;
    }
    body,
    #root {
        font-size: 1.6rem;
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    label {
        cursor: pointer;
        user-select: none;
    }

    a,
    a:link,
    a:visited {
        cursor: pointer;
        text-decoration: none;
        color: inherit;
    }

    a:hover {
        text-decoration: underline;
    }

    p {
        line-height: 1.3em;
    }
    ul {
        list-style-type: none;
    }

    h1 {
        font-size: 235%;
    }

    h2 {
        font-size: 200%;
    }

    h3 {
        font-size: 175%;
    }

    h4 {
        font-size: 150%;
    }
    h5 {
        font-size: 125%;
    }
    h6 {
        font-size: 100%;
    }

    button {
        &,
        &.primary {
            border: none;
            outline: none;
            padding: 1em;
            cursor: pointer;
            color: var(--color-dark);
            background-color: var(--color-primary);
            border: 2px solid var(--color-primary);
            font-size: 1em;
            border-radius: 5em;
            &:disabled {
                cursor: not-allowed;
                background-color: var(--color-light);
                border-color: var(--color-medium);
                color: var(--color-medium);
            }
        }
        &.secondary {
            background-color: var(--color-secondary);
            border-color: var(--color-secondary);
            color: var(--color-dark);
        }

        &:disabled {
            cursor: not-allowed;
            background-color: var(--color-light);
            border-color: var(--color-medium);
            color: var(--color-medium);
        }
    }

    div[id^='__lpform_'] {
        display: none;
    }

    input,
    select,
    textarea {
        padding: 0.6em;
        font-size: 1.2em;
        border: 2px solid var(--color-medium);
        border-radius: 0.4em;
        transition: all 0.2s ease-in-out;
        background-color: var(--color-light);
        outline: none;
        min-width: 3ch;
        font-family: inherit;
        font-weight: inherit;
        resize: none;
        &:focus {
            border-color: var(--color-primary);
        }
    }

    .dark-theme {
        background-color: var(--color-dark);
        color: var(--color-light);
    }

    .light-theme {
        background-color: var(--color-light);
        color: var(--color-dark);
    }

    .italic {
        font-style: italic;
    }

    .bold {
        font-weight: bold;
    }

    .underline {
        text-decoration: underline;
    }

    .uppercase {
        text-transform: uppercase;
    }

    .lowercase {
        text-transform: lowercase;
    }

    .capitalize {
        text-transform: capitalize;
    }

    .error {
        color: var(--color-warning);
    }

    .success {
        color: var(--color-primary);
    }

    .fill {
        display: flex;
        flex-direction: column;
        flex: 1;
    }

    .center-text {
        text-align: center;
    }

    .center-content {
        display: grid;
        place-items: center;
    }

    .color {
        &-primary {
            color: var(--color-primary);
        }
        &-light {
            color: var(--color-light);
        }
        &-dark {
            color: var(--color-dark);
        }
    }
    .flex {
        display: flex;

        &.around {
            justify-content: space-around;
        }

        &.between {
            justify-content: space-between;
        }
    }
    .center-grid-justified {
        display: grid;
        grid-template-columns: 1fr 1fr;
        .left {
            text-align: right;
        }
        .right {
            text-align: left;
        }

        &.centered {
            position: relative;
            left: 13%;
        }
    }

    .center-horizontal {
        display: flex;
        justify-content: center;
    }

    .pointer {
        cursor: pointer;
    }

    .no-select {
        user-select: none !important;
    }

    .link {
        &:hover {
            text-decoration: underline;
        }
    }
    .no-underline {
        text-decoration: none !important;
        &:hover {
            text-decoration: none !important;
        }
    }

    .page-container {
        flex: 1;
        &.centered {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
        & .center-self {
            height: 100%;
            display: flex;
            flex: 1;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
    }

    .fill-flex {
        display: flex;
        flex-direction: column;
        flex: 1;
    }

    .align-bottom {
        display: flex;
        align-content: flex-end;
    }
    .fill-content {
        flex: 1;

        &.centered {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
    }

    .hoverable {
        cursor: pointer;
        transition: all 0.2s ease-in-out;
        &:hover {
            opacity: 0.9;
        }
        &:active {
            opacity: 0.95;
        }
    }
</style>
