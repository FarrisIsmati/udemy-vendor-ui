# Initalize next.js app
yarn create next-app --typescript
# TRY yarn create next-app --typescript nextjs-docker

# STEPS WHEN RECORDING
INITIAL SETUP
1. High level overview of UI (what we are creating how it works)
2. Next.js overview vs react.js
3. Create github repo online (setup all actions needed) secrets
4. create next app and install dependencies, create src folder & move pages, .babelrc file and `npm install --save-dev babel-plugin-styled-components` and .env.local file and (next.config.js file sike not doing this)
5. setup .github/workflows/main.yml file
6. Setup aws amplify app in github (get started on aws amplify and first step will setup github access)
7. Add personal access token secret (https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token#about-personal-access-tokens) Requires it for amplify (read only webhooks)

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

DOCKERFILE SETUP
1. Dockerfile (setup dockerifle for connect.ts) (note copy logic we are copying everything including methods we dont need, could split up lambda, use complex copy logic, but I find this suitable given its a small file)
2. connect.ts (Write and test docker local build commands)
3. Dockerfile (setup dockerifle for disconnect.ts, send-vendor.ts)
4. disconnect.ts, send-vendor.ts (Quickly setup code as step 3. but faster let user know we just covered this in detail)
5. connect.ts (Write main.yml code) (test if updates on ECR)
6. disconnect.ts, send-vendor.ts (Quickly setup code as step 5. but faster let user know we just covered this in detail)
8. GET VENDOR

TERRAFORM
1. Update github OIDC role
2. 
First test multiple accounts