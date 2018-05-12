gh-wrap-long-lines
===
This Chrome extension wraps the lines on GitHub's blob view pages if they exceed the blob container width. This somehow fixes the decrease in FPS when viewing files with long lines.

The performance issue has been reported to the GitHub, and it appears the problem is only happening with Chrome. Meanwhile, this extension is able to resolve the problem temporarily through wrapping the lines.

## Known issues
- This extension does not calculate the width properly with characters of different widths (e.g. tabs, Asian characters, emojis).
