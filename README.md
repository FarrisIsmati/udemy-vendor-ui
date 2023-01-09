# Initalize next.js app
yarn create next-app --typescript

# STEPS WHEN RECORDING
INITIAL SETUP
1. High level overview of UI (what we are creating how it works)
2. Next.js overview vs react.js
3. Create github repo online (setup all actions needed) secrets
4. create next app and install dependencies, create src folder & move pages, .babelrc file and `npm install --save-dev babel-plugin-styled-components` and .env.local file and next.config.js file
5. setup .github/workflows/main.yml file

SETUP + API
1. Clean up pages Home file & update generic styles
2. Get vendors types
3. Get vendors api
4. Get vendor data (static Props) and send it to Main file (we will focus on lazy loading in dashboard component)

MAP
1. Setup google maps account
2. Map wrapper component, loading states, useEffect/useRef to mount
3. Map props & interfaces
4. Map style
5. Loading vendors useEffect markers

DASHBOARD
1. Dashboard setup (get vendors as props)
2. Tile get tile setup and rendered on dashboard (materialsUI)
3. Infinite scroll + loader
4. Infinite scroll next func
5. Sort vendors

WEBSOCKET
1. Websocket connect websocket.ts
2. websocket on useEffect main.tsx

TERRAFORM
1. Update github OIDC role
2.  
First test multiple accounts