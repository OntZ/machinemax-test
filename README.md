# Machinemax test - display machine data


## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

**!!! this also starts a proxy on localhost:5000 to account for https://dummy-hacxuuktha-ew.a.run.app/machines having CORS disabled**

The proxy runs off `node ./proxy/proxy.js`. It should work as long as you have node and express installed. If this doesn't work for you, I'm happy to screenshare.

**Note:** Chrome is changing the way same-site cookies work https://www.chromium.org/updates/same-site so by the time you check it out, it might not work at all unless you update the endpoint. Got this warning in devtools:

```
A cookie associated with a cross-site resource at http://machinemax.com/ was set without the `SameSite` attribute. A future release of Chrome will only deliver cookies with cross-site requests if they are set with `SameSite=None` and `Secure`. You can review cookies in developer tools under Application>Storage>Cookies and see more details at https://www.chromestatus.com/feature/5088147346030592 and https://www.chromestatus.com/feature/5633521622188032.
```

### `yarn test`

Launches the test runner in watch mode.

### `yarn build`

Builds the app for production to the `build` folder.

I can't say anything with regards to deploying it, as proxies don't work in production and the only way you could deploy it would be to run "locally" on a container using a publicly exposed ip and proxy, as CORS still wouldn't work with the provided endpoint.

## Assumptions:

1. The "activeHours" and "idleHours" values found on the data model returned by `/machines` add up to less than 24, so I'm assuming the rest is "off" hours and the entire measurement happens for the previous 24h. This assumption is reinforced by the fact that `/machines/{machine_id}/history` is also returned for a 24 hour period. Thus, I've decided to show "off" time on the tiles as well.