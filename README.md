gh-wrap-long-lines
===
This Chrome extension wraps the lines on GitHub's blob view pages if they exceed the blob container width. This somehow fixes the decrease in FPS when viewing files with long lines.

The performance issue has been reported to the GitHub, and it appears the problem is only happening with Chrome.

Meanwhile, this extension is able to resolve the problem (except half a second of lag every time the page is reloaded, i.e. the period from the moment the page starts getting rendered to the moment the page finishes rendering) temporarily through wrapping the lines.
