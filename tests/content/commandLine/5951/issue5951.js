function runTest()
{
    FBTest.sysout("issue5951.START");
    FBTest.openNewTab(basePath + "commandLine/5951/issue5951.html", function(win)
    {
        FBTest.openFirebug();
        FBTest.clearCache();
        FBTest.enableConsolePanel(function(win)
        {
            var expression = "document.getElementsByTagName('div')";
            var expected = "HTMLCollection[div.test, div#root]";

            var config = {tagName: "pre", classes: "objectBox-array"};
            FBTest.waitForDisplayedElement("console", config, function(row)
            {
                FBTest.compare(expected, row.textContent, "Verify: " +
                    expression + " SHOULD BE " + expected);

                var title = row.getElementsByClassName("objectTitle")[0];
                if (FBTest.ok(title, "HTMLCollection title must exist"))
                {
                    FBTest.click(title);

                    var panel = FBTest.getSelectedPanel();
                    FBTest.compare("dom", panel.name, "The DOM panel must be selected");
                }

                FBTest.testDone("issue5951.DONE");
            });

            FBTest.executeCommand(expression);
        });
    });
}
