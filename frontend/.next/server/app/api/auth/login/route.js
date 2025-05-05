/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/auth/login/route";
exports.ids = ["app/api/auth/login/route"];
exports.modules = {

/***/ "(rsc)/./app/api/auth/login/route.ts":
/*!*************************************!*\
  !*** ./app/api/auth/login/route.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/.pnpm/next@15.2.4_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/api/server.js\");\n/* harmony import */ var next_headers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/headers */ \"(rsc)/./node_modules/.pnpm/next@15.2.4_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/api/headers.js\");\n\n\n// Mock user database for demo purposes\nconst users = [\n    {\n        id: \"admin123\",\n        name: \"Admin User\",\n        email: \"admin@example.com\",\n        password: \"admin123\",\n        role: \"admin\"\n    },\n    {\n        id: \"user123\",\n        name: \"John Doe\",\n        email: \"user@example.com\",\n        password: \"password123\",\n        role: \"user\"\n    },\n    {\n        id: \"creator123\",\n        name: \"Jane Smith\",\n        email: \"creator@example.com\",\n        password: \"creator123\",\n        role: \"creator\"\n    }\n];\n// Modify the POST function to set cookies more reliably:\nasync function POST(request) {\n    try {\n        const { email, password } = await request.json();\n        // Find user in our mock database\n        const user = users.find((u)=>u.email === email && u.password === password);\n        if (!user) {\n            console.log(\"Login API: Invalid credentials for\", email);\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                success: false,\n                message: \"Invalid email or password\"\n            }, {\n                status: 401\n            });\n        }\n        console.log(\"Login API: Successful login for\", email);\n        // Create a user object without the password\n        const safeUser = {\n            id: user.id,\n            name: user.name,\n            email: user.email,\n            role: user.role\n        };\n        // Generate a mock token\n        const accessToken = `mock-${user.role}-access-token-${Date.now()}`;\n        // Set cookies with proper options\n        (0,next_headers__WEBPACK_IMPORTED_MODULE_1__.cookies)().set({\n            name: \"accessToken\",\n            value: accessToken,\n            httpOnly: true,\n            path: \"/\",\n            maxAge: 60 * 60 * 24,\n            sameSite: \"lax\"\n        });\n        // Return the user data and tokens\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            success: true,\n            user: safeUser,\n            accessToken: accessToken,\n            refreshToken: `mock-refresh-token-${Date.now()}`\n        });\n    } catch (error) {\n        console.error(\"Login API error:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            success: false,\n            message: \"An error occurred during login\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2F1dGgvbG9naW4vcm91dGUudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQTBDO0FBQ0o7QUFFdEMsdUNBQXVDO0FBQ3ZDLE1BQU1FLFFBQVE7SUFDWjtRQUNFQyxJQUFJO1FBQ0pDLE1BQU07UUFDTkMsT0FBTztRQUNQQyxVQUFVO1FBQ1ZDLE1BQU07SUFDUjtJQUNBO1FBQ0VKLElBQUk7UUFDSkMsTUFBTTtRQUNOQyxPQUFPO1FBQ1BDLFVBQVU7UUFDVkMsTUFBTTtJQUNSO0lBQ0E7UUFDRUosSUFBSTtRQUNKQyxNQUFNO1FBQ05DLE9BQU87UUFDUEMsVUFBVTtRQUNWQyxNQUFNO0lBQ1I7Q0FDRDtBQUVELHlEQUF5RDtBQUNsRCxlQUFlQyxLQUFLQyxPQUFnQjtJQUN6QyxJQUFJO1FBQ0YsTUFBTSxFQUFFSixLQUFLLEVBQUVDLFFBQVEsRUFBRSxHQUFHLE1BQU1HLFFBQVFDLElBQUk7UUFFOUMsaUNBQWlDO1FBQ2pDLE1BQU1DLE9BQU9ULE1BQU1VLElBQUksQ0FBQyxDQUFDQyxJQUFNQSxFQUFFUixLQUFLLEtBQUtBLFNBQVNRLEVBQUVQLFFBQVEsS0FBS0E7UUFFbkUsSUFBSSxDQUFDSyxNQUFNO1lBQ1RHLFFBQVFDLEdBQUcsQ0FBQyxzQ0FBc0NWO1lBQ2xELE9BQU9MLHFEQUFZQSxDQUFDVSxJQUFJLENBQ3RCO2dCQUNFTSxTQUFTO2dCQUNUQyxTQUFTO1lBQ1gsR0FDQTtnQkFBRUMsUUFBUTtZQUFJO1FBRWxCO1FBRUFKLFFBQVFDLEdBQUcsQ0FBQyxtQ0FBbUNWO1FBRS9DLDRDQUE0QztRQUM1QyxNQUFNYyxXQUFXO1lBQ2ZoQixJQUFJUSxLQUFLUixFQUFFO1lBQ1hDLE1BQU1PLEtBQUtQLElBQUk7WUFDZkMsT0FBT00sS0FBS04sS0FBSztZQUNqQkUsTUFBTUksS0FBS0osSUFBSTtRQUNqQjtRQUVBLHdCQUF3QjtRQUN4QixNQUFNYSxjQUFjLENBQUMsS0FBSyxFQUFFVCxLQUFLSixJQUFJLENBQUMsY0FBYyxFQUFFYyxLQUFLQyxHQUFHLElBQUk7UUFFbEUsa0NBQWtDO1FBQ2xDckIscURBQU9BLEdBQUdzQixHQUFHLENBQUM7WUFDWm5CLE1BQU07WUFDTm9CLE9BQU9KO1lBQ1BLLFVBQVU7WUFDVkMsTUFBTTtZQUNOQyxRQUFRLEtBQUssS0FBSztZQUNsQkMsVUFBVTtRQUNaO1FBRUEsa0NBQWtDO1FBQ2xDLE9BQU81QixxREFBWUEsQ0FBQ1UsSUFBSSxDQUFDO1lBQ3ZCTSxTQUFTO1lBQ1RMLE1BQU1RO1lBQ05DLGFBQWFBO1lBQ2JTLGNBQWMsQ0FBQyxtQkFBbUIsRUFBRVIsS0FBS0MsR0FBRyxJQUFJO1FBQ2xEO0lBQ0YsRUFBRSxPQUFPUSxPQUFPO1FBQ2RoQixRQUFRZ0IsS0FBSyxDQUFDLG9CQUFvQkE7UUFDbEMsT0FBTzlCLHFEQUFZQSxDQUFDVSxJQUFJLENBQ3RCO1lBQ0VNLFNBQVM7WUFDVEMsU0FBUztRQUNYLEdBQ0E7WUFBRUMsUUFBUTtRQUFJO0lBRWxCO0FBQ0YiLCJzb3VyY2VzIjpbIi9hcHAvYXBwL2FwaS9hdXRoL2xvZ2luL3JvdXRlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRSZXNwb25zZSB9IGZyb20gXCJuZXh0L3NlcnZlclwiXG5pbXBvcnQgeyBjb29raWVzIH0gZnJvbSBcIm5leHQvaGVhZGVyc1wiXG5cbi8vIE1vY2sgdXNlciBkYXRhYmFzZSBmb3IgZGVtbyBwdXJwb3Nlc1xuY29uc3QgdXNlcnMgPSBbXG4gIHtcbiAgICBpZDogXCJhZG1pbjEyM1wiLFxuICAgIG5hbWU6IFwiQWRtaW4gVXNlclwiLFxuICAgIGVtYWlsOiBcImFkbWluQGV4YW1wbGUuY29tXCIsXG4gICAgcGFzc3dvcmQ6IFwiYWRtaW4xMjNcIixcbiAgICByb2xlOiBcImFkbWluXCIsXG4gIH0sXG4gIHtcbiAgICBpZDogXCJ1c2VyMTIzXCIsXG4gICAgbmFtZTogXCJKb2huIERvZVwiLFxuICAgIGVtYWlsOiBcInVzZXJAZXhhbXBsZS5jb21cIixcbiAgICBwYXNzd29yZDogXCJwYXNzd29yZDEyM1wiLFxuICAgIHJvbGU6IFwidXNlclwiLFxuICB9LFxuICB7XG4gICAgaWQ6IFwiY3JlYXRvcjEyM1wiLFxuICAgIG5hbWU6IFwiSmFuZSBTbWl0aFwiLFxuICAgIGVtYWlsOiBcImNyZWF0b3JAZXhhbXBsZS5jb21cIixcbiAgICBwYXNzd29yZDogXCJjcmVhdG9yMTIzXCIsXG4gICAgcm9sZTogXCJjcmVhdG9yXCIsXG4gIH0sXG5dXG5cbi8vIE1vZGlmeSB0aGUgUE9TVCBmdW5jdGlvbiB0byBzZXQgY29va2llcyBtb3JlIHJlbGlhYmx5OlxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIFBPU1QocmVxdWVzdDogUmVxdWVzdCkge1xuICB0cnkge1xuICAgIGNvbnN0IHsgZW1haWwsIHBhc3N3b3JkIH0gPSBhd2FpdCByZXF1ZXN0Lmpzb24oKVxuXG4gICAgLy8gRmluZCB1c2VyIGluIG91ciBtb2NrIGRhdGFiYXNlXG4gICAgY29uc3QgdXNlciA9IHVzZXJzLmZpbmQoKHUpID0+IHUuZW1haWwgPT09IGVtYWlsICYmIHUucGFzc3dvcmQgPT09IHBhc3N3b3JkKVxuXG4gICAgaWYgKCF1c2VyKSB7XG4gICAgICBjb25zb2xlLmxvZyhcIkxvZ2luIEFQSTogSW52YWxpZCBjcmVkZW50aWFscyBmb3JcIiwgZW1haWwpXG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXG4gICAgICAgIHtcbiAgICAgICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICAgICAgICBtZXNzYWdlOiBcIkludmFsaWQgZW1haWwgb3IgcGFzc3dvcmRcIixcbiAgICAgICAgfSxcbiAgICAgICAgeyBzdGF0dXM6IDQwMSB9LFxuICAgICAgKVxuICAgIH1cblxuICAgIGNvbnNvbGUubG9nKFwiTG9naW4gQVBJOiBTdWNjZXNzZnVsIGxvZ2luIGZvclwiLCBlbWFpbClcblxuICAgIC8vIENyZWF0ZSBhIHVzZXIgb2JqZWN0IHdpdGhvdXQgdGhlIHBhc3N3b3JkXG4gICAgY29uc3Qgc2FmZVVzZXIgPSB7XG4gICAgICBpZDogdXNlci5pZCxcbiAgICAgIG5hbWU6IHVzZXIubmFtZSxcbiAgICAgIGVtYWlsOiB1c2VyLmVtYWlsLFxuICAgICAgcm9sZTogdXNlci5yb2xlLFxuICAgIH1cblxuICAgIC8vIEdlbmVyYXRlIGEgbW9jayB0b2tlblxuICAgIGNvbnN0IGFjY2Vzc1Rva2VuID0gYG1vY2stJHt1c2VyLnJvbGV9LWFjY2Vzcy10b2tlbi0ke0RhdGUubm93KCl9YFxuXG4gICAgLy8gU2V0IGNvb2tpZXMgd2l0aCBwcm9wZXIgb3B0aW9uc1xuICAgIGNvb2tpZXMoKS5zZXQoe1xuICAgICAgbmFtZTogXCJhY2Nlc3NUb2tlblwiLFxuICAgICAgdmFsdWU6IGFjY2Vzc1Rva2VuLFxuICAgICAgaHR0cE9ubHk6IHRydWUsXG4gICAgICBwYXRoOiBcIi9cIixcbiAgICAgIG1heEFnZTogNjAgKiA2MCAqIDI0LCAvLyAxIGRheVxuICAgICAgc2FtZVNpdGU6IFwibGF4XCIsXG4gICAgfSlcblxuICAgIC8vIFJldHVybiB0aGUgdXNlciBkYXRhIGFuZCB0b2tlbnNcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oe1xuICAgICAgc3VjY2VzczogdHJ1ZSxcbiAgICAgIHVzZXI6IHNhZmVVc2VyLFxuICAgICAgYWNjZXNzVG9rZW46IGFjY2Vzc1Rva2VuLFxuICAgICAgcmVmcmVzaFRva2VuOiBgbW9jay1yZWZyZXNoLXRva2VuLSR7RGF0ZS5ub3coKX1gLFxuICAgIH0pXG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcihcIkxvZ2luIEFQSSBlcnJvcjpcIiwgZXJyb3IpXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxuICAgICAge1xuICAgICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICAgICAgbWVzc2FnZTogXCJBbiBlcnJvciBvY2N1cnJlZCBkdXJpbmcgbG9naW5cIixcbiAgICAgIH0sXG4gICAgICB7IHN0YXR1czogNTAwIH0sXG4gICAgKVxuICB9XG59XG4iXSwibmFtZXMiOlsiTmV4dFJlc3BvbnNlIiwiY29va2llcyIsInVzZXJzIiwiaWQiLCJuYW1lIiwiZW1haWwiLCJwYXNzd29yZCIsInJvbGUiLCJQT1NUIiwicmVxdWVzdCIsImpzb24iLCJ1c2VyIiwiZmluZCIsInUiLCJjb25zb2xlIiwibG9nIiwic3VjY2VzcyIsIm1lc3NhZ2UiLCJzdGF0dXMiLCJzYWZlVXNlciIsImFjY2Vzc1Rva2VuIiwiRGF0ZSIsIm5vdyIsInNldCIsInZhbHVlIiwiaHR0cE9ubHkiLCJwYXRoIiwibWF4QWdlIiwic2FtZVNpdGUiLCJyZWZyZXNoVG9rZW4iLCJlcnJvciJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/api/auth/login/route.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/.pnpm/next@15.2.4_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2Flogin%2Froute&page=%2Fapi%2Fauth%2Flogin%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Flogin%2Froute.ts&appDir=%2Fapp%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fapp&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/next@15.2.4_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2Flogin%2Froute&page=%2Fapi%2Fauth%2Flogin%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Flogin%2Froute.ts&appDir=%2Fapp%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fapp&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/.pnpm/next@15.2.4_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/.pnpm/next@15.2.4_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/.pnpm/next@15.2.4_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _app_app_api_auth_login_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/auth/login/route.ts */ \"(rsc)/./app/api/auth/login/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/auth/login/route\",\n        pathname: \"/api/auth/login\",\n        filename: \"route\",\n        bundlePath: \"app/api/auth/login/route\"\n    },\n    resolvedPagePath: \"/app/app/api/auth/login/route.ts\",\n    nextConfigOutput,\n    userland: _app_app_api_auth_login_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvLnBucG0vbmV4dEAxNS4yLjRfcmVhY3QtZG9tQDE5LjEuMF9yZWFjdEAxOS4xLjBfX3JlYWN0QDE5LjEuMC9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZhdXRoJTJGbG9naW4lMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmF1dGglMkZsb2dpbiUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmF1dGglMkZsb2dpbiUyRnJvdXRlLnRzJmFwcERpcj0lMkZhcHAlMkZhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPSUyRmFwcCZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBK0Y7QUFDdkM7QUFDcUI7QUFDaEI7QUFDN0Q7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHlHQUFtQjtBQUMzQztBQUNBLGNBQWMsa0VBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxzREFBc0Q7QUFDOUQ7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDMEY7O0FBRTFGIiwic291cmNlcyI6WyIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIi9hcHAvYXBwL2FwaS9hdXRoL2xvZ2luL3JvdXRlLnRzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS9hdXRoL2xvZ2luL3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvYXV0aC9sb2dpblwiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvYXV0aC9sb2dpbi9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIi9hcHAvYXBwL2FwaS9hdXRoL2xvZ2luL3JvdXRlLnRzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgd29ya0FzeW5jU3RvcmFnZSxcbiAgICAgICAgd29ya1VuaXRBc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/.pnpm/next@15.2.4_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2Flogin%2Froute&page=%2Fapi%2Fauth%2Flogin%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Flogin%2Froute.ts&appDir=%2Fapp%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fapp&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/.pnpm/next@15.2.4_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!*********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/next@15.2.4_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \*********************************************************************************************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/.pnpm/next@15.2.4_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!*********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/next@15.2.4_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \*********************************************************************************************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next@15.2.4_react-dom@19.1.0_react@19.1.0__react@19.1.0"], () => (__webpack_exec__("(rsc)/./node_modules/.pnpm/next@15.2.4_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2Flogin%2Froute&page=%2Fapi%2Fauth%2Flogin%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Flogin%2Froute.ts&appDir=%2Fapp%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fapp&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();