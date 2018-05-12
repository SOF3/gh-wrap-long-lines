gh-wrap-long-lines
===
This Chrome extension wraps the lines on GitHub's blob view pages if they exceed the blob container width. This somehow fixes the decrease in FPS when viewing files with long lines.

The performance issue has been reported to the GitHub team. Here is an excerpt of the response from GitHub staff:

> I personally have noticed slowness when using Chrome on various sites including GitHub lately, and have switched to using Firefox.
>
> I'm not sure what specifically is causing Chrome to exhibit poor performance over the last few weeks, but I've added your report to our internal notes for further investigation. I do recommend using an alternate web browser in the meantime

Meanwhile, this extension is able to resolve the problem (except half a second of lag every time the page is reloaded, i.e. the period from the moment the page starts getting rendered to the moment the page finishes rendering) temporarily through wrapping the lines.
