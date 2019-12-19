# Machinemax test - display machine data

## See it running at https://ontz.github.io/

## Local builds

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

Due to the same CORS issue mentioned above I've decided to proxy requests in production builds through https://cors-anywhere.herokuapp.com/.

## Assumptions:

1. The "activeHours" and "idleHours" values found on the data model returned by `/machines` add up to less than 24, so I'm assuming the rest is "off" hours and the entire measurement happens for the previous 24h. This assumption is reinforced by the fact that `/machines/{machine_id}/history` is also returned for a 24 hour period. Thus, I've decided to show "off" time on the tiles as well.

2. Chrome has a weird bug now where options of a select element don't show borders properly. Assuming it's ok not to spend time styling it or using a dropdown lib.