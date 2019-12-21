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

> A cookie associated with a cross-site resource at http://machinemax.com/ was set without the `SameSite` attribute. A future release of Chrome will only deliver cookies with cross-site requests if they are set with `SameSite=None` and `Secure`. You can review cookies in developer tools under Application>Storage>Cookies and see more details at https://www.chromestatus.com/feature/5088147346030592 and https://www.chromestatus.com/feature/5633521622188032.


### `yarn test`

Launches the test runner in watch mode.

### `yarn build`

Builds the app for production to the `build` folder.

Due to the same CORS issue mentioned above I've decided to proxy requests in production builds through https://cors-anywhere.herokuapp.com/.

## Details

The homepage shows a list of machines displaying on/idle/off times in a half-pie chart, together with group, sensor id and total engine running time.

Polling the list of machines happens every 30 seconds using redux-saga. I don't remember if we've discussed it in our call or not. I used it because it was the most often returned thing when I googled "how to poll with redux". I've taken the opportunity to experiment with it here as I've never used it before; as such, code organization might not be optimal (some people choose to have their sagas separate, I kept my polls next to my actions).

The first time you load the app you'll need to wait for the first successful result. A spinner might need to be added in an improved version. Every state update is saved to localStorage so you get the most recently loaded data first thing next time. The timestamp at which the last successful call was made is also saved, and displayed at the top of the page ("Accurate as of ... "). To the right of that is the current "server status", which shows red when the request fails for whatever reason and green if we're getting fresh data successfully. Last successful data are still displayed when "red".

There are a set of filters above the machines list allowing you to search by name, sort by active/idle time and filter by group/site. I've decided to save time and implement these from scratch. If making a production-ready reusable grid where you might want filters for all fields of your data model, I would either use a lib or write a generic reusable component which iterates over their keys (`FilterList<Machine>` for instance, and try to adapt to value types, i.e. handle `activity` differently because it's an object etc.).

Because filtering happens at render time, newly loaded up-to-date results are shown with the same filters applied.

You can click a machine's name or image to go to its details page. There you will find its large photo, again a mention of active,idle and off time and a bar chart representing the operation history for the previous day. The machine details are polled for every 30s just as in the list page, but the history is only gotten once, at mount time (but polled for if it fails, until the first successful load).

Individual machines are stored in redux state and local-storage on a per-ID basis. If one hasn't been added to local-storage in the past, there will still be an initial loading time till you get to it. One can get around this by `array.find`-ing the individual machine in the already loaded list, which is how I've chosen to handle this. This is fast, but runs the risk of being not very transparent as regards maintainability in the future (data model for single machine might be more detailed than for machines list, e.g. preview vs full view, and this optimization is hidden in the middle of the reducer). If you just load the details page directly for the first time though, without having local storage or an initially loaded list, you'll naturally have to wait for the response.

I've used Victory for showing data charts as it seemed easiest to get something out of the box with it. However considerably more time should probably be spent tweaking them to get them looking sharp.

The app also has a Night mode for dark conditions, which can be toggled on the top-right of either page.

## Assumptions

1. The "activeHours" and "idleHours" values found on the data model returned by `/machines` add up to less than 24, so I'm assuming the rest is "off" hours and the entire measurement happens for the previous 24h. This assumption is reinforced by the fact that `/machines/{machine_id}/history` is also returned for a 24 hour period. Thus, I've decided to show "off" time on the tiles as well.

2. Chrome has a weird bug now where options list of a select element doesn't show borders properly. Assuming it's ok not to spend time styling it or using a dropdown lib.

3. It's ok to call the utils folder utils. Come on, they're utils.

4. Default alphabetical sort by name is ok (endpoint keeps mangling them).

5. `< Home` link on details page is enough (didn't implement a reusable header).

6. Idle is more costly than off because you're wasting fuel, engine wear and operator hours, so I've plotted it as such in the history chart.

7. History doesn't change randomly. Because in this case it does, there will be a less-than-pretty initial flicker in the details page when the new history replaces the old one. There would still be a flicker from one day to the next, though. The dates the graph is showed for are rendered, and will update with the fresh call, so this might be acceptable in an MVP, subject to PO, user testing etc. I'd be happy to hear how best to go about this. Potentially a graph which uses transitions would be nice.

8. You have a good designer. If not, I'm happy to learn some principles.

## Potential caveats

1. There aren't a lot of unit tests - ultimately it depends on your testing culture. I'm able and happy to adapt to whatever works for you. I'm also happy to discuss if you're open for it. Personally I believe things like "test reducer(action) results in expectedState" risk duplicating code and adding maintenance overhead as time goes on. Ultimately the end user doesn't care about whether the reducer updates the new state, they only care about their action going through and their data coming back. As such I would personally leave most testing to automated end-to-end suites running on live environments (mocking APIs also gets harder to maintain). I also don't personally test rendering snapshots, as again they need constant maintenance. I do test pure data processing functions though as they take no time at all to test, require little maintenance and provide enough value in terms of heavy lifting. As for automated tests, I don't at the moment know how to set up such a suite and have decided not to do so in the scope of this task. If you require devs maintaining them, I am again happy to learn how to do that and pitch in.

2. Pages and components don't have individual folders. In more complex apps that starts to be worth doing at some point. Maybe a Layout component would also be worth writing.

3. If I were writing a production app I might think more about whether to separate concerns between layout divs (col-...) and child divs for component classes.

4. If the machine actions and reducer start getting longer, it might be worth splitting them by actions/reducers for all machines and individual machines respectively.

5. Machine details Bar chart could look better and I haven't figured out how to make bar width fill up between the points without hacking away at them.

6. Didn't add animations as not relevant to actual user value and to save time. Would be fun to add some though.
