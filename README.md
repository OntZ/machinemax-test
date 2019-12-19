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

## Details

Polling the list of machines happens every 10 seconds using redux-saga. I don't remember if we've discussed it in our call or not. I used it because it was the most often returned thing when I googled "how to poll with redux". I've taken the opportunity to experiment with it here as I've never used it before; as such, code organization might not be optimal (some people choose to have their sagas separate, I kept my polls next to my actions).

Every state update is saved to localStorage so you get the data first thing next time. The timestamp at which the last successful call was made is also saved, and displayed at the top of the page ("Accurate as of ... "). To the right of that is the current "server status", which shows red when the request fails for whatever reason and green if we're getting fresh data successfully. Last successful data are still displayed when "red".

There are a set of filters above the machines list allowing you to search by name, sort by active/idle time and filter by group/site. I've decided to save time and implement these from scratch. If making a production-ready reusable grid where you might want filters for all fields of your data model, I would either use a lib or write a generic reusable component which iterates over their keys (`FilterList<Machine>` for instance, and try to adapt to value types, i.e. handle `activity` differently because it's an object etc.).

## Assumptions

1. The "activeHours" and "idleHours" values found on the data model returned by `/machines` add up to less than 24, so I'm assuming the rest is "off" hours and the entire measurement happens for the previous 24h. This assumption is reinforced by the fact that `/machines/{machine_id}/history` is also returned for a 24 hour period. Thus, I've decided to show "off" time on the tiles as well.

2. Chrome has a weird bug now where options list of a select element doesn't show borders properly. Assuming it's ok not to spend time styling it or using a dropdown lib.

3. It's ok to call the utils folder utils. Come on, they're utils.

4. Default alphabetical sort by name is ok (endpoint keeps mangling them).

## Potential caveats

1. There aren't a lot of unit tests - ultimately it depends on your testing culture. I'm able and happy to adapt to whatever works for you. I'm also happy to discuss if you're open for it. Personally I believe things like "test reducer(action) results in expectedState" risk duplicating code and adding maintenance overhead as time goes on. Ultimately the end user doesn't care about whether the reducer updates the new state, they only care about their action going through and their data coming back. As such I would personally leave most testing to automated end-to-end suites running on live environments (mocking APIs also gets harder to maintain). I also don't personally test rendering snapshots, as again they need constant maintenance. I do test pure data processing functions though as they take no time at all to test, require little maintenance and provide enough value in terms of heavy lifting. As for automated tests, I don't at the moment know how to set up such a suite and have decided not to do so in the scope of this task. If you require devs maintaining them, I am again happy to learn how to do that and pitch in.